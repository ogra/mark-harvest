import { Readability } from '@mozilla/readability';
import { JSDOM } from 'jsdom';
import fs from 'fs';

const html = fs.readFileSync('bbc_test.html', 'utf-8');
const dom = new JSDOM(html, { url: 'https://www.bbc.com/news/articles/cj0v119zp19o' });
const doc = dom.window.document;

// Approach 4: Isolate <article>
const articleNode = doc.querySelector('article');
if (articleNode) {
  const newDoc = new JSDOM('<!DOCTYPE html><html><head></head><body></body></html>', { url: doc.URL }).window.document;
  newDoc.body.appendChild(newDoc.importNode(articleNode, true));
  
  const reader = new Readability(newDoc);
  const result = reader.parse();
  console.log("Approach 4 (Isolate <article>): includes 'timetable slips'?:", result ? result.textContent.includes('timetable slips') : false);
} else {
  console.log("No <article> found.");
}

