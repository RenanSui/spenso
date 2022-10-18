const showFormBtn = document.querySelector('#showFormBtn') as HTMLButtonElement;
const hideFormBtn = document.querySelector('#hideFormBtn') as HTMLButtonElement;
const myForm = document.querySelector('#myForm') as HTMLFormElement;

// Show and hide form
showFormBtn.addEventListener('click', (): void => {
	const form = myForm.classList;

	// Show form
	form.remove('hide');
	form.add('show');

	// Show form if do not contain hide and show class
	if (!form.contains('hide') || !form.contains('show')) form.add('show');
});

hideFormBtn.addEventListener('click', (): void => {
	const form = myForm.classList;

	// Remove form
	form.remove('show');
	form.add('hide');
});
