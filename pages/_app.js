import "../styles/global.js";
import GlobalStyle from "../styles/global";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { parseCookies } from "nookies";

function MyApp({ Component, pageProps }) {
	console.log("pageProps", pageProps);
	return (
		<>
			<GlobalStyle></GlobalStyle>
			<Component {...pageProps} />
		</>
	);
}

MyApp.getInitialProps = async ({ Component, ctx }) => {
	let pageProps = {};
	const jwt = parseCookies(ctx).jwt;

	if (Component.getInitialProps) {
		pageProps = await Component.getInitialProps(ctx);
	}

	// if (!jwt) {
	// 	if (ctx.pathname === "/payed-articles") {
	// 		redirectUser(ctx, "/login");
	// 	}
	// }
	console.log("pageprops");
	pageProps.jwt = jwt;
	return {
		pageProps,
	};
};

export default MyApp;
