import { formFormatterArgs } from './interfaces/FormFormatter.js';

const AddNewTransaction: formFormatterArgs = (
	title,
	amountNumber,
	note,
	type,
	date,
	amountString
): void => {
	console.log(title);
	console.log(amountNumber);
	console.log(note);
	console.log(type);
	console.log(date);
	console.log(amountString);
};

export default AddNewTransaction;
