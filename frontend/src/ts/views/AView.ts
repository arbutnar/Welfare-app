export default abstract class {

	protected	parentElement = document.body;
	protected	parentElementClassList = "flex flex-col justify-between min-h-screen";
	protected	parentElementBackgroundColor = "bg-wf-primary";
	protected	data: any;

	constructor() {}

	public render(data: any) {
		this.data = data;
		this.parentElement.className = this.parentElementClassList
		this.parentElement.classList.add(this.parentElementBackgroundColor);
		this.parentElement.innerHTML = this.generateMarkup();
	}

	public renderError(error: Error) {
		type Cause = {
			status: number;
			statusText: string;
		}
		let	cause: Cause | undefined = error.cause as Cause;
		if (!cause)
			cause = {status: 503, statusText: "Service Unavailable"}
		this.render(undefined);
		document.querySelector("main")!.innerHTML = `
			<h1>${cause.status} ${cause.statusText}</h1>
		`;
	}

	protected generateMarkup(): string {
		const html = `
			${this.generateHeaderMarkup()}
			<main>
			</main>
			${this.generateFooterMarkup()}
		`
		return html;
	}

	protected generateHeaderMarkup() : string {
		return `
			<header class="sm:w-full sm:max-w-96 sm:mx-auto">
				<img src="/static/public/images/smile.svg" alt="smile" class="w-auto mx-auto h-20">
				<div class="text-center text-white">
					<a href="/" class="tracking-tight leading-9 font-bold text-2xl mt-6 hover:text-black" data-link>
						Welfare is on
					</a>
				</div>
			</header>
		`
	}

	protected generateFooterMarkup() : string {
		return `
			<footer class="text-sm sm:text-base">
				<ul class="flex flex-wrap justify-center border-0">
					<li class="py-0 px-2">
						<a class="text-white hover:text-black no-underline hover:underline select-none">
							Privacy Policy
						</a>
					</li>
					<li class="py-0 px-2 border-l border-transparent">
						<a class="text-white hover:text-black no-underline hover:underline select-none">
							Cookie Policy
						</a>
					</li>
					<li class="py-0 px-2 border-l border-transparent">
						<a class="text-white hover:text-black no-underline hover:underline select-none">
							Preference Cookie
						</a>
					</li>
					<li class="py-0 px-2 border-l border-transparent">
						<a class="text-white hover:text-black no-underline hover:underline select-none">
							Legal Notes
						</a>
					</li>
					<li class="py-0 px-2 border-l border-transparent">
						<a class="text-white hover:text-black no-underline hover:underline select-none">
							Sitemap
						</a>
					</li>
					<li class="py-0 px-2 border-l border-transparent">
						<a class="text-white hover:text-black no-underline hover:underline select-none">
							CERT
						</a>
					</li>
				</ul>
			</footer>
		`
	}

	protected handleModal() {
		const openBtn = document.querySelector("[data-open-modal]");
		const closeBtn = document.querySelector("[data-close-modal]");
		const modal = document.querySelector("[data-modal]") as HTMLDialogElement;

		openBtn?.addEventListener("click", () => modal.showModal());
		closeBtn?.addEventListener("click", () => modal.close());
		modal?.addEventListener("mousedown", event => {
			const modalDimensions = modal.getBoundingClientRect()
			if (
				event.clientX < modalDimensions.left ||
				event.clientX > modalDimensions.right ||
				event.clientY < modalDimensions.top ||
				event.clientY > modalDimensions.bottom
			) {
				modal.close()
			}
		})
	}
}