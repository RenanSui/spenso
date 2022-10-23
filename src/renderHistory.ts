import getLocalStorage from './getLocalStorage.js';
import { returnLocalStorage } from './interfaces/FormFormatter.js';

// elements
const history = document.querySelector('#history');

const RENDER_History = () => {
	// get the current local storage
	const currentHistory: Array<returnLocalStorage> = getLocalStorage();

	// counter state
	let counter: number = 0;

	// loop through local storage and return formatted history
	let newHistory = currentHistory
		.map(() => {
			// destructure current local storage
			const { id, title, note, type, date, amountNumber, tag } = currentHistory[counter];

			// expense or income variables
			let value = '';
			let icon = '';
			let color = '';

			// expense or income conditional
			if (type === 'Expense') {
				value = `-$${amountNumber.toLocaleString()}`;
				icon = `<span class="iconify" data-icon="bi:cart-check"></span>`;
				color = `red`;
			}
			if (type === 'Income') {
				value = `+$${amountNumber.toLocaleString()}`;
				icon = `<span class="iconify" data-icon="fluent-mdl2:money"></span>`;
				color = `green`;
			}

			// change counter state
			counter++;

			// return the new history
			return `<!-- individual transaction -->
        <div class="income-transaction bg-secondary bg-hover-secondary m-2 rounded" id="${id}">
            <!-- Icon -->
            <div class="t-icon bg-tertiary rounded">
                ${icon}
            </div>
            <!-- Informations -->
            <div class="transaction-info row">
                <!-- info title -->
                <div class="transaction-title mb-2 col-xs-5">
                    <h3 class="t-title text-gray-3">${title}</h3>
                </div>
                <!-- info value -->
                <h3 class="t-value text-${color} col-xs-5">${value}</h3>
                <!-- info tag -->
                <p class="t-tag text-gray-2 col-xs-5">${tag}</p>
                <!-- info date -->
                <p class="t-date text-gray-2 col-xs-5 ml-auto">${date}</p>
            </div>
        </div>
        <!-- end of individual transaction -->
        `;
		})
		.join('');

	history.innerHTML = newHistory;
};

export default RENDER_History;
