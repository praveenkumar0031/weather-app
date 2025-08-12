// Read the variables from the .env file via process.env
const rapidApiKey = process.env.REACT_APP_RAPIDAPI_KEY;
const rapidApiHost = process.env.REACT_APP_RAPIDAPI_HOST;

export const geoApiOtps = {
	method: 'GET',
	headers: {
		// Use the variables here
		'x-rapidapi-key': rapidApiKey,
		'x-rapidapi-host': rapidApiHost
	}
};

// Use the environment variables for your URLs as well
export const geo_Api_Url = process.env.REACT_APP_GEO_API_URL;
export const weather_Api_Url = process.env.REACT_APP_WEATHER_API_URL;
export const weather_Api_Key = process.env.REACT_APP_WEATHER_API_KEY;

// It's a good practice to add a check to ensure keys are loaded
if (!rapidApiKey || !weather_Api_Key) {
  console.error("API Keys are not defined! Check your .env file and restart the server.");
}
