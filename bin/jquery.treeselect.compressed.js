(function(b){b.fn.treeselect=function(d){d=b.extend({colwidth:18,default_value:{},selected:null,treeloaded:null,load:null,searcher:null,deepLoad:!1,onbuild:null,postbuild:null,inputName:"treeselect",showRoot:!1,selectAll:!1,selectAllText:"Select All"},d);var h={},c=function(a,e){this.root=!!e;a.title=a.title||"anonymous";b.extend(this,{id:0,nodeloaded:!1,allLoaded:!1,value:0,title:"",url:"",has_children:!0,children:[],data:{},level:0,odd:!1,checked:!1,busy:!1,display:b(),input:b(),link:b(),span:b(),
childlist:b(),exclude:{}},a);this.isTreeNode=!0;this.loading=!1;this.loadqueue=[]};c.prototype.setBusy=function(a){a!=this.span.hasClass("treebusy")&&((this.busy=a)?this.span.addClass("treebusy"):this.span.removeClass("treebusy"))};c.prototype.isLoaded=function(){var a=this.nodeloaded,a=a|h.hasOwnProperty(this.id),a=a|!this.has_children;return a|=this.has_children&&0<this.children.length};c.prototype.loadNode=function(a,e){this.loading?a&&this.loadqueue.push(a):(this.loading=!0,d.load&&!this.isLoaded()?
(e||this.setBusy(!0),d.load(this,function(b){return function(f){b.nodeloaded||(b=jQuery.extend(b,f),b.nodeloaded=!0,h[b.id]=b.id,b.build());a&&a(b);for(var d in b.loadqueue)b.loadqueue[d](b);b.loadqueue.length=0;e||b.setBusy(!1)}}(this))):a&&a(this),this.loading=!1)};c.prototype.loadAll=function(a,b,d,f){f=f||{};this.loadNode(function(c){b&&b(c);var j=c.children.length,g=j;if(!j||f.hasOwnProperty(c.id))a&&a(c);else{f[c.id]=c.id;for(d||c.setBusy(!0);j--;)c.children[j].loadAll(function(){g--;g||(a&&
a(c),d||c.setBusy(!1))},b,d,f)}})};c.prototype.expand=function(a){this.checked=this.input.is(":checked");a?(this.link.removeClass("collapsed").addClass("expanded"),this.span.removeClass("collapsed").addClass("expanded"),this.childlist.show("fast")):0<this.span.length&&(this.link.removeClass("expanded").addClass("collapsed"),this.span.removeClass("expanded").addClass("collapsed"),this.childlist.hide("fast"));a&&!this.isLoaded()&&this.loadNode(function(a){a.checked&&a.selectChildren(a.checked);a.expand(!0)})};
c.prototype.selectChildren=function(a,b){if(a&&d.deepLoad&&!b)this.loadAll(function(f){for(var c=f.children.length;c--;)f.children[c].select(a),f.children[c].selectChildren(a,!0);d.selected&&d.selected(f,!b)});else{for(var c=this.children.length;c--;)this.children[c].select(a),this.children[c].selectChildren(a,!0);d.selected&&d.selected(this,!b)}};c.prototype.check=function(a){this.checked=a;this.input.attr("checked",a);d.selected&&d.selected(this,!0)};c.prototype.select=function(a){this.input.hasClass("treenode-no-select")||
(this.checked=a,this.input.attr("checked",a))};c.prototype.build_treenode=function(){var a=b(),a=b(document.createElement(this.root?"div":"li"));a.addClass("treenode");a.addClass(this.odd?"odd":"even");return a};c.prototype.build_input=function(a){if(d.inputName){if("undefined"!==typeof this.exclude[this.id])this.input=b(document.createElement("div")),this.input.addClass("treenode-no-select");else{this.input=b(document.createElement("input"));var e=this.value||this.id;this.input.attr({type:"checkbox",
value:e,name:d.inputName+"-"+e,checked:this.checked}).addClass("treenode-input");this.input.bind("click",function(a){return function(e){e=b(e.target).is(":checked");a.expand(e);a.selectChildren(e)}}(this));this.root&&!d.showRoot&&this.input.hide()}this.input.css("left",a+"px")}return this.input};c.prototype.build_link=function(a){a.css("cursor","pointer").addClass("collapsed");a.bind("click",{node:this},function(a){a.preventDefault();a.data.node.expand(b(a.target).hasClass("collapsed"))});return a};
c.prototype.build_span=function(a){if((!this.root||this.showRoot)&&this.has_children)this.span=this.build_link(b(document.createElement("span")).attr({"class":"treeselect-expand"})),this.span.css("left",a+"px");return this.span};c.prototype.build_title=function(a){if((!this.root||this.showRoot)&&this.title)this.nodeLink=b(document.createElement("a")).attr({"class":"treeselect-title",href:this.url,target:"_blank"}).css("marginLeft",a+"px").text(this.title),this.link=this.has_children?this.build_link(this.nodeLink.clone()):
b(document.createElement("div")).attr({"class":"treeselect-title"}).css("marginLeft",a+"px").text(this.title);return this.link};c.prototype.build_children=function(){this.childlist=b();if(0<this.children.length){this.childlist=b(document.createElement("ul"));var a=this.odd,e;for(e in this.children)this.children.hasOwnProperty(e)&&(a=!a,this.children[e]=new c(b.extend(this.children[e],{level:this.level+1,odd:a,checked:this.checked,exclude:this.exclude})),this.childlist.append(this.children[e].build()))}return this.childlist};
c.prototype.build=function(){var a=5,e=null;if(0==this.display.length)this.display=this.build_treenode();else if(this.root){var c=this.build_treenode();this.display.append(c);this.display=c}if(0==this.input.length&&(e=this.build_input(a))&&0<e.length)this.display.append(e),a+=d.colwidth;0==this.span.length&&(this.display.append(this.build_span(a)),a+=d.colwidth);0==this.link.length&&this.display.append(this.build_title(a));0==this.childlist.length&&this.display.append(this.build_children());if(d.onbuild)d.onbuild(this);
this.searchItem=this.display.clone();b(".treeselect-expand",this.searchItem).remove();a=b("div.treeselect-title",this.searchItem);0<a.length&&a.replaceWith(this.nodeLink);d.postbuild&&d.postbuild(this);"undefined"!==typeof this.exclude[this.id]&&0==b(".treenode-input",this.display).length&&this.display.hide();return this.display};c.prototype.getSelectAll=function(){return this.root&&this.selectAll?this.selectAllText:!1};c.prototype.setDefault=function(a,b){jQuery.isEmptyObject(a)?b&&b(this):this.loadAll(function(a){b&&
b(a)},function(b){(a.hasOwnProperty(b.value)||a.hasOwnProperty(b.id))&&b.check(!0)})};c.prototype.search=function(a,b){if(a){var k={};a=a.toLowerCase();d.searcher?d.searcher(this,a,function(a,d){var j=null,g;for(g in a)j=new c(d?d(a[g]):a[g]),j.nodeloaded=!0,h[j.id]=j.id,j.build(),k[g]=j;b(k,!0)}):this.loadAll(function(){b&&b(k,!0)},function(b){!b.root&&-1!==b.title.toLowerCase().search(a)&&(k[b.id]=b)},!0)}else b&&b(this.children,!1)};return b(this).each(function(){var a=b.extend(d,{display:b(this)}),
a=this.treenode=new c(a,!0),e=a.getSelectAll();!1!==e&&!a.showRoot&&(a.display.append(b(document.createElement("input")).attr({type:"checkbox"}).bind("click",function(a){return function(c){a.selectChildren(b(c.target).is(":checked"));d.selected&&d.selected(a,!0)}}(a))),e&&(e=b(document.createElement("span")).attr({"class":"treeselect-select-all"}).html(e),a.display.append(e)));var k=b(document.createElement("span")).addClass("treebusy");a.display.append(k);a.loadNode(function(a){k.remove();0==a.children.length&&
a.display.hide();a.checked&&a.selectChildren(a.checked);a.expand(!0);a.setDefault(d.default_value,function(a){d.treeloaded&&d.treeloaded(a)})});a.has_children||(this.parentElement.style.display="none")})}})(jQuery);
(function(b){b.fn.chosentree=function(d){d=b.extend({inputId:"chosentree-select",label:"",description:"",input_placeholder:"Select Item",input_type:"text",autosearch:!1,search_text:"Search",no_results_text:"No results found",min_height:100,more_text:"+%num% more",loaded:null,collapsed:!0,showtree:!1},d);return b(this).each(function(){var h=null,c=null,a=null,e=null,k=null,f=null,p=null,j=null,g=f=null,l=null,n=function(a){a&&(null==l||l.has_children)?g.addClass("treevisible").show("fast"):g.removeClass("treevisible").hide("fast")},
h=b(document.createElement("div"));h.addClass("chzntree-container");"search"==d.input_type?(h.addClass("chzntree-container-single"),a=b(document.createElement("div")),a.addClass("chzntree-search")):(h.addClass("chzntree-container-multi"),c=b(document.createElement("ul")),c.addClass("chzntree-choices chosentree-choices"),a=b(document.createElement("li")),a.addClass("search-field"));f=b(document.createElement("label"));f.attr({"for":d.inputId});f.text(d.label);j=b(document.createElement("div"));j.attr({"class":"description"});
j.text(d.description);if(d.input_placeholder){e=b(document.createElement("input"));e.attr({type:"text",placeholder:d.input_placeholder,autocomplete:"off"});!d.showtree&&d.collapsed&&e.focus(function(){n(!0)});if("search"==d.input_type){e.addClass("chosentree-search");var q=function(a){return!e.hasClass("searching")&&1!==a.length&&l?(e.addClass("searching"),l.search(a,function(a,b){e.removeClass("searching");var c=0;l.childlist.children().detach();b?l.childlist.addClass("chzntree-search-results"):
l.childlist.removeClass("chzntree-search-results");for(var f in a)c++,b?l.childlist.append(a[f].searchItem):l.childlist.append(a[f].display);c||l.childlist.append("<li>"+d.no_results_text+"</li>")}),!0):!1};if(d.autosearch){var s=0;e.bind("input",function t(){q(e.val())||(clearTimeout(s),s=setTimeout(t,1E3))});a.addClass("autosearch")}else k=b(document.createElement("input")),k.attr({type:"button",value:d.search_text}),k.addClass("chosentree-search-btn"),k.bind("click",function(a){a.preventDefault();
q(e.val())}),jQuery(document).bind("keydown",function(a){13==a.keyCode&&e.is(":focus")&&(a.preventDefault(),q(e.val()))}),a.addClass("manualsearch")}else e.addClass("chosentree-results");a.append(e);k&&a.append(k)}c?h.append(f).append(c.append(a)):h.append(f).append(a);g=b(document.createElement("div"));g.addClass("treewrapper");g.hide();p=b(document.createElement("span")).attr({"class":"tree-loading treebusy"}).css("display","block");f=b(document.createElement("div"));f.addClass("treeselect");b(this).keyup(function(a){27==
a.which&&n(!1)});g.append(f.append(p));b(this).append(h.append(g));b(this).append(j);var m=d,r=this;m.selected=function(f,j){var g=b("li#choice_"+f.id,c);if(f.id)if(f.checked&&0==g.length){g=b(document.createElement("li"));g.addClass("search-choice");g.attr("id","choice_"+f.id);g.eq(0)[0].nodeData=f;var k=b(document.createElement("span"));k.text(f.title);if(!f.root||f.showRoot&&f.has_children){var h=b(document.createElement("a"));h.addClass("search-choice-close");h.attr("href","javascript:void(0)");
h.bind("click",function(a){a.preventDefault();b("li#choice_"+f.id,c).remove();f.selectChildren(!1)})}a.before(g.append(k).append(h))}else f.checked||g.remove();if(j){var l=[];r.value={};c.show();e&&0==f.children.length&&e.attr({value:""});b("li.search-choice",c).each(function(){r.value[this.nodeData.id]=this.nodeData.value;l.push(this.nodeData)});jQuery.fn.moreorless&&(h=d.more_text.replace("%num%",l.length),c.moreorless(d.min_height,h),c.div_expanded||n(!0,null));m.loaded&&m.loaded(l);b(r).trigger("treeloaded")}};
m.treeloaded=function(){p.remove()};f.treeselect(m);l=f.eq(0)[0].treenode;(m.showtree||!m.collapsed)&&n(!0,null)})}})(jQuery);
