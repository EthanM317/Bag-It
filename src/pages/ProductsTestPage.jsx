import { useParams } from "react-router";
import { api, Backend } from "../api";
import { Url } from "../constants";
import { useEffect, useState } from "react";
import { Autocomplete, TextField } from "@mui/material";
import React from 'react';
import { Link } from 'react-router-dom';
import NavBar from "../components/NavBar";
import { useRef } from 'react';


function ProductsTestPage() {
    const [products, setProducts] = useState([]);
    const [filters, setFilters] = useState({ size: [], type: [], color: [], gender: [], brand: [] });
    const [hoveredCategory, setHoveredCategory] = useState(null);
    const { id } = useParams();
    const [activeCategory, setActiveCategory] = useState(null);
    const dropdownRef = useRef(null);

    useEffect(() => {
        getProductFromId(id);
    }, [id]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setActiveCategory(null);
            }
        };
        
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

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
    }

    const handleFilterChange = (category, newValues) => {
        setFilters(prevFilters => ({ ...prevFilters, [category]: newValues }));
    };

    const filterMappings = {
        size: { "Extra Small": 0, "Small": 1, "Medium": 2, "Large": 3, "Extra Large": 4 },
        type: { "Shorts": 0, "Pants": 1, "T-Shirt": 2, "Dress": 3, "Shoes": 4, "Hat": 5, "Hoodie": 6, "Shirt": 7 },
        gender: { "Male": 0, "Female": 1, "Unisex": 2 }
    };

    function getIcon(category, option) {
        if (category === 'color') {
            const colorMap = {
                white: '⚪', black: '⚫', gray: '⬜', blue: '🔵',
                red: '🔴', green: '🟢', pink: '🌸'
            };
            return colorMap[option.toLowerCase()] || '🎨';
        }

        if (category === 'gender') {
            if (option === 'Male') return '👨';
            if (option === 'Female') return '👩';
            if (option === 'Unisex') return '🧑';
        }

        if (category === 'brand') return '👜';
        if (category === 'type') return '👕';
        if (category === 'size') return '📏';

        return '🔹';
    }

    // Filtered product list for count and display
    const filteredProducts = products.filter(product => {
        return Object.entries(filters).every(([category, selectedValues]) => {
            if (selectedValues.length === 0) return true;
            return selectedValues.some(value => {
                if (category in filterMappings) {
                    return filterMappings[category][value] === product[category];
                }
                return value === product[category];
            });
        });
    });

    return (
        <>
            <NavBar />
            {/* Sticky and styled header */}
            <div style={{
                position: 'sticky',
                top: 0,
                zIndex: 1000,
                backgroundColor: '#0c002b',
                padding: '40px 20px',
                textAlign: 'center',
                animation: 'fadeIn 1s ease-in-out',
            }}>
                <h1 style={{
                    fontSize: '3rem',
                    fontWeight: 'bold',
                    color: 'white',
                    marginBottom: '10px',
                }}>Products List</h1>

                <p style={{
                    fontSize: '1.2rem',
                    color: '#ccc',
                    marginBottom: '10px',
                }}>Here are all the products tailored just for you. Filter, hover, explore.</p>

                <p style={{
                    fontSize: '1rem',
                    color: '#9b59b6',
                    marginTop: '10px',
                    fontWeight: 600,
                }}>
                    🛍️ Displaying {filteredProducts.length} Product{filteredProducts.length !== 1 ? 's' : ''}
                </p>
            </div>

            {/* Category Dropdown Bar */}
            <div className="category-bar" style={{ marginBottom: '20px', textAlign: 'center' }} ref = {dropdownRef}>
                {Object.entries({
                    size: ["Extra Small", "Small", "Medium", "Large", "Extra Large"],
                    type: ["Shorts", "Pants", "T-Shirt", "Dress", "Shoes", "Hat", "Hoodie", "Shirt"],
                    color: ["White", "Black", "Gray", "Blue", "Red", "Green", "Pink"],
                    gender: ["Male", "Female", "Unisex"],
                    brand: ["Nike", "Jordan", "Tommy Hilfiger", "Gucci"]
                }).map(([category, options]) => (
                    <div
                        key={category}
                        onClick={() => setActiveCategory(activeCategory === category ? null : category)}
                        style={{ position: 'relative', display: 'inline-block', marginRight: '10px' }}
                    >
                        <div style={{
                            backgroundColor: filters[category].length > 0 ? '#6c3483' : '#1a1a2e',
                            color: 'white',
                            padding: '12px 24px',
                            borderRadius: '14px',
                            cursor: 'pointer',
                            fontWeight: 'bold',
                            fontSize: '1rem',
                            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.6)',
                            transition: '0.3s',
                        }}>
                            {category.toUpperCase()}
                        </div>
                
                        {activeCategory === category && (
                               <div style={{
                                position: 'absolute',
                                top: '110%',
                                left: 0,
                                backgroundColor: '#1f1f2f',
                                padding: '16px',
                                borderRadius: '16px',
                                boxShadow: '0 10px 24px rgba(0,0,0,0.5)',
                                zIndex: 20,
                                marginTop: '12px',
                                minWidth: category === "size" ? '240px' : '260px',
                                maxWidth: '500px',
                                display: 'flex',
                                flexWrap: 'wrap',
                                gap: '12px',
                                justifyContent: category === "size" ? 'center' : 'flex-start',
                                transition: 'opacity 0.3s ease, transform 0.3s ease',
                                transform: 'translateY(0)',
                            }}>
                                    {filters[category].length > 0 && (
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setFilters(prev => ({ ...prev, [category]: [] }));
                                            }}
                                            style={{
                                                background: 'none',
                                                border: 'none',
                                                color: '#ff6b6b',
                                                fontSize: '1.2rem',
                                                cursor: 'pointer',
                                                fontWeight: 'bold',
                                                transition: '0.3s'
                                            }}
                                            title={`Clear ${category}`}
                                        >
                                            ×
                                        </button>
                                    )}
                                
                            
                                {options.map(option => (
                                    <div
                                        key={option}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleFilterChange(category, [option]);
                                        }}
                                        style={{
                                            padding: category === "color" ? '0' : '10px 14px',
                                            borderRadius: category === "color" ? '50%' : '12px',
                                            backgroundColor: category === "color" ? option.toLowerCase() : (filters[category].includes(option) ? '#6c3483' : '#2e2e40'),
                                            color: category === "color" ? 'transparent' : 'white',
                                            textAlign: 'center',
                                            fontSize: '0.95rem',
                                            fontWeight: '500',
                                            cursor: 'pointer',
                                            boxShadow: category === "color" ? 'inset 0 0 0 2px white' : '0 0 6px rgba(0,0,0,0.2)',
                                            height: category === "color" ? '36px' : 'auto',
                                            width: category === "color" ? '36px' : 'auto',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            transition: 'all 0.3s ease',
                                        }}
                                        onMouseEnter={(e) => {
                                            if (category !== "color") {
                                                e.currentTarget.style.backgroundColor = '#9b59b6';
                                                e.currentTarget.style.transform = 'scale(1.03)';
                                            }
                                        }}
                                        onMouseLeave={(e) => {
                                            if (category !== "color") {
                                                e.currentTarget.style.backgroundColor = filters[category].includes(option) ? '#6c3483' : '#2e2e40';
                                                e.currentTarget.style.transform = 'scale(1)';
                                            }
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
                ))}
                {/* Button to clear all filters */}
                {Object.values(filters).some(filterArray => filterArray.length !== 0) && (
    <button
        onClick={() => setFilters({ size: [], type: [], color: [], gender: [], brand: [] })}
        style={{
            marginLeft: '16px',
            backgroundColor: '#ff4d4d',
            color: 'white',
            padding: '8px 16px',
            fontSize: '0.95rem',
            fontWeight: 'bold',
            border: 'none',
            borderRadius: '12px',
            cursor: 'pointer',
            boxShadow: '0 4px 10px rgba(0,0,0,0.3)',
            transition: '0.3s ease',
        }}
        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#e04343'}
        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#ff4d4d'}
    >
        Clear All
    </button>
)}
                
            </div>

            {/* Product List */}
            <div className="container" style={{
                backgroundColor: 'white',
                padding: '20px',
                borderRadius: '12px',
                marginTop: '20px'
            }}>
                {filteredProducts.length > 0 ? (
                    filteredProducts.map((product) => (
                        <div
                            key={product.id}
                            className="itemContainer"
                            style={{
                                backgroundColor: '#d4f0f7',
                                borderRadius: '12px',
                                padding: '10px',
                                textAlign: 'center',
                                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                                cursor: 'pointer',
                                transformOrigin: 'center',
                                margin: '10px'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'scale(1.05)';
                                e.currentTarget.style.boxShadow = '0 6px 16px rgba(0, 0, 0, 0.2)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'scale(1)';
                                e.currentTarget.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';
                            }}
                        >
                            <h3>{product.name} {id && `- (id: ${id})`}</h3>
                            <img className="image" src={product.image} alt={product.name} style={{ maxWidth: '100%', borderRadius: '8px' }} />
                            <Link to="/item" state={{ ...product }}>
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
