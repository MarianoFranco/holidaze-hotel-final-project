import React, { useState } from "react";
import styled from "styled-components";
import Header from "../../components/header/Header";
import Searchbar from "../../components/searchbar/Searchbar";
import SortButton from "../../components/sortButton/SortButton";
import FilterComponent from "../../components/filterComponent/FilterComponent";
import HotelDetailsCards from "../../components/hotelDetailsCards/HotelDetailsCards";
import Footer from "../../components/footer/Footer";
import Link from "next/link";
import { device } from "../../styles/breakpoints";
import Button from "../../components/button/Button";
import { filteringAnArray } from "../../utils/filteringAnArray/filterinAnArray";

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
	justify-content: center;

	@media ${device.laptop} {
		align-items: flex-start;
	}
	@media ${device.tablet} {
		justify-content: center;
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
			font-size: var(--font-size);
			text-align: center;
			width: 120px;

			padding: 12px 0;
		}
	}
	.sort__buttons-container {
		display: flex;
		gap: 16px;
		flex-wrap: wrap;
	}

	@media ${device.laptop} {
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
	console.log("context", context.params);
	try {
		let res = await fetch("http://localhost:1337/hotels/");
		let data = await res.json();

		console.log(data);
		return {
			props: { data },
		};
	} catch (error) {
		console.error(error);
	}
}

function Hotels({ data, jwt }) {
	const [opened, toggleOpened] = useState(false);

	const showFiltered = () => {
		opened ? toggleOpened(false) : toggleOpened(true);
	};

	const [starsSelected, setStarsSelected] = useState(null);
	const [priceRange, setPriceRange] = useState([0, 10000]);
	const [wifiSelected, setWifiSelected] = useState(false);
	const [spaSelected, setSpaSelected] = useState(false);
	const [petSelected, setPetSelected] = useState(false);

	const starsDataFiltered = data.filter((hotel) => {
		return starsSelected === null || hotel.stars === starsSelected;
	});
	const dataFilteredByRangePrice = starsDataFiltered.filter((hotel) => {
		return hotel.price >= priceRange[0] && hotel.price <= priceRange[1];
	});

	// TODO mañana
	//definir variable wifi
	//y cada una de las amenities para hacer funcionar el filtered
	let dataFilteredByAmenities = dataFilteredByRangePrice.filter((hotel) => {
		return (
			(!wifiSelected || hotel.amenities.wifi === wifiSelected) &&
			(!spaSelected || hotel.amenities.spa === spaSelected) &&
			(!petSelected || hotel.amenities.pets === petSelected)
		);
	});

	// TODO
	// change equal for includes(...)
	dataFilteredByAmenities = dataFilteredByAmenities.filter((hotel) =>
		hotel.Title.toLowerCase().includes(hotelName)
	);

	// console.log(document.location.href);

	console.log(
		data,
		wifiSelected,
		spaSelected,
		dataFilteredByRangePrice,
		dataFilteredByAmenities
	);

	return (
		<>
			<Header jwt={jwt}></Header>
			<MainSection>
				<SearchSection>
					<Searchbar />
				</SearchSection>
				<Title>Hotels Results</Title>
				<ResultsContainer>
					<div className="div1">
						<SortComponent>
							<p className="sort__title">Order by: </p>
							<div className="sort__buttons-container">
								<SortButton text="Stars" />
								<SortButton text="Price" />
								<SortButton text="Alphabetically" />
							</div>
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
									onSpaSelected={setSpaSelected}
									onPetSelected={setPetSelected}
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
											console.log("funcion", val);
											setStarsSelected(val);
										}}
										onPriceRangeSelected={setPriceRange}
										onWifiSelected={setWifiSelected}
										onSpaSelected={setSpaSelected}
										onPetSelected={setPetSelected}
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
