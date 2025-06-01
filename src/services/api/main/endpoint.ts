export const MAIN_ENDPOINT = {
	Auth: {
		Login: "/login",
		Register: "/register",
		Logout: "/logout",
		CurrentUser: "/me",
	},
	Canteen: {
		GetCanteens: "/canteens",
		GetVendor: "canteens/$idCanteen/vendors",
	}
};
