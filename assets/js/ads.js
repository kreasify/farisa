document.addEventListener('alpine:init', () => {
    Alpine.data('ads', () => ({
        users: [],
        init() {
            const person = async () => {
                const response = await fetch('https://jsonplaceholder.typicode.com/users')
                if (! response.ok) alert(`Something went wrong: ${response.status} - ${response.statusText}`)
                data = await response.json();
                this.users = data;
            }
            const produk = `${person.map((product, index) => product.summary = '<li>' + product.name + product.email + '</li>')}`;

            let wrapper = this.$refs.related;

        wrapper.insertAdjacentHTML('beforeend', `
        <div id="nav__search" class="nav__search search search__desktop">
            <div class="search__box">
                <div class="search__form">
                    <input id="search__input" aria-label="..." type="search" placeholder="Cari..." class="search__form-input">
                    <svg aria-hidden="true" data-prefix="far" data-icon="times" viewBox="0 0 320 512" width="17px" height="17px"
                        class="times_svg__svg-inline--fa times_svg__fa-times times_svg__fa-w-10 times_svg__fa-2x times-icon search__form-clear">
                        <path fill="currentColor"
                            d="M207.6 256l107.72-107.72c6.23-6.23 6.23-16.34 0-22.58l-25.03-25.03c-6.23-6.23-16.34-6.23-22.58 0L160 208.4 52.28 100.68c-6.23-6.23-16.34-6.23-22.58 0L4.68 125.7c-6.23 6.23-6.23 16.34 0 22.58L112.4 256 4.68 363.72c-6.23 6.23-6.23 16.34 0 22.58l25.03 25.03c6.23 6.23 16.34 6.23 22.58 0L160 303.6l107.72 107.72c6.23 6.23 16.34 6.23 22.58 0l25.03-25.03c6.23-6.23 6.23-16.34 0-22.58L207.6 256z">
                        </path>
                    </svg>
                    <svg aria-hidden="true" data-prefix="far" data-icon="search" viewBox="0 0 512 512" width="16px"
                        height="16px"
                        class="search_svg__svg-inline--fa search_svg__fa-search search_svg__fa-w-16 search_svg__fa-2x search-icon search__form-search">
                        <path fill="currentColor"
                            d="M508.5 468.9L387.1 347.5c-2.3-2.3-5.3-3.5-8.5-3.5h-13.2c31.5-36.5 50.6-84 50.6-136C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c52 0 99.5-19.1 136-50.6v13.2c0 3.2 1.3 6.2 3.5 8.5l121.4 121.4c4.7 4.7 12.3 4.7 17 0l22.6-22.6c4.7-4.7 4.7-12.3 0-17zM208 368c-88.4 0-160-71.6-160-160S119.6 48 208 48s160 71.6 160 160-71.6 160-160 160z">
                        </path>
                    </svg>
                </div>
                <div id="search__suggestions" class="search__query"></div>
            </div>
        </div>
        <div class="nav__cart">
            <button class="nav__cart-button">
                <svg aria-hidden="true" data-prefix="fas" data-icon="shopping-bag" viewBox="0 0 448 512" width="20px" height="20px" class="shopping-bag_svg__svg-inline--fa shopping-bag_svg__fa-shopping-bag shopping-bag_svg__fa-w-14 shopping-bag_svg__fa-2x cart__bag-icon"><path fill="currentColor" d="M352 160v-32C352 57.42 294.579 0 224 0 153.42 0 96 57.42 96 128v32H0v272c0 44.183 35.817 80 80 80h288c44.183 0 80-35.817 80-80V160h-96zm-192-32c0-35.29 28.71-64 64-64s64 28.71 64 64v32H160v-32zm160 120c-13.255 0-24-10.745-24-24s10.745-24 24-24 24 10.745 24 24-10.745 24-24 24zm-192 0c-13.255 0-24-10.745-24-24s10.745-24 24-24 24 10.745 24 24-10.745 24-24 24z"></path></svg>
                <span class="nav__cart-info cart-box"></span>
            </button>
            <div class="nav__cart-checkout">
                <div class="cart"></div>
            </div>
        </div>
        `);

            // return person;
            return wrapper;
        }
    }))
})