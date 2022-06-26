import axios from 'axios';
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function CardItem({ item, isGrid }) {
	const inputRef = useRef();
	const navigate = useNavigate();
	const [isImgExist, setIsImgExist] = useState(true);
	const [isUpdate, setIsUpdate] = useState(false);
	const [updateItem, setUpdateItem] = useState('');
	const [isChange, setIsChange] = useState(false);

	const handleImgError = (e) => {
		e.target.src = '	https://bitsofco.de/content/images/2018/12/Screenshot-2018-12-16-at-21.06.29.png';
	};
	const handleUpdate = (item) => {
		console.log(inputRef);
		setIsUpdate(true);
	};
	const handleChangeValue = () => {
		let val = inputRef.current.value;
		if (val == item.Title) {
			setUpdateItem(item.Title);
			setIsUpdate(true);
		} else {
			setUpdateItem(val);
			// axios.put(`/api/items/${id}`, value);
			setIsUpdate(false);
			setIsChange(true);
		}
	};

	const handleProductPage = (id) => {
		navigate(`/${id}`, { state: item });
	};
	useEffect(() => {}, [null]);
	return (
		<div className={isGrid ? 'col-md-3' : 'col-md-6 offset-md-3'}>
			<div className="card card-product-grid">
				<div className={isGrid ? 'img-wrap mt-4' : 'img-wrap d-flex justify-content-center m-4'}>
					<img onClick={() => handleProductPage(item.imdbID)} onError={handleImgError} src={item.Poster} alt="..." />
				</div>
				<figcaption className="info-wrap text-center">
					{isUpdate ? (
						<input ref={inputRef} type="text" onBlur={handleChangeValue} />
					) : (
						<h5 className="title text-center" onClick={() => handleUpdate(item.Title)}>
							{isChange ? updateItem : item.Title}
						</h5>
					)}
				</figcaption>
			</div>
		</div>
	);
}

export default CardItem;
