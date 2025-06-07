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
		GetChair: "canteens/$idCanteen/available-chairs",
		GetMenu: "canteens/$idCanteen/menus",
	},
	Transaction: {
		CreateTransaction: "transactions",
	},
	Vendor: {
		GetMenus: "vendors/$idVendor/menus",
	},
};
