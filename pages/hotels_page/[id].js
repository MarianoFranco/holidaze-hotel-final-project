import React from "react";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import DetailsMainSection from "../../components/detailsMainSection/DetailsMainSection";

export async function getStaticPaths() {
	try {
		const res = await fetch("http://localhost:1337/hotels/");
		const data = await res.json();
		const paths = data.map(({ id }) => ({ params: { id: `${id}` } }));

		return {
			paths,
			fallback: false,
		};
	} catch (error) {
		console.log(error);
	}
}
export async function getStaticProps({ params }) {
	try {
		let res = await fetch("http://localhost:1337/hotels/" + params.id);
		let data = await res.json();

		console.log(data);
		return {
			props: { data },
		};
	} catch (error) {
		console.error(error);
	}
}

function HotelResults({ data }) {
	return (
		<>
			<Header />
			<main>
				<DetailsMainSection data={data} />
			</main>
			<Footer />
		</>
	);
}

export default HotelResults;
