import React from "react";
import styled from "styled-components";
import Header from "../../components/header/Header";
import Searchbar from "../../components/searchbar/Searchbar";
import SortButton from "../../components/sortButton/SortButton";
import FilterComponent from "../../components/filterComponent/FilterComponent";
import HotelDetailsCards from "../../components/hotelDetailsCards/HotelDetailsCards";

const MainSection = styled.main`
	max-width: 1440px;
	margin: auto;
`;

const SearchSection = styled.div`
	border: solid 1px blue;
	display: flex;
	justify-content: center;
	margin: var(--size-xl);
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
	.sort__title {
		font-size: var(--font-size-md);
		margin-right: 16px;
	}
	.sort__buttons-container {
		display: flex;
		gap: 16px;
	}
`;
const FilteredContainer = styled.div`
	border: solid 1px rgba(88, 132, 163, 0.4);
	border-radius: 10px;
	padding: var(--size);
	.filtered__title {
		font-size: var(--font-size-md);
		font-weight: 500;
	}
	.filtered__line {
		width: 100%;
		height: 1px;
		margin: var(--size) auto;
		background-color: rgba(88, 132, 163, 0.4);
	}
`;
const CardsContainer = styled.div`
	display: flex;
	flex-direction: column;
	gap: 16px;
`;
function hotels() {
	return (
		<>
			<Header></Header>
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
							<p className="filtered__title">Filtered by: </p>
							<div className="filtered__line"></div>
							<FilterComponent></FilterComponent>
						</FilteredContainer>
					</div>
					<div className="div3">
						<CardsContainer>
							<HotelDetailsCards className="card__container"></HotelDetailsCards>
							<HotelDetailsCards className="card__container"></HotelDetailsCards>
							<HotelDetailsCards className="card__container"></HotelDetailsCards>
						</CardsContainer>
					</div>
				</ResultsContainer>
			</MainSection>
		</>
	);
}

export default hotels;
