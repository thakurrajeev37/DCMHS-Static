import { makeObservable, observable, action, runInAction } from "mobx";

class EventsStore {
	events = [];
	loading = true;
	error = null;

	constructor() {
		makeObservable(this, {
			events: observable,
			loading: observable,
			error: observable,
			fetchEvents: action,
		});
		this.fetchEvents();
	}

	async fetchEvents() {
		this.loading = true;
		this.error = null;

		try {
			const [XLSX, response] = await Promise.all([
				import("xlsx"),
				fetch("/events.xlsx"),
			]);

			if (!response.ok) {
				throw new Error("Failed to load events data");
			}

			const arrayBuffer = await response.arrayBuffer();
			const workbook = XLSX.read(arrayBuffer, { type: "array" });
			const sheetName = workbook.SheetNames[0];
			const worksheet = workbook.Sheets[sheetName];
			const jsonData = XLSX.utils.sheet_to_json(worksheet);

			// Convert isRange from string/number to boolean
			const events = jsonData.map(row => ({
				title: row.title || "",
				date: row.date || "",
				endDate: row.endDate || "",
				isRange: row.isRange === true || row.isRange === "TRUE" || row.isRange === 1,
				location: row.location || "",
				shortDesc: row.shortDesc || "",
				fullDesc: row.fullDesc || "",
				time: row.time || "",
				color: row.color || "#3B6866",
			}));

			runInAction(() => {
				this.events = events;
				this.loading = false;
			});
		} catch (err) {
			console.error("Error loading events:", err);
			runInAction(() => {
				this.error = "Failed to load events. Please try again later.";
				this.loading = false;
			});
		}
	}
}

export default EventsStore;
