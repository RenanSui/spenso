export default interface formFormatter {
	title: string;
	amountNumber: number;
	note: string;
	type: string;
	date: string;
}

export interface formFormatterArgs {
	(
		title: string,
		amountNumber: number,
		note: string,
		type: string,
		date: string
	);
}

export interface returnLocalStorage {
	title: string;
	amountNumber: number;
	note: string;
	type: string;
	date: string;
	id: number;
}
