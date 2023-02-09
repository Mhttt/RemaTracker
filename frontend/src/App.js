import './App.css';
import logo from './public/remalogo.png';
import homer from './public/HomerSimpson.png';
import eye from './public/eye.png';
import { calculateEyes } from './AppHelper';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DiscountCard from './components/DiscountCard/DiscountCard';
import { Grid, Pagination, Box, InputBase } from '@mui/material';

function App() {
  const [allProducts, setAllProducts] = useState([]);
  const [shownProducts, setShownProducts] = useState([]);
  const [newsPerPage] = useState(24);

  useEffect(() => {
    fetchData();
  }, []);

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
    console.log(startIndex, endIndex);
    setShownProducts(useProducts.slice(startIndex, endIndex));
  }
  console.log(shownProducts);

  const handleChange = (event, value) => {
    calcPagination(undefined, value);
  };

  return (
    <div>
      <Box className="header">
        <h1 className="title">REMA 1000 TRACKER</h1>
        <Box>
          <InputBase
            className="search-field"
            placeholder="Søg i Rema1000s Sortiment"
            onChange={(e) => {
              const searchValue = e.target.value;
              const filteredProducts = allProducts.filter((product) => {
                return product.productName
                  .toLowerCase()
                  .includes(searchValue.toLowerCase());
              });
              calcPagination(filteredProducts, 1);
            }}
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
      <div className="homer">
        <img src={homer} alt="homer" width={'100px'}></img>
        <img className="eye1 eye" src={eye} alt='eye'></img>
        <img className="eye2 eye" src={eye} alt='eye'></img>
        <img className='homerLogo' src={logo} alt='rema1000'></img>
      </div>

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
