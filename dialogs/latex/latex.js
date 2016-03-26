/**
 * LaTex公式编辑器
 */
(function() {
  'use strict';
  var latexPanel;
  var MQ, mathField;

  window.onload = function() {
    initTabs();
    initButtons();
  };

  function getMathtexUrl() {
    var mathtexUrl = editor.options.mathtexUrl;
    if (mathtexUrl.indexOf('?')<0) {
      mathtexUrl += '?';
    }
    return mathtexUrl;
  }

  /* 初始化tab标签 */
  function initTabs() {
    var tabs = $G('tabhead').children;
    for (var i = 0; i < tabs.length; i++) {
      domUtils.on(tabs[i], "click", function(e) {
        var target = e.target || e.srcElement;
        setTabFocus(target.getAttribute('data-content-id'));
      });
    }

    var img = editor.selection.getRange().getClosedNode();
    if (img && img.tagName && img.tagName.toLowerCase() === 'img') {
      setTabFocus('remote');
    } else {
      setTabFocus('remote');
    }
  }

  /* 初始化tabbody */
  function setTabFocus(id) {
    if (!id) return;
    var i, bodyId, tabs = $G('tabhead').children;
    for (i = 0; i < tabs.length; i++) {
      bodyId = tabs[i].getAttribute('data-content-id');
      if (bodyId == id) {
        domUtils.addClass(tabs[i], 'focus');
        domUtils.addClass($G(bodyId), 'focus');
      } else {
        domUtils.removeClasses(tabs[i], 'focus');
        domUtils.removeClasses($G(bodyId), 'focus');
      }
    }
    switch (id) {
      case 'remote':
        latexPanel = latexPanel || new LatexPanel();
        break;
      case 'mathquill':
        mathField.latex($('#latex').val()); 
        break;
    }
  }

  /* 初始化onok事件 */
  function initButtons() {

    var mathFieldSpan = document.getElementById('math-field');
    var latexSpan = $('#mathlatex');

    MQ = MathQuill.getInterface(2); // for backcompat
    mathField = MQ.MathField(mathFieldSpan, {
      spaceBehavesLikeTab: true, // configurable
      handlers: {
        edit: function() { // useful event handlers
          $('#latex').val(mathField.latex());
        }
      }
    });

    dialog.onok = function() {
      var remote = false,
        list = [],
        id, tabs = $G('tabhead').children;
      for (var i = 0; i < tabs.length; i++) {
        if (domUtils.hasClass(tabs[i], 'focus')) {
          id = tabs[i].getAttribute('data-content-id');
          break;
        }
      }

      var text = $('#latex').val();
      if (text) {
        editor.execCommand('insertlatex', { latex: text });
      }
    };
  }


  /* 在线图片 */
  function LatexPanel(target) {
    this.container = utils.isString(target) ? document.getElementById(target) : target;
    this.init();
  }
  LatexPanel.prototype = {
    init: function() {
      this.initContainer();
      this.initEvents();
    },
    initContainer: function() {
      this.dom = {
        'url': $G('url')
      };
      var img = editor.selection.getRange().getClosedNode();
      if (img) {
        this.editMode = $(img).hasClass('item-latex');
        this.setImage(img);
      } else {
        $G('url').value = getMathtexUrl(); 
      }
    },
    initEvents: function() {
      var _this = this;

      /* LaTex改变了 */
      domUtils.on($G("latex"), 'keyup', function() {
        var latex = $G('latex').value;
        var url = $G('url').value;
        var newurl = url.substr(0, url.indexOf('?')) + '?' + latex;
        if (url != newurl) {
          $G('url').value = newurl;
          updatePreview();
        }
      });

      function updatePreview() {
        _this.setPreview();
      }
    },
    setImage: function(img) {
      /* 不是正常的图片 */
      if (!img.tagName || img.tagName.toLowerCase() != 'img' && !img.getAttribute("src") || !img.src) return;

      var wordImgFlag = img.getAttribute("word_img"),
        src = wordImgFlag ? wordImgFlag.replace("&amp;", "&") : (img.getAttribute('_src') || img.getAttribute("src", 2).replace("&amp;", "&")),
        align = editor.queryCommandValue("imageFloat");

      /* 防止onchange事件循环调用 */
      if (src !== $G("url").value) {
         $G("url").value = src;
      }
      if (src) {
        /* 设置表单内容 */
        $G("latex").value = img.getAttribute("data-latex") || "";
        this.setPreview();
      }
    },
    getData: function() {
      var data = {};
      for (var k in this.dom) {
        data[k] = this.dom[k].value;
      }

      var latex = $G('latex').value;
      var url = data['url'];
      url = url.substr(0, url.indexOf('?')) + '?' + latex;
      data['url'] = url;
      data['latex'] = latex;

      return data;
    },
    setPreview: function() {
      var url = $G('url').value, latex = $G('latex').value,
        preview = $G('preview');

      if (url) {
        $(preview).empty();
        var newurl = url.substr(0, url.indexOf('?')) + '?';
        /*
         * var scale = 1;
         * if (latex.indexOf('\\dpi{') === 0) {
         * } else {
         *   newurl += '\\dpi{600}';
         *   scale = 6;
         * }
         */

        $('<img/>').attr('src', newurl + latex).load(function() {
          // var w = this.width, h = this.height = this.height;
          // $(this).width(w / 6);
          // $(this).height(h / 6);
          // $(this).show();
        }).appendTo($(preview));
      }
    },
    getInsertList: function() {
      var data = this.getData();
      if (data['url']) {
        var imgData = {
          src: data['url'],
          _src: data['url'],
          'data-latex': data['latex']
        };
        return [imgData];
      } else {
        return [];
      }
    }
  };

})();
