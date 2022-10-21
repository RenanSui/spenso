export default class Transaction {
	constructor(
		public title: string,
		public amountNumber: number,
		public note: string,
		public type: string,
		public date: string
	) {}

	printFormat(): void {
		console.log(`
        ${this.title}, 
        ${this.amountNumber}, 
        ${this.note}, 
        ${this.type},
        ${this.date}`);
	}

	addNewTransaction(): void{
	}
}
