//insertlatex
UE.commands['insertlatex'] = {
    execCommand:function (cmd, opt) {

        if (!opt || !opt.latex) {
            return;
        }

        var me = this,
            range = me.selection.getRange(),
            img = range.getClosedNode();
						
				var mathtexUrl = me.options.mathtexUrl;
        if (!mathtexUrl) {
          console.log("mathtexUrl not configed.");
          return;
        }
				if (mathtexUrl.indexOf('?')<0) {
					mathtexUrl += '?';
				}

        if(me.fireEvent('beforeinsertlatex', opt) === true){
            return;
        }

        if (img && /img/i.test(img.tagName) && (img.className === "item-latex")) {
					domUtils.removeAttributes(img, "style width height");
					domUtils.setAttributes(img, {
								'data-latex': opt.latex,
							  'src': mathtexUrl + opt.latex,
							  '_src': mathtexUrl + opt.latex,
								'class': 'item-latex'
						});
				} else {
					function escapeHtmlValue(unsafe) {
						return unsafe
						.replace(/&/g, "&amp;")
						.replace(/"/g, "&quot;");
					}
					var html= [];
					html.push('<img class="item-latex" data-latex="');
					html.push(escapeHtmlValue(opt.latex));
					html.push('" src="');
					html.push(mathtexUrl + escapeHtmlValue(opt.latex));
					html.push('" />');
					me.execCommand('insertHtml', html.join(''));
				}
        me.fireEvent('afterinsertlatex', opt);
		}
};

