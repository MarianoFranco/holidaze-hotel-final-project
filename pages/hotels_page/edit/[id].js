import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Header from "../../../components/header/Header";
import axios from "axios";
import nookies from "nookies";

export async function getStaticPaths(ctx) {
	console.log("GETTT", ctx);

	try {
		const res = await fetch("http://localhost:1337/hotels/");
		const data = await res.json();
		const paths = data.map(({ id }) => ({ params: { id: `${id}` } }));

		return {
			paths,
			fallback: false,
		};
	} catch (error) {
		console.log(error);
	}
}

export async function getStaticProps(ctx) {
	const { params } = ctx;
	const cookies = nookies.get(ctx);
	console.log("GETTT", cookies, cookies?.jwt);

	try {
		let res = await fetch("http://localhost:1337/hotels/" + params.id);
		let data = await res.json();

		//console.log(data);
		return {
			props: { data },
		};
	} catch (error) {
		console.error(error);
	}
}

function EditHotel({ data, jwt }) {
	const [hotelData, setHotelData] = useState({
		title: data.Title,
		stars: data.stars,
	});

	useEffect(() => {
		if (!jwt) {
			location.href = "/login";
		}
	}, [jwt]);

	const handleChange = (e) => {
		e.preventDefault();
		const { name, value } = e.target;

		setHotelData({ ...hotelData, [name]: value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			let updatedHotel = {
				Title: hotelData.title,
				stars: hotelData.stars,
			};
			let response = await axios.put(
				`http://localhost:1337/hotels/${data.id}`,
				updatedHotel,
				{
					headers: {
						Authorization: `Bearer ${jwt}`,
					},
				}
			);
		} catch (err) {
			console.log("err", err);
		}
	};
	console.log(hotelData);

	return (
		<>
			<Header />
			<main>
				<h1>Edit Hotel</h1>
				<div>
					<form onSubmit={handleSubmit}>
						<div>
							<label>Hotel Name: </label>
							<input
								name="title"
								type="text"
								value={hotelData.title}
								onChange={handleChange}
							/>
						</div>
						<div>
							<label>Hotel stars: </label>
							<input
								name="stars"
								type="number"
								value={hotelData.stars}
								onChange={handleChange}
							/>
						</div>
						<button type="submit">Confirm</button>
					</form>
				</div>
			</main>
		</>
	);
}

export default EditHotel;
