import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Header from "../components/header/Header";
import { Switch } from "@mantine/core";
import axios from "axios";
import Button from "../components/button/Button";
import validURL from "../utils/validate/url";

const SectionContainer = styled.div`
	max-width: 1440px;
	margin: auto;
	.success {
		display: ${(props) => (props.confirmationMessage ? "block" : "none")};
		background-color: green;
		font-size: var(--font-size-md);
		padding: 16px;
		width: 400px;
		border-radius: 10px;
		color: white;
		margin: 16px 0;
	}
	.error {
		/* display: ${(props) => (props.errorMessage ? "block" : "none")}; */

		background-color: red;
		font-size: var(--font-size-md);
		padding: 16px;
		width: 400px;
		border-radius: 10px;
		color: white;
		margin: 16px 0;
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

const ImageAltContainer = styled(GalleryContainer)``;

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
		padding: var(--size);
		font-size: var(--size-md);
	}
	.form_error {
		color: red;
		font-size: var(--size);
		font-weight: 600;
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
	.mantine-Switch-root {
		flex-direction: row-reverse;
		gap: 24px;
		justify-content: space-between;

		width: 300px;
	}
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
	.mantine-Switch-label {
		font-size: var(--font-size);
		font-weight: 700;
	}
`;
const ButtonContainer = styled.div`
	width: 280px;
	height: 80px;
	margin: var(--size-md) var(--size-lg);
`;
function AddHotel({ token }) {
	const [featuredCheck, setFeaturedChecked] = useState(false);
	const [spaCheck, setSpaChecked] = useState(false);
	const [wifiCheck, setWifiChecked] = useState(false);
	const [breakfastCheck, setBreakfastChecked] = useState(false);
	const [petCheck, setPetChecked] = useState(false);
	const [parkingCheck, setParkingChecked] = useState(false);
	const [gymCheck, setGymChecked] = useState(false);
	const [stars, setStars] = useState(1);

	const initialValues = {
		title: "",
		address: "",
		price: "",
		imgSrc: "",
		smallDesc: "",
		town: "",
		hotel_desc: "",
		amenities_desc: "",
		galleryImgSrc1: "",
		galleryImgSrc2: "",
		galleryImgSrc3: "",
		galleryImgSrc4: "",
		galleryImgSrc5: "",
		galleryImageDesc1: "",
		galleryImageDesc2: "",
		galleryImageDesc3: "",
		galleryImageDesc4: "",
		galleryImageDesc5: "",
	};

	const [userData, setUserData] = useState(initialValues);
	const [formErrors, setFormErrors] = useState({});
	const [isSubmit, setIsSubmit] = useState(false);

	const [confirmationMessage, setConfirmationMessage] = useState("");
	const [errorMessage, setErrorMessage] = useState("");

	const handleChange = (e) => {
		const { name, value } = e.target;

		setUserData({ ...userData, [name]: value });
	};
	console.log(isSubmit);
	const handleSubmit = async (e) => {
		e.preventDefault();
		setFormErrors(validate(userData));
		setIsSubmit(true);
	};

	useEffect(() => {
		if (Object.keys(formErrors).length === 0 && isSubmit) {
			let newHotel = {
				Title: userData.title,
				Address: userData.address,
				stars: stars === null || stars > 5 ? 1 : stars,
				price: userData.price,
				cardImage: userData.imgSrc,
				small_desc: userData.smallDesc,
				Town: userData.town,
				featured: featuredCheck,
				hotel_long_desc: userData.hotel_desc,
				amenities_desc: userData.amenities_desc,
				SliderImages: [
					{
						Img1: userData.galleryImgSrc1,
						Img2: userData.galleryImgSrc2,
						Img3: userData.galleryImgSrc3,
						Img4: userData.galleryImgSrc4,
						Img5: userData.galleryImgSrc5,
					},
				],
				img_alt: [
					{
						alt_img1: userData.galleryImageDesc1,
						alt_img2: userData.galleryImageDesc2,
						alt_img3: userData.galleryImageDesc3,
						alt_img4: userData.galleryImageDesc4,
						alt_img5: userData.galleryImageDesc5,
					},
				],
				amenities: {
					wifi: wifiCheck,
					breakfast: breakfastCheck,
					pets: petCheck,
					parking: parkingCheck,
					spa: spaCheck,
					gym: gymCheck,
				},
			};

			// let response = await axios.post(
			// 	`http://localhost:1337/hotels`,
			// 	newHotel
			// )
			axios
				.post(`http://localhost:1337/hotel`, newHotel, {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				})
				.then(() => {
					setUserData(initialValues);
					setConfirmationMessage(
						"Your hotel has been created successfully"
					);
					console.log(confirmationMessage);
					setTimeout(() => {
						setConfirmationMessage("");
					}, 3000);
					console.log("HOTEL CREADO");
				})
				.catch((err) => {
					setErrorMessage(
						"Something went wrong, try again later",
						err
					);
					setTimeout(() => {
						setErrorMessage("");
					}, 3000);
					console.log("FALLO CON EL API");
				});
		}
	}, [formErrors, isSubmit]);

	const validate = (values) => {
		const errors = {};
		if (!values.title) {
			errors.title = "Hotel title is required";
		}
		if (!values.imgSrc || !validURL(values.imgSrc)) {
			errors.imgSrc = "Image of the portrait is required";
		}
		if (!values.price) {
			errors.price = "Price is required";
		}
		return errors;
	};
	return (
		<>
			<Header user={token} />
			<main>
				<SectionContainer
					confirmationMessage={confirmationMessage}
					errorMessage={errorMessage}
				>
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
										<p className="form_error">
											{formErrors.title}
										</p>
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
											type="number"
											onChange={handleChange}
											value={userData.price}
											className="input__text-box"
										/>
										<p className="form_error">
											{formErrors.price}
										</p>
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
										<p className="form_error">
											{formErrors.imgSrc}
										</p>
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
												Hotel description
											</label>
											<textarea
												className="textarea__text-box"
												name="hotel_desc"
												maxLength="250"
												onChange={handleChange}
												value={userData.hotel_desc}
											></textarea>
										</InputData>
										<InputData>
											<label className="input__label">
												Amenities description
											</label>
											<textarea
												className="textarea__text-box"
												name="amenities_desc"
												maxLength="250"
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
												name="galleryImgSrc1"
												type="text"
												onChange={handleChange}
												value={userData.galleryImgSrc1}
												className="input__text-box"
											/>
										</InputData>
										<InputData>
											<label className="input__label">
												Image Src 2
											</label>
											<input
												name="galleryImgSrc2"
												type="text"
												onChange={handleChange}
												value={userData.galleryImgSrc2}
												className="input__text-box"
											/>
										</InputData>
										<InputData>
											<label className="input__label">
												Image Src 3
											</label>
											<input
												name="galleryImgSrc3"
												type="text"
												onChange={handleChange}
												value={userData.galleryImgSrc3}
												className="input__text-box"
											/>
										</InputData>
										<InputData>
											<label className="input__label">
												Image Src 4
											</label>
											<input
												name="galleryImgSrc4"
												type="text"
												onChange={handleChange}
												value={userData.galleryImgSrc4}
												className="input__text-box"
											/>
										</InputData>
										<InputData>
											<label className="input__label">
												Image Src 5
											</label>
											<input
												name="galleryImgSrc5"
												type="text"
												onChange={handleChange}
												value={userData.galleryImgSrc5}
												className="input__text-box"
											/>
										</InputData>
									</div>
								</GalleryContainer>
								<ImageAltContainer>
									<h2 className="gallery__title">
										Gallery images description
									</h2>
									<div className="gallery__inputs-container">
										<InputData>
											<label className="input__label">
												Description of the image 1
											</label>
											<input
												name="galleryImageDesc1"
												type="text"
												onChange={handleChange}
												value={
													userData.galleryImageDesc1
												}
												className="input__text-box"
											/>
										</InputData>
										<InputData>
											<label className="input__label">
												Description of the image 2
											</label>
											<input
												name="galleryImageDesc2"
												type="text"
												onChange={handleChange}
												value={
													userData.galleryImageDesc2
												}
												className="input__text-box"
											/>
										</InputData>
										<InputData>
											<label className="input__label">
												Description of the image 3
											</label>
											<input
												name="galleryImageDesc3"
												type="text"
												onChange={handleChange}
												value={
													userData.galleryImageDesc3
												}
												className="input__text-box"
											/>
										</InputData>
										<InputData>
											<label className="input__label">
												Description of the image 4
											</label>
											<input
												name="galleryImageDesc4"
												type="text"
												onChange={handleChange}
												value={
													userData.galleryImageDesc4
												}
												className="input__text-box"
											/>
										</InputData>
										<InputData>
											<label className="input__label">
												Description of the image 5
											</label>
											<input
												name="galleryImageDesc5"
												type="text"
												onChange={handleChange}
												value={
													userData.galleryImageDesc5
												}
												className="input__text-box"
											/>
										</InputData>
									</div>
								</ImageAltContainer>
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
										name="spa"
										label="Spa"
										checked={spaCheck}
										onChange={(event) =>
											setSpaChecked(
												event.currentTarget.checked
											)
										}
									/>
								</ToggleContainer>
								<ToggleContainer>
									<Switch
										name="wifi"
										label="Wifi"
										checked={wifiCheck}
										onChange={(event) =>
											setWifiChecked(
												event.currentTarget.checked
											)
										}
									/>
								</ToggleContainer>
								<ToggleContainer>
									<Switch
										name="breakfast"
										label="Breakfast"
										checked={breakfastCheck}
										onChange={(event) =>
											setBreakfastChecked(
												event.currentTarget.checked
											)
										}
									/>
								</ToggleContainer>
								<ToggleContainer>
									<Switch
										name="petFriendly"
										label="Pet Friendly"
										checked={petCheck}
										onChange={(event) =>
											setPetChecked(
												event.currentTarget.checked
											)
										}
									/>
								</ToggleContainer>
								<ToggleContainer>
									<Switch
										name="parking"
										label="Parking"
										checked={parkingCheck}
										onChange={(event) =>
											setParkingChecked(
												event.currentTarget.checked
											)
										}
									/>
								</ToggleContainer>
								<ToggleContainer>
									<Switch
										name="gym"
										label="Gym"
										checked={gymCheck}
										onChange={(event) =>
											setGymChecked(
												event.currentTarget.checked
											)
										}
									/>
								</ToggleContainer>
							</AmenitiesContainer>
						</FormContainer>
						<ButtonContainer>
							<div className="success">{confirmationMessage}</div>
							{errorMessage && (
								<div className="error">{errorMessage}</div>
							)}
							<Button
								text="Create a Hotel"
								btnCategory="primary"
								color="blue"
								typeOfButton="button"
								type="submit"
							></Button>
						</ButtonContainer>
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
