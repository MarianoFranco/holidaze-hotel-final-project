import React, { useState } from "react";
import styled from "styled-components";
import { Icon } from "@iconify/react";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import StarsIcon from "../../components/starsIcon/StarsIcon";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

// import required modules
import { FreeMode, Navigation, Thumbs } from "swiper";

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
`;

const Gallery = styled.div`
	width: 700px;
	height: 700px;
`;

function DetailsMainSection({ data }) {
	const [thumbsSwiper, setThumbsSwiper] = useState(null);
	console.log(data.SliderImages);

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
				<div>
					<Gallery>
						<Swiper
							style={{
								"--swiper-navigation-color":
									"var(--color-primary)",
								"--swiper-pagination-color":
									"var(--color-primary)",
							}}
							loop={true}
							spaceBetween={8}
							navigation={true}
							thumbs={{ swiper: thumbsSwiper }}
							modules={[FreeMode, Navigation, Thumbs]}
							className="mySwiper2"
						>
							{data.SliderImages.map((image) => {
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
							{data.SliderImages.map((image) => {
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
				</div>
				<div>
					<div>map picture</div>
					<div>Total Price</div>
				</div>
			</MainContainer>
		</DetailsSectionContainer>
	);
}

export default DetailsMainSection;
