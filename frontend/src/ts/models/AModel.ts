import { CustomError } from "../helpers";

export default abstract class {

	protected baseUrl = `https://${HOST}:${PORT}/${LOCATION_BACKEND}/`;
	
	constructor() {
	}

	protected async sendRequest(url: string, method: string = "GET", body?: FormData | string): Promise<Response> {
		const headers: HeadersInit = {
			'Content-Type': 'application/json',
		};
		const options: RequestInit = {
			method,
			headers,
		};
		if ((method !== "GET" && method !== "HEAD") && body)
			options.body = body;
		const response = await fetch(url, options);
		if (!response.ok)
			throw new CustomError(response.status);
		return response;
	}

	protected setCookie(key: string, value: string, prefix?: string) {
		document.cookie = `${prefix + key}=${value}`;
	}

	protected getCookie(key: string): string | null {
		if (document.cookie && document.cookie !== "") {
			const cookies = document.cookie.split(";");
			for (let i = 0; i < cookies.length; i++) {
				const cookie = cookies[i].trim();
				if (cookie.substring(0, key.length + 1) === key + "=")
					return decodeURIComponent(cookie.substring(key.length + 1));
			}
		}
		return null;
	}

	protected removeCookie(key: string) {
		document.cookie = `${key}=;Max-Age=0`;
	}

	protected setToSessionStorage(key: string, value: string) {
		sessionStorage.setItem(key, value);
	}

	protected	getFromSessionStorage(key: string): string | null {
		return sessionStorage.getItem(key);
	}

	protected removeFromSessionStorage(key: string) {
		sessionStorage.removeItem(key);
	}

	protected clearSessionStorage() {
		sessionStorage.clear();
	}
}