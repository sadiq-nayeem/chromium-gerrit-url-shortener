document.addEventListener('DOMContentLoaded', function () {
    var displayButton = document.getElementById('display-button');
    var copyButton = document.getElementById('copy-button');
    var stringInput = document.getElementById('string-input');
    var resultDiv = document.getElementById('result');

    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        var currentUrl = tabs[0].url;
    
        if (currentUrl.includes('chromium-review.googlesource.com/c/chromium/src/+/')) {
          var modifiedUrl = currentUrl.replace(
            'https://chromium-review.googlesource.com/c/chromium/src/+/',
            'crrev.com/c/'
          );
          resultDiv.textContent = modifiedUrl;
        }
      });
    
  
    displayButton.addEventListener('click', function () {
      var inputValue = stringInput.value;
      if (inputValue) {
        var modifiedValue = inputValue.replace(
          'https://chromium-review.googlesource.com/c/chromium/src/+/',
          'crrev.com/c/'
        );
        resultDiv.textContent = modifiedValue;
      }
    });
  
    copyButton.addEventListener('click', function () {
      var range = document.createRange();
      range.selectNode(resultDiv);
      window.getSelection().removeAllRanges();
      window.getSelection().addRange(range);
  
      try {
        var successful = document.execCommand('copy');
        var message = successful ? 'Copied to clipboard!' : 'Unable to copy. Please try again.';
        console.log(message);
      } catch (err) {
        console.log('Unable to copy. Please try again.', err);
      }
  
      window.getSelection().removeAllRanges();
    });
  });
  