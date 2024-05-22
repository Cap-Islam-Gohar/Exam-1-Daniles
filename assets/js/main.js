

/**
 * progress bar
 * =======================
 */

const progress = new progressAnimation({
    selector: ".skills",
    duration: 1000,
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
        el.style.scrollMarginTop = 62 + "px";
        document.getElementById(el.hash.slice(1)).scrollIntoView({ behavior : 'smooth'});
    });
});




/**
 * swipper library for testimoials
 */
const swiper = new Swiper('.swiper', {
    loop: true,
    pagination: {
        el: '.swiper-pagination',
        type: 'bullets',
        clickable: true
    },
    autoplay: {
        delay: 5000,
        disableOnInteraction: false
    },
    slidesPerView: 'auto',
});



