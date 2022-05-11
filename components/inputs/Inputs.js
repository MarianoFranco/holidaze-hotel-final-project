import React, { useState } from "react";
import { Icon } from "@iconify/react";
import styled from "styled-components";
import { device } from "../../styles/breakpoints";
import { DateRangePicker, DatePicker } from "@mantine/dates";

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
`;
const Icons = styled(Icon)`
	font-size: 34px;
	margin-right: 8px;
`;
export function Input({ labelText, icon, placeholder }) {
	return (
		<InputsContainer>
			<label className="form__label">
				<Icons icon={icon} />
				{labelText}
			</label>
			<input placeholder={placeholder} className="form__input" />
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
	width: 162px;
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
		left: 111px;
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

export function InputOption() {
	return <></>;
}
