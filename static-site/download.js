(() => {
  const button = document.querySelector('[data-copy-install]');
  if (!button) return;
  button.addEventListener('click', async () => {
    const text = document.getElementById('install-prompt-text');
    const status = document.querySelector('.copy-status');
    try {
      await navigator.clipboard.writeText(text.textContent);
      status.textContent = button.dataset.copyDone;
    } catch {
      const range = document.createRange(); range.selectNodeContents(text);
      const selection = window.getSelection(); selection.removeAllRanges(); selection.addRange(range);
      status.textContent = button.dataset.copyError;
    }
  });
})();
