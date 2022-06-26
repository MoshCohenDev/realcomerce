import CardItem from './CardItem';
import React, { useState, useEffect } from 'react';

function CardsItems({ data, isGrid, title }) {
	const [items, setItems] = useState([]);

	useEffect(() => {
		setItems(data);
	}, [data]);
	return (
		<section className="section-name">
			<div className="container">
				<header className="section-heading">
					<h3 className="section-title">{title}</h3>
				</header>

				<div className={isGrid ? 'row' : 'col'}>
					{items.length > 0 ? (
						items.map((item, i) => {
							return <CardItem isGrid={isGrid} key={i} item={item} />;
						})
					) : (
						<h1 className="text-red">this item not exits</h1>
					)}
				</div>
			</div>
		</section>
	);
}

export default CardsItems;
