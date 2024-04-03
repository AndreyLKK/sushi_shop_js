let arrayPrice = [];
let fullPrice = 0; // Определяем переменную fullPrice на уровне обработчика события click

// Обработчик события click вынесен за пределы функции priceSum
window.addEventListener("click", (event) => {
  if (
    (event.target.closest(".cart-item") &&
      event.target.hasAttribute("data-action") &&
      event.target.dataset.action === "minus") ||
    event.target.dataset.action === "plus"
  ) {
    const cartItem = event.target.closest(".cart-item");
    const countAttribute = cartItem.querySelector("[data-counter]");
    const count = countAttribute.innerText;
    console.log(count);
    const productId = cartItem.dataset.id;
    const product = cartProducts.find((item) => item.id === productId);
    const cartItemPrice = cartItem.querySelector(".price__currency");
    const cartItemPriceText = cartItemPrice.innerText;
    const cartItemPriceNum = parseInt(cartItemPriceText);

    if (event.target.dataset.action === "minus") {
      if (count > 1) {
        const productPrice = parseInt(product.price);
        fullPrice = fullPrice - productPrice;
      } else {
        fullPrice -= cartItemPriceNum;
        cartProducts = deleteArray(cartProducts, productId);
        cartItem.remove();
        cartEmpry(cartProducts);
        delivery(cartProducts, fullPrice);
      }
    }
    if (event.target.dataset.action === "plus") {
      const productPrice = parseInt(product.price);
      fullPrice = fullPrice + productPrice;
    }

    totalPriceWrapper = document.querySelector(".cart-total");
    let totalPrice = totalPriceWrapper.querySelector(".total-price");
    totalPrice.innerText = fullPrice;
    deliveryFree(fullPrice);
  }
});

function priceSum(cartProducts) {
  arrayPrice.length = 0;
  cartProducts.forEach((item) => {
    let priceOneCard = item.count * item.price;
    let productPrice = {
      id: item.id,
      price: priceOneCard,
    };
    arrayPrice.push(productPrice);
  });

  fullPrice = arrayPrice.reduce((accum, item) => {
    return accum + item.price;
  }, 0);

  totalPriceWrapper = document.querySelector(".cart-total");
  let totalPrice = totalPriceWrapper.querySelector(".total-price");
  totalPrice.innerText = fullPrice;
}

function delivery(cartProducts) {
  const delivery = document.querySelector(".card-text");
  if (cartProducts.length === 0) {
    delivery.classList.add("hidden");
  } else {
    delivery.classList.remove("hidden");
  }
}

function deliveryFree(fullPrice) {
  const freeShipping = document.querySelector(".free");
  if (fullPrice < 600) {
    freeShipping.innerText = 600;
  } else {
    freeShipping.innerText = "бесплатно";
  }
}

// let arrayPrice = [];

// function priceSum(cartProducts) {
//   arrayPrice.length = 0;
//   cartProducts.forEach((item) => {
//     let priceOneCard = item.count * item.price;
//     let productPrice = {
//       id: item.id,
//       price: priceOneCard,
//     };

//     arrayPrice.push(productPrice);

//     let fullPrice = arrayPrice.reduce((accum, item) => {
//       return (accum += item.price);
//     }, 0);

//     window.addEventListener("click", (event) => {
//       if (
//         (event.target.closest(".cart-item") &&
//           event.target.hasAttribute("data-action") &&
//           event.target.dataset.action === "minus") ||
//         event.target.dataset.action === "plus"
//       ) {
//         const cartItem = event.target.closest(".cart-item");
//         const countAttribute = cartItem.querySelector("[data-counter]");
//         const count = countAttribute.innerText;
//         console.log(count);
//         const productId = cartItem.dataset.id;
//         const product = cartProducts.find((item) => item.id === productId);
//         const cartItemPrice = cartItem.querySelector(".price__currency");
//         const cartItemPriceText = cartItemPrice.innerText;
//         const cartItemPriceNum = parseInt(cartItemPriceText);

//         if (event.target.dataset.action === "minus") {
//           if (count >= 1) {
//             const productPrice = parseInt(product.price);
//             fullPrice = fullPrice - productPrice;
//           } else {
//             fullPrice -= cartItemPriceNum;

//             deleteArray(cartProducts);

//             // cartProducts = cartProducts.filter((item) => item.id !== productId);
//             // arrayPrice = arrayPrice.filter((item) => item.id !== productId);
//             cartItem.remove();
//           }
//         }
//         if (event.target.dataset.action === "plus") {
//           const productPrice = parseInt(product.price);
//           fullPrice = fullPrice + productPrice;
//         }
//       }
//       if (priceOneCard == fullPrice) {
//         return;
//       } else {
//         totalPriceWrapper = document.querySelector(".cart-total");
//         let totalPrice = totalPriceWrapper.querySelector(".total-price");
//         totalPrice.innerText = fullPrice;
//       }
//     });
//     totalPriceWrapper = document.querySelector(".cart-total");
//     let totalPrice = totalPriceWrapper.querySelector(".total-price");
//     totalPrice.innerText = fullPrice;
//   });
// }

