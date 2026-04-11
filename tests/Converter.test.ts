import { describe, it, expect } from 'vitest';
import { Converter } from '../src/logic/Converter';
import { ExtractedContent } from '../src/logic/Extractor';

describe('Converter', () => {
  it('should convert HTML to Markdown with a header', () => {
    const data: ExtractedContent = {
      title: 'Test Article',
      content: '<div><p>Hello <strong>World</strong></p></div>',
      textContent: 'Hello World',
      excerpt: 'Test excerpt',
      byline: 'Test Author',
      url: 'https://example.com'
    };

    const markdown = Converter.toMarkdown(data);
    
    expect(markdown).toContain('# Test Article');
    expect(markdown).toContain('By: Test Author');
    expect(markdown).toContain('URL: https://example.com');
    expect(markdown).toContain('Hello **World**');
  });

  it('should omit byline if missing', () => {
    const data: ExtractedContent = {
      title: 'Simple Title',
      content: '<p>Content</p>',
      textContent: 'Content',
      excerpt: '',
      byline: '',
      url: 'https://example.com'
    };

    const markdown = Converter.toMarkdown(data);
    expect(markdown).not.toContain('By:');
    expect(markdown).toContain('# Simple Title');
  });

  it('should remove trailing non-breaking spaces before newlines and end of string', () => {
    const nbsp = '\xA0';
    const data: ExtractedContent = {
      title: 'NBSP Test',
      content: `<p>Line one${nbsp}${nbsp}</p><p>Line two${nbsp}</p>`,
      textContent: 'Line one  Line two ',
      excerpt: '',
      byline: '',
      url: 'https://example.com'
    };

    const markdown = Converter.toMarkdown(data);
    expect(markdown).not.toMatch(/\xA0/);
    expect(markdown).toContain('Line one');
    expect(markdown).toContain('Line two');
  });
});
