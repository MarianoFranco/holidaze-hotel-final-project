import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import styled from "styled-components";
import Image from "next/image";

const SwiperComponent = styled(Swiper)`
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

function ImageSlider({ sliderImg }) {
	return (
		<>
			<SwiperComponent>
				{sliderImg.map((image) => {
					const firstLoader = ({ width = 100, quality = 100 }) => {
						return `${image.Img1}?w=${width}&q=${quality || 75}`;
					};
					const secondLoader = ({ width = 100, quality = 100 }) => {
						return `${image.Img2}?w=${width}&q=${quality || 75}`;
					};
					const thirdLoader = ({ width = 100, quality = 100 }) => {
						return `${image.Img3}?w=${width}&q=${quality || 75}`;
					};
					const fourthLoader = ({ width = 100, quality = 100 }) => {
						return `${image.Img4}?w=${width}&q=${quality || 75}`;
					};
					const fifthLoader = ({ width = 100, quality = 100 }) => {
						return `${image.Img5}?w=${width}&q=${quality || 75}`;
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
			</SwiperComponent>
		</>
	);
}

export default ImageSlider;
