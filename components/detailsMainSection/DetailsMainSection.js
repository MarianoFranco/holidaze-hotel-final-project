import React, { useState } from "react";
import styled from "styled-components";
import { Icon } from "@iconify/react";
import ImageGallery from "../imageGallery/ImageGallery";
import Image from "next/image";
import StarsIcon from "../../components/starsIcon/StarsIcon";
import Button from "../../components/button/Button";
import Link from "next/link";

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
const CardContainer = styled.div`
	max-width: 556px;
	width: 556px;
	height: 250px;
	position: relative;
	display: flex;
	align-items: center;
	justify-content: center;
	.btn__text {
		padding: 20px;
	}
`;
const ImageContainer = styled.div`
	position: absolute;
	width: 100%;
	height: 100%;
	border: solid 1px red;
	border-radius: 10px;
	z-index: -100;
	top: 0;
	left: 0;
`;
const ImageComponent = styled(Image)`
	border-radius: 10px;
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
				<GalleryContainer>
					<ImageGallery sliderImg={data.SliderImages}></ImageGallery>
				</GalleryContainer>
				<div>
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

					<div>Total Price</div>
				</div>
			</MainContainer>
		</DetailsSectionContainer>
	);
}

export default DetailsMainSection;
