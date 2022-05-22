import React, { useState } from "react";
import styled from "styled-components";
import Header from "../components/header/Header";
import { Switch } from "@mantine/core";
import axios from "axios";
import Button from "../components/button/Button";

const SectionContainer = styled.div`
	max-width: 1440px;
	margin: auto;

	.success {
		background-color: green;
	}
`;
const HeaderSectionContainer = styled.div`
	.title {
		font-size: var(--font-size-lg);
		margin: var(--size-lg) auto;
	}
	.line {
		width: 100%;
		height: 1px;
		background-color: rgba(0, 0, 0, 0.2);
		margin: var(--size-lg) auto;
	}
	.subtitle {
		margin: var(--size-lg) auto;
		font-family: var(--font-body);
		font-size: var(--size-md);
	}
`;
const FormContainer = styled.div`
	display: flex;
	justify-content: center;
	gap: 24px;
`;
const DataContainer = styled.div`
	max-width: 815px;
	width: 100%;
	min-height: 614px;
	border: solid 1px black;
	border-radius: 10px;
	background-color: #eeeeee;
	padding: var(--size-md);
`;

const HotelData = styled.div`
	display: flex;
	justify-content: center;
	flex-wrap: wrap;
	gap: 24px;
	.textarea-container {
		width: 100%;
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		gap: 24px;
	}
`;

const GalleryContainer = styled.div`
	.gallery__title {
		margin: var(--size-md);
	}
	.gallery__inputs-container {
		display: flex;
		flex-wrap: wrap;
		gap: 24px;
		justify-content: center;
	}
`;

const InputData = styled.div`
	max-width: 339px;
	width: 100%;
	display: flex;
	flex-direction: column;
	gap: 16px;
	.input__label {
		font-weight: 600;
	}
	.input__text-box {
		height: 53px;
		border: solid 1px var(--color-black);
		border-radius: 10px;
		background: none;
		padding: var(--size-md);
		font-size: var(--font-size-md);
		font-weight: 500;
	}

	.textarea__text-box {
		background: none;
		border: solid 1px var(--color-black);
		border-radius: 10px;
		min-height: 200px;
	}
`;

const AmenitiesContainer = styled(DataContainer)`
	max-width: 509px;
	display: flex;
	flex-direction: column;
	justify-content: center;
	gap: 40px;
	align-items: center;
`;

