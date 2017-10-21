// Initialize Firebase
  var config = {
    apiKey: "AIzaSyAhJkkVqqzp9fYTuqli0Z6X6iH5F3MnTSU",
    authDomain: "fir-rps-6649a.firebaseapp.com",
    databaseURL: "https://fir-rps-6649a.firebaseio.com",
    projectId: "fir-rps-6649a",
    storageBucket: "fir-rps-6649a.appspot.com",
    messagingSenderId: "1085160073858"
  };
  firebase.initializeApp(config);


  //database instance
  var database = firebase.database();


  //all our connections will be stored here
  var connectionsRef = database.ref("/connections");

  //info/connected returns a boolean to see if a client is connected to database
  var connectedRef = database.ref(".info/connected");
  var playersRef = database.ref("/playersRef");

  var turnRef = database.ref('/turn/');

  var choice = ["Rock", "Paper", "Scissors"];

  turnRef.onDisconnect().remove();
var player1Wins=0;
var player2Wins=0;
var player2Losses=0;
var player1Losses=0;
var player1 = {};
var player2 = {};
//create input text field and append to playerNames div
var input = $("<input id=playerName type=text placeholder=Name>");
$("#inputPlayer").append(input);


var button = $("<button id=addPlayer value=submit type=submit>Submit</button>");
button.addClass("btn btn-primary btn-default");


var player;
var otherPlayer;


$("#inputPlayer").append(button);


//this is to keep track of connections 
connectedRef.on("value", function(snap) {

if (snap.val()) {


    var con = connectionsRef.push(true);
    con.onDisconnect().remove();
    }
});



  database.ref().once('value', function(snapshot) {
        var playerObj = snapshot.child('/playersRef/');
        var num = playerObj.numChildren();
        console.log("Num is " + num);

        if (num === 0) {
         
          player = 1;
          otherPlayer = 2;
          console.log("Line 69 " + player);
        }

        else if(num === 1){
          player = 2;
          otherPlayer = 1;
         console.log("Line 74 " + player);

        }

})

playersRef.on("child_added", function(childsnapshot){


var key = childsnapshot.key;
console.log("Key " + key);
console.log("Line 81 Key: "+ key);

if(key === '1' ){
      

      player1.name = childsnapshot.val().player1;
      player1.wins = childsnapshot.val().wins;
      player1.losses = childsnapshot.val().losses;



      console.log("player1 name " + player1.name);
      console.log("player1 name " + player1.wins);
      console.log("player1 name " + player1.losses);

       //update html with the playerName
       $('#player1').html("Hi " + player1.name + " You are player 1" + '<br>');
    $('#player1Stats').html("Wins: " + player1.wins + " Losses: " +player1.losses+ '<br>');
}

else if(key === '2'){
      

      player2.name = childsnapshot.val().player2;
      player2.wins = childsnapshot.val().wins;
      player2.losses = childsnapshot.val().losses;


      console.log("player1 name " + player2.name);
      console.log("player1 name " + player2.wins);
      console.log("player1 name " + player2.losses);

      //update html with the playerName
      $('#player2').html("Hi " + player2.name + " You are player 2" + '<br>');
  $('#player2Stats').html("Wins: " + player2.wins + " Losses: " +player2.losses+ '<br>');

  
  
    turnRef.set(1);
    
    console.log("line 104 " + player);
      
 }
 })







