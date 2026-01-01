# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Maintaining This File

After completing any task that establishes new patterns, conventions, or project-specific knowledge:
1. Propose updates to this CLAUDE.md file to document the new guidelines
2. Always ask the user to review the proposed changes before saving
3. This ensures future Claude sessions follow the same conventions

This file persists across sessions—keeping it updated is essential for consistency.

## Project Overview

This is a devcontainer-based development environment for building a Raycast extension ("Claude Code Raycast Rewriter"). The project currently contains only the container infrastructure—no application source code yet.

## Development Philosophy

- **Use bleeding edge technology**: Always research and use the latest stable versions of dependencies, frameworks, and tools. When adding new packages or upgrading existing ones, check for the most recent releases rather than defaulting to older versions.

## Development Environment

This project uses VS Code Dev Containers exclusively. The container is based on Node.js 20 with:
- Claude Code CLI pre-installed globally
- zsh with Powerline10k as default shell
- ESLint + Prettier auto-formatting on save
- Git, GitHub CLI (gh), and git-delta for diffs

### Starting the Environment

Open the project in VS Code and use "Reopen in Container" (or the Dev Containers extension). The container will:
1. Build from `.devcontainer/Dockerfile`
2. Run the firewall initialization script (`postStartCommand`)
3. Wait for firewall setup before becoming ready

### Network Restrictions

The container runs with a restrictive firewall (NET_ADMIN capability required). Outbound traffic is limited to:
- GitHub (API, web, git)
- npm registry (registry.npmjs.org)
- Anthropic API (api.anthropic.com, statsig.anthropic.com)
- VS Code marketplace and updates
- Sentry.io

All other outbound connections are blocked. If you need to access additional domains, modify `.devcontainer/init-firewall.sh`.

## Architecture

```
.devcontainer/
├── Dockerfile           # Node 20 + Claude Code CLI + tools
├── devcontainer.json    # VS Code settings, extensions, mounts
└── init-firewall.sh     # Network allowlist setup (iptables/ipset)
```

The firewall script fetches GitHub's IP ranges dynamically from their meta API and resolves other allowed domains via DNS at container start.
