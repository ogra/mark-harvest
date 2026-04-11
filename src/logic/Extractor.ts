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
    const clonedDoc = doc.cloneNode(true) as Document;
    
    // Instead of removing ad elements, unwrap structural layout blocks.
    // Some sites (e.g., BBC) split article content across multiple layout containers.
    // Unwrapping them pulls the paragraphs into a continuous sibling list,
    // allowing Readability to merge them effectively.
    const unwrapSelectors = [
      '[data-component="layout-block"]'
    ];
    
    unwrapSelectors.forEach(selector => {
      // Use Array.from to freeze the list before modifying the DOM
      Array.from(clonedDoc.querySelectorAll(selector)).forEach(el => {
        while (el.firstChild) {
          el.parentNode?.insertBefore(el.firstChild, el);
        }
        el.parentNode?.removeChild(el);
      });
    });

    const reader = new Readability(clonedDoc);
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
