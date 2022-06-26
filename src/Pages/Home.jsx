import React, { useEffect, useState } from 'react';
import CardsItems from '../Components/CardsItems';
import CategoriesNav from '../Components/CategoriesNav';
import useFetch from '../services/useFetch';
import { parseData } from '../utils';

function Home() {
	const [isGrid, setIsGrid] = useState(false);
	const { data, loading, error } = useFetch('../data/items.json');
	const [itemsSearch, setItemsSearch] = useState([]);
	const [cardsData, setCardsData] = useState([]);
	const [inputSearch, setInputSearch] = useState('');
	const [title, setTitle] = useState('all categories');
	const [isChange, setIsChange] = useState(false);

	const searchOrder = (event) => {
		setInputSearch(event);
		let searchItem;
		if (event === '') {
			searchItem = cardsData;
			setIsChange(true);
			setItemsSearch(searchItem);
		} else {
			searchItem = cardsData.filter((item) => item.Title.search(event) !== -1 || item.Year.search(event) !== -1);
			setIsChange(true);
			setItemsSearch(searchItem);
		}
	};
	const handleChange = (event) => {
		let typeSort = event.target.value;
		typeSort === 'A-Z' ? sortAZ() : sortZA();
	};
	const sortAZ = () => {
		const tempData = [...cardsData];
		tempData.sort((a, b) => (a.Title > b.Title ? 1 : b.Title > a.Title ? -1 : 0));
		setIsChange(true);

		setItemsSearch(tempData);
	};
	const sortZA = () => {
		const tempData = [...cardsData];
		tempData.sort((a, b) => (a.Title < b.Title ? 1 : b.Title < a.Title ? -1 : 0));
		setIsChange(true);
		setItemsSearch(tempData);
	};
	const handleSetCategory = (val) => {
		const filterCategory = cardsData.filter((item) => item.Type == val);
		setIsChange(true);
		setItemsSearch(filterCategory);
		setTitle(val);
	};
	const handleRefresh = () => {
		setItemsSearch(cardsData);
		setTitle('all categories');
	};
	const handleClearInput = () => {
		setInputSearch('');
		setItemsSearch(cardsData);
	};
	useEffect(() => {
		if (data) {
			const arr = parseData(data);
			setCardsData(arr);
		}
	}, [data]);
	return (
		<div>
			<header className="section-header">
				<section className="header-main border-bottom">
					<div className="container">
						<div className="row align-items-center">
							<div className="col-lg-2 col-4">realcommerce.co.il</div>
							<div className="col-lg-4 col-4">
								<div className="input-group w-100">
									<input
										onChange={(e) => searchOrder(e.target.value)}
										type="text"
										value={inputSearch}
										className="form-control"
										placeholder="Search"
									/>
									<div className="input-group-append">
										<button onClick={handleClearInput} className="btn btn-primary">
											<i className="fas fa-backspace"></i>{' '}
										</button>
									</div>
								</div>
							</div>
							<div className=" col-lg-2 col-4">
								<select
									defaultValue="test"
									onChange={handleChange}
									className="form-select"
									aria-label="Default select example"
								>
									<option value="SORT BY">SORT BY</option>
									<option value="A-Z">A-Z</option>
									<option value="Z-A">Z-A</option>
								</select>
							</div>
							<div className="col-lg-4 col-sm-6 col-12">
								<div className="widgets-wrap float-md-end">
									<div className="widget-header  me-3">
										<button className="btn" onClick={() => setIsGrid(false)}>
											<i className="fa fa-list"></i>
										</button>
									</div>
									<div className="widget-header icontext">
										<button className="btn" onClick={() => setIsGrid(true)}>
											<i className="fa fa-th" aria-hidden="true"></i>
										</button>
									</div>
								</div>
							</div>
						</div>
					</div>
				</section>
				{cardsData.length && (
					<CategoriesNav handleRefresh={handleRefresh} handleSetCategory={handleSetCategory} data={cardsData} />
				)}
			</header>
			{!loading ? (
				<CardsItems title={title} itemsSearch={itemsSearch} isGrid={isGrid} data={isChange ? itemsSearch : cardsData} />
			) : (
				'loading'
			)}
		</div>
	);
}

export default Home;
