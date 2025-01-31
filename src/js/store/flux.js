const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			],
			characters: [],
			planets: [],
			vehicles: [],
			favorites: {
				people: [], // Favoritos de personajes
				planets: [], // Favoritos de planetas
				vehicles: [] // Favoritos de vehículos
			}
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},
			loadSomeData: () => {
				/**
					fetch().then().then(data => setStore({ "foo": data.bar }))
				*/
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			},
			getCharacters: async () => {
				try {
					const respuestaUno = await fetch('https://www.swapi.tech/api/people')
					if (respuestaUno.status !== 200) {
						throw new Error('Error en la solicitud')
					}
					const charactersData = await respuestaUno.json()
					setStore({ characters: charactersData.results });

				} catch (error) {
					console.log(error)
				}
			},

			getPlanets: async () => {
				try {
					const respuestaDos = await fetch('https://www.swapi.tech/api/planets')
					if (respuestaDos.status !== 200) {
						throw new Error('Error en la solicitud')
					}
					const planetsData = await respuestaDos.json()
					setStore({ planets: planetsData.results });

				} catch (error) {
					console.log(error)
				}
			},

			getVehicles: async () => {
				try {
					const respuestaTres = await fetch('https://www.swapi.tech/api/vehicles')
					if (respuestaTres.status !== 200) {
						throw new Error('Error en la solicitud')
					}
					const vehiclesData = await respuestaTres.json()
					setStore({ vehicles: vehiclesData.results });

				} catch (error) {
					console.log(error)
				}
			},

			toggleFavorite: (item, type) => {
				const store = getStore();
				const newFavorites = { ...store.favorites };

				if (newFavorites[type].some(fav => fav.uid === item.uid)) {
					newFavorites[type] = newFavorites[type].filter(fav => fav.uid !== item.uid);
				} else {
					newFavorites[type] = [...newFavorites[type], item];
				}

				setStore({ favorites: newFavorites });
			}
		}
	};
};

export default getState;
