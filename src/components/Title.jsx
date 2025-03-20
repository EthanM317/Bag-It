// import "../styles/Home.css"

import { useNavigate } from "react-router";
import { Button } from "@mui/material";
import { Url } from "../constants.js";

function Title() {

  const navigate = useNavigate();
  

	function FeedPressed() {
		navigate(Url.FEED);
	}

    return (
      <div className='title'>
        <h1>Welcome to Bag-It!</h1>
        <div className='catchphrase'>
          <Button variant="contained" onClick={FeedPressed}>
            Find Your Next Fit
          </Button>
        </div>
      </div>
    )
}

export default Title