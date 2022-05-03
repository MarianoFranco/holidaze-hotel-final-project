import React from "react";
import Image from "next/image";
import styled from "styled-components";
import Searchbar from "../searchbar/Searchbar";
import { device } from "../../styles/breakpoints";

const Wrapper = styled.div`
	position: relative;
	height: 90vh;
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	.img__container {
		position: absolute;
		height: 90vh;
		width: 100%;
		top: 0;
		left: 0;
		z-index: -100;
	}
`;

const TitleContainer = styled.div`
	text-align: center;
	margin-bottom: var(--size-xl);

	.hero__title {
		margin-bottom: var(--size);
		font-size: var(--font-size-xxl);
		font-weight: 700;
		font-family: var(--font-headings);
		color: var(--color-primary);
		@media ${device.laptop} {			
			font-size: var(--font-size-xl);
		}
		@media ${device.tablet} {			
			font-size: var(--font-size-lg);
		}
	}
	.hero__subtitle {
		font-size: var(--font-size-md);
		font-weight: 600;
		font-family: var(--font-headings);
		color: var(--color-white);

		@media ${device.tablet} {			
			
		}
	}
`;

function Hero() {
	return (
		<Wrapper>
			<div className="img__container">
				<Image
					src="/images/portrait.jpg"
					layout="fill"
					objectFit="cover"
					alt="Holidaze portrait"
					className="hero__image"
				></Image>
			</div>
			<TitleContainer>
				<h1 className="hero__title">Explore Norway</h1>
				<p className="hero__subtitle">
					Discover the beauty of Bergen with Holidaze
				</p>
			</TitleContainer>
			<Searchbar />
		</Wrapper>
	);
}

export default Hero;
