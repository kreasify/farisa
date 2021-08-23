document.addEventListener('alpine:init', () => {
    Alpine.data('checkout', () => ({
        user: {},
        activeStyle: false,
        destination: '',
        couriers: [],
        destinationName: '',
        fetchCourier() {
            if (this.destination !== '') {
                fetch('https://ongkir-106.netlify.app/api/' + this.destination.split(',')[0])
                    .then(response => response.json())
                    .then(data => {
                        this.couriers = data.results, this.destinationName = data.destination
                    })
            }
        },
        courierActive: null,
        courier: '',
        name: '',
        hp: '',
        email: '',
        address: '',
        postcode: '',
        payment: '',
        paymentActive: null,
        paymentAccount: '',
        init() {
            const autoCompleteJS = new autoComplete({
                data: {
                    src: async () => {
                        try {
                            this.$refs.autoComplete.setAttribute("placeholder", "Loading...");
                            const source = await fetch(
                                "/api/destination.json"
                            );
                            const data = await source.json();
                            this.$refs.autoComplete.setAttribute("placeholder", autoCompleteJS.placeHolder);
                            return data;
                        } catch (error) {
                            return error;
                        }
                    },
                    keys: ["id", "name"],
                    cache: false,
                    filter: (list) => {
                        const filteredResults = Array.from(
                            new Set(list.map((value) => value.match))
                        ).map((id) => {
                            return list.find((value) => value.match === id);
                        });

                        return filteredResults;
                    }
                },
                placeHolder: "Masukkan Kecamatan",
                resultsList: {
                    class: "results__list list-none bg-body-secondary transition-all duration-500 ease-ease pl-0",
                    element: (list, data) => {
                        list.setAttribute("data-parent", "name-list");
                    },
                    noResults: true,
                    maxResults: 15,
                    tabSelect: true
                },
                resultItem: {
                    class: "autoComplete__result text-sm text-body-text hover:bg-body truncate group hover:border-l-2 hover:border-r-2 hover:border-solid hover:border-primary py-1 px-3 mb-0",
                    element: (item, data) => {
                        // Modify Results Item Content
                        item.innerHTML = `
                        <span class="truncate">
                        ${data.match}
                        </span>`;
                    },
                    highlight: "autoComplete_highlight text-primary bg-transparent",
                    selected: "autoComplete_selected bg-body border-l-2 border-r-2 border-solid border-primary"
                },
                events: {
                    input: {
                        focus: () => {
                            if (autoCompleteJS.input.value.length) autoCompleteJS.start();
                        },
                        selection: () => {
                            const feedback = event.detail;
                            const selection = feedback.selection.value.name;
                            const toDestination = feedback.selection.value.id + ', ' + feedback.selection.value.name;
                            this.$refs.autoComplete.setAttribute("placeholder", selection);
                            this.$refs.autoComplete.value = selection;
                            this.activeStyle = true;
                            this.destination = toDestination;
                            this.fetchCourier();
                            this.courier = '';
                            this.courierActive = null;
                            event.preventDefault();
                            
                            console.log(event.detail);
                        }
                    },
                }
            });
            return autoCompleteJS ;
        },
        localPrice(amount) {
            return amount.toLocaleString('id-ID', {
                style: 'currency',
                currency: 'IDR',
                minimumFractionDigits: 0,
                maximumFractionDigits: 0
            });
        },
        sendWa(products, subtotal, berat) {
            const header = `Hi%20kak%20${this.user.name}%2C%20saya%20mau%20order%20produk%20di%20toko%20${this.user.shop_name}%20dengan%20rincian%20berikut%2C%0A%0A`
            const name = `Nama%20%20%20%20%20%20%3A%20${this.name}%20%0A`;
            const hp = `No.%20HP%20%20%20%20%3A%20${this.hp}%20%0A`;
            const email = `Email%20%20%20%20%20%20%20%3A%20${this.email}%20%0A`;
            const district = ', Kec. ' + this.destination.split(',')[1] + ', ' + this.destination.split(',')[2] + ', ' + this.destination.split(',')[3];
            const address = `Alamat%20%20%20%20%20%3A%20${this.address}%20${district}%20${this.postcode} %0A`;
            const produk = `${products.map((product, index) => product.summary = '%0A*' + product.qty + 'x*%20' + product.name + '%20*' + product.size + '*%20%0A_@' + this.localPrice(product.price) + '_%20%20%3D%3D%3E%20%20%20%20%20%20%20%20%20' + this.localPrice(product.price * product.qty)).join('%0A')}`;
            const product_list = `Rincian%20Pesanan%2C%0A_%20_%20_%20_%20_%20_%20_%20_%20_%20_%20_%20_%20_%20_%20_%20_%20_%20_%20_%20_%20_%20_%20_%20_${produk}%0A_%20_%20_%20_%20_%20_%20_%20_%20_%20_%20_%20_%20_%20_%20_%20_%20_%20_%20_%20_%20_%20_%20_%2B%0A`;
            const sub_total = `Subtotal%20%20%20%20%20%20%20%3A%20${this.localPrice(subtotal)}%0A`;
            const kurir = `Kurir%20%20%20%20%20%20%20%3A%20${this.courier !== '' ? this.courier.split(',')[0] + ' - ' + this.localPrice(parseInt(this.courier.split(',')[1])) : '' }%0A%0A`;
            const ongkir = `Ongkir%20%20%20%20%20%20%20%20%20%3A%20${this.courier !== '' ? this.localPrice(parseInt(this.courier.split(',')[1]) * berat) : 'belum ada kurir'}%0A`;
            const total_bayar = `*Total%20Pembayaran%20%20%20${this.courier !== '' ? this.localPrice(subtotal + (parseInt(this.courier.split(',')[1]) * berat )) : this.localPrice(subtotal)}*`;
            const link = `https://api.whatsapp.com/send?phone=${this.user.whatsapp}&text=${header}${name}${hp}${email}${address}${kurir}${product_list}${sub_total}${ongkir}${total_bayar}`;
            
            if ((this.name !== '') && (this.hp !== '') && (this.email !== '') && (this.address !== '') && (this.destination !== '')) {
                window.open(link);
            }
        },
    })
    )
})