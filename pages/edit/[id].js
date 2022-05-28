import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Header from "../../components/header/Header";
import { Switch } from "@mantine/core";
import axios from "axios";
import Button from "../../components/button/Button";
import nookies, { parseCookies } from "nookies";
import { BASE_URL } from "../../utils/config/config";
import Router, { useRouter } from "next/router";
import { redirectUser } from "../../utils/redirectUser/redirectUser";

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
		display: ${(props) => (props.errorMessage ? "block" : "none")};
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
		font-size: var(--font-size);
		font-weight: 500;
	}

	.textarea__text-box {
		background: none;
		border: solid 1px var(--color-black);
		border-radius: 10px;
		min-height: 200px;
		padding: var(--size);
		font-size: var(--size);
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

function EditHotel({ data, jwt }) {
	const [featuredCheck, setFeaturedChecked] = useState(data.featured);
	const [spaCheck, setSpaChecked] = useState(data.amenities.spa);
	const [wifiCheck, setWifiChecked] = useState(data.amenities.wifi);
	const [breakfastCheck, setBreakfastChecked] = useState(
		data.amenities.breakfast
	);
	const [petCheck, setPetChecked] = useState(data.amenities.pets);
	const [parkingCheck, setParkingChecked] = useState(data.amenities.parking);
	const [gymCheck, setGymChecked] = useState(data.amenities.gym);
	const [stars, setStars] = useState(data.stars);

	const initialValues = {
		title: data.Title,
		address: data.Address,
		price: data.price,
		imgSrc: data.cardImage,
		smallDesc: data.small_desc,
		town: data.Town,
		hotel_desc: data.hotel_long_desc,
		amenities_desc: data.amenities_desc,
		galleryImgSrc1: data.SliderImages[0].Img1,
		galleryImgSrc2: data.SliderImages[0].Img2,
		galleryImgSrc3: data.SliderImages[0].Img3,
		galleryImgSrc4: data.SliderImages[0].Img4,
		galleryImgSrc5: data.SliderImages[0].Img5,
		galleryImageDesc1: data.img_alt[0]?.alt_img1,
		galleryImageDesc2: data.img_alt[0]?.alt_img2,
		galleryImageDesc3: data.img_alt[0]?.alt_img3,
		galleryImageDesc4: data.img_alt[0]?.alt_img4,
		galleryImageDesc5: data.img_alt[0]?.alt_img5,
	};

	const [hotelData, sethotelData] = useState(initialValues);

	const [confirmationMessage, setConfirmationMessage] = useState("");
	const [errorMessage, setErrorMessage] = useState("");

	const handleChange = (e) => {
		const { name, value } = e.target;

		sethotelData({ ...hotelData, [name]: value });
	};
	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			let updateHotel = {
				Title: hotelData.title,
				Address: hotelData.address,
				stars: stars === null || stars > 5 ? 1 : stars,
				price: hotelData.price,
				cardImage: hotelData.imgSrc,
				small_desc: hotelData.smallDesc,
				Town: hotelData.town,
				featured: featuredCheck,
				hotel_long_desc: hotelData.hotel_desc,
				amenities_desc: hotelData.amenities_desc,
				SliderImages: [
					{
						Img1: hotelData.galleryImgSrc1,
						Img2: hotelData.galleryImgSrc2,
						Img3: hotelData.galleryImgSrc3,
						Img4: hotelData.galleryImgSrc4,
						Img5: hotelData.galleryImgSrc5,
					},
				],
				img_alt: [
					{
						alt_img1: hotelData.galleryImageDesc1,
						alt_img2: hotelData.galleryImageDesc2,
						alt_img3: hotelData.galleryImageDesc3,
						alt_img4: hotelData.galleryImageDesc4,
						alt_img5: hotelData.galleryImageDesc5,
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

			let response = await axios.put(
				`${BASE_URL}/hotels/${data.id}`,
				updateHotel,
				{
					headers: {
						Authorization: `Bearer ${jwt}`,
					},
				}
			);
			setConfirmationMessage("Your hotel has been updated successfully");

			setTimeout(() => {
				{
					confirmationMessage;
					setConfirmationMessage("");
				}
			}, 3000);
		} catch (err) {
			setErrorMessage("Something went wrong, try again later", err);
			setTimeout(() => {
				{
					confirmationMessage;
					setErrorMessage("");
				}
			}, 3000);
		}
	};
	console.log(jwt);

	// const router = useRouter();
	// useEffect(() => {
	// 	if (!jwt) {
	// 		location.href = "/login";
	// 	}
	// if (!jwt) {
	// 	router.push("/login");
	// }
	// }, [jwt, router]);

	const [loaded, setLoaded] = useState(false);
	useEffect(() => {
		const { pathname } = Router;
		// conditional redirect
		if (!jwt) {
			// with router.push the page may be added to history
			// the browser on history back will  go back to this page and then forward again to the redirected page
			// you can prevent this behaviour using location.replace
			// Router.push("/login");
			location.replace("/login");
		}
	}, [jwt]);

	return (
		<>
			<Header user={jwt} />
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
											value={hotelData.title}
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
											value={hotelData.address}
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
											value={hotelData.price}
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
											value={hotelData.imgSrc}
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
											value={hotelData.smallDesc}
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
											value={
												!hotelData.town
													? ""
													: hotelData.town
											}
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
												value={hotelData.hotel_desc}
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
												value={hotelData.amenities_desc}
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
												value={hotelData.galleryImgSrc1}
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
												value={hotelData.galleryImgSrc2}
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
												value={hotelData.galleryImgSrc3}
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
												value={hotelData.galleryImgSrc4}
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
												value={hotelData.galleryImgSrc5}
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
													!hotelData.galleryImageDesc1
														? ""
														: hotelData.galleryImageDesc1
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
													!hotelData.galleryImageDesc2
														? ""
														: hotelData.galleryImageDesc2
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
													!hotelData.galleryImageDesc3
														? ""
														: hotelData.galleryImageDesc3
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
													!hotelData.galleryImageDesc4
														? ""
														: hotelData.galleryImageDesc4
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
													!hotelData.galleryImageDesc5
														? ""
														: hotelData.galleryImageDesc5
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
							<div className="error">{errorMessage}</div>
							<Button
								text="Confirm and Save Changes"
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

export default EditHotel;

export async function getStaticPaths() {
	try {
		const res = await fetch(`${BASE_URL}/hotels/`);
		const data = await res.json();
		const paths = data.map(({ id }) => ({
			params: { id: `${id}` },
		}));

		return {
			paths,
			fallback: false,
		};
	} catch (error) {
		console.log(error);
	}
}

export async function getStaticProps(context) {
	const { params } = context;
	console.log(context);
	try {
		let res = await fetch(`${BASE_URL}/hotels/` + params.id);
		let data = await res.json();

		return {
			props: { data },
		};
	} catch (error) {
		console.error(error);
	}
}
