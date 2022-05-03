import React from "react";
import styled from "styled-components";
import FaqAccordion from "../faqAccordion/FaqAccordion";
import { device } from "../../styles/breakpoints";

const FaqContainer = styled.div`
	background-color: var(--color-tertiary);
	width: 100%;
	max-width: 1216px;
	min-height: 535px;
	margin: var(--size-xl) auto;
	border-radius: 15px;
	padding: var(--size-xl);
	box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.4);
	.accordion__col {
		width: 100%;
		margin: 0 var(--size);
	}
	@media ${device.laptop} {
		display: none;
	}
`;
const FaqTitle = styled.h2`
	font-size: var(--font-size-lg);
	font-weight: 600;
	color: var(--color-white);
	margin-bottom: var(--size-xl);
`;
const AcordionContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-around;
	@media ${device.mobile} {
		flex-direction: column;
	}
`;
function FaqSection() {
	return (
		<>
			<FaqContainer>
				<FaqTitle>Regular question about finding hotel offers</FaqTitle>
				<AcordionContainer>
					<div className="accordion__col">
						<FaqAccordion></FaqAccordion>
						<FaqAccordion></FaqAccordion>
						<FaqAccordion></FaqAccordion>
					</div>
					<div className="accordion__col">
						<FaqAccordion></FaqAccordion>
						<FaqAccordion></FaqAccordion>
						<FaqAccordion></FaqAccordion>
					</div>
				</AcordionContainer>
			</FaqContainer>
		</>
	);
}

export default FaqSection;
