const axios = require("axios");

async function fetchCoordinates(city, state) {
  try {
    const response = await axios.get(process.env.MAP_URL, {
      access_key: process.env.MAP_API_KEY,
      query: `${city}, ${state}`,
      limit: 1,
    });
    const latitude = response.data[0]["latitude"];
    const longitude = response.data[0]["longitude"];
    return { latitude, longitude };
  } catch (error) {
    throw new Error(`Could not fetch Coordinates - ${error}`);
  }
}

module.exports = {
  fetchCoordinates,
};
