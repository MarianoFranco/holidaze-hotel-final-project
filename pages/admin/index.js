import React from "react";
import styled from "styled-components";
import Header from "../../components/header/Header";
import nookies, { parseCookies } from "nookies";
import axios from "axios";
import Button from "../../components/button/Button";
import { BASE_URL } from "../../utils/config/config";
import { Icon } from "@iconify/react";
import Link from "next/link";
import Image from "next/image";

import { Tabs, Table } from "@mantine/core";

const AdminContainer = styled.div`
	max-width: 1440px;
	margin: auto;

	.admin__title {
		margin: var(--size-md) var(--size-lg);
		font-size: var(--font-size-lg);
		font-weight: 600;
	}
	.admin__line {
		height: 1px;
		background: rgba(0, 0, 0, 0.2);
		margin: var(--size-md) var(--size-md);
	}
`;

const Icono = styled(Icon)`
	font-size: 40px;
`;
const LinkContainer = styled.div`
	width: 289px;
	height: 64px;
	margin: var(--size) var(--size-lg);
`;

const TabsContainer = styled(Tabs)`
	margin: var(--size-xl) auto;
	.mantine-Tabs-tabsListWrapper {
		max-width: 345px;
		width: 100%;
		background-color: var(--color-secondary);
	}
	.mantine-Tabs-tabsList {
		display: flex;
		flex-direction: column;
		max-height: 400px;
		height: 100%;
		gap: 32px;
		padding: var(--size-xl) var(--size-lg);
	}

	.mantine-Tabs-default {
		font-size: var(--font-size-md);
		color: var(--color-white);
		font-weight: 400;
	}
	.mantine-Tabs-tabActive {
		color: var(--color-primary);
		text-decoration: underline;
		border: none;
	}
	.mantine-Tabs-body {
		width: 100%;
		padding: 0;
	}
`;

const TableComponent = styled(Table)`
	.table__head {
		background-color: var(--color-tertiary);
	}
	.table__row {
		padding: 40px;
	}
	.table__header {
		color: var(--color-white);
		font-size: var(--font-size-md);
		font-weight: 500;
		font-family: var(--font-headings);
		padding-left: 30px;
	}
	.table__body {
	}
	.table__data {
		font-size: var(--font-size-md);
		padding: 24px;
	}
`;

function Admin({ user, messages, hotels, hotelMessages, jwt }) {
	const loader = ({ src, width = 100, quality = 100 }) => {
		return `${src}?w=${width}&q=${quality || 75}`;
	};

	const handleClick = async (deleteId) => {
		if (confirm("Are you sure you want to delete the hotel?")) {
			let response = await axios.delete(
				`${BASE_URL}/hotels/${deleteId}`,

				{
					headers: {
						Authorization: `Bearer ${jwt}`,
					},
				}
			);
			location.reload();
		}
	};

	return (
		<>
			<Header user={jwt} />
			<main>
				<AdminContainer>
					<h1 className="admin__title">Welcome {user.email} </h1>
					<div className="admin__line"></div>
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

					<TabsContainer tabPadding="xl" orientation="vertical">
						<Tabs.Tab label="Hotels">
							<TableComponent
								highlightOnHover
								verticalSpacing="xl"
							>
								<thead className="table__head">
									<tr className="table_row">
										<th className="table__header">ID</th>
										<th className="table__header">Name</th>
										<th className="table__header">
											Featured
										</th>
										<th className="table__header">Image</th>
										<th className="table__header">Edit</th>
										<th className="table__header">
											Delete
										</th>
									</tr>
								</thead>
								<tbody className="table__body">
									{hotels.map((element) => (
										<tr
											key={element.id}
											className="table__row"
										>
											<td className="table__data">
												{element.id}
											</td>
											<td className="table__data">
												{element.Title}
											</td>
											<td className="table__data">
												{element.featured
													? "Yes"
													: "No"}
											</td>
											<td className="table__data">
												{element.cardImage && (
													<Image
														src={element.cardImage}
														width="150px"
														height="100px"
														loader={loader}
														alt={`Image of ${element.Title} in ${element.Address} `}
													></Image>
												)}
											</td>
											<td className="table__data">
												<Link
													href={`/admin/${element.id}`}
												>
													<a>
														<Icono
															icon="akar-icons:edit"
															className="icon"
														/>
													</a>
												</Link>
											</td>
											<td className="table__data">
												<Icono
													icon="ant-design:delete-filled"
													onClick={() =>
														handleClick(element.id)
													}
												/>
											</td>
										</tr>
									))}
								</tbody>
							</TableComponent>
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
										<th>HotelName</th>
										<th>Name</th>
										<th>Email</th>
										<th>Message</th>
										<th>Date</th>
									</tr>
								</thead>
								<tbody>
									{hotelMessages.map((element) => (
										<tr key={element.id}>
											<td>{element.id}</td>
											<td>{element.hotel_name}</td>
											<td>{element.name}</td>
											<td>{element.email}</td>
											<td>{element.message}</td>
											<td>{element.created_at}</td>
										</tr>
									))}
								</tbody>
							</Table>
						</Tabs.Tab>
					</TabsContainer>
				</AdminContainer>
			</main>
		</>
	);
}

export const getServerSideProps = async (ctx) => {
	const jwt = nookies.get(ctx);

	let user = null;
	let messages = [];
	let hotels = [];
	let hotelMessages = [];

	if (jwt?.jwt) {
		try {
			const { data: dataUser } = await axios.get(`${BASE_URL}/users/me`, {
				headers: {
					Authorization: `Bearer ${jwt.jwt}`,
				},
			});
			const { data: dataMessages } = await axios.get(
				`${BASE_URL}/messages`,
				{
					headers: {
						Authorization: `Bearer ${jwt.jwt}`,
					},
				}
			);
			const { data: dataHotels } = await axios.get(`${BASE_URL}/hotels`, {
				headers: {
					Authorization: `Bearer ${jwt.jwt}`,
				},
			});
			const { data: dataHotelMessages } = await axios.get(
				`${BASE_URL}/hotel-messages`,
				{
					headers: {
						Authorization: `Bearer ${jwt.jwt}`,
					},
				}
			);

			user = dataUser;
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
				destination: "/login",
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
