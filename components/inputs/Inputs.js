import React, { useState, useRef } from "react";
import { Icon } from "@iconify/react";
import styled from "styled-components";
import { device } from "../../styles/breakpoints";
import { DateRangePicker, DatePicker } from "@mantine/dates";
import { NumberInput } from "@mantine/core";

const InputsContainer = styled.div`
	display: flex;
	flex-direction: column;
	padding: 8px;

	@media ${device.mobile} {
		margin: 24px 8px;
		width: 95%;
	}
	.form__label {
		font-size: var(--font-size-md);
		font-weight: 500;
		font-family: var(--font-headings);
		cursor: pointer;
		display: flex;
		align-items: center;
		margin: 0 0 8px;
	}
	.form__input {
		border: none;
		font-size: var(--font-size);
		font-weight: 400;
		padding: 8px 0 8px 44px;
	}
	.form__input:focus-visible {
		border: none;
		outline-color: var(--color-secondary);
	}
`;
const Icons = styled(Icon)`
	font-size: 34px;
	margin-right: 8px;
`;
export function Input({
	labelText,
	icon,
	placeholder,
	onKeyUpFunction,
	onChange,
	value,
	type,
}) {
	return (
		<InputsContainer>
			<label className="form__label">
				<Icons icon={icon} />
				{labelText}
			</label>
			<input
				placeholder={placeholder}
				className="form__input"
				onKeyUp={onKeyUpFunction}
				onChange={onChange}
				value={value || ""}
				type={type}
			/>
		</InputsContainer>
	);
}

const InputDateContainer = styled.div`
	display: flex;
	flex-direction: column;
	gap: 16px;
	.input__text {
		color: var(--color-black);
		font-size: var(--font-size);
		font-weight: 600;
	}
`;
const InputDateCustomized = styled.div`
	position: relative;
	width: 100%;
	max-width: 170px;
	height: 55px;

	.input__icon {
		position: absolute;
		top: 12px;
		right: 12px;
		font-size: 30px;
		color: var(--color-secondary);
	}
	.input__line {
		background-color: var(--color-secondary);
		width: 1px;
		height: 55px;
		position: absolute;
		top: 0;
		left: 67%;
	}
`;

const InputDatePicker = styled(DatePicker)`
	.mantine-DatePicker-input {
		border: solid 1px var(--color-secondary);
		height: 55px;
		font-size: var(--font-size);
		border-radius: 10px;
	}
	.mantine-DatePicker-rightSection {
		display: none;
	}
`;

export function InputDate({ labelMessage }) {
	const [value, setValue] = useState([Date, Date]);
	return (
		<>
			<InputDateContainer>
				<p className="input__text">{labelMessage}</p>
				<InputDateCustomized>
					<InputDatePicker
						placeholder="Pick date"
						value={value}
						onChange={setValue}
					></InputDatePicker>
					<div className="input__line"></div>
					<Icon icon="bx:calendar" className="input__icon" />
				</InputDateCustomized>
			</InputDateContainer>
		</>
	);
}
const InputOptionCustomized = styled.div`
	position: relative;
	max-width: 170px;
`;

const InputOptionContainer = styled(NumberInput)`
	display: flex;
	flex-direction: column;
	gap: 16px;
	.mantine-NumberInput-label {
		color: var(--color-black);
		font-size: var(--font-size);
		font-weight: 600;
		margin: 0;
	}
	.mantine-NumberInput-unstyledVariant {
		border: solid 1px var(--color-secondary);
		position: relative;
		height: 55px;
		padding-left: 16px;
		font-size: var(--font-size);
		border-radius: 10px;
	}
`;

const OptionIconsContainer = styled.div`
	position: absolute;
	bottom: 4px;
	right: 12px;
	display: flex;
	flex-direction: column;
	color: var(--color-secondary);
	font-size: 24px;
`;
export function InputOption({ labelMessage, onClickInArrow }) {
	const [numberOfGuest, setNumberOfGuest] = useState(1);

	const Increment = () => {
		setNumberOfGuest(numberOfGuest + 1);
		onClickInArrow(numberOfGuest + 1);
	};
	const Decrement = () => {
		let value = 1;

		if (numberOfGuest <= value) {
			value = 2;
		} else {
			value = numberOfGuest;
		}
		setNumberOfGuest(value - 1);
		onClickInArrow(value - 1);
	};
	return (
		<>
			<InputOptionCustomized>
				<InputOptionContainer
					value={numberOfGuest}
					onChange={(val) => setNumberOfGuest(val)}
					placeholder={labelMessage}
					variant="unstyled"
					label={labelMessage}
				/>
				<OptionIconsContainer>
					<Icon icon="bx:up-arrow" onClick={() => Increment()} />
					<Icon icon="bx:down-arrow" onClick={() => Decrement()} />
				</OptionIconsContainer>
			</InputOptionCustomized>
		</>
	);
}