const ToggleContainer = styled.div`
	.mantine-Switch-input {
		height: 44px;
		width: 93px;
		border: solid 2px var(--color-secondary);
		font-size: 40px;
	}
	.mantine-Switch-input:checked {
		background-color: var(--color-secondary);
	}
	.mantine-Switch-input::before {
		background-color: var(--color-white);
		height: 40px;
		width: 40px;
		border: solid 1px var(--color-secondary);
	}
	.mantine-Switch-input:checked::before {
		transform: translateX(47px);
	}
`;
const ButtonContainer = styled.div`
	width: 280px;
	height: 80px;
	margin: var(--size-md) var(--size-lg);
`;
function AddHotel({ token }) {
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
			setConfirmationMessage("Your hotel was created successfully");
		} catch (err) {
			console.log("err", err);
		}
	};
	return (
		<>
			<Header user={token} />
			<main>
				<SectionContainer>
					<HeaderSectionContainer>
						<h1 className="title">Add a new hotel</h1>
						<div className="line"></div>
						<p className="subtitle">
							Fill in the boxes on the form and confirm to add a
							new product
						</p>
					</HeaderSectionContainer>

					<form onSubmit={handleSubmit}>
						<FormContainer>
							<DataContainer>
								<HotelData>
									<InputData>
										<label className="input__label">
											Hotel Name
										</label>
										<input
											name="title"
											type="text"
											onChange={handleChange}
											value={userData.title}
											className="input__text-box"
										/>
									</InputData>
									<InputData>
										<label className="input__label">
											Hotel Address
										</label>
										<input
											name="address"
											type="text"
											onChange={handleChange}
											value={userData.address}
											className="input__text-box"
										/>
									</InputData>
									<InputData>
										<label className="input__label">
											Stars
										</label>
										<input
											name="stars"
											type="number"
											min="1"
											max="5"
											onChange={(e) => {
												setStars(e.target.value);
											}}
											value={stars}
											className="input__text-box"
										/>
									</InputData>
									<InputData>
										<label className="input__label">
											Price
										</label>
										<input
											name="price"
											type="text"
											onChange={handleChange}
											value={userData.price}
											className="input__text-box"
										/>
									</InputData>
									<InputData>
										<label className="input__label">
											Hotel Portrait Image SRC
										</label>
										<input
											name="imgSrc"
											type="text"
											onChange={handleChange}
											value={userData.imgSrc}
											className="input__text-box"
										/>
									</InputData>
									<InputData>
										<label className="input__label">
											Hotel card small description
										</label>
										<input
											name="smallDesc"
											type="text"
											onChange={handleChange}
											value={userData.smallDesc}
											className="input__text-box"
										/>
									</InputData>
									<InputData>
										<label className="input__label">
											Hotel card town
										</label>
										<input
											name="town"
											type="text"
											onChange={handleChange}
											value={userData.town}
											className="input__text-box"
										/>
									</InputData>

									<div className="textarea-container">
										<InputData>
											<label className="input__label">
												Amenities small description
											</label>
											<textarea
												className="textarea__text-box"
												name="amenities_desc"
												onChange={handleChange}
												value={userData.amenities_desc}
											></textarea>
										</InputData>
										<InputData>
											<label className="input__label">
												Amenities small description
											</label>
											<textarea
												className="textarea__text-box"
												name="amenities_desc"
												onChange={handleChange}
												value={userData.amenities_desc}
											></textarea>
										</InputData>
									</div>
								</HotelData>
								<GalleryContainer>
									<h2 className="gallery__title">
										Images Gallery
									</h2>
									<div className="gallery__inputs-container">
										<InputData>
											<label className="input__label">
												Image Src 1
											</label>
											<input
												name="town"
												type="text"
												onChange={handleChange}
												value={userData.town}
												className="input__text-box"
											/>
										</InputData>
										<InputData>
											<label className="input__label">
												Image Src 2
											</label>
											<input
												name="town"
												type="text"
												onChange={handleChange}
												value={userData.town}
												className="input__text-box"
											/>
										</InputData>
										<InputData>
											<label className="input__label">
												Image Src 3
											</label>
											<input
												name="town"
												type="text"
												onChange={handleChange}
												value={userData.town}
												className="input__text-box"
											/>
										</InputData>
										<InputData>
											<label className="input__label">
												Image Src 4
											</label>
											<input
												name="town"
												type="text"
												onChange={handleChange}
												value={userData.town}
												className="input__text-box"
											/>
										</InputData>
										<InputData>
											<label className="input__label">
												Image Src 5
											</label>
											<input
												name="town"
												type="text"
												onChange={handleChange}
												value={userData.town}
												className="input__text-box"
											/>
										</InputData>
									</div>
								</GalleryContainer>
							</DataContainer>
							<AmenitiesContainer>
								<h3>Amenities and featured options</h3>
								<ToggleContainer>
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
								</ToggleContainer>
								<ToggleContainer>
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
								</ToggleContainer>
								<ToggleContainer>
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
								</ToggleContainer>
								<ToggleContainer>
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
								</ToggleContainer>
								<ToggleContainer>
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
								</ToggleContainer>
								<ToggleContainer>
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
								</ToggleContainer>
								<ToggleContainer>
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
								</ToggleContainer>
							</AmenitiesContainer>
						</FormContainer>
						<ButtonContainer>
							<Button
								text="Create a Hotel"
								btnCategory="primary"
								color="blue"
								typeOfButton="button"
								type="submit"
							></Button>
						</ButtonContainer>

						<div className="success">{confirmationMessage}</div>
					</form>
				</SectionContainer>
			</main>
		</>
	);
}
export function getServerSideProps({ req, res, ctx }) {
	return { props: { token: req.cookies.jwt || "" } };
}
export default AddHotel;
