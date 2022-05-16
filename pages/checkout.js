import React from "react";
import styled from "styled-components";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import Image from "next/image";
import { InputDate, InputOption } from "../components/inputs/Inputs";
import { Icon } from "@iconify/react";

import { Formik, Form, useField } from "formik";
import * as Yup from "yup";
import Button from "../components/button/Button";
import { device } from "../styles/breakpoints";

const CheckoutSectionContainer = styled.div`
	display: flex;
`;
const SummaryContainer = styled.div`
	width: 50%;
	padding: var(--size-xl) var(--size-md);
	display: flex;
	flex-direction: column;
	.summary__title {
		font-size: var(--font-size-lg);
		font-weight: 600;
		max-width: 400px;
	}
`;
const SummaryCard = styled.div`
	border: solid 1px rgba(0, 0, 0, 0.3);
	border-radius: 10px;
	max-width: 500px;
	width: 100%;
	height: 694px;
	align-self: center;
	margin: var(--size-md) 0;
	padding: var(--size-md);
	display: flex;
	flex-direction: column;
	justify-content: space-around;

	.summary__top-container {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	.card__title {
		font-size: var(--font-size-lg);
		color: var(--color-secondary);
	}
	.card__icon {
		font-size: 40px;
		color: var(--color-tertiary);
	}
	.summary__image-container {
		position: relative;
		width: 100%;
		max-width: 320px;
		height: 200px;
		align-self: center;
		border-radius: 15px;
		overflow: hidden;
	}
	.summary__inputs-container {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-around;
		gap: 16px;
	}
	.summary__total-container {
		display: flex;
		flex-direction: column;
		gap: 16px;
	}
	.summary__line {
		width: 100%;
		height: 1px;
		background-color: rgba(0, 0, 0, 0.3);
	}
	.summary__data-container {
		display: flex;
		justify-content: space-between;
		padding: 0 var(--size-md);
		align-items: center;
	}
	.summary__total-text {
		font-size: var(--font-size);
		font-weight: 600;
	}
	.summary__total-price {
		font-size: var(--font-size-md);
		font-weight: 700;
	}
`;
const MethodPaidContainer = styled(SummaryContainer)`
	width: 50%;
	background-color: var(--color-secondary);
	.summary__title {
		font-size: var(--font-size-lg);
		font-weight: 600;
		max-width: 400px;
	}
`;

const PaymentCard = styled(SummaryCard)``;

const FormContainer = styled.div`
	display: flex;
	flex-direction: column;
	gap: var(--size-md);

	@media ${device.tablet} {
		padding: 0 var(--size);
	}
	.inputs-container {
		display: flex;
		flex-direction: column;
		gap: 16px;
		@media ${device.tablet} {
			flex-wrap: wrap;
			justify-content: center;
		}
	}

	.btn-container {
		width: 100%;
		height: 64px;

		@media ${device.tablet} {
			max-width: 300px;
		}
	}
`;
const InputContainer = styled.div`
	width: 100%;
	position: relative;

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

function Checkout() {
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
	return (
		<>
			<Header></Header>
			<main>
				<CheckoutSectionContainer>
					<SummaryContainer>
						<h1 className="summary__title">
							Summary of your reservation
						</h1>
						<SummaryCard>
							<div className="summary__top-container">
								<h2 className="card__title">Hotel Scandic</h2>
								<Icon
									icon="clarity:window-close-line"
									className="card__icon"
								/>
							</div>
							<div className="summary__image-container">
								<Image
									src="/images/card-img.jpg"
									layout="fill"
									objectFit="cover"
								></Image>
							</div>
							<div className="summary__inputs-container">
								<InputDate labelMessage="Check in: "></InputDate>
								<InputDate labelMessage="Check out: "></InputDate>
								<InputOption labelMessage="Guest: "></InputOption>
								<InputOption labelMessage="Rooms: "></InputOption>
							</div>
							<div className="summary__total-container">
								<div className="summary__data-container">
									<span>Subtotal: </span>
									<span>price Nok</span>
								</div>
								<div className="summary__data-container">
									<span>VAT(21%): </span>
									<span>price*21% Nok</span>
								</div>
								<div className="summary__line"></div>
								<div className="summary__data-container">
									<span className="summary__total-text">
										Total Booking:
									</span>
									<span className="summary__total-price">
										Total nok
									</span>
								</div>
							</div>
						</SummaryCard>
					</SummaryContainer>
					<MethodPaidContainer>
						<div>
							<h2 className="summary__title">Payment Details</h2>
							<p>
								Complete your purchase by providing your payment
								details
							</p>
						</div>
						<PaymentCard>
							<Formik
								initialValues={{
									name: "",
									lastName: "",
									email: "",
									message: "",
									picked: "",
									validateOnMount: true,
								}}
								validationSchema={Yup.object({
									name: Yup.string()
										.min(
											3,
											"Must be 3 characters as minimun"
										)
										.required("Required"),

									email: Yup.string()
										.email("Invalid email address")
										.required("Required"),

									message: Yup.string()
										.min(
											10,
											"Must be 10 characters as minimun"
										)
										.required("Required"),
								})}
								onSubmit={(values, { setSubmitting }) => {
									console.log(values);
									handleSubmit(values);
									setTimeout(() => {
										alert(JSON.stringify(values, null, 2));
										setSubmitting(false);
									}, 400);
								}}
							>
								<Form>
									<FormContainer>
										<div className="inputs-container">
											<label htmlFor="name">
												Email address:
											</label>
											<InputContainer>
												<MyTextInput
													name="email"
													type="email"
													placeholder="Email"
													icon="ant-design:mail-outlined"
												/>
											</InputContainer>
										</div>
										<div className="inputs-container">
											<label> Card details:</label>
											<InputContainer>
												<MyTextInput
													name="cardNumber"
													type="tel"
													placeholder="xxxx xxxx xxxx xxxx"
													icon="ant-design:credit-card-filled"
												/>
											</InputContainer>
										</div>
										<div className="inputs-container">
											<InputContainer>
												<MyTextInput
													name="name"
													type="text"
													placeholder="MM/YY"
												/>
											</InputContainer>
											<InputContainer>
												<MyTextInput
													name="name"
													type="text"
													placeholder="CVC"
												/>
											</InputContainer>
										</div>
										<div className="inputs-container">
											<InputContainer>
												<MyTextInput
													name="name"
													type="text"
													placeholder="Cardholder name"
												/>
											</InputContainer>
										</div>
										<div className="btn-container">
											<Button
												text="Confirm and pay"
												btnCategory="primary"
												color="yellow"
												typeOfButton="button"
												type="submit"
												disabled={!Formik.isValid}
											></Button>
										</div>
									</FormContainer>
								</Form>
							</Formik>
						</PaymentCard>
					</MethodPaidContainer>
				</CheckoutSectionContainer>
			</main>
			<Footer />
		</>
	);
}

export default Checkout;
