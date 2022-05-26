import React, { useRef } from "react";
import { Accordion, createStyles } from "@mantine/core";
import styled from "styled-components";
import { device } from "../../styles/breakpoints";

const AccordionContainer = styled(Accordion)`
	width: 100%;
	max-width: 500px;
	min-height: 105px;
	border: solid 2px var(--color-primary);
	border-radius: 44px;
	margin: 26px 0;
	padding: 0px 20px;
	display: flex;
	flex-direction: column;
	justify-content: center;
	.accordion__item {
		border: none;
		font-size: var(--font-size-md);
		color: var(--color-primary);
	}

	.mantine-UnstyledButton-root:hover {
		background: none;
		text-decoration: underline;
		color: white;
	}
	.mantine-Accordion-label {
		color: var(--color-white);
		font-size: var(--font-size-md);
		font-weight: 700;
	}

	.mantine-Accordion-icon svg {
		height: 40px;
		width: 40px;
		color: var(--color-primary);
	}
`;

function FaqAccordion({ question, answer }) {
	const elementRef = useRef();

	return (
		<>
			<AccordionContainer iconPosition="right" iconSize={40} multiple>
				<Accordion.Item
					controlRef={elementRef}
					className="accordion__item"
					label={question}
				>
					{answer}
				</Accordion.Item>
			</AccordionContainer>
		</>
	);
}

export default FaqAccordion;
