document.addEventListener('alpine:init', () => {
    Alpine.data('pages', () => ({
        related: [],
        products: [],
        adFirst: {},
        adSecond: {},
        adThird: {},
        adFourth: {},
        adFifth: {},
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
                this.adFifth = data.items[4];
            };
            const wrapper_0 = document.querySelector(".related-item-0");
            const wrapper_1 = document.querySelector(".related-item-2");
            const wrapper_2 = document.querySelector(".related-item-4");
            const feed_1 = document.querySelectorAll(".feed-item-4");
            const feed_2 = document.querySelectorAll(".feed-item-8");
            const feed_3 = document.querySelectorAll(".feed-item-12");
            const feed_4 = document.querySelectorAll(".feed-item-16");
            const feed_5 = document.querySelectorAll(".feed-item-20");
            const feed_6 = document.querySelectorAll(".feed-item-24");
            const feed_7 = document.querySelectorAll(".feed-item-28");
            const feed_8 = document.querySelectorAll(".feed-item-32");
            const feed_9 = document.querySelectorAll(".feed-item-36");
            const feed_10 = document.querySelectorAll(".feed-item-40");
            let i;

            if (feed_1) {
                for (i = 0; i < feed_1.length; i++) {
                    this.adFirst(feed_1[i]);
                }
            }
            if (feed_2) {
                for (i = 0; i < feed_2.length; i++) {
                    this.adSecond(feed_2[i]);
                }
            }
            if (feed_3) {
                for (i = 0; i < feed_3.length; i++) {
                    this.adThird(feed_3[i]);
                }
            }
            if (feed_4) {
                for (i = 0; i < feed_4.length; i++) {
                    this.adFourth(feed_4[i]);
                }
            }
            if (feed_5) {
                for (i = 0; i < feed_5.length; i++) {
                    this.adFifth(feed_5[i]);
                }
            }
            if (feed_6) {
                for (i = 0; i < feed_6.length; i++) {
                    this.adFirst(feed_6[i]);
                }
            }
            if (feed_7) {
                for (i = 0; i < feed_7.length; i++) {
                    this.adSecond(feed_7[i]);
                }
            }
            if (feed_8) {
                for (i = 0; i < feed_8.length; i++) {
                    this.adThird(feed_8[i]);
                }
            }
            if (feed_9) {
                for (i = 0; i < feed_9.length; i++) {
                    this.adFourth(feed_9[i]);
                }
            }
            if (feed_10) {
                for (i = 0; i < feed_10.length; i++) {
                    this.adFifth(feed_10[i]);
                }
            }
            if (wrapper_0) {
            this.adFirst(wrapper_0);
            }
            if (wrapper_1) {
            this.adSecond(wrapper_1);
            }
            if (wrapper_2) {
            this.adThird(wrapper_2);
            this.adFourth(wrapper_2);
            }
           
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
        adFirst(wrapper) {            
            wrapper.insertAdjacentHTML('afterend', `
            <div class="ads-item relative col-span-6 md:col-span-3 lg:col-span-2 transition duration-500 ease-ease hover:shadow-lg">
                <div class="ads-item__image relative bg-body-primary">
                    <a class="ads-item__link" x-bind:href="adFirst.url">
                        <div class="responsive aspect-w-5 aspect-h-6">
                            <template x-if="adFirst.image">
                            <img class="absolute w-full h-full left-0 top-0 object-cover blur-up lazyloaded" x-bind:src="adFirst.image">
                            </template>
                        </div>
                    </a>
                </div>
                <div class="absolute top-0 left-0 w-full h-8 flex items-center justify-end pr-1">
                    <span class="text-xs leading-5 text-body-text bg-body opacity-50 rounded-sm px-1">Ad by Vitoko</span>
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
                    <p class="mb-2">
                        <span class="text-xs text-body bg-body-text opacity-80 rounded-sm px-1">Iklan</span>
                        <span class="text-xs text-body-text-secondary pl-1">https://hijacket.site</span>
                    </p>
                </div>
                </template>
            </div>
            `);
            
            return wrapper;
        },
        adSecond(wrapper) {
            wrapper.insertAdjacentHTML('afterend', `
            <div class="ads-item relative col-span-6 md:col-span-3 lg:col-span-2 transition duration-500 ease-ease hover:shadow-lg">
                <div class="ads-item__image relative bg-body-primary">
                    <a class="ads-item__link" x-bind:href="adSecond.url">
                        <div class="responsive aspect-w-5 aspect-h-6">
                            <img class="absolute w-full h-full left-0 top-0 object-cover blur-up lazyloaded" x-bind:src="adSecond.image">
                        </div>
                    </a>
                </div>
                <div class="absolute top-0 left-0 w-full h-8 flex items-center justify-end pr-1">
                    <span class="text-xs leading-5 text-body-text bg-body opacity-50 rounded-sm px-1">Ad by Vitoko</span>
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
        adThird(wrapper) {
            wrapper.insertAdjacentHTML('beforebegin', `
            <div class="ads-item relative col-span-6 md:col-span-3 lg:col-span-2 transition duration-500 ease-ease hover:shadow-lg">
                <div class="ads-item__image relative bg-body-primary">
                    <a class="ads-item__link" x-bind:href="adThird.url">
                        <div class="responsive aspect-w-5 aspect-h-6">
                            <img class="absolute w-full h-full left-0 top-0 object-cover blur-up lazyloaded" x-bind:src="adThird.image">
                        </div>
                    </a>
                </div>
                <div class="absolute top-0 left-0 w-full h-8 flex items-center justify-end pr-1">
                    <span class="text-xs leading-5 text-body-text bg-body opacity-50 rounded-sm px-1">Ad by Vitoko</span>
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
        adFourth(wrapper) {
            wrapper.insertAdjacentHTML('afterend', `
            <div class="ads-item relative col-span-6 md:col-span-3 lg:col-span-2 transition duration-500 ease-ease hover:shadow-lg">
                <div class="ads-item__image relative bg-body-primary">
                    <a class="ads-item__link" x-bind:href="adFourth.url">
                        <div class="responsive aspect-w-5 aspect-h-6">
                            <img class="absolute w-full h-full left-0 top-0 object-cover blur-up lazyloaded" x-bind:src="adFourth.image">
                        </div>
                    </a>
                </div>
                <div class="absolute top-0 left-0 w-full h-8 flex items-center justify-end pr-1">
                    <span class="text-xs leading-5 text-body-text bg-body opacity-50 rounded-sm px-1">Ad by Vitoko</span>
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
        adFifth(wrapper) {
            wrapper.insertAdjacentHTML('afterend', `
            <div class="ads-item relative col-span-6 md:col-span-3 lg:col-span-2 transition duration-500 ease-ease hover:shadow-lg">
                <div class="ads-item__image relative bg-body-primary">
                    <a class="ads-item__link" x-bind:href="adFifth.url">
                        <div class="responsive aspect-w-5 aspect-h-6">
                            <img class="absolute w-full h-full left-0 top-0 object-cover blur-up lazyloaded" x-bind:src="adFifth.image">
                        </div>
                    </a>
                </div>
                <div class="absolute top-0 left-0 w-full h-8 flex items-center justify-end pr-1">
                    <span class="text-xs leading-5 text-body-text bg-body opacity-50 rounded-sm px-1">Ad by Vitoko</span>
                </div>
                <template x-if="adFifth.title">
                <div class="ads-item__info py-3 px-2">
                    <a class="ads-item__link" x-bind:href="adFifth.url">
                        <h3 class="ads-item__title text-sm lg:text-base text-heading font-heading font-medium mb-1" x-text="adFifth.title"></h3>
                    </a>
                    <template x-if="adFifth.price">
                    <p class="ads-item__price mb-3">
                        <span class="text-heading-primary text-xs lg:text-sm font-medium" x-text="adFifth.price"></span>
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