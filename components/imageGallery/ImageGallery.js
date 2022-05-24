import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import styled from "styled-components";
import Image from "next/image";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

// import required modules
import { FreeMode, Navigation, Thumbs } from "swiper";

const Gallery = styled.div`
	height: 80%;

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

		margin: 0px 0 8px;
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

function ImageGallery({ sliderImg }) {
	const [thumbsSwiper, setThumbsSwiper] = useState(null);

	const sliderArray = [];
	Object.values(sliderImg[0]).map((image) => {
		if (image && isNaN(image)) {
			sliderArray.push(image);
		}
	});
	console.log(sliderImg);
	const firstLoader = ({ src, width = 100, quality = 100 }) => {
		return `${src}?w=${width}&q=${quality || 75}`;
	};
	return (
		<>
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
					{sliderArray.map((image, i) => {
						return (
							<SwiperSlide key={i}>
								<Image
									src={image}
									layout="fill"
									loader={firstLoader}
									alt={image.title}
								/>
							</SwiperSlide>
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
					{sliderArray.map((image, i) => {
						return (
							<SwiperSlide key={i}>
								<Image
									src={image}
									layout="fill"
									loader={firstLoader}
									alt={image.title}
								/>
							</SwiperSlide>
						);
					})}
				</Swiper>
			</Gallery>
		</>
	);
}

export default ImageGallery;
