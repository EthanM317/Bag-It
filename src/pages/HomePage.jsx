import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import TopPanelBar from "../components/TopPanelBar.jsx";
import Title from "../components/Title.jsx";
import "../styles/Home.css";
import { Button } from "@mui/material";

function HomePage() {
  return <>
    <TopPanelBar/>
    <Title/>

    {/* We'll fix all this weird styling up later  */}
    <div style={{
      textAlign: "center"
    }}>
      <Button variant="contained">Login</Button>

    </div>
  </>;
}

export default HomePage;