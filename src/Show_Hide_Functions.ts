// imports
import { RESET_Form, RESET_Details, RESET_EditForm } from './ResetForm.js';

// form elements
const myForm = document.querySelector('#myForm') as HTMLFormElement;

// details elements
const detailsContainer = document.querySelector('#details') as HTMLDivElement;

// edit elements
const myFormEdit = document.querySelector('#myForm-Edit') as HTMLFormElement;

// form functions
export const SHOW_HIDE_Form = (action: string): void => {
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

// details functions
export const SHOW_HIDE_Details = (action: string): void => {
    // get the classList of the form
	const form = detailsContainer.classList;

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
}

// edit functions
export const SHOW_HIDE_Edit = (action: string): void => {
    // get the classList of the form
	const form = myFormEdit.classList;

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
}
