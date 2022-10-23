const myForm = document.querySelector('#myForm');
const myFormTitle = myForm.querySelector('#myForm-title');
const myFormAmount = myForm.querySelector('#myForm-amount');
const myFormType = myForm.querySelector('#myForm-type');
const myFormDate = myForm.querySelector('#myForm-date');
const myFormNote = myForm.querySelector('#myForm-note');
const ReturnFormData = () => {
    const title = myFormTitle.value.toString();
    const amountNumber = parseInt(myFormAmount.value);
    const note = myFormNote.value;
    const type = myFormType.value;
    const date = myFormDate.value;
    return {
        title: title,
        amountNumber: amountNumber,
        note: note,
        type: type,
        date: date,
    };
};
export default ReturnFormData;
