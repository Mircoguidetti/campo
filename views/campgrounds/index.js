<% include ../partials/header %>

<div class="container">
	<header class="jumbotron">
		<div class="container">

			<h2> View our hand-picked campgrounds from all over the world</h2>
			<form action="/campgrounds" method="GET" class="form-inline">
			<div class="form-group">
			<input class=" search-bar form-control" type="search" name="search" value="" placeholder="Search Campgrounds...">
			<button class=" btn btn-primary btn-sm"> Search</button>
			</div>
			</form>


		</div>
	</header>

	<div class="row text-center" style="display: flex; flex-wrap: wrap;">
		<% campgrounds.forEach(function(campground){ %>
			<div class="col-md-3 col-sm-6">
				<div class="thumbnail">
					<img class="index-img" src="<%= campground.image %>">
					<div class="caption">
						<h4><%= campground.name %></h4>
						<span class="color-index"><%= campground.description.substring(0,100) %></span><br>
						<a class="btn" href="/campgrounds/<%= campground._id %>">Read More</a>
					</div>
				</div>
			</div>
		<% }) %>
	</div>
</div>

<% include ../partials/footer %>
