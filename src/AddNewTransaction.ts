import formatDate from './formatDate.js';
import getLocalStorage from './getLocalStorage.js';
import formFormatter, { formFormatterArgs } from './interfaces/FormFormatter.js';

const AddNewTransaction: formFormatterArgs = (
	title,
	amountNumber,
	note,
	type,
	date,
	id,
	tag,
): void => {
	// get local storage history data
	const history: Array<formFormatter> = getLocalStorage();

	// adding data inside variable
	const transactionData: formFormatter = {
		id: createRandomId(),
		title: title,
		amountNumber: amountNumber,
		date: formatDate(date),
		type: type,
		tag: tag,
		note: note,
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
