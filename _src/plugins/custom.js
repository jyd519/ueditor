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
    if (me.queryCommandState(cmdName) !== -1) {
      this.execCommand('insertHtml', '<span class="item-blank"></span>&nbsp;');
      me.fireEvent("additemblank");
      return true;
    }
  },
  queryCommandState: function() {
    var span = domUtils.findParentByTagName(this.selection.getRange().startContainer, 'span');
    return !!span? (domUtils.hasClass(span, 'item-blank') ? -1 : 0) : 0;
  }
};

