<div class="small-4 large-2 column">
	<p><small>Total {{type}}: {{count}}</small></p>
</div>
<ul class="pagination small-8 large-10 columns">
	<li class="arrow{{#unless prev}} hide{{/unless}}"><a href="{{prevPage}}" class="prev-page link">&laquo;</a></li>
	{{#each pages}}
		<li{{#if liClass}} class="{{liClass}}"{{/if}}><a href="{{text}}" class="link{{#if aClass}} {{aClass}}{{/if}}">{{{text}}}</a></li>
	{{/each}}
	<li class="arrow{{#unless next}} hide{{/unless}}"><a href="{{nextPage}}" class="next-page link">&raquo;</a></li>
</ul>
