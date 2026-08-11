import { GoogleGenerativeAI } from '@google/generative-ai';

export async function generateAiItinerary({ destination, startingLocation, days, budget, travelType, interests, transportPreference, numberOfPeople }) {
  const apiKey = process.env.GEMINI_API_KEY;

  if (apiKey && apiKey.trim() !== '' && !apiKey.includes('your_gemini_api_key')) {
    try {
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: 'gemini-3.6-flash' });

      const prompt = `You are the lead travel planner for GoNomad India. Create a detailed day-wise itinerary for a trip to ${destination}.
Details:
- Starting location: ${startingLocation || 'Home city'}
- Duration: ${days || 3} days
- Budget: ₹${budget || 15000}
- Travel type: ${travelType || 'Solo/Family'}
- Interests: ${interests?.join(', ') || 'Attractions, Local food, Culture'}
- Transport preference: ${transportPreference || 'Local Ride & Cab'}
- Number of people: ${numberOfPeople || 2}

Respond ONLY with valid JSON in the following format:
{
  "destination": "${destination}",
  "totalBudgetEstimated": ${budget || 15000},
  "dayWiseItinerary": [
    {
      "day": 1,
      "title": "Day Title",
      "activities": ["Activity 1", "Activity 2"],
      "recommendedFood": ["Dish 1", "Dish 2"],
      "transportMode": "Local Cab / Auto",
      "estimatedCost": 3500
    }
  ],
  "budgetBreakdown": {
    "travelToDestination": 4000,
    "hotelStay": 5000,
    "foodAndDining": 3000,
    "localRidesAndGuide": 2000,
    "activities": 1000
  },
  "safetyTips": ["Safety tip 1", "Safety tip 2"],
  "packingList": ["Essential 1", "Essential 2"]
}`;

      const result = await model.generateContent(prompt);
      const text = result.response.text();
      const cleanJson = text.replace(/```json/g, '').replace(/```/g, '').trim();
      return JSON.parse(cleanJson);
    } catch (err) {
      console.warn('[Gemini AI] Call failed or API key invalid. Using intelligent fallback generator:', err.message);
    }
  }

  // Fallback engine if no API key or API call fails
  const daysNum = parseInt(days) || 3;
  const budgetNum = parseInt(budget) || 15000;

  const dayWise = [];
  for (let i = 1; i <= daysNum; i++) {
    dayWise.push({
      day: i,
      title: i === 1 ? `Arrival in ${destination} & Heritage Highlights` : i === 2 ? `Exploring Nature, Coastal & Local Food Trails` : `Adventure, Bazaars & Departure`,
      activities: [
        `Morning sightseeing at top attractions in ${destination}`,
        `Afternoon guided local culture walk & photo spots`,
        `Evening sunset experience & local market stroll`
      ],
      recommendedFood: [
        `${destination} Special Thali & Regional Delicacies`,
        `Famous Street Snacks & Fresh Refreshments`
      ],
      transportMode: "GoNomad Local Cab / Auto",
      estimatedCost: Math.round(budgetNum * 0.25 / daysNum)
    });
  }

  return {
    destination: destination || "Goa",
    totalBudgetEstimated: budgetNum,
    dayWiseItinerary: dayWise,
    budgetBreakdown: {
      travelToDestination: Math.round(budgetNum * 0.3),
      hotelStay: Math.round(budgetNum * 0.35),
      foodAndDining: Math.round(budgetNum * 0.15),
      localRidesAndGuide: Math.round(budgetNum * 0.12),
      activities: Math.round(budgetNum * 0.08)
    },
    safetyTips: [
      `Keep digital copies of tickets & ID cards on your phone.`,
      `Always check local weather forecast before outdoor excursions.`,
      `Use GoNomad verified rides and local guides for safe navigation.`
    ],
    packingList: [
      "Light breathable clothing & comfortable walking shoes",
      "Power bank, sunscreen, sunglasses & personal medicine kit",
      "Government photo ID (Aadhaar / Passport)"
    ]
  };
}

export async function generateSmartRecommendations({ startingCity, budget, days, interest, travelStyle }) {
  const apiKey = process.env.GEMINI_API_KEY;

  if (apiKey && apiKey.trim() !== '' && !apiKey.includes('your_gemini_api_key')) {
    try {
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: 'gemini-3.6-flash' });
      const prompt = `Recommend 3 top Indian travel destinations for a traveler starting from ${startingCity || 'Delhi'} with a budget of ₹${budget || 15000}, staying ${days || 4} days, interested in ${interest || 'Nature'}, travel style ${travelStyle || 'Relaxed'}.
Respond ONLY with valid JSON array:
[
  {
    "name": "Destination Name",
    "state": "State Name",
    "matchScore": 95,
    "whyRecommended": "Reason description",
    "estimatedBudget": 14000,
    "bestCategory": "Beach/Mountain/Heritage"
  }
]`;
      const result = await model.generateContent(prompt);
      const text = result.response.text();
      const cleanJson = text.replace(/```json/g, '').replace(/```/g, '').trim();
      return JSON.parse(cleanJson);
    } catch (err) {
      console.warn('[Gemini AI] Recommendation call failed:', err.message);
    }
  }

  // Smart fallback recommendation matrix
  return [
    {
      name: "Goa",
      state: "Goa",
      matchScore: 98,
      whyRecommended: `Perfect fit for ₹${budget || 15000} budget! Offers golden beaches, water sports, vibrant nightlife, and rich Portuguese heritage.`,
      estimatedBudget: Math.round((budget || 15000) * 0.9),
      bestCategory: "Beach"
    },
    {
      name: "Manali",
      state: "Himachal Pradesh",
      matchScore: 92,
      whyRecommended: `Ideal for ${days || 4} days of scenic mountain views, crisp pine air, Solang Valley adventure, and cozy wooden cafes.`,
      estimatedBudget: Math.round((budget || 15000) * 0.85),
      bestCategory: "Mountain"
    },
    {
      name: "Jaipur",
      state: "Rajasthan",
      matchScore: 88,
      whyRecommended: `Easily accessible from ${startingCity || 'major hubs'}. Majestic hilltop forts, royal palaces, and incredible street food.`,
      estimatedBudget: Math.round((budget || 15000) * 0.75),
      bestCategory: "Heritage"
    }
  ];
}
