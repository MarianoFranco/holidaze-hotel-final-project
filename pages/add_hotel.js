import React, { useState } from "react";
import styled from "styled-components";
import Header from "../components/header/Header";
import { Switch } from "@mantine/core";
import axios from "axios";

function AddHotel({ jwt }) {
	const [featuredCheck, setFeaturedChecked] = useState(false);
	const [stars, setStars] = useState(5);

	const [userData, setUserData] = useState({
		title: "",
		address: "",
		price: "",
		imgSrc: "",
		smallDesc: "",
		town: "",
	});
	const [confirmationMessage, setConfirmationMessage] = useState("");

	const handleChange = (e) => {
		//e.preventDefault();
		const { name, value } = e.target;

		setUserData({ ...userData, [name]: value });
	};
	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			let newHotel = {
				Title: userData.title,
				Address: userData.address,
				stars: stars === null || stars > 5 ? 1 : stars,
				price: userData.price,
				cardImage: userData.imgSrc,
				small_desc: userData.smallDesc,
				Town: userData.town,
				featured: featuredCheck,
			};
			let response = await axios.post(
				`http://localhost:1337/hotels`,
				newHotel
			);
			setUserData({
				title: "",
				address: "",
				price: "",
				imgSrc: "",
				smallDesc: "",
				town: "",
			});
			setConfirmationMessage("Your message was sent successfully");
		} catch (err) {
			console.log("err", err);
		}
	};
	return (
		<>
			<Header />
			<main>
				<form onSubmit={handleSubmit}>
					<div>
						<div>
							<label>Hotel Name</label>
							<input
								name="title"
								type="text"
								onChange={handleChange}
								value={userData.title}
							/>
						</div>
						<div>
							<label>Hotel Address</label>
							<input
								name="address"
								type="text"
								onChange={handleChange}
								value={userData.address}
							/>
						</div>
						<div>
							<label>Stars</label>
							<input
								name="stars"
								type="number"
								min="1"
								max="5"
								onChange={(e) => {
									setStars(e.target.value);
								}}
								value={stars}
							/>
						</div>
						<div>
							<label>Price</label>
							<input
								name="price"
								type="text"
								onChange={handleChange}
								value={userData.price}
							/>
						</div>
						<div>
							<label>Hotel Portrait Image SRC</label>
							<input
								name="imgSrc"
								type="text"
								onChange={handleChange}
								value={userData.imgSrc}
							/>
						</div>
						<div>
							<label>Hotel card small description</label>
							<input
								name="smallDesc"
								type="text"
								onChange={handleChange}
								value={userData.smallDesc}
							/>
						</div>
						<div>
							<label>Hotel card town</label>
							<input
								name="town"
								type="text"
								onChange={handleChange}
								value={userData.town}
							/>
						</div>
						<div>
							<Switch
								name="featured"
								label="Featured"
								checked={featuredCheck}
								onChange={(event) =>
									setFeaturedChecked(
										event.currentTarget.checked
									)
								}
							/>
						</div>

						{/* <div>
							hotel Long description
							<textarea type="text"></textarea>
						</div>
						<div>
							Hotel Amenities description
							<textarea type="text"></textarea>
						</div> */}
					</div>
					<button type="submit">Create hotel</button>
					<div>{confirmationMessage}</div>
				</form>
			</main>
		</>
	);
}

export default AddHotel;
