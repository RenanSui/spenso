import getLocalStorage from './getLocalStorage.js';
import formFormatter, {
	formFormatterArgs,
} from './interfaces/FormFormatter.js';

export const EditOldTransaction: formFormatterArgs = (
	newTitle,
	newAmountNumber,
	newNote,
	newType,
	newDate,
	newId,
	newTag,
	newCreatedAt
) => {

	const history: Array<formFormatter> = getLocalStorage();

	const newHistory = history.map(
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
			if (newId === id) {
				return {
					title: newTitle,
					amountNumber: newAmountNumber,
					note: newNote,
					type: newType,
					date: newDate,
					id: newId,
					tag: newTag,
					createdAt: newCreatedAt,
				};
			} else {
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

	localStorage.setItem('history', JSON.stringify(newHistory));

	console.log(newHistory);
};
