import { useParams } from "react-router";
import { api } from "../api";
import { Url } from "../constants";
import { useEffect, useState } from "react";

// You can search the product database by adding the productID to the end of the URL
// ex. "/products/5"

function ProductsTestPage() {
	const [products, setProducts] = useState([]);

	// Get url params
	const { id } = useParams();

	useEffect(() => {
		getProductFromId(id);
	}, []);

	async function getProductFromId(_id) {
		if (isNaN(_id)) {
			setProducts([]);
			return;
		}

		if (!_id) console.log("Getting all products...");
		else console.log("Getting product ID: " + _id);

		try {
			let url = Url.BACKEND_CLOTHING;
			if (_id) url += "?itemId=" + _id;

			const res = await api.get(url);
			setProducts(res.data);
		} catch (error) {
			alert(error);
		}
	}

	return (
		<>
			<h1>Products List</h1>
			{!id && <h2>Here are all the products</h2>}
			{products.length > 0 &&
				products.map((product) => (
					<>
						{id && <h3>{product.name + " - (id: " + id + ")"}</h3>}
						{!id && <h3>{product.name}</h3>}

						<p>{product.description}</p>
						<img
							src={product.image}
							alt={product.name}
							style={{
								width: 200,
								height: 200,
								display: "inline",
							}}
						/>
					</>
				))}
			{products.length <= 0 && <p>Product not found</p>}
		</>
	);
}

export default ProductsTestPage;
