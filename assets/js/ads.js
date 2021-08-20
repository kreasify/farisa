document.addEventListener('alpine:init', () => {
    Alpine.data('related', () => ({
        related: [],
        products: [],
        adProduct: {},
        adCard: {},
        nama: 'vitoko',
        init() {
            const getProducts = async () => {
                const response = await fetch('https://vitoko.netlify.app/ads/index.json')
                if (! response.ok) alert(`Something went wrong: ${response.status} - ${response.statusText}`)
                data = await response.json();
                this.products = data.items;
                this.adProduct = data.items[0];

                for (let i = 0; i < data.items.length; i++) {
                    this.adCard += data.items[i];
                }
            };
            // this.relatedAd();
            this.ad();

            return getProducts;
        },
        relatedAd() {
            let wrapper = this.$refs.related;

        wrapper.insertAdjacentHTML('beforeend', `
        <template x-for="(product, index) in products" :key="product.title">
        <div class="ads-item relative col-span-6 md:col-span-3 lg:col-span-2 transition duration-500 ease-ease hover:shadow-lg">
            <div class="ads-item__image relative bg-body-primary">
                <a class="ads-item__link" x-bind:href="product.url">
                    <div class="responsive aspect-w-5 aspect-h-6">
                        <img class="absolute w-full h-full left-0 top-0 object-cover blur-up lazyloaded" x-bind:src="product.image">
                    </div>
                </a>
            </div>
            <template x-if="product.title">
            <div class="ads-item__info py-3 px-2">
                <a class="ads-item__link" x-bind:href="product.url">
                    <h3 class="ads-item__title text-sm lg:text-base text-heading font-heading font-medium mb-1" x-text="product.title"></h3>
                </a>
                <template x-if="product.price">
                <p class="ads-item__price mb-3">
                    <span class="text-heading-primary text-xs lg:text-sm font-medium" x-text="product.price"></span>
                </p>
                </template>
            </div>
            </template>
        </div>
        </template>
        `);
        
        return wrapper;
        },
        ad() {
            // let wrapper = this.$refs.related1;
            const wrapper = document.querySelector(".card-item-1");

        wrapper.insertAdjacentHTML('afterend', `
        <div class="ads-item relative col-span-6 md:col-span-3 lg:col-span-2 transition duration-500 ease-ease hover:shadow-lg">
            <div class="ads-item__image relative bg-body-primary">
                <a class="ads-item__link" x-bind:href="adProduct.url">
                    <div class="responsive aspect-w-5 aspect-h-6">
                        <img class="absolute w-full h-full left-0 top-0 object-cover blur-up lazyloaded" x-bind:src="adProduct.image">
                    </div>
                </a>
            </div>
            <template x-if="adProduct.title">
            <div class="ads-item__info py-3 px-2">
                <a class="ads-item__link" x-bind:href="adProduct.url">
                    <h3 class="ads-item__title text-sm lg:text-base text-heading font-heading font-medium mb-1" x-text="adProduct.title"></h3>
                </a>
                <template x-if="adProduct.price">
                <p class="ads-item__price mb-3">
                    <span class="text-heading-primary text-xs lg:text-sm font-medium" x-text="adProduct.price"></span>
                </p>
                </template>
            </div>
            </template>
        </div>
        `);
        
        return wrapper;
        },
        adItem(index) {
            // let wrapper = this.$refs.related1;
            const wrapper = document.querySelector(".card-item-1");

        wrapper.insertAdjacentHTML('afterend', `
        <div class="ads-item relative col-span-6 md:col-span-3 lg:col-span-2 transition duration-500 ease-ease hover:shadow-lg">
            <div class="ads-item__image relative bg-body-primary">
                <a class="ads-item__link" x-bind:href="adProduct.url">
                    <div class="responsive aspect-w-5 aspect-h-6">
                        <img class="absolute w-full h-full left-0 top-0 object-cover blur-up lazyloaded" x-bind:src="adProduct.image">
                    </div>
                </a>
            </div>
            <template x-if="adProduct.title">
            <div class="ads-item__info py-3 px-2">
                <a class="ads-item__link" x-bind:href="adProduct.url">
                    <h3 class="ads-item__title text-sm lg:text-base text-heading font-heading font-medium mb-1" x-text="adProduct.title"></h3>
                </a>
                <template x-if="adProduct.price">
                <p class="ads-item__price mb-3">
                    <span class="text-heading-primary text-xs lg:text-sm font-medium" x-text="adCard.price"></span>
                </p>
                </template>
            </div>
            </template>
        </div>
        `);
        
        return wrapper;
        }
    }))
})