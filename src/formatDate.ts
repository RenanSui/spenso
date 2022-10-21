const formatDate = (date: string): string => {
	let newDate = date;
	const day = newDate[8] + newDate[9];
	const year = newDate[0] + newDate[1] + newDate[2] + newDate[3];
	const monthNumber = parseInt(newDate[5] + newDate[6]);
	const month = getMonth(monthNumber - 1);

	// return formatDate
    newDate = `${month} ${day}, ${year}`
	return newDate;
};

export const getMonth = (month: number) => {
	const months = [
		'Jan',
		'Feb',
		'Mar',
		'Apr',
		'May',
		'Jun',
		'Jul',
		'Aug',
		'Sep',
		'Oct',
		'Nov',
		'Dec',
	];

	return months[month];
};

export default formatDate;
