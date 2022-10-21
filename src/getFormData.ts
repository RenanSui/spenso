// imports
import FormFormatter from './interfaces/FormFormatter.js';
import ReturnFormData from './ReturnFormData.js';
import ReturnEditFormData from './ReturnEditFormData.js';

const getFormData = (action: string): FormFormatter => {
	// data variable
	let formData: FormFormatter;

	// data conditionals
	if (action === 'form') formData = ReturnFormData();
	if (action === 'editForm') formData = ReturnEditFormData();
	if (action !== 'form' && action !== 'editForm') {
		console.log('return data not specified for forms');
	}

	// destructuring data
	const {
		title,
		amountNumber,
		note,
		type,
		date,
	}: FormFormatter = formData;

	// return data
	return {
		title: title,
		amountNumber: amountNumber,
		note: note,
		type: type,
		date: date,
	};
};

export default getFormData;
