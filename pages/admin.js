import React from "react";
import styled from "styled-components";
import Header from "../components/header/Header";
import nookies from "nookies";
import axios from "axios";

function admin({ user, req }) {
	return (
		<>
			<Header user={user} />
			<main>
				<h1>Esta es la pagina de administrador {user.email}</h1>
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
			console.log(data);
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

export default admin;
