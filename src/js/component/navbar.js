import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const Navbar = () => {
	const { store, actions } = useContext(Context);

	const totalFavorites = Object.values(store.favorites).reduce((acc, favList) => acc + favList.length, 0);

	return (
		<nav className="navbar navbar-light bg-light mb-3">
			<div className="container">
				<Link to="/" className="navbar-brand">
					<img
						src="https://logos-world.net/wp-content/uploads/2020/11/Star-Wars-Logo.png"
						alt="Star Wars"
						style={{ height: "40px" }}
					/>
				</Link>

				<div className="ml-auto">
					<div className="dropdown">
						<button
							className="btn btn-primary dropdown-toggle"
							type="button"
							id="favoritesDropdown"
							data-bs-toggle="dropdown"
							aria-expanded="false"
						>
							Favoritos {totalFavorites}
						</button>
						<ul className="dropdown-menu dropdown-menu-end" aria-labelledby="favoritesDropdown">
							{Object.entries(store.favorites).map(([type, favList]) =>
								favList.map((fav, index) => (
									<li key={index} className="d-flex justify-content-between align-items-center px-2">
										<Link to={`/details/${type}/${fav.uid}`} className="dropdown-item">
											{fav.name}
										</Link>
										<button className="btn btn-danger btn-sm" onClick={() => actions.toggleFavorite(fav, type)}>X</button>
									</li>
								))
							)}
						</ul>
					</div>
				</div>
			</div>
		</nav>
	);
};





