const scriptURL = 'https://sdks.shopifycdn.com/buy-button/latest/buy-button-storefront.min.js';

const createProducListtDiv = (id, width) => {
  const div = document.createElement('div');
 
  div.id = id;
  div.width = width;
  div.height = 'auto';

  return div;
}

class shopifyCollectionElement extends HTMLElement {
  
  attributeChangedCallback(name, oldValue, newValue) {   
   this.setAttribute(name, newValue);
  }

  static get observedAttributes() {
    return ['StoreName', 'StoreSecret', 'CollectionID'];
  }

  connectedCallback() {
    this.appendChild(createProducListtDiv('shopifyCollectionContainer', this.style.width));
    
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

      ui.createComponent('collection', {
        id: element.getAttribute('CollectionID'),
        node: document.getElementById('shopifyCollectionContainer'),
        moneyFormat: '%24%7B%7Bamount%7D%7D',
                options: {
  "product": {
    "styles": {
      "product": {
        "@media (min-width: 601px)": {
          "max-width": "calc(25% - 20px)",
          "margin-left": "20px",
          "margin-bottom": "50px",
          "width": "calc(25% - 20px)"
        },
        "img": {
          "height": "calc(100% - 15px)",
          "position": "absolute",
          "left": "0",
          "right": "0",
          "top": "0"
        },
        "imgWrapper": {
          "padding-top": "calc(75% + 15px)",
          "position": "relative",
          "height": "0"
        }
      },
      "button": {
        ":hover": {
          "background-color": "#03317c"
        },
        "background-color": "#021d49",
        ":focus": {
          "background-color": "#03317c"
        }
      }
    },
    "buttonDestination": "modal",
    "contents": {
      "options": false
    },
    "text": {
      "button": "View Details"
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
      "img": true,
      "imgWithCarousel": false,
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
          "background-color": "#03317c"
        },
        "background-color": "#021d49",
        ":focus": {
          "background-color": "#03317c"
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
          "background-color": "#03317c"
        },
        "background-color": "#021d49",
        ":focus": {
          "background-color": "#03317c"
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
        "background-color": "#021d49",
        ":hover": {
          "background-color": "#03317c"
        },
        ":focus": {
          "background-color": "#03317c"
        }
      }
    }
  }
},
      });
    
    }
  }
}

customElements.define('shopify-collection', shopifyCollectionElement);
