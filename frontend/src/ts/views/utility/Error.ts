import AView from "../AView";
import { CustomError } from "../../helpers";

export default class extends AView {

	override documentTitle = "Error";
	private errorCode: number | undefined;
	private errorText: string | undefined;
	override mainClassName = "flex flex-auto items-center justify-center text-center flex-col sm:flex-row text-white";

	constructor() {
		super();
	}

	render(error: CustomError) {
		this.errorCode = error.code;
		this.errorText = error.message;
		super.render();
	}

	protected override generateMainMarkup() {
		return `
			<h1 class="text-2xl sm:text-3xl font-extrabold tracking-tight sm:pr-6 sm:mr-6 sm:border-r sm:border-white">
				${this.errorCode || 503}
			</h1>
			<h2 class="mt-2 text-lg sm:mt-0">
				${this.errorText || "Service Unavailable"}
			</h2>
		`;
	};
}