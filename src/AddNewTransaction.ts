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
	const history = getLocalStorage();
	const id = createRandomId();
	const transactionData = {
		id: id,
		title: title,
		amountNumber: amountNumber,
		note: note,
		type: type,
		date: formatDate(date),
	};

	history.unshift(transactionData);
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
