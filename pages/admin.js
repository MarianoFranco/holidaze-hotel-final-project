import React from "react";
import styled from "styled-components";
import Header from "../components/header/Header";
import nookies from "nookies";
import axios from "axios";
import Button from "../components/button/Button";
import { BASE_URL } from "../utils/config/config";
import { Icon } from "@iconify/react";
import Link from "next/link";

const Icono = styled(Icon)`
	font-size: 40px;
`;

function Admin({ user, messages, hotels, jwt }) {
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
				<div>
					<div>Menu</div>
					<div>
						cards con los datos
						{hotels.map((hotel) => {
							return (
								<div key={hotel.id}>
									<h3>{hotel.Title}</h3>
									<div>
										<Link
											href={`/hotels_page/edit/${hotel.id}`}
										>
											<a>
												<Icono
													icon="akar-icons:edit"
													className="icon"
												/>
											</a>
										</Link>
									</div>
								</div>
							);
						})}
						messages
						{messages.map((message) => {
							return (
								<div key={message.id}>
									<h3>{message.name}</h3>
								</div>
							);
						})}
					</div>
				</div>
			</main>
		</>
	);
}

export const getServerSideProps = async (ctx) => {
	const cookies = nookies.get(ctx);
	let user = null;
	let messages = [];
	let hotels = [];

	if (cookies?.jwt) {
		try {
			const { data } = await axios.get(`${BASE_URL}/users/me`, {
				headers: {
					Authorization: `Bearer ${cookies.jwt}`,
				},
			});
			const { data: dataMessages } = await axios.get(
				`${BASE_URL}/messages`,
				{
					headers: {
						Authorization: `Bearer ${cookies.jwt}`,
					},
				}
			);
			const { data: dataHotels } = await axios.get(
				`${BASE_URL}/hotels`,
				{}
			);
			console.log("messages $$$$$", dataMessages);
			user = data;
			messages = dataMessages;
			hotels = dataHotels;
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
			messages,
			hotels,
		},
	};
};

export default Admin;
