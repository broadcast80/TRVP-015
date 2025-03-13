import Footer from "./components/Footer";
import Main from "./components/Main";
import Nav from "./components/Nav";

export default function App() {

	return (
		<>
		    <div className="container-block">
				<Main/>
				<Nav/>
			</div>
			<Footer />
		</>
	);
}
