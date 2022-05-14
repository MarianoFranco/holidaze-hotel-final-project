import React from "react";
import styled from "styled-components";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import Image from "next/image";
import { Icon } from "@iconify/react";

const ContactContainer = styled.div`
	min-height: 90vh;
	position: relative;
	display: flex;
	gap: 24px;
	padding: var(--size-lg);
	max-width: 1440px;
	margin: auto;
	align-items: center;
`;

const ImageBackground = styled(Image)`
	z-index: -100;
`;

const ContactData = styled.div`
	width: 50%;
	min-height: 80vh;
	display: flex;
	flex-direction: column;
	justify-content: space-around;
	.contact__title {
		font-size: var(--font-size-xxl);
		max-width: 471px;
		color: var(--color-secondary);
	}
	.contact__subtitle {
		font-size: var(--font-size-md);
		font-family: var(--font-body);
		color: var(--color-black);
		max-width: 517px;
	}
	.contact__info {
		display: flex;
		flex-direction: column;
		gap: 48px;
	}
	.data-container {
		display: flex;
		gap: 24px;
		align-items: center;
	}
	.data__icon {
		font-size: 40px;
		color: var(--color-primary);
	}
	.data__text {
		color: var(--color-white);
		font-size: var(--font-size-md);
		font-family: var(--font-headings);
	}
`;

const ContactForm = styled.div`
	width: 50%;
	max-width: 600px;
	height: 670px;
	border: solid 1px red;
`;
function Contact() {
	return (
		<>
			<Header />
			<main>
				<ImageBackground
					src="/images/contact_portrait.jpg"
					layout="fill"
					objectFit="cover"
				/>
				<ContactContainer>
					<ContactData>
						<h1 className="contact__title">Contact us</h1>
						<p className="contact__subtitle">
							Got a question? We would love to hear from you. Send
							us a message and we will respond as soon as possible
						</p>
						<div className="contact__info">
							<div className="data-container">
								<Icon
									icon="ant-design:phone-filled"
									className="data__icon"
								/>
								<span className="data__text">
									+47 326 329 222
								</span>
							</div>
							<div className="data-container">
								<Icon
									icon="clarity:email-solid"
									className="data__icon"
								/>
								<span className="data__text">
									holidaze@holidaze.com
								</span>
							</div>
							<div className="data-container">
								<Icon
									icon="carbon:location-filled"
									className="data__icon"
								/>
								<span className="data__text">
									123 Central Street 1879 Bergen
								</span>
							</div>
						</div>
					</ContactData>
					<ContactForm>Have some questions</ContactForm>
				</ContactContainer>
			</main>
			<Footer />
		</>
	);
}

export default Contact;
