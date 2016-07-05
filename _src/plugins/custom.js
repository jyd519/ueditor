//自定义 括号
UE.commands['brackets'] = {
  execCommand: function(cmdName) {
    var me = this;
    if (me.queryCommandState(cmdName) !== -1) {
      this.execCommand('insertHtml', '（　　）');
      return true;
    }
  }
};

//I
UE.commands['roman1'] = {
  execCommand: function(cmdName) {
    var me = this;
    if (me.queryCommandState(cmdName) !== -1) {
      this.execCommand('insertHtml', 'Ⅰ');
      return true;
    }
  }
};

//II
UE.commands['roman2'] = {
  execCommand: function(cmdName) {
    var me = this;
    if (me.queryCommandState(cmdName) !== -1) {
      this.execCommand('insertHtml', 'Ⅱ');
      return true;
    }
  }
};

//III.
UE.commands['roman3'] = {
  execCommand: function(cmdName) {
    var me = this;
    if (me.queryCommandState(cmdName) !== -1) {
      this.execCommand('insertHtml', 'Ⅲ');
      return true;
    }
  }
};

//IV.
UE.commands['roman4'] = {
  execCommand: function(cmdName) {
    var me = this;
    if (me.queryCommandState(cmdName) !== -1) {
      this.execCommand('insertHtml', 'Ⅳ');
      return true;
    }
  }
};

//V.
UE.commands['roman5'] = {
  execCommand: function(cmdName) {
    var me = this;
    if (me.queryCommandState(cmdName) !== -1) {
      this.execCommand('insertHtml', 'Ⅴ');
      return true;
    }
  }
};

//VI.
UE.commands['roman6'] = {
  execCommand: function(cmdName) {
    var me = this;
    if (me.queryCommandState(cmdName) !== -1) {
      this.execCommand('insertHtml', 'Ⅵ');
      return true;
    }
  }
};

//VII.
UE.commands['roman7'] = {
  execCommand: function(cmdName) {
    var me = this;
    if (me.queryCommandState(cmdName) !== -1) {
      this.execCommand('insertHtml', 'Ⅶ');
      return true;
    }
  }
};

//填空项
UE.commands['itemblank'] = {
  execCommand: function(cmdName) {
    var me = this;
    var range = this.selection.getRange();
    var node = this.selection.getRange().startContainer;
    var inBlank = false;
    if (!!node && node.nodeType == 1 && domUtils.hasClass(node, 'item-blank')) {
      inBlank = true;
    } else if (!!node) {
      node = domUtils.findParentByTagName(node, 'span');
      if (!!node && domUtils.hasClass(node, "item-blank")) {
        inBlank = true;
      }
    }
    if (inBlank) {
      range.setEndBefore(node);
      node.parentNode.removeChild(node);
      range.select();
      me.fireEvent("delitemblank");
      return;
    }

    this.execCommand('insertHtml', '<span class="item-blank"></span>&nbsp;');
    me.fireEvent("additemblank");
    return true;
  },
  queryCommandState: function() {
    var node = this.selection.getRange().startContainer;
    var inBlank = false;
    if (!!node && node.nodeType == 1 && domUtils.hasClass(node, 'item-blank')) {
      inBlank = true;
    } else if(!!node) {
      var span = domUtils.findParentByTagName(node, 'span');
      if (!!span && domUtils.hasClass(span, "item-blank")) {
        inBlank = true;
      }
    }
    var blankDom = this.container.querySelector('.edui-for-itemblank');
    if (inBlank) {
       blankDom.querySelector('.edui-label').innerHTML = "&#x232b;";
       blankDom.querySelector('.edui-button-body').setAttribute('title', '删除填空项');
    } else {
       blankDom.querySelector('.edui-label').innerHTML = " __ ";
       blankDom.querySelector('.edui-button-body').setAttribute('title', '插入填空项');
    }
    return 0;
  }
};

