import React, { useState, useRef } from "react";
import styled from "styled-components";
import { Icon } from "@iconify/react";
import ImageGallery from "../imageGallery/ImageGallery";
import Image from "next/image";
import StarsIcon from "../../components/starsIcon/StarsIcon";
import Button from "../../components/button/Button";
import Link from "next/link";
import { NumberInput } from "@mantine/core";

import { DateRangePicker, DatePicker } from "@mantine/dates";

const DetailsSectionContainer = styled.div`
	max-width: 1440px;
	margin: auto;
`;
const TextContainer = styled.div`
	padding: var(--size-xl) var(--size-md) var(--size-md);
`;
const TitleContainer = styled.div`
	display: flex;
	align-items: flex-end;
	gap: var(--size-md);
	.hotel__title {
		font-size: var(--font-size-xl);
		font-weight: 600;
	}
	.hotel__icons-container {
		display: flex;
		gap: var(--size-sm);
		font-size: 39px;
		color: var(--color-secondary);
		padding: 12px 0;
	}
`;
const AddressContainer = styled.div`
	display: flex;
	align-items: center;
	gap: var(--size);

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
	border: solid 1px red;
	display: flex;
	gap: var(--size);
`;

const GalleryContainer = styled.div`
	width: 800px;
	height: 664px;
	padding: 0px;
`;

const DataContainer = styled.div`
	display: flex;
	flex-direction: column;
	gap: 16px;
`;
const CardContainer = styled.div`
	max-width: 556px;
	width: 556px;
	height: 250px;
	position: relative;
	display: flex;
	align-items: center;
	justify-content: center;
	.btn__text {
		padding: 16px 24px;
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
	width: 556px;
	height: 398px;
	border: solid 1px rgba(0, 0, 0, 0.2);
	border-radius: 10px;
	padding: var(--size-md);
`;
const CheckInOutContainer = styled.div`
	display: flex;
	justify-content: center;
	gap: var(--size-md);
`;
const InputComponent = styled.div`
	display: flex;
	flex-direction: column;
	gap: 16px;
	.input__text {
		color: var(--color-black);
		font-size: var(--font-size);
		font-weight: 600;
	}
`;
const InputCustomized = styled.div`
	position: relative;
	width: 162px;
	height: 55px;

	.input__icon {
		position: absolute;
		top: 12px;
		right: 12px;
		font-size: 30px;
		color: var(--color-secondary);
	}
	.input__line {
		background-color: var(--color-secondary);
		width: 1px;
		height: 55px;
		position: absolute;
		top: 0;
		left: 111px;
	}
`;

const InputContainer = styled(DatePicker)`
	.mantine-DatePicker-input {
		border: solid 1px var(--color-secondary);
		height: 55px;
		font-size: var(--font-size);
	}
	.mantine-DatePicker-rightSection {
		display: none;
	}
`;
const GuestContainer = styled.div``;
function DetailsMainSection({ data }) {
	const [thumbsSwiper, setThumbsSwiper] = useState(null);

	const [value, setValue] = useState([Date, Date]);

	const ref = useRef("current");

	//Consultar sobre como puedo sumarle el valor al total
	console.log(ref.current.value);
	const [numberOfGuest, setNumberOfGuest] = useState(1);

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
						1170 Travis Street, Bergen 11708
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
						<div>
							<CheckInOutContainer>
								<InputComponent>
									<p className="input__text">Check in:</p>
									<InputCustomized>
										<InputContainer
											placeholder="Pick date"
											value={value}
											onChange={setValue}
										></InputContainer>
										<div className="input__line"></div>
										<Icon
											icon="bx:calendar"
											className="input__icon"
										/>
									</InputCustomized>
								</InputComponent>
								<InputComponent>
									<p className="input__text">Check out:</p>
									<InputCustomized>
										<InputContainer
											placeholder="Pick date"
											value={value}
											onChange={setValue}
										></InputContainer>
										<div className="input__line"></div>
										<Icon
											icon="bx:calendar"
											className="input__icon"
										/>
									</InputCustomized>
								</InputComponent>
							</CheckInOutContainer>
							<GuestContainer>
								<NumberInput
									ref={ref}
									defaultValue={1}
									placeholder="Guest"
									label="Guest: "
								/>
								<div>Rooms</div>
							</GuestContainer>
						</div>
						<div>
							<span>Total Booking:</span>
							<span>Price</span>
						</div>
						<div>
							<Button
								text="Book Now"
								btnCategory="primary"
								typeOfButton="link"
								color="blue"
							/>
						</div>
					</BookingDataContainer>
				</DataContainer>
			</MainContainer>
		</DetailsSectionContainer>
	);
}

export default DetailsMainSection;
