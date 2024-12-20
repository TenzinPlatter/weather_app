import { DayData, WeatherData } from "./types";

const key = "GSFV4P9VMXM5LJXZN2Y27CJXE";

async function fetchWeatherData(location: string): Promise<Object> {
	const response = await fetch(
		`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=metric&key=${key}&contentType=json`,
			{mode: "cors"}
	)

	return response.json();
}

function cleanData(data: any): WeatherData {
	let days: Array<DayData> = [];

	for (const day of data.days) {
		let res: DayData = {
			datetime: day.datetime,
			tempmax: day.tempmax,
			tempmin: day.tempmin,
			precipitation: day.precip,
			description: day.description,
			icon: day.icon,
		};

		days.push(res);
	}

	const res: WeatherData = {
		description: data.description,
		timezone: data.timezone,
		tzoffset: data.tzoffset,
		alerts: data.alerts,
		days: days,
		coordinates: {
			latitude: data.latitude,
			longitude: data.longitude,
		}
	};
	
	return res;
}

async function getWeatherData(location: string): Promise<WeatherData> {
	const response = await fetchWeatherData(location);
	const data = cleanData(response);
	return data;
}

export { getWeatherData };
