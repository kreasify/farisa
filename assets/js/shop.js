document.addEventListener('alpine:init', () => {
    const storage = Storage();
    const {
        carts
    } = storage.get();

    Alpine.store('shop', {
        // baseURL: {{ .Site.BaseURL }},
        baseURL: "https://hijacket.site",
        items: {},
        user: {},
        activeVariant: 0,
        count: 1,
        carts,
        inCarts() {
            const sku = this.items.variants[this.activeVariant].sku
            let product = this.carts.find(item => item.sku == sku);

            return product ? true : false

        },
        listCarts() {
            return this.carts
        },
        addItem() {
            const sku = this.items.variants[this.activeVariant].sku
            const id = this.carts.some(item => item.sku === sku)

            if (!id) {
                this.carts.push({
                    sku: this.items.variants[this.activeVariant].sku,
                    name: this.items.title,
                    image: this.items.image,
                    thumbnail: this.items.thumbnail,
                    size: this.items.variants[this.activeVariant].size,
                    price: this.items.variants[this.activeVariant].price,
                    weight: this.items.variants[this.activeVariant].weight,
                    qty: this.count,
                })
            } else {
                for (let item of this.carts) {
                    if (item.sku == sku) {
                        item.qty++
                    }
                }
            }
        },
        deleteItem(sku) {
            this.carts = this.carts.filter(item => sku !== item.sku);
        },
        clearCarts() {
            this.carts = []
        },
        totalItem() {
            let qty = 0
            for (let item of this.carts) {
                qty += item.qty
            }
            return qty
        },
        totalWeight() {
            let weight = 0
            for (let item of this.carts) {
                weight += item.weight * item.qty
            }
            return weight
        },
        getWeight(weight) {
            const getSribu = weight > 1000 ? Math.round((weight + 399 / 2) / 1000) : 1;
            return Math.ceil(weight) % 1000 == 0 / 1000 ? Math.ceil(weight) / 1000 : getSribu;
        },
        subtotal() {
            const total = this.carts.map((product, index) => product.price * product.qty);
            return total.reduce((current, next) =>
                current + next, 0);
        },
        localPrice(amount) {
            return amount.toLocaleString('id-ID', {
                style: 'currency',
                currency: 'IDR',
                minimumFractionDigits: 0,
                maximumFractionDigits: 0
            });
        },
        save() {
            storage.set({
            carts: this.carts
            })
            // console.log(this.carts)
        },
        products: [],
        adCard: { title: null, image: null, price: null, url: null},
        mycard: "liiii",
        init() {
            const getProducts = async () => {
                const response = await fetch('https://vitoko.netlify.app/ads/index.json')
                if (! response.ok) alert(`Something went wrong: ${response.status} - ${response.statusText}`)
                data = await response.json();
                this.products = data.items;
                this.adCard = { title: data.items[0].title;
                }
                
            };
            this.ad();
            this.mycard = "kuu";
           
            return getProducts;
        },
        ad() {
            // let wrapper = this.$refs.related1;
            const wrapper = document.querySelector(".card-item-1");

        wrapper.insertAdjacentHTML('afterend', `
        <div class="ads-item relative col-span-6 md:col-span-3 lg:col-span-2 transition duration-500 ease-ease hover:shadow-lg">
            <div class="ads-item__image relative bg-body-primary">
                <a class="ads-item__link" x-bind:href="$store.shop.adProduct.url">
                    <div class="responsive aspect-w-5 aspect-h-6">
                        <img class="absolute w-full h-full left-0 top-0 object-cover blur-up lazyloaded" x-bind:src="$store.shop.adProduct.image">
                    </div>
                </a>
            </div>
            <p x-text="$store.shop.mycard">lalakai</p>
            <template x-if="$store.shop.adProduct.title">
            <div class="ads-item__info py-3 px-2">
                <a class="ads-item__link" x-bind:href="$store.shop.adProduct.url">
                    <h3 class="ads-item__title text-sm lg:text-base text-heading font-heading font-medium mb-1" x-text="$store.shop.adProduct.title"></h3>
                </a>
                <template x-if="$store.shop.adProduct.price">
                <p class="ads-item__price mb-3">
                    <span class="text-heading-primary text-xs lg:text-sm font-medium" x-text="$store.shop.adProduct.price"></span>
                </p>
                </template>
            </div>
            </template>
        </div>
        `);
        
        return wrapper;
        },
    })
})

function Storage() {
  const KEY = 'vitoko'
  const defaultData = '{ "carts": [] }'

  return {
      get() {
          return JSON.parse(localStorage.getItem(KEY) || defaultData)
      },
      set({
          carts,
          ...rest
      }) {
          localStorage.setItem(
              KEY,
              JSON.stringify({
                  ...rest,
                  carts: carts.map(({
                      name,
                      sku,
                      image,
					  thumbnail,
                      size,
                      price,
                      weight,
                      qty
                  }) => ({
                      name,
                      sku,
                      image,
					  thumbnail,
                      size,
                      price,
                      weight,
                      qty,
                  })),
              }),
          )
      },
  }
}