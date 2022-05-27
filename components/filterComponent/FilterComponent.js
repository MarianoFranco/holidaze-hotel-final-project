import React, { useState, usePreviousState } from "react";
import {
	Accordion,
	RangeSlider,
	Text,
	Container,
	Checkbox,
} from "@mantine/core";
import styled from "styled-components";
import { Icon } from "@iconify/react";
import usePrevious from "../../utils/hooks/usePrevious";

const AccordionContainer = styled(Accordion)`
	.mantine-v4lv9f {
		border: none;
	}
	.mantine-Accordion-itemOpened {
		border: none;
	}
	.mantine-Accordion-label {
		font-size: var(--font-size-md);
	}
	.mantine-Accordion-icon {
		color: var(--color-secondary);
	}
	.mantine-Accordion-icon svg {
		height: var(--size-md);
		width: var(--size-md);
	}
`;
const StarsIcons = styled(Icon)`
	font-size: 26px;
	color: var(--color-secondary);
`;

const SliderComponent = styled(Container)`
	.mantine-Slider-bar {
		background-color: var(--color-secondary);
		height: 4px;
		top: 2px;
	}
	.mantine-d21okt {
	}
	.mantine-d21okt::before {
		content: "";
		position: absolute;
		top: 2px;
		bottom: 0;
		border-radius: 32px;
		right: 0;
		left: 0;
		background-color: var(--color-primary);
		z-index: -10;
		height: 3px;
	}
	.mantine-Slider-thumb {
		background-color: var(--color-secondary);
		height: 10px;
		width: 10px;
		border: none;
		box-shadow: 0px 0px 0px 10px rgba(46, 101, 140, 0.4);
	}
	.mantine-mug9ln {
		color: var(--color-primary);
	}
	.values-container {
		display: flex;
		justify-content: space-between;
		padding: 16px 0;
		font-weight: 700;
	}
`;

const CheckboksItem = styled(Checkbox)`
	margin: var(--size) 0;

	.mantine-Checkbox-input {
		border: solid 1px var(--color-secondary);
		background-color: rgba(88, 132, 163, 0.2);
	}
	.mantine-Checkbox-icon {
		color: var(--color-secondary);
	}
`;
function FilterComponent({
	onStarsSelected,
	onPriceRangeSelected,
	onWifiSelected,
	onSpaSelected,
	onPetSelected,
}) {
	const [value, setValue] = useState([0, 10000]);

	const [stars, setStars] = useState(5);
	const [starsSelected, setStarsSelected] = useState(5);

	const [toggleWifi, setToggleWifi] = useState(false);
	const [toggleSpa, setToggleSpa] = useState(false);
	const [togglePet, setTogglePet] = useState(false);

	return (
		<>
			<AccordionContainer>
				<Accordion.Item label="Hotel class" iconPosition="right">
					<div>
						<StarsIcons
							icon={
								(stars === null && starsSelected >= 1) ||
								stars >= 1
									? "ant-design:star-filled"
									: "ant-design:star-outlined"
							}
							onMouseEnter={(e) => {
								setStars(1);
							}}
							onClick={() => {
								setStarsSelected(1);
								onStarsSelected(1);
							}}
							onMouseLeave={() => {
								setStars(null);
							}}
						/>
						<StarsIcons
							icon={
								stars >= 2 ||
								(stars === null && starsSelected >= 2)
									? "ant-design:star-filled"
									: "ant-design:star-outlined"
							}
							onMouseEnter={() => {
								setStars(2);
							}}
							onClick={() => {
								setStarsSelected(2);
								onStarsSelected(2);
							}}
							onMouseLeave={() => {
								setStars(null);
							}}
						/>
						<StarsIcons
							icon={
								stars >= 3 ||
								(stars === null && starsSelected >= 3)
									? "ant-design:star-filled"
									: "ant-design:star-outlined"
							}
							onMouseEnter={() => {
								setStars(3);
							}}
							onClick={() => {
								setStarsSelected(3);
								onStarsSelected(3);
							}}
							onMouseLeave={() => {
								setStars(null);
							}}
						/>
						<StarsIcons
							icon={
								(stars && stars >= 4) ||
								(!stars && starsSelected >= 4)
									? "ant-design:star-filled"
									: "ant-design:star-outlined"
							}
							onMouseEnter={() => {
								setStars(4);
							}}
							onClick={() => {
								setStarsSelected(4);
								onStarsSelected(4);
							}}
							onMouseLeave={() => {
								setStars(null);
							}}
						/>
						<StarsIcons
							icon={
								(stars && stars >= 5) ||
								(!stars && starsSelected >= 5)
									? "ant-design:star-filled"
									: "ant-design:star-outlined"
							}
							onMouseEnter={() => {
								setStars(5);
							}}
							onClick={() => {
								setStarsSelected(5);
								onStarsSelected(5);
							}}
							onMouseLeave={() => {
								setStars(null);
							}}
						/>
					</div>
				</Accordion.Item>
				<Accordion.Item label="Price" iconPosition="right">
					<SliderComponent size={400}>
						<RangeSlider
							min={0}
							max={10000}
							defaultValue={[0, 10000]}
							onChange={(price) => {
								setValue(price);
							}}
							onChangeEnd={onPriceRangeSelected}
							marks={[{ value: 0 }, { value: 10000 }]}
						/>
						<div className="values-container">
							<span>{value[0]} Nok</span>
							<span>{value[1]} Nok</span>
						</div>
					</SliderComponent>
				</Accordion.Item>
				<Accordion.Item label="PopularFilters" iconPosition="right">
					<CheckboksItem
						label="WiFi included"
						checked={toggleWifi}
						onChange={() => {
							const newToggle = toggleWifi ? false : true;
							setToggleWifi(newToggle);
							onWifiSelected(newToggle);
						}}
					/>
					<CheckboksItem label="Breakfast included" />
					<CheckboksItem
						label="Pet friendly"
						checked={togglePet}
						onChange={() => {
							setTogglePet(newToggle);
							onPetSelected(newToggle);
						}}
					/>
					<CheckboksItem label="Parking" />
					<CheckboksItem
						label="Spa"
						checked={toggleSpa}
						onChange={() => {
							const newToggle = toggleSpa ? false : true;
							setToggleSpa(newToggle);
							onSpaSelected(newToggle);
						}}
					/>
					<CheckboksItem label="Gym" />
				</Accordion.Item>
			</AccordionContainer>
		</>
	);
}

export default FilterComponent;
