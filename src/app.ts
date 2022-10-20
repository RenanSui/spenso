// form elements
const myForm = document.querySelector('#myForm') as HTMLFormElement;
const myFormTitle = document.querySelector('#myForm-title') as HTMLInputElement;
const myFormAmount = document.querySelector(
	'#myForm-amount'
) as HTMLInputElement;
const myFormNote = document.querySelector('#myForm-note') as HTMLInputElement;
const myFormType = document.querySelector('#myForm-type') as HTMLInputElement;
const showFormBtn = document.querySelector('#showFormBtn') as HTMLButtonElement;
const hideFormBtn = document.querySelector('#hideFormBtn') as HTMLButtonElement;

// todo
// event on submit form and preventdefault
myForm.addEventListener('submit', (e): void => {
	e.preventDefault();

	// Reset form
	RESET_Form();

	// Remove form
	SHOW_HIDE_FormBtn('hide');
});

// drop down menu on the header title: all income or all expense or total balance
// make the balance, income and expense be updated automatically using localStorage
// click event on balance, income, expense or individual transactions and filter localStorage result

// Get the data - fazer amanhã
interface Transaction {
	title: string;
	amountNumber: number;
	note: string;
	type: string;
	amountString: string;
}
const getFormData = (): void => {
	// form data
	const title = myFormTitle.value;
	const amountNumber: number = parseInt(myFormAmount.value); // number
	const note = myFormNote.value;
	const type = myFormType.value;
	const amountString: string = parseInt(myFormAmount.value).toLocaleString(
		'en-US'
	); // string


};

// SHOW, HIDE and RESET Form
showFormBtn.addEventListener('click', (): void => {
	SHOW_HIDE_FormBtn('show');
});

hideFormBtn.addEventListener('click', (): void => {
	SHOW_HIDE_FormBtn('hide');
});

const SHOW_HIDE_FormBtn = (action: string): void => {
	// get the classList of the form
	const form = myForm.classList;

	// Show form if do not contain hide and show class
	if (!form.contains('hide') || !form.contains('show')) form.add('show');

	// show or hide conditionals
	if (action === 'show') {
		// Show form
		form.remove('hide');
		form.add('show');
	} else {
		// Remove form
		form.remove('show');
		form.add('hide');
	}
};

const RESET_Form = (): void => {
	myFormTitle.value = '';
	myFormAmount.value = '';
	myFormNote.value = '';
	myFormType.value = '';
};

// dark and white theme
