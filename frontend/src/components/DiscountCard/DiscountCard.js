import { Button, Card } from '@mui/material';
import { Box } from '@mui/system';
import './DiscountCard.css';
import { getProductLink } from './DiscountHelpers';
import heart1 from '../../public/heart1.png';
import heart2 from '../../public/heart2.png';
import Favorite from '@mui/icons-material/Favorite';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';

function DiscountCard(props) {
	const productIsOnDiscount = props.productOldPrice - props.productPrice; //If bigger than 0 product is on discount
	const productlink = getProductLink(props.productImage);
  const inCatalogue = props.productLabel;

	return (
		<Card
			sx={{ borderRadius: '10px', position: 'relative' }}
			className="card-container"
			elevation={3}
			onDoubleClick={() => {
				window.open(productlink, '_blank');
			}}
		>
			<button
				className="addToList"
				onClick={() => {
					props.addToList(props.productName.toLowerCase());
				}}
			>
				{props.productInList ? (
					<Favorite sx={{ fill: 'red' }}></Favorite>
				) : (
					<FavoriteBorder sx={{ fill: 'red' }}></FavoriteBorder>
				)}
			</button>
			<Box className="container">
				<img
					className="productImage"
					src={props.productImage}
					alt={props.productName}
				></img>
				<img className="logo" src={props.productLogo} alt="rema1000"></img>
				<h3 className="product-name">{props.productName}</h3>
				<p>{props.productDescription}</p>
				{productIsOnDiscount > 0 ? (
					<Box className="price-container">
						<h3 className="strike">{props.productOldPrice} kr</h3>
						<h1 className="discount">{props.productPrice} kr</h1>
						<h5>
							Du kan nu sparer{' '}
							{(props.productOldPrice - props.productPrice).toFixed(2)} kr!
						</h5>
					</Box>
				) : inCatalogue ? (
					<Box className="price-container-non">
						<h1 className="discount">{props.productPrice} kr</h1>
						<p className="avisvare">Avisvare</p>
					</Box>
				) : (
					<Box className="price-container-non">
						<h1 className="nondiscount">{props.productPrice} kr</h1>
						<h5 className="nodiscount-description">
							{' '}
							Desværre ingen rabat denne uge!
						</h5>
					</Box>
				)}
			</Box>
		</Card>
	);
}

export default DiscountCard;
