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
         $("p #ticket-price").text(p.CurrentTicketPrice.toFixed(2));
         $("h1 #ticket-price").text(p.CurrentTicketPrice.toFixed(2));
	 $("h1 #ticket-price").css("color", color);
      }
      if (p.NextTicketPrice != undefined) {
         $("#next-ticket-price").text(p.NextTicketPrice.toFixed(2));
      }
      if (p.Height != undefined) {
         var blocks = 144 - (p.Height % 144);
         $("#block-adjust").text(blocks);
         // time to adjust
         var time = new Date(blocks*5*60 * 1000).toISOString().substr(11, 8);
         $("#time-adjust").text(time);
      }
      if (p.Locked != undefined && p.PoolSize != undefined) {
         p.AvgTicketPrice = (1.0*p.Locked)/(1.0*p.PoolSize);
         $("#ticket-avg").text(p.AvgTicketPrice.toFixed(2));
      }
      // up or down?
      if (p.CurrentTicketPrice != undefined &&
          p.NextTicketPrice != undefined) {
         if (p.CurrentTicketPrice > p.NextTicketPrice) {
            $("#price-movement").text("down");
         } else {
            $("#price-movement").text("up");
	}
      }
      // recomendation
      if (p.CurrentTicketPrice != undefined &&
          p.AvgTicketPrice != undefined &&
          p.NextTicketPrice != undefined) {
         var action = "waiting";
	 var color = "#FD714A"; // orange
         if (p.CurrentTicketPrice < p.AvgTicketPrice &&
            p.CurrentTicketPrice < p.NextTicketPrice) {
            action = "buying";
	    color = "#2ED6A1"; // Turquiose
	 }
         else if (p.CurrentTicketPrice < (1.2*p.AvgTicketPrice) &&
             p.CurrentTicketPrice < p.NextTicketPrice) {
            action = "watching";
	    color = "#69D3F5";
	 }
         $("#ticket-recommend").text(action);
         $("#ticket-recommend").css("color", color);
         $("#ticket-recommend").css("text-transform", "uppercase");
	 $("h1 #ticket-price").css("color", color);
         // how it compares to averge?
         var cmp = "above";
         if (p.CurrentTicketPrice < p.AvgTicketPrice)
            cmp = "below";
         else if (p.CurrentTicketPrice < (1.2*p.AvgTicketPrice))
            cmp = "just above";
         $("#price-compare").text(cmp);
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
