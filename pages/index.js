import styled from "styled-components";
import Header from "../components/header/Header";
import Hero from "../components/hero/Hero";
import FeaturedSection from "../components/featuredSection/FeaturedSection";
import OurSelectionSection from "../components/ourSelectionSection/OurSelectionSection";
import MostSoldSection from "../components/mostSoldSection/MostSoldSection";
import FaqSection from "../components/faqSection/FaqSection";
import IndexContactSection from "../components/indexContactSection/IndexContactSection";
import Footer from "../components/footer/Footer";
import { BASE_URL } from "../utils/config/config";

export async function getStaticProps() {
	try {
		let res = await fetch(`${BASE_URL}/hotels/`);
		let data = await res.json();

		return {
			props: { data },
		};
	} catch (error) {
		console.error(error);
	}
}

export default function Home({ data, jwt }) {
	return (
		<>
			<Header user={jwt} />
			<main>
				<Hero />
				<FeaturedSection hotel_data={data}></FeaturedSection>
				<OurSelectionSection hotel_data={data} />
				<MostSoldSection hotel_data={data}></MostSoldSection>
				<FaqSection></FaqSection>
				<IndexContactSection />
			</main>
			<Footer></Footer>
		</>
	);
}
