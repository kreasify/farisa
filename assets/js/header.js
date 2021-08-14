    document.addEventListener('alpine:init', () => {
        Alpine.data('rivebit', () => ({
            open: false,
            toggle() {
                this.open = ! this.open
            },
            atTop: true,
            showSearch: false,
            sideNav: false,
            display_drop_menu() {
                const drop_menu = event.target.parentElement.getElementsByClassName("nav__submenu-wrapper")[0];
                const drop_menus = document.getElementsByClassName("nav__submenu-wrapper");

                Array.from(drop_menus).forEach(function(e) {
                    if (e != drop_menu) {
                        e.classList.remove("active");
                    }
                });

                const list = document.getElementById("menu").getElementsByTagName("li");
                Array.from(list).forEach(function(e) {
                    e.classList.remove("submenu-opened");
                    e.style.marginBottom = 0;
                });

                if (drop_menu) {
                    (!drop_menu.classList.contains("active")) ? drop_menu.classList.add("active"): drop_menu.classList.remove("active")
                    if (drop_menu.classList.contains("active")) {
                        event.target.parentElement.classList.add("submenu-opened");
                        event.target.parentElement.style.marginBottom = drop_menu.clientHeight + "px";
                    }
                }
            },
            query: '',
            searchResults: [],
            searchById: null, 
            search() {
                const url = `/feed/index.json`;
                fetch(url)
                    .then(response => response.json())
                    .then(data => {
                        const allResults = data.items
                        const itemById = allResults.reduce((byId, item) => {
                            byId[item.id] = item
                            return byId
                        }, {})
                        let miniSearch = new MiniSearch({
                            fields: ['title'],
                            storeFields: ['title', 'image', 'price'],
                            processTerm: (term, _fieldName) => (term.length <= 1) ? null : term.toLowerCase()
                        })

                        miniSearch.addAll(allResults)
                        this.searchById = itemById

                        let results = miniSearch.search(this.query, {
                            combineWith: 'AND',
                            prefix: true
                        }).map(({
                            id
                        }) => itemById[id])

                        this.searchResults = results

                        console.log(results)

                        return this.searchResults.filter((item) => {
                            return item.title.toLowerCase()
                        });

                    })
                    .catch(error => {
                        console.log(error);
                    });
            }
        }))
    })