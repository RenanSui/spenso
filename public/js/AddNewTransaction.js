import formatDate from './formatDate.js';
import getLocalStorage from './getLocalStorage.js';
const AddNewTransaction = (title, amountNumber, note, type, date) => {
    const history = getLocalStorage();
    const id = createRandomId();
    const transactionData = {
        id: id,
        title: title,
        amountNumber: amountNumber,
        note: note,
        type: type,
        date: formatDate(date),
    };
    history.unshift(transactionData);
    localStorage.setItem('history', JSON.stringify(history));
};
const createRandomId = () => {
    const id = Date.now().toString();
    return id;
};
export default AddNewTransaction;
