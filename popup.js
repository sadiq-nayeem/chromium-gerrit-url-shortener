document.addEventListener('DOMContentLoaded', function () {
  var displayButton = document.getElementById('display-button');
  var stringInput = document.getElementById('string-input');
  var resultDiv = document.getElementById('result');

  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    var currentUrl = tabs[0].url;

    if (currentUrl.includes('chromium-review.googlesource.com/c/chromium/src/+/')) {
      var modifiedUrl = currentUrl.replace(
        'chromium-review.googlesource.com/c/chromium/src/+/',
        'crrev.com/c/'
      );
      resultDiv.textContent = modifiedUrl;
    }
  });

  displayButton.addEventListener('click', function () {
    var inputValue = stringInput.value;
    if (inputValue) {
      var modifiedValue = inputValue.replace(
        'chromium-review.googlesource.com/c/chromium/src/+/',
        'crrev.com/c/'
      );
      resultDiv.textContent = modifiedValue;
    }
  });
});
