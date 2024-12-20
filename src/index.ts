import "./styles.css";
import { WeatherData } from "./ts/types";
import { getWeatherData } from "./ts/dataHandler";
import { showSearchFail, showSearchData } from "./ts/domMethods";

async function main() {
	const form = <HTMLFormElement>document.getElementById("get-location");

	if (form) {
		form.addEventListener('submit', async (event: Event) => {
			event.preventDefault();

			const formData = new FormData(form);
			const location = formData.get("location") as string;
			
			try {
				const data = await getWeatherData(location);
				console.log(data.days)
				showSearchData(data);
			} catch {
				showSearchFail(location);
			}
		});
	};
}

main();
