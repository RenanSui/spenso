import { reverseFormatDate } from './formatDate.js';
import { getValuesById } from './getLocalStorage.js';

// elements
const myForm = document.querySelector('#myForm-Edit') as HTMLFormElement;
const myFormTitle = myForm.querySelector('#myForm-title') as HTMLInputElement;
const myFormAmount = myForm.querySelector('#myForm-amount') as HTMLInputElement;
const myFormType = myForm.querySelector('#myForm-type') as HTMLInputElement;
const myFormTag = myForm.querySelector('#myForm-tag') as HTMLInputElement;
const myFormDate = myForm.querySelector('#myForm-date') as HTMLInputElement;
const myFormNote = myForm.querySelector('#myForm-note') as HTMLInputElement;

export const renderFormValues = (id: number) => {
	const values = getValuesById(id);
	const {
		title,
		amountNumber,
		note,
		type,
		date,
		id: currentId,
		tag,
	} = values[0];

	const dateWithoutFormat = reverseFormatDate(date);

	myFormTitle.value = title;
	myFormAmount.value = amountNumber;
	myFormType.value = type;
	myFormTag.value = tag;
	myFormDate.value = dateWithoutFormat;
	myFormNote.value = note;
};
