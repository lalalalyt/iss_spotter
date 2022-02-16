/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */
const request = require("request");
const fetchMyIP = (callback) => {
  request("https://api.ipify.org?format=json", (error, resp, body) => {
    if (error) {
      callback(error, null);
      return;
    }
    if (resp.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    const ip = JSON.parse(body).ip;
    callback(null, ip);
    // console.log(body)
    // console.log(typeof body)
    return;
  });
};

const fetchCoordsByIP = (ip, callback) => {
  const geo = {};
  request(
    `https://freegeoip.app/json/${ip}?apikey=XXXXXXXXXXXXXX`,
    (err, resp, body) => {
      if (err) {
        callback(err, null);
        return;
      }
      if (resp.statusCode !== 200) {
        const msg = `Status Code ${resp.statusCode} when fetching geo data. Response: ${body}`;
        callback(Error(msg), null);
        return;
      }
      geo.latitude = JSON.parse(body).latitude;
      geo.longitude = JSON.parse(body).longitude;
      callback(null, geo);
    }
  );
};

/**
 * Makes a single API request to retrieve upcoming ISS fly over times the for the given lat/lng coordinates.
 * Input:
 *   - An object with keys `latitude` and `longitude`
 *   - A callback (to pass back an error or the array of resulting data)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The fly over times as an array of objects (null if error). Example:
 *     [ { risetime: 134564234, duration: 600 }, ... ]
 */
const fetchISSFlyOverTimes = function (coords, callback) {
  request(
    `https://iss-pass.herokuapp.com/json/?lat=${coords.latitude}&lon=${coords.longitude}`,
    (err, resp, body) => {
      if (err) {
        callback(err, null);
        return;
      }
      if (resp.statusCode !== 200) {
        const msg = `Status Code ${resp.statusCode} when fetching ISS flyover time. Response: ${body}`;
        callback(Error(msg), null);
        return;
      }
      const passes = JSON.parse(body).response;
      callback(null, passes);
    }
  );
};

/**
 * Orchestrates multiple API requests in order to determine the next 5 upcoming ISS fly overs for the user's current location.
 * Input:
 *   - A callback with an error or results.
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The fly-over times as an array (null if error):
 *     [ { risetime: <number>, duration: <number> }, ... ]
 */
const nextISSTimesForMyLocation = function (callback) {
  let ipAddress = "";
  fetchMyIP((error, ip) => {
    if (error) {
      console.log("It didn't work!", error);
      return;
    }
    console.log("It worked! Returned IP:", ip);
    ipAddress = ip;
    let geo = {};
    fetchCoordsByIP(ipAddress, (error, data) => {
      if (error) {
        console.log("Can't find the geo data", error);
        return;
      }
      console.log("Found and returned geo data:", data);
      geo = data;
      fetchISSFlyOverTimes(geo, (err, body) => {
        if (err) {
          console.log("Can't get ISS flyover time", err);
          return;
        }
        console.log("Returned ISS flyover time:", body);
      });
    });
  });
};

module.exports = {
  fetchMyIP,
  fetchCoordsByIP,
  fetchISSFlyOverTimes,
  nextISSTimesForMyLocation,
};
