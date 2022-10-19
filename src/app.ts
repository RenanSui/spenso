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

	// form data
	const title = myFormTitle.value;
	const amount = parseInt(myFormAmount.value);
	const amountString = parseInt(myFormAmount.value).toLocaleString('en-US');
	const note = myFormNote.value;
	const type = myFormType.value;

	console.log(amount);
});
// drop down menu on the header title: all income or all expense or total balance
// make the balance, income and expense be updated automatically using localStorage
// click event on balance, income, expense or individual transactions and filter localStorage result
// dark and white theme

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
