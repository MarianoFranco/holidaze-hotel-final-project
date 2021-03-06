import React, { useState } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import Image from "next/image";
import { Icon } from "@iconify/react";
import { ErrorMessage } from "formik";
import Button from "../components/button/Button";
import { device } from "../styles/breakpoints";
import axios from "axios";
import validateEmail from "../utils/validate/email";
import valueLength from "../utils/validate/valueLength";

const LoginContainer = styled.div`
	position: relative;

	padding: var(--size-xl);
	max-width: 1440px;
	margin: auto;
	align-items: center;
	@media ${device.tablet} {
		padding: var(--size-md);
	}
`;
const ImageContainer = styled.div`
	width: 100%;
	height: 100%;
	position: absolute;
	z-index: -100;
	@media ${device.tablet} {
	}
`;
const ImageComponent = styled(Image)`
	position: absolute;
	top: 0;
	left: 0;
	z-index: -100;
`;

const LoginFormContainer = styled.div`
	max-width: 600px;
	min-height: 670px;
	padding: var(--size-xl);
	background-color: var(--color-black-90);
	border-radius: 15px;
	box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.4);
	display: flex;
	flex-direction: column;
	justify-content: space-around;

	@media ${device.tablet} {
		padding: var(--size-sm);
		min-height: 558px;
		justify-content: center;
		gap: 24px;
	}
	.form__title-container {
		display: flex;
		flex-direction: column;
		gap: 16px;
		@media ${device.tablet} {
			padding: var(--size);
		}
	}

	.form__title {
		color: var(--color-white);
		font-size: var(--font-size-xxl);
		@media ${device.tablet} {
			font-size: var(--font-size-xl);
		}
	}
	.form__subtitle {
		color: var(--color-primary);
		font-size: var(--font-size);
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
		max-width: 300px;
		display: flex;
		flex-direction: column;
		gap: 24px;

		@media ${device.tablet} {
			flex-wrap: wrap;
			justify-content: center;
		}
	}

	.btn-container {
		width: 100%;
		max-width: 300px;
		height: 74px;
		@media ${device.tablet} {
			max-width: 300px;
		}
	}
	.password-text {
		color: var(--color-primary);
		font-weight: 600;
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
const InputContainer = styled.div`
	width: 100%;
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

function Login({ jwt }) {
	const initialValues = {
		identifier: "",
		password: "",
	};
	const router = useRouter();
	const [userData, setUserData] = useState(initialValues);
	const [errorData, setErrorData] = useState({});
	const [errorMessage, setErrorMessage] = useState("");

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
				await axios.post("/api/login", { ...userData });
				router.push("/admin");
			} catch (err) {
				setErrorMessage("User not registered. Introduce a valid user");
				setTimeout(() => {
					{
						setErrorMessage("");
					}
				}, 3000);
			}
		}
	};

	const validate = (values) => {
		const errors = {};

		if (!values.identifier || !validateEmail(values.identifier)) {
			errors.identifier = "Introduce a valid email.";
		}
		if (!values.password || !valueLength(values.password, 6)) {
			errors.password =
				"Invalid password. Introduce at least 6 characters.";
		}

		return errors;
	};

	return (
		<>
			<Header jwt={jwt} />
			<main>
				<ImageContainer>
					<ImageComponent
						src="/images/login-portrait.jpg"
						layout="fill"
						objectFit="cover"
						alt="image"
						priority="true"
					/>
				</ImageContainer>
				<LoginContainer>
					<LoginFormContainer>
						<div className="form__title-container">
							<h1 className="form__title">Sign in</h1>
							<p className="form__subtitle">
								Welcome back! Please enter your details.
							</p>
						</div>
						<form onSubmit={handleSubmit}>
							<FormContainer>
								<div className="inputs-container">
									<InputContainer>
										<Icon
											icon="ant-design:mail-outlined"
											className="text-input__icon"
										/>
										<input
											className="text-input text-input-with-icon"
											name="identifier"
											type="text"
											placeholder="Email"
											onChange={handleChange}
										/>

										{errorData.identifier && (
											<div className="error">
												{errorData.identifier}
											</div>
										)}
									</InputContainer>
									<InputContainer>
										<input
											className="text-input "
											name="password"
											type="password"
											placeholder="password"
											onChange={handleChange}
											autoComplete="on"
										/>
										{errorData.password && (
											<div className="error">
												{errorData.password}
											</div>
										)}
									</InputContainer>
								</div>
								<div className="btn-container">
									<Button
										text="Login"
										btnCategory="primary"
										color="yellow"
										typeOfButton="button"
										type="submit"
									></Button>
								</div>
								{errorMessage && (
									<div className="error">{errorMessage}</div>
								)}
							</FormContainer>
						</form>
					</LoginFormContainer>
				</LoginContainer>
			</main>
			<Footer />
		</>
	);
}

export default Login;
