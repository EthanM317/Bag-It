import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import "../styles/Item.css";
import TopPanelBar from "../components/TopPanelBar";
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, Box } from "@mui/material";
import TopBar from "../components/TopBar";
import TopContainer from "../components/TopContainer";

export default function Item() {
  const location = useLocation();
  const navigate = useNavigate();
  const product = location.state;
  const [openExistingDialog, setOpenExistingDialog] = useState(false);
  const [openNewDialog, setOpenNewDialog] = useState(false);

  // Redirect if no product data is found
  if (!product) {
    navigate("/products");
    return null;
  }

  return (
    <Box>
      <TopContainer>
        <TopBar />

      <div className="ItemContainer">
        {product.image ? (
          <img src={product.image} alt={product.name} className="Image" />
        ) : (
          <p>No image available</p>
        )}

        <div className="ItemInfo">
          <h1 className="Name">{product.name || "Unknown Product"}</h1>
          <p className="description">{product.description || "No description available."}</p>
        </div>

        <div className="tagList">
          <h2 className="tag">
            Size: {({ 0: "Extra Small", 1: "Small", 2: "Medium", 3: "Large", 4: "Extra Large" }[product.size]) || "N/A"}
          </h2>
          <h2 className="tag">
            Type: {({ 0: "Shorts", 1: "Pants", 2: "T-Shirt", 3: "Dress", 4: "Shoes", 5: "Hat", 6: "Hoodie", 7: "Shirt" }[product.type]) || "N/A"}
          </h2>
          <h2 className="tag">Colour: {product.color || "N/A"}</h2>
          <h2 className="tag">
            Gender: {({ 0: "Male", 1: "Female", 2: "Unisex" }[product.gender]) || "N/A"}
          </h2>
          <h2 className="tag">Brand: {product.brand || "N/A"}</h2>
        </div>

        <div className="addButtons">
          <div className="existing">
            <Button
              className="addToExistingButton"
              variant="contained"
              onClick={() => setOpenExistingDialog(true)}
            >
              Add Me to Existing Bag!
            </Button>

            <Dialog open={openExistingDialog} onClose={() => setOpenExistingDialog(false)}>
              <DialogTitle>Select a Bag</DialogTitle>
              <DialogContent>
                <p>Here you can select an existing bag to add this product to.</p>
              </DialogContent>
              <DialogActions>
                <Button onClick={() => setOpenExistingDialog(false)}>Cancel</Button>
                <Button
                  onClick={() => {
                    setOpenExistingDialog(false);
                  }}
                  variant="contained"
                >
                  Confirm
                </Button>
              </DialogActions>
            </Dialog>
          </div>

          <div className="new">
            <Button
              className="addToNewButton"
              variant="contained"
              onClick={() => setOpenNewDialog(true)}
            >
              Add Me to New Bag!
            </Button>

            <Dialog open={openNewDialog} onClose={() => setOpenNewDialog(false)}>
              <DialogTitle>Create a New Bag</DialogTitle>
              <DialogContent>
                <p>Here you can create a new bag to add this product to.</p>
              </DialogContent>
              <DialogActions>
                <Button onClick={() => setOpenNewDialog(false)}>Cancel</Button>
                <Button
                  onClick={() => {
                    setOpenNewDialog(false);
                  }}
                  variant="contained"
                >
                  Confirm
                </Button>
              </DialogActions>
            </Dialog>
          </div>
        </div>
      </div>
      </TopContainer>
    </Box>
  );
}
