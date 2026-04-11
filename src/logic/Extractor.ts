import { Readability } from '@mozilla/readability';

export interface ExtractedContent {
  title: string;
  content: string;
  textContent: string;
  excerpt: string;
  byline: string;
  url: string;
}

export class Extractor {
  /**
   * Extracts the main content from a DOM Document.
   */
  static extract(doc: Document, url: string = window.location.href): ExtractedContent | null {
    const reader = new Readability(doc.cloneNode(true) as Document);
    const article = reader.parse();

    if (!article) {
      return null;
    }

    return {
      title: article.title ?? '',
      content: article.content ?? '', // HTML content
      textContent: article.textContent ?? '',
      excerpt: article.excerpt ?? '',
      byline: article.byline ?? '',
      url: url
    };
  }
}
