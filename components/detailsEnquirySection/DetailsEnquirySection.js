import React from "react";
import styled from "styled-components";
import Image from "next/image";
import { Icon } from "@iconify/react";
import { Formik, Form, useField } from "formik";
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
function DetailsEnquirySection({ data }) {
	const MyTextInput = ({ label, ...props }) => {
		// useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
		// which we can spread on <input>. We can use field meta to show an error
		// message if the field is invalid and it has been touched (i.e. visited)
		const [field, meta] = useField(props);
		console.log(props.icon);
		if (props.icon) {
			return (
				<>
					<Icon icon={props.icon} className="text-input__icon" />
					<input
						className="text-input text-input-with-icon"
						{...field}
						{...props}
					/>
					{meta.touched && meta.error ? (
						<div className="error">{meta.error}</div>
					) : null}
				</>
			);
		} else {
			return (
				<>
					<input className="text-input" {...field} {...props} />
					{meta.touched && meta.error ? (
						<div className="error">{meta.error}</div>
					) : null}
				</>
			);
		}
	};
	const MyTextAreaInput = ({ label, ...props }) => {
		// useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
		// which we can spread on <input>. We can use field meta to show an error
		// message if the field is invalid and it has been touched (i.e. visited)
		const [field, meta] = useField(props);
		console.log(props);
		return (
			<>
				<textarea className="text-box-input" {...field} {...props} />
				{meta.touched && meta.error ? (
					<div className="error">{meta.error}</div>
				) : null}
			</>
		);
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
					<Formik
						initialValues={{
							name: "",
							email: "",
							message: "",
						}}
						validationSchema={Yup.object({
							name: Yup.string()
								.min(3, "Must be 3 characters as minimun")
								.required("Required"),

							email: Yup.string()
								.email("Invalid email address")
								.required("Required"),

							message: Yup.string()
								.min(10, "Must be 10 characters as minimun")
								.required("Required"),
						})}
						onSubmit={(values, { setSubmitting }) => {
							setTimeout(() => {
								alert(JSON.stringify(values, null, 2));
								setSubmitting(false);
							}, 400);
						}}
					>
						<Form>
							<FormContainer>
								<div className="inputs-container">
									<InputContainer>
										<MyTextInput
											label="First Name: "
											name="name"
											type="text"
											placeholder="Name"
										/>
									</InputContainer>
									<InputContainer>
										<MyTextInput
											label="Email:  "
											name="email"
											type="email"
											placeholder="Email"
											icon="ant-design:mail-outlined"
										/>
									</InputContainer>
								</div>
								<TextAreaContainer className="text-area-container">
									<MyTextAreaInput
										name="message"
										placeholder="Your questions here..."
									/>
								</TextAreaContainer>
								<Button
									text="Contact Hotel"
									btnCategory="primary"
									color="yellow"
									typeOfButton="button"
									type="submit"
								></Button>
							</FormContainer>
						</Form>
					</Formik>
				</BoxDataContainer>
			</DataContainer>
		</EnquirySectionContainer>
	);
}

export default DetailsEnquirySection;
