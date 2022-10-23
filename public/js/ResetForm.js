const myForm = document.querySelector('#myForm');
const myFormTitle = myForm.querySelector('#myForm-title');
const myFormAmount = myForm.querySelector('#myForm-amount');
const myFormType = myForm.querySelector('#myForm-type');
const myFormDate = myForm.querySelector('#myForm-date');
const myFormNote = myForm.querySelector('#myForm-note');
export const RESET_Form = () => {
    myFormTitle.value = '';
    myFormAmount.value = '';
    myFormNote.value = '';
    myFormType.value = '';
    myFormDate.value = '';
};
export const RESET_EditForm = () => {
    console.log('oi');
};
