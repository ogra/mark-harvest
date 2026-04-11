import { Readability } from '@mozilla/readability';
import { JSDOM } from 'jsdom';

const dom = new JSDOM(`
  <body>
    <article>
      <div class="content-block">
        <p>First paragraph with lots of text to get a high score. First paragraph with lots of text to get a high score. First paragraph with lots of text to get a high score.</p>
        <p>Second paragraph with lots of text to get a high score. Second paragraph with lots of text to get a high score. Second paragraph with lots of text to get a high score.</p>
        <p>China's emergence this century as an economic and military superpower has also seen its space capabilities accelerate rapidly...</p>
      </div>
      <div class="ad-placeholder">Ad goes here</div>
      <div class="content-block">
        <p>If the Artemis timetable slips, as many experts believe it will, China could get to the Moon first...</p>
        <p>Another big paragraph Another big paragraph Another big paragraph Another big paragraph</p>
      </div>
    </article>
  </body>
`);

const reader1 = new Readability(new JSDOM(dom.serialize()).window.document);
console.log("With ad:", reader1.parse().textContent.includes("timetable"));

const domWithoutAd = new JSDOM(dom.serialize());
domWithoutAd.window.document.querySelectorAll('.ad-placeholder').forEach(el => el.remove());
const reader2 = new Readability(domWithoutAd.window.document);
console.log("Without ad:", reader2.parse().textContent.includes("timetable"));
