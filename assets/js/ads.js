document.addEventListener('alpine:init', () => {
    Alpine.data('ads', () => ({
        users: [],
        nama: 'vitoko',
        init() {
            const person = async () => {
                const response = await fetch('https://vitoko.netlify.app/ads/index.json')
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
            <div class="grid grid-cols-12 lg:grid-cols-10 gap-3 lg:gap-6">
                <template x-for="color in users">
                <li x-text="color.title + color.email"></li>
                </template>
            </div>
            `);
            return wrapper;
        }
    }))
})