import formatDate from './formatDate.js';
import getLocalStorage from './getLocalStorage.js';
import formFormatter, { formFormatterArgs } from './interfaces/FormFormatter.js';

export const AddNewTransaction: formFormatterArgs = (
	title,
	amountNumber,
	note,
	type,
	date,
	id,
	tag,
	createdAt,
): void => {
	// get local storage history data
	const history: Array<formFormatter> = getLocalStorage();

	// adding data inside variable
	const transactionData: formFormatter = {
		id: id,
		title: title,
		amountNumber: amountNumber,
		date: formatDate(date),
		type: type,
		tag: tag,
		note: note,
		createdAt: createdAt
	};

	// push item to the beginning of the array
	history.unshift(transactionData);

	// set item to the local Storage history
	localStorage.setItem('history', JSON.stringify(history));
};

export const AddNewId_LocalStorage = (id: string): void => {
	// set item to the local Storage currentId
	localStorage.setItem('currentId', JSON.stringify(id));
}

// **id handlers**
// create random id
const createRandomId = (): number => {
	// generate miliseconds date id
	const id = Date.now();
	// return the id
	return id;
};

// get clicked element id
export const getClickedElementId = (e: MouseEvent): string => {
	const eventTarget = e.target as HTMLElement;
	const parentElement = eventTarget as HTMLDivElement;
	return parentElement.id
}

