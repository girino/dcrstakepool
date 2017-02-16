// loader 
$(window).load(function() { // makes sure the whole site is loaded
   $('#preload-status').fadeOut(); // will first fade out the loading animation
   $('#preloader').delay(350).fadeOut('slow'); // will fade out the white DIV that covers the website.
   $('body').delay(350).css({'overflow':'visible'});
})

// Sticky Header
//$('.main_header').addClass('sticky');
//$('#header_pad').height( $('.main_header').outerHeight() );
//$( '.main_header' ).resize(function() {
//	$('#header_pad').height( $('.main_header').outerHeight() );
//});

$(window).scroll(function() {
   if ($(window).scrollTop() >= 70) {
      $('.main_header').addClass('sticky');
      //$('#header_pad').height( $('.main_header').height() );
   } else {
      $('.main_header').removeClass('sticky');
   }
});

// shows menu it mouse is on top of the screen
$(document).mousemove(function(e){
        if (e.pageY < 70 || $(window).scrollTop() >= 70 || $('.main_header').hasClass('open-nav')) {
          $('.main_header').addClass('sticky');
        } else {
          $('.main_header').removeClass('sticky');
        }
    });

// Mobile Navigation
$('.mobile-toggle').click(function() {
   if ($('.main_header').hasClass('open-nav')) {
      $('.main_header').removeClass('open-nav');
   } else {
      $('.main_header').addClass('open-nav');
   }
});

$('.main_header li a').click(function() {
   if ($('.main_header').hasClass('open-nav')) {
      $('.navigation').removeClass('open-nav');
      $('.main_header').removeClass('open-nav');
   }
});

// wow js
new WOW().init();

// nice scroll
$(document).ready(function() { 
   $("html").niceScroll({cursorwidth:"8",cursorborderradius:"none",cursorborder:"none",cursorcolor:"#3498db",mousescrollstep:"60"});
}); 

// Up to top js
$(document).ready(function() {
   $().UItoTop({ easingType: 'easeOutQuart' });
});

$(document).ready(function() {
   $("#btn-see-all").click(function() {
      $('html, body').animate({
         scrollTop: $("#scroll-to").offset().top
      });
   });
});
