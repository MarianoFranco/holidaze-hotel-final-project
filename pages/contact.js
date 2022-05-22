import React, { useState } from "react";
import styled from "styled-components";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import Image from "next/image";
import { Icon } from "@iconify/react";
import { Formik, Form, useField } from "formik";
import * as Yup from "yup";
import Button from "../components/button/Button";
import { device } from "../styles/breakpoints";
import axios from "axios";
import nookies, { parseCookies } from "nookies";
const Main = styled.main`
	position: relative;
`;

const ContactContainer = styled.div`
	position: relative;
	display: flex;
	gap: 24px;
	padding: var(--size-lg);
	max-width: 1440px;
	margin: auto;
	align-items: center;
	@media ${device.tablet} {
		flex-direction: column;

		padding: var(--size-md);
	}
`;
const ImageContainer = styled.div`
	width: 100%;
	height: 100%;
	position: absolute;
	top: 0;
	left: 0;
	z-index: -100;
	@media ${device.tablet} {
		height: 744px;
	}
`;

const ContactData = styled.div`
	width: 50%;
	min-height: 80vh;
	display: flex;
	flex-direction: column;
	justify-content: space-around;
	@media ${device.tablet} {
		width: 100%;
	}
	.contact__title {
		font-size: var(--font-size-xxl);
		max-width: 471px;
		color: var(--color-secondary);
		@media ${device.tablet} {
			font-size: var(--font-size-xl);
		}
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
		@media ${device.tablet} {
			gap: 32px;
		}
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
		@media ${device.tablet} {
			font-size: var(--font-size);
		}
	}
`;

const ContactForm = styled.div`
	width: 50%;
	max-width: 600px;
	height: 670px;
	padding: var(--size-lg);
	background-color: var(--color-black-90);
	border-radius: 15px;
	box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.4);
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-around;
	@media ${device.tablet} {
		width: 100%;
		padding: var(--size-sm);
		height: 696px;
	}
	.form__title {
		color: var(--color-primary);
		font-size: var(--font-size-lg);
		@media ${device.tablet} {
			font-size: var(--font-size-md);
		}
	}
`;
const FormContainer = styled.div`
	display: flex;
	flex-direction: column;
	gap: var(--size-md);

	@media ${device.tablet} {
		padding: 0 var(--size);
	}
	.inputs-container {
		display: flex;
		gap: 16px;
		@media ${device.tablet} {
			flex-wrap: wrap;
			justify-content: center;
		}
	}
	.input-radio-container {
		display: flex;
		flex-direction: column;
		gap: 16px;
		color: var(--color-primary);
		@media ${device.tablet} {
			align-items: center;
		}
	}
	.btn-container {
		align-self: end;
		width: 100%;
		max-width: 267px;
		height: 74px;
		@media ${device.tablet} {
			max-width: 300px;
		}
	}
`;
const InputContainer = styled.div`
	width: 100%;
	max-width: 200px;
	position: relative;
	display: flex;
	flex-direction: column;
	gap: 8px;
	.text-input {
		background: none;
		border: solid 1px var(--color-primary);
		width: 100%;
		height: 44px;
		padding-left: var(--size);
		border-radius: 10px;
		font-family: var(--font-headings);
	}
	.text-input-with-icon {
		padding-left: 50px;
	}

	.text-input__icon {
		position: absolute;
		left: 16px;
		top: 10px;
		font-size: 24px;
		color: var(--color-primary);
	}
	.error {
		background-color: #fe0000;
		border-radius: 10px;
		opacity: 0.7;
		color: var(--color-white);
		padding: var(--size-sm);
		font-family: var(--font-headings);
		font-size: var(--font-size);
		font-weight: 500;
	}
`;
const RadioInputContainer = styled.div`
	color: var(--color-primary);

	gap: 16px 42px;
	display: flex;
	.radio-input {
		display: flex;
		gap: 16px;
		align-items: center;
	}
`;
const TextAreaContainer = styled.div`
	display: flex;
	flex-direction: column;
	gap: 16px;
	.text-box-input {
		width: 100%;
		min-height: 140px;
		background: none;
		border-radius: 10px;
		padding: var(--size);
		font-family: var(--font-headings);
		border: solid 1px var(--color-primary);
	}
	.error {
		background-color: #fe0000;
		border-radius: 10px;
		opacity: 0.7;
		color: var(--color-white);
		padding: var(--size-sm);
		font-family: var(--font-headings);
		font-size: var(--font-size);
		font-weight: 500;
	}
`;

