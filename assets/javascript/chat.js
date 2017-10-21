// /// Initialize Firebase
//   var config = {
//     apiKey: "AIzaSyAhJkkVqqzp9fYTuqli0Z6X6iH5F3MnTSU",
//     authDomain: "fir-rps-6649a.firebaseapp.com",
//     databaseURL: "https://fir-rps-6649a.firebaseio.com",
//     projectId: "fir-rps-6649a",
//     storageBucket: "fir-rps-6649a.appspot.com",
//     messagingSenderId: "1085160073858"
//   };
//   firebase.initializeApp(config);


//   //database instance
//   var database = firebase.database();

// var chatRef= database.ref("/chat");

// chatRef.onDisconnect().remove();


// function getMessage(){

//   var inputMessage=$('#chatbox').val();
//   function sendMessage(){
//   chatRef.push({
//     chatMessage:inputMessage,
//   })
// } 
// }

// chatRef.on("value",function(chatsnapshot){

//   console.log(chatsnapshot);

// })