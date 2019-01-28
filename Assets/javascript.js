

var database = firebase.database();
$('#add-train-btn').on('click', function (e) {
    e.preventDefault();
    var trainNam = $("#name-input").val().trim();
    var trainDes = $("#destination-input").val().trim();
    var trainFreq = $("#first-input").val().trim();
    var trainMin = $("#min-input").val().trim();
    var newTrain = {
        name: trainNam,
        destination: trainDes,
        frequency: trainFreq,
        minutes: trainMin,
    }

    database.ref('trains').push(newTrain).then(res => {
        console.log('train added')
    })


})

function snapshotToArray(snapshot) {
    var returnArr = [];

    snapshot.forEach(function (childSnapshot) {
        var item = childSnapshot.val();
        item.key = childSnapshot.key;

        returnArr.push(item);
    });

    return returnArr;
};

database.ref('trains').on('value', function (snapshot) {
    console.log(snapshot.val(), "This is what changed in the database")
    var arr = snapshotToArray(snapshot);
    $('#tbody').empty();
    arr.forEach(ele => {
        $('#tbody').append(`<tr><td>${ele.name}</td><td>${ele.destination}</td><td>${ele.frequency}</td><td>${ele.minutes}</td></tr>`)
    })
})

var tFrequency = 3;
var firstTime = "04:30";
var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
console.log(firstTimeConverted);

var currentTime = moment();
console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
console.log("DIFFERENCE IN TIME: " + diffTime);

var tRemainder = diffTime % tFrequency;
console.log(tRemainder);

var tMinutesTillTrain = tFrequency - tRemainder;
console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

var nextTrain = moment().add(tMinutesTillTrain, "minutes");
console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

