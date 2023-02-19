import '../App.css';
import logo from '../public/remalogo.png';
import homer from '../public/HomerSimpson.png';
import eye from '../public/eye.png';
import DiscountCard from '../components/DiscountCard/DiscountCard';
import Header from '../components/Header/Header';
import {
	calculateEyes,
	inDiscountCatalogue,
	inShoppingList,
} from '../AppHelper';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Grid, Pagination, Box } from '@mui/material';

function Home() {
	const [allProducts, setAllProducts] = useState([]);
	const [shownProducts, setShownProducts] = useState([]);
	const [newsPerPage] = useState(24);
	const [shoppingList, setShoppingList] = useState([]);

	useEffect(() => {
		fetchData();
	}, []);

	function addToList(item) { //Call back function to pass prop from DiscountCard to Home
    if(shoppingList.includes(item)) {
      setShoppingList(shoppingList.filter((e) => e !== item))
    } else {
      setShoppingList([...shoppingList, item]);
    }
    console.log(shoppingList)
	}

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

	calculateEyes();

	function calcPagination(products = undefined, pageNum) {
		const useProducts = products !== undefined ? products : allProducts;
		const startIndex = newsPerPage * (pageNum - 1);
		const endIndex = newsPerPage * pageNum;
		setShownProducts(useProducts.slice(startIndex, endIndex));
	}

	const handleChange = (event, value) => {
		calcPagination(undefined, value);
	};

	return (
		<>
			<Header
				allProducts={allProducts}
				calcPagination={calcPagination}
			></Header>
			<Box className="bottom-container">
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
									productLabel={inDiscountCatalogue(product.productLabel)}
									productLogo={logo}
									productInList={inShoppingList(
										product.productName,
										shoppingList
									)}
									addToList={addToList}
								></DiscountCard>
							</Grid>
						);
					})}
				</Grid>
				<div className="homer">
					<img src={homer} alt="homer" width={'100px'}></img>
					<img className="eye1 eye" src={eye} alt="eye"></img>
					<img className="eye2 eye" src={eye} alt="eye"></img>
					<img className="homerLogo" src={logo} alt="rema1000"></img>
				</div>
				<Box className="pagination-container">
					<Pagination
						className="pagination"
						size="large"
						count={18}
						color="primary"
						onChange={handleChange}
					></Pagination>
				</Box>
			</Box>
		</>
	);
}

export default Home;
