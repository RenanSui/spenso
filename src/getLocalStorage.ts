import { returnLocalStorage } from './interfaces/FormFormatter.js';

const getLocalStorage = (): Array<returnLocalStorage> => {
	// return the current history
	return localStorage.getItem('history')
		? JSON.parse(localStorage.getItem('history'))
		: [];
};

export default getLocalStorage;

// const getLocalStorage = (): Array<Object>

// const getLocalStorage = () => {
// 	// return the current history
// 	return localStorage.getItem('history')
// 		? JSON.parse(localStorage.getItem('history'))
// 		: [];
// };

// const currentLocalStorage = getLocalStorage();

// const counter = 0;

// const { id } = currentLocalStorage[counter]