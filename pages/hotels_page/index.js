import React from "react";
import styled from "styled-components";
import Header from "../../components/header/Header";
import Searchbar from "../../components/searchbar/Searchbar";
import SortButton from "../../components/sortButton/SortButton";
import FilterComponent from "../../components/filterComponent/FilterComponent";

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
	border: solid 1px red;
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
		border: solid 1px blue;
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
						<p className="sort__title">Filtered by: </p>
						<hr></hr>
						<FilterComponent></FilterComponent>
					</div>
					<div className="div3">Cards Container</div>
				</ResultsContainer>
			</MainSection>
		</>
	);
}

export default hotels;
