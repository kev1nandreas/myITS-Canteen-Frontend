export const ENV = {
	MODE: process.env.NEXT_PUBLIC_MODE,
	TOKEN_KEY: process.env.NEXT_PUBLIC_TOKEN_SECRET || "default_token_key",
	URI: {
		BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
		BASE_IMAGE_URL: process.env.NEXT_PUBLIC_IMAGE_BASE_URL || "https://example.com/images",
	},
};
