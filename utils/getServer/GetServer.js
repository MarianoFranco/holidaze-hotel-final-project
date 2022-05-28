// import nookies from "nookies";
// import { BASE_URL } from "../config/config";

// const getServerSideProps = async (ctx) => {
// 	const cookies = nookies.get(ctx);
// 	let user = null;

// 	if (cookies?.jwt) {
// 		try {
// 			const { data } = await axios.get(`${BASE_URL}/users/me`, {
// 				headers: {
// 					Authorization: `Bearer ${cookies.jwt}`,
// 				},
// 			});
// 			console.log(data);
// 			user = data;
// 		} catch (e) {
// 			console.log(e);
// 		}
// 	}

// 	if (!user) {
// 		return {
// 			redirect: {
// 				permanent: false,
// 				destination: "/",
// 			},
// 		};
// 	}

// 	return {
// 		props: {
// 			user,
// 		},
// 	};
// };

// export default getServerSideProps;
