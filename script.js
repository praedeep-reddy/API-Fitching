document.addEventListener('DOMContentLoaded', () => {
    fetchData(); 

    const menuItems = document.querySelectorAll('#menu a'); 
    menuItems.forEach(item => {
        item.addEventListener('click', (event) => {
            event.preventDefault(); 
            const category = event.target.getAttribute('data-category');
           
        });
    });
});

let allData = []; 

    //  fetch data 
function fetchData() {
    fetch('https://cdn.shopify.com/s/files/1/0564/3685/0790/files/multiProduct.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json(); 
        })
        .then(data => {
            allData = data.categories; 
            displayData(allData); 
        })
        .catch(error => {
            displayErrorMessage('There was an error fetching the data.'); 
        });
}

    // display data 
function displayData(categories) {
    console.log('Displaying data:', categories); 

    const content = document.getElementById('content'); 
    content.innerHTML = ''; 

    categories.forEach(categoryData => {
        const categoryDiv = document.createElement('div'); 
        categoryDiv.classList.add('category'); 

        //  h2
        const categoryTitle = document.createElement('h2'); 
        categoryTitle.textContent = categoryData.category; 
        categoryDiv.appendChild(categoryTitle);

        const productGrid = document.createElement('div');
        productGrid.classList.add('product-grid');

        categoryData.category_products.forEach(product => {

            //  product card
            const productCard = document.createElement('div'); 
            productCard.classList.add('product-card'); 

            //  image
            const productImage = document.createElement('img'); 
            productImage.src = product.image; 
            productImage.alt = product.title; 
            productCard.appendChild(productImage); 

            //   name
            const productTitle = document.createElement('h3'); 
            productTitle.textContent = product.title; 
            productCard.appendChild(productTitle);

            //    price
            const productPrice = document.createElement('p'); 
            productPrice.classList.add('price'); 
            productPrice.textContent = `Price: ₹${product.price}`; 
            productCard.appendChild(productPrice); 

            //    compare
            const compareAtPrice = document.createElement('p'); 
            compareAtPrice.classList.add('compare-at-price'); 
            compareAtPrice.textContent = `Compare at: ₹${product.compare_at_price}`;
            productCard.appendChild(compareAtPrice); 

            //     vendor
            const vendor = document.createElement('p'); 
            vendor.classList.add('vendor');
            vendor.textContent = `Vendor: ${product.vendor}`; 
            productCard.appendChild(vendor); 

            //    badge
            const badge = document.createElement('p'); 
            badge.classList.add('badge'); 
            badge.textContent = product.badge_text; 
            productCard.appendChild(badge); 

            const cart = document.createElement('p'); 
            badge.classList.add('cart'); 
            badge.textContent = 'Add Cart'; 
            productCard.appendChild(cart); 

            productGrid.appendChild(productCard); 
        });

        categoryDiv.appendChild(productGrid); 
        content.appendChild(categoryDiv); 
    });
}



    // display error 
function displayErrorMessage(message) {
    const content = document.getElementById('content');
    // content.innerHTML = ''; 
    const errorMessage = document.createElement('p'); 
    errorMessage.textContent = message;
    content.appendChild(errorMessage); 
}
