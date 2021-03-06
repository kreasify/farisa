function slider() {
    return {
        splide() {
            const slider = new Splide(this.$refs.splidejs, {
                type: 'fade',
                rewind: true,
                lazyLoad: 'nearby',
                autoplay: true,
                classes: {
                    arrows: 'splide__arrows',
                    arrow: 'splide__arrow text-body-text hover:text-body-text-secondary bg-body hover:bg-body-primary transition ease-out duration-300 shadow-md box-content lg:py-1 lg:px-1',
                    prev: 'splide__arrow--prev transform opacity-0 -translate-x-20 group-hover:translate-x-0 group-hover:opacity-80',
                    next: 'splide__arrow--next transform opacity-0 translate-x-20 group-hover:translate-x-0 group-hover:opacity-80',
                    pagination: 'splide__pagination',
                    page: 'splide__pagination__page bg-body transition-all duration-400 ease-in-out shadow-md my-1 mx-1',
                },
            }).mount();

            if (this.$refs.splidejs) {
                return slider;
            }
        }
    }
}