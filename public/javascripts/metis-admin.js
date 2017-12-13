$(document).ready(function(){
  $('#menu-toggle').click(function() {
		$('body').toggleClass('sidebar-left-mini sidebar-left-opened');
	})
	$('#menu li.menu-dropdown').click(function() {
		$('#menu li.menu-dropdown').not(this).removeClass('active');
		$(this).toggleClass('active');
		$(this).children('ul.collapse').toggleClass('in');
	})
});