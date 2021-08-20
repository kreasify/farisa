document.addEventListener('alpine:init', () => {
    Alpine.data('related', () => ({
        products: [],
        adFirst: {},
        adSecond: {},
        adThird: {},
        adFourth: {},
        myindex: 0,
        nama: 'vitoko',
        init() {
            const getProducts = async () => {
                const response = await fetch('https://vitoko.netlify.app/ads/index.json')
                if (! response.ok) alert(`Something went wrong: ${response.status} - ${response.statusText}`)
                data = await response.json();
                this.products = data.items;
                this.adFirst = data.items[0];
                this.adSecond = data.items[1];
                this.adThird = data.items[2];
                this.adFourth = data.items[3];
            };
            const wrapper = document.querySelector(".related-item-0");
            
            // this.relatedAd();
            this.adCard(0);
            this.adFirst();
            this.adSecond();
            this.adThird();
            this.adFourth();
           
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
        adCard(index) {
            // let wrapper = this.$refs.related1;
            const wrapper = document.querySelector(".related-item-0");

            wrapper.insertAdjacentHTML('beforebegin', `
            <div class="ads-item relative col-span-6 md:col-span-3 lg:col-span-2 transition duration-500 ease-ease hover:shadow-lg">
                <div class="ads-item__image relative bg-body-primary">
                    <a class="ads-item__link" x-bind:href="adFirst.url">
                        <div class="responsive aspect-w-5 aspect-h-6">
                            <img class="absolute w-full h-full left-0 top-0 object-cover blur-up lazyloaded" x-bind:src="adFirst.image">
                        </div>
                    </a>
                </div>
                <template x-if="adFirst.title">
                <div class="ads-item__info py-3 px-2">
                    <a class="ads-item__link" x-bind:href="adFirst.url">
                        <h3 class="ads-item__title text-sm lg:text-base text-heading font-heading font-medium mb-1" x-text="products[myindex].title"></h3>
                    </a>
                    <template x-if="adFirst.price">
                    <p class="ads-item__price mb-3">
                        <span class="text-heading-primary text-xs lg:text-sm font-medium" x-text="adFirst.price"></span>
                    </p>
                    </template>
                </div>
                </template>
            </div>
            `);
            
            return wrapper;
        },
        adFirst() {
            // let wrapper = this.$refs.related1;
            const wrapper = document.querySelector(".related-item-0");

            wrapper.insertAdjacentHTML('afterend', `
            <div class="ads-item relative col-span-6 md:col-span-3 lg:col-span-2 transition duration-500 ease-ease hover:shadow-lg">
                <div class="ads-item__image relative bg-body-primary">
                    <a class="ads-item__link" x-bind:href="adFirst.url">
                        <div class="responsive aspect-w-5 aspect-h-6">
                            <img class="absolute w-full h-full left-0 top-0 object-cover blur-up lazyloaded" x-bind:src="adFirst.image">
                        </div>
                    </a>
                </div>
                <template x-if="adFirst.title">
                <div class="ads-item__info py-3 px-2">
                    <a class="ads-item__link" x-bind:href="adFirst.url">
                        <h3 class="ads-item__title text-sm lg:text-base text-heading font-heading font-medium mb-1" x-text="adFirst.title"></h3>
                    </a>
                    <template x-if="adFirst.price">
                    <p class="ads-item__price mb-3">
                        <span class="text-heading-primary text-xs lg:text-sm font-medium" x-text="adFirst.price"></span>
                    </p>
                    </template>
                </div>
                </template>
            </div>
            `);
            
            return wrapper;
        },
        adSecond() {
            // let wrapper = this.$refs.related1;
            const wrapper = document.querySelector(".related-item-2");

            wrapper.insertAdjacentHTML('afterend', `
            <div class="ads-item relative col-span-6 md:col-span-3 lg:col-span-2 transition duration-500 ease-ease hover:shadow-lg">
                <div class="ads-item__image relative bg-body-primary">
                    <a class="ads-item__link" x-bind:href="adSecond.url">
                        <div class="responsive aspect-w-5 aspect-h-6">
                            <img class="absolute w-full h-full left-0 top-0 object-cover blur-up lazyloaded" x-bind:src="adSecond.image">
                        </div>
                    </a>
                </div>
                <template x-if="adSecond.title">
                <div class="ads-item__info py-3 px-2">
                    <a class="ads-item__link" x-bind:href="adSecond.url">
                        <h3 class="ads-item__title text-sm lg:text-base text-heading font-heading font-medium mb-1" x-text="adSecond.title"></h3>
                    </a>
                    <template x-if="adSecond.price">
                    <p class="ads-item__price mb-3">
                        <span class="text-heading-primary text-xs lg:text-sm font-medium" x-text="adSecond.price"></span>
                    </p>
                    </template>
                </div>
                </template>
            </div>
            `);
            
            return wrapper;
        },
        adThird() {
            // let wrapper = this.$refs.related1;
            const wrapper = document.querySelector(".related-item-4");

            wrapper.insertAdjacentHTML('beforebegin', `
            <div class="ads-item relative col-span-6 md:col-span-3 lg:col-span-2 transition duration-500 ease-ease hover:shadow-lg">
                <div class="ads-item__image relative bg-body-primary">
                    <a class="ads-item__link" x-bind:href="adThird.url">
                        <div class="responsive aspect-w-5 aspect-h-6">
                            <img class="absolute w-full h-full left-0 top-0 object-cover blur-up lazyloaded" x-bind:src="adThird.image">
                        </div>
                    </a>
                </div>
                <template x-if="adThird.title">
                <div class="ads-item__info py-3 px-2">
                    <a class="ads-item__link" x-bind:href="adThird.url">
                        <h3 class="ads-item__title text-sm lg:text-base text-heading font-heading font-medium mb-1" x-text="adThird.title"></h3>
                    </a>
                    <template x-if="adThird.price">
                    <p class="ads-item__price mb-3">
                        <span class="text-heading-primary text-xs lg:text-sm font-medium" x-text="adThird.price"></span>
                    </p>
                    </template>
                </div>
                </template>
            </div>
            `);
            
            return wrapper;
        },
        adFourth() {
            // let wrapper = this.$refs.related1;
            const wrapper = document.querySelector(".related-item-4");

            wrapper.insertAdjacentHTML('afterend', `
            <div class="ads-item relative col-span-6 md:col-span-3 lg:col-span-2 transition duration-500 ease-ease hover:shadow-lg">
                <div class="ads-item__image relative bg-body-primary">
                    <a class="ads-item__link" x-bind:href="adFourth.url">
                        <div class="responsive aspect-w-5 aspect-h-6">
                            <img class="absolute w-full h-full left-0 top-0 object-cover blur-up lazyloaded" x-bind:src="adFourth.image">
                        </div>
                    </a>
                </div>
                <template x-if="adFourth.title">
                <div class="ads-item__info py-3 px-2">
                    <a class="ads-item__link" x-bind:href="adFourth.url">
                        <h3 class="ads-item__title text-sm lg:text-base text-heading font-heading font-medium mb-1" x-text="adFourth.title"></h3>
                    </a>
                    <template x-if="adFourth.price">
                    <p class="ads-item__price mb-3">
                        <span class="text-heading-primary text-xs lg:text-sm font-medium" x-text="adFourth.price"></span>
                    </p>
                    </template>
                </div>
                </template>
            </div>
            `);
            
            return wrapper;
        },
    }))
})