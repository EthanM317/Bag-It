import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "../styles/Home.css";
import TopPanelBar from "../components/TopPanelBar.jsx";
import Title from "../components/Title.jsx";

function HomePage() {
  return <>
    <TopPanelBar/>
    <Title/>
  </>;
}

export default HomePage;