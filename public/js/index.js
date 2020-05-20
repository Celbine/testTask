class Cart {
  constructor() {
    this.items = JSON.parse(localStorage.getItem('Items'));
    if (!this.items) {
      this.items = [];
    }
    console.log('items', this.items);
  }

  saveItems() {
    localStorage.removeItem('Items');
    localStorage.setItem('Items', JSON.stringify(this.items));
  }

  addItem(item) {
    this.items.push(item);
    this.saveItems();
    updateCartCounter();
    console.log(this.items);
  }

  clear() {
    localStorage.removeItem('Items');
    this.items = [];
    UIkit.notification({message: 'Корзина очищена!', status: 'success', pos: 'top-right'});
    renderCart();
  }

  removeItem(index) {
    this.items.splice(index, 1);
    this.saveItems();
  }
}

const cart = new Cart();

const updateCartCounter = () => {
  document.getElementById('cartCount').innerText = `${cart.items.length} предметов.`;
}

document.addEventListener('DOMContentLoaded', () => {
  updateCartCounter();
  UIkit.util.on(document.getElementById('modal-cart'), 'beforeshow', renderCart);
})

const removeItem = (index) => {
  cart.removeItem(index);
  renderCart();
  UIkit.notification({message: 'Товар удален из корзины!', status: 'success', pos: 'top-right'});
}

const addCart = (id) => {
  const selector = document.getElementById(`${id}-CurrencySelect`);
  const currency = selector[selector.selectedIndex].value;
  apiSend('GET',`/api/items?id=${id}&currency=${currency}`, null, (body) => {
    cart.addItem(body);
    UIkit.notification({message: 'Товар добавлен в корзину', status: 'success', pos: 'top-right'});
  });
}

const renderCart = () => {
  updateCartCounter();
  const cartItemsElement = document.getElementById('cartItems');
  cartItemsElement.innerHTML = '';
  if(cart.items.length === 0) {
    return cartItemsElement.innerHTML = `
             <p class="uk-text-danger">У вас нет товаров в корзине</p>
            `
  }
  for (let i = 0; i < cart.items.length; i++) {
    cartItemsElement.innerHTML = cartItemsElement.innerHTML + `
              <div class="uk-card uk-card-primary uk-width-1@m">
              <div class="uk-card-header">
                  <div class="uk-grid-small uk-flex-middle" uk-grid>
                      <div class="uk-width-auto">
                          <img class="uk-border-circle" width="40" height="40" src=${cart.items[i].img}>
                      </div>
                      <h3 class="uk-card-title uk-margin-remove-bottom">${cart.items[i].name}</h3>
                      <p class="uk-text-meta uk-margin-remove-top"><time datetime="2016-04-01T19:00">April 01, 2016</time></p>
                  </div>
              </div>
              <div class="uk-card-body">
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.</p>
                  <p>Цена: ${cart.items[i].price}₽.</p>
                  <p>Предпочитаемая валюта: ${cart.items[i].currency}.</p>
              </div>
              <div class="uk-card-footer">
                  <button class="uk-button-danger uk-button" onclick="removeItem(${i})">Удалить из корзины</button>
              </div>
            </div>
      `
  }
}

const toCount = () => {
  apiSend('POST', '/api/toCount', cart.items, (body) => {
    UIkit.modal.alert(JSON.stringify(body));
  })
}

const apiSend = (method, url, body, callback) => {
  const xhr = new XMLHttpRequest();
  xhr.open(method, url, true);
  if (method === 'POST') {
    xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
  }
  xhr.onload = () => {
    if (xhr.status !== 200) {
      UIkit.notification({message: 'Серверная ошибка', status: 'danger', pos: 'top-right'});
    } else {
      const response = JSON.parse(xhr.responseText);
      if (response.error) {
        UIkit.notification({message: response.error, status: 'danger', pos: 'top-right'});
      } else {
        callback(response.body)
      }
    }
  }
  xhr.send(JSON.stringify(body));
}
