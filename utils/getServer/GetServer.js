import nookies from "nookies";

const getServerSideProps = async (ctx) => {
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

export default getServerSideProps;
