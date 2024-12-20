interface Coordinates {
	latitude: number,
	longitude: number,
}

interface WeatherData {
	description: string,
	timezone: string,
	tzoffset: number,
	alerts: Array<string>,
	days: Array<DayData>,
	coordinates: Coordinates,
}

interface DayData {
	datetime: string,
	tempmax: number,
	tempmin: number,
	precipitation: number,
	description: string,
	icon: string,
}

interface FormData {
	location: string
}

export { WeatherData, DayData, FormData, Coordinates };
