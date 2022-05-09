export const getStaticProps = async () => {
	const res = await fetch("http://localhost:1337/hotels/");
	const data = await res.json();
	console.log(data);
	return {
		props: { hotels: data },
	};
};

export default function FeaturedSection({ defaultHotetls = [] }) {
	const [hotels, setHotels] = useState(defaultHotetls);

	useEffect(() => {
		const getHotels = async () => {
			try {
				const res = await fetch("http://localhost:1337/hotels");
				const data = await res.json();
				setHotels(data);
			} catch (error) {
				return error;
			}
		};

		getHotels();
	}, []);
}
