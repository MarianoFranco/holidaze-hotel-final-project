import React from "react";
import styled from "styled-components";
import { Icon } from "@iconify/react";
import { device } from "../../styles/breakpoints";
const IconsContainer = styled.div`
	display: flex;
	align-items: center;
	color: var(--color-white);
	font-size: var(--font-size-md);
	gap: var(--size-sm);
	@media ${device.laptop} {
		font-size: var(--font-size);
	}
`;
function StarsIcon({ stars }) {
	switch (stars) {
		case 1:
			return (
				<>
					<Icon icon="ant-design:star-filled" />
				</>
			);
		case 2:
			return (
				<>
					<Icon icon="ant-design:star-filled" />
					<Icon icon="ant-design:star-filled" />
				</>
			);

		case 3:
			return (
				<>
					<Icon icon="ant-design:star-filled" />
					<Icon icon="ant-design:star-filled" />
					<Icon icon="ant-design:star-filled" />
				</>
			);

		case 4:
			return (
				<>
					<Icon icon="ant-design:star-filled" />
					<Icon icon="ant-design:star-filled" />
					<Icon icon="ant-design:star-filled" />
					<Icon icon="ant-design:star-filled" />
				</>
			);

		case 5:
			return (
				<>
					<Icon icon="ant-design:star-filled" />
					<Icon icon="ant-design:star-filled" />
					<Icon icon="ant-design:star-filled" />
					<Icon icon="ant-design:star-filled" />
					<Icon icon="ant-design:star-filled" />
				</>
			);
		default:
			return <></>;
	}
}

export default StarsIcon;
