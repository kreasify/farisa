document.addEventListener('alpine:init', () => {
    Alpine.data('ads', () => ({
        products: [],
        nama: 'vitoko',
        init() {
            const getProducts = async () => {
                const response = await fetch('https://vitoko.netlify.app/ads/index.json')
                if (! response.ok) alert(`Something went wrong: ${response.status} - ${response.statusText}`)
                data = await response.json();
                this.products = data.items;
            };
            this.related();

            return getProducts;
            
        },
        related() {
            let wrapper = this.$refs.related;

        wrapper.insertAdjacentHTML('beforeend', `
            <div class="grid grid-cols-12 lg:grid-cols-10 gap-3 lg:gap-6">
                <template x-for="(item, index) in products">
                <div class="feed-item col-span-6 md:col-span-3 lg:col-span-2 transition duration-500 ease-ease hover:shadow-lg">
                    <div class="feed-item__image relative bg-body-primary">
                        <a class="feed-item__link"  x-bind:href="item.url">
                            <div class="responsive aspect-w-5 aspect-h-6">
                                <img class="absolute w-full h-full left-0 top-0 object-cover blur-up ls-is-cached lazyloaded" x-bind:href="item.url"="https://cdn.statically.io/img/vitoko.netlify.app/q=100/uploads/lacy-scrunch-up-detail-top-light-brown_brown_1_huf1b0433ab880e45b05aa0f154b43bef9_63018_224x269_fill_q100_h2_box_top.webp" alt="Lacy Scrunch Up Detail Top Light Brown" src="https://cdn.statically.io/img/vitoko.netlify.app/q=100/uploads/lacy-scrunch-up-detail-top-light-brown_brown_1_huf1b0433ab880e45b05aa0f154b43bef9_63018_224x269_fill_q100_h2_box_top.webp">
                            </div>
                        </a>
                    </div>
                    <div class="feed-item__info py-3 px-2">
                        <a class="feed-item__link" x-bind:href="item.url">
                            <h3 class="feed-item__title text-sm lg:text-base text-heading font-heading font-medium mb-1">Lacy Scrunch Up Detail Top Light Brown</h3>
                        </a>
                        <p class="feed-item__price mb-3">
                            <span class="text-heading-primary text-xs lg:text-sm font-medium">Rp 199.000</span>
                        </p>
                    </div>
                </div>
                </template>
            </div>
            `);
            return wrapper;
        }
    }))
})