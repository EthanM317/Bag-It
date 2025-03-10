import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import TopPanelBar from "../components/TopPanelBar.jsx";
import Title from "../components/Title.jsx";
// import "../styles/Home.css";

function HomePage() {
  return <>
    <TopPanelBar/>
    <Title/>
  </>;
}

export default HomePage;