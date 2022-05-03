import React, { useState } from "react";
import styled from "styled-components";
import Navigation from "../navigation/Navigation";
import Image from "next/image";
import Link from "next/link";
import { device } from "../../styles/breakpoints";
import { createStyles, Burger, Transition, Paper } from "@mantine/core";
import { useBooleanToggle } from "@mantine/hooks";

const HeaderElement = styled.header`
	background-color: var(--color-secondary);
`;
const HeaderContainer = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin: auto;
	height: 100px;
	padding: var(--size-md);
	max-width: 1440px;
	width: 100%;

	.header__logo-contaner{
		z-index:30;
	}
	.header__navigation-container {
		display: flex;
		align-items: center;
		justify-content: space-around;

	
	}
`;

const ButtonContainer = styled.div`
	padding: var(--size-md);
	width: 114px;
	height: 53px;
	display: flex;
	justify-content: center;
	align-items: center;
	background-color: var(--color-tertiary);
	border-radius: 10px;
`;
const LoginLink = styled.a`
	color: var(--color-white);
	font-weight: 500;
	font-size: var(--font-size-md);
`;

const BurgerIcon = styled(Burger)`
	display: none;
	@media ${device.laptop} {
		display: block;
		z-index: 20;
	}
`;
const ButtonsGroup = styled.div`
	display: flex;
	align-items: center;
	@media ${device.laptop} {
		display: ${(props) => (props.opened ? "flex" : "none")};	
		flex-direction: column;		
		align-items: center;
		justify-content: center;
		position: absolute;
		top:0;
		left:0;
		width:100%;
		height:100%;
		z-index: 20;
		background-color: var(--color-secondary)
	}
`;



function Header() {
	const [opened, toggleOpened] = useBooleanToggle(false);
	
	return (
		<>
			<HeaderElement>
				<HeaderContainer>
					<div className="header__logo-contaner">
						<Link href="/">
							<a>
								<Image
									src="/images/holidaze-logo.png"
									width="204px"
									height="32px"
									alt="logo-img"
								></Image>
							</a>
						</Link>
					</div>
					<div className="header__navigation-container">
						<ButtonsGroup opened={opened}>
							<Navigation />
							<ButtonContainer>
								<Link href="/" passHref>
									<LoginLink>Login</LoginLink>
								</Link>
							</ButtonContainer>
						</ButtonsGroup>
						<BurgerIcon
							opened={opened}
							onClick={() => toggleOpened()}
						/>					
					</div>
				</HeaderContainer>
			</HeaderElement>
		</>
	);
}

export default Header;
