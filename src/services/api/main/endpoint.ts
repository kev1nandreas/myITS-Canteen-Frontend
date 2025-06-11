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
		AcceptTransaction: "accept-transaction/$idTransaction",
		RejectTransaction: "reject-transaction/$idTransaction",
	},
	Vendor: {
		GetMenusByVendor: "vendors/menus",
		GetDailyReports: "vendors/daily-data",
		GetWeeklySales: "sales-last-week",
		GetTopMenus: "top-menu-last-week",
	},
	Menu: {
		GetMenus: "menus",
		CreateMenu: "menus",
		DeleteMenu: "menus/$idMenu",
		EditMenu: "menus/update/$idMenu",
	},
};
