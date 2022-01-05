// hamburger variables
const hamburgerMenu = document.getElementById('hamburger-menu');
const navigation = document.getElementById('nav');
const overlay = document.getElementById('overlay');
const mobileCloseButton = document.getElementById('mobile-close-button');

// counter variables
const counter = document.getElementById('amount-value');
const addButton = document.getElementById('add-button');
const removeButton = document.getElementById('remove-button');
counterValue = 0;

// prices variables 
const discountPrice = document.getElementById('discount-price');
const originalPrice = document.getElementById('original-price');

// img carousel variables
const thumbmails = document.querySelectorAll('#pic');
const largeImg = document.getElementById('large-img');
const arrowLeft = document.getElementById('arrow-left');
const arrowRight = document.getElementById('arrow-right');
let carouselLength = thumbmails.length;
let carouselPosition = 0;

// shopping cart variables
const cartButton = document.getElementById('cart-button');
const cartCloseButton = document.getElementById('cart-close-button');
const shoppingCartOverlay = document.getElementById('shopping-cart');
const itemList = document.getElementById('item-list');
const addToCartButton = document.getElementById('add-to-cart');
const checkoutButton = document.getElementById('checkout-button');
const emptyCartText = document.getElementById('empty-cart');

let itemAmount = 0;
let itemsInCart = 0;

// reset hamburger class
navigation.classList.remove('.hamburger-open');

// hamburger evnetlisteners
hamburgerMenu.addEventListener('click', () => {
  navigation.classList.add('hamburger-open');
  overlay.classList.add('overlay-open');
})

mobileCloseButton.addEventListener('click', () => {
  navigation.classList.remove('hamburger-open');
  overlay.classList.remove('overlay-open');
})

// counter eventlisteners
addButton.addEventListener('click', () => {
  counterValue++;
  counter.innerText = `${counterValue}`
  if(counterValue > 0){
    discountPrice.innerText = `$${counterValue * 125}.00`
    originalPrice.innerText = `$${counterValue * 250}.00`
  } else {
    discountPrice.innerText = `$125.00`
    originalPrice.innerText = `$250.00`
  }
});

removeButton.addEventListener('click', () => {
  counterValue--;
  counter.innerText = `${counterValue}`
  if(counterValue > 0){
    discountPrice.innerText = `$${counterValue * 125}.00`
    originalPrice.innerText = `$${counterValue * 250}.00`
  } else {
    discountPrice.innerText = `$125.00`
    originalPrice.innerText = `$250.00`
  }
});

// img carousel logic
thumbmails.forEach(picture => {
  picture.addEventListener('click', () => {
    largeImg.src=`${picture.src.replace('.jpg', '-HR.jpg')}`
    thumbmails.forEach(picture => {
      picture.classList = "";
    });
    picture.classList.add('active-img');
  })
});

console.log(carouselPosition);

// img carousel mobile
arrowLeft.addEventListener('click', () => {
  console.log('left');
  if(carouselPosition > 0){
    carouselPosition--;
    largeImg.src = `${thumbmails[carouselPosition].src.replace('.jpg', '-HR.jpg')}`
  } else {
    carouselPosition = carouselLength - 1;
    largeImg.src = `${thumbmails[carouselPosition].src.replace('.jpg', '-HR.jpg')}`
  }
  console.log(carouselPosition);
});

arrowRight.addEventListener('click', () => {
  console.log('right');
  carouselPosition++;
  if(carouselPosition < carouselLength){
    largeImg.src = `${thumbmails[carouselPosition].src.replace('.jpg', '-HR.jpg')}`
  } else {
    carouselPosition = 0;
    largeImg.src = `${thumbmails[carouselPosition].src.replace('.jpg', '-HR.jpg')}`
  }
  console.log(carouselPosition);
});

// shopping cart event listener
cartButton.addEventListener('click', () => {
  shoppingCartOverlay.classList.toggle('shopping-cart-open');
});

cartCloseButton.addEventListener('click', () => {
  shoppingCartOverlay.classList.remove('shopping-cart-open');
})

// add to cart event listener
addToCartButton.addEventListener('click', () => {
  itemAmount = counterValue;
  if(itemAmount > 0){
    itemsInCart++;
    const item = document.createElement('div');
    item.classList.add('cart-item-container');
    item.innerHTML = `
      <img src="${largeImg.src}" class="item-img">
      <div class="item-info-container">
        <p>Fall Limited Edition Sneakers</p>
        <p>$125.00<span> x ${itemAmount}</span><span class='bold'> ${itemAmount * 125}.00</span></p>
      </div>
      <i class="far fa-trash-alt" id="trash-item"></i>
    `
    itemList.insertBefore(item, itemList.children[1]);

    let deleteItemButton = Array.from(document.querySelectorAll('#trash-item'));
    deleteItemButton.forEach(deleteButton => {    
      deleteButton.addEventListener('click', () => {
        itemsInCart--;
        deleteButton.parentElement.parentElement.removeChild(deleteButton.parentElement);
        ItemAmount();
      });
    });
  }
  ItemAmount(); 
})

// remove from cart event listener
function ItemAmount() {
  console.log(itemsInCart);
  if(itemsInCart > 0){
    checkoutButton.style.display = "flex";
    emptyCartText.style.display = 'none';
  } else {
    checkoutButton.style.display = 'none';
    emptyCartText.style.display = 'inline-block';
  }
}
