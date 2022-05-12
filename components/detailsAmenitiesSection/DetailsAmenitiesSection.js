import React from "react";
import styled from "styled-components";
import { Icon } from "@iconify/react";

const DetailsAmenitiesContainer = styled.div`
	max-width: 1440px;
	margin: auto;
`;
const AmenitiesTitle = styled.h2`
	font-size: var(--font-size-lg);
	padding: var(--size-lg) var(--size-md);
`;

const AmenitiesDataContainer = styled.div`
	padding: var(--size-md);

	display: flex;
	justify-content: space-between;
	gap: 16px;
	.amenities__description {
		width: 60%;
		font-family: var(--font-body);
		line-height: 3rem;
	}
	.amenities__information {
		width: 40%;
		max-width: 410px;
		display: flex;
		flex-direction: column;
		justify-content: space-evenly;
	}
	.amenities__icons-container {
		display: flex;
		gap: 25px;
		padding: 0 var(--size-lg);
		align-self: start;
	}
	.amenities__icon-container {
		display: flex;
		flex-direction: column;
		gap: 16px;
		align-items: center;
		font-size: var(--font-size);
		font-weight: 500;
		color: var(--color-secondary);
	}
	.amenities__icon {
		font-size: 40px;
	}

	.amenities__time-container {
		display: flex;
		justify-content: space-between;
	}
`;
const Line = styled.div`
	width: 80%;
	height: 1px;
	background-color: rgba(0, 0, 0, 0.2);
	margin: var(--size-md) auto;
`;
const BottomLine = styled(Line)`
	width: 95%;
`;
const TimeComponent = styled.div`
	display: flex;
	flex-direction: column;
	gap: 16px;
	align-items: center;

	.time__checkin-container {
		color: var(--color-secondary);
		display: flex;
		align-items: center;
		gap: 16px;
	}
	.time__icon {
		font-size: 32px;
	}
	.time__schedule {
		font-size: var(--font-size-md);
		font-weight: 500;
	}
`;
function DetailsAmenitiesSection({ data }) {
	console.log(data);
	return (
		<>
			<DetailsAmenitiesContainer>
				<AmenitiesTitle>Amenities</AmenitiesTitle>
				<AmenitiesDataContainer>
					<div className="amenities__description">
						{data.amenities_desc}
					</div>
					<div className="amenities__information">
						<div className="amenities__icons-container">
							{data.amenities.breakfast && (
								<div className="amenities__icon-container">
									<Icon
										icon="fluent:food-24-filled"
										className="amenities__icon"
									/>
									<p>Breakfast</p>
								</div>
							)}
							{data.amenities.wifi && (
								<div className="amenities__icon-container">
									<Icon
										icon="bx:wifi-2"
										className="amenities__icon"
									/>
									<p>Free WiFi</p>
								</div>
							)}
							{data.amenities.pets && (
								<div className="amenities__icon-container">
									<Icon
										icon="ic:outline-pets"
										className="amenities__icon"
									/>
									<p>Pet Friendly</p>
								</div>
							)}
							{data.amenities.spa && (
								<div className="amenities__icon-container">
									<Icon
										icon="bx:spa"
										className="amenities__icon"
									/>
									<p>Spa</p>
								</div>
							)}
							{data.amenities.parking && (
								<div className="amenities__icon-container">
									<Icon
										icon="ant-design:car-filled"
										className="amenities__icon"
									/>
									<p>Parking</p>
								</div>
							)}
							{data.amenities.gym && (
								<div className="amenities__icon-container">
									<Icon
										icon="gg:gym"
										className="amenities__icon"
									/>
									<p>Gym</p>
								</div>
							)}
						</div>
						<Line></Line>
						<div className="amenities__time-container">
							<TimeComponent>
								<div className="time__checkin-container">
									<Icon
										icon="charm:clock-alarm"
										className="time__icon"
									/>
									<span>Check in: </span>
								</div>
								<p className="time__schedule">13:00 to 24:00</p>
							</TimeComponent>
							<TimeComponent>
								<div className="time__checkin-container">
									<Icon
										icon="charm:clock-alarm"
										className="time__icon"
									/>
									<span>Check in: </span>
								</div>
								<p className="time__schedule">13:00 to 24:00</p>
							</TimeComponent>
						</div>
					</div>
				</AmenitiesDataContainer>
				<BottomLine />
			</DetailsAmenitiesContainer>
		</>
	);
}

export default DetailsAmenitiesSection;
