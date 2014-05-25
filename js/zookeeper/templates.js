define(['handlebars'], function(Handlebars) {

this["templates"] = this["templates"] || {};

this["templates"]["js/zookeeper/ZNodeListItemView.hb"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<div class=\"large-1 small-3 columns\">\n	<button class=\"tiny alert button remove\">Remove</button>\n</div>\n<div class=\"large-11 small-9 columns\">\n	<a href=\"";
  if (helper = helpers.link) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.link); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\" class=\"link\">";
  if (helper = helpers.name) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.name); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</a>\n</div>\n";
  return buffer;
  });

this["templates"]["js/zookeeper/ZNodeView.hb"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\n				<li><a href=\"";
  if (helper = helpers.link) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.link); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\" class=\"b-a\">";
  if (helper = helpers.text) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.text); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</a></li>\n			";
  return buffer;
  }

function program3(depth0,data) {
  
  
  return " hide";
  }

function program5(depth0,data) {
  
  
  return "\n		<button class=\"tiny button getData\">Get data</button>\n	";
  }

function program7(depth0,data) {
  
  
  return "\n	<div class=\"large-2 columns text-right\">\n		<button class=\"tiny success button save\">Save</button>\n	</div>\n";
  }

function program9(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\n<div class=\"row\">\n	<div class=\"large-12 columns\">\n		<div class=\"row collapse searchContainer\">\n			<div class=\"small-9 large-5 columns text-right\">\n				<input type=\"search\" placeholder=\"Type znode name to search...\" class=\"searchInput\" tabindex=\"1\" value=\"";
  if (helper = helpers.keyword) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.keyword); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\">\n			</div>\n			<div class=\"small-3 large-1 end columns\">\n				<button class=\"tiny button prefix searchButton\">Search</button>\n			</div>\n		</div>\n	</div>\n</div>\n";
  return buffer;
  }

  buffer += "<div class=\"row\">\n	<div class=\"large-12 columns\">\n		<p></p>\n	</div>\n</div>\n<div class=\"row\">\n	<div class=\"large-12 columns\">\n		<ul class=\"breadcrumbs\">\n			";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.path), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n		</ul>\n	</div>\n</div>\n<div class=\"row dataContainer";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.count), {hash:{},inverse:self.noop,fn:self.program(3, program3, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\">\n	<div class=\"large-12 columns\">\n		<textarea class=\"data\"></textarea>\n	</div>\n</div>\n<div class=\"row\">\n	<div class=\"large-10 columns\">\n		<button class=\"tiny button add\">Add node</button>\n	";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.count), {hash:{},inverse:self.noop,fn:self.program(5, program5, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n	</div>\n";
  stack1 = helpers.unless.call(depth0, (depth0 && depth0.count), {hash:{},inverse:self.noop,fn:self.program(7, program7, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n</div>\n";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.showSearch), {hash:{},inverse:self.noop,fn:self.program(9, program9, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n<div class=\"row\">\n	<div class=\"large-12 columns children\"></div>\n</div>\n<div class=\"row\">\n	<div class=\"large-12 columns paginationContainer\"></div>\n</div>";
  return buffer;
  });

this["templates"]["js/zookeeper/addNode.hb"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<h2>Add node</h2>\n<form id=\"addNodeForm\">\n	<div class=\"row\">\n		<div class=\"large-12 columns\">\n			<label>Parent path: <b>"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.currentPath)),stack1 == null || stack1 === false ? stack1 : stack1.link)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</b>\n				<input type=\"text\" placeholder=\"Path\" class=\"path\" tabindex=\"0\" />\n			</label>\n		</div>\n	</div>\n	<div class=\"row\">\n		<div class=\"large-12 columns\">\n			<label>Data\n				<input type=\"text\" placeholder=\"Data\" class=\"data\" />\n			</label>\n		</div>\n	</div>\n	<div class=\"row\">\n		<div class=\"large-12 columns\">\n			<button type=\"submit\">Submit</button>\n		</div>\n	</div>\n</form>\n<a class=\"close-reveal-modal\">&#215;</a>";
  return buffer;
  });

return this["templates"];

});