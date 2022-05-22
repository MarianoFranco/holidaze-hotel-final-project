import React, { useState } from "react";
import styled from "styled-components";
import { Input } from "../inputs/Inputs";
import Button from "../button/Button";
import { device } from "../../styles/breakpoints";
import Link from "next/link";
import { useRouter } from "next/router";

const SearchContainer = styled.div`
	max-width: 1126px;
	width: 95%;
	min-height: 130px;
	border: solid 1px var(--color-black);
	background-color: var(--color-white);
	border-radius: 0 0 10px 10px;
	display: flex;
	flex-direction: column;
	justify-content: center;

	@media ${device.laptop} {
		width: 95%;
		min-height: 380px;
	}

	.form__data-container {
		display: flex;
		justify-content: space-around;
		align-items: center;
		padding: 8px;
		@media ${device.laptop} {
			flex-direction: column;
		}
	}
	.form__line {
		height: 100px;
		width: 1px;
		background-color: black;
		@media ${device.laptop} {
			height: 1px;
			width: 95%;
		}
	}
`;

const SearchBtnContainer = styled.div`
	width: 188px;
	height: 66px;
	@media ${device.laptop} {
		width: 95%;
	}
`;

function Searchbar({ onSubmitValue }) {
	const [hotelName, setHotelName] = useState("");

	function handleSubmit(e) {
		e.preventDefault();
		onSubmitValue(hotelName);
	}
	const router = useRouter();
	console.log(router.query.hotel);
	return (
		<SearchContainer>
			<form onSubmit={handleSubmit}>
				<div className="form__data-container">
					<Input
						labelText="Select your hotel"
						icon="carbon:location-company"
						placeholder="Choose your destination"
						value={hotelName}
						onChange={(event) => {
							setHotelName(event.target.value);
						}}
					/>
					<div className="form__line"></div>
					<Input
						labelText="Arrival - Depature"
						icon="bx:calendar"
						placeholder="Add data"
					/>
					<div className="form__line"></div>
					<Input
						labelText="Visitors"
						icon="fluent:guest-add-20-regular"
						placeholder="Add guest"
					/>
					<SearchBtnContainer>
						{router.asPath === "/hotels_page" ? (
							<Button
								text="Search"
								icon="bx:search-alt"
								btnCategory="primary"
								color="blue"
								typeOfButton="button"
								type="submit"
							></Button>
						) : (
							<Link
								href={{
									pathname: `/hotels_page/`,
									query: {
										hotel: hotelName,
									},
								}}
								passHref
							>
								<a>
									<Button
										text="Search"
										icon="bx:search-alt"
										btnCategory="primary"
										color="blue"
										typeOfButton="Link"
										onClick={handleSubmit}
									></Button>
								</a>
							</Link>
						)}
					</SearchBtnContainer>
				</div>
			</form>
		</SearchContainer>
	);
}

export default Searchbar;
