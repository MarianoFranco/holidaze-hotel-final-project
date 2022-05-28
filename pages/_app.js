import "../styles/global.js";
import GlobalStyle from "../styles/global";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import nookies, { parseCookies } from "nookies";
import Router from "next/router";
import { useRouter } from "next/router";
import { redirectUser } from "../utils/redirectUser/redirectUser";
import { useEffect } from "react";
function MyApp({ Component, pageProps }) {
	return (
		<>
			<GlobalStyle></GlobalStyle>
			<Component {...pageProps} />
		</>
	);
}

MyApp.getInitialProps = async ({ Component, ctx, res }) => {
	let pageProps = {};
	const jwt = parseCookies(ctx).jwt;

	console.log("GETINITIALPROPS JWT TOKEN", jwt, "CONTEXT", ctx);
	if (Component.getInitialProps) {
		pageProps = await Component.getInitialProps(ctx);
	}

	if (!jwt) {
		if (
			ctx.pathname.includes("/edit") ||
			ctx.pathname.includes("/admin") ||
			ctx.pathname.includes("/add_hotel")
		) {
			if (ctx.req) {
				ctx.res.writeHead(302, {
					Location: "/login",
					"Content-Type": "text/html; charset=utf-8",
				});
				ctx.res.end();

				return {};
			}
		}
	}

	pageProps.jwt = jwt;

	return {
		pageProps,
	};
};

export default MyApp;