function Contact({ user, token, jwt }) {
	const [userData, setUserData] = useState({
		name: "",
		lastName: "",
		email: "",
		message: "",
		phone: "",
		client: "Yes",
		message: "",
	});
	const [errorData, setErrorData] = useState({
		name: "",
		lastName: "",
		email: "",
		message: "",
		phone: "",
		client: "Yes",
		message: "",
	});

	const [confirmationMessage, setConfirmationMessage] = useState("");

	const handleChange = (e) => {
		//e.preventDefault();
		const { name, value } = e.target;

		setUserData({ ...userData, [name]: value });
	};
	const handleSubmit = async (e) => {
		e.preventDefault();
		if (userData.message.length < 5) {
			setErrorData({
				message: "Your message needs to be at least 5 characters",
			});
		} else {
			setErrorData({
				message: "",
			});
		}
		try {
			let newMessage = {
				name: userData.name,
				last_name: userData.lastName,
				email: userData.email,
				phone: userData.phone,
				already_client: userData.client === "Yes" ? true : false,
				message: userData.message,
			};
			let response = await axios.post(
				`http://localhost:1337/messages`,
				newMessage
			);
			setUserData({ name: "", email: "", message: "" });
			setConfirmationMessage("Your message was sent successfully");
		} catch (err) {
			console.log("err", err);
		}
	};
	console.log("token", token);
	return (
		<>
			<Header user={token} />
			<Main>
				<ImageContainer>
					<Image
						src="/images/contact_portrait.jpg"
						layout="fill"
						objectFit="cover"
						alt="image"
					/>
				</ImageContainer>
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
					<ContactForm>
						<h2 className="form__title">Have some questions</h2>
						<form onSubmit={handleSubmit}>
							<FormContainer>
								<div className="inputs-container">
									<InputContainer>
										<input
											name="name"
											type="text"
											placeholder="Name"
											onChange={handleChange}
											className="text-input"
											value={userData.name}
										/>

										{errorData.message && (
											<div className="error">
												{errorData.message}
											</div>
										)}
									</InputContainer>
									<InputContainer>
										<input
											name="lastName"
											type="text"
											placeholder="Last name"
											onChange={handleChange}
											className="text-input"
											value={userData.lastName}
										/>

										{false && (
											<div className="error">error</div>
										)}
									</InputContainer>
								</div>
								<div className="inputs-container">
									<InputContainer>
										<Icon
											icon="ant-design:mail-outlined"
											className="text-input__icon"
										/>
										<input
											className="text-input text-input-with-icon"
											name="email"
											type="email"
											placeholder="Email"
											onChange={handleChange}
											value={userData.email}
										/>

										{false && (
											<div className="error">error</div>
										)}
									</InputContainer>
									<InputContainer>
										<Icon
											icon="ant-design:phone-outlined"
											className="text-input__icon"
										/>
										<input
											name="phone"
											type="text"
											placeholder="Telephone"
											onChange={handleChange}
											className="text-input text-input-with-icon"
											value={userData.phone}
										/>

										{false && (
											<div className="error">error</div>
										)}
									</InputContainer>
								</div>
								<div className="input-radio-container">
									<p className="radio__text-message">
										Are you already a client of us?
									</p>
									<RadioInputContainer>
										<div>
											<label className="radio-input">
												<input
													type="radio"
													value="Yes"
													name="client"
													onChange={handleChange}
												/>
												<label className="text-input">
													Yes
												</label>
											</label>
										</div>
										<div>
											<label className="radio-input">
												<input
													type="radio"
													value="No"
													name="client"
													onChange={handleChange}
												/>
												<label className="text-input">
													No
												</label>
											</label>
										</div>
									</RadioInputContainer>
								</div>
								<TextAreaContainer className="text-area-container">
									<textarea
										className="text-box-input"
										name="message"
										placeholder="Write your message here..."
										value={userData.message}
										onChange={handleChange}
									/>
									{false && (
										<div className="error">
											{meta.error}
										</div>
									)}
								</TextAreaContainer>
								<div className="btn-container">
									<Button
										text="Send Message"
										btnCategory="primary"
										color="yellow"
										typeOfButton="button"
										type="submit"
									></Button>
								</div>
								<div>{confirmationMessage}</div>
							</FormContainer>
						</form>
					</ContactForm>
				</ContactContainer>
			</Main>
			<Footer />
		</>
	);
}
export function getServerSideProps({ req, res, ctx }) {
	return { props: { token: req.cookies.jwt || "" } };
}
export default Contact;
