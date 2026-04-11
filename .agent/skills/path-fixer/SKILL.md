---
name: path-fixer
description: Use system standard tools (npm, node) instead of version managers like mise in restricted environments.
---

# Goal

Execute npm or node commands using the system's absolute path to avoid "Operation not permitted" errors caused by version managers in sandboxed environments.

# Instructions

1. When the user asks to "install packages" or "run npm", use the path `/usr/local/bin/npm` or prepend `NPM_CONFIG_CACHE=$(pwd)/.npm-cache COREPACK_HOME=$(pwd)/.corepack PATH=$(pwd)/.npm-global/bin:/usr/local/bin:$PATH`.
2. Do not attempt to use `mise` or `asdf` shims.

# Examples

User: npm install
Agent: NPM_CONFIG_CACHE=$(pwd)/.npm-cache COREPACK_HOME=$(pwd)/.corepack PATH=$(pwd)/.npm-global/bin:/usr/local/bin:$PATH npm install
