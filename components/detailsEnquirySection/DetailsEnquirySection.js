import React from "react";
import styled from "styled-components";
import Image from "next/image";
import { Icon } from "@iconify/react";
import * as Yup from "yup";
import Button from "../button/Button";
import { device } from "../../styles/breakpoints";

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
	height: 491px;
	background-color: var(--color-black-90);
	border-radius: 15px;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	gap: 32px;
	@media ${device.tablet} {
		height: 426px;
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
function DetailsEnquirySection() {
	const handleChange = (e) => {
		//e.preventDefault();
		const { name, value } = e.target;

		setUserData({ ...userData, [name]: value });
	};
	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			let newMessage = {
				name: name.value,
				email: email.value,
				message: message.value,
			};
			let response = await axios.post(
				`http://localhost:1337/messages`,
				newProduct
			);
			console.log(response);
		} catch (err) {
			console.log("err", err);
		}
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
									/>

									{false && (
										<div className="error">error</div>
									)}
								</InputContainer>
								<InputContainer>
									<Icon
										icon="ant-design:mail-outlined"
										className="text-input__icon"
									/>
									<input
										className="text-input text-input-with-icon"
										name="identifier"
										type="email"
										placeholder="Email"
										onChange={handleChange}
									/>

									{false && (
										<div className="error">error</div>
									)}
								</InputContainer>
							</div>
							<TextAreaContainer className="text-area-container">
								<textarea className="text-box-input" />
							</TextAreaContainer>
							<Button
								text="Contact Hotel"
								btnCategory="primary"
								color="yellow"
								typeOfButton="button"
								type="submit"
							></Button>
						</FormContainer>
					</form>
				</BoxDataContainer>
			</DataContainer>
		</EnquirySectionContainer>
	);
}

export default DetailsEnquirySection;