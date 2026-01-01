import {
  List,
  ActionPanel,
  Action,
  showHUD,
  showToast,
  Toast,
  Clipboard,
  getSelectedText,
  LocalStorage,
  getPreferenceValues,
  closeMainWindow,
  Icon,
  confirmAlert,
  Alert,
  open,
} from "@raycast/api";
import OpenAI from "openai";
import { useEffect, useRef, useState } from "react";

// Module-level variable to track invocations across component renders
// This persists even when the component doesn't remount
let lastInvocationTime = 0;

interface Preferences {
  openaiApiKey: string;
  openaiModel?: string;
  personaNativeLanguage?: string;
  personaBackground?: string;
}

const STYLES = [
  { id: "business-informal", name: "Business Informal" },
  { id: "business-formal", name: "Business Formal" },
  { id: "friends-informal", name: "Friends Informal" },
  { id: "friends-formal", name: "Friends Formal" },
  { id: "friends-funny", name: "Friends Funny" },
  { id: "general-informal", name: "General Informal" },
  { id: "general-formal", name: "General Formal" },
  { id: "general-funny", name: "General Funny" },
] as const;

type StyleId = (typeof STYLES)[number]["id"];

const LAST_STYLE_KEY = "lastUsedStyle";
const DEFAULT_MODEL = "gpt-4.1-nano";

function buildSystemPrompt(style: string, preferences: Preferences): string {
  const baseRules = `Rules:
- Preserve the original meaning
- Improve clarity, grammar, and structure
- Do NOT add new facts
- Do NOT change names, numbers, dates, currencies, or URLs
- Keep similar length unless the style explicitly implies otherwise
- Return ONLY the rewritten text with no preamble or explanation`;

  const personaContext = buildPersonaContext(style, preferences);

  return `You are a text rewriter. Rewrite the following text in a ${style.replace("-", " ")} tone.

${personaContext}${baseRules}`;
}

function buildPersonaContext(style: string, preferences: Preferences): string {
  const { personaNativeLanguage, personaBackground } = preferences;

  const isBusinessStyle = style.startsWith("business-");

  // For business style without any persona config, still add intelligence boost
  if (!personaNativeLanguage && !personaBackground && !isBusinessStyle) {
    return "";
  }

  const parts: string[] = [];

  if (personaNativeLanguage || personaBackground) {
    const backgroundDesc = personaBackground
      ? `a ${personaBackground}`
      : "someone";
    const nativeDesc = personaNativeLanguage
      ? ` who is a native ${personaNativeLanguage} speaker`
      : "";
    parts.push(`You are writing as ${backgroundDesc}${nativeDesc}.`);
  }

  if (personaNativeLanguage) {
    parts.push(`
Language adaptation:
- If the text is NOT in ${personaNativeLanguage}, use simpler vocabulary and sentence structures. Avoid advanced idioms, complex phrasal verbs, or overly sophisticated language. The goal is to sound natural for a non-native speaker.
- If the text IS in ${personaNativeLanguage}, write naturally with full vocabulary range since this is the native language.`);
  }

  if (isBusinessStyle) {
    parts.push(`
Professional tone:
- Write with confidence and clarity to convey competence and expertise.
- Use precise, well-structured sentences that demonstrate thoughtfulness.
- Where appropriate, use domain-specific terminology that shows professional knowledge.
- Maintain a polished, articulate tone without being verbose or overly complex.`);
  }

  const contextBlock = parts.join("\n");

  return `Persona context:
${contextBlock}

`;
}

async function showAccessibilityAlert(): Promise<void> {
  const confirmed = await confirmAlert({
    title: "Accessibility Permission Required",
    message:
      "Raycast needs Accessibility permission to read selected text. Without it, only clipboard text can be used.\n\nGo to System Settings → Privacy & Security → Accessibility and enable Raycast.",
    icon: Icon.ExclamationMark,
    primaryAction: {
      title: "Open System Settings",
      style: Alert.ActionStyle.Default,
    },
    dismissAction: {
      title: "Continue with Clipboard",
    },
  });

  if (confirmed) {
    await open(
      "x-apple.systempreferences:com.apple.preference.security?Privacy_Accessibility",
    );
  }
}

