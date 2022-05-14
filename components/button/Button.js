import React from "react";
import styled from "styled-components";
import { Icon } from "@iconify/react";
import Link from "next/link";

const BtnContainer = styled.div`
	height: 100%;
	border-radius: 10px;
	font-weight: 500;
	display: flex;
	align-items: center;
	justify-content: center;
	border: ${(props) =>
		props.color === "blue"
			? "solid 1px #3E3F40"
			: "solid 1px var(--color-secondary)"};
	box-shadow: 2px 2px 4px 0px var(--color-black);
	font-family: var(--font-headings);
	font-size: var(--font-size-md);
	color: ${(props) =>
		props.color === "blue"
			? "var(--color-white)"
			: "var(--color-secondary)"};
	background: ${(props) =>
		props.color === "blue"
			? "linear-gradient(90deg, var(--color-secondary) 0%, var(--color-black) 100%)"
			: "linear-gradient(90deg, var(--color-primary) 0%, #FFF3E7 100%)"};
	width: 100%;

	.btn__icon {
		font-size: 34px;
		margin-left: var(--size);
	}
`;
const BtnElement = styled.button`
	width: 100%;
	height: 100%;
	font-weight: 500;
	font-family: var(--font-headings);
	background: none;
	border: none;
	color: ${(props) =>
		props.color === "blue"
			? "var(--color-white)"
			: "var(--color-secondary)"};
	font-size: var(--font-size-md);
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 12px;
	cursor: pointer;

	.btn__icon {
		font-size: 34px;
		margin-left: var(--size);
	}
`;

const SecBtnContainer = styled.div`
	height: 100%;
	border-radius: 10px;
	font-weight: 500;
	display: flex;
	align-items: center;
	justify-content: center;
	border: ${(props) =>
		props.color === "blue"
			? "solid 2px var(--color-secondary)"
			: "solid 2px var(--color-primary)"};
	box-shadow: 2px 2px 4px 0px var(--color-black);
	font-family: var(--font-headings);
	font-size: var(--font-size-md);
	color: ${(props) =>
		props.color === "blue"
			? "var(--color-secondary)"
			: "var(--color-primary)"};
	background: none;
	width: 100%;
	.btn__icon {
		font-size: 34px;
		margin-left: var(--size);
	}
`;
const SecBtnElement = styled.button`
	width: 100%;
	height: 100%;
	font-weight: 500;
	font-family: var(--font-headings);
	background: none;
	border: none;
	color: ${(props) =>
		props.color === "blue"
			? "var(--color-secondary)"
			: "var(--color-primary)"};
	font-size: var(--font-size-md);
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 12px;
	cursor: pointer;
	.btn__icon {
		font-size: 34px;
		margin-left: var(--size);
	}
`;

function Button({
	text,
	icon,
	btnCategory,
	typeOfButton,
	color,
	onClick,
	type,
}) {
	if (btnCategory === "primary") {
		if (color === "blue") {
			if (typeOfButton === "button") {
				return (
					<BtnContainer color={color}>
						<BtnElement color={color} onClick={onClick} type={type}>
							{text}
							<Icon icon={icon} className="btn__icon" />
						</BtnElement>
					</BtnContainer>
				);
			} else {
				return (
					<BtnContainer color={color} target="_blank">
						<span className="btn__text">{text}</span>
						<Icon icon={icon} className="btn__icon" />
					</BtnContainer>
				);
			}
		} else {
			if (typeOfButton === "button") {
				return (
					<BtnContainer color={color}>
						<BtnElement color={color} onClick={onClick}>
							{text}
							<Icon icon={icon} className="btn__icon" />
						</BtnElement>
					</BtnContainer>
				);
			} else {
				return (
					<BtnContainer color={color}>
						<span className="btn__text">{text}</span>
						<Icon icon={icon} className="btn__icon" />
					</BtnContainer>
				);
			}
		}
	} else {
		if (color === "blue") {
			if (typeOfButton === "button") {
				return (
					<SecBtnContainer color={color}>
						<SecBtnElement color={color} onClick={onClick}>
							{text}
							<Icon icon={icon} className="btn__icon" />
						</SecBtnElement>
					</SecBtnContainer>
				);
			} else {
				return (
					<SecBtnContainer color={color}>
						<span className="btn__text">{text}</span>
						<Icon icon={icon} className="btn__icon" />
					</SecBtnContainer>
				);
			}
		} else {
			if (typeOfButton === "button") {
				return (
					<SecBtnContainer color={color}>
						<SecBtnElement color={color} onClick={onClick}>
							{text}
							<Icon icon={icon} className="btn__icon" />
						</SecBtnElement>
					</SecBtnContainer>
				);
			} else {
				return (
					<SecBtnContainer color={color}>
						<span className="btn__text">{text}</span>
						<Icon icon={icon} className="btn__icon" />
					</SecBtnContainer>
				);
			}
		}
	}
}
export default Button;
