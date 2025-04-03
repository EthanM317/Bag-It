import { useParams } from "react-router";
import { api, Backend } from "../api";
import { Url } from "../constants";
import { useEffect, useState, useRef } from "react";
import React from "react";
import { Link } from "react-router-dom";
import NavBar from "../components/NavBar";
import TopContainer from "../components/TopContainer;";
import TopBar from "../components/TopBar";
import { Box, Container } from "@mui/material";

function ProductsTestPage() {
	const [products, setProducts] = useState([]);
	const [filters, setFilters] = useState({
		size: [],
		type: [],
		color: [],
		gender: [],
		brand: [],
	});
	const { id } = useParams();
	const [activeCategory, setActiveCategory] = useState(null);
	const dropdownRef = useRef(null);

	useEffect(() => {
		getProductFromId(id);
	}, [id]);

	useEffect(() => {
		const handleClickOutside = (event) => {
			if (
				dropdownRef.current &&
				!dropdownRef.current.contains(event.target)
			) {
				setActiveCategory(null);
			}
		};
		document.addEventListener("click", handleClickOutside);
		return () => {
			document.removeEventListener("click", handleClickOutside);
		};
	}, []);

	async function getProductFromId(_id) {
		if (_id && isNaN(_id)) {
			setProducts([]);
			return;
		}

		if (_id) {
			setProducts(await Backend.getClothingItem(_id));
			return;
		}

		setProducts(await Backend.getAllClothingItems());
	}

	const handleFilterChange = (category, value) => {
		setFilters((prev) => {
			const alreadySelected = prev[category].includes(value);
			const updatedCategory = alreadySelected
				? prev[category].filter((v) => v !== value)
				: [...prev[category], value];
			return { ...prev, [category]: updatedCategory };
		});
	};

	const filterMappings = {
		size: { XS: 0, S: 1, M: 2, L: 3, XL: 4, XXL: 5, "3XL": 6 },
		type: {
			Shorts: 0,
			Pants: 1,
			"T-Shirt": 2,
			Dress: 3,
			Shoes: 4,
			Hat: 5,
			Hoodie: 6,
			Shirt: 7,
		},
		gender: { Male: 0, Female: 1, Unisex: 2 },
	};

	const filteredProducts = products.filter((product) => {
		return Object.entries(filters).every(([category, selectedValues]) => {
			if (selectedValues.length === 0) return true;
			return selectedValues.some((value) => {
				if (category in filterMappings) {
					return (
						filterMappings[category][value] === product[category]
					);
				}
				return (
					value.toLowerCase() ===
					String(product[category]).toLowerCase()
				);
			});
		});
	});

	const filterOptions = {
		size: ["XS", "S", "M", "L", "XL"],
		type: [
			"Shorts",
			"Pants",
			"T-Shirt",
			"Dress",
			"Shoes",
			"Hat",
			"Hoodie",
			"Shirt",
		],
		color: ["White", "Black", "Gray", "Blue", "Red", "Green", "Pink"],
		gender: ["Male", "Female", "Unisex"],
		brand: ["Nike", "Jordan", "Tommy Hilfiger", "Gucci"],
	};

	return (
		<TopContainer>
			{/* <NavBar /> */}
			<TopBar />
			<Container maxWidth="lg">
				<div
					style={{
						position: "sticky",
						top: 0,
						zIndex: 1000,
						padding: "40px 20px",
						textAlign: "center",
                        animation: 'fadeIn 1s ease-in-out',
					}}
				>
					<h1
						style={{
							fontSize: "3rem",
							fontWeight: "bold",
							color: "white",
						}}
					>
						Products List
					</h1>
					<p style={{ fontSize: "1.2rem", color: "#ccc" }}>
						Here are all the products tailored just for you.
					</p>
					<p
						style={{
							fontSize: "1rem",
							color: "#9b59b6",
							marginTop: "10px",
							fontWeight: 600,
						}}
					>
						🏍️ Displaying {filteredProducts.length} Product
						{filteredProducts.length !== 1 ? "s" : ""}
					</p>
				</div>

				<div
					className="category-bar"
					style={{ margin: "20px auto", textAlign: "center" }}
					ref={dropdownRef}
				>
					{Object.entries(filterOptions).map(
						([category, options]) => (
							<div
								key={category}
								onClick={() =>
									setActiveCategory(
										activeCategory === category
											? null
											: category
									)
								}
								style={{
									position: "relative",
									display: "inline-block",
									marginRight: "12px",
								}}
							>
								<div
									style={{
										backgroundColor:
											filters[category].length > 0
												? "#6c3483"
												: "#1a1a2e",
										color: "white",
										padding: "12px 24px",
										borderRadius: "16px",
										cursor: "pointer",
										fontWeight: "bold",
										fontSize: "1rem",
										boxShadow:
											filters[category].length > 0
												? "0 0 12px #b084cc"
												: "0 4px 12px rgba(0,0,0,0.4)",
										transition: "all 0.3s ease",
										transform: "scale(1)",
									}}
									onMouseEnter={(e) => {
										e.currentTarget.style.boxShadow =
											"0 0 18px #b084cc";
										e.currentTarget.style.transform =
											"scale(1.08)";
									}}
									onMouseLeave={(e) => {
										e.currentTarget.style.boxShadow =
											filters[category].length > 0
												? "0 0 12px #b084cc"
												: "0 4px 12px rgba(0,0,0,0.4)";
										e.currentTarget.style.transform =
											"scale(1)";
									}}
								>
									{category.toUpperCase()}
								</div>

								{activeCategory === category && (
									<div
										style={{
											position: "absolute",
											top: "110%",
											left: 0,
											backgroundColor: "#1f1f2f",
											padding: "16px",
											borderRadius: "16px",
											boxShadow:
												"0 10px 24px rgba(0,0,0,0.5)",
											zIndex: 20,
											marginTop: "12px",
											minWidth:
												category === "size"
													? "240px"
													: "260px",
											maxWidth: "500px",
											display: "flex",
											flexWrap: "wrap",
											gap: "12px",
											justifyContent:
												category === "size"
													? "center"
													: "flex-start",
										}}
									>
										{filters[category].length > 0 && (
											<div
												style={{
													width: "100%",
													display: "flex",
													justifyContent: "flex-end",
													marginBottom: "8px",
												}}
											>
												<button
													onClick={(e) => {
														e.stopPropagation();
														setFilters((prev) => ({
															...prev,
															[category]: [],
														}));
													}}
													style={{
														backgroundColor:
															"#6c3483",
														border: "none",
														color: "white",
														padding: "6px 12px",
														borderRadius: "8px",
														fontWeight: "600",
														cursor: "pointer",
														transition:
															"all 0.3s ease",
													}}
													onMouseEnter={(e) =>
														(e.currentTarget.style.backgroundColor =
															"#9b59b6")
													}
													onMouseLeave={(e) =>
														(e.currentTarget.style.backgroundColor =
															"#6c3483")
													}
												>
													Clear
												</button>
											</div>
										)}
										{options.map((option) => (
											<div
												key={option}
												onClick={(e) => {
													e.stopPropagation();
													handleFilterChange(
														category,
														option
													);
												}}
												style={{
													padding:
														category === "color"
															? "0"
															: "10px 14px",
													borderRadius:
														category === "color"
															? "50%"
															: "12px",
													backgroundColor:
														category === "color"
															? option.toLowerCase()
															: filters[
																	category
															  ].includes(option)
															? "#6c3483"
															: "#2e2e40",
													color:
														category === "color"
															? "transparent"
															: "white",
													textAlign: "center",
													fontSize: "0.95rem",
													fontWeight: "500",
													cursor: "pointer",
													boxShadow:
														category === "color"
															? filters[
																	category
															  ].includes(option)
																? "0 0 20px 4px #9b59b6, inset 0 0 0 3px white"
																: "inset 0 0 0 2px white"
															: "0 0 6px rgba(0,0,0,0.2)",
													height:
														category === "color"
															? "48px"
															: "auto",
													width:
														category === "color"
															? "48px"
															: "auto",
													display: "flex",
													alignItems: "center",
													justifyContent: "center",
													transition: "all 0.3s ease",
												}}
												onMouseEnter={(e) => {
													e.currentTarget.style.boxShadow =
														"0 0 20px #9b59b6";
													e.currentTarget.style.transform =
														"scale(1.08)";
												}}
												onMouseLeave={(e) => {
													e.currentTarget.style.boxShadow =
														category === "color"
															? filters[
																	category
															  ].includes(option)
																? "0 0 20px 4px #9b59b6, inset 0 0 0 3px white"
																: "inset 0 0 0 2px white"
															: filters[
																	category
															  ].includes(option)
															? "0 0 6px #6c3483"
															: "0 0 6px rgba(0,0,0,0.2)";
													e.currentTarget.style.transform =
														"scale(1)";
												}}
											>
												{category !== "color" && (
													<span>{option}</span>
												)}
											</div>
										))}
									</div>
								)}
							</div>
						)
					)}

					{Object.values(filters).some((arr) => arr.length > 0) && (
						<button
							onClick={() =>
								setFilters({
									size: [],
									type: [],
									color: [],
									gender: [],
									brand: [],
								})
							}
							style={{
								marginLeft: "16px",
								backgroundColor: "#ff4d4d",
								color: "white",
								padding: "8px 16px",
								fontSize: "0.95rem",
								fontWeight: "bold",
								border: "none",
								borderRadius: "12px",
								cursor: "pointer",
								boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
								transition: "0.3s ease",
							}}
							onMouseEnter={(e) =>
								(e.currentTarget.style.backgroundColor =
									"#e04343")
							}
							onMouseLeave={(e) =>
								(e.currentTarget.style.backgroundColor =
									"#ff4d4d")
							}
						>
							Clear All
						</button>
					)}
				</div>

				<div
					className="container"
					style={{
						backgroundColor: "white",
						padding: "20px",
						borderRadius: "12px",
						marginTop: "20px",
						display: "flex",
						flexWrap: "wrap",
						gap: "20px",
						justifyContent: "center",
					}}
				>
					{filteredProducts.length > 0 ? (
						filteredProducts.map((product) => (
							<div
								key={product.id}
								className="itemContainer"
								style={{
									backgroundColor: "#1e1e2f", // Darker card background
									borderRadius: "12px",
									padding: "10px",
									textAlign: "center",
									transition:
										"transform 0.3s ease, box-shadow 0.3s ease",
									boxShadow: "0 2px 8px rgba(0, 0, 0, 0.3)",
									cursor: "pointer",
									transformOrigin: "center",
									width: "200px",
									color: "white", // White text for readability
								}}
								onMouseEnter={(e) => {
									e.currentTarget.style.transform =
										"scale(1.05)";
									e.currentTarget.style.boxShadow =
										"0 8px 24px rgba(155, 89, 182, 0.6)";
								}}
								onMouseLeave={(e) => {
									e.currentTarget.style.transform =
										"scale(1)";
									e.currentTarget.style.boxShadow =
										"0 2px 8px rgba(0, 0, 0, 0.3)";
								}}
							>
								<h3
									style={{
										fontSize: "1rem",
										fontWeight: "600",
										marginBottom: "8px",
									}}
								>
									{product.name} {id && `- (id: ${id})`}
								</h3>
								<img
									className="image"
									src={product.image}
									alt={product.name}
									style={{
										maxWidth: "100%",
										borderRadius: "8px",
									}}
								/>
								<Link to="/item" state={{ ...product }}>
									<span className="productPageLink"></span>
								</Link>
							</div>
						))
					) : (
						<p>No products match the selected filters.</p>
					)}
				</div>
			</Container>
		</TopContainer>
	);
}

export default ProductsTestPage;
