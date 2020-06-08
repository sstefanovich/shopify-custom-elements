const scriptURL = 'https://sdks.shopifycdn.com/buy-button/latest/buy-button-storefront.min.js';

const createProducListtDiv = (id, width) => {
  const div = document.createElement('div');
 
  div.id = id;
  div.width = width;
  div.height = 'auto';

  return div;
}

class shopifyProductElement extends HTMLElement {
  
  attributeChangedCallback(name, oldValue, newValue) {   
   this.setAttribute(name, newValue);
  }

  static get observedAttributes() {
    return ['StoreName', 'StoreSecret', 'ProductID'];
  }

  connectedCallback() {
    this.appendChild(createProducListtDiv('shopifyProductContainer', this.style.width));
    
    var parentDiv = this.parentNode;
    parentDiv.style.width= this.style.width;
    
    var script = document.createElement('script');
    script.async = true;
    script.src = scriptURL;
    document.getElementsByTagName("head")[0].appendChild(script);
    var element = this;
    
    script.onload = function(){
      

      var client = ShopifyBuy.buildClient({
          domain: element.getAttribute('StoreName'),
          storefrontAccessToken: element.getAttribute('StoreSecret'),
      });

      var ui = ShopifyBuy.UI.init(client);

      ui.createComponent('product', {
        id: element.getAttribute('ProductID'),
        node: document.getElementById('shopifyProductContainer'),
        moneyFormat: '%24%7B%7Bamount%7D%7D',
                        options: {
  "product": {
    "styles": {
      "product": {
        "@media (min-width: 601px)": {
          "max-width": "100%",
          "margin-left": "0",
          "margin-bottom": "50px"
        },
        "text-align": "left"
      },
      "title": {
        "font-size": "26px"
      },
      "price": {
        "font-size": "18px"
      },
      "compareAt": {
        "font-size": "15.299999999999999px"
      },
      "unitPrice": {
        "font-size": "15.299999999999999px"
      }
    },
    "layout": "horizontal",
    "contents": {
      "img": false,
      "imgWithCarousel": true,
      "description": true
    },
    "width": "100%",
    "text": {
      "button": "Add to cart"
    }
  },
  "productSet": {
    "styles": {
      "products": {
        "@media (min-width: 601px)": {
          "margin-left": "-20px"
        }
      }
    }
  },
  "modalProduct": {
    "contents": {
      "img": false,
      "imgWithCarousel": true,
      "button": false,
      "buttonWithQuantity": true
    },
    "styles": {
      "product": {
        "@media (min-width: 601px)": {
          "max-width": "100%",
          "margin-left": "0px",
          "margin-bottom": "0px"
        }
      }
    },
    "text": {
      "button": "Add to cart"
    }
  },
  "cart": {
    "text": {
      "total": "Subtotal",
      "button": "Checkout"
    }
  }

},
      });
    
    }
  }
}

customElements.define('shopify-product', shopifyProductElement);
