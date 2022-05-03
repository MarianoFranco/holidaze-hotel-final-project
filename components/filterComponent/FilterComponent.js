import React, { useState } from "react";
import { Accordion, Slider, Text, Container, Checkbox } from "@mantine/core";
import { Icon } from "@iconify/react";

function FilterComponent() {
	const [value, setValue] = useState(50);
	const [endValue, setEndValue] = useState(50);
	return (
		<>
			<Accordion>
				<Accordion.Item label="Hotel class" iconPosition="right">
					<div>
						<Icon icon="ant-design:star-filled" />
						<Icon icon="ant-design:star-filled" />
						<Icon icon="ant-design:star-filled" />
						<Icon icon="ant-design:star-filled" />
						<Icon icon="ant-design:star-outlined" />
					</div>
				</Accordion.Item>

				<Accordion.Item label="Price" iconPosition="right">
					<Container size={400}>
						<Slider
							value={value}
							onChange={setValue}
							onChangeEnd={setEndValue}
						/>
						<Text mt="md" size="sm">
							onChange value: <b>{value}</b>
						</Text>
						<Text mt={5} size="sm">
							onChangeEnd value: <b>{endValue}</b>
						</Text>
					</Container>
				</Accordion.Item>

				<Accordion.Item label="PopularFilters" iconPosition="right">
					<Checkbox label="WiFi included" />
					<Checkbox label="Breakfast included" />
					<Checkbox label="Pet friendly" />
					<Checkbox label="Parking" />
					<Checkbox label="Spa" />
					<Checkbox label="Gym" />
				</Accordion.Item>
			</Accordion>
		</>
	);
}

export default FilterComponent;
