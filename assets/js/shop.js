document.addEventListener('alpine:init', () => {
    const storage = Storage();
    const {
        carts
    } = storage.get();

    Alpine.store('shop', {
        baseURL: {{ .Site.BaseURL }},
        items: {
        "title": {{ .Title }},{{ if .Params.images }}{{range first 1 .Params.images }}{{- $image := .image }}{{- $imageResource := ($site.GetPage "/uploads").Resources.GetMatch (strings.TrimPrefix "/uploads/" ( $image | relURL )) }}{{- $resized := $imageResource.Fill "70x84" }}
        "thumbnail": {{ $resized.Permalink }},
        "image": {{ $resized.RelPermalink }},{{ end }}{{ end }}{{ if .Params.variants }}
        "variants": [ {{range $index, $el := .Params.variants }}{{ if gt $index 0 }}, {{ end }}
            {
                "id": {{ $index }},
                "name": {{ .name | urlize | upper }},{{ if .size }}
                "size": {{ .size }},{{ end }}{{ if .sku }}
                "sku": {{ .sku }},{{ end }}{{ if .price }}
                "price": {{ .price }},{{ end }}{{ if .discount }}
                "discount": {{ .discount }},{{ end }}{{ if .weight }}
                "weight": {{ .weight }},{{ end }}{{ if .quantity }}
                "quantity": {{ .quantity }}{{ end }}
            }{{ end }}
        ],{{ end }}{{ if .Params.brand }}
        "brand": {{ range (.GetTerms "brand") }}{{ .Title }}{{ end }},{{ end }}{{ if .Params.color }}
        "color": {{ range (.GetTerms "color") }}{{ .Title | humanize }}{{ end }},{{ end }}
        "slug": {{ .RelPermalink }}
    },
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

        console.log(this.carts)
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