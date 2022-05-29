import React, { useState } from "react";
import styled from "styled-components";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import Image from "next/image";
import { InputDate, InputOption } from "../../components/inputs/Inputs";
import { Icon } from "@iconify/react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import Button from "../../components/button/Button";
import { device } from "../../styles/breakpoints";
import { BASE_URL } from "../../utils/config/config";
import { useRouter } from "next/router";
import dayjs from "dayjs";
import { parseCookies } from "nookies";
const CheckoutSectionContainer = styled.div`
	display: flex;
	@media ${device.tablet} {
		flex-direction: column;
	}
`;
const SummaryContainer = styled.div`
	width: 50%;
	padding: var(--size-xl) var(--size-md);
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	@media ${device.tablet} {
		width: 100%;
		padding: var(--size-lg) var(--size-sm);
		min-height: 500px;
	}
	.summary__title {
		font-size: var(--font-size-lg);
		font-weight: 600;
		max-width: 400px;
		margin: 0 var(--size-md);
	}
`;

const Message = styled.div`
	display: ${(props) => (props.deleteCard ? "none" : "block")};
	align-self: center;
	margin: auto;
	font-size: var(--font-size-md);
	font-weight: 500;
`;
const SummaryCard = styled.div`
	/* display: ${(props) => (props.deleteCard ? "none" : "block")}; */

	border: solid 1px rgba(0, 0, 0, 0.3);
	border-radius: 10px;
	max-width: 500px;
	width: 100%;
	min-height: 694px;
	align-self: center;
	margin: var(--size-md) 0;
	padding: var(--size-md);
	display: flex;
	flex-direction: column;
	justify-content: space-around;

	display: ${(props) => (props.deleteCard ? "flex" : "none")};
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
		padding: 16px;
		@media ${device.tablet} {
			width: 100%;
			padding: var(--size-lg) var(--size-sm);
		}
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

	@media ${device.tablet} {
		width: 100%;
	}

	.method__title-container {
		display: flex;
		flex-direction: column;
		gap: 24px;
		margin: 0 var(--size-md);
	}
	.method__title {
		font-size: var(--font-size-lg);
		font-weight: 600;
		max-width: 400px;
		color: var(--color-primary);
	}
	.method__subtitle {
		color: var(--color-primary);
	}
`;

const PaymentCard = styled(SummaryCard)`
	border: none;
	display: flex;
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
		justify-content: space-between;
		gap: var(--size);

		@media ${device.tablet} {
		}
	}
	.text__label {
		color: var(--color-primary);
		font-size: var(--font-size-md);
		font-weight: 500;
	}
	.btn-container {
		width: 100%;
		height: 64px;

		@media ${device.tablet} {
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
		color: var(--color-primary);
		font-size: var(--font-size);
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
		margin-top: var(--size);
	}
`;
const SmallInput = styled(InputContainer)`
	max-width: 150px;
`;

