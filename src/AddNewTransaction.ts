import formatDate from './formatDate.js';
import getLocalStorage from './getLocalStorage.js';
import { formFormatterArgs, returnLocalStorage } from './interfaces/FormFormatter.js';

const AddNewTransaction: formFormatterArgs = (
	title,
	amountNumber,
	note,
	type,
	date,
	tag,
): void => {
	// get local storage history data
	const history: Array<returnLocalStorage> = getLocalStorage();

	// adding data inside variable
	const transactionData: returnLocalStorage = {
		id: createRandomId(),
		title: title,
		amountNumber: amountNumber,
		note: note,
		type: type,
		date: formatDate(date),
		tag: tag,
	};

	// push item to the beginning of the array
	history.unshift(transactionData);

	// set item to the local Storage history
	localStorage.setItem('history', JSON.stringify(history));
};

// create random id
const createRandomId = (): number => {
	// generate miliseconds date id
	const id = Date.now();
	// return the id
	return id;
};

// export default
export default AddNewTransaction;
