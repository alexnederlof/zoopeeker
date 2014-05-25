<div class="row">
	<div class="large-12 columns">
		<p></p>
	</div>
</div>
<div class="row">
	<div class="large-12 columns">
		<ul class="breadcrumbs">
			{{#each path}}
				<li><a href="{{link}}" class="b-a">{{text}}</a></li>
			{{/each}}
		</ul>
	</div>
</div>
<div class="row dataContainer{{#if count}} hide{{/if}}">
	<div class="large-12 columns">
		<textarea class="data"></textarea>
	</div>
</div>
<div class="row">
	<div class="large-10 columns">
		<button class="tiny button add">Add node</button>
	{{#if count}}
		<button class="tiny button getData">Get data</button>
	{{/if}}
	</div>
{{#unless count}}
	<div class="large-2 columns text-right">
		<button class="tiny success button save">Save</button>
	</div>
{{/unless}}
</div>
{{#if showSearch}}
<div class="row">
	<div class="large-12 columns">
		<div class="row collapse searchContainer">
			<div class="small-9 large-5 columns text-right">
				<input type="search" placeholder="Type znode name to search..." class="searchInput" tabindex="1" value="{{keyword}}">
			</div>
			<div class="small-3 large-1 end columns">
				<button class="tiny button prefix searchButton">Search</button>
			</div>
		</div>
	</div>
</div>
{{/if}}
<div class="row">
	<div class="large-12 columns children"></div>
</div>
<div class="row">
	<div class="large-12 columns paginationContainer"></div>
</div>