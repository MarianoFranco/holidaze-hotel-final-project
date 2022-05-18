import React from "react";
import styled from "styled-components";
import Header from "../components/header/Header";
import nookies from "nookies";
import axios from "axios";
import Button from "../components/button/Button";

function Admin({ user, req, jwt }) {
	console.log(user);
	return (
		<>
			<Header user={user} jwt={jwt} />
			<main>
				<h1>Welcome {user.email}</h1>
				<div className="line"></div>
				<Button
					text="Add new hotel"
					icon="bx:message-square-add"
					btnCategory="primary"
					color="blue"
					typeOfButton="button"
				></Button>
			</main>
		</>
	);
}

export const getServerSideProps = async (ctx) => {
	const cookies = nookies.get(ctx);
	let user = null;

	if (cookies?.jwt) {
		try {
			const { data } = await axios.get("http://localhost:1337/users/me", {
				headers: {
					Authorization: `Bearer ${cookies.jwt}`,
				},
			});
			user = data;
		} catch (e) {
			console.log(e);
		}
	}

	if (!user) {
		return {
			redirect: {
				permanent: false,
				destination: "/",
			},
		};
	}

	return {
		props: {
			user,
		},
	};
};

export default Admin;
