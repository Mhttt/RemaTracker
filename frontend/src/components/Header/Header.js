import { Box, InputBase, Link } from "@mui/material";
import './Header.css'

function Header(props) {
  return (
		<Box className="header">
			<h1 className="title">REMA 1000 TRACKER</h1>
			<Box>
				<InputBase
					className="search-field"
					placeholder="Søg i Rema1000s Sortiment"
					onChange={(e) => {
						const searchValue = e.target.value;
						const filteredProducts = props.allProducts.filter((product) => {
							return product.productName
								.toLowerCase()
								.includes(searchValue.toLowerCase());
						});
						props.calcPagination(filteredProducts, 1);
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
				<Link to="/help">Brug for hjælp</Link>
			</Box>
		</Box>
	);
}

export default Header;