//支持粘贴LaTex
UE.plugins['pastelatex'] = function() {
  'use strict';
  var me = this;
  var pasteLatexMode = false;

  me.commands['pastelatex'] = {
    execCommand: function() {
      pasteLatexMode = !pasteLatexMode;
    },
    queryCommandState: function() {
      return pasteLatexMode ? 1 : 0;
    },
    notNeedUndo: function() {
      return 1;
    }
  };

  function getClipboardData(callback) {
    var doc = this.document;
    if (doc.getElementById('baidu_pastebin')) {
      return;
    }
    var range = this.selection.getRange(),
      bk = range.createBookmark(),
      //创建剪贴的容器div
      pastebin = doc.createElement('div');
    pastebin.id = 'baidu_pastebin';
    // Safari 要求div必须有内容，才能粘贴内容进来
    browser.webkit && pastebin.appendChild(doc.createTextNode(domUtils.fillChar + domUtils.fillChar));
    doc.body.appendChild(pastebin);
    //trace:717 隐藏的span不能得到top
    //bk.start.innerHTML = '&nbsp;';
    bk.start.style.display = '';
    pastebin.style.cssText = "position:absolute;width:1px;height:1px;overflow:hidden;left:-1000px;white-space:nowrap;top:" +
      //要在现在光标平行的位置加入，否则会出现跳动的问题
      domUtils.getXY(bk.start).y + 'px';

    range.selectNodeContents(pastebin).select(true);

    setTimeout(function() {
      if (browser.webkit) {
        for (var i = 0, pastebins = doc.querySelectorAll('#baidu_pastebin'), pi; pi = pastebins[i++];) {
          if (domUtils.isEmptyNode(pi)) {
            domUtils.remove(pi);
          } else {
            pastebin = pi;
            break;
          }
        }
      }
      try {
        pastebin.parentNode.removeChild(pastebin);
      } catch (e) {}
      range.moveToBookmark(bk).select(true);
      callback(pastebin);
    }, 0);
  }

  me.addListener('ready', function() {
    domUtils.on(me.body, browser.ie || browser.opera ? 'keydown' : 'paste', function(e) {
      if (!pasteLatexMode) {
        return;
      }

      if ((browser.ie || browser.opera) && ((!e.ctrlKey && !e.metaKey) || e.keyCode != '86')) {
        return;
      }
      var mathtexUrl = me.options.mathtexUrl;
      if (mathtexUrl.indexOf('?') < 0) {
        mathtexUrl += '?';
      }
      getClipboardData.call(me, function(div) {
        var text = $(div).text();
        var $img = $('<img>').attr('data-latex', text)
          .attr('src', mathtexUrl + text)
          .addClass('item-latex');
        me.execCommand('inserthtml', $img.wrap('<div>').parent().html());
      });
    });

    domUtils.on(me.body, 'dblclick', function(e) {
      var range = me.selection.getRange(),
        img = range.getClosedNode();
      if (img && img.tagName == 'IMG' && me.body.contentEditable != "false") {
        if (img.className.indexOf("item-latex") != -1) {
          var dialog = me.ui._dialogs.mathlatexDialog;
          dialog.open();
          return;
        }
      }
    });
  });
};
