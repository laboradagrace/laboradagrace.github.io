
broker = $("#broker").val();


$("#connect").click(function(){
  client = mqtt.connect(broker)
  $("#status").text("Successfully connected!");
  //console.log("Successfully connected!")



  //disconnect button
  $("#disconnect").click(function(){
    $("#status").text("Disconnected");
    console.log("disconnect")
    client.end();
  
  })


  //subscribe
  $("#btnSubscribe").click(function(){
    subTopic = $("#subTopic").val();
    if(subTopic != ""){
      client.subscribe(subTopic, function(){
      console.log("Subscribed!")
      //console.log(subTopic)
      var row = $("<tr>")
        $("<td>").text(subTopic).appendTo($(row));
		    $("<td>").text(moment().format('MMMM Do YYYY, h:mm:ss a')).appendTo($(row));
        $("#receiver3").append($(row));
    })
   }
   $("#btnUnsubscribe").click(function(){
    subTopic = $("#subTopic").val();
    client.unsubscribe(subTopic, function(){
      console.log("Unsubscribe!")
    })
  })



     //publish
    $("#btnPublish").click(function(){
      pubTopic = $("#pubTopic").val();
      pubPayload = $("#pubPayload").val();
      if(subTopic == pubTopic){
        client.publish(pubTopic, pubPayload)
        console.log("publish")
        var row = $("<tr>")
        $("<td>").text(pubTopic).appendTo($(row));
		    $("<td>").text(pubPayload).appendTo($(row));
		    $("<td>").text(moment().format('MMMM Do YYYY, h:mm:ss a')).appendTo($(row));
        $("#receiver2").append($(row));
      }
    })
  })


  client.on("message", function (topic, payload) {
    console.log([topic, payload].join(": "));
    var row = $("<tr>")
    $("<td>").text(topic).appendTo($(row));
		$("<td>").text(payload).appendTo($(row));
		$("<td>").text(moment().format('MMMM Do YYYY, h:mm:ss a')).appendTo($(row));
    $("#receiver1").append($(row));
    })



})




