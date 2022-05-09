import React from "react";
import styled from "styled-components";
import { Icon } from "@iconify/react";
import { device } from "../../styles/breakpoints";

const Button = styled.button`
	padding: var(--size) var(--size-md);
	display: flex;
	align-items: center;
	justify-content: center;
	font-weight: 500;
	font-family: var(--font-headings);
	background: none;
	border: solid 2px var(--color-secondary);
	font-size: var(--font-size-md);
	color: var(--color-secondary);
	border-radius: 10px;
	@media ${device.tablet} {
		font-size: var(--font-size);
		padding: var(--size-sm) var(--size);
	}
	.button__icon {
		margin-left: 16px;
		font-size: 34px;
		color: var(--color-secondary);
		@media ${device.tablet} {
			font-size: 24px;
		}
	}
`;

function SortButton({ text }) {
	return (
		<>
			<Button>
				{text}
				<Icon
					icon="dashicons:arrow-down-alt2"
					className="button__icon"
				/>
			</Button>
		</>
	);
}

export default SortButton;
