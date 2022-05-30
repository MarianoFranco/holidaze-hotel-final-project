import React from "react";
import styled from "styled-components";
import Carousel from "../carousel/Carousel";
import { device } from "../../styles/breakpoints";

const SectionContainer = styled.div`
	max-width: 1440px;
	margin: auto;
	padding: 0 var(--size-xl);
	@media ${device.tablet} {
		padding: 0 var(--size-md);
	}
`;
const SectionTitle = styled.h2`
	margin: var(--size-xl) 0 var(--font-size-lg);
	font-size: var(--font-size-lg);
	font-weight: 600;
	@media ${device.tablet} {
		margin: var(--size-md) 0 var(--font-size-md);
		font-size: var(--font-size-md);
	}
`;
const SectionSubtitle = styled.p`
	font-size: var(--font-size-md);
	margin: 0 0 var(--size-xl);
	font-weight: 400;
	@media ${device.tablet} {
		font-size: var(--font-size);
		margin: 0 0 var(--size-md);
	}
`;
const CardsContainer = styled.div`
	position: relative;
	display: flex;
	flex-direction: column;
	justify-content: center;
	@media ${device.tablet} {
		height: 305px;
	}
	.arrow__prev {
		position: absolute;
		top: 48%;
		left: -20px;
		font-size: 50px;
		z-index: 50;
		color: var(--color-secondary);
		cursor: pointer;
		@media ${device.tablet} {
			top: 45%;
			left: -25px;
		}
	}
	.arrow__next {
		position: absolute;
		top: 48%;
		font-size: 50px;
		z-index: 50;
		right: -20px;
		color: var(--color-secondary);
		cursor: pointer;
		@media ${device.tablet} {
			top: 45%;
			right: -25px;
		}
	}
`;

const LineDivider = styled.div`
	width: 95%;
	height: 1px;
	background-color: black;
	margin: var(--size-xl) auto;
	@media ${device.tablet} {
		margin: var(--size-lg) auto;
	}
`;
function MostSoldSection({ hotel_data }) {
	return (
		<>
			<SectionContainer>
				<SectionTitle>The most sold</SectionTitle>
				<SectionSubtitle>
					These are the best-selling hotels... Pack your bags and book
					now!
				</SectionSubtitle>
				<CardsContainer>
					<Carousel hotel_data={hotel_data}></Carousel>
				</CardsContainer>
				<LineDivider></LineDivider>
			</SectionContainer>
		</>
	);
}

export default MostSoldSection;
