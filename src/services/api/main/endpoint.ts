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
		GetTransactionHistory: "transactions/user",
	},
	Vendor: {
		GetMenus: "vendors/$idVendor/menus",
		GetDailyReports: "vendors/daily-data",
	},
	Menu: {
		GetMenus: "menus",
		CreateMenu: "menus",
		EditMenu: "menus/$idMenu",
	},
};