$('body').on("click", "#addPlayer", function(){


connectionsRef.once("value", function(snapshot){

  

    if(snapshot.numChildren() === 1){
          database.ref('/playersRef/' + snapshot.numChildren()).set({
              player1: $("#playerName").val(),
              wins: player1Wins,
              losses: player1Losses

          })


    database.ref('/playersRef/' + snapshot.numChildren()).onDisconnect().remove();
    
    $("#addPlayer").hide();
    $("#playerName").hide();
    }

   if(snapshot.numChildren() === 2){
          database.ref('/playersRef/' + snapshot.numChildren()).set({
              player2: $("#playerName").val(),
              wins: player2Wins,
              losses: player2Losses

          })

    database.ref('/playersRef/' + snapshot.numChildren()).onDisconnect().remove();
   
   
    $("#addPlayer").hide();
    $("#playerName").hide();
    }


});

turnRef.on("value", function(turn){
console.log("Line 137 " + turn.val());
console.log("line 138 " + player);

console.log(" I am in turnref");

  if(turn.val() === 1 && player===1){
      console.log("I AM NOT HERE");
    for (var i = 0; i < choice.length; i++) {


         console.log("choices " + choice[i]);
         var newDiv = $('<div>');
         newDiv.html(choice[i]);
         newDiv.addClass('player1Choices');
         $("#player1").append(newDiv);
         $("#player1Area").css('border','4px solid yellow');
        }
        
   
  }
  
  else if(turn.val() === 2 && otherPlayer === 1  ){
  console.log("otherplayer before goign to loop" +otherPlayer);
    for (var i = 0; i < choice.length; i++) {

         console.log("I CAME HERE");
         console.log("choices " + choice[i]);
         var newDiv = $('<div>');
         newDiv.html(choice[i]);
         newDiv.addClass('player2Choices');
         $("#player2").append(newDiv);
    $("#player2Area").css('border','4px solid yellow');   
        }
        
        
  }
  
  else if(turn.val() === 3){

    //call function to show result and update wins and losses
  playersRef.on("child_added",function(choice_key){
  
  var key_1=choice_key.key;
  
  console.log("choice key",key_1)
    if(key_1 === '1'){
    choice1=choice_key.val().choice;
    console.log("first Player:"+choice1)
    }
    if(key_1 === '2'){
    choice2=choice_key.val().choice;
    console.log("second Player:"+choice2)
    }
    })
    
    console.log("first Player: outside if:"+choice1)
     console.log("second Player: outside if:"+choice2)
     if(choice1===choice2){
     
     $('#results').html("<p>This game is a tie<p>");
     
     }
     else if(choice1==='Rock' && choice2 ==='Scissors'){
     player1Wins++;
     player2Losses++;
    database.ref('/playersRef/1').update({
      wins: player1Wins
    })
    database.ref('/playersRef/2').update({
      losses: player2Losses
    })
  $('#results').html("<p>"+player1.name+" wins<p>");
  
     }
     else if(choice1==='Rock' && choice2 ==='Paper'){
     player2Wins++;
     player1Losses++;
      database.ref('/playersRef/2').update({
      wins: player2Wins
    })
    database.ref('/playersRef/1').update({
      losses: player1Losses
    })
  $('#results').html("<p>"+player2.name+" wins<p>");
     }
     else if(choice1==='Scissors' && choice2 ==='Paper'){
      player1Wins++;
     player2Losses++;
     database.ref('/playersRef/1').update({
      wins: player1Wins
    })
    database.ref('/playersRef/2').update({
      losses: player2Losses
    })
  $('#results').html("<p>"+player1.name+" wins<p>");
    
     }
     else if(choice1==='Scissors' && choice2 ==='Rock'){
       player2Wins++;
     player1Losses++;
      database.ref('/playersRef/2').update({
      wins: player2Wins++
    })
    database.ref('/playersRef/1').update({
      losses:player1Losses++
    })
  $('#results').html("<p>"+player2.name+" wins<p>");
    
     }
     else if(choice1==='Paper' && choice2 ==='Scissors'){
     player2Wins++;
     player1Losses++;
     database.ref('/playersRef/2').update({
      wins: player2Wins
    })
    database.ref('/playersRef/1').update({
      losses: player1Losses
    })
  $('#results').html("<p>"+player2.name+" wins<p>");
    
     }
     else if(choice1==='Paper' && choice2 ==='Rock'){
    player1Wins++;
    player2Losses++;
    database.ref('/playersRef/1').update({
      wins: player1Wins
    })
    database.ref('/playersRef/2').update({
      losses: player2Losses
    })
  $('#results').html("<p>"+player1.name+" wins<p>");
     }

  $('#player2Choices').empty();
  $('#player1Choices').empty(); 

playersRef.on("child_changed", function(statsnapshot){


var key = statsnapshot.key;
console.log("Key " + key);
console.log("Line 81 Key: "+ key);

if(key === '1' ){
      


      player1.wins = statsnapshot.val().wins;
      player1.losses = statsnapshot.val().losses;



      console.log("player1 name " + player1.name);
      console.log("player1 name " + player1.wins);
      console.log("player1 name " + player1.losses);


    $('#player1Stats').html("Wins: " + player1.wins + " Losses: " +player1.losses+ '<br>');
}

else if(key === '2'){
      

 
      player2.wins = statsnapshot.val().wins;
      player2.losses = statsnapshot.val().losses;


      console.log("player1 name " + player2.name);
      console.log("player1 name " + player2.wins);
      console.log("player1 name " + player2.losses);

   
  $('#player2Stats').html("Wins: " + player2.wins + " Losses: " +player2.losses+ '<br>');
  
  }
  });
    turnRef.set(1);
    //console.log("i am here for second turn");
    //console.log("Player value after one gameline 395"+player)
    //console.log("otherPlayer value after one gameline396"+otherPlayer)
    //}
    //else{
    //console.log("Player value after one game-2"+player)
    //console.log("otherPlayer value after one game-2"+otherPlayer)
    //turnRef.remove();
    //}
    
}


})
})














$('body').on('click', '.player1Choices', function(){
      var player1Selection = $(this).text();
      console.log("Line 152 " + player1Selection);
      
      var newDiv = $('<div>');
      newDiv.html("Your Choice " + player1Selection);

      $(".player1Choices").remove();
      
   
      $("#player1Choices").append(newDiv);

     database.ref('/playersRef/1').update({
      choice: player1Selection
    })

     turnRef.set(2);
  
      
})


$('body').on('click', '.player2Choices', function(){
      var player2Selection = $(this).text();
      console.log("Line 152 " + player2Selection);
      
      var newDiv = $('<div>');
      newDiv.html("Your Choice " + player2Selection);
      
      $(".player2Choices").remove();
 
      $("#player2Choices").append(newDiv)

     database.ref('/playersRef/2').update({
       choice: player2Selection
    })

     turnRef.set(3);
      

})


