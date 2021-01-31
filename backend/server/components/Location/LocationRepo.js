const logger = require("../../utils/logger");
const Location = require("./LocationModel"),
  { fetchCoordinates } = require("./LocationHelper");

async function getLocationByCityState(city, state) {
  try {
    const location = await Location.findOne({
      where: {
        city,
        state,
      },
    });
    return location ? location : null;
  } catch (error) {
    throw new Error(`Could not get Location by City/State - ${error}`);
  }
}

async function createNewLocation(city, state) {
  try {
    const { latitude, longitude } = await fetchCoordinates(city, state);
    const newLocation = await Location.create({
      city,
      state,
      longitude,
      latitude,
    });
    return newLocation;
  } catch (error) {
    throw new Error(`Could not create new Location - ${error}`);
  }
}

async function getLocation(params) {
  try {
    const { city, state } = params;
    let newLocation = await getLocationByCityState(city, state);
    if (!newLocation) {
      newLocation = await createNewLocation(city, state);
    }
    return newLocation;
  } catch (error) {
    throw new Error(`Could not get Location - ${error}`);
  }
}

module.exports = {
  getLocation,
};
