export function parseData(data) {
	return data.map((dataItem) => ({
		...dataItem,
		Year: dataItem.Year.slice(0, 4),
	}));
}
export function parseDataById(data, id) {
	const filterCategory = data.filter((item) => item.imdbID === id);
	return filterCategory;
}
export function getAllCategories(data) {
	const categories = data.reduce((acc, cur) => {
		acc[cur.Type] = (acc[cur.Type] || 0) + 1;
		return acc;
	}, {});
	return categories;
}
