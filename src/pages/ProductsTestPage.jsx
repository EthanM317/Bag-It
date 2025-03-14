import { useParams } from "react-router";
import { api } from "../api";
import { Url } from "../constants";
import { useEffect, useState } from "react";
import { Autocomplete, TextField } from "@mui/material";
import React from 'react';
import {Link} from 'react-router-dom';

// You can search the product database by adding the productID to the end of the URL
// ex. "/products/5"

function ProductsTestPage() {
	const [products, setProducts] = useState([]);

	// Get url params
	const { id } = useParams();

	useEffect(() => {
		getProductFromId(id);
	}, [id]); // ✅ Updates when `id` changes

	async function getProductFromId(_id) {
		if (_id && isNaN(_id)) {
			setProducts([]);
			return;
		}

		console.log(_id ? `Getting product ID: ${_id}` : "Getting all products...");

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

			{/* Search bar */}
			<Autocomplete 
				options={products} // ✅ Store full objects
				getOptionLabel={(option) => option.name} // ✅ Properly map names
				sx={{ width: 500 }}
				renderInput={(params) => (
					<TextField {...params} label="Search Products..." />
				)}
			/>

			{/* Product List */}
			<div className="container"> {/* ✅ Flexbox container */}
				{products.length > 0 ? (
					products.map((product) => (
						<div key={product.id} className="itemContainer"> 
							<h3>{product.name} {id && `- (id: ${id})`}</h3>
							<img className="image" src={product.image} alt={product.name} />
							<Link to="/item" state={{...product}}>
  <span className="productPageLink"></span>
</Link>
								
						</div>
					))
				) : (
					<p>Product not found</p>
				)}
			</div>
		</>
	);
}

export default ProductsTestPage;
