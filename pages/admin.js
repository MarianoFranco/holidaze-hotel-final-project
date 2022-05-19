import React from "react";
import styled from "styled-components";
import Header from "../components/header/Header";
import nookies from "nookies";
import axios from "axios";
import Button from "../components/button/Button";
import { BASE_URL } from "../utils/config/config";
import { Icon } from "@iconify/react";
import Link from "next/link";
import Image from "next/image";

import { Tabs, Table } from "@mantine/core";

const Icono = styled(Icon)`
	font-size: 40px;
`;
const LinkContainer = styled.div`
	width: 300px;
	height: 70px;
`;
function Admin({ user, messages, hotels, hotelMessages, jwt }) {
	console.log(user);
	console.log(hotelMessages);

	const loader = ({ src, width = 100, quality = 100 }) => {
		return `${src}?w=${width}&q=${quality || 75}`;
	};
	const handleClick = async (e) => {
		console.log("el click funciona");
	};

	return (
		<>
			<Header user={user} jwt={jwt} />
			<main>
				<h1>Welcome {user.email}</h1>
				<div className="line"></div>
				<LinkContainer>
					<Link href="/add_hotel">
						<a>
							<Button
								text="Add new hotel"
								icon="bx:message-square-add"
								btnCategory="primary"
								color="blue"
								typeOfButton="link"
							></Button>
						</a>
					</Link>
				</LinkContainer>

				<Tabs tabPadding="xl" orientation="vertical">
					<Tabs.Tab label="Hotels">
						<Table highlightOnHover verticalSpacing="xl">
							<thead>
								<tr>
									<th>ID</th>
									<th>Name</th>
									<th>Featured</th>
									<th>Image</th>
									<th>Edit</th>
									<th>Delete</th>
								</tr>
							</thead>
							<tbody>
								{hotels.map((element) => (
									<tr key={element.id}>
										<td>{element.id}</td>
										<td>{element.Title}</td>
										<td>
											{element.featured ? "Yes" : "No"}
										</td>
										<td>
											<Image
												src={element.cardImage}
												width="150px"
												height="100px"
												loader={loader}
												alt={`Image of ${element.Title} in ${element.Address} `}
											></Image>
										</td>
										<td>
											<Link href={`/edit/${element.id}`}>
												<a>
													<Icono
														icon="akar-icons:edit"
														className="icon"
													/>
												</a>
											</Link>
										</td>
										<td>
											<Icono
												icon="ant-design:delete-filled"
												onClick={handleClick}
											/>
										</td>
									</tr>
								))}
							</tbody>
						</Table>
					</Tabs.Tab>
					<Tabs.Tab label="Contact Messages">
						<Table highlightOnHover verticalSpacing="xl">
							<thead>
								<tr>
									<th>ID</th>
									<th>Name</th>
									<th>Last Name</th>
									<th>Email</th>
									<th>Phone</th>
									<th>Message</th>
								</tr>
							</thead>
							<tbody>
								{messages.map((element) => (
									<tr key={element.id}>
										<td>{element.id}</td>
										<td>{element.name}</td>
										<td>{element.last_name}</td>
										<td>{element.email}</td>
										<td>{element.phone}</td>
										<td>{element.message}</td>
									</tr>
								))}
							</tbody>
						</Table>
					</Tabs.Tab>
					<Tabs.Tab label="Hotel Messages">
						<Table highlightOnHover verticalSpacing="xl">
							<thead>
								<tr>
									<th>ID</th>
									<th>Name</th>
									<th>Email</th>
									<th>Message</th>
								</tr>
							</thead>
							<tbody>
								{hotelMessages.map((element) => (
									<tr key={element.id}>
										<td>{element.id}</td>
										<td>{element.name}</td>
										<td>{element.email}</td>
										<td>{element.message}</td>
										<td>{element.created_at}</td>
									</tr>
								))}
							</tbody>
						</Table>
					</Tabs.Tab>
				</Tabs>
			</main>
		</>
	);
}

export const getServerSideProps = async (ctx) => {
	const cookies = nookies.get(ctx);
	let user = null;
	let messages = [];
	let hotels = [];
	let hotelMessages = [];

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
			const { data: dataHotels } = await axios.get(`${BASE_URL}/hotels`, {
				headers: {
					Authorization: `Bearer ${cookies.jwt}`,
				},
			});
			const { data: dataHotelMessages } = await axios.get(
				`${BASE_URL}/hotel-messages`,
				{
					headers: {
						Authorization: `Bearer ${cookies.jwt}`,
					},
				}
			);
			console.log("messages $$$$$", dataHotelMessages);
			user = data;
			messages = dataMessages;
			hotels = dataHotels;
			hotelMessages = dataHotelMessages;
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
			hotelMessages,
		},
	};
};

export default Admin;
