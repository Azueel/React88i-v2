import axios from 'axios';
import { useEffect, useState } from 'react';
import './css/style.css';

function App() {
	const [listaPokemones, setListaPokemones] = useState([]);
	const [pokemonActual, setPokemonActual] = useState('');
	const [opciones, setOpciones] = useState([]);
	const [isVisible, setIsVisible] = useState(false);
	const [mensaje, setMensaje] = useState('');

	useEffect(() => {
		const obtenerDatos = async () => {
			try {
				const respuesta = await axios.get(
					'https://pokeapi.co/api/v2/pokemon?limit=100'
				);
				setListaPokemones(respuesta.data.results);
				pokemonAleatorio(respuesta.data.results);
			} catch (error) {
				console.log(error);
			}
		};

		obtenerDatos();
	}, []);

	const pokemonAleatorio = (listaPokemones) => {
		setIsVisible(false);
		setMensaje('');
		//vamos a generar un numero aleatorio entre 0 y 99 EN ESTE CASO
		const indiceAleatorio = Math.floor(Math.random() * listaPokemones.length);
		//usamos el arreglo de lista pokemon y le ponemos como indice el numero Aleatorio, trayendome un pokemon aleatorio
		const pokemonAleatorio = listaPokemones[indiceAleatorio];
		//guardamos el pokemon en un estado
		setPokemonActual(pokemonAleatorio);
		generarOpciones(pokemonAleatorio, listaPokemones);
	};

	const generarOpciones = (pokemonElegido, listaPokemones) => {
		//creamos un arreglo donde almacenaremos los nombres de los pokemones que vamos a mostrar en las opciones a elegir estando el correcto y 3 random
		let opcionesGeneradas = [pokemonElegido.name];

		//generamos pokemones aleatorio hasta que el arreglo no supere los 4 elementos
		while (opcionesGeneradas.length < 4) {
			const opcionAleatoria =
				listaPokemones[Math.floor(Math.random() * listaPokemones.length)].name;

			//en el caso que un pokemon aleatorio ya este en la lista no lo va a volver a agregar
			if (!opcionesGeneradas.includes(opcionAleatoria)) {
				opcionesGeneradas.push(opcionAleatoria);
			}
		}
		//mezclar opciones
		opcionesGeneradas.sort(() => Math.random() - 0.5);
		setOpciones(opcionesGeneradas);
	};

	const pokemonElegidoUsuario = (opcion) => {
		setIsVisible(true);
		if (pokemonActual.name === opcion) {
			setMensaje('Felicidades Adivinaste');
		} else {
			setMensaje(`No, el pokemon es ${pokemonActual.name}`);
		}
	};

	return (
		<>
			<div>
				<h1>¿Quien es este Pokemon?</h1>

				{pokemonActual ? (
					<div>
						<img
							src={`https://raw.githubusercontent.com/pokeAPi/sprites/master/sprites/pokemon/other/dream-world/${
								pokemonActual.url.split('/')[pokemonActual.url.split('/').length - 2]
							}.svg`}
							alt={pokemonActual.name}
							style={isVisible ? {} : { filter: 'brightness(0) saturate(100%)' }}
						/>
					</div>
				) : (
					''
				)}

				{opciones.map((opcion) => {
					return (
						<button onClick={() => pokemonElegidoUsuario(opcion)}>{opcion}</button>
					);
				})}

				{mensaje ? (
					<div>
						<p>{mensaje}</p>
						<button onClick={() => pokemonAleatorio(listaPokemones)}>
							Volver a Jugar
						</button>
					</div>
				) : (
					''
				)}
			</div>
		</>
	);
}

export default App;
