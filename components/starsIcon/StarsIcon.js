import React from "react";
import { Icon } from "@iconify/react";

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
