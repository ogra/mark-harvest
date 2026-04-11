import { Readability } from '@mozilla/readability';
import { JSDOM } from 'jsdom';
import fs from 'fs';
import TurndownService from 'turndown';

const html = fs.readFileSync('bbc_test.html', 'utf-8');
const doc = new JSDOM(html, { url: 'https://www.bbc.com/news/articles/cj0v119zp19o' });

const reader = new Readability(doc.window.document);
const article = reader.parse();

const turndownService = new TurndownService({
  headingStyle: 'atx',
  codeBlockStyle: 'fenced',
});

const markdown = turndownService.turndown(article.content);

fs.writeFileSync('debug_extracted.md', markdown);
console.log("Written markdown output.");
