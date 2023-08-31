export {};

interface BackButton {
	hide: () => void;
	show: () => void;
	isVisible: boolean;
	offClick: (e: any) => void;
	onClick: (e: any) => void;
}

interface MainButton {
	text: string;
	color: string;
	textColor: string;
	isVisible: boolean;
	isActive: boolean;
	isProgressVisible: boolean;
	setText: (text: string) => void;
	onClick: (cb: any) => void;
	offClick: (cb: any) => void;
	show: () => void;
	hide: () => void;
	enable: () => void;
	disable: () => void;
	showProgress: (leaveActive: boolean) => void;
	hideProgress: () => void;
	setParams: (params: { text: string; color: string; text_color: string; is_active: boolean; is_visible: boolean }) => void;
}

interface HapticFeedback {
	impactOccurred: (style: any) => void;
	notificationOccurred: (type: any) => void;
	selectionChanged: () => void;
}

interface eventType {
	themeChanged: string;
	viewportChanged: string;
	mainButtonClicked: string;
	backButtonClicked: BackButton;
	settingsButtonClicked: string;
	invoiceClosed: string;
	popupClosed: string;
	qrTextReceived: string;
	clipboardTextReceived: string;
}

interface WebApp {
	colorScheme: "dark" | "light";
	initData: string;
	version: string;
	platform: string;
	themeParams: {
		bg_color: string;
		button_color: string;
		button_text_color: string;
		hint_color: string;
		link_color: string;
		secondary_bg_color: string;
		text_color: string;
	};
	isExpanded: boolean;
	viewportHeight: number;
	viewportStableHeight: number;
	headerColor: string;
	backgroundColor: string;
	isClosingConfirmationEnabled: boolean;
	BackButton: BackButton;
	MainButton: MainButton;
	HapticFeedback: HapticFeedback;
	isVersionAtLeast: (version: string) => void;
	setHeaderColor: (color: string) => void;
	setBackgroundColor: (color: string) => void;
	enableClosingConfirmation: () => void;
	disableClosingConfirmation: () => void;
	onEvent: (eventType: eventType, eventHandler: any) => void;
	sendData: (data: any) => void;
	switchInlineQuery: (query: any) => void;
	openLink: (url: any) => void;
	openTelegramLink: (url: string) => void;
	openInvoice: (url: any) => void;
	showPopup: (params: any) => void;
	showAlert: (message: any) => void;
	showConfirm: (message: any) => void;
	showScanQrPopup: (params: any) => void;
	closeScanQrPopup: () => void;
	readTextFromClipboard: (arr: any[]) => void;
	ready: () => void;
	expand: () => void;
	close: () => void;
}

declare global {
	interface Window {
		Telegram: {
			WebApp: WebApp;
		};
	}
}
