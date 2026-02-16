import EventsStore from "./eventsStore.js";
import SocialMediaStore from "./socialMediaStore.js";
import { useStore } from "./StoreContext.jsx";
import { observer } from "mobx-react";

export function createRootStores() {
	return {
		events: new EventsStore(),
		socialMedia: new SocialMediaStore(),
	};
}

export function useEventsStore() {
	return useStore().events;
}
export function useSocialMediaStore() {
	return useStore().socialMedia;
}

export const withStores = (Comp) => observer(Comp);
