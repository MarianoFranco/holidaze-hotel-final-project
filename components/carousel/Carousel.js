import React, { useRef } from "react";
import Slider from "react-slick";
import SliderCards from "../sliderCards/SliderCards";
import styled from "styled-components";
import { Icon } from "@iconify/react";

const SliderContainer = styled(Slider)`
	.slick-slide {
		padding: 8px;
	}
`;
function Carousel({ hotel_data }) {
	const settings = {
		dots: false,
		infinite: true,
		speed: 500,
		slidesToShow: 2,
		slidesToScroll: 1,
		responsive: [
			{
				breakpoint: 960,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 1,
					infinite: true,
				},
			},
			{
				breakpoint: 768,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
				},
			},
			{
				breakpoint: 390,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
				},
			},
		],
	};
	const sliderRef = useRef();

	return (
		<>
			<div className="arrow__prev">
				<Icon
					icon="dashicons:arrow-left-alt2"
					onClick={() => sliderRef.current.slickPrev()}
				/>
			</div>
			<SliderContainer ref={sliderRef} {...settings}>
				{hotel_data.map((hotel) => {
					const secondaryLoader = ({
						width = 100,
						quality = 100,
					}) => {
						return `${hotel.cardImage}?w=${width}&q=${
							quality || 75
						}`;
					};
					return (
						<div key={hotel.id}>
							<SliderCards
								id={hotel.id}
								title={hotel.Title}
								imgSrc={hotel.cardImage}
								imageLoader={secondaryLoader}
								stars={hotel.stars}
								town={hotel.Town}
								price={hotel.price}
							/>
						</div>
					);
				})}
			</SliderContainer>
			<div className="arrow__next">
				<Icon
					icon="dashicons:arrow-right-alt2"
					onClick={() => sliderRef.current.slickNext()}
				/>
			</div>
		</>
	);
}

export default Carousel;
