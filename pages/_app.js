import "../styles/global.js";
import GlobalStyle from "../styles/global";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import nookies, { parseCookies } from "nookies";
import Router from "next/router";
import { useRouter } from "next/router";
import { redirectUser } from "../utils/redirectUser/redirectUser";
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
		// if (
		// 	ctx.pathname.includes("/edit") ||
		// 	ctx.pathname.includes("/admin") ||
		// 	ctx.pathname.includes("/add_hotel")
		// ) {
		// 	redirectUser(ctx, "/login");
		// }
		// if (!jwt) {
		// 	if (res) {
		// 		// On the server, we'll use an HTTP response to
		// 		// redirect with the status code of our choice.
		// 		// 307 is for temporary redirects.
		// 		res.writeHead(307, { Location: "/login" });
		// 		res.end();
		// 	} else {
		// 		// On the client, we'll use the Router-object
		// 		// from the 'next/router' module.
		// 		Router.push("/login");
		// 	}
		// 	// Return an empty object,
		// 	// otherwise Next.js will throw an error
		// 	return {};
		// }
		if (!jwt) {
			if (
				ctx.pathname.includes("/edit") ||
				ctx.pathname.includes("/admin") ||
				ctx.pathname.includes("/add_hotel")
			) {
				if (ctx.req) {
					ctx.res.writeHead(302, { Location: "/login" });
					ctx.res.end();
				} else {
					Router.push("/login");
				}
			}
		}
	}

	pageProps.jwt = jwt;
	return {
		pageProps,
	};
};

export default MyApp;
