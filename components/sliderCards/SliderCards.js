import React from "react";
import Link from "next/link";
import Image from "next/image";
import styled from "styled-components";
import { Icon } from "@iconify/react";
import Button from "../button/Button";
import { device } from "../../styles/breakpoints";
import StarsIcon from "../starsIcon/StarsIcon";

const CardContainer = styled.div`
	position: relative;
	height: 494px;
	width: 100%;
	max-width: 606px;
	margin: auto;
	border-radius: 20px;
	@media ${device.laptop} {
		height: 250px;
		width: 100%;
		max-width: 350px;
	}
`;
const ImgContainer = styled.div`
	z-index: -100;
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	box-shadow: 4px 4px 6px 0px rgba(0, 0, 0, 0.35);
	border-radius: 20px;

	&:after {
		content: "";
		background-color: rgba(0, 0, 0, 0.4);
		width: 100%;
		height: 100%;
		position: absolute;
		top: 0;
		left: 0;
		border-radius: 20px;
	}
`;
const ImgElement = styled(Image)`
	border-radius: 20px;
`;
const DataContainer = styled.div`
	position: absolute;
	bottom: 0px;
	width: 100%;
	padding: var(--size);
	height: 100%;
	max-height: 256px;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	@media ${device.laptop} {
		justify-content: space-evenly;
		max-height: 220px;
	}

	.card__icons-container {
		display: flex;
		align-items: center;
		color: var(--color-white);
		font-size: var(--font-size-md);
		gap: var(--size-sm);
		@media ${device.laptop} {
			font-size: var(--font-size);
		}
	}
	.card__info {
	}
	.card__title {
		font-size: var(--font-size-lg);
		font-weight: 700;
		color: var(--color-white);
		margin: 0 0 var(--size-sm);
		@media ${device.laptop} {
			font-size: var(--font-size-md);
		}
	}
	.card__title:hover {
		color: var(--color-primary);
		transform: scale(1.005) translateY(-2px);
		transition: 0.04s;
		text-decoration: underline;
	}
	.card__location {
		color: var(--color-white);
		font-size: var(--font-size-md);
		font-weight: 400;
		display: flex;
		align-items: center;
		@media ${device.laptop} {
			font-size: var(--font-size);
		}
	}
	.card__location-icon {
		font-size: 40px;
		margin-right: var(--size);
		color: var(--color-primary);
		@media ${device.laptop} {
			font-size: 24px;
		}
	}
	.card__book-price {
		display: flex;
		justify-content: space-between;
		align-items: end;
	}
	.card__btn-container {
		width: 200px;
		height: 64px;
		@media ${device.laptop} {
			width: 148px;
			height: 52px;
		}
		.btn__text {
			@media ${device.laptop} {
				font-size: var(--font-size);
				font-weight: 500;
			}
		}
	}
	.card__price-container {
		color: var(--color-primary);
		@media ${device.laptop} {
			display: none;
		}
	}
	.card__price-text {
		font-size: var(--font-size);
		font-weight: 500;
	}
	.card__price-amount {
		font-size: var(--font-size-lg);
		font-weight: 600;
	}
`;

function SliderCards({ id, title, imgSrc, imageLoader, stars, town, price }) {
	return (
		<>
			<CardContainer key={id}>
				{imgSrc && (
					<ImgContainer>
						<ImgElement
							src={imgSrc}
							alt="Card Image"
							layout="fill"
							objectFit="cover"
							loader={imageLoader}
						></ImgElement>
					</ImgContainer>
				)}
				<DataContainer>
					<div className="card__icons-container">
						<StarsIcon stars={stars}></StarsIcon>
					</div>
					<div className="card__info">
						<Link href={`/hotels_page/${id}`}>
							<a target="_blank">
								<h3 className="card__title">{title}</h3>
							</a>
						</Link>

						<div className="card__location">
							<Icon
								icon="carbon:location-filled"
								className="card__location-icon"
							/>
							<span className="card__city-name">{town}</span>
						</div>
					</div>
					<div className="card__book-price">
						<div className="card__btn-container">
							<Link href={`/checkout/${id}`}>
								<a>
									<Button
										text="Book Now"
										btnCategory="primary"
										color="yellow"
										typeOfButton="link"
									></Button>
								</a>
							</Link>
						</div>
						<div className="card__price-container">
							<p className="card__price-text">from</p>
							<p className="card__price-amount">{price} Nok</p>
						</div>
					</div>
				</DataContainer>
			</CardContainer>
		</>
	);
}

export default SliderCards;
