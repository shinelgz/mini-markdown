/**
* @author shinelgz@163.com
* @date 2014-03-29
* 迷你markdown
**/
App = { doc : {}};
App.doc.make = function(str){
	if(!str) return ;
	var bmatchtime = 0;
	return str
		.replace(/\\#/g, '+_+')
		.replace(/\\\*/g, '+*+')
		.replace(/(\n)-{3}([^-])*?/g, '$1<hr/>$2')
		.replace(/\*([^\n]*)/g, '<p class="line">' + decodeURIComponent('%E2%97%8F') + '$1</p>')
		.replace(/#tip(\.\w+)?([^\n]*)/g,function (m, $1,$2){
			var c = 'error';
			switch($1){
				case '.r' : c = 'error'; break;
				case '.b' : c = 'success'; break;
				case '.y' : c = 'info'; break;
				case '.g' : c = 'block'; break;
			}
			return '<div class="alert alert-' +c + '">'+$2+'</div>';
		})
		.replace(/#b#/g,function(){
			return (bmatchtime++)%2 == 0 ? '<div class="well">' : '</div>';
		})
		.replace(/#\[([^\]\n]+)\]([^#\n]*)#/g, function (m, link, text){
			if(text){
				return '<a target="_blank" href="' +link+ '">' +text+ '</a>';
			}else{
				return '<img src="' +link+ '" \/>';
			}
		})
		.replace(/#([a-z]+)(\d)?((?:\.\w+)*)#?([^\n#]+)(#\/\1\2#)?/g, function(m,tag, $2, cls,$4){
			var c = $4,s2 = $2 || '';
			switch(tag){
				case 'em':
					cls = cls ? 'label label-'+cls.replace(/\.r/, 'important')
						.replace(/\.y/, 'warning').replace(/\.g/, 'success').replace(/\.b/, 'info') : '';
				break;
				case 'img' :
					return '<img src="' +c+ '" />';
			}
			if( cls){
				cls = cls.replace(/\./g,' ');
				return '<' + tag+s2 + ' class="' +cls+ '">' +c+ '</' + tag+s2 + '>';
			}else{
				return '<' + tag+s2 + '>' +c+ '</' + tag+s2 + '>';
			}
		})
		.replace(/([^>])\s*\n/g,'$1<br/>')
		.replace(/\+\_\+/g, '#')
		.replace(/\+\*\+/g, '*')
};