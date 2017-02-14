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

// Fill in price data using AJAX and API
$(document).ready(function() {
   $.ajax({
      url: "disabled/api/v1/ticketprice",
      dataType: 'json',
      type: 'GET',
      success: function (data) {
         console.log(data.data);
         $("[id=ticket-price").text(data.data.CurrentTicketPrice.toFixed(2));
         $("[id=ticket-avg").text(data.data.AvgTicketPrice.toFixed(2));
         $("[id=next-ticket-price").text(data.data.NextTicketPrice.toFixed(2));
         // up or down
         var movement = "up";
         if (data.data.CurrentTicketPrice > data.data.NextTicketPrice) movement = "down";
         $("[id=price-movement").text(movement);
         // compare to average
         var compare = "above";
         if (data.data.CurrentTicketPrice < data.data.AvgTicketPrice) compare = "below";
         if (data.data.CurrentTicketPrice < data.data.AvgTicketPrice * 1.2) compare = "just above";
         $("[id=price-compare").text(compare);
         var blocks = 144 - (data.data.Height % 144);
         $("[id=block-adjust").text(blocks);
         // recomendation
         var recommend = "waiting";
         if (compare == "below" && movement == "up") recommend = "buying";
         if (compare == "just above" && movement == "up") recommend = "watching";
         $("[id=ticket-recommend").text(recommend);
         // time to adjust
         var time = new Date(blocks*5*60 * 1000).toISOString().substr(11, 8);
         $("[id=time-adjust").text(time);
      },
      error: function (data) {
         console.log("fail", data);
         console.log(data);
      },
   });
});

$(document).ready(function() {

   // prepare data structures
   $.ticketPrices = {
      CurrentTicketPrice: undefined,
      NextTicketPrice: undefined,
      AvgTicketPrice: undefined,
      Height: undefined,
      // temporary for calculating avg
      PoolSize: undefined,
      Locked: undefined,
   };

   $.updatePrices = function(p) {
      if (p.CurrentTicketPrice != undefined) {
         $("[id=ticket-price").text(p.CurrentTicketPrice.toFixed(2));
      }
      if (p.NextTicketPrice != undefined) {
         $("[id=next-ticket-price").text(p.NextTicketPrice.toFixed(2));
      }
      if (p.Height != undefined) {
         var blocks = 144 - (p.Height % 144);
         $("[id=block-adjust").text(blocks);
         // time to adjust
         var time = new Date(blocks*5*60 * 1000).toISOString().substr(11, 8);
         $("[id=time-adjust").text(time);
      }
      if (p.Locked != undefined && p.PoolSize != undefined) {
         p.AvgTicketPrice = (1.0*p.Locked)/(1.0*p.PoolSize);
         $("[id=ticket-avg").text(p.AvgTicketPrice.toFixed(2));
      }
      // up or down?
      if (p.CurrentTicketPrice != undefined &&
          p.NextTicketPrice != undefined) {
         if (p.CurrentTicketPrice > p.NextTicketPrice) 
            $("[id=price-movement").text("down");
         else
            $("[id=price-movement").text("up");
      }
      // recomendation
      if (p.CurrentTicketPrice != undefined &&
          p.AvgTicketPrice != undefined &&
          p.NextTicketPrice != undefined) {
         var action = "waiting";
         if (p.CurrentTicketPrice < p.AvgTicketPrice &&
            p.CurrentTicketPrice < p.NextTicketPrice) 
            action = "buying";
         else if (p.CurrentTicketPrice < (1.2*p.AvgTicketPrice) &&
             p.CurrentTicketPrice < p.NextTicketPrice)
            action = "watching";
         $("[id=ticket-recommend").text(action);
         // how it compares to averge?
         var cmp = "above";
         if (p.CurrentTicketPrice < p.AvgTicketPrice)
            cmp = "below";
         else if (p.CurrentTicketPrice < (1.2*p.AvgTicketPrice))
            cmp = "just above";
         $("[id=ticket-compare").text(cmp);
      }
   }

   $.exampleSocket = new WebSocket("wss://stats.decredbrasil.com/primus/");

   $.exampleSocket.onopen = function (event) {
      console.log("sending ready...");
      $.exampleSocket.send(JSON.stringify({action: 'ready'}));
      $.exampleSocket.send(JSON.stringify({action: 'get-init', data: {}}));
      $.exampleSocket.send('ready');
   };
         
   $.exampleSocket.onmessage = function (evt) 
   { 
     var data = JSON.parse(evt.data);
     //console.log("Message is received...");
     //console.log(evt.data);
     var action = data.action
     data = data.data;
     //console.log(action);
     switch (action) {
      case "client-ping":
         response = {
            action: 'client-pong', 
            data: {
               serverTime: data.serverTime,
               clientTime: Date.now()
            }
         };
         json = JSON.stringify(response);
         //console.log("Message is sent...");
         //console.log(json);
         $.exampleSocket.send(json);
         break;
      case 'rawmsg':
         console.log(data)
         switch(data.id) {

         case "getblock":
            var block = data.result;
            if ($.ticketPrices.Height == null 
                  || $.ticketPrices.Height > block.height) {
               $.ticketPrices.Height = block.height;
               $.ticketPrices.PoolSize = block.poolsize;
               $.ticketPrices.CurrentTicketPrice = block.sbits;
            }
            $.updatePrices($.ticketPrices);
            break;
         case "estimatestakediff":
            $.ticketPrices.NextTicketPrice = data.result.expected;
            $.updatePrices($.ticketPrices);
            break;
         case "getticketpoolvalue":
            $.ticketPrices.Locked = data.result;
            $.updatePrices($.ticketPrices);
            break;
         }
      }
   };
         
   $.exampleSocket.onclose = function()
   { 
     // websocket is closed.
     console.log("Connection is closed..."); 
   };
});
