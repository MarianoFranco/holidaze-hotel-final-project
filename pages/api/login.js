import axios from "axios";
import { setCookie } from "nookies";

const login = async (req, res) => {
	const { password, identifier } = req.body;

	try {
		const postRes = await axios.post("http://localhost:1337/auth/local", {
			identifier,
			password,
		});
		console.log(postRes);

		setCookie({ res }, "jwt", postRes.data.jwt, {
			httpOnly: true,
			secure: process.env.NODE_ENV !== "development",
			maxAge: 30 * 24 * 60 * 60,
			path: "/",
		});
        

		res.status(200).end();
	} catch (e) {
		res.status(400).send(e.response.data.message[0].messages[0]);
	}
};

export default login;