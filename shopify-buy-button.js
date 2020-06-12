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
    this.appendChild(createProducListtDiv('shopifyBuyButtonContainer', this.style.width));
    
   
    
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
        node: document.getElementById('shopifyBuyButtonContainer'),
        moneyFormat: '%24%7B%7Bamount%7D%7D',
                        options: {
  "product": {
    "styles": {
      "product": {
        "@media (min-width: 601px)": {
          "max-width": "calc(25% - 20px)",
          "margin-left": "20px",
          "margin-bottom": "50px"
        }
      },
      "button": {
        ":hover": {
          "background-color": "#0553d3"
        },
        "background-color": "#03317c",
        ":focus": {
          "background-color": "#0553d3"
        }
      }
    },
    "contents": {
      "img": false,
      "title": false,
      "price": false
    },
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
      },
      "button": {
        ":hover": {
          "background-color": "#0553d3"
        },
        "background-color": "#03317c",
        ":focus": {
          "background-color": "#0553d3"
        }
      }
    },
    "text": {
      "button": "Add to cart"
    }
  },
  "cart": {
    "styles": {
      "button": {
        ":hover": {
          "background-color": "#0553d3"
        },
        "background-color": "#03317c",
        ":focus": {
          "background-color": "#0553d3"
        }
      }
    },
    "text": {
      "total": "Subtotal",
      "button": "Checkout"
    }
  },
  "toggle": {
    "styles": {
      "toggle": {
        "background-color": "#03317c",
        ":hover": {
          "background-color": "#0553d3"
        },
        ":focus": {
          "background-color": "#0553d3"
        }
      }
    }
  }
},
      });
    
    }
  }
}

customElements.define('shopify-buy-button', shopifyProductElement);
