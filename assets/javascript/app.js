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

    // Create a temp object for holding train data
    var newTrain = {
      name: trainName,
      destination: destiNation,
      first: firstTrain,
      frequency: freQuency
    };

    // Uploads data to the database
    database.ref().push(newTrain);

    // log data
    console.log(newTrain.name);
    console.log(newTrain.destination);
    console.log(newTrain.first);
    console.log(newTrain.frequency);

    //Clear the text boxes
    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#first-train-input").val("");
    $("#frequency-input").val("");

  });

// Now that the data is updating in firebase, we create a firebase event for adding the train info into a row in the html when the user submits an entry

database.ref().on("child_added", function(childSnapshot, prevChildKey){

  console.log(childSnapshot.val());

  //store it into a variable:
  var trainName = childSnapshot.val().name;
  var trainDest = childSnapshot.val().destination;
  var trainFirst = childSnapshot.val().first;
  var trainFreq = childSnapshot.val().frequency;

  // log train info
  console.log(trainName);
  console.log(trainDest);
  console.log(trainFirst);
  console.log(trainFreq);

  // use moment to format the military time
  var trainFirstFormat = moment(trainFirst, "hh:mm").subtract(1, "years");
  console.log(trainFirstFormat);

    // Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

     //   Difference between the times
    var diffTime = moment().diff(moment(trainFirstFormat), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    var tRemainder = diffTime % trainFreq;
    console.log(tRemainder);

    // Minute Until Train
    var tMinutesTillTrain = trainFreq - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));
    var nextArrival = moment(nextTrain).format("hh:mm");
  // // my logic which i think would work but the syntax is off:
  // // var trainMod = (currentTime - trainFirstFormat) % trainFreq
  // // var minutesAway = trainFreq - trainMod
  // // var nextArrival = minutesAway + currentTime

  // // break down the formula using moment:
  // var timeDiff = moment().diff(moment(trainFirstFormat), "minutes");
  // console.log(timeDiff);

  // // console.log(currentTime)
  // // console.log(trainMod);
  // // console.log(minutesAway);
  // // console.log(nextArrival);


  // // Add each train's data into the table
  $("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDest + "</td><td>" + trainFreq + "</td><td>" + nextArrival + "</td><td>" + tMinutesTillTrain + "</td></tr>");



});