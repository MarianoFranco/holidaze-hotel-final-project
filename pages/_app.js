import "../styles/global.js";
import GlobalStyle from "../styles/global";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import nookies, { parseCookies } from "nookies";
import Router from "next/router";

function MyApp({ Component, pageProps }) {
	return (
		<>
			<GlobalStyle></GlobalStyle>
			<Component {...pageProps} />
		</>
	);
}

function redirectUser(ctx, location) {
	if (ctx.res) {
		ctx.res.writeHead(302, { Location: location });
		ctx.res.end();
	} else {
		Router.push(location);
	}
}

MyApp.getInitialProps = async ({ Component, ctx, req }) => {
	let pageProps = {};
	const jwt = parseCookies(ctx).jwt;

	if (Component.getInitialProps) {
		pageProps = await Component.getInitialProps(ctx);
	}
	// console.log("app props", ctx);

	if (!jwt) {
		if (
			ctx.pathname.includes("/edit") ||
			ctx.pathname.includes("/admin") ||
			ctx.pathname.includes("/add_hotel")
		) {
			redirectUser(ctx, "/login");
		}
	}

	pageProps.jwt = jwt;
	return {
		pageProps,
	};
};

export default MyApp;
