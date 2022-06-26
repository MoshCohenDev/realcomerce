import React, { useEffect, useState } from 'react';
import { getAllCategories } from '../utils';
function CategoriesNav({ data, handleSetCategory, handleRefresh }) {
	const [categoriesName, setCategoriesName] = useState({});
	useEffect(() => {
		const categoriesFilterName = getAllCategories(data);
		setCategoriesName(categoriesFilterName);
	}, []);
	return (
		<nav className="navbar navbar-main navbar-expand-lg navbar-light border-bottom">
			<div className="container">
				<button
					className="navbar-toggler"
					type="button"
					data-bs-toggle="collapse"
					data-bs-target="#navbarNav"
					aria-controls="navbarNav"
					aria-expanded="false"
					aria-label="Toggle navigation"
				>
					<span className="navbar-toggler-icon"></span>
				</button>
				<div className=" navbar-collapse d-flex justify-content-between" id="navbarNav">
					<ul className="navbar-nav">
						{Object.keys(categoriesName).map((key, i) => {
							return (
								<li key={i} className="nav-item dropdown">
									<a
										onClick={() => {
											handleSetCategory(key);
										}}
										className="nav-link"
										href="#"
									>
										{`${key} (${categoriesName[key]})`}
									</a>
								</li>
							);
						})}
					</ul>
					<button onClick={handleRefresh} className="btn btn-primary">
						<i className="fas fa-undo"></i>
					</button>
				</div>
			</div>
		</nav>
	);
}

export default CategoriesNav;
