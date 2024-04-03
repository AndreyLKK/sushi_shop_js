let cartProducts = [];
const cardWrapper = document.querySelector(".card");

let countCart = 0;
let productInfo; // Переменная доступна на уровне обработчиков событий

window.addEventListener("click", (event) => {
  if (event.target.hasAttribute("data-cart")) {
    const card = event.target.closest(".card");

    productInfo = {
      id: card.dataset.id,
      count: card.querySelector(".items__current").innerText,
      imgSrc: card.querySelector(".product-img").getAttribute("src"),
      title: card.querySelector(".item-title").innerText,
      quantity: card.querySelector("[data-items-in-box]").innerText,
      weight: card.querySelector(".price__weight").innerText,
      price: card.querySelector(".price__currency").innerText,
    };

    if (cartProducts.length > 0) {
      cartProducts = cartProducts.filter((item) => {
        return item.count !== 0;
      });
    }

    const isProductInCart = cartProducts.find(
      (item) => item.id === productInfo.id
    );

    // const isProductInCartFilter = isProductInCart.filter((item) => {
    //   return item.count === 1;
    // });

    let cartProduct = document.querySelector(".cart-wrapper");

    if (isProductInCart) {
      const countProductInfo = parseInt(productInfo.count);
      const countCart = parseInt(isProductInCart.count);
      const readyCount = countProductInfo + countCart;
      isProductInCart.count = readyCount;
      const cartItem = document.querySelector(
        `.cart-item[data-id="${productInfo.id}"]`
      );
      const countElement = cartItem.querySelector(".items__current");
      countElement.innerText = readyCount;
    } else {
      cartProduct.insertAdjacentHTML(
        "beforeend",
        `

							<!-- Cart item -->
							<div class="cart-item" data-id="${productInfo.id}">
								<div class="cart-item__top">
									<div class="cart-item__img">
										<img src="${productInfo.imgSrc}" alt="">
									</div>
									<div class="cart-item__desc">
										<div class="cart-item__title">${productInfo.title}</div>
										<div class="cart-item__weight">${productInfo.quantity}шт. / ${productInfo.weight}г.</div>

										<!-- cart-item__details -->
										<div class="cart-item__details">

											<div class="items items--small counter-wrapper">
												<div class="items__control" data-action="minus">-</div>
												<div class="items__current" data-counter="">${productInfo.count}</div>
												<div class="items__control" data-action="plus">+</div>
											</div>

											<div class="price">
												<div class="price__currency">${productInfo.price} ₽</div>
											</div>

										</div>
										<!-- // cart-item__details -->

									</div>
								</div>
							</div>
							<!-- // Cart item -->

    `
      );
      cartProducts.push(productInfo);
      cartEmpry(cartProducts);
      delivery(cartProducts);
    }

    const countUpdate = card.querySelector("[data-counter]");
    countUpdate.innerText = 1;

    priceSum(cartProducts);
  }
});

window.addEventListener("click", (event) => {
  if (
    (event.target.closest(".cart-item") &&
      event.target.hasAttribute("data-action") &&
      event.target.dataset.action === "minus") ||
    event.target.dataset.action === "plus"
  ) {
    const cartItem = event.target.closest(".cart-item");
    const productId = cartItem.dataset.id;
    const countElement = cartItem.querySelector(".items__current");
    let countCart = parseInt(countElement.innerText);

    // Уменьшаем значение countCart на 1
    if (event.target.dataset.action === "minus") {
      if (countCart > 0) {
        countCart--;
      }
    }
    if (event.target.dataset.action === "plus") {
      countCart++;
    }
    // Обновляем текст внутри .items__current
    countElement.innerText = countCart;

    // Обновляем данные в массиве cartProducts
    const cartProduct = cartProducts.find((item) => item.id === productId);
    if (cartProduct) {
      cartProduct.count = countCart;
    }
  }
});

function deleteArray(cartProducts, productId) {
  return cartProducts.filter((item) => item.id !== productId);
}

function cartEmpry(cartProducts) {
  const alert = document.querySelector(".alert");
  if (cartProducts.length === 0) {
    alert.classList.remove("hidden");
  } else {
    alert.classList.add("hidden");
  }
}


