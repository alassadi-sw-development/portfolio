"use strict";

function allIndex(){

    const searchBtn = document.querySelector(".js-search-button");
    const searchbar = document.querySelector(".js-search-bar");
    searchBtn.addEventListener("click", ()=>{
        let searchString =searchbar.value;
        let newProducts = [];
        if (searchString){
            products = JSON.parse(localStorage.getItem("products"));
            products.forEach((product)=>{
                if(product.name.includes(searchString)){
                    newProducts.push(product);
                }
            });
            products = newProducts;
            renderProducts();
        }else {
            products = JSON.parse(localStorage.getItem("products"));
            renderProducts();
        }
    });

    searchbar.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            let searchString =searchbar.value;
            let newProducts = [];
            if (searchString){
                products = JSON.parse(localStorage.getItem("products"));
                products.forEach((product)=>{
                    if(product.name.includes(searchString)){
                        newProducts.push(product);
                    }
                });
                products = newProducts;
                renderProducts();
            }else {
                products = JSON.parse(localStorage.getItem("products"));
                renderProducts();
            }
        }
    });
    
    const deliveryOptions = [
        {
            id: '1',
            deliveryDate: getDateAfterDays(7),
            priceCents: 0
        },
        {
            id: '2',
            deliveryDate: getDateAfterDays(3),
            priceCents: 499
        },
        {
            id: '3',
            deliveryDate: getDateAfterDays(1),
            priceCents: 999
        }
    ];
    
    //empty cart initialzation
    let cart = JSON.parse(localStorage.getItem('cart'));
    if(!cart){
        cart = [];
    }
    
    // Select the container where products will be appended
    const productsGrid = document.querySelector(".js-products-grid");
    
    // Loop through each product
    function renderProducts(){
        
        productsGrid.innerHTML="";
        
        for (let i = 0; i < products.length; i++) {
        const product = products[i];
    
        // Create main container
        const productContainer = document.createElement('div');
        productContainer.classList.add('product-container');
    
        // Create product image container
        const imageContainer = document.createElement('div');
        imageContainer.classList.add('product-image-container');
    
        // Create image element
        const productImage = document.createElement('img');
        productImage.classList.add('product-image');
        productImage.setAttribute('src', product.image);
        productImage.setAttribute('alt', 'product-image');
    
        // Append image to image container
        imageContainer.appendChild(productImage);
    
        // Create product name element
        const productName = document.createElement('div');
        productName.classList.add('product-name', 'limit-text-to-2-lines');
        productName.textContent = product.name;
    
        // Create product rating container
        const ratingContainer = document.createElement('div');
        ratingContainer.classList.add('product-rating-container');
    
        // Create rating stars image element
        const ratingStars = document.createElement('img');
        ratingStars.classList.add('product-rating-stars');
        ratingStars.setAttribute('src', "./img/ratings/rating-"+(product.rating.stars * 10)+".png");
        ratingStars.setAttribute('alt', 'product-rating-stars');
    
        // Create rating count element
        const ratingCount = document.createElement('div');
        ratingCount.classList.add('product-rating-count', 'link-primary');
        ratingCount.textContent = product.rating.count;
    
        // Append rating stars and count to rating container
        ratingContainer.appendChild(ratingStars);
        ratingContainer.appendChild(ratingCount);
    
        // Create product price element
        const productPrice = document.createElement('div');
        productPrice.classList.add('product-price');
        productPrice.textContent = "€"+formatCurrency(product.priceCents);
    
        // Create product quantity container
        const quantityContainer = document.createElement('div');
        quantityContainer.classList.add('product-quantity-container');
    
        // Create select element for quantity
        const quantitySelect = document.createElement('select');
        quantitySelect.classList.add("js-quantity-selector-"+product.id);
    
        // Loop to create options for quantity
        for (let j = 1; j <= 10; j++) {
            const option = document.createElement('option');
            option.value = j;
            option.textContent = j;
            if (j === 1) {
                option.selected = true;
            }
            quantitySelect.appendChild(option);
        }
    
        // Append select to quantity container
        quantityContainer.appendChild(quantitySelect);
    
        // Create product spacer
        const productSpacer = document.createElement('div');
        productSpacer.classList.add('product-spacer');
    
        // Create added to cart message container
        const addedToCart = document.createElement('div');
        addedToCart.classList.add('added-to-cart', "js-add-to-cart-"+product.id);
    
        // Create added to cart message icon
        const checkmarkIcon = document.createElement('img');
        checkmarkIcon.setAttribute('src', './img/icons/checkmark.png');
        checkmarkIcon.setAttribute('alt', 'green checkmark icon');
    
        // Create added to cart message
        const addedText = document.createElement("span");
        addedText.innerText = "Added";
        addedText.style.padding = "0 8px"
        // Append icon and text to added to cart container
        addedToCart.appendChild(checkmarkIcon);
        addedToCart.appendChild(addedText);
    
    
        // Create add to cart button
        const addToCartButton = document.createElement('button');
        addToCartButton.classList.add('add-to-cart-button', 'button-primary', 'js-add-to-cart');
        addToCartButton.setAttribute('data-product-id', product.id);
        addToCartButton.textContent = 'Add to Cart';
    
        // Append all elements to product container
        productContainer.appendChild(imageContainer);
        productContainer.appendChild(productName);
        productContainer.appendChild(ratingContainer);
        productContainer.appendChild(productPrice);
        productContainer.appendChild(quantityContainer);
        productContainer.appendChild(productSpacer);
        productContainer.appendChild(addedToCart);
        productContainer.appendChild(addToCartButton);
    
        // Append product container to products grid
        productsGrid.appendChild(productContainer);
        
    }
    document.querySelectorAll('.js-add-to-cart').forEach((button)=>{
        button.addEventListener("click", ()=>{
            const productId = button.dataset.productId;
            addToCart(productId);
            updateCartQuantity();
            renderOrderSummary()
            renderPaymentSummary()
            const addedMessage = document.querySelector(".js-add-to-cart-"+productId);
    
    
            addedMessage.classList.add('added-to-cart-visible')
            setTimeout(() => {
                setTimeout(() => {
                    const previousTimeoutId = addedMessageTimeouts[productId];
                    if (previousTimeoutId) {
                    clearTimeout(previousTimeoutId);
                    }
                    const timeoutId = setTimeout(() => {
                    addedMessage.classList.remove('added-to-cart-visible');
                    }, 2000);
                    addedMessageTimeouts[productId] = timeoutId;
                });
            });
        });
    });
    }
    
    //functions
    // formating function
    function formatCurrency(priceCents){
        return (Math.round(priceCents) / 100).toFixed(2);
    }
    
    //localSorage save funciton
    function saveToStorage() {
        localStorage.setItem('cart', JSON.stringify(cart));
    }
    function saveProductsToStorage(){
        localStorage.setItem('products', JSON.stringify(products));
    }
    
    function addToCart(productId){
        let matchingCartItem;
        let selectedQuantity = Number(document.querySelector(".js-quantity-selector-"+productId).value);
        cart.forEach((Cartitem)=>{
            if (productId === Cartitem.productId){
                matchingCartItem = Cartitem;
            }
        });
        if (matchingCartItem){
            matchingCartItem.quantity +=selectedQuantity;
        }else {
        cart.push({
            productId: productId,
            quantity: selectedQuantity,
            deliveryOptionId: '1'
        });            
        }
        saveToStorage();
    }
    
    function updateCartQuantity(){
        let cartQuantity = 0;
    
        cart.forEach((cartItem)=>{
            cartQuantity += cartItem.quantity;
        });
    
        document.querySelector('.js-cart-quantity').innerHTML = cartQuantity;
    }
    
    function removeFromCart(productId) {
        const newCart = [];
        cart.forEach((cartItem)=>{
            if(cartItem.productId !== productId){
                newCart.push(cartItem);
            }
        });
        cart = newCart;
        updateCartQuantity();
        saveToStorage();
    }
    
        function getProduct(productId) {
            let matchingProduct;
            
            products.forEach((product)=>{
                if(product.id === productId){
                    matchingProduct = product;
                }
            });
            return matchingProduct;
        }
        const addedMessageTimeouts = {};
    
        function renderOrderSummary(){
    
            const orderSummary = document.querySelector(".js-order-summary");
            orderSummary.innerHTML = "";
            for ( let i=0; i<cart.length; i++){
            let cartItem = cart[i];
            
            const productId = cartItem.productId;
            const matchingProduct = getProduct(productId);
    
            
            const deliveryOptionId = cartItem.deliveryOptionId;
    
            const deliveryOption = getDeliveryOption(deliveryOptionId);
    
            const jsCartItemContainer = document.createElement("div");
            jsCartItemContainer.className = "cart-item-container js-cart-item-container-"+matchingProduct.id;
            orderSummary.appendChild(jsCartItemContainer);
    
            const cartItemContainer = document.createElement("div");
            cartItemContainer.className = "cart-item-container js-cart-item-container-"+matchingProduct.id;
    
            const deliveryDate = document.createElement("div");
            deliveryDate.classList.add("delivery-date")
            deliveryDate.innerHTML = `Delivery date: ${deliveryOption.deliveryDate}` ;
            jsCartItemContainer.appendChild(deliveryDate)
    
            const cartItemDetailsGrid = document.createElement('div');
            cartItemDetailsGrid.classList.add('cart-item-details-grid');
    
            const productImage = document.createElement('img');
            productImage.classList.add('product-image');
            productImage.src = matchingProduct.image;
    
            const cartItemDetails = document.createElement('div');
            cartItemDetails.classList.add('cart-item-details');
    
            const productName = document.createElement('div');
            productName.classList.add('product-name');
            productName.textContent = matchingProduct.name;
    
            const productPrice = document.createElement('div');
            productPrice.classList.add('product-price');
            productPrice.textContent = "€"+formatCurrency(matchingProduct.priceCents);
    
            const productQuantity = document.createElement('div');
            productQuantity.classList.add('product-quantity');
    
            const quantitySpan = document.createElement('span');
            quantitySpan.textContent = `Quantity: `;
            const quantityLabel = document.createElement('span');
            quantityLabel.classList.add(`quantity-label`, "js-quantity-label-"+matchingProduct.id);
            quantityLabel.textContent = cartItem.quantity;
    
            const updateQuantityLink = document.createElement('span');
            updateQuantityLink.classList.add('update-quantity-link', 'link-primary', 'js-update-quantity-link');
            updateQuantityLink.dataset.productId = matchingProduct.id;
            updateQuantityLink.textContent = 'Update';
    
            const quantityInput = document.createElement('input');
            quantityInput.type = 'number';
            quantityInput.inputMode = 'numeric';
            quantityInput.max = '99';
            quantityInput.min = '1';
            quantityInput.classList.add(`quantity-input`, "js-quantity-input-"+matchingProduct.id);
            quantityInput.value = cartItem.quantity;
    
            const saveQuantityLink = document.createElement('span');
            saveQuantityLink.classList.add('save-quantity-link', 'link-primary', "save-quantity-link-"+matchingProduct.id);
            saveQuantityLink.textContent = 'Save';
    
            const deleteQuantityLink = document.createElement('span');
            deleteQuantityLink.classList.add('delete-quantity-link', 'link-primary', 'js-delete-link');
            deleteQuantityLink.dataset.productId = matchingProduct.id;
            deleteQuantityLink.textContent = 'Delete';

            productQuantity.appendChild(quantitySpan);
            productQuantity.appendChild(quantityLabel);
            productQuantity.appendChild(updateQuantityLink);
            productQuantity.appendChild(quantityInput);
            productQuantity.appendChild(saveQuantityLink);
            productQuantity.appendChild(deleteQuantityLink);
    
            cartItemDetails.appendChild(productName);
            cartItemDetails.appendChild(productPrice);
            cartItemDetails.appendChild(productQuantity);
    
            cartItemDetailsGrid.appendChild(productImage);
            cartItemDetailsGrid.appendChild(cartItemDetails);
    
            jsCartItemContainer.appendChild(cartItemDetailsGrid);
    
            const deliveryOptionsContainer = document.createElement('div');
            deliveryOptionsContainer.classList.add('delivery-options');
    
            const deliveryOptionsTitle = document.createElement('div');
            deliveryOptionsTitle.classList.add('delivery-options-title');
            deliveryOptionsTitle.textContent = 'Choose a delivery option:';

            const deliveryOptions = deliveryOptionsHTML(matchingProduct, cartItem);
            const deliveryOptionsFragment = document.createRange().createContextualFragment(deliveryOptions);
    
            deliveryOptionsContainer.appendChild(deliveryOptionsTitle);
            deliveryOptionsContainer.appendChild(deliveryOptionsFragment);
            cartItemDetailsGrid.appendChild(deliveryOptionsContainer);
                }
            
                document.querySelectorAll('.js-delete-link').forEach((link) => {
                    link.addEventListener('click', ()=> {
                        const productId = link.dataset.productId;
                        removeFromCart(productId);
                        renderPaymentSummary();
                        const container = document.querySelector(`.js-cart-item-container-${productId}`);
                        container.remove();
                    });
                });
    
            let UpdateLinks = document.querySelectorAll(`.js-update-quantity-link`);
            UpdateLinks.forEach((link)=>{
            link.addEventListener('click', ()=>{
            const productId = link.dataset.productId;
            const inputTag = document.querySelector(`.js-quantity-input-${productId}`);
            const saveButton = document.querySelector(`.save-quantity-link-${productId}`);
            inputTag.classList.add('is-editing-quantity');
            saveButton.classList.add('is-editing-quantity');
            link.style.display = 'none';
            saveButton.addEventListener('click', ()=>{
                const newQuantity=Number(inputTag.value);
                updateQuantity(productId, newQuantity);
                const quantityLabel = document.querySelector(
                    `.js-quantity-label-${productId}`
                );
                quantityLabel.innerHTML = newQuantity;
            
                updateCartQuantity();
                renderPaymentSummary();
                link.style.display = 'inline';
                inputTag.classList.remove('is-editing-quantity');
                saveButton.classList.remove('is-editing-quantity');
                    })
                });
            });
                document.querySelectorAll('.js-delivery-option').forEach((element) => {
                    element.addEventListener('click', ()=> {
                        const { productId, deliveryOptionId } = element.dataset;
                        updateDeliveryOption(productId, deliveryOptionId);
                        renderOrderSummary();
                        renderPaymentSummary()
                    });
                });
            }
    
    
            function updateQuantity(productId, newQuantity) {
                let matchingItem;
        
                cart.forEach((cartItem) => {
                if (productId === cartItem.productId) {
                    matchingItem = cartItem;
                }
                });
                matchingItem.quantity = newQuantity;
    
                saveToStorage();
            }
    
            function getDeliveryOption(deliveryOptionId) {
                let deliveryOption;
            
                deliveryOptions.forEach((option)=>{
                    if(option.id === deliveryOptionId){
                        deliveryOption = option;
                    }
                });
                return deliveryOption;}
    
                function deliveryOptionsHTML(matchingProduct, cartItem){
                    let html = '';
                
                    deliveryOptions.forEach((deliveryOption) =>{
                        const priceString = deliveryOption.priceCents === 0 ? 'FREE' : `€${formatCurrency(deliveryOption.priceCents)} -`;
                
                        const isChecked = deliveryOption.id === cartItem.deliveryOptionId;
                
                        html +=`<div class="delivery-option js-delivery-option" data-product-id="${matchingProduct.id}" data-delivery-option-id="${deliveryOption.id}">
                            <input type="radio"
                            ${isChecked ? 'checked' : ''}
                                class="delivery-option-input"
                                name="delivery-option-${matchingProduct.id}">
                                <div>
                                    <div class="delivery-option-date">
                                    ${deliveryOption.deliveryDate}
                                    </div>
                                    <div class="delivery-option-price">
                                    ${priceString} Shipping
                                </div>
                            </div>
                        </div>`
                    });
                    return html;
                }
                function getDateAfterDays(numDays) {
                    let today = new Date();

                    let afterDays = new Date(today);
                    afterDays.setDate(today.getDate() + numDays);

                    let options = { weekday: 'long', month: 'long', day: 'numeric' };
                    let formattedDate = afterDays.toLocaleString('en-US', options);
                
                    return formattedDate;
                }
    
                function updateDeliveryOption (productId, deliveryOptionId) {
                    let matchingItem;
    
                    cart.forEach((Cartitem)=>{
                        if (productId === Cartitem.productId){
                            matchingItem = Cartitem;
                        }
                    });
    
                    matchingItem.deliveryOptionId = deliveryOptionId;
    
                    saveToStorage();
                }
    
                function renderPaymentSummary() {
                    let productPriceCents = 0;
                    let shippingPriceCents = 0;
                    let cartQuantity = 0;
                    
                    cart.forEach((cartItem) => {
                        const product = getProduct(cartItem.productId);
                        productPriceCents += product.priceCents * cartItem.quantity;
                
                        const deliveryOption = getDeliveryOption(cartItem.deliveryOptionId);
                        shippingPriceCents += deliveryOption.priceCents;
                
                        cartQuantity += cartItem.quantity;
                    });
                    
                    const totalBeforeTaxCents = productPriceCents + shippingPriceCents;
                    const taxCents = totalBeforeTaxCents * 0.19;
                    const totalCents = totalBeforeTaxCents + taxCents;
                
                    const paymentSummaryTitle = document.createElement('div');
                    paymentSummaryTitle.classList.add('payment-summary-title');
                    paymentSummaryTitle.textContent = 'Order Summary';
                
                    const paymentSummaryContainer = document.createElement('div');
                
                    const paymentSummaryRows = [
                        { label: `Items (${cartQuantity}):`, value: formatCurrency(productPriceCents) },
                        { label: 'Shipping & handling:', value: formatCurrency(shippingPriceCents) },
                        { label: 'Total before tax:', value: formatCurrency(totalBeforeTaxCents), class: 'subtotal-row' },
                        { label: 'Tax (MwSt. 19%):', value: formatCurrency(taxCents) },
                        { label: 'Order total:', value: formatCurrency(totalCents), class: 'total-row' }
                    ];
                
                    paymentSummaryRows.forEach((row) => {
                        const rowElement = document.createElement('div');
                        rowElement.classList.add('payment-summary-row');
                        if (row.class) {
                            rowElement.classList.add(row.class);
                        }
                
                        const label = document.createElement('div');
                        label.textContent = row.label;
                
                        const value = document.createElement('div');
                        value.classList.add('payment-summary-money');
                        value.textContent = `€${row.value}`;
                
                        rowElement.appendChild(label);
                        rowElement.appendChild(value);
                        paymentSummaryContainer.appendChild(rowElement);
                    });
                
                    const placeOrderButton = document.createElement('button');
                    placeOrderButton.classList.add('place-order-button', 'button-primary');
                    placeOrderButton.textContent = 'Place your order';
                
                    // Append elements to the container
                    const summaryContainer = document.querySelector('.js-payment-summary');
                    summaryContainer.innerHTML = ''; // Clear previous content
                    summaryContainer.appendChild(paymentSummaryTitle);
                    summaryContainer.appendChild(paymentSummaryContainer);
                    summaryContainer.appendChild(placeOrderButton);
                }

                renderProducts()
                saveProductsToStorage();
                renderPaymentSummary();
                renderOrderSummary();
                updateCartQuantity();             
}
