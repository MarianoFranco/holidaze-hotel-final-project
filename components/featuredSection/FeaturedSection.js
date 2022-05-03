import React from "react";
import styled from "styled-components";
import { FeaturedCards } from "../cards/Cards";
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
function FeaturedSection() {
	return (
		<>
			<FeaturedContainer>
				<SectionTitle>Most popular hotels</SectionTitle>
				<CardsContainer>
					<div className="div1">
						<Link href="/" passHref>
							<a>
								<FeaturedCards
									imgSrc="/images/card-img.jpg"
									imgAlt="title of the photo"
								/>
							</a>
						</Link>
					</div>
					<div className="div2">
						<Link href="/" passHref>
							<a>
								<FeaturedCards
									imgSrc="/images/card-img.jpg"
									imgAlt="title of the photo"
								/>
							</a>
						</Link>
					</div>
					<div className="div3">
						<Link href="/" passHref>
							<a>
								<FeaturedCards
									imgSrc="/images/card-img.jpg"
									imgAlt="title of the photo"
								/>
							</a>
						</Link>
					</div>
					<div className="div4">
						<Link href="/" passHref>
							<a>
								<FeaturedCards
									imgSrc="/images/card-img.jpg"
									imgAlt="title of the photo"
								/>
							</a>
						</Link>
					</div>
					<div className="div5">
						<Link href="/" passHref>
							<a>
								<FeaturedCards
									imgSrc="/images/card-img.jpg"
									imgAlt="title of the photo"
								/>
							</a>
						</Link>
					</div>
				</CardsContainer>
			</FeaturedContainer>
		</>
	);
}

export default FeaturedSection;
