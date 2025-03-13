import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Url } from "../constants";
import { api, Backend } from "../api";

function BagPage() {
	const navigate = useNavigate();
	const { bagId } = useParams();

	useEffect(() => {
        // TODO: Consider having a "search for bags" page?
        if (!bagId) {
            // This url is invalid, just go back to profile
            navigate(Url.PROFILE);
        }

        // console.log(Backend.getUsers());
    }, []);

 
	return <>
        
    </>;
}

export default BagPage;
