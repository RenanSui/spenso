// export const numero2 = numero3? numero3 : 20
const getLocalStorage = (): Array<Object> => {
	// return the current history
	return localStorage.getItem('history')
		? JSON.parse(localStorage.getItem('history'))
		: [];
};

export default getLocalStorage;
