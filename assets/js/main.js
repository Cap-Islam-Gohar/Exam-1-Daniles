
(() => {

    /**
     * loader
     */
    document.addEventListener('DOMContentLoaded', () => {

        const loader = document.getElementById("loader");
        loader.style.transition = "all 1s ease";

        setTimeout(() => {
            loader.children[0].style.height = "0";
            loader.children[0].style.opacity = "0";
            loader.children[1].style.height = "0";
            loader.children[1].style.opacity = "0";
            loader.style.opacity = "0";

            setTimeout(() => {
                loader.style.display = "none";
                loader.style.zIndex = -1;
            }, 500);

        }, 1000);
    })

    /**
     * filter 
     */
    const portfolioFilter = Filter("#portfolio-filter")

    /**
     * progress bar
     * =======================
     */

    const progress = new progressAnimation({
        selector: ".skills",
        duration: 1000,
    }).run();


    /**
     *  Counter 
     * ======================
     */
    const counter = new counterAnimaion({
        selector: "#counter",
        duration: 300,
    }).run();

    /** loop throw each section and detect if in Viewport */
    const navBarHighlightObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                
                /** Run navBar Funcation */
                navBarHighlightHandler(entry)

                /** If Hero Section in Viewport Run Typed script */
                typed.when(
                    entry.target.id === "hero"
                ).run()
            }
        })
    }, {
        rootMargin: `-62px 0px -100%`,
    });


    const navBarHighlightHandler = (entry) => {

        const navBar = document.getElementById("navbar")
        const navLinks = document.querySelectorAll("#navbar-list a")
        

        /** Active Scroll-bar anyway */
        navBar.classList.add("scrolled-navbar")    
        if (entry.target.id === "hero") {
            /** if Hero Section in Viewport deactive scroll-bar*/
            navBar.classList.remove("scrolled-navbar")
        }
        
        /**
         * remove active class for each nav Link any way 
         * and add it to this link that refernce to current viewport section  
         * */
        navLinks.forEach(el => {
            el.classList.remove("active")
            if (el.hash.slice(1) === entry.target.id) {
                el.classList.add("active")
            }
        });
    }


    document.querySelectorAll("#navbar-list a").forEach(el => {

        /** get target section with link hash */
        const section = document.getElementById(
            el.hash.slice(1)
        )

        /** observe current section in loop */
        navBarHighlightObserver.observe(section)

        /** add click event to links to scroll this target section  */
        el.addEventListener('click', function (e) {
            e.preventDefault()
            document.getElementById(el.hash.slice(1)).scrollIntoView({ behavior : 'smooth'});
        });
    });

    var portfolioModalEl = document.getElementById('portfolio-modal');
    let portfolioModal = new bootstrap.Modal(portfolioModalEl);


    portfolioModalEl.addEventListener("show.bs.modal", e => {

        let portfolioCarouselEl = document.getElementById('portfolio-carousel');
        var portfolioCarousel = new bootstrap.Carousel(portfolioCarouselEl);

        let carouselCounterEl = portfolioCarouselEl.querySelector(".total");
        let carouselInner = portfolioCarouselEl.querySelector('.carousel-inner')
        let carouselCount = carouselInner.childElementCount;
        let carouselCurrentIndex = portfolioCarouselEl.querySelector(".current");
        carouselCounterEl.innerHTML = carouselCount;

        [...carouselInner.children].forEach((el, index) => {
            el.dataset.index = index + 1;
        });

        portfolioCarousel.to(e.relatedTarget.dataset.index)

        carouselCurrentIndex.innerHTML = e.relatedTarget.dataset.index ?? 1;
        portfolioCarouselEl.addEventListener('slid.bs.carousel', function (event) {
            portfolioCarouselEl.querySelector(".current").innerHTML = this.querySelector(".active").dataset.index;
        });
    }) 

})()