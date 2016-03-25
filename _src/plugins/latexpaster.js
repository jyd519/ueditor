UE.registerUI('latexpaste', function(editor, uiName) {
  'use strict';
  var pasteLatexMode = false;

  editor.registerCommand(uiName, {
    execCommand: function() {
      pasteLatexMode = !pasteLatexMode;
    },
    queryCommandState: function() {
      return pasteLatexMode ? 1 : 0;
    }
  });
  var btn = new UE.ui.Button({
    //按钮的名字
    name: uiName,
    label: "LaTex",
    showIcon: false,
    //提示
    title: "粘贴LaTex公式",
    //添加额外样式，指定icon图标，这里默认使用一个重复的icon
    cssRules: 'background-position: -500px 0;',
    //点击时执行的命令
    onclick: function() {
      //这里可以不用执行命令,做你自己的操作也可
      editor.execCommand(uiName);
    }
  });
  //当点到编辑内容上时，按钮要做的状态反射
  editor.addListener('selectionchange', function() {
    var state = editor.queryCommandState(uiName);
    if (state === -1) {
      btn.setDisabled(true);
      btn.setChecked(false);
    } else {
      btn.setDisabled(false);
      btn.setChecked(state);
    }
  });

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
  var domUtils = baidu.editor.dom.domUtils,
    browser = baidu.editor.browser;

  editor.addListener('ready', function() {
    domUtils.on(editor.body, browser.ie || browser.opera ? 'keydown' : 'paste', function(e) {
      if (!pasteLatexMode) {
        return;
      }

      if ((browser.ie || browser.opera) && ((!e.ctrlKey && !e.metaKey) || e.keyCode != '86')) {
        return;
      }
      var mathtexUrl = editor.options.mathtexUrl;
      if (mathtexUrl.indexOf('?')<0) {
        mathtexUrl += '?';
      }
      getClipboardData.call(editor, function(div) {
        var text = $(div).text();
        var $img = $('<img>').attr('data-latex', text)
          .attr('src', mathtexUrl + text)
          .addClass('item-latex');
        editor.execCommand('inserthtml', $img.wrap('<div>').parent().html());
      });
    });

    domUtils.on(editor.body, 'dblclick', function(e) {
      var range = editor.selection.getRange(),
        img = range.getClosedNode();
        if (img && img.tagName == 'IMG' && editor.body.contentEditable!="false") {
          if (img.className.indexOf("item-latex") != -1) {
            editor.execCommand("latexdialog");
            return; 
          }
        }
    });
  });

  //return btn;
});
