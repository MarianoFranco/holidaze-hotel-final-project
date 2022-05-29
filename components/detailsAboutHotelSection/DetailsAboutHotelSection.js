import React from "react";
import styled from "styled-components";
import Image from "next/image";
import { device } from "../../styles/breakpoints";

const AboutHotelSectionContainer = styled.div`
	max-width: 1440px;
	margin: auto;
	padding: var(--size-lg) var(--size-md);
	position: relative;
	display: flex;
	align-items: center;
	@media ${device.tablet} {
		flex-direction: column;
	}
`;
const ImageContainer = styled.div`
	width: 100%;
	max-width: 865px;
	height: 738px;
	position: relative;
	border-radius: 20px;
	box-shadow: 2px 2px 6px 0 rgba(0, 0, 0, 0.4);
	z-index: -90;
	@media ${device.tablet} {
		height: 303px;
		max-width: 400px;
		display: flex;
		align-items: center;
	}
	.about__title {
		padding: var(--size-md);
		font-size: var(--font-size-lg);
		width: 100%;
		max-width: 280px;
		font-weight: 600;
		color: var(--color-white);
		background-color: rgba(0, 0, 0, 0.9);
		border-radius: 10px;
		@media ${device.tablet} {
			font-size: var(--font-size-lg);
			max-width: 100%;
			text-align: center;
		}
	}
`;
const HotelImage = styled(Image)`
	border-radius: 20px;
	position: absolute;
	z-index: -100;
`;

const DescriptionContainer = styled.div`
	width: 100%;
	max-width: 689px;
	min-height: 434px;
	border: solid 1px red;
	position: absolute;
	margin: var(--size-md);
	right: 0;
	padding: var(--size-lg) var(--size-md);
	border: solid 1px rgba(0, 0, 0, 0.35);
	border-radius: 10px;
	background-color: var(--color-primary);
	color: var(--color-black);
	font-size: var(--font-size);
	font-family: var(--font-body);
	line-height: 2rem;
	@media ${device.tablet} {
		position: relative;
	}
`;
function DetailsAboutHotelSection({ data }) {
	const loader = ({ src, width = 100, quality = 100 }) => {
		return `${src}?w=${width}&q=${quality || 75}`;
	};
	return (
		<AboutHotelSectionContainer>
			<ImageContainer>
				<h2 className="about__title">About the Hotel</h2>
				<HotelImage
					src={data.cardImage}
					layout="fill"
					objectFit="cover"
					loader={loader}
				/>
			</ImageContainer>
			<DescriptionContainer>{data.hotel_long_desc}</DescriptionContainer>
		</AboutHotelSectionContainer>
	);
}

export default DetailsAboutHotelSection;
