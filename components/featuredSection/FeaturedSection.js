import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { FeaturedCards } from "../fetaureCard/FeaturedCard";
import { device } from "../../styles/breakpoints";
import Link from "next/link";

const FeaturedContainer = styled.div`
	max-width: 1440px;
	margin: auto;
	padding: 0 var(--size-xl);
	@media ${device.tablet} {
		padding: 0 var(--size-md);
	}
`;
const SectionTitle = styled.h2`
	margin: var(--size-xl) 0;
	font-size: var(--font-size-lg);
	font-weight: 600;

	@media ${device.tablet} {
		margin: var(--size-md) 0;
		font-size: var(--font-size-md);
	}
`;
const CardsContainer = styled.div`
	max-width: 1297px;
	height: 628px;
	margin: auto;
	display: grid;
	grid-column-gap: var(--size);
	grid-row-gap: var(--size);
	grid-template-columns: 35% auto auto;
	grid-template-areas:
		"card1 card2 card3"
		"card1 card4 card5";
	@media ${device.laptop} {
		height: 1316px;
		grid-template-columns: auto;
		grid-template-areas:
			"card1 card1"
			"card2 card3"
			"card4 card5";
	}
	@media ${device.tablet} {
		height: 1316px;
		grid-template-columns: auto;
		grid-template-areas:
			"card1"
			"card2"
			"card3"
			"card4"
			"card5";
	}
	.div1 {
		grid-area: card1;
	}
	.div2 {
		grid-area: card2;
	}
	.div3 {
		grid-area: card3;
	}
	.div4 {
		grid-area: card4;
	}
	.div5 {
		grid-area: card5;
	}
`;

function FeaturedSection({ hotel_data }) {
	let count = 0;

	const filteredHotel = hotel_data.filter(function (hotel) {
		return hotel.featured === true;
	});

	return (
		<>
			<FeaturedContainer>
				<SectionTitle>Most popular hotels</SectionTitle>
				<CardsContainer>
					{filteredHotel.slice(0, 5).map((hotel) => {
						count++;
						const secondaryLoader = ({
							width = 100,
							quality = 100,
						}) => {
							return `${hotel.cardImage}?w=${width}&q=${
								quality || 75
							}`;
						};
						return (
							<div key={hotel.id} className={`div${count}`}>
								<Link
									href={`/hotels_page/${hotel.id}`}
									passHref
								>
									<a>
										<FeaturedCards
											imgSrc={hotel.cardImage}
											imgAlt={hotel.alt_portrait_image}
											imageLoader={secondaryLoader}
											title={hotel.Title}
											town={hotel.Town}
											small_desc={hotel.small_desc}
										/>
									</a>
								</Link>
							</div>
						);
					})}
				</CardsContainer>
			</FeaturedContainer>
		</>
	);
}

export default FeaturedSection;
