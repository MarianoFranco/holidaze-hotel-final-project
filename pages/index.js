import styled from "styled-components";
import Header from "../components/header/Header";
import Hero from "../components/hero/Hero";
import FeaturedSection from "../components/featuredSection/FeaturedSection";
import OurSelectionSection from "../components/ourSelectionSection/OurSelectionSection";
import MostSoldSection from "../components/mostSoldSection/MostSoldSection";
import FaqSection from "../components/faqSection/FaqSection";
import ContactSection from "../components/contactSection/ContactSection";
import Footer from "../components/footer/Footer";

export async function getStaticProps() {
	try {
		let res = await fetch("http://localhost:1337/hotels/");
		let data = await res.json();
		return {
			props: { data },
		};
	} catch (error) {
		console.error(error);
	}
}

export default function Home({ data }) {
	return (
		<>
			<Header />
			<main>
				<Hero />
				<FeaturedSection hotel_data={data}></FeaturedSection>
				<OurSelectionSection hotel_data={data} />
				<MostSoldSection hotel_data={data}></MostSoldSection>
				<FaqSection></FaqSection>
				<ContactSection />
			</main>
			<Footer></Footer>
		</>
	);
}
