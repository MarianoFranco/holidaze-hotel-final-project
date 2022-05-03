import React from "react";
import styled from "styled-components";
import Image from "next/image";
import { device } from "../../styles/breakpoints";
import { FeaturedCards } from "../cards/Cards";
import Link from "next/link";

const OurSelectionContainer = styled.div``;
const SectionTitle = styled.h2`
	max-width: 1440px;
	margin: auto;
	padding: var(--size-xl);
	font-size: var(--font-size-lg);
	font-weight: 600;

	@media ${device.tablet} {
		margin: var(--size-md);
		font-size: var(--font-size-md);
	}
`;
const CardContainer = styled.div`
	position: relative;
	height: 775px;
`;
const ImgContainer = styled.div`
	position: absolute;
	top: 0;
	height: 100%;
	width: 100%;
	z-index: -100;
`;
const DataContainer = styled.div`
	width: 704px;
	height: 288px;
	position: absolute;
	bottom: 0;
	margin: var(--size-xl);
	background-color: rgba(0, 0, 0, 0.75);
	border-radius: 10px;
`;
function OurSelectionSection() {
	return (
		<>
			<OurSelectionContainer>
				<SectionTitle>Our Selection</SectionTitle>
				<CardContainer>
					<Link href="/">
						<a>
							<FeaturedCards
								isaportraitcard="true"
								imgSrc="/images/our-selection.jpg"
								imgAlt="title of the pictured"
								mwidth="704px"
								titleFontSize="var(--font-size-xl)"
								cityFontSize="var(--font-size-lg)"
								bradius="10px"
								containerRadius="0"
							></FeaturedCards>
						</a>
					</Link>
				</CardContainer>
			</OurSelectionContainer>
		</>
	);
}

export default OurSelectionSection;
