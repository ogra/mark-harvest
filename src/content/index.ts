import { Extractor } from '../logic/Extractor';
import { Converter } from '../logic/Converter';

/**
 * Listen for messages from the popup.
 */
chrome.runtime.onMessage.addListener((request, _sender, sendResponse) => {
  if (request.action === 'harvest') {
    try {
      const data = Extractor.extract(document);
      if (data) {
        const markdown = Converter.toMarkdown(data);
        sendResponse({ success: true, markdown });
      } else {
        sendResponse({ success: false, error: 'Failed to extract content.' });
      }
    } catch (error) {
      console.error('Extraction error:', error);
      sendResponse({ success: false, error: String(error) });
    }
  }
  return true; // Keep the message channel open for async response
});
