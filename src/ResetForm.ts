// form elements
const myForm = document.querySelector('#myForm') as HTMLFormElement;
const myFormTitle = myForm.querySelector('#myForm-title') as HTMLInputElement;
const myFormAmount = myForm.querySelector(
	'#myForm-amount'
) as HTMLInputElement;
const myFormType = myForm.querySelector('#myForm-type') as HTMLInputElement;
const myFormDate = myForm.querySelector('#myForm-date') as HTMLInputElement;
const myFormNote = myForm.querySelector('#myForm-note') as HTMLInputElement;

// functions
export const RESET_Form = (): void => {
	myFormTitle.value = '';
	myFormAmount.value = '';
	myFormNote.value = '';
	myFormType.value = '';
	myFormDate.value = '';
};

export const RESET_Details = (): void => {
	console.log('oi')
}

export const RESET_EditForm = (): void => {
	console.log('oi')
}
