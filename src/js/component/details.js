import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './details.css'

const Details = () => {
    const { type, id } = useParams();
    const [itemDetails, setItemDetails] = useState(null);

    useEffect(() => {
        const getDetails = async () => {
            try {
                let url = '';
                if (type === 'people') {
                    url = `https://www.swapi.tech/api/people/${id}`;
                } else if (type === 'planets') {
                    url = `https://www.swapi.tech/api/planets/${id}`;
                } else if (type === 'vehicles') {
                    url = `https://www.swapi.tech/api/vehicles/${id}`;
                }

                const response = await fetch(url);
                const data = await response.json();
                const item = data.result;
                setItemDetails(item);
            } catch (error) {
                console.error('Error al obtener los detalles:', error);
            }
        };

        getDetails();
    }, [type, id]);

    if (!itemDetails) return <div>Cargando...</div>;

    return (
        <div className="details-container container px-4">
            <div className="left-side">
                {type === 'people' && (
                    <img
                        src={`https://starwars-visualguide.com/assets/img/characters/${id}.jpg`}
                        alt={itemDetails.properties.name}
                        className="details-image"
                    />
                )}
                {type === 'planets' && (
                    <img
                        src={`https://starwars-visualguide.com/assets/img/planets/${id}.jpg`}
                        alt={itemDetails.properties.name}
                        className="details-image"
                    />
                )}
                {type === 'vehicles' && (
                    <img
                        src={`https://starwars-visualguide.com/assets/img/vehicles/${id}.jpg`}
                        alt={itemDetails.properties.name}
                        className="details-image"
                    />
                )}
            </div>

            <div className="right-side">
                <p>{itemDetails.description}</p>

                {type === 'people' && (
                    <div className="details-info">
                        <p><strong>Nombre:</strong> {itemDetails.properties.name}</p>
                        <p><strong>Género:</strong> {itemDetails.properties.gender}</p>
                        <p><strong>Año de nacimiento:</strong> {itemDetails.properties.birth_year}</p>
                        <p><strong>Altura:</strong> {itemDetails.properties.height}</p>
                        <p><strong>Color de cabello:</strong> {itemDetails.properties.hair_color}</p>
                        <p><strong>Color de ojos:</strong> {itemDetails.properties.eye_color}</p>
                    </div>
                )}

                {type === 'planets' && (
                    <div className="details-info">
                        <p><strong>Nombre:</strong> {itemDetails.properties.name}</p>
                        <p><strong>Terreno:</strong> {itemDetails.properties.terrain}</p>
                        <p><strong>Clima:</strong> {itemDetails.properties.climate}</p>
                        <p><strong>Población:</strong> {itemDetails.properties.population}</p>
                        <p><strong>Periodo de rotación:</strong> {itemDetails.properties.rotation_period}</p>
                        <p><strong>Periodo orbital:</strong> {itemDetails.properties.orbital_period}</p>
                        <p><strong>Diámetro:</strong> {itemDetails.properties.diameter}</p>
                    </div>
                )}

                {type === 'vehicles' && (
                    <div className="details-info">
                        <p><strong>Nombre:</strong> {itemDetails.properties.name}</p>
                        <p><strong>Modelo:</strong> {itemDetails.properties.model}</p>
                        <p><strong>Tipo de vehículo:</strong> {itemDetails.properties.vehicle_class}</p>
                        <p><strong>Fabricante:</strong> {itemDetails.properties.manufacturer}</p>
                        <p><strong>Costo en créditos:</strong> {itemDetails.properties.cost_in_credits}</p>
                        <p><strong>Longitud:</strong> {itemDetails.properties.length}</p>
                        <p><strong>Tripulación:</strong> {itemDetails.properties.crew}</p>
                        <p><strong>Pasajeros:</strong> {itemDetails.properties.passengers}</p>
                        <p><strong>Velocidad máxima:</strong> {itemDetails.properties.max_atmosphering_speed}</p>
                        <p><strong>Capacidad de carga:</strong> {itemDetails.properties.cargo_capacity}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Details;
