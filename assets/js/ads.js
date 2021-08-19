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
            }
           
            // let produk = `${person.map((product, index) => product.summary = '<li>' + product.name + product.email + '</li>')}`;

            // return person;
            return wrapper;
        },
        related()
    }))
})