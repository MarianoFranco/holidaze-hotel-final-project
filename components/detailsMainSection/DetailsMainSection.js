import React, { useState, useRef } from "react";
import styled from "styled-components";
import { Icon } from "@iconify/react";
import ImageGallery from "../imageGallery/ImageGallery";
import Image from "next/image";
import StarsIcon from "../../components/starsIcon/StarsIcon";
import Button from "../../components/button/Button";
import Link from "next/link";
import { InputDate, InputOption } from "../inputs/Inputs";

import { device } from "../../styles/breakpoints";

const DetailsSectionContainer = styled.div`
	max-width: 1440px;
	margin: auto;
`;
const TextContainer = styled.div`
	padding: var(--size-xl) var(--size-md) var(--size-md);
	@media ${device.tablet} {
		padding: var(--size-lg) var(--size) var(--size);
	}
`;
const TitleContainer = styled.div`
	display: flex;
	align-items: flex-end;
	flex-wrap: wrap;
	gap: var(--size-md);
	@media ${device.tablet} {
		gap: var(--size);
	}
	.hotel__title {
		font-size: var(--font-size-xl);
		font-weight: 600;
		@media ${device.tablet} {
			font-size: var(--font-size-lg);
		}
	}
	.hotel__icons-container {
		display: flex;
		gap: var(--size-sm);
		font-size: 39px;
		color: var(--color-secondary);
		padding: 12px 0;
		@media ${device.tablet} {
			font-size: 23px;
		}
	}
`;
const AddressContainer = styled.div`
	display: flex;
	align-items: center;
	gap: var(--size);
	@media ${device.tablet} {
		margin: 16px 0 0;
	}
	.address__icon {
		font-size: 32px;
		color: var(--color-secondary);
	}
	.address__text {
		font-size: var(--font-size);
		font-weight: 600;
		color: var(--color-secondary);
	}
`;

const MainContainer = styled.div`
	padding: var(--size-md) var(--size-md);

	display: flex;
	gap: var(--size);

	@media ${device.laptop} {
		flex-wrap: wrap;
		justify-content: center;
	}
	@media ${device.tablet} {
		padding: var(--size) var(--size);
	}
`;

const GalleryContainer = styled.div`
	max-width: 800px;
	min-height: 664px;
	max-height: 664px;
	padding: 0px;
	width: 55%;
	@media ${device.laptop} {
		width: 90%;
	}
	@media ${device.tablet} {
		max-width: 553px;
		min-height: 464px;
	}
	@media ${device.mobile} {
		max-width: 353px;
		min-height: 264px;
	}
`;

const DataContainer = styled.div`
	display: flex;
	flex-direction: column;
	gap: 16px;
	width: 100%;

	@media ${device.laptop} {
		flex-direction: row;
		justify-content: center;
	}
	@media ${device.tablet} {
		width: 100%;
		flex-direction: column;
		align-items: center;
	}
`;
const CardContainer = styled.div`
	max-width: 556px;
	width: 100%;
	min-height: 250px;
	position: relative;
	display: flex;
	align-items: center;
	justify-content: center;
	padding: var(--size-md);

	@media ${device.laptop} {
		max-width: 356px;
	}
	@media ${device.tablet} {
		max-width: 556px;
	}
	.btn__text {
		padding: 16px 24px;
		text-align: center;
	}
`;
const ImageContainer = styled.div`
	position: absolute;
	width: 100%;
	height: 100%;
	border: solid 1px rgba(255, 255, 255, 0.2);
	border-radius: 10px;
	z-index: -100;
	top: 0;
	left: 0;
`;
const ImageComponent = styled(Image)`
	border-radius: 10px;
`;

const BookingDataContainer = styled.div`
	max-width: 556px;
	width: 100%;
	min-height: 398px;
	border: solid 1px rgba(0, 0, 0, 0.2);
	border-radius: 10px;
	padding: var(--size-md);
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: center;
	@media ${device.laptop} {
		padding: var(--size-sm);
	}
	@media ${device.mobile} {
		padding: var(--size-sm);
	}

	.booking__inputs-container {
		display: flex;
		flex-direction: column;
		gap: 16px;

		@media ${device.mobile} {
			gap: 8px;
		}
	}
	.booking__price-container {
		display: flex;
		gap: 16px;
		align-items: center;
		justify-content: center;
		@media ${device.mobile} {
			gap: 48px;
		}
	}
	.booking__total-text {
		font-size: var(--font-size);
		font-weight: 500;
	}
	.booking__price {
		font-size: var(--font-size-lg);
		font-weight: 700;
		@media ${device.mobile} {
			font-size: var(--font-size-md);
		}
	}
	.booking__btn-container {
		max-width: 349px;
		width: 100%;
		height: 70px;
	}
`;
const CheckInOutContainer = styled.div`
	display: flex;
	justify-content: center;
	gap: var(--size-md);

	@media ${device.mobile} {
		gap: var(--size);
	}
`;

const GuestContainer = styled(CheckInOutContainer)``;
function DetailsMainSection({ data }) {
	const [guest, setGuest] = useState(1);
	const [rooms, setRoom] = useState(1);

	return (
		<DetailsSectionContainer>
			<TextContainer>
				<TitleContainer>
					<h1 className="hotel__title">{data.Title}</h1>
					<div className="hotel__icons-container">
						<StarsIcon stars={data.stars} />
					</div>
				</TitleContainer>
				<AddressContainer>
					<Icon
						icon="carbon:location-filled"
						className="address__icon"
					/>
					<span className="address__text">
						{data.Address && `${data.Address}, ${data.Town}`}
					</span>
				</AddressContainer>
			</TextContainer>
			<MainContainer>
				<GalleryContainer>
					<ImageGallery sliderImg={data.SliderImages}></ImageGallery>
				</GalleryContainer>
				<DataContainer>
					<CardContainer>
						<ImageContainer>
							<ImageComponent
								src="/images/map-image.jpg"
								layout="fill"
								objectFit="cover"
								objectPosition="center center"
							></ImageComponent>
						</ImageContainer>
						<Link href="http://maps.google.com/maps">
							<a className="card__link">
								<Button
									text="Show on map"
									btnCategory="secondary"
									typeOfButton="link"
									color="blue"
									className="card__btn"
								/>
							</a>
						</Link>
					</CardContainer>
					<BookingDataContainer>
						<div className="booking__inputs-container">
							<CheckInOutContainer>
								<InputDate labelMessage="Check In: " />
								<InputDate labelMessage="Check Out: " />
							</CheckInOutContainer>
							<GuestContainer>
								<InputOption
									labelMessage="Guest: "
									onClickInArrow={setGuest}
								/>
								<InputOption
									labelMessage="Rooms: "
									onClickInArrow={setRoom}
								/>
							</GuestContainer>
						</div>
						<div className="booking__price-container">
							<span className="booking__total-text">
								Total Booking:
							</span>
							<span className="booking__price">
								{data.price * rooms} Nok
							</span>
						</div>
						<div className="booking__btn-container">
							<Link href={`/checkout/${data.id}`}>
								<a>
									<Button
										text="Book Now"
										btnCategory="primary"
										typeOfButton="link"
										color="blue"
									/>
								</a>
							</Link>
						</div>
					</BookingDataContainer>
				</DataContainer>
			</MainContainer>
		</DetailsSectionContainer>
	);
}

export default DetailsMainSection;
