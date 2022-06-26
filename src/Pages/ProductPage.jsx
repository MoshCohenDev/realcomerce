import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import useFetch from '../services/useFetch';
import { parseDataById, parseData } from '../utils';
import { Link } from 'react-router-dom';

function ProductPage() {
	const [item, setItem] = useState();
	const params = useParams();
	const { data, loading, error } = useFetch('../data/items.json');
	const handleImgError = (e) => {
		e.target.src = '	https://bitsofco.de/content/images/2018/12/Screenshot-2018-12-16-at-21.06.29.png';
	};
	useEffect(() => {
		if (data) {
			const arr = parseData(data, params);
			const itemFilter = parseDataById(arr, params.id);
			setItem(itemFilter[0]);
		}
	}, [data, params]);
	return (
		<div className="container">
			<div>
				<nav>
					<Link to="/">Home</Link>
				</nav>
			</div>
			<h2 className="text-center">product page</h2>
			{item && (
				<div className="d-flex justify-content-center">
					<div className="col">
						<div className="card card-product-grid">
							<div className="img-wrap d-flex justify-content-center m-4">
								<img onError={handleImgError} src={item.Poster} alt="..." />
							</div>
							<figcaption className="info-wrap text-center">
								<p className="title text-center">{item.Title}</p>
								<div className="price mt-1">id : {item.imdbID}</div>
								<div className="price mt-1">Type :{item.Type}</div>
								<div className="price mt-1">Year :{item.Year}</div>
							</figcaption>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}

export default ProductPage;
