const getLocalStorage = () => {
    return localStorage.getItem('history')
        ? JSON.parse(localStorage.getItem('history'))
        : [];
};
export default getLocalStorage;
