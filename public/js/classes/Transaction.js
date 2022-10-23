import AddNewTransaction from '../AddNewTransaction.js';
export default class Transaction {
    constructor(title, amountNumber, note, type, date) {
        this.title = title;
        this.amountNumber = amountNumber;
        this.note = note;
        this.type = type;
        this.date = date;
    }
    printFormat() {
        console.log(`
	    ${this.title},
	    ${this.amountNumber},
	    ${this.note},
	    ${this.type},
	    ${this.date},`);
    }
    NewTransaction() {
        AddNewTransaction(this.title, this.amountNumber, this.note, this.type, this.date);
    }
}
