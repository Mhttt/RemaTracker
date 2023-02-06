import { Card } from '@mui/material';
import { Box } from '@mui/system';
import './DiscountCard.css';
import { getProductLink } from './helpers';

function DiscountCard(props) {
	const productIsOnDiscount = props.productOldPrice - props.productPrice; //If bigger than 0 product is on discount
	const productlink = getProductLink(props.productImage);

	return (
		<Card
			sx={{ borderRadius: '10px' }}
			className="card-container"
			elevation={3}
			onClick={() => {
				window.open(productlink, '_blank');
			}}
		>
			<Box className="container">
				<img
					className="productImage"
					src={props.productImage}
					alt={props.productName}
				></img>
				<img className="logo" src={props.productLogo} alt="rema1000"></img>
				<h3>{props.productName}</h3>
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
