import { get } from "lodash";

interface items {
	name: string;
}

const hasAccess = (items: Array<items>, can: string) => {
	let access = false;
	let canList = can.split(" ");
	// items = items.map(({ name }) => name);
	canList.forEach((item) => {
		if (items.find(({ name }) => name === item)) access = true;
	});
	return access;
};

const tryCatch = (code = () => "") => {
	try {
		return code();
	} catch (e) {
		console.log(e);
	}
};

const numberPrettier = (number: string | number, type = "comma") => {
	if (typeof number === "number") number = number.toString();
	if (type === "comma") return isNum(number) ? Number(number).toLocaleString() : "";
	return new Intl.NumberFormat("fr-FR", { currency: "UZS" }).format(parseInt(number));
};

function formatDate(date: Date | string | number, format: string, utc?: boolean): string {
	if (typeof date === "string" || typeof date === "number") date = new Date(date);

	let MMMM = ["\x00", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
	let MMM = ["\x01", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
	let dddd = ["\x02", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
	let ddd = ["\x03", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

	function ii(i: number, len?: number) {
		let s = i + "";
		len = len || 2;
		while (s.length < len) s = "0" + s;
		return s;
	}

	let y = utc ? date.getUTCFullYear() : date.getFullYear();
	format = format.replace(/(^|[^\\])yyyy+/g, "$1" + y);
	format = format.replace(/(^|[^\\])yy/g, "$1" + y.toString().substr(2, 2));
	format = format.replace(/(^|[^\\])y/g, "$1" + y);

	let M = (utc ? date.getUTCMonth() : date.getMonth()) + 1;
	format = format.replace(/(^|[^\\])MMMM+/g, "$1" + MMMM[0]);
	format = format.replace(/(^|[^\\])MMM/g, "$1" + MMM[0]);
	format = format.replace(/(^|[^\\])MM/g, "$1" + ii(M));
	format = format.replace(/(^|[^\\])M/g, "$1" + M);

	let d = utc ? date.getUTCDate() : date.getDate();
	format = format.replace(/(^|[^\\])dddd+/g, "$1" + dddd[0]);
	format = format.replace(/(^|[^\\])ddd/g, "$1" + ddd[0]);
	format = format.replace(/(^|[^\\])dd/g, "$1" + ii(d));
	format = format.replace(/(^|[^\\])d/g, "$1" + d);

	let H = utc ? date.getUTCHours() : date.getHours();
	format = format.replace(/(^|[^\\])HH+/g, "$1" + ii(H));
	format = format.replace(/(^|[^\\])H/g, "$1" + H);

	let h = H > 12 ? H - 12 : H === 0 ? 12 : H;
	format = format.replace(/(^|[^\\])hh+/g, "$1" + ii(h));
	format = format.replace(/(^|[^\\])h/g, "$1" + h);

	let m = utc ? date.getUTCMinutes() : date.getMinutes();
	format = format.replace(/(^|[^\\])mm+/g, "$1" + ii(m));
	format = format.replace(/(^|[^\\])m/g, "$1" + m);

	let s = utc ? date.getUTCSeconds() : date.getSeconds();
	format = format.replace(/(^|[^\\])ss+/g, "$1" + ii(s));
	format = format.replace(/(^|[^\\])s/g, "$1" + s);

	let f = utc ? date.getUTCMilliseconds() : date.getMilliseconds();
	format = format.replace(/(^|[^\\])fff+/g, "$1" + ii(f, 3));
	f = Math.round(f / 10);
	format = format.replace(/(^|[^\\])ff/g, "$1" + ii(f));
	f = Math.round(f / 10);
	format = format.replace(/(^|[^\\])f/g, "$1" + f);

	let T = H < 12 ? "AM" : "PM";
	format = format.replace(/(^|[^\\])TT+/g, "$1" + T);
	format = format.replace(/(^|[^\\])T/g, "$1" + T.charAt(0));

	let t = T.toLowerCase();
	format = format.replace(/(^|[^\\])tt+/g, "$1" + t);
	format = format.replace(/(^|[^\\])t/g, "$1" + t.charAt(0));

	let tz = -date.getTimezoneOffset();
	let K = utc || !tz ? "Z" : tz > 0 ? "+" : "-";
	if (!utc) {
		tz = Math.abs(tz);
		let tzHrs = Math.floor(tz / 60);
		let tzMin = tz % 60;
		K += ii(tzHrs) + ":" + ii(tzMin);
	}
	format = format.replace(/(^|[^\\])K/g, "$1" + K);

	let day = (utc ? date.getUTCDay() : date.getDay()) + 1;
	format = format.replace(new RegExp(dddd[0], "g"), dddd[day]);
	format = format.replace(new RegExp(ddd[0], "g"), ddd[day]);

	format = format.replace(new RegExp(MMMM[0], "g"), MMMM[M]);
	format = format.replace(new RegExp(MMM[0], "g"), MMM[M]);

	format = format.replace(/\\(.)/g, "$1");

	return format;
}

const isNum = (num: string) => {
	let newNum = parseInt(num);
	if (isNaN(newNum)) return false;
	else if (newNum.toString() === num) return true;
	return false;
};

const hexToRgb = (hex: string) => {
	if (hex) {
		hex = hex.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i, (m, r, g, b) => "#" + r + r + g + g + b + b);
		hex = hex.substring(1);
		const temp = hex.match(/.{2}/g);
		if (temp) return temp.map((x) => parseInt(x, 16)).join(",");
		return "";
	}
	return "";
};

function getItemsWithIds(ids: any[], options: any[], valueKey: string, idKey: string) {
	const items = [];
	let item = null;
	for (const id of ids) {
		item = options.find((o) => o[valueKey] === (idKey ? get(id, idKey) : id));
		item && items.push(item);
	}
	return items;
}

export { hasAccess, tryCatch, numberPrettier, formatDate, isNum, hexToRgb, getItemsWithIds };
