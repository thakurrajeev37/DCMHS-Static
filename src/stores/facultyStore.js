import { makeObservable, observable, computed, action, runInAction } from "mobx";

class FacultyStore {
	faculty = [];
	loading = true;
	error = null;

	constructor() {
		makeObservable(this, {
			faculty: observable,
			loading: observable,
			error: observable,
			chairman: computed,
			principal: computed,
			vicePrincipal: computed,
			teachers: computed,
			fetchFaculty: action,
		});
		this.fetchFaculty();
	}

	get chairman() {
		return this.faculty.find(f => f.role === "Chairman") || null;
	}

	get principal() {
		return this.faculty.find(f => f.role === "Principal") || null;
	}

	get vicePrincipal() {
		return this.faculty.find(f => f.role === "Vice Principal") || null;
	}

	get teachers() {
		return this.faculty.filter(f => f.category === "teacher");
	}

	async fetchFaculty() {
		this.loading = true;
		this.error = null;

		try {
			const [XLSX, response] = await Promise.all([
				import("xlsx"),
				fetch("/faculty.xlsx"),
			]);

			if (!response.ok) {
				throw new Error("Failed to load faculty data");
			}

			const arrayBuffer = await response.arrayBuffer();
			const workbook = XLSX.read(arrayBuffer, { type: "array" });
			const sheetName = workbook.SheetNames[0];
			const worksheet = workbook.Sheets[sheetName];
			const jsonData = XLSX.utils.sheet_to_json(worksheet);

			const faculty = jsonData.map(row => ({
				name: row.name || "",
				role: row.role || "",
				category: row.category || "teacher",
				qualification: row.qualification || "",
				experience: row.experience || "",
				image: row.image || "",
				description: row.description || "",
			}));

			runInAction(() => {
				this.faculty = faculty;
				this.loading = false;
			});
		} catch (err) {
			console.error("Error loading faculty:", err);
			runInAction(() => {
				this.error = "Failed to load faculty data. Please try again later.";
				this.loading = false;
			});
		}
	}
}

export default FacultyStore;
