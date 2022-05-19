export const filteringAnArray = (array, filteredText) => {
	return array.filter((arrayElement) => {
		return arrayElement.name
			.toLowerCase()
			.includes(filteredText.toLowerCase());
	});
};
