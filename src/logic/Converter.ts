import TurndownService from 'turndown';
import { ExtractedContent } from './Extractor';

export class Converter {
  private static turndownService = new TurndownService({
    headingStyle: 'atx',
    codeBlockStyle: 'fenced',
  });

  /**
   * Converts extracted HTML content to Markdown.
   * Includes a header with title and URL.
   */
  static toMarkdown(data: ExtractedContent): string {
    const markdown = this.turndownService.turndown(data.content);
    
    // Construct the final markdown with metadata
    const header = [
      `# ${data.title}\n`,
      data.byline ? `By: ${data.byline}\n` : '',
      `URL: ${data.url}\n`,
      '---',
      '\n',
      ''
    ].filter(line => line !== '').join('\n');

    return `${header}${markdown}`;
  }
}
