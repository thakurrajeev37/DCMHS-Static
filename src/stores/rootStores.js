import EventsStore from "./eventsStore.js";
import FacultyStore from "./facultyStore.js";
import SocialMediaStore from "./socialMediaStore.js";
import { useStore } from "./StoreContext.jsx";
import { observer } from "mobx-react";

export function createRootStores() {
	return {
		events: new EventsStore(),
		faculty: new FacultyStore(),
		socialMedia: new SocialMediaStore(),
	};
}

export function useEventsStore() {
	return useStore().events;
}
export function useFacultyStore() {
	return useStore().faculty;
}
export function useSocialMediaStore() {
	return useStore().socialMedia;
}

export const withStores = (Comp) => observer(Comp);
