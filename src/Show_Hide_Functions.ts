// imports
import { RESET_Form, RESET_Details, RESET_EditForm } from './ResetForm.js';

// form elements
const myForm = document.querySelector('#myForm') as HTMLFormElement;

// details elements
const detailsContainer = document.querySelector('#details') as HTMLDivElement;

// edit elements
const myFormEdit = document.querySelector('#myForm-Edit') as HTMLFormElement;

// modal element
const modal = document.querySelector('#modal') as HTMLDivElement;

// body
const bodyElement = document.querySelector('#body') as HTMLBodyElement;

modal.addEventListener('click', () => {
	SHOW_HIDE_Form('hide');
	SHOW_HIDE_Edit('hide');
	SHOW_HIDE_Details('hide');
});

// form functions
export const SHOW_HIDE_Form = (action: string): void => {
	// get the classList of the form
	const form = myForm.classList;
	const body = bodyElement.classList;

	// Show form if do not contain hide and show class
	if (!form.contains('hide') || !form.contains('show')) form.add('show');

	modal.classList.toggle('modal');

	// show or hide conditionals
	if (action === 'show') {
		// Show form
		form.remove('hide');
		form.add('show');
		RESET_Form();
		body.add('overflow-hidden');
	} else {
		// Remove form
		form.remove('show');
		form.add('hide');
		RESET_Form();
		body.remove('overflow-hidden');
	}
};

// details functions
export const SHOW_HIDE_Details = (action: string): void => {
	// get the classList of the form
	const form = detailsContainer.classList;
	const body = bodyElement.classList;

	// Show form if do not contain hide and show class
	if (!form.contains('hide') || !form.contains('show')) form.add('show');

	modal.classList.toggle('modal');

	// show or hide conditionals
	if (action === 'show') {
		// Show form
		form.remove('hide');
		form.add('show');
		RESET_Form();
		body.add('overflow-hidden');
	} else {
		// Remove form
		form.remove('show');
		form.add('hide');
		RESET_Form();
		body.remove('overflow-hidden');
	}
};

// edit functions
export const SHOW_HIDE_Edit = (action: string): void => {
	// get the classList of the form
	const form = myFormEdit.classList;
	const body = bodyElement.classList;

	// Show form if do not contain hide and show class
	if (!form.contains('hide') || !form.contains('show')) form.add('show');

	modal.classList.toggle('modal');

	// show or hide conditionals
	if (action === 'show') {
		// Show form
		form.remove('hide');
		form.add('show');
		RESET_Form();
		body.add('overflow-hidden');
	} else {
		// Remove form
		form.remove('show');
		form.add('hide');
		RESET_Form();
		body.remove('overflow-hidden');
	}
};
