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
            return person;
        }
    }))
})