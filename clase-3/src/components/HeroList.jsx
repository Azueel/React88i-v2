import React from 'react';
import { heroes } from '../data/heroesData';
import { Col, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';

export const HeroList = (props) => {
	const { publisher } = props;

	const mostrarHeroes = heroes.filter((heroe) => {
		return heroe.publisher === publisher;
	});

	return (
		<div>
			<h1 className="text-center my-3 mb-4">{mostrarHeroes[0].publisher}</h1>
			<Row xs={1} lg={4} className="m-3">
				{mostrarHeroes.map((heroe) => {
					return (
						<Col>
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
									<Link to={`/personaje/${heroe.id}`}>Ver Mas</Link>
								</Card.Body>
							</Card>
						</Col>
					);
				})}
			</Row>
		</div>
	);
};
