import React from "react";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import DetailsMainSection from "../../components/detailsMainSection/DetailsMainSection";
import DetailsAmenitiesSection from "../../components/detailsAmenitiesSection/DetailsAmenitiesSection";
import DetailsEnquirySection from "../../components/detailsEnquirySection/DetailsEnquirySection";
import DetailsAboutHotelSection from "../../components/detailsAboutHotelSection/DetailsAboutHotelSection";

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

function HotelResults({ data, jwt }) {
	return (
		<>
			<Header user={jwt} />
			<main>
				<DetailsMainSection data={data} />
				<DetailsAmenitiesSection data={data} />
				<DetailsEnquirySection data={data} />
				<DetailsAboutHotelSection data={data} />
			</main>
			<Footer />
		</>
	);
}

export default HotelResults;
