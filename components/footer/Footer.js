import React from "react";
import styled from "styled-components";
import Link from "next/link";
import { Icon } from "@iconify/react";
import { device } from "../../styles/breakpoints";

const FooterContainer = styled.div`
	background-color: var(--color-secondary);
`;

const ContentWrapper = styled.div`
	width: 100%;
	max-width: 1440px;

	display: flex;
	justify-content: space-evenly;

	margin: auto;

	@media ${device.laptop} {
		flex-direction: column-reverse;

		padding: var(--size-xl) var(--size-xl) 0;
	}

	.contact__text-container {
		margin: var(--size-xl) 0 0;

		@media ${device.laptop} {
			margin: var(--size-lg) 0 0;
		}
	}
	.contact__title {
		color: var(--color-white);
		font-size: var(--font-size-md);
		font-weight: 600;
		margin-bottom: var(--size-md);
	}
	.contact__list-container {
		list-style: none;
	}

	.contact__text,
	.contact__list {
		color: var(--color-primary);
		font-family: var(--font-body);
		font-size: var(--font-size);
		margin: var(--size-md) 0;
	}
	.contact__icons-container {
		width: 228px;
		max-width: 228px;
		min-height: 55px;
		background-color: var(--color-tertiary);
		border-radius: 10px;
		display: flex;
		align-items: center;
		justify-content: space-evenly;
	}
`;

const SocialIcons = styled(Icon)`
	font-size: var(--font-size-md);
	color: var(--color-white);
`;
const ContactLine = styled.div`
	width: 95%;
	max-width: 1247px;
	height: 1px;
	background-color: var(--color-primary);
	margin: var(--size-md) auto;
	opacity: 0.3;
	@media ${device.laptop} {
		margin: var(--size-md) auto;
	}
`;

const Copyright = styled.p`
	display: flex;
	justify-content: center;
	color: var(--color-white);
	padding: var(--size-sm);

	@media ${device.laptop} {
		text-align: center;
	}
`;
function Footer() {
	return (
		<>
			<FooterContainer>
				<ContentWrapper>
					<div className="contact__text-container">
						<h3 className="contact__title">Privacy & Cookies</h3>
						<ul className="contact__list-container">
							<li className="contact__list">
								<Link href="/" passHref>
									<a className="contact__text">
										Safety information
									</a>
								</Link>
							</li>
							<li className="contact__list">
								<Link href="/" passHref>
									<a className="contact__text">
										Cancellation options
									</a>
								</Link>
							</li>
						</ul>
					</div>
					<div className="contact__text-container">
						<h3 className="contact__title">Support</h3>
						<ul className="contact__list-container">
							<li className="contact__list">
								<Link href="/" passHref>
									<a className="contact__text">FAQ</a>
								</Link>
							</li>
							<li className="contact__list">
								<Link href="/" passHref>
									<a className="contact__text">Contact</a>
								</Link>
							</li>
							<li className="contact__list">
								<Link href="/" passHref>
									<a className="contact__text">
										Our COVID-19 Response
									</a>
								</Link>
							</li>
						</ul>
					</div>
					<div className="contact__text-container">
						<h3 className="contact__title">Contact us</h3>
						<p className="contact__text">+880 12345 465 44</p>
						<p className="contact__text">holidaze@holidaze.com</p>
						<p className="contact__text">1684 Upton Avenue</p>
					</div>
					<div className="contact__text-container">
						<h3 className="contact__title">Follow us</h3>
						<div className="contact__icons-container">
							<SocialIcons icon="foundation:social-facebook" />
							<SocialIcons icon="foundation:social-github" />
							<SocialIcons icon="foundation:social-linkedin" />
							<SocialIcons icon="typcn:social-twitter" />
							<SocialIcons icon="typcn:social-instagram" />
						</div>
					</div>
				</ContentWrapper>
				<ContactLine></ContactLine>
				<Copyright>
					© 2022 - 2022 www.holidaze.com - All Rights Reserved.
					Website made for educational porporse
				</Copyright>
			</FooterContainer>
		</>
	);
}

export default Footer;
