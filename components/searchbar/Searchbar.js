import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Input } from "../inputs/Inputs";
import Button from "../button/Button";
import { device } from "../../styles/breakpoints";
import Link from "next/link";
import { useRouter } from "next/router";
import { DateRangePicker } from "@mantine/dates";
import { Icon } from "@iconify/react";
import { NumberInput } from "@mantine/core";
import dayjs from "dayjs";

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

const InputDate = styled.div`
	.form__label {
		font-size: var(--font-size-md);
		font-weight: 500;
		font-family: var(--font-headings);
		cursor: pointer;
		display: flex;
		align-items: center;
		margin: 0 0 8px;
	}
`;

const Icons = styled(Icon)`
	font-size: 34px;
	margin-right: 8px;
`;
const DatePickerComponent = styled(DateRangePicker)`
	.mantine-DateRangePicker-defaultVariant {
		border: none;
		color: var(--color-black);
		border: none;
		font-size: var(--font-size);
		font-weight: 400;
		padding: 8px 0 8px 44px;
	}
	.mantine-DateRangePicker-defaultVariant::placeholder {
		color: black;
		opacity: 0.7;
	}
	.mantine-DateRangePicker-defaultVariant:focus-within {
		outline: -webkit-focus-ring-color auto 1px;
		outline-color: var(--color-secondary);
	}
`;
const InputGuest = styled.div`
	.form__label {
		font-size: var(--font-size-md);
		font-weight: 500;
		font-family: var(--font-headings);
		cursor: pointer;
		display: flex;
		align-items: center;
		margin: 0 0 8px;
	}
`;
const NumberInputComponent = styled(NumberInput)`
	.mantine-NumberInput-defaultVariant {
		border: solid 1px var(--color-secondary);
		color: var(--color-black);
		border: none;
		font-size: var(--font-size);
		font-weight: 400;
		padding: 8px 0 8px 44px;
		cursor: pointer;
	}
	.mantine-NumberInput-defaultVariant:focus-within {
		outline: -webkit-focus-ring-color auto 1px;
		outline-color: var(--color-secondary);
	}
`;
function Searchbar({ onSubmitValue, getDateValue, getGuestValue }) {
	const router = useRouter();
	const queryDate = router.query.dateValue;
	const dateRange = queryDate ? queryDate.split(",") : [];
	const dateRangeMapped = dateRange.map((stringDate) => {
		return dayjs(stringDate, "MM-DD-YYYY").toDate();
	});

	const [hotelName, setHotelName] = useState(router.query.hotel || "");
	const [dateValue, setDateValue] = useState(dateRangeMapped);
	const [guestValue, setGuestValue] = useState(
		parseInt(router.query.guestValue) || 0
	);

	function handleSubmit(e) {
		e.preventDefault();
		onSubmitValue(hotelName, dateValue, guestValue);
		{
			getDateValue && getDateValue(dateValue);
		}
		{
			getGuestValue && getGuestValue(guestValue);
		}
	}

	return (
		<SearchContainer>
			<form onSubmit={handleSubmit}>
				<div className="form__data-container">
					<Input
						labelText="Select your hotel"
						icon="carbon:location-company"
						placeholder={"Choose your destination"}
						value={hotelName}
						onChange={(event) => {
							setHotelName(event.target.value);
						}}
					/>
					<div className="form__line"></div>

					<InputDate>
						<label className="form__label">
							<Icons icon="bx:calendar" />
							Arrival - Depature
						</label>
						<DatePickerComponent
							placeholder="Add date"
							value={dateValue}
							onChange={setDateValue}
						/>
					</InputDate>
					<div className="form__line"></div>
					<InputGuest>
						<label className="form__label">
							<Icons icon="fluent:guest-add-20-regular" />
							Visitors
						</label>
						<NumberInputComponent
							placeholder="Add guest"
							max={10}
							min={0}
							onChange={(val) => setGuestValue(val)}
							value={guestValue}
						/>
					</InputGuest>
					<SearchBtnContainer>
						<Button
							text="Search"
							icon="bx:search-alt"
							btnCategory="primary"
							color="blue"
							typeOfButton="button"
							type="submit"
						></Button>
					</SearchBtnContainer>
				</div>
			</form>
		</SearchContainer>
	);
}

export default Searchbar;
