var getTweetURL = function (text) {
    var base = 'http://twitter.com/intent/tweet?source=webclient';
    if (text) {
        return base + '&text=' + encodeURIComponent(text);
    } else {
        return base;
    }
};

chrome.tabs.getSelected(null, function(tab) {

    var title = tab.title;
    var url = tab.url;

    chrome.tabs.executeScript( {
        code: "var s = document.getSelection(); (s ? s.toString() : '')"
    }, function(selectedText) {
        var text = null;
        if (typeof selectedText == "undefined") {
            text = '';
        } else if (selectedText instanceof Array) {
            text = selectedText.toString();
        } else {
            text = selectedText;
        }
        if (text === '') {
            window.open(getTweetURL('"' + title + '" ' + url));
        } else {
            window.open(getTweetURL('"' + text + '" / ' + title + ' ' + url));
        }
    });

});
