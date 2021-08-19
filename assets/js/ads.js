document.addEventListener('alpine:init', () => {
    Alpine.data('related', () => ({
        related: [],
        products: [],
        nama: 'vitoko',
        init() {
            const getProducts = async () => {
                const response = await fetch('https://vitoko.netlify.app/ads/index.json')
                if (! response.ok) alert(`Something went wrong: ${response.status} - ${response.statusText}`)
                data = await response.json();
                this.products = data.items;
            };
            let allProducts = this.related.concat(getProducts);


            this.relatedAd();

            return allProducts;
            
        },
        relatedAd() {
            let wrapper = this.$refs.related;

        wrapper.insertAdjacentHTML('beforeend', `
        <template x-for="(product, index) in related">
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
        }
    }))
})