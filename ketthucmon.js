let cart = [];
    let total = 0;
    function extractPrice(priceText) {
        return parseInt(priceText.replace(/\D/g, ""));
    }
    function addToCart(productName, priceText) {
        const price = extractPrice(priceText);
        const existingItem = cart.find(item => item.name === productName);

        if (existingItem) {
            existingItem.quantity++;
        } else {
            cart.push({ name: productName, price: price, quantity: 1 });
        }
        updateCart();
    }
    function changeQuantity(index, amount) {
        if (!cart[index]) return;

        cart[index].quantity += amount;

        if (cart[index].quantity <= 0) {
            removeItem(index);
        } else {
            updateCart();
        }
    }
    function removeItem(index) {
        cart.splice(index, 1);
        updateCart();
    }
    function updateCart() {
        const cartItems = document.getElementById("cart-items");
        const totalSpan = document.getElementById("total");
        cartItems.innerHTML = "";
        total = 0;
        cart.forEach((item, index) => {
            const itemTotal = item.price * item.quantity;
            total += itemTotal;

            const li = document.createElement("li");
            li.innerHTML = `
                <div class="cart-item-header">
                    <span style="font-size: 14px; flex-grow: 1;">${item.name}</span>
                    <button class="remove-btn" data-index="${index}">&times;</button>
                </div>
                <div class="cart-item-info">
                    <span>${item.price.toLocaleString('vi-VN')}đ x ${item.quantity}</span>
                    <div class="quantity-controls" data-index="${index}">
                        <button class="quantity-btn minus-btn">-</button>
                        <span class="quantity-display">${item.quantity}</span>
                        <button class="quantity-btn plus-btn">+</button>
                    </div>
                </div>
                <p class="cart-item-total">Thành tiền: ${itemTotal.toLocaleString('vi-VN')} đ</p>
            `;
            cartItems.appendChild(li);
        });

        document.querySelectorAll('.quantity-controls .quantity-btn').forEach(button => {
            button.addEventListener('click', (e) => {
                const index = parseInt(e.target.closest('.quantity-controls').dataset.index);
                if (e.target.classList.contains('plus-btn')) {
                    changeQuantity(index, 1);
                } else if (e.target.classList.contains('minus-btn')) {
                    changeQuantity(index, -1);
                }
            });
        });
        document.querySelectorAll('.remove-btn').forEach(button => {
            button.addEventListener('click', (e) => {
                const index = parseInt(e.target.dataset.index);
                removeItem(index);
            });
        });

        totalSpan.textContent = total.toLocaleString('vi-VN') + " đ";
    }
    document.querySelectorAll(".product button").forEach((button) => {
      button.addEventListener("click", () => {
        const product = button.parentElement;
        const name = product.querySelector("h3").textContent;
        const priceText = product.querySelector("p").textContent;
        addToCart(name, priceText);
      });
    });

    document.getElementById("pay").addEventListener("click", () => {
      if (cart.length === 0) {
        alert("Giỏ hàng trống!");
      } else {
        alert(`Thanh toán thành công! Tổng tiền: ${total.toLocaleString('vi-VN')} đ`);
        cart = [];
        updateCart();
      }
    });
    document.getElementById("search").addEventListener("input", (e) => {
      const query = e.target.value.toLowerCase();
      document.querySelectorAll(".product").forEach((product) => {
        const name = product.querySelector("h3").textContent.toLowerCase();
        product.style.display = name.includes(query) ? "flex" : "none";
      });
    });
    document.querySelectorAll("#sidebar li").forEach((li) => {
      li.addEventListener("click", (e) => {
        e.stopPropagation(); 
        const text = li.textContent.trim().toLowerCase();
        if (li.classList.contains("main-item") && li.querySelector(".sub-menu")) {
          const subMenu = li.querySelector(".sub-menu");
          subMenu.classList.toggle("open");
          return; 
        }
        if (text.includes("hotline")) {
          alert("Gọi Hotline: 0813-634-927");
          return;
        }
        if (text.includes("hỗ trợ")) {
          alert("Gọi Hỗ trợ: 0813-634-927");
          return;
        }
        if (text.includes("email")) {
          alert("Gửi email đến: huukhag@gmail.com.com");
          return;
        }
        document.querySelectorAll(".product").forEach((product) => {
          const name = product.querySelector("h3").textContent.toLowerCase();
          const alt = product.querySelector("img").alt.toLowerCase();

          if (text === "tất cả sản phẩm") {
            product.style.display = "flex";
          } else if (text.includes("xiaomi") || text.includes("vivo") || text.includes("oppo")) {
            const brandFilter = text.includes("vivo") ? "vivo/iqoo" : text.split(" ")[0]; 
            product.style.display = alt.includes(brandFilter) ? "flex" : "none";
          } else {
            product.style.display = name === text ? "flex" : "none";
          }
        });
      });
    });
    const sidebar = document.getElementById("sidebar");
    const productList = document.getElementById("product-list");
    const menuBtn = document.getElementById("menu-btn");
    document.getElementById("menu-btn").addEventListener("click", () => {
      const isOpen = getComputedStyle(sidebar).left === "0px";
      if (isOpen) {
        sidebar.style.left = "-180px";
        productList.style.marginLeft = "0";
        menuBtn.textContent = "☰"; 
      } else {
        sidebar.style.left = "0";
        productList.style.marginLeft = "180px";
        menuBtn.textContent = "✕"; 
      }
    });
    document.getElementById("cart-btn").addEventListener("click", () => {
      const cart = document.getElementById("cart");
      cart.style.display = cart.style.display === "none" ? "block" : "none";
    });