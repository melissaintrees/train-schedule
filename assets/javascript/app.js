var config = {
    apiKey: "AIzaSyAJVJQqkTNi4j561P0YxbE5isNv8gWtUxc",
    authDomain: "train-schedule-app-ed8cb.firebaseapp.com",
    databaseURL: "https://train-schedule-app-ed8cb.firebaseio.com",
    projectId: "train-schedule-app-ed8cb",
    storageBucket: "train-schedule-app-ed8cb.appspot.com",
    messagingSenderId: "1041905070811"
  };

  firebase.initializeApp(config);

  var database = firebase.database();

  // Initialize Firebase
  // create a button for adding new trains

  $("#submit-train-btn").on("click", function(event){
    event.preventDefault();

    // Grabs user input
    var trainName = $("#train-name-input").val().trim();
    var destiNation = $("#destination-input").val().trim();
    var firstTrain = $("#first-train-input").val().trim();
    var freQuency = $("#frequency-input").val().trim();
  })