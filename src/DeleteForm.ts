import getLocalStorage from './getLocalStorage.js';
import formFormatter from './interfaces/FormFormatter.js';

getLocalStorage;

export const DeleteForms = (currentId: number) => {
	const history: Array<formFormatter> = getLocalStorage();

	console.log(history);
	console.log('DeleteForms Function: ' + currentId);
	const newHistory = history.filter(
		({
			title,
			amountNumber,
			note,
			type,
			date,
			id,
			tag,
			createdAt,
		}: formFormatter) => {
			if (currentId !== id) {
				return {
					title,
					amountNumber,
					note,
					type,
					date,
					id,
					tag,
					createdAt,
				};
			}
		}
	);

	console.log(newHistory);
    localStorage.setItem('history', JSON.stringify(newHistory));
};