async function getInputText(): Promise<{
  text: string;
  source: "selection" | "clipboard";
  permissionError: boolean;
}> {
  let permissionError = false;

  console.log("getInputText: Starting to fetch text...");

  try {
    console.log("getInputText: Calling getSelectedText()...");
    const selectedText = await getSelectedText();
    console.log(
      "getInputText: getSelectedText returned:",
      selectedText?.substring(0, 50),
    );
    if (selectedText && selectedText.trim().length > 0) {
      return {
        text: selectedText.trim(),
        source: "selection",
        permissionError: false,
      };
    }
    console.log("getInputText: Selected text was empty");
  } catch (err) {
    // getSelectedText throws if no text is selected or accessibility denied
    const errorMessage = err instanceof Error ? err.message : String(err);
    console.log("getInputText: getSelectedText failed:", errorMessage);

    // Check if this is a permission/accessibility error
    if (
      errorMessage.includes("Cannot copy") ||
      errorMessage.includes("Unable to get selected text")
    ) {
      permissionError = true;
    }
  }

  console.log("getInputText: Trying clipboard...");
  const clipboardText = await Clipboard.readText();
  console.log(
    "getInputText: Clipboard returned:",
    clipboardText?.substring(0, 50),
  );
  if (clipboardText && clipboardText.trim().length > 0) {
    return { text: clipboardText.trim(), source: "clipboard", permissionError };
  }

  console.log("getInputText: Both empty, throwing error");
  throw new Error("No text selected and clipboard is empty");
}

async function rewriteText(
  text: string,
  style: StyleId,
  preferences: Preferences,
): Promise<string> {
  const openai = new OpenAI({
    apiKey: preferences.openaiApiKey,
  });

  const model = preferences.openaiModel || DEFAULT_MODEL;

  const completion = await openai.chat.completions.create({
    model,
    messages: [
      { role: "system", content: buildSystemPrompt(style, preferences) },
      { role: "user", content: text },
    ],
    temperature: 0.35,
  });

  const result = completion.choices[0]?.message?.content;
  if (!result) {
    throw new Error("No response from OpenAI");
  }

  return result.trim();
}

async function initializeCommand(): Promise<{
  text: string;
  source: "selection" | "clipboard";
  lastStyle: StyleId | null;
  permissionError: boolean;
}> {
  const { text, source, permissionError } = await getInputText();

  // Show accessibility alert if permission error detected
  if (permissionError) {
    await showAccessibilityAlert();
  }

  const lastStyle = await LocalStorage.getItem<string>(LAST_STYLE_KEY);
  const validStyle =
    lastStyle && STYLES.some((s) => s.id === lastStyle)
      ? (lastStyle as StyleId)
      : null;
  return { text, source, lastStyle: validStyle, permissionError };
}

interface CommandState {
  text: string;
  source: "selection" | "clipboard" | null;
  lastStyle: StyleId | null;
  isLoading: boolean;
  error: string | null;
  lastFetchTime: number;
}

export default function Command() {
  const preferences = getPreferenceValues<Preferences>();

  const [state, setState] = useState<CommandState>({
    text: "",
    source: null,
    lastStyle: null,
    isLoading: true,
    error: null,
    lastFetchTime: 0,
  });

  // Fetch on mount and detect new invocations
  const isFetching = useRef(false);

  useEffect(() => {
    // Skip if already fetching
    if (isFetching.current) {
      console.log("Already fetching, skipping");
      return;
    }

    // Detect new invocation: if more than 500ms since last fetch started
    const now = Date.now();
    const timeSinceLastInvocation = now - lastInvocationTime;
    const isNewInvocation = timeSinceLastInvocation > 500;

    console.log(
      "Time since last invocation:",
      timeSinceLastInvocation,
      "isNew:",
      isNewInvocation,
    );

    // Skip if this isn't a new invocation and we already have data
    if (!isNewInvocation && state.text) {
      console.log("Not a new invocation and we have data, skipping");
      return;
    }

    // Mark that we're starting a new fetch NOW (before async work)
    lastInvocationTime = now;
    isFetching.current = true;

    async function fetchText() {
      console.log("Fetching selected text (new invocation detected)");

      try {
        const result = await initializeCommand();
        console.log("initializeCommand returned:", {
          text: result.text?.substring(0, 50),
          source: result.source,
        });

        setState({
          text: result.text,
          source: result.source,
          lastStyle: result.lastStyle,
          isLoading: false,
          error: null,
          lastFetchTime: Date.now(),
        });
      } catch (err) {
        console.log("fetchText error:", err);
        const message =
          err instanceof Error ? err.message : "Failed to get text";
        setState((prev) => ({
          ...prev,
          isLoading: false,
          error: message,
          lastFetchTime: Date.now(),
        }));
      } finally {
        isFetching.current = false;
      }
    }

    fetchText();
  }); // No deps - runs on every render, but we gate it with checks

  const {
    text: inputText,
    source: textSource,
    lastStyle,
    isLoading,
    error,
  } = state;

  // Refresh function to re-fetch selected text
  async function handleRefresh() {
    setState((prev) => ({ ...prev, isLoading: true, lastFetchTime: 0 }));

    try {
      const result = await initializeCommand();
      setState({
        text: result.text,
        source: result.source,
        lastStyle: result.lastStyle,
        isLoading: false,
        error: null,
        lastFetchTime: Date.now(),
      });
      await showToast({
        style: Toast.Style.Success,
        title: "Refreshed",
        message: "Fetched latest selected text",
      });
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to get text";
      setState((prev) => ({
        ...prev,
        isLoading: false,
        error: message,
        lastFetchTime: Date.now(),
      }));
    }
  }

  // Fail fast if API key is missing
  if (!preferences.openaiApiKey) {
    return (
      <List>
        <List.EmptyView
          icon={Icon.ExclamationMark}
          title="OpenAI API Key Required"
          description="Please set it in extension preferences."
        />
      </List>
    );
  }

  async function handleSelect(style: StyleId) {
    if (!inputText) {
      await showToast({
        style: Toast.Style.Failure,
        title: "No text to rewrite",
      });
      return;
    }

    try {
      // Save selected style
      await LocalStorage.setItem(LAST_STYLE_KEY, style);

      // Show progress toast
      await showToast({
        style: Toast.Style.Animated,
        title: "Rewriting...",
      });

      // Rewrite text
      const rewrittenText = await rewriteText(inputText, style, preferences);

      // Copy to clipboard
      await Clipboard.copy(rewrittenText);

      // Close the window and show success HUD
      await closeMainWindow({ clearRootSearch: true });
      await showHUD("Copied. Paste with \u2318V to replace.");
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to rewrite text";
      await showToast({
        style: Toast.Style.Failure,
        title: "Error",
        message,
      });
    }
  }

  if (error) {
    const message =
      error instanceof Error ? error.message : "Failed to get input text";
    return (
      <List>
        <List.EmptyView
          icon={Icon.ExclamationMark}
          title="Error"
          description={message}
        />
      </List>
    );
  }

  // Sort styles to put last used first
  const sortedStyles = lastStyle
    ? [
        STYLES.find((s) => s.id === lastStyle)!,
        ...STYLES.filter((s) => s.id !== lastStyle),
      ]
    : [...STYLES];

  const detailMarkdown = inputText
    ? inputText
    : "No text loaded yet...";

  return (
    <List
      isLoading={isLoading}
      isShowingDetail={!!inputText}
      navigationTitle="Rewrite Text"
      searchBarPlaceholder="Choose a style..."
    >
      <List.Section title="Select Style">
        {sortedStyles.map((style) => (
          <List.Item
            key={style.id}
            title={style.name}
            accessories={
              style.id === lastStyle ? [{ tag: { value: "Last used" } }] : []
            }
            detail={<List.Item.Detail markdown={detailMarkdown} />}
            actions={
              <ActionPanel>
                <Action
                  title="Rewrite"
                  icon={Icon.Pencil}
                  onAction={() => handleSelect(style.id)}
                />
                <Action
                  title="Refresh Selected Text"
                  icon={Icon.ArrowClockwise}
                  shortcut={{ modifiers: ["cmd"], key: "r" }}
                  onAction={handleRefresh}
                />
              </ActionPanel>
            }
          />
        ))}
      </List.Section>
    </List>
  );
}
