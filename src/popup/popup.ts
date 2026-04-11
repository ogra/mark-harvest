/**
 * Popup script for Mark Harvest
 */

const harvestBtn = document.getElementById('harvestBtn') as HTMLButtonElement;
const statusDiv = document.getElementById('status') as HTMLDivElement;

function setStatus(message: string, type: 'success' | 'error' | '' = '') {
  statusDiv.textContent = message;
  statusDiv.className = `status ${type}`;
}

harvestBtn.addEventListener('click', async () => {
  harvestBtn.disabled = true;
  setStatus('Harvesting...');

  try {
    // Get the active tab
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    if (!tab?.id) {
      throw new Error('No active tab found.');
    }

    // Send message to content script
    // Note: Content script is automatically injected via manifest
    const response = await chrome.tabs.sendMessage(tab.id, { action: 'harvest' });

    if (response?.success && response.markdown) {
      // Copy to clipboard
      await navigator.clipboard.writeText(response.markdown);
      setStatus('Successfully copied to clipboard!', 'success');
    } else {
      throw new Error(response?.error || 'Failed to extract content.');
    }
  } catch (error) {
    console.error('Harvest error:', error);
    setStatus(`Error: ${String(error)}`, 'error');
  } finally {
    harvestBtn.disabled = false;
  }
});
