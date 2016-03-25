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
