import logo from '../assets/pear.png';
import TextField from '@mui/material/TextField';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import SearchIcon from '@mui/icons-material/Search';
// import "../styles/Home.css"

//Top panel bar of the homepage. Contains logo, search bar, as well as account&bag icons

//TODO: add search functionality
//change account and bag icons to buttons
function TopPanelBar() {

  return (
    <div className='topPanelBar'>
      <img className='logo' alt="Logo" src={logo} />
      <div className='searchBar'>
        <TextField label="Search" id="fullWidth" />
        <SearchIcon className='searchIcon' />
      </div>
      <div className='accountBar'>
        <AccountCircleIcon  className='account' style={{ fontSize: "50px" }}/>
        <ShoppingBagIcon  className='bag' style={{ fontSize: "50px" }}/>
        
      </div>
      {/* <div className='categoryBar'>
        <h4>Popular Categories</h4>
      </div> */}
    </div>
    
    
  )
}

export default TopPanelBar
