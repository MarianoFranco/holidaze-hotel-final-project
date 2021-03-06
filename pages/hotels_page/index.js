import React, { useState } from "react";
import styled from "styled-components";
import Header from "../../components/header/Header";
import Searchbar from "../../components/searchbar/Searchbar";
import FilterComponent from "../../components/filterComponent/FilterComponent";
import HotelDetailsCards from "../../components/hotelDetailsCards/HotelDetailsCards";
import Footer from "../../components/footer/Footer";
import { device } from "../../styles/breakpoints";
import Button from "../../components/button/Button";
import { parseCookies } from "nookies";
import { SegmentedControl } from "@mantine/core";
import { BASE_URL } from "../../utils/config/config";

const MainSection = styled.main`
	max-width: 1440px;
	margin: auto;
`;

const SearchSection = styled.div`
	display: flex;
	justify-content: center;
	margin: var(--size-xl);
	@media ${device.laptopL} {
		margin: var(--size-xl) var(--size-sm);
	}
`;
const Title = styled.h1`
	padding: var(--size-md);
`;
const ResultsContainer = styled.div`
	padding: var(--size-md);
	display: grid;

	grid-column-gap: var(--size);
	grid-row-gap: var(--size);
	grid-template-columns: 20% auto auto;
	grid-template-areas:
		"card4 card1 card1"
		"card2 card3 card3";

	@media ${device.laptop} {
		grid-template-columns: 30% auto auto;
	}
	@media ${device.tablet} {
		padding: var(--size);
		grid-template-columns: auto;
		grid-template-areas:
			"card2 card2 card2"
			"card1 card1 card1"
			"card3 card3 card3";
	}

	.div1 {
		grid-area: card1;
	}
	.div2 {
		grid-area: card2;
	}
	.div3 {
		grid-area: card3;
		border-top: solid 1px rgba(46, 101, 140, 0.4);
		padding-top: var(--size-md);
	}
`;

const SortComponent = styled.div`
	display: flex;
	align-items: center;

	@media ${device.laptop} {
		align-items: flex-start;
	}
	@media ${device.tablet} {
		justify-content: center;
		flex-direction: column;
	}
	.sort__title {
		font-size: var(--font-size-md);
		margin-right: 16px;
		font-weight: 500;
		@media ${device.laptop} {
			width: 40%;
			padding: 16px 0;
		}
		@media ${device.tablet} {
			text-align: center;
			padding: 12px 0;
		}
	}

	@media ${device.laptop} {
	}
`;
const SortButtonsContainer = styled(SegmentedControl)`
	display: flex;
	gap: 16px;
	flex-wrap: wrap;
	background-color: transparent;

	.mantine-SegmentedControl-active {
		background-color: var(--color-tertiary);
		padding: var(--size);
		height: 50px;
		padding: 8px 12px;
	}

	.mantine-SegmentedControl-label {
		font-size: var(--font-size-md);
		color: var(--color-secondary);
	}
	.mantine-SegmentedControl-labelActive {
		color: var(--color-white);
	}
`;
const FilteredContainer = styled.div`
	border: solid 1px rgba(88, 132, 163, 0.4);
	border-radius: 10px;
	padding: var(--size);

	.filtered__title {
		font-size: var(--font-size-md);
		font-weight: 500;
		@media ${device.tablet} {
			font-size: var(--font-size);
		}
	}
	.filtered__line {
		width: 100%;
		height: 1px;
		margin: var(--size) auto;
		background-color: rgba(88, 132, 163, 0.4);
	}
	.filtered__btn-container {
		height: 50px;
	}
	.btn-test {
		border: solid 1px red;
		cursor: pointer;
	}
	.filtered-box-container {
		display: block;
		@media ${device.tablet} {
			display: none;
		}
	}
	.filtered-box-container-2 {
		display: none;
		@media ${device.tablet} {
			display: block;
		}
	}
`;

const CardsContainer = styled.div`
	display: flex;
	flex-direction: column;
	gap: 16px;
`;
export async function getStaticProps(context) {
	console.log("context", context);
	try {
		let res = await fetch(`${BASE_URL}/hotels/`);
		let data = await res.json();

		return {
			props: { data },
		};
	} catch (error) {
		console.error(error);
	}
}

