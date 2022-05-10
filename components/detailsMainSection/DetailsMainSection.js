import React, { useState } from "react";
import styled from "styled-components";
import { Icon } from "@iconify/react";
import ImageGallery from "../imageGallery/ImageGallery";
import Image from "next/image";
import StarsIcon from "../../components/starsIcon/StarsIcon";

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

const GalleryContainer = styled.div`
	border: solid 1px blue;
	width: 700px;
	height: 500px;
	padding: 0px;
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
					<div>map picture</div>
					<div>Total Price</div>
				</div>
			</MainContainer>
		</DetailsSectionContainer>
	);
}

export default DetailsMainSection;
