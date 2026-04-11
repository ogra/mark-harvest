# Mark Harvest

Extract main content and convert to Markdown.

![Mark Harvest Logo](./public/icons/icon128.png)

Mark Harvest is a simple yet powerful Chrome extension that extracts the meat of any web page using Mozilla's Readability library and converts it into clean Markdown using Turndown.

## Features

- **Smart Extraction**: Uses `@mozilla/readability` (the engine behind Firefox's Reader View) to identify and extract the main content while stripping away ads and navigation.
- **Clean Markdown**: Converts HTML to Markdown using `turndown`.
- **Easy Copy**: One-click to copy the extracted Markdown to your clipboard.
- **Developer Friendly**: Built with modern web technologies: Vite, TypeScript, and Vitest.

## Installation

### For Users

(See "For Developers" section below.)

### For Developers

1.  Clone this repository.
2.  Install dependencies:
    ```bash
    pnpm install
    ```
3.  Build the extension:
    ```bash
    pnpm build
    ```
4.  Load the extension in Chrome:
    - Open Chrome and navigate to `chrome://extensions/`.
    - Enable **Developer mode** (toggle in the top right).
    - Click **Load unpacked**.
    - Select the `dist` directory in this project folder.

## Usage

1.  Navigate to a web page you want to capture.
2.  Click the Mark Harvest icon in your browser toolbar.
3.  Click the **Harvest Content** button.
4.  The content is now in your clipboard!

## Development

- `pnpm dev`: Start Vite dev server.
- `pnpm build`: Build production artifacts (outputs to `dist/`).
- `pnpm test`: Run the test suite with Vitest.

## License

MIT
