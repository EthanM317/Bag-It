import { useLocation, useNavigate } from "react-router-dom";
import "../styles/Item.css";
import TopPanelBar from "../components/TopPanelBar";
import { Button } from "@mui/material";
import AddButton from "../components/Bags/AddButton";

export default function Item() {
  const location = useLocation();
  const navigate = useNavigate();
  const product = location.state;
  var addClicked = false;

  // Redirect if no product data is found
  if (!product) {
    navigate("/products"); // Redirect back to product list
    return null;
  }

  function addPressed() {
      console.log("Add clicked!")
      addClicked = true;
    }


  return ( <>
    <TopPanelBar />
    

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
        <h2 className="tag">Size: {{ 0: "Extra Small", 1: "Small", 2: "Medium", 3: "Large", 4: "Extra Large" }[product.size] || "N/A"}</h2>
        <h2 className="tag">Type: {{ 0: "Shorts", 1: "Pants", 2: "T-Shirt", 3: "Dress", 4: "Shoes", 5: "Hat", 6: "Hoodie", 7: "Shirt" }[product.type]|| "N/A"}</h2>
        <h2 className="tag">Colour: {product.color|| "N/A"}</h2>
        <h2 className="tag">Gender: {{0: "Male", 1: "Female", 2: "Unisex"}[product.gender] || "N/A"}</h2>
        <h2 className="tag">Brand: {product.brand || "N/A"}</h2>
      </div>

      <Button className="addButton" variant="contained" onClick={addPressed}>
            Add Me to a Bag!
          </Button>
          {addClicked && (
            <>
              <script>console.log(addClicked)</script>
						  <AddButton/>
            </>
            
					)}
    </div>
  </>

  );
}
