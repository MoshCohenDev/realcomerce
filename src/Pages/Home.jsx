import React, { useEffect, useState, useCallback } from 'react';
import CardsItems from '../Components/CardsItems';
import CategoriesNav from '../Components/CategoriesNav';
import useFetch from '../services/useFetch';
import { parseData } from '../utils';

function Home() {
	const { data, loading, error } = useFetch('../data/items.json');
	const [isGrid, setIsGrid] = useState(false);
	const [itemsSearch, setItemsSearch] = useState([]);
	const [cardsData, setCardsData] = useState([]);
	const [inputSearch, setInputSearch] = useState('');
	const [title, setTitle] = useState('All Categories');
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
	const sortAZ = useCallback(() => {
		handleRefresh();
		const tempData = [...cardsData];
		tempData.sort((a, b) => (a.Title > b.Title ? 1 : b.Title > a.Title ? -1 : 0));
		setIsChange(true);
		setItemsSearch(tempData);
	}, [cardsData]);

	const sortZA = useCallback(() => {
		handleRefresh();
		const tempData = [...cardsData];
		tempData.sort((a, b) => (a.Title < b.Title ? 1 : b.Title < a.Title ? -1 : 0));
		setIsChange(true);
		setItemsSearch(tempData);
	}, [cardsData]);

	const handleSetCategory = (val) => {
		const filterCategory = cardsData.filter((item) => item.Type === val);
		setIsChange(true);
		setItemsSearch(filterCategory);
		setTitle(val);
	};

	const handleRefresh = () => {
		setItemsSearch(cardsData);
		setTitle('All Categories');
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
	useEffect(() => {
		if (data) {
			sortAZ();
		}
	}, [sortAZ]);
	return (
		<div>
			{error && 'Error!'}
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
									onChange={handleChange}
									className="form-select"
									defaultValue="sssss"
									aria-label="Default select example"
								>
									<option>SORT BY</option>
									<option value="A-Z">A-Z</option>
									<option value="Z-A">Z-A</option>
								</select>
							</div>
							<div className="col-lg-4 col-sm-6 col-12">
								<div className="widgets-wrap float-md-end">
									<div className="widget-header  me-3">
										<div className="form-check form-switch">
											<input
												className="form-check-input"
												type="checkbox"
												defaultChecked={isGrid}
												onChange={() => setIsGrid(!isGrid)}
												id="flexSwitchCheckDefault"
											/>
											{isGrid ? <i className="fa fa-th" aria-hidden="true"></i> : <i className="fa fa-list"></i>}
										</div>
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
				<div className="d-flex justify-content-center">
					<div className="spinner-border" role="status">
						<span className="visually-hidden">Loading...</span>
					</div>
				</div>
			)}
		</div>
	);
}

export default Home;
