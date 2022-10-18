const showFormBtn = document.querySelector('#showFormBtn') as HTMLButtonElement;
const hideFormBtn = document.querySelector('#hideFormBtn') as HTMLButtonElement;
const myForm = document.querySelector('#myForm') as HTMLFormElement;

// Show and hide form
showFormBtn.addEventListener('click', (): void => {
	const form = myForm.classList;

	// Only show form
	if (form.contains('hide')) {
		form.remove('hide');
		form.add('show');
	} else {
		form.add('show');
	}
});
hideFormBtn.addEventListener('click', (): void => {
	const form = myForm.classList;

	// Only remove form
	if (form.contains('show')) {
		form.remove('show');
		form.add('hide');
	} else {
		form.add('show');
	}
});
