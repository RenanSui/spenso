export default interface formFormatter {
	title: string;
	amountNumber: number;
	note: string;
	type: string;
	date: string;
	id: number;
	tag: string;
	createdAt: string;
}

// interface arguments
export interface formFormatterArgs {
	(
		title: string,
		amountNumber: number,
		note: string,
		type: string,
		date: string,
		id: number,
		tag: string,
		createdAt: string,
	);
}

