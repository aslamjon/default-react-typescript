type userInterface = {
	phoneNumber: string;
	firstName: string;
	lastName: string;
	role: string;
	numberOfAttempts: number;
	numberOfAttemptsDate: number;
};

type tokenInterface = {
	accessToken: string;
	refreshToken: string;
	tokenType: string;
};

type authInterface = {
	user: userInterface | null;
	isAuthenticated: boolean;
	isLoading: boolean;
	token: tokenInterface | null;
	test?: number;
};

export type { authInterface, tokenInterface, userInterface };
