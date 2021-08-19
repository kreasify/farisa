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
        <div class="">
            <div class="grid grid-cols-12 lg:grid-cols-10 gap-3 lg:gap-6">
                <template x-for="(item, index) in products">
                <div class="feed-item col-span-6 md:col-span-3 lg:col-span-2 transition duration-500 ease-ease hover:shadow-lg">
                    <div class="feed-item__image relative bg-body-primary">
                        <a class="feed-item__link" x-bind:href="item.url">
                            <div class="responsive aspect-w-5 aspect-h-6">
                                <img class="absolute w-full h-full left-0 top-0 object-cover blur-up lazyloaded" x-bind:src="item.image">
                            </div>
                        </a>
                    </div>
                    <template x-if="item.title">
                    <div class="feed-item__info py-3 px-2">
                        <a class="feed-item__link" x-bind:href="item.url">
                            <h3 class="feed-item__title text-sm lg:text-base text-heading font-heading font-medium mb-1" x-text="item.title"></h3>
                        </a>
                        <template x-if="item.price">
                        <p class="feed-item__price mb-3">
                            <span class="text-heading-primary text-xs lg:text-sm font-medium" x-text="item.price"></span>
                        </p>
                        </template>
                    </div>
                    </template>
                </div>
                </template>
            </div>
            `);
            return wrapper;
        }
    }))
})