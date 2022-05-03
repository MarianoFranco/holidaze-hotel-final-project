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
function SliderComponent() {
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
	console.log(sliderRef.current);
	return (
		<>
			<div className="arrow__prev">
				<Icon
					icon="dashicons:arrow-left-alt2"
					onClick={() => sliderRef.current.slickPrev()}
				/>
			</div>
			<SliderContainer ref={sliderRef} {...settings}>
				<SliderCards />
				<SliderCards />
				<SliderCards />
				<SliderCards />
				<SliderCards />
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

export default SliderComponent;
