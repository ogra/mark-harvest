/**
 * Popup script for Mark Harvest
 */

const harvestBtn = document.getElementById('harvestBtn') as HTMLButtonElement;
const statusDiv = document.getElementById('status') as HTMLDivElement;
const wrapEnabledCheckbox = document.getElementById('wrapEnabled') as HTMLInputElement;
const templateInputsDiv = document.getElementById('templateInputs') as HTMLDivElement;
const prefixText = document.getElementById('prefixText') as HTMLTextAreaElement;
const suffixText = document.getElementById('suffixText') as HTMLTextAreaElement;

function setStatus(message: string, type: 'success' | 'error' | '' = '') {
  statusDiv.textContent = message;
  statusDiv.className = `status ${type}`;
}

// Default templates
const DEFAULT_PREFIX = "```markdown\n";
const DEFAULT_SUFFIX = "\n```";

// Load saved settings
chrome.storage.sync.get(['wrapEnabled', 'prefixText', 'suffixText'], (result) => {
  wrapEnabledCheckbox.checked = Boolean(result.wrapEnabled || false);
  prefixText.value = result.prefixText !== undefined ? String(result.prefixText) : DEFAULT_PREFIX;
  suffixText.value = result.suffixText !== undefined ? String(result.suffixText) : DEFAULT_SUFFIX;
  
  // Toggle visibility on load
  templateInputsDiv.style.display = wrapEnabledCheckbox.checked ? 'flex' : 'none';
});

const TEMPLATE_SAVE_DELAY_MS = 500;
let templateSaveTimeout: ReturnType<typeof setTimeout> | undefined;

// Save low-frequency settings immediately
const saveWrapSetting = () => {
  chrome.storage.sync.set({
    wrapEnabled: wrapEnabledCheckbox.checked
  });
};

// Debounce high-frequency textarea updates to avoid hitting storage.sync quotas
const saveTemplates = () => {
  chrome.storage.sync.set({
    prefixText: prefixText.value,
    suffixText: suffixText.value
  });
};

const scheduleTemplateSave = () => {
  if (templateSaveTimeout !== undefined) {
    clearTimeout(templateSaveTimeout);
  }

  templateSaveTimeout = setTimeout(() => {
    saveTemplates();
    templateSaveTimeout = undefined;
  }, TEMPLATE_SAVE_DELAY_MS);
};

wrapEnabledCheckbox.addEventListener('change', () => {
  templateInputsDiv.style.display = wrapEnabledCheckbox.checked ? 'flex' : 'none';
  saveWrapSetting();
});

prefixText.addEventListener('input', scheduleTemplateSave);
suffixText.addEventListener('input', scheduleTemplateSave);

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
      let finalMarkdown = response.markdown;
      if (wrapEnabledCheckbox.checked) {
        finalMarkdown = `${prefixText.value}${finalMarkdown}${suffixText.value}`;
      }
      
      // Copy to clipboard
      await navigator.clipboard.writeText(finalMarkdown);
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
