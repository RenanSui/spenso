import Transaction from './classes/Transaction.js';
import getFormData from './getFormData.js';
import FormFormatter from './interfaces/FormFormatter.js';
import { RESET_Form, RESET_EditForm } from './ResetForm.js';
import RENDER_History from './renderHistory.js';
import RENDER_Totals from './renderTotals.js';

// form elements
const myForm = document.querySelector('#myForm') as HTMLFormElement;
const showFormBtn = document.querySelector('#showFormBtn') as HTMLButtonElement;
const hideFormBtn = document.querySelector('#hideFormBtn') as HTMLButtonElement;

// details elements

// Call render
RENDER_History();
RENDER_Totals();

// event on submit form and preventdefault
myForm.addEventListener('submit', (e): void => {
	e.preventDefault();

	// get and destructure data
	const { title, amountNumber, note, type, date, tag }: FormFormatter =
		getFormData('form');

	// create new transaction
	const NEW_Transaction = new Transaction(
		title,
		amountNumber,
		note,
		type,
		date,
		tag
	);

	// add new transaction
	NEW_Transaction.printFormat();
	NEW_Transaction.NewTransaction();

	// Reset form
	RESET_Form();

	// render the list history
	RENDER_History();

	// render totals
	RENDER_Totals();

	// Remove form
	SHOW_HIDE_FormBtn('hide');
});

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
		RESET_Form();
	} else {
		// Remove form
		form.remove('show');
		form.add('hide');
		RESET_Form();
	}
};

// make the balance, income and expense be updated automatically using localStorage

// dark and white theme
// drop down menu on the header title: all income or all expense or total balance
