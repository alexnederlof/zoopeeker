define(["handlebars"],function(a){return this.Handlebars=this.Handlebars||{},this.Handlebars.templates=this.Handlebars.templates||{},this.Handlebars.templates["js/pagination/main.hb"]=a.template(function(a,b,c,d,e){function f(){return" hide"}function g(a,b){var d,e,f="";return f+="\n		<li",d=c["if"].call(a,a&&a.liClass,{hash:{},inverse:o.noop,fn:o.program(4,h,b),data:b}),(d||0===d)&&(f+=d),f+='><a href="',(e=c.text)?d=e.call(a,{hash:{},data:b}):(e=a&&a.text,d=typeof e===m?e.call(a,{hash:{},data:b}):e),f+=n(d)+'" class="link',d=c["if"].call(a,a&&a.aClass,{hash:{},inverse:o.noop,fn:o.program(6,i,b),data:b}),(d||0===d)&&(f+=d),f+='">',(e=c.text)?d=e.call(a,{hash:{},data:b}):(e=a&&a.text,d=typeof e===m?e.call(a,{hash:{},data:b}):e),(d||0===d)&&(f+=d),f+="</a></li>\n	"}function h(a,b){var d,e,f="";return f+=' class="',(e=c.liClass)?d=e.call(a,{hash:{},data:b}):(e=a&&a.liClass,d=typeof e===m?e.call(a,{hash:{},data:b}):e),f+=n(d)+'"'}function i(a,b){var d,e,f="";return f+=" ",(e=c.aClass)?d=e.call(a,{hash:{},data:b}):(e=a&&a.aClass,d=typeof e===m?e.call(a,{hash:{},data:b}):e),f+=n(d)}this.compilerInfo=[4,">= 1.0.0"],c=this.merge(c,a.helpers),e=e||{};var j,k,l="",m="function",n=this.escapeExpression,o=this;return l+='<div class="small-4 large-2 column">\n	<p><small>Total ',(k=c.type)?j=k.call(b,{hash:{},data:e}):(k=b&&b.type,j=typeof k===m?k.call(b,{hash:{},data:e}):k),l+=n(j)+": ",(k=c.count)?j=k.call(b,{hash:{},data:e}):(k=b&&b.count,j=typeof k===m?k.call(b,{hash:{},data:e}):k),l+=n(j)+'</small></p>\n</div>\n<ul class="pagination small-8 large-10 columns">\n	<li class="arrow',j=c.unless.call(b,b&&b.prev,{hash:{},inverse:o.noop,fn:o.program(1,f,e),data:e}),(j||0===j)&&(l+=j),l+='"><a href="',(k=c.prevPage)?j=k.call(b,{hash:{},data:e}):(k=b&&b.prevPage,j=typeof k===m?k.call(b,{hash:{},data:e}):k),l+=n(j)+'" class="prev-page link">&laquo;</a></li>\n	',j=c.each.call(b,b&&b.pages,{hash:{},inverse:o.noop,fn:o.program(3,g,e),data:e}),(j||0===j)&&(l+=j),l+='\n	<li class="arrow',j=c.unless.call(b,b&&b.next,{hash:{},inverse:o.noop,fn:o.program(1,f,e),data:e}),(j||0===j)&&(l+=j),l+='"><a href="',(k=c.nextPage)?j=k.call(b,{hash:{},data:e}):(k=b&&b.nextPage,j=typeof k===m?k.call(b,{hash:{},data:e}):k),l+=n(j)+'" class="next-page link">&raquo;</a></li>\n</ul>\n'}),this.Handlebars.templates});