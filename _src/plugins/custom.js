//自定义 括号
UE.commands['brackets'] = {
  execCommand: function(cmdName) {
    var me = this;
    if (me.queryCommandState(cmdName) !== -1) {
      this.execCommand('insertHtml', '（&nbsp;&nbsp;&nbsp;&nbsp;）');
      return true;
    }
  }
};

//I.
UE.commands['roman1'] = {
  execCommand: function(cmdName) {
    var me = this;
    if (me.queryCommandState(cmdName) !== -1) {
      this.execCommand('insertHtml', 'I.');
      return true;
    }
  }
};

//II.
UE.commands['roman2'] = {
  execCommand: function(cmdName) {
    var me = this;
    if (me.queryCommandState(cmdName) !== -1) {
      this.execCommand('insertHtml', 'II.');
      return true;
    }
  }
};

//III.
UE.commands['roman3'] = {
  execCommand: function(cmdName) {
    var me = this;
    if (me.queryCommandState(cmdName) !== -1) {
      this.execCommand('insertHtml', 'III.');
      return true;
    }
  }
};

//IV.
UE.commands['roman4'] = {
  execCommand: function(cmdName) {
    var me = this;
    if (me.queryCommandState(cmdName) !== -1) {
      this.execCommand('insertHtml', 'IV.');
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

