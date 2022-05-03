import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import styled from "styled-components";
import { device } from "../../styles/breakpoints";
const NavBar = styled.nav`
	.nav__list-container {
		display: flex;
		margin: 0 var(--size-md);
		@media ${device.laptop} {			
			flex-direction: column;
		}
	}
	.nav__list {
		list-style: none;
	}
	
`;
const StyledLink = styled.a`
	color: ${(props) =>
		props.href === props.pathName
			? "var(--color-primary)"
			: "var(--color-white)"};
	font-size: var(--size-md);
	font-weight: 500;
	margin: 0 var(--size);
	position: relative;
	::before {
		content: "";
		position: absolute;
		top: 33px;
		height: 2px;
		width: ${(props) => (props.href === props.pathName ? "100%" : "0")};
		background-color: var(--color-primary);
		left: 0;
	}
	:hover {
		color: var(--color-primary);
	}
	:hover::before {
		content: "";
		position: absolute;
		top: 33px;
		height: 2px;
		width: 100%;
		background-color: var(--color-primary);
		left: 0;
		transition: 0.3s;
	}
`;

const navList = [
	{
		path: "/",
		title: "Home",
	},
	{
		path: "/hotels_page",
		title: "Our Hotels",
	},
	{
		path: "/contact",
		title: "Contact us",
	},
];

function Navigation() {
	const router = useRouter();
	return (
		<>
			<NavBar>
				<ul className="nav__list-container">
					{navList.map(({ path, title }) => (
						<li key={title} className="nav__list">
							<Link href={path} passHref>
								<StyledLink pathName={router.pathname}>
									{title}
								</StyledLink>
							</Link>
						</li>
					))}
				</ul>
			</NavBar>
		</>
	);
}

export default Navigation;
