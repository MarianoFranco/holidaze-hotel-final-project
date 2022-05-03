import styled from "styled-components";
import Header from "../components/header/Header";
import Hero from "../components/hero/Hero";
import FeaturedSection from "../components/featuredSection/FeaturedSection";
import OurSelectionSection from "../components/ourSelectionSection/OurSelectionSection";
import MostSoldSection from "../components/mostSoldSection/MostSoldSection";
import FaqSection from "../components/faqSection/FaqSection";
import ContactSection from "../components/contactSection/ContactSection";
import Footer from "../components/footer/Footer";

export default function Home() {
	return (
		<>
			<Header />
			<main>
				<Hero />
				<FeaturedSection></FeaturedSection>
				<OurSelectionSection />
				<MostSoldSection></MostSoldSection>
				<FaqSection></FaqSection>
				<ContactSection />
				<Footer></Footer>
			</main>
		</>
	);
}
