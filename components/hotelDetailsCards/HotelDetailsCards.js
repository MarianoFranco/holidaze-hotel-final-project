import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import styled from "styled-components";
import Image from "next/image";
import { Icon } from "@iconify/react";
import Button from "../button/Button";
import Link from "next/link";
import StarsIcon from "../starsIcon/StarsIcon";
import ImageGallery from "../imageGallery/ImageGallery";
import { device } from "../../styles/breakpoints";
import { useRouter } from "next/router";
import dayjs from "dayjs";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

const CardContainer = styled.div`
	height: 256px;
	background-color: #eeeeee;
	border-radius: 10px;
	border: solid 1px var(--color-tertiary);
	display: flex;
	position: relative;
	@media ${device.laptop} {
		height: 100%;
		flex-direction: column;
		gap: var(--size-md);
		align-items: center;
	}
`;

const GalleryContainer = styled.div`
	width: 230px;
	height: 170px;
	margin: var(--size-md);
`;

const DataContainer = styled.div`
	width: 100%;
	padding: var(--size-md);
	display: flex;
	flex-direction: column;
	justify-content: space-evenly;
	@media ${device.laptop} {
		gap: 16px;
	}
	.data__title-container {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.data__title {
		font-size: var(--font-size-md);
		font-weight: 600;
	}
	.data__title:hover {
		color: var(--color-secondary);
		transform: scale(1.03) translateY(-1px);
		transition: all 0.05s ease-in;
	}
	.data__icons-container {
		display: flex;
		gap: 4px;
		color: var(--color-secondary);
		font-size: 24px;
	}
	.data__address-container {
		display: flex;
		flex-direction: column;
		gap: var(--size-sm);
	}

	.data__location-container {
		display: flex;
		align-items: center;
	}
	.data__location {
		font-size: var(--font-size-sm);
		font-weight: 500;
		color: var(--color-secondary);
	}
	.data__location-icon {
		font-size: var(--font-size);
		margin-right: 16px;
		color: var(--color-secondary);
	}
	.data__amenities {
		display: flex;
		align-items: center;
		gap: 16px;
		font-size: var(--size-md);
		color: var(--color-secondary);
	}
	.data__cancelation {
		font-family: var(--font-body);
		font-size: var(--font-size);
	}
`;
const Line = styled.div`
	width: 1px;
	background-color: var(--color-black);
	height: 90%;
	margin: auto var(--size-md);
	opacity: 0.2;

	@media ${device.laptop} {
		width: 80%;
		background-color: var(--color-black);
		height: 1px;
		margin: var(--size-md);
		opacity: 0.2;
	}
`;

const TotalContainer = styled.div`
	width: 100%;

	display: flex;
	flex-direction: column;
	justify-content: space-evenly;
	align-items: center;
	padding: var(--size);

	.total__icon-container {
		align-self: flex-end;
		font-size: 32px;
		color: var(--color-secondary);
		@media ${device.laptop} {
			position: absolute;
			top: 16px;
		}
	}
	.total__price-container {
		align-self: flex-end;
		display: flex;
		flex-direction: column;
		align-items: flex-end;
		gap: 8px;
		margin: 0 10%;
		@media ${device.laptop} {
			align-self: center;
			align-items: center;
			right: 0px;
		}
	}
	.total__total-price {
	}
	.total__price {
		font-size: var(--font-size-md);
		font-weight: 600;
	}
	.total__btn-container {
		max-width: 208px;
		width: 100%;
		min-height: 64px;
		align-self: flex-end;
		margin: var(--size) 10% 0;

		@media ${device.laptop} {
			max-width: 100%;

			margin: var(--size-md) 0px;
		}
	}
	.btn__text {
		text-align: center;
		@media ${device.laptopL} {
			padding: var(--size);
		}
	}
`;

function HotelDetailsCards({
	id,
	title,
	address,
	amenities,
	price,
	stars,
	sliderImg,
	altImg,
	dateValue,
	guestValue,
}) {
	const router = useRouter();

	function handleClick() {
		let newRange;
		{
			dateValue
				? (newRange = dateValue.map((date) => {
						return dayjs(date).format("MM-DD-YYYY");
				  }))
				: (newRange = "");
		}

		router.push(
			`/checkout/${id}?hotel=${title}&dateValue=${newRange}&guestValue=${guestValue}`
		);
	}

	return (
		<>
			<CardContainer>
				<GalleryContainer>
					<ImageGallery
						sliderImg={sliderImg}
						altImg={altImg}
					></ImageGallery>
				</GalleryContainer>
				<DataContainer>
					<div className="data__title-container">
						<h3 className="data__title">
							<Link href={`/hotels_page/${id}`} passHref>
								<a>{title}</a>
							</Link>
						</h3>
						<div className="data__icons-container">
							<StarsIcon stars={stars} />
						</div>
					</div>
					<div className="data__address-container">
						<p>{address}</p>
						<div className="data__location-container">
							<Icon
								icon="carbon:location-filled"
								className="data__location-icon"
							/>
							<span className="data__location">Map view</span>
						</div>
					</div>

					<div className="data__amenities">
						{amenities.breakfast && (
							<Icon icon="fluent:food-24-filled" />
						)}
						{amenities.wifi && <Icon icon="bx:wifi-2" />}
						{amenities.pets && <Icon icon="ic:outline-pets" />}
						{amenities.spa && <Icon icon="bx:spa" />}
						{amenities.parking && (
							<Icon icon="ant-design:car-filled" />
						)}
						{amenities.gym && <Icon icon="gg:gym" />}
					</div>
					<p className="data__cancelation">
						Free cancelation. No prepayment needed
					</p>
				</DataContainer>
				<Line></Line>
				<TotalContainer>
					<div className="total__price-container">
						<span className="total__text">from</span>
						<div className="total__total-price">
							<span className="total__price">{price}</span>
							<span> Nok</span>
						</div>
						<span>per night</span>
					</div>
					<div className="total__btn-container">
						<Button
							className="total__btn"
							text="BOOK NOW"
							btnCategory="primary"
							typeOfButton="button"
							color="blue"
							onClick={handleClick}
						></Button>
					</div>
				</TotalContainer>
			</CardContainer>
		</>
	);
}

export default HotelDetailsCards;
