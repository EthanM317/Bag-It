import { useNavigate } from "react-router";
import { Url } from "../constants";

function NotFoundPage() {
	const navigate = useNavigate();

	return (
		<>
			<h1>404 Page not found</h1>
			<a
				href=""
				onClick={() => {
					navigate(Url.HOME);
				}}
			>
				Return to home page.
			</a>
		</>
	);
}

export default NotFoundPage;
