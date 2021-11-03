document.addEventListener('alpine:init', () => {
    const storage = Storage();
    const {
        carts
    } = storage.get();

    Alpine.store('shop', {
        items: {},
        user: {},
        activeVariant: 0,
        count: 1,
        carts,
        inCarts() {
            const sku = this.items.variants[this.activeVariant].id
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
        }
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
