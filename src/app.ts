// imports
import Transaction from './classes/Transaction.js';
import getFormData from './getFormData.js';
import FormFormatter from './interfaces/FormFormatter.js';
import { RESET_Form, RESET_Details, RESET_EditForm } from './ResetForm.js';
import RENDER_History from './renderHistory.js';
import RENDER_Totals from './renderTotals.js';
import {SHOW_HIDE_Form, SHOW_HIDE_Details, SHOW_HIDE_Edit,} from './Show_Hide_Functions.js';
import {AddNewId_LocalStorage, getClickedElementId,} from './AddNewTransaction.js';
import { getId_LocalStorage } from './getLocalStorage.js';
import { renderFormValues } from './renderFormValues.js';

// form elements
const myForm = document.querySelector('#myForm') as HTMLFormElement;
const showFormBtn = document.querySelector('#showFormBtn') as HTMLButtonElement;
const hideFormBtn = document.querySelector('#hideFormBtn') as HTMLButtonElement;

// details elements
const historyContainer = document.querySelector('#history') as HTMLDivElement;
const hideDetailsBtn = document.querySelector(
	'#hideDetailsBtn'
) as HTMLButtonElement;

// edit elements
const myFormEdit = document.querySelector('#myForm-Edit') as HTMLFormElement;
const showEditBtn = document.querySelector('#showEditBtn') as HTMLButtonElement;
const hideEditFormBtn = document.querySelector(
	'#hideEditFormBtn'
) as HTMLButtonElement;

// details elements

// Call render
RENDER_History();
RENDER_Totals();

// event on submit form and preventdefault
myForm.addEventListener('submit', (e): void => {
	e.preventDefault();

	// get and destructure data
	const { title, amountNumber, note, type, date, id, tag }: FormFormatter =
		getFormData('form');

	// create new transaction
	const NEW_Transaction = new Transaction(
		title,
		amountNumber,
		note,
		type,
		date,
		id,
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
	SHOW_HIDE_Form('hide');
});

// event on submit form edit
myFormEdit.addEventListener('submit', (e: MouseEvent): void => {
	e.preventDefault();

	const currentId = parseInt(getId_LocalStorage());

	// get and destructure data
	let { title, amountNumber, note, type, date, id, tag }: FormFormatter =
		getFormData('editForm');

	// create new transaction
	const NEW_Transaction = new Transaction(
		title,
		amountNumber,
		note,
		type,
		date,
		(id = currentId),
		tag
	);

	// add new transaction
	NEW_Transaction.printFormat();
	NEW_Transaction.EditTransaction();

	// hide edit form
	SHOW_HIDE_Edit('hide')
});

// SHOW and HIDE editForm
showEditBtn.addEventListener('click', (): void => {
	const currentId = parseInt(getId_LocalStorage());
	renderFormValues(currentId);
	SHOW_HIDE_Details('hide');
	SHOW_HIDE_Edit('show');
});
hideEditFormBtn.addEventListener('click', (): void => {
	RESET_EditForm();
	SHOW_HIDE_Edit('hide');
});

// SHOW and HIDE details Form
historyContainer.addEventListener('click', (e): void => {
	// get id for DETAILS page
	const id = getClickedElementId(e);
	console.log(id);
	// renderDetails(id);

	// value id to currentId local storage
	AddNewId_LocalStorage(id);

	// show details
	SHOW_HIDE_Details('show');
});
hideDetailsBtn.addEventListener('click', (): void => {
	// value '0' to currentId local storage
	AddNewId_LocalStorage('0');

	// hide details
	SHOW_HIDE_Details('hide');
});

// SHOW, HIDE and RESET Form
showFormBtn.addEventListener('click', (): void => {
	SHOW_HIDE_Form('show');
});
hideFormBtn.addEventListener('click', (): void => {
	SHOW_HIDE_Form('hide');
});

// make the balance, income and expense be updated automatically using localStorage

// dark and white theme
// drop down menu on the header title: all income or all expense or total balance
