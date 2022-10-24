// form elements
const myForm = document.querySelector('#myForm') as HTMLFormElement;
const myFormTitle = myForm.querySelector('#myForm-title') as HTMLInputElement;
const myFormAmount = myForm.querySelector(
	'#myForm-amount'
) as HTMLInputElement;
const myFormType = myForm.querySelector('#myForm-type') as HTMLInputElement;
const myFormTag = myForm.querySelector('#myForm-type') as HTMLInputElement;
const myFormDate = myForm.querySelector('#myForm-date') as HTMLInputElement;
const myFormNote = myForm.querySelector('#myForm-note') as HTMLInputElement;

// Edit form elements
const myFormEdit = document.querySelector('#myForm') as HTMLFormElement;
const myFormEditTitle = myFormEdit.querySelector('#myForm-title') as HTMLInputElement;
const myFormEditAmount = myFormEdit.querySelector(
	'#myForm-amount'
) as HTMLInputElement;
const myFormEditType = myFormEdit.querySelector('#myForm-type') as HTMLInputElement;
const myFormEditTag = myForm.querySelector('#myForm-type') as HTMLInputElement;
const myFormEditDate = myFormEdit.querySelector('#myForm-date') as HTMLInputElement;
const myFormEditNote = myFormEdit.querySelector('#myForm-note') as HTMLInputElement;

// functions
export const RESET_Form = (): void => {
	myFormTitle.value = '';
	myFormAmount.value = '';
	myFormNote.value = '';
	myFormType.value = '';
	myFormTag.value = '';
	myFormDate.value = '';
};

export const RESET_Details = (): void => {
	console.log('oi')
}

export const RESET_EditForm = (): void => {
	myFormEditTitle.value = '';
	myFormEditAmount.value = '';
	myFormEditNote.value = '';
	myFormEditType.value = '';
	myFormEditTag.value = '';
	myFormEditDate.value = '';
}
