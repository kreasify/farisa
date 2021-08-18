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
            // let produk = `${person.map((product, index) => product.summary = '<li>' + product.name + product.email + '</li>')}`;

            let wrapper = this.$refs.related;

        wrapper.insertAdjacentHTML('beforeend', `
            <template ${x-for="color in users">
            <li x-text="color.name + color.email"></li>
            </template>
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