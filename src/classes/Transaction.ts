import AddNewTransaction from '../AddNewTransaction.js';

export default class Transaction {
	constructor(
		public title: string,
		public amountNumber: number,
		public note: string,
		public type: string,
		public date: string,
		public amountString: string
	) {}

	printFormat(): void {
		console.log(`
	    ${this.title},
	    ${this.amountNumber},
	    ${this.note},
	    ${this.type},
	    ${this.date},
	    ${this.amountNumber}`);
	}

	NewTransaction(): void {
		AddNewTransaction(
			this.title,
			this.amountNumber,
			this.note,
			this.type,
			this.date,
			this.amountString
		);
	}

	// EditTransaction(): void {
	// 	EditOldTransaction(
	// 		this.title,
	// 		this.amountNumber,
	// 		this.note,
	// 		this.type,
	// 		this.date,
	// 		this.amountString
	// 	)
	// }
}
