import './App.css';
import logo from './public/remalogo.png';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DiscountCard from './components/DiscountCard/DiscountCard';
import { Grid, Pagination, Box, InputBase } from '@mui/material';

function App() {
	const [allProducts, setAllProducts] = useState([]);
	const [shownProducts, setShownProducts] = useState([]);
	const [newsPerPage] = useState(24);

	function fetchData() {
		try {
			axios.get('https://rematracker.onrender.com/api/products').then((res) => {
				setAllProducts(res.data);
				calcPagination(res.data, 1);
			});
		} catch (error) {
			console.error(error);
		}
	}


	function calcPagination(products = undefined, pageNum) {
		const useProducts = products !== undefined ? products : allProducts;
		const startIndex = newsPerPage * (pageNum - 1);
		const endIndex = newsPerPage * pageNum;
		console.log(startIndex, endIndex);
		setShownProducts(useProducts.slice(startIndex, endIndex));
	}
	console.log(shownProducts);

	const handleChange = (event, value) => {
		calcPagination(undefined, value);
	};

	useEffect(() => {
		fetchData();
	}, []);

	return (
		<div>
			<Box className="header">
				<h1 className="title">REMA 1000 TRACKER</h1>
				<Box>
					<InputBase
						className="search-field"
						placeholder="Søg i Rema1000s Sortiment"
					></InputBase>
				</Box>
				<Box className="headerMenu">
					<a className="headerLink" href="/">
						Min Indkøbsliste
					</a>
					<a className="headerLink" href="/">
						Måltids Inspiration
					</a>
					<a className="headerLink" href="/">
						Brug for hjælp
					</a>
				</Box>
			</Box>
			<Grid container spacing={4}>
				{shownProducts.map((product, index) => {
					return (
						<Grid key={index} item xs={12} sm={6} md={4} lg={3}>
							<DiscountCard
								productImage={`${product.productImageUrl}/150.jpg`}
								productName={product.productName}
								productDescription={product.productUnderlineDescription}
								productOldPrice={product.productOldPrice}
								productPrice={product.productPrice}
								productLogo={logo}
							></DiscountCard>
						</Grid>
					);
				})}
			</Grid>
			<Box className="pagination-container">
				<Pagination
					className="pagination"
					size="large"
					count={10}
					color="primary"
					onChange={handleChange}
				></Pagination>
			</Box>
		</div>
	);
}

export default App;
