import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import styled from "styled-components";
import Image from "next/image";
import { Icon } from "@iconify/react";
import Button from "../button/Button";
import Link from "next/link";
// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

// import required modules
import { FreeMode, Navigation, Thumbs } from "swiper";

const CardContainer = styled.div`
	height: 256px;
	background-color: #eeeeee;
	border-radius: 10px;
	border: solid 1px var(--color-tertiary);
	display: flex;
`;

const Gallery = styled.div`
	width: 230px;
	height: 140px;

	margin: var(--size-md);
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

	.swiper-slide img {
		display: block;
		width: 100%;
		height: 100%;
		object-fit: cover;
		border-radius: 8px;
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
	height: 80%;
	margin: auto;
	opacity: 0.2;
`;

const TotalContainer = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: center;
	padding: var(--size);
	.total__icon-container {
		align-self: flex-end;
		font-size: 32px;
		color: var(--color-secondary);
	}
	.total__price-container {
		align-self: flex-end;
		margin: 0 50px;
		display: flex;
		flex-direction: column;
		align-items: flex-end;
		gap: 8px;
	}
	.total__total-price {
	}
	.total__price {
		font-size: var(--font-size-md);
		font-weight: 600;
	}
	.total__btn-container {
		width: 208px;
		height: 64px;
	}
`;

const BookButton = styled(Button)``;
function HotelDetailsCards() {
	const [thumbsSwiper, setThumbsSwiper] = useState(null);

	return (
		<>
			<CardContainer>
				<Gallery>
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
						<SwiperSlide>
							<img src="https://swiperjs.com/demos/images/nature-1.jpg" />
						</SwiperSlide>
						<SwiperSlide>
							<img src="https://swiperjs.com/demos/images/nature-2.jpg" />
						</SwiperSlide>
						<SwiperSlide>
							<img src="https://swiperjs.com/demos/images/nature-3.jpg" />
						</SwiperSlide>
						<SwiperSlide>
							<img src="https://swiperjs.com/demos/images/nature-4.jpg" />
						</SwiperSlide>
						<SwiperSlide>
							<img src="https://swiperjs.com/demos/images/nature-5.jpg" />
						</SwiperSlide>
						<SwiperSlide>
							<img src="https://swiperjs.com/demos/images/nature-6.jpg" />
						</SwiperSlide>
						<SwiperSlide>
							<img src="https://swiperjs.com/demos/images/nature-7.jpg" />
						</SwiperSlide>
						<SwiperSlide>
							<img src="https://swiperjs.com/demos/images/nature-8.jpg" />
						</SwiperSlide>
						<SwiperSlide>
							<img src="https://swiperjs.com/demos/images/nature-9.jpg" />
						</SwiperSlide>
						<SwiperSlide>
							<img src="https://swiperjs.com/demos/images/nature-10.jpg" />
						</SwiperSlide>
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
						<SwiperSlide>
							<img src="https://swiperjs.com/demos/images/nature-1.jpg" />
						</SwiperSlide>
						<SwiperSlide>
							<img src="https://swiperjs.com/demos/images/nature-2.jpg" />
						</SwiperSlide>
						<SwiperSlide>
							<img src="https://swiperjs.com/demos/images/nature-3.jpg" />
						</SwiperSlide>
						<SwiperSlide>
							<img src="https://swiperjs.com/demos/images/nature-4.jpg" />
						</SwiperSlide>
						<SwiperSlide>
							<img src="https://swiperjs.com/demos/images/nature-5.jpg" />
						</SwiperSlide>
						<SwiperSlide>
							<img src="https://swiperjs.com/demos/images/nature-6.jpg" />
						</SwiperSlide>
						<SwiperSlide>
							<img src="https://swiperjs.com/demos/images/nature-7.jpg" />
						</SwiperSlide>
						<SwiperSlide>
							<img src="https://swiperjs.com/demos/images/nature-8.jpg" />
						</SwiperSlide>
						<SwiperSlide>
							<img src="https://swiperjs.com/demos/images/nature-9.jpg" />
						</SwiperSlide>
						<SwiperSlide>
							<img src="https://swiperjs.com/demos/images/nature-10.jpg" />
						</SwiperSlide>
					</Swiper>
				</Gallery>
				<DataContainer>
					<div className="data__title-container">
						<h3 className="data__title">Hotel Scandic</h3>
						<div className="data__icons-container">
							<Icon icon="ant-design:star-filled" />
							<Icon icon="ant-design:star-filled" />
							<Icon icon="ant-design:star-filled" />
							<Icon icon="ant-design:star-filled" />
							<Icon icon="ant-design:star-filled" />
						</div>
					</div>
					<div className="data__address-container">
						<p>1170 Travis Street, Bergen 11708, Norway</p>
						<div className="data__location-container">
							<Icon
								icon="carbon:location-filled"
								className="data__location-icon"
							/>
							<span className="data__location">Map view</span>
						</div>
					</div>
					<div className="data__amenities">
						<Icon icon="fluent:food-24-filled" />
						<Icon icon="bx:wifi-2" />
						<Icon icon="ic:outline-pets" />
						<Icon icon="bx:spa" />
						<Icon icon="ant-design:car-filled" />
						<Icon icon="gg:gym" />
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
							<span className="total__price">1999</span>
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
