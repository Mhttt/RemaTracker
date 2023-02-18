import { Box, InputBase} from "@mui/material";
import './Header.css'

function Header(props) {
  return (
		<Box className="header">
			<a href="/RemaTracker" className="title">REMA 1000 TRACKER</a>
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
				<a className="headerLink" href="/shoppinglist">Min Indkøbsliste</a>
				<a className="headerLink" href="/inspiration">
					Måltids Inspiration
				</a>
				<a className="headerLink" href="/help">Brug for hjælp</a>
			</Box>
		</Box>
	);
}

export default Header;