function Hotels({ data, jwt }) {
	const jwt2 = parseCookies().jwt;
	const [opened, toggleOpened] = useState(false);

	const showFiltered = () => {
		opened ? toggleOpened(false) : toggleOpened(true);
	};

	const [starsSelected, setStarsSelected] = useState(null);
	const [priceRange, setPriceRange] = useState([0, 10000]);
	const [wifiSelected, setWifiSelected] = useState(false);
	const [breakfastSelected, setBreakfastSelected] = useState(false);
	const [petSelected, setPetSelected] = useState(false);
	const [parkingSelected, setParkingSelected] = useState(false);
	const [spaSelected, setSpaSelected] = useState(false);
	const [gymSelected, setGymSelected] = useState(false);

	const starsDataFiltered = data.filter((hotel) => {
		return starsSelected === null || hotel.stars === starsSelected;
	});
	const dataFilteredByRangePrice = starsDataFiltered.filter((hotel) => {
		return hotel.price >= priceRange[0] && hotel.price <= priceRange[1];
	});

	let dataFilteredByAmenities = dataFilteredByRangePrice.filter((hotel) => {
		return (
			(!wifiSelected || hotel.amenities.wifi === wifiSelected) &&
			(!breakfastSelected ||
				hotel.amenities.breakfast === breakfastSelected) &&
			(!petSelected || hotel.amenities.pets === petSelected) &&
			(!parkingSelected || hotel.amenities.parking === parkingSelected) &&
			(!spaSelected || hotel.amenities.spa === spaSelected) &&
			(!gymSelected || hotel.amenities.gym === gymSelected)
		);
	});
	const [hotelNameValue, setHotelNameValue] = useState("");

	dataFilteredByAmenities = dataFilteredByAmenities.filter((hotel) =>
		hotel.Title.toLowerCase().includes(hotelNameValue.toLowerCase())
	);

	const [sortValue, setSortValue] = useState("");

	const sortBy = sortValue;

	dataFilteredByAmenities = dataFilteredByAmenities.sort((a, b) => {
		if (sortBy === "price") {
			return a.price - b.price;
		}
		if (sortBy === "stars") {
			return a.stars - b.stars;
		}
		if (sortBy === "title") {
			return a.Title.toLowerCase() > b.Title.toLowerCase() ? 1 : -1;
		}
	});

	const [onGetDateValues, setOnGetDateValues] = useState("");
	const [onGetGuestValues, setOnGetGuestValues] = useState(1);

	return (
		<>
			<Header user={jwt2}></Header>
			<MainSection>
				<SearchSection>
					<Searchbar
						onSubmitValue={setHotelNameValue}
						getDateValue={setOnGetDateValues}
						getGuestValue={setOnGetGuestValues}
					/>
				</SearchSection>
				<Title>Hotels Results</Title>
				<ResultsContainer>
					<div className="div1">
						<SortComponent>
							<p className="sort__title">Order by: </p>
							<SortButtonsContainer
								value={sortValue}
								onChange={setSortValue}
								data={[
									{ label: "Stars", value: "stars" },
									{ label: "Price", value: "price" },
									{
										label: "Alphabetically",
										value: "title",
									},
								]}
							/>
						</SortComponent>
					</div>
					<div className="div2">
						<FilteredContainer>
							<div className="filtered-box-container">
								<p className="filtered__title">Filtered by: </p>
								<div className="filtered__line"></div>
								<FilterComponent
									data={data}
									onStarsSelected={(val) => {
										setStarsSelected(val);
									}}
									onPriceRangeSelected={setPriceRange}
									onWifiSelected={setWifiSelected}
									onBreakfastSelected={setBreakfastSelected}
									onPetSelected={setPetSelected}
									onParkingSelected={setParkingSelected}
									onSpaSelected={setSpaSelected}
									onGymSelected={setGymSelected}
								></FilterComponent>
							</div>
							<div className="filtered-box-container-2">
								<div className="filtered__btn-container">
									<Button
										icon="mi:filter"
										text="Filtered by: "
										color="blue"
										typeOfButton="button"
										onClick={showFiltered}
									/>
								</div>
								<div className="filtered__line"></div>
								{opened && (
									<FilterComponent
										data={data}
										onStarsSelected={(val) => {
											setStarsSelected(val);
										}}
										onPriceRangeSelected={setPriceRange}
										onWifiSelected={setWifiSelected}
										onBreakfastSelected={
											setBreakfastSelected
										}
										onPetSelected={setPetSelected}
										onParkingSelected={setParkingSelected}
										onSpaSelected={setSpaSelected}
										onGymSelected={setGymSelected}
									/>
								)}
							</div>
						</FilteredContainer>
					</div>
					<div className="div3">
						<CardsContainer>
							{dataFilteredByAmenities.map((hotel) => {
								return (
									<HotelDetailsCards
										key={hotel.id}
										className="card__container"
										title={hotel.Title}
										address={hotel.Address}
										amenities={hotel.amenities}
										price={hotel.price}
										stars={hotel.stars}
										sliderImg={hotel.SliderImages}
										id={hotel.id}
										altImg={hotel.img_alt}
										dateValue={onGetDateValues}
										guestValue={onGetGuestValues}
									></HotelDetailsCards>
								);
							})}
						</CardsContainer>
					</div>
				</ResultsContainer>
			</MainSection>
			<Footer></Footer>
		</>
	);
}

export default Hotels;
