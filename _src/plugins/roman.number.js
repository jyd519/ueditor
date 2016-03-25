//自定义 括号
UE.plugins['brackets'] = function(){
	 var me = this;
	 me.commands['brackets'] = {
	     execCommand : function( cmdName ) {
	        var me = this;
	        if(me.queryCommandState(cmdName)!==-1){
	        	this.execCommand('insertHtml','（　　）');
	            return true;
	        }
	     }
	 };
};

//I.
UE.plugins['roman1'] = function(){
	 var me = this;
	 me.commands['roman1'] = {
	     execCommand : function( cmdName ) {
	        var me = this;
	        if(me.queryCommandState(cmdName)!==-1){
	        	this.execCommand('insertHtml','I.');
	            return true;
	        }
	     }
	 };
};

//II.
UE.plugins['roman2'] = function(){
	 var me = this;
	 me.commands['roman2'] = {
	     execCommand : function( cmdName ) {
	        var me = this;
	        if(me.queryCommandState(cmdName)!==-1){
	        	this.execCommand('insertHtml','II.');
	            return true;
	        }
	     }
	 };
};

//III.
UE.plugins['roman3'] = function(){
	 var me = this;
	 me.commands['roman3'] = {
	     execCommand : function( cmdName ) {
	        var me = this;
	        if(me.queryCommandState(cmdName)!==-1){
	        	this.execCommand('insertHtml','III.');
	            return true;
	        }
	     }
	 };
};

//IV.
UE.plugins['roman4'] = function(){
	 var me = this;
	 me.commands['roman4'] = {
	     execCommand : function( cmdName ) {
	        var me = this;
	        if(me.queryCommandState(cmdName)!==-1){
	        	this.execCommand('insertHtml','IV.');
	            return true;
	        }
	     }
	 };
};
