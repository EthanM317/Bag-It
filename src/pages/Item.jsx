import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import image from '../assets/pear.png'
import "../styles/Item.css";

function Item() {
  return <>
    {/*image of product*/}
    <img src={image} alt="image of product" className="Image" />
    <div className="ItemInfo">
        <h1 className="Name">This is the item name</h1>
        <p className="description">This bold update to the AJ4 turns a classic into a showstopper. Premium materials, like soft, supple leather, give these kicks a luxurious look and feel. Gold details, like a detachable Jumpman tag, pop against the Triple White upper, putting all eyes on you. Lace 'em up and step into nothing-but-net style.</p>
    </div>
    <div className="tagList">
        <h2 className="tag">Size:</h2>
        <h2 className="tag">Type:</h2>
        <h2 className="tag">Colour:</h2>
        <h2 className="tag">Gender:</h2>
        <h2 className="tag">Brand:</h2>
    </div>
  </>;
}

export default Item;