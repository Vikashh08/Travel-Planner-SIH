import axios from 'axios';

export async function getWeatherForCity(city = 'Goa') {
  const apiKey = process.env.WEATHER_API_KEY;

  if (apiKey && apiKey.trim() !== '' && !apiKey.includes('your_weather')) {
    try {
      const res = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)},IN&units=metric&appid=${apiKey}`);
      return {
        city: res.data.name,
        temp: Math.round(res.data.main.temp),
        condition: res.data.weather[0].main,
        description: res.data.weather[0].description,
        humidity: res.data.main.humidity,
        windSpeed: res.data.wind.speed,
        icon: `https://openweathermap.org/img/wn/${res.data.weather[0].icon}@2x.png`,
        isRealData: true
      };
    } catch (err) {
      console.warn('[Weather API] Failed, using fallback:', err.message);
    }
  }

  // Fallback weather map for Indian cities
  const cityKey = city.toLowerCase();
  let temp = 28;
  let condition = "Sunny & Pleasant";
  let humidity = 65;
  let windSpeed = 12;

  if (cityKey.includes('manali') || cityKey.includes('ladakh') || cityKey.includes('kashmir')) {
    temp = 14;
    condition = "Cool Mountain Breeze";
    humidity = 48;
    windSpeed = 18;
  } else if (cityKey.includes('jaipur') || cityKey.includes('udaipur')) {
    temp = 31;
    condition = "Clear & Warm";
    humidity = 40;
    windSpeed = 10;
  } else if (cityKey.includes('kerala') || cityKey.includes('goa')) {
    temp = 29;
    condition = "Tropical Sunshine";
    humidity = 78;
    windSpeed = 15;
  }

  return {
    city: city.charAt(0).toUpperCase() + city.slice(1),
    temp,
    condition,
    description: `${condition} with comfortable travel conditions.`,
    humidity,
    windSpeed,
    icon: "https://openweathermap.org/img/wn/01d@2x.png",
    isRealData: false,
    label: "Demo Weather Fallback"
  };
}
