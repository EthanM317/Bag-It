import { useLocation, useNavigate } from "react-router-dom";
import "../styles/Item.css";

export default function Item() {
  const location = useLocation();
  const navigate = useNavigate();
  const product = location.state;

  // Redirect if no product data is found
  if (!product) {
    navigate("/products"); // Redirect back to product list
    return null;
  }

  return (
    <div className="ItemContainer">
      {/* Conditionally render image only if `product.image` is available */}
      {product.image ? (
        <img src={product.image} alt={product.name} className="Image" />
      ) : (
        <p>No image available</p> // Provide a fallback message or image
      )}

      <div className="ItemInfo">
        <h1 className="Name">{product.name || "Unknown Product"}</h1>
        <p className="description">{product.description || "No description available."}</p>
      </div>
      <div className="tagList">
        <h2 className="tag">Size: {product.size || "N/A"}</h2>
        <h2 className="tag">Type: {product.type || "N/A"}</h2>
        <h2 className="tag">Colour: {product.color || "N/A"}</h2>
        <h2 className="tag">Gender: {product.gender || "N/A"}</h2>
        <h2 className="tag">Brand: {product.brand || "N/A"}</h2>
      </div>
    </div>
  );
}
