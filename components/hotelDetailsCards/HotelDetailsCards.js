import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import styled from "styled-components";
import Image from "next/image";
import { Icon } from "@iconify/react";
import Button from "../button/Button";
import Link from "next/link";
import StarsIcon from "../starsIcon/StarsIcon";
import ImageSlider from "../imageSlider/ImageSlider";
import { device } from "../../styles/breakpoints";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

// import required modules
import { FreeMode, Navigation, Thumbs } from "swiper";

const CardContainer = styled.div`
	min-height: 256px;
	background-color: #eeeeee;
	border-radius: 10px;
	border: solid 1px var(--color-tertiary);
	display: flex;
	position: relative;
	@media ${device.laptop} {
		flex-direction: column;
		gap: var(--size-md);
		align-items: center;
	}
`;

const Gallery = styled.div`
	width: 230px;
	height: 140px;
	margin: var(--size-md);

	@media ${device.laptop} {
	}
	.swiper {
		width: 100%;
		height: 100%;
	}

	.swiper-slide {
		text-align: center;
		font-size: 18px;

		/* Center slide text vertically */
		display: -webkit-box;
		display: -ms-flexbox;
		display: -webkit-flex;
		display: flex;
		-webkit-box-pack: center;
		-ms-flex-pack: center;
		-webkit-justify-content: center;
		justify-content: center;
		-webkit-box-align: center;
		-ms-flex-align: center;
		-webkit-align-items: center;
		align-items: center;
	}

	.swiper-slide img {
		display: block;
		width: 100%;
		height: 100%;
		object-fit: cover;
		border-radius: 8px;
	}

	.mySwiper2 {
		height: 100%;
		width: 100%;

		margin: 8px 0;
	}

	.mySwiper {
		height: 20%;
		box-sizing: border-box;
		padding: 0;
	}

	.mySwiper .swiper-slide {
		width: 25%;
		height: 100%;
		opacity: 0.4;
	}

	.mySwiper .swiper-slide-thumb-active {
		opacity: 1;
	}

	.swiper-button-next::after,
	.swiper-button-prev::after {
		font-size: var(--size-md);
		font-weight: 700;
	}
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
	margin: auto;
	opacity: 0.2;

	@media ${device.laptop} {
		width: 80%;
		background-color: var(--color-black);
		height: 1px;
		margin: auto;
		opacity: 0.2;
	}
`;

const TotalContainer = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: center;
	padding: var(--size);
	gap: var(--size-lg);
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
		margin: 0 50px;
		display: flex;
		flex-direction: column;
		align-items: flex-end;
		gap: 8px;
		@media ${device.laptop} {
			align-self: center;
			align-items: center;
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
		height: 64px;
		@media ${device.laptop} {
			max-width: 100%;
		}
	}
