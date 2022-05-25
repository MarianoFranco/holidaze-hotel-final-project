import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Image from "next/image";
import { device } from "../../styles/breakpoints";

const FeaturedCardsContainer = styled.div`
	position: relative;
	height: 100%;
	max-height: ${(props) => (props.isaportraitcard ? "775px" : "628px")};
`;
const FeaturedImgContaner = styled.div`
	position: absolute;
	width: 100%;
	height: 100%;
	z-index: -100;
`;
const FeaturedImage = styled(Image)`
	border-radius: ${(props) =>
		props.isaportraitcard === "true" ? "0px" : "10px"};
	@media ${device.mobile} {
		border-radius: 10px;
	}
`;
const FeaturedDataContainer = styled.div`
	height: ${(props) => (props.isaportraitcard ? "288px" : "130px")};
	width: 100%;
	max-width: ${(props) => (props.isaportraitcard ? "704px" : "100%")};
	background-color: rgba(0, 0, 0, 0.75);
	position: absolute;
	bottom: 0;
	border-radius: ${(props) =>
		props.isaportraitcard ? "10px" : "0 0 10px 10px"};
	padding: var(--size) var(--size-md);
	display: flex;
	flex-direction: column;
	justify-content: space-around;
	margin: ${(props) => (props.isaportraitcard ? "var(--size-xl)" : "0")};
	@media ${device.tablet} {
		margin: 0;
		height: ${(props) => (props.isaportraitcard ? "100%" : "130px")};
		justify-content: ${(props) =>
			props.isaportraitcard ? "center" : "space-around"};
		text-align: ${(props) => (props.isaportraitcard ? "center" : "left")};
	}
	.featured__title {
		font-size: ${(props) =>
			props.isaportraitcard
				? "var(--font-size-xl)"
				: "var(--font-size-md)"};
		font-weight: 600;
		@media ${device.tablet} {
			font-size: ${(props) =>
				props.isaportraitcard
					? "var(--font-size-lg)"
					: "var(--font-size-md)"};
			margin: ${(props) => (props.isaportraitcard ? "32px" : "0")};
		}
	}
	.featured__location {
		font-size: ${(props) =>
			props.isaportraitcard ? "var(--font-size-lg)" : "var(--font-size)"};
		font-weight: 600;

		@media ${device.tablet} {
			display: none;
		}
		@media ${device.mobile} {
			display: ${(props) => (props.isaportraitcard ? "block" : "none")};
			font-size: ${(props) =>
				props.isaportraitcard
					? "var(--font-size-md)"
					: "var(--font-size)"};
			margin: ${(props) =>
				props.isaportraitcard ? "var(--size-sm) 0" : "0"};
		}
	}
	.featured__comment {
		font-size: ${(props) =>
			props.isaportraitcard ? "var(--font-size-md)" : "var(--font-size)"};
		font-weight: ${(props) => (props.isaportraitcard ? "600" : "400")};

		@media ${device.mobile} {
			font-size: ${(props) =>
				props.isaportraitcard
					? "var(--font-size)"
					: "var(--font-size)"};
			margin: ${(props) =>
				props.isaportraitcard ? "var(--size-sm) 0" : "0"};
		}
	}
	.featured__title,
	.featured__location,
	.featured__comment {
		color: var(--color-primary);
	}
`;
export function FeaturedCards({
	imgSrc,
	imgAlt,
	isaportraitcard,
	imageLoader,
	title,
	town,
	small_desc,
}) {
	return (
		<>
			<FeaturedCardsContainer isaportraitcard={isaportraitcard}>
				<FeaturedImgContaner>
					{imgSrc && (
						<FeaturedImage
							src={imgSrc}
							layout="fill"
							objectFit="cover"
							alt={imgAlt}
							isaportraitcard={isaportraitcard}
							loader={imageLoader}
						/>
					)}
				</FeaturedImgContaner>
				<FeaturedDataContainer isaportraitcard={isaportraitcard}>
					<h3 className="featured__title">{title}</h3>
					<h4 className="featured__location">{town}</h4>
					<p className="featured__comment">{small_desc}</p>
				</FeaturedDataContainer>
			</FeaturedCardsContainer>
		</>
	);
}
