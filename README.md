# 🛍️ Bag-It!

## 📌 Project Overview

**Bag-It!** ! is an online fashion platform that allows users to browse a vast catalog of clothing through search functions. 
Users can add items to a virtual bag, which can be shared with other users or displayed on their profile.
It offers a diverse range of clothing categories to suit all styles.
To keep up with trends, users can view the most bagged items to see what's baggin' and to inspire their own bags.
Users can also randomize their bags with a single click.
Bag-It! aims to be an accessible and intuitive tool for people who want to put together virtual outfits.

## Clothing Categories
### Sizes
`Extra Small` | `Small` | `Medium` | `Large` | `Extra Large`

### Types
`Shorts` | `Pants` | `T-Shirts` | `Dresses` | `Shoes` | `Hats` | `Hoodies` | `Shirts`

### Colors
`White` | `Black` | `Gray` | `Blue` | `Red` | `Green` | `Pink`

### Genders
`Male` | `Female` | `Unisex`

### Brands
`Nike` | `Jordan` | `Tommy Hilfiger` | `Gucci`

---

## Build Instructions
### Clone the Repository
Open terminal and run the following commands:
```bash
git clone https://github.com/EthanM317/Bag-It
```

### Install Dependencies and Run test Server 
This project uses *Node Package Manager (npm)* to manage dependencies. Make sure to install NodeJS before proceeding to the next part of the step.

The batch script `run.bat`, in the root directory, will install all dependencies for you on the first run.
After the dependencies are installed (and on every subsequent run), the script will attempt to start a test server.

On success, it will output something like this:

![Example output](./blueprint/TestExample.png)

Paste http://localhost:5173/ into your browser of choice to preview the website. 

## Alternative for MacOS/Linux Users [Terminal] 
### Install the dependencies: 
`npm install`
### Start development server: 
`npm run dev` or alternatively `npm start` 
### Open the website in your browser: 


Paste http://localhost:5173/ into your browser of choice to preview the website.

### 🧩 Test Credentials Format

Usernames and passwords used for testing in this project follow a simple format suitable for local development. Here's what to know:

#### ✅ Username Format
- Begins with an **uppercase letter** (e.g., `N`)
- Followed by lowercase letters or numbers (e.g., `ewUser1`)
- No special characters are required
- Example: `NewUser1`

#### ✅ Password Format
- For testing purposes, passwords are **short and simple**
- They may consist of:
  - **Lowercase or uppercase letters**
  - **Optional symbols or numbers**

> ⚠️ **Note:** These formats are intentionally minimal for convenience during testing. For real user accounts, implement strong password rules and validation.






### Backend 
To run Django backend unit tests: 

1.) `cd backend`

2.) `python manage.py test`

