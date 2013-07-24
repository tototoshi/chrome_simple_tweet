(function() {
        
    var getTweetURL = function (text) {
        var base = 'http://twitter.com/intent/tweet?source=webclient';
        if (text) {
            return base + '&text=' + encodeURIComponent(text);
        } else {
            return base;
        }
    };

    var createMessage = function(text, url) {
        return '"' + text + '" ' + url;        
    };

    var tweet = function() {
        chrome.tabs.create({
            "url": getTweetURL()
        })
    };

    var postCurrentPage = function (info, tab) {
        var title = tab.title;
        var url = tab.url;
        chrome.tabs.create({
            "url": getTweetURL(createMessage(title, url))
        });
    };

    var postSlectedText = function(info, tab) {
        var selection = info.selectionText;
        var url = tab.url;
        chrome.tabs.create({
            "url": getTweetURL(createMessage(selection, url))
        });
    };

    var parent = chrome.contextMenus.create({
        "title": "Post to Twitter",
        "contexts": ["all"],
    });

    chrome.contextMenus.create({
        "title": "Tweet",
        "parentId": parent,
        "contexts": ["all"],
        "onclick": tweet
    });

    chrome.contextMenus.create({
        "title": "Post current page",
        "parentId": parent,
        "contexts": ["all"],
        "onclick": postCurrentPage
    });

    chrome.contextMenus.create({
        "title": "Post selected text",
        "parentId": parent,
        "contexts": ["selection"],        
        "onclick": postSlectedText
    })

})();
