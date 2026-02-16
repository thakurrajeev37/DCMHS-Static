import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { StoreContext } from "./stores/StoreContext.jsx";
import { createRootStores } from "./stores/rootStores.js";
import App from "./App.jsx";

const container = document.getElementById("root");
const stores = createRootStores();

createRoot(container).render(
	<StoreContext.Provider value={stores}>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</StoreContext.Provider>
);
