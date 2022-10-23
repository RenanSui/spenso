import formatDate from './formatDate.js';
import getLocalStorage from './getLocalStorage.js';
import { formFormatterArgs } from './interfaces/FormFormatter.js';

const AddNewTransaction: formFormatterArgs = (
	title,
	amountNumber,
	note,
	type,
	date
): void => {
	// get local storage history data
	const history = getLocalStorage();

	// get random id
	const id = createRandomId();

	// adding data inside variable
	const transactionData = {
		id: id,
		title: title,
		amountNumber: amountNumber,
		note: note,
		type: type,
		date: formatDate(date),
	};

	// push item to the beginning of the array
	history.unshift(transactionData);

	// set item to the local Storage history
	localStorage.setItem('history', JSON.stringify(history));
};

// create random id
const createRandomId = (): string => {
	// generate miliseconds date id
	const id = Date.now().toString();
	// return the id
	return id;
};

// export default
export default AddNewTransaction;
