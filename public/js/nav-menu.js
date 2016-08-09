$(document).ready(function(){

	//Mobile nav button toggle
	$('.menu_nav_button-m').click(function() {
		$(this).toggleClass('menu_nav_button-m-active');
		// $('.menu_nav_container-m').slideToggle('.menu_nav_container-m-active'); //breaks when expanded
		$('.menu_nav_container-m').toggleClass('menu_nav_container-m-active');
	});

	//Fix for responsive menu when open but above 770px
	$(document).resize(function(){
		if ($(window).width() > 770) {
			$('.menu_nav_container-m').removeClass('menu_nav_container-m-active');
		}
	});

	//Removes menu after link is clicked
	$('.menu_a-m').click(function() {
		$('.menu_nav_button-m').toggleClass('menu_nav_button-m-active');
		$('.menu_nav_container-m').toggleClass('menu_nav_container-m-active');
	});

	//Album show page thumbnail to large image
	$('.album_page_thumb').click(function() {
		console.log('clicked hide');
		$('.album_page_div').hide();
		var src = $(this).attr('src');
		$('#album_page_large-img').attr('src', src).show();
	});
	$('#album_page_large-img').hide().click(function(){
		console.log('clicked show');
		$(this).hide();
		$('.album_page_div').show();
	});

});
