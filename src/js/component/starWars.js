import React, { useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import 'bootstrap-icons/font/bootstrap-icons.css';
import './starWars.css';
import { useNavigate } from "react-router-dom";
import { BiHeart } from "react-icons/bi";


export function StarWars() {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();

    useEffect(() => {
        actions.getCharacters();
        actions.getPlanets();
        actions.getVehicles();
    }, []);

    const toggleFavorite = (item, type) => {
        actions.toggleFavorite(item, type);
    };

    return (
        <div className="container px-4">

            <h2 className="text-xl font-bold mb-4">Personajes</h2>
            <div className="scroll-container">
                {store.characters?.map((character, index) => (
                    <div className="card" key={index}>
                        <img src={`https://starwars-visualguide.com/assets/img/characters/${character.uid}.jpg`} className="card-img-top" alt={character.name} />
                        <div className="card-body">
                            <h5 className="card-title">{character.name}</h5>
                            <div className="button-group">
                                <button className="btn btn-primary" onClick={() => navigate(`/details/people/${character.uid}`)}>
                                    Saber más
                                </button>
                                <button className={`btn ${store.favorites.people.some(fav => fav.uid === character.uid) ? 'btn-danger' : 'btn-outline-danger'}`} onClick={() => actions.toggleFavorite(character, "people")}>
                                    {store.favorites.people.some(fav => fav.uid === character.uid) ? <BiHeart /> : <BiHeart />}
                                </button>


                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <h2 className="text-xl font-bold mt-8 mb-4">Planetas</h2>
            <div className="scroll-container">
                {store.planets?.map((planet, index) => (
                    <div className="card" key={index}>
                        <img src={`https://starwars-visualguide.com/assets/img/planets/${planet.uid}.jpg`} className="card-img-top" alt={planet.name} />
                        <div className="card-body">
                            <h5 className="card-title">{planet.name}</h5>
                            <div className="button-group">
                                <button className="btn btn-primary" onClick={() => navigate(`/details/planets/${planet.uid}`)}>
                                    Saber más
                                </button>
                                <button
                                    className={`btn ${store.favorites.planets.some(fav => fav.uid === planet.uid) ? 'btn-danger' : 'btn-outline-danger'}`}
                                    onClick={() => actions.toggleFavorite(planet, "planets")}>
                                    {store.favorites.planets.some(fav => fav.uid === planet.uid) ? <BiHeart /> : <BiHeart />}
                                </button>

                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <h2 className="text-xl font-bold mt-8 mb-4">Vehículos</h2>
            <div className="scroll-container">
                {store.vehicles?.map((vehicle, index) => (
                    <div className="card" key={index}>
                        <img src={`https://starwars-visualguide.com/assets/img/vehicles/${vehicle.uid}.jpg`} onError={(e) => e.target.src = "https://starwars-visualguide.com/assets/img/placeholder.jpg"} className="card-img-top" alt={vehicle.name} />
                        <div className="card-body">
                            <h5 className="card-title">{vehicle.name}</h5>
                            <div className="button-group">
                                <button className="btn btn-primary" onClick={() => navigate(`/details/vehicles/${vehicle.uid}`)}>
                                    Saber más
                                </button>
                                <button
                                    className={`btn ${store.favorites.vehicles.some(fav => fav.uid === vehicle.uid) ? 'btn-danger' : 'btn-outline-danger'}`}
                                    onClick={() => actions.toggleFavorite(vehicle, "vehicles")}>
                                    {store.favorites.vehicles.some(fav => fav.uid === vehicle.uid) ? <BiHeart /> : <BiHeart />}
                                </button>

                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}





