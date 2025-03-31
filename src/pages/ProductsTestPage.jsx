import { useParams } from "react-router";
import { api, Backend } from "../api";
import { Url } from "../constants";
import { useEffect, useState } from "react";
import { Autocomplete, TextField, ToggleButtonGroup, ToggleButton, Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import React from 'react';
import { Link } from 'react-router-dom';
import NavBar from "../components/NavBar";

function ProductsTestPage() {
    const [products, setProducts] = useState([]);
    const [filters, setFilters] = useState({ size: [], type: [], color: [], gender: [], brand: [] });
    const { id } = useParams();

    useEffect(() => {
        getProductFromId(id);
    }, [id]);

    async function getProductFromId(_id) {
        if (_id && isNaN(_id)) {
            setProducts([]);
            return;
        }

        console.log(_id ? `Getting product ID: ${_id}` : "Getting all products...");

        if (_id) {
            setProducts(await Backend.getClothingItem(_id));
            return;
        }

        setProducts(await Backend.getAllClothingItems()); 

        // try {
        //     let url = Url.BACKEND_CLOTHING;
        //     if (_id) url += "?itemId=" + _id;

        //     const res = await api.get(url);
        //     setProducts(res.data);
        // } catch (error) {
        //     alert(error);
        // }
    }

    const handleFilterChange = (category, newValues) => {
        setFilters(prevFilters => ({ ...prevFilters, [category]: newValues }));
    };
    
    const filterMappings = {
        size: { "Extra Small": 0, "Small": 1, "Medium": 2, "Large": 3, "Extra Large": 4 },
        type: { "Shorts": 0, "Pants": 1, "T-Shirt": 2, "Dress": 3, "Shoes": 4, "Hat": 5, "Hoodie": 6, "Shirt": 7 },
        gender: { "Male": 0, "Female": 1, "Unisex": 2 }
    };

    return (
        <>
            <NavBar />
            <h1>Products List</h1>
            {!id && <h2>Here are all the products</h2>}

            {/* 
<Autocomplete 
    options={products}
    getOptionLabel={(option) => option.name}
    sx={{ width: 500 }}
    renderInput={(params) => (
        <TextField {...params} label="Search Products..." />
    )}
/> 
*/}


            {/* Category Bar */}
            <div className="category-bar">
                {Object.entries({
                    size: ["Extra Small", "Small", "Medium", "Large", "Extra Large"],
                    type: ["Shorts", "Pants", "T-Shirt", "Dress", "Shoes", "Hat", "Hoodie", "Shirt"],
                    color: ["white", "black", "gray", "blue", "red", "green", "pink"],
                    gender: ["Male", "Female", "Unisex"],
                    brand: ["Nike", "Jordan", "Tommy Hilfiger", "Gucci"]
                }).map(([category, options]) => (
                    <Accordion 
                    key={category}
                    sx={{
                        backgroundColor: '#1a1a2e',
                        color: 'white',
                        borderRadius: 2,
                        boxShadow: 3,
                        marginBottom: 2
                    }}
                >
                    <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: 'white' }} />}>
                        <h3>{category.charAt(0).toUpperCase() + category.slice(1)}</h3>
                    </AccordionSummary>
                    <AccordionDetails>
                        <ToggleButtonGroup
                            value={filters[category]}
                            onChange={(event, newValues) => handleFilterChange(category, newValues)}
                            aria-label={category}
                            size="small"
                        >
                            {options.map(option => (
  <ToggleButton
    key={option}
    value={option}
    aria-label={option}
    sx={{
      color: 'white',
      borderColor: '#9b59b6',
      '&.Mui-selected': {
        backgroundColor: '#9b59b6',
        color: 'white',
        transform: 'scale(1.08)',
        boxShadow: '0px 0px 10px #9b59b6',
      },
      '&:hover': {
        backgroundColor: '#6c3483',
        color: 'white',
        transform: 'translateY(-2px) scale(1.03)',
        boxShadow: '0px 4px 12px rgba(155, 89, 182, 0.6)',
      },
      transition: 'all 0.3s ease-in-out',
      margin: 0.5,
      borderRadius: 2
    }}
  >
    {option}
  </ToggleButton>
))}
                        </ToggleButtonGroup>
                    </AccordionDetails>
                </Accordion>
                
                ))}
            </div>


            {/* Product List */}
            <div className="container">
                {products.length > 0 ? (
                    products.filter(product => {
                            return Object.entries(filters).every(([category, selectedValues]) => {
                                if (selectedValues.length === 0) return true; // No filter applied for this category
                                return selectedValues.some(value => {
                                    if (category in filterMappings) {
                                        return filterMappings[category][value] === product[category]; // Convert label to int for comparison
                                    }
                                    return value === product[category]; // Direct comparison for color and brand (strings)
                                });
                            });
                        })
                        .map((product) => (
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
