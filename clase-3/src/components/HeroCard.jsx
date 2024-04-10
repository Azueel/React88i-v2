import React from 'react';

export const HeroCard = ({ heroe }) => {
	return (
		<div>
			<Card style={{ width: '18rem' }} className="mb-5">
				<Card.Img
					variant="top"
					src={heroe.imagen}
					style={{
						height: '300px',
						objectFit: 'cover',
						objectPosition: 'top',
					}}
				/>
				<Card.Body>
					<Card.Title>{heroe.superhero}</Card.Title>
					<Button variant="primary">Ver Mas</Button>
				</Card.Body>
			</Card>
		</div>
	);
};
