import React from "react";
import styled from "styled-components";
import Image from "next/image";
import Button from "../button/Button";
import Link from "next/link";
import { device } from "../../styles/breakpoints";

const ContactSectionWrapper = styled.div`
	position: relative;
`;
const ImageContainer = styled.div`
	min-height: 624px;
	position: absolute;
	top: 0;
	width: 100%;
	z-index: -100;
	@media ${device.laptop} {
		min-height: 681px;
	}
`;

const ContactSectionContainer = styled.div`
	position: relative;
	min-height: 624px;
	margin: auto;
	margin-bottom: var(--size-xl);
	display: flex;
	align-items: center;
	justify-content: flex-end;
	max-width: 1440px;

	@media ${device.laptop} {
		min-height: 681px;
		margin-bottom: 0;
		justify-content: center;
	}
`;

const TextContainer = styled.div`
	max-width: 569px;
	width: 100%;
	min-height: 520px;
	background-color: rgba(0, 0, 0, 0.8);
	border-radius: 15px;
	margin: 0 var(--size-xl);
	padding: var(--size-lg);
	display: flex;
	flex-direction: column;
	justify-content: space-around;

	@media ${device.laptop} {
		margin: 0;
		align-items: center;
		padding: var(--size-sm);
		min-height: 397px;
	}
`;
const Title = styled.h2`
	font-size: var(--font-size-xl);
	color: var(--color-primary);
	font-weight: 600;
	@media ${device.laptop} {
		font-size: var(--font-size-lg);
		text-align: center;
	}
`;
const ButtonContainer = styled.div`
	width: 264px;
	height: 72px;
`;
function IndexContactSection() {
	return (
		<ContactSectionWrapper>
			<ImageContainer>
				<Image
					src="/images/contact-section.jpg"
					layout="fill"
					alt="contact section image"
					objectFit="cover"
					objectPosition="center center"
				></Image>
			</ImageContainer>
			<ContactSectionContainer>
				<TextContainer>
					<Title>Do you have any questions?</Title>
					<ButtonContainer>
						<Link href="/" passHref>
							<a>
								<Button
									btnCategory="secondary"
									typeOfButton="link"
									color="yellow"
									text="Contact us"
									icon="fluent:contact-card-32-regular"
								></Button>
							</a>
						</Link>
					</ButtonContainer>
				</TextContainer>
			</ContactSectionContainer>
		</ContactSectionWrapper>
	);
}

export default IndexContactSection;
