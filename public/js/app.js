import Transaction from './classes/Transaction.js';
import getFormData from './getFormData.js';
import { RESET_Form } from './ResetForm.js';
const myForm = document.querySelector('#myForm');
const showFormBtn = document.querySelector('#showFormBtn');
const hideFormBtn = document.querySelector('#hideFormBtn');
myForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const { title, amountNumber, note, type, date, } = getFormData('form');
    const NEW_Transaction = new Transaction(title, amountNumber, note, type, date);
    NEW_Transaction.printFormat();
    NEW_Transaction.NewTransaction();
    RESET_Form();
    SHOW_HIDE_FormBtn('hide');
});
showFormBtn.addEventListener('click', () => {
    SHOW_HIDE_FormBtn('show');
});
hideFormBtn.addEventListener('click', () => {
    SHOW_HIDE_FormBtn('hide');
});
const SHOW_HIDE_FormBtn = (action) => {
    const form = myForm.classList;
    if (!form.contains('hide') || !form.contains('show'))
        form.add('show');
    if (action === 'show') {
        form.remove('hide');
        form.add('show');
        RESET_Form();
    }
    else {
        form.remove('show');
        form.add('hide');
        RESET_Form();
    }
};
