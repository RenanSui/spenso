export default interface formFormatter {
	title: string;
	amountNumber: number;
	note: string;
	type: string;
	date: string;
	tag: string;
}

export interface formFormatterArgs {
	(
		title: string,
		amountNumber: number,
		note: string,
		type: string,
		date: string,
		tag: string,
	);
}

export interface returnLocalStorage {
	title: string;
	amountNumber: number;
	note: string;
	type: string;
	date: string;
	id: number;
	tag: string;
}