function Checkout({ jwt, data }) {
	const jwt2 = parseCookies().jwt;
	const [inputValue, setInputValue] = useState(1);
	const [guestValue, setInputGuestValue] = useState(1);
	const [deleteCard, setDeleteCard] = useState(true);

	const loader = ({ src, width = 100, quality = 100 }) => {
		return `${src}?w=${width}&q=${quality || 75}`;
	};

	function calculateVats(price, inputValue) {
		let total = price * inputValue * 0.21;

		return total.toFixed();
	}

	function totalBooking(price, inputValue) {
		let totalVat = price * inputValue * 0.21;
		let subtotalPrice = price * inputValue;
		let total = totalVat + subtotalPrice;
		return total.toFixed();
	}
	const router = useRouter();

	const queryDate = router.query.dateValue;

	const dateRange = queryDate ? queryDate.split(",") : [];

	const [checkIn, setCheckInValue] = useState(dateRange[0]);
	const [checkOut, setCheckOutValue] = useState(dateRange[1]);

	return (
		<>
			<Header user={jwt2}></Header>
			<main>
				<CheckoutSectionContainer>
					<SummaryContainer>
						<h1 className="summary__title">
							Summary of your reservation
						</h1>
						<Message deleteCard={deleteCard}>
							There are no hotels selected
						</Message>
						<SummaryCard deleteCard={deleteCard}>
							<div className="summary__top-container">
								<h2 className="card__title">{data.Title}</h2>
								<Icon
									icon="clarity:window-close-line"
									className="card__icon"
									onClick={() => setDeleteCard(false)}
								/>
							</div>
							<div className="summary__image-container">
								<Image
									src={data.cardImage}
									layout="fill"
									objectFit="cover"
									loader={loader}
									alt={data.alt_portrait_image}
									priority="true"
								></Image>
							</div>
							<div className="summary__inputs-container">
								<InputDate
									labelMessage="Check in: "
									setCheckIn={setCheckInValue}
									value={checkIn}
								></InputDate>
								<InputDate
									labelMessage="Check out: "
									setCheckout={setCheckOutValue}
									value={checkOut}
								></InputDate>
								<InputOption
									labelMessage="Guest: "
									onClickInArrow={setInputGuestValue}
								></InputOption>
								<InputOption
									labelMessage="Rooms: "
									onClickInArrow={setInputValue}
								></InputOption>
							</div>
							<div className="summary__total-container">
								<div className="summary__data-container">
									<span>Subtotal: </span>
									<span>
										{data.price * inputValue}
										Nok
									</span>
								</div>
								<div className="summary__data-container">
									<span>VAT(21%): </span>
									<span>
										{calculateVats(data.price, inputValue)}
										Nok
									</span>
								</div>
								<div className="summary__line"></div>
								<div className="summary__data-container">
									<span className="summary__total-text">
										Total Booking:
									</span>
									<span className="summary__total-price">
										{totalBooking(data.price, inputValue)}{" "}
										Nok
									</span>
								</div>
							</div>
						</SummaryCard>
					</SummaryContainer>
					<MethodPaidContainer>
						<div className="method__title-container">
							<h2 className="method__title">Payment Details</h2>
							<p className="method__subtitle">
								Complete your purchase by providing your payment
								details
							</p>
						</div>
						<PaymentCard>
							<Formik
								initialValues={{
									email: "",
									cardNumber: "",
									expirationDate: "",
									cvc: "",
									cardHolder: "",
								}}
								validationSchema={Yup.object({
									email: Yup.string()
										.email("Invalid email address")
										.required("Required"),

									cardNumber: Yup.string()
										.min(
											10,
											"Must be 10 characters as minimun"
										)
										.required("Required"),
									expirationDate: Yup.string()
										.max(
											4,
											"Must be 4 characters as maximun"
										)
										.required("Required"),
									cvc: Yup.string()
										.max(
											3,
											"Must be 4 characters as maximun"
										)
										.required("Required"),
									cardHolder: Yup.string()
										.max(
											3,
											"Must be 4 characters as maximun"
										)
										.required("Required"),
								})}
								onSubmit={(values, { setSubmitting }) => {
									setTimeout(() => {
										alert(JSON.stringify(values, null, 2));
										setSubmitting(false);
									}, 400);
								}}
							>
								{(formik) => {
									return (
										<Form>
											<FormContainer>
												<label
													htmlFor="email"
													className="text__label"
												>
													Email address:
												</label>
												<InputContainer>
													<Icon
														icon="ant-design:mail-outlined"
														className="text-input__icon"
													/>
													<Field
														className="text-input text-input-with-icon"
														name="email"
														type="email"
														placeholder="Email"
													/>
													<ErrorMessage
														className="error"
														name="email"
														component="div"
													/>
												</InputContainer>

												<label
													htmlFor="cardNumer"
													className="text__label"
												>
													Card details:
												</label>
												<InputContainer>
													<Icon
														icon="ant-design:credit-card-filled"
														className="text-input__icon"
													/>
													<Field
														className="text-input text-input-with-icon"
														name="cardNumber"
														type="tel"
														placeholder="xxxx xxxx xxxx xxxx"
													/>
													<ErrorMessage
														className="error"
														name="cardNumber"
														component="div"
													/>
												</InputContainer>

												<div className="inputs-container">
													<SmallInput>
														<Field
															className="text-input"
															name="expirationDate"
															type="text"
															placeholder="MM/YY"
														/>
														<ErrorMessage
															className="error"
															name="expirationDate"
															component="div"
														/>
													</SmallInput>
													<SmallInput>
														<Field
															className="text-input"
															name="cvc"
															type="text"
															placeholder="CVC"
														/>
														<ErrorMessage
															className="error"
															name="cvc"
															component="div"
														/>
													</SmallInput>
												</div>

												<InputContainer>
													<Field
														className="text-input"
														name="cardHolder"
														type="text"
														placeholder="Cardholder name"
													/>
													<ErrorMessage
														className="error"
														name="cardHolder"
														component="div"
													/>
												</InputContainer>

												<div className="btn-container">
													<Button
														text="Confirm and pay"
														btnCategory="primary"
														color="yellow"
														typeOfButton="button"
														type="submit"
														disabled={
															!(
																formik.isValid &&
																formik.dirty
															)
														}
													></Button>
												</div>
											</FormContainer>
										</Form>
									);
								}}
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

export async function getStaticPaths() {
	try {
		const res = await fetch(`${BASE_URL}/hotels/`);
		const data = await res.json();
		const paths = data.map(({ id }) => ({ params: { id: `${id}` } }));

		return {
			paths,
			fallback: false,
		};
	} catch (error) {
		console.log(error);
	}
}
export async function getStaticProps({ params }) {
	try {
		let res = await fetch(`${BASE_URL}/hotels/` + params.id);
		let data = await res.json();

		return {
			props: { data },
		};
	} catch (error) {
		console.error(error);
	}
}
