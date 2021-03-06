import React, { useState } from "react";
import styled from "styled-components";
import Image from "next/image";
import { Icon } from "@iconify/react";
import Button from "../button/Button";
import { device } from "../../styles/breakpoints";
import axios from "axios";
import validateEmail from "../../utils/validate/email";
import { BASE_URL } from "../../utils/config/config";

const EnquirySectionContainer = styled.div`
	position: relative;
	height: 570px;
	@media ${device.tablet} {
		height: 624px;
	}
`;

const ImageContainer = styled.div`
	position: absolute;
	height: 100%;
	width: 100%;
	top: 0;
	left: 0;
	z-index: -100;
`;

const DataContainer = styled.div`
	max-width: 1440px;
	height: 100%;
	margin: 0 auto;
	display: flex;
	justify-content: flex-end;
	align-items: center;
	padding: var(--size-md);
	@media ${device.tablet} {
		align-items: end;
	}
`;
const BoxDataContainer = styled.div`
	width: 100%;
	max-width: 562px;
	min-height: 491px;
	background-color: var(--color-black-90);
	border-radius: 15px;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	gap: 32px;
	padding: 10px;
	@media ${device.tablet} {
		padding: var(--size);
	}
	.box__title {
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
	}
	.success {
		text-align: center;
		color: white;
		background-color: green;
		padding: var(--size-sm);
		border-radius: 10px;
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
		color: var(--color-primary);
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
function DetailsEnquirySection({ data }) {
	const initialValues = {
		name: "",
		email: "",
		message: "",
	};
	const [userData, setUserData] = useState(initialValues);
	const [errorData, setErrorData] = useState({});
	const [confirmationMessage, setConfirmationMessage] = useState("");

	const handleChange = (e) => {
		const { name, value } = e.target;
		setUserData({ ...userData, [name]: value });
	};
	const handleSubmit = async (e) => {
		e.preventDefault();
		const errorData2 = validate(userData);
		setErrorData(errorData2);

		if (Object.keys(errorData2).length === 0) {
			try {
				let newMessage = {
					name: userData.name,
					email: userData.email,
					message: userData.message,
					hotel_name: data.Title,
				};
				let response = await axios.post(
					`${BASE_URL}/hotel-messages`,
					newMessage
				);
				setUserData(initialValues);
				setConfirmationMessage("Your message was sent successfully");
				setTimeout(() => {
					{
						setConfirmationMessage("");
					}
				}, 3000);
			} catch (err) {
				console.log("err", err);
			}
		}
	};
	const validate = (values) => {
		const errors = {};
		if (!values.name) {
			errors.name = "The name required";
		}
		if (!values.email || !validateEmail(values.email)) {
			errors.email =
				"Invalid email format, please introduce a valid email address";
		}

		if (!values.message) {
			errors.message = "Meassage is required";
		}

		return errors;
	};
	return (
		<EnquirySectionContainer>
			<ImageContainer>
				<Image
					src="/images/enquiry_section.jpg"
					layout="fill"
					alt="image"
					objectFit="cover"
				/>
			</ImageContainer>
			<DataContainer>
				<BoxDataContainer>
					<h2 className="box__title">Have some questions?</h2>
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

									{errorData.name && (
										<div className="error">
											{errorData.name}
										</div>
									)}
								</InputContainer>
								<InputContainer>
									<Icon
										icon="ant-design:mail-outlined"
										className="text-input__icon"
									/>
									<input
										className="text-input text-input-with-icon"
										name="email"
										type="text"
										placeholder="Email"
										onChange={handleChange}
										value={userData.email}
									/>

									{errorData.email && (
										<div className="error">
											{errorData.email}
										</div>
									)}
								</InputContainer>
							</div>
							<TextAreaContainer className="text-area-container">
								{/* <InputWithError validate={() => userData.message.length > 5} /> */}
								<textarea
									className="text-box-input"
									name="message"
									onChange={handleChange}
									value={userData.message}
								/>
								{errorData.message && (
									<div className="error">
										{errorData.message}
									</div>
								)}
							</TextAreaContainer>
							<Button
								text="Contact Hotel"
								btnCategory="primary"
								color="yellow"
								typeOfButton="button"
								type="submit"
							></Button>
							{confirmationMessage && (
								<div className="success">
									{confirmationMessage}
								</div>
							)}
						</FormContainer>
					</form>
				</BoxDataContainer>
			</DataContainer>
		</EnquirySectionContainer>
	);
}

export default DetailsEnquirySection;
