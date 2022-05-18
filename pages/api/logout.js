import { destroyCookie } from "nookies";

const logout = async (req, res) => {
	destroyCookie({ res }, "jwt", {
		path: "/",
	});

	res.status(200).end();
};

export default logout;
