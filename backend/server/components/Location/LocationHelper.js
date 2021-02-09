const fetch = require("node-fetch");
const logger = require("../../utils/logger");

async function fetchCoordinates(city, state) {
  try {
    if (process.env !== "PRODUCTION") {
      const response = await fetch(
        `${process.env.MAP_URL}?access_key=${process.env.MAP_API_KEY}&query=${city}, ${state}&limit=1`
      );
      let APIresponse = await response.json();
      const { data } = APIresponse;
      const latitude = data[0]["latitude"];
      const longitude = data[0]["longitude"];
      return { latitude, longitude };
    } else {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      // generate random coordinates
      return {
        latitude: Math.floor(Math.random() * 90 + 1),
        longitude: Math.floor(Math.random() * 180 + 1),
      };
    }
  } catch (error) {
    logger.error(error);
    throw new Error(`Could not fetch Coordinates - ${error}`);
  }
}

module.exports = {
  fetchCoordinates,
};
