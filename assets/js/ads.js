document.addEventListener('alpine:init', () => {
    Alpine.data('ads', () => ({
        users: [],
        nama: 'vitoko',
        init() {
            const person = async () => {
                const response = await fetch('https://jsonplaceholder.typicode.com/users')
                if (! response.ok) alert(`Something went wrong: ${response.status} - ${response.statusText}`)
                data = await response.json();
                this.users = data;
            };
            this.related();

            return person;
            
        },
        related() {
            let wrapper = this.$refs.related;

        wrapper.insertAdjacentHTML('beforeend', `
            <div class="nav__cart">
                <template x-for="color in users">
                <li x-text="color.name + color.email"></li>
                </template>
            </div>
            `);
            return wrapper;
        }
    }))
})