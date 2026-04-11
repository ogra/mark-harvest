import { JSDOM } from 'jsdom';
import fs from 'fs';

const html = fs.readFileSync('bbc_test.html', 'utf-8');
const doc = new JSDOM(html, { url: 'https://www.bbc.com/news/articles/cj0v119zp19o' });
const d = doc.window.document;

const p1 = Array.from(d.querySelectorAll('p')).find(p => p.textContent.includes('accelerate rapidly'));
if (p1) {
  let gparent = p1.parentElement.parentElement;
  let next = gparent.nextElementSibling;
  console.log("Grandparent next sibling:", next ? next.tagName + ' ' + next.className : 'null', next ? next.innerHTML.substring(0, 100) : '');
}
