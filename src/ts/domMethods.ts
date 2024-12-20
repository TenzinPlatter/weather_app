import SunCalc from "suncalc";
import { WeatherData, DayData, Coordinates } from "./types";

import dayCloudsPNG from "../assets/day_clouds.png";
import dayRainPNG from "../assets/day_rain.png";
import daySnowPNG from "../assets/day_snow.png";
import daySunPNG from "../assets/day_sun.png";
import dayWindPNG from "../assets/day_wind.png";

import nightCloudsPNG from "../assets/night_clouds.png";
import nightRainPNG from "../assets/night_rain.png";
import nightSnowPNG from "../assets/night_snow.png";
import nightMoonPNG from "../assets/night_moon.png";
import nightWindPNG from "../assets/night_wind.png";

import raindropPNG from "../assets/raindrop.png";

let context = {
	searchBarAnimated: false,
}

export function removeChildren(node: Element) {
	while (node.firstChild) {
		node.removeChild(node.firstChild);
	}
}

export function showSearchFail(location: string) {
	const errMsg = document.createElement("div");
	errMsg.textContent = `Sorry, we don't have any data for ${location}`

	const container = <HTMLElement>document.getElementById("#get-location");
	container?.appendChild(errMsg);
}

export function showSearchData(data: WeatherData) {
	if (!context.searchBarAnimated) {
		context.searchBarAnimated = true;
		animateSearchBar();
	}

	// avoid putting anything on screen before search bar has moved
	setTimeout(() => {
		const display = document.querySelector(".display")!;
		
		const mainBox = document.createElement("div");
		mainBox.classList.add("main");

		const comingDays = document.createElement("div");
		comingDays.classList.add("coming-days");

		for (const day of getDaysHTML(data.days, data.coordinates)) {
			comingDays.appendChild(day);
		}

		removeChildren(display);
		display.appendChild(mainBox);
		display.appendChild(comingDays);

	}, 1300);
}

function getDaysHTML(
	daysData: Array<DayData>,
	coords: Coordinates
): Array<HTMLElement> {
	const res: Array<HTMLElement> = [];
	
	for (let i = 0; i < daysData.length && i < 6; i++) {
		const day = daysData[i];

		const container = document.createElement("div");
		container.classList.add("day-container");

		const icon = document.createElement("img");
		icon.src = getImageFromIconType(day.icon, coords);

		const topInfo = document.createElement("div");
		topInfo.classList.add("top-info");

		const bottomInfo = document.createElement("div");
		bottomInfo.classList.add("bottom-info");

		const infoContainer = document.createElement("div");
		infoContainer.classList.add("info-container");

		const dayNameContainer = document.createElement("p");
		dayNameContainer.textContent = getDayName(day.datetime);

		const tempRangeContainer = document.createElement("p");
		tempRangeContainer.textContent = `${day.tempmin} - ${day.tempmax}`;

		const descriptionContainer = document.createElement("p");
		descriptionContainer.textContent = day.description;

		const precipitationContainer = document.createElement("div");
		precipitationContainer.classList.add("rain");

		const raindrop = document.createElement("img");
		raindrop.src = raindropPNG;
		const precipitationTextContainer = document.createElement("p")
		precipitationTextContainer.textContent = day.precipitation.toString() + "mm";

		precipitationContainer.appendChild(precipitationTextContainer);
		precipitationContainer.appendChild(raindrop);

		topInfo.appendChild(dayNameContainer);
		topInfo.appendChild(tempRangeContainer);

		bottomInfo.appendChild(descriptionContainer);
		bottomInfo.appendChild(precipitationContainer);

		infoContainer.appendChild(topInfo);
		infoContainer.appendChild(bottomInfo);

		container.appendChild(icon);
		container.appendChild(infoContainer);

		res.push(container);
	}

	return res;
}

function getDayName(date: string) {
	const dateObj = new Date(date);
	const dayName = new Intl.DateTimeFormat('en-US', { weekday: "long" })
	.format(dateObj);

	return dayName;
}

function getImageFromIconType(iconType: string, coords: Coordinates) {
	const times = SunCalc.getTimes(new Date(), coords.latitude, coords.longitude);

	const now = new Date();
	const sunHasSet = now > times.sunset;

	switch (iconType) {
		case "snow":
			return (sunHasSet) ? daySnowPNG : nightSnowPNG; 
		case "rain":
			return (sunHasSet) ? dayRainPNG : nightRainPNG;
		case "fog":
			return (sunHasSet) ? dayCloudsPNG : nightCloudsPNG;
		case "wind":
			return (sunHasSet) ? dayWindPNG : nightWindPNG;
		case "wind":
			return (sunHasSet) ? dayWindPNG : nightWindPNG;
		case "cloudy":
			return (sunHasSet) ? dayCloudsPNG : nightCloudsPNG;
		case "partly-cloudy-day":
			return (sunHasSet) ? dayCloudsPNG : nightCloudsPNG;
		case "partly-cloudy-night":
			return (sunHasSet) ? dayCloudsPNG : nightCloudsPNG;
		case "clear-day":
			return (sunHasSet) ? daySunPNG : nightMoonPNG;
		case "clear-night":
			return (sunHasSet) ? daySunPNG : nightMoonPNG;
	}
}

export function animateSearchBar() {
	const form = <HTMLElement>document.querySelector("#get-location")!;

	//TODO: use this as waiting time? then add some gif if request takes
	//even longer
	form.style.transition = "all ease 1s";
	form.style.top = "10vh";

	const displayWindow = document.createElement("div");
	displayWindow.classList.add("display");
	// search bar size + gap + spacing between search and top of screen
	displayWindow.style.top = `calc(${form.offsetHeight}px + 5vh + 10vh)`;
	// screenheight - the thing above
	displayWindow.style.height = `calc(100vh - ${form.offsetHeight}px - 15vh)`;

	const body = document.querySelector("body");
	body?.appendChild(displayWindow);
}
