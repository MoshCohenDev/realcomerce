import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import ProductPage from './Pages/ProductPage';
function App() {
	return (
		<div className="App">
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path=":id" element={<ProductPage />} />
			</Routes>
			<section className="section-name padding-y bg">
				<div className="container">
					<div className="row">
						<div className="col-md-6">
							<h3>realcommerce mission</h3>
							<p>by moshe cohen</p>
						</div>
						<div className="col-md-6 text-md-end"></div>
					</div>
				</div>
			</section>
			<footer className="section-footer border-top bg">
				<div className="container">
					<section className="footer-top  padding-y">
						<div className="row">
							<aside className="col-md">
								<h6 className="title">Social</h6>
								<ul className="list-unstyled">
									<li>
										<i className="fab fa-facebook"></i> Facebook{' '}
									</li>
									<li>
										<i className="fab fa-twitter"></i> Twitter{' '}
									</li>
									<li>
										<i className="fab fa-instagram"></i> Instagram{' '}
									</li>
									<li>
										<i className="fab fa-youtube"></i> Youtube{' '}
									</li>
								</ul>
							</aside>
						</div>
					</section>
					<section className="footer-bottom row">
						<div className="col-md-2">
							<p className="text-muted"> 2021 Company name </p>
						</div>
						<div className="col-md-8 text-md-center">
							<span className="px-2">info@com</span>
							<span className="px-2">+000-000-0000</span>
							<span className="px-2">Street name 123, ABC</span>
						</div>
						<div className="col-md-2 text-md-end text-muted">
							<i className="fab fa-lg fa-cc-visa"></i>
							<i className="fab fa-lg fa-cc-paypal"></i>
							<i className="fab fa-lg fa-cc-mastercard"></i>
						</div>
					</section>
				</div>
			</footer>
		</div>
	);
}
export default App;
