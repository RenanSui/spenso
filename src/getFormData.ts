// imports
import FormFormatter from './interfaces/FormFormatter.js';
import ReturnFormData from './ReturnFormData.js';
import ReturnEditFormData from './ReturnEditFormData.js';


const getFormData = (action: string, currentId: number): FormFormatter => {
	// data variable
	let formData: FormFormatter;

	// data conditionals
	if (action === 'form') formData = ReturnFormData();
	if (action === 'editForm') formData = ReturnEditFormData(currentId);
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
		id,
		tag,
		createdAt
	}: FormFormatter = formData;

	console.log(createdAt)

	// return data
	return {
		title: title,
		amountNumber: amountNumber,
		note: note,
		type: type,
		date: date,
		id: id,
		tag: tag,
		createdAt: createdAt,
	};
};

export default getFormData;