`;

const BookButton = styled(Button)``;
function HotelDetailsCards({
	title,
	address,
	amenities,
	price,
	stars,
	sliderImg,
}) {
	const [thumbsSwiper, setThumbsSwiper] = useState(null);

	return (
		<>
			<CardContainer>
				<Gallery>
					{/* <ImageSlider
						style={{
							"--swiper-navigation-color": "var(--color-primary)",
							"--swiper-pagination-color": "var(--color-primary)",
						}}
						loop={true}
						spaceBetween={8}
						navigation={true}
						thumbs={{ swiper: thumbsSwiper }}
						modules={[FreeMode, Navigation, Thumbs]}
						className="mySwiper2"
						sliderImg={sliderImg}
					/> */}

					<Swiper
						style={{
							"--swiper-navigation-color": "var(--color-primary)",
							"--swiper-pagination-color": "var(--color-primary)",
						}}
						loop={true}
						spaceBetween={8}
						navigation={true}
						thumbs={{ swiper: thumbsSwiper }}
						modules={[FreeMode, Navigation, Thumbs]}
						className="mySwiper2"
					>
						{sliderImg.map((image) => {
							const firstLoader = ({
								width = 100,
								quality = 100,
							}) => {
								return `${image.Img1}?w=${width}&q=${
									quality || 75
								}`;
							};
							const secondLoader = ({
								width = 100,
								quality = 100,
							}) => {
								return `${image.Img2}?w=${width}&q=${
									quality || 75
								}`;
							};
							const thirdLoader = ({
								width = 100,
								quality = 100,
							}) => {
								return `${image.Img3}?w=${width}&q=${
									quality || 75
								}`;
							};
							const fourthLoader = ({
								width = 100,
								quality = 100,
							}) => {
								return `${image.Img4}?w=${width}&q=${
									quality || 75
								}`;
							};
							const fifthLoader = ({
								width = 100,
								quality = 100,
							}) => {
								return `${image.Img5}?w=${width}&q=${
									quality || 75
								}`;
							};

							return (
								<div key={image.id}>
									<SwiperSlide>
										<Image
											src={image.Img1}
											layout="fill"
											loader={firstLoader}
											alt={image.title}
										/>
									</SwiperSlide>
									<SwiperSlide>
										<Image
											src={image.Img2}
											loader={secondLoader}
											layout="fill"
											alt={image.title}
										/>
									</SwiperSlide>
									<SwiperSlide>
										<Image
											src={image.Img3}
											loader={thirdLoader}
											layout="fill"
											alt={image.title}
										/>
									</SwiperSlide>
									<SwiperSlide>
										<Image
											src={image.Img4}
											loader={fourthLoader}
											layout="fill"
											alt={image.title}
										/>
									</SwiperSlide>
									<SwiperSlide>
										<Image
											src={image.Img5}
											loader={fifthLoader}
											layout="fill"
											alt={image.title}
										/>
									</SwiperSlide>
								</div>
							);
						})}
					</Swiper>
					<Swiper
						onSwiper={setThumbsSwiper}
						loop={true}
						spaceBetween={8}
						slidesPerView={4}
						freeMode={true}
						watchSlidesProgress={true}
						modules={[FreeMode, Navigation, Thumbs]}
						className="mySwiper"
					>
						{sliderImg.map((image) => {
							const firstLoader = ({
								width = 100,
								quality = 100,
							}) => {
								return `${image.Img1}?w=${width}&q=${
									quality || 75
								}`;
							};
							const secondLoader = ({
								width = 100,
								quality = 100,
							}) => {
								return `${image.Img2}?w=${width}&q=${
									quality || 75
								}`;
							};
							const thirdLoader = ({
								width = 100,
								quality = 100,
							}) => {
								return `${image.Img3}?w=${width}&q=${
									quality || 75
								}`;
							};
							const fourthLoader = ({
								width = 100,
								quality = 100,
							}) => {
								return `${image.Img4}?w=${width}&q=${
									quality || 75
								}`;
							};
							const fifthLoader = ({
								width = 100,
								quality = 100,
							}) => {
								return `${image.Img5}?w=${width}&q=${
									quality || 75
								}`;
							};

							return (
								<div key={image.id}>
									<SwiperSlide>
										<Image
											src={image.Img1}
											layout="fill"
											loader={firstLoader}
											alt={image.title}
										/>
									</SwiperSlide>
									<SwiperSlide>
										<Image
											src={image.Img2}
											loader={secondLoader}
											layout="fill"
											alt={image.title}
										/>
									</SwiperSlide>
									<SwiperSlide>
										<Image
											src={image.Img3}
											loader={thirdLoader}
											layout="fill"
											alt={image.title}
										/>
									</SwiperSlide>
									<SwiperSlide>
										<Image
											src={image.Img4}
											loader={fourthLoader}
											layout="fill"
											alt={image.title}
										/>
									</SwiperSlide>
									<SwiperSlide>
										<Image
											src={image.Img5}
											loader={fifthLoader}
											layout="fill"
											alt={image.title}
										/>
									</SwiperSlide>
								</div>
							);
						})}
					</Swiper>
				</Gallery>
				<DataContainer>
					<div className="data__title-container">
						<h3 className="data__title">{title}</h3>
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
					<div className="total__icon-container">
						<Icon icon="akar-icons:heart" />
					</div>
					<div className="total__price-container">
						<span className="total__text">from</span>
						<div className="total__total-price">
							<span className="total__price">{price}</span>
							<span> Nok</span>
						</div>
						<span>per night</span>
					</div>
					<div className="total__btn-container">
						<Link href="#" passHref>
							<a>
								<Button
									className="total__btn"
									text="BOOK NOW"
									btnCategory="primary"
									typeOfButton="link"
									color="blue"
								></Button>
							</a>
						</Link>
					</div>
				</TotalContainer>
			</CardContainer>
		</>
	);
}

export default HotelDetailsCards;
