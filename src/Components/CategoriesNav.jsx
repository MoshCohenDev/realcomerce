import React, { useEffect, useState } from 'react';
import { getAllCategories } from '../utils';

function CategoriesNav({ data, handleSetCategory, handleRefresh }) {
	const [categoriesName, setCategoriesName] = useState({});
	useEffect(() => {
		const categoriesFilterName = getAllCategories(data);
		setCategoriesName(categoriesFilterName);
	}, [data]);
	return (
		<nav className="navbar navbar-main navbar-expand-lg navbar-light border-bottom">
			<div className="container">
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
										href="http://localhost:3000/#"
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
