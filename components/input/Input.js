import React from "react";
import { Icon } from "@iconify/react";
import styled from "styled-components";
import { device } from "../../styles/breakpoints";

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
function Input({ labelText, icon, placeholder }) {
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

export default Input;
