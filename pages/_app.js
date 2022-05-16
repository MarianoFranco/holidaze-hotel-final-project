import "../styles/global.js";
import GlobalStyle from "../styles/global";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function MyApp({ Component, pageProps }) {
	return (
		<>
			<GlobalStyle></GlobalStyle>
			<Component {...pageProps} />
		</>
	);
}

export const getServerSideProps = async (ctx) => {
	console.log(ctx, "222");
};

export default MyApp;
