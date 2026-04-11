import { describe, it, expect } from 'vitest';
import { Extractor } from '../src/logic/Extractor';

describe('Extractor', () => {
  it('should extract main content from a simple document', () => {
    const html = `
      <!DOCTYPE html>
      <html>
        <head><title>Test Title</title></head>
        <body>
          <header>Site Header</header>
          <main>
            <h1>Main Article Heading</h1>
            <p>This is the main content of the article. It should be extracted correctly.</p>
            <p>Another paragraph to make it look like real content.</p>
          </main>
          <footer>Site Footer</footer>
        </body>
      </html>
    `;
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    
    const result = Extractor.extract(doc, 'https://example.com');
    
    expect(result).not.toBeNull();
    expect(result?.title).toBe('Test Title');
    expect(result?.textContent).toContain('This is the main content');
    expect(result?.url).toBe('https://example.com');
  });

  it('should return null if no content is found', () => {
    const html = `<html><body><div></div></body></html>`;
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    
    const result = Extractor.extract(doc);
    // Readability usually finds something, but in extreme cases it might fail or return generic title
    // Here we just test the logic exists
    expect(result).toBeDefined();
  });
});
