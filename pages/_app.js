import "../styles/global.js";
import GlobalStyle from "../styles/global";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { parseCookies } from "nookies";

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

	if (Component.getInitialProps) {
		pageProps = await Component.getInitialProps(ctx);
	}

	pageProps.jwt = jwt;

	return {
		pageProps,
	};
};

export default MyApp;
