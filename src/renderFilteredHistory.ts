import getLocalStorage from './getLocalStorage.js';
import { defaultRender } from './renderHistory.js';
import formFormatter from './interfaces/FormFormatter.js';

export const renderFilteredHistory = (action: string) => {
	const currentHistory: Array<formFormatter> = getLocalStorage();
	let newHistory: any;

	if (action === 'Balance')
		newHistory = currentHistory.filter((item) => item);
	if (action === 'Income')
		newHistory = currentHistory.filter((item) => item.type === 'Income');
	if (action === 'Expense')
		newHistory = currentHistory.filter((item) => item.type === 'Expense');

	defaultRender(newHistory);
};
