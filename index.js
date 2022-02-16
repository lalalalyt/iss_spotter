const { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes, nextISSTimesForMyLocation } = require("./iss");

// let ipAddress = "";
// fetchMyIP((error, ip) => {
//   if (error) {
//     console.log("It didn't work!", error);
//     return;
//   }
//   console.log("It worked! Returned IP:", ip);
//   ipAddress = ip;
// });

// let geo = {};
// fetchCoordsByIP(ipAddress, (error, data) => {
//   if (error) {
//     console.log("Can't find the geo data", error);
//     return;
//   }
//   console.log("Found and returned geo data:", data);
//   geo = data;
// });

// fetchISSFlyOverTimes({ latitude: '45.5225', longitude: '-73.6373' }, (err, body) => {
//   if (err) {
//     console.log("Can't get ISS flyover time", err);
//     return;
//   }
//   console.log("Returned ISS flyover time:", body);
// });


nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  // success, print out the deets!
  console.log(passTimes);
});