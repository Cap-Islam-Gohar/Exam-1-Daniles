
const typed = {
    play: false,
    index: 0,
    targetEl: document.getElementById("typed"),
    TypedArray: [],
    time: 3000,
    get textArray() {
        return Array.isArray(this.TypedArray) && this.TypedArray != 0 ? this.TypedArray : this.targetEl.dataset.text.split(",");
    },
    when: function (consdition) {
        this.play = Boolean(consdition);
        return this;
    },
    run: function () {

        this.targetEl.classList.add("typed-wrapper")
        this.targetEl.style.animationDuration = `${this.time}ms`;
        
        const el = document.createElement("span");
        const cursor = document.createElement("span");
        cursor.classList.add("typed-cursor")
        el.classList.add("typed-text");
        
        this.targetEl.appendChild(el)
        this.targetEl.appendChild(cursor)

        this.loop()
        
    },
    loop: function () {

        this.targetEl.childNodes[0].innerHTML = this.textArray[this.index]

        if (this.play) {
            
            var timeout = setTimeout(() => {
                this.index++
                if (this.textArray.length <= this.index) {
                    this.index = 0
                }
                this.loop()
            }, this.time) 
            
        } else {
            clearTimeout(this.timeout)
        }
    }
}

const navBarHighlightObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            navBarHighlightHandler(entry)

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
    
    navBar.classList.add("scrolled-navbar")
    if (entry.target.id === "hero") {
        navBar.classList.remove("scrolled-navbar")
    }
    
    navLinks.forEach(el => {
        el.classList.remove("active")
        if (el.hash.slice(1) === entry.target.id) {
            el.classList.add("active")
        }    
    });
}


document.querySelectorAll("#navbar-list a").forEach(el => {  

    const section = document.getElementById(
        el.hash.slice(1)
    )    

    navBarHighlightObserver.observe(section)

    el.addEventListener('click', function (e) {
        e.preventDefault()        
        el.style.scrollMarginTop = 62 + "px";
        document.getElementById(el.hash.slice(1)).scrollIntoView();
    });
});




/**
 * progress bar
 * =======================
 */

const progressDiv = document.querySelector(".skills");
const progressBars = document.querySelectorAll(".progress");
const progressObserver = new IntersectionObserver((entries) => {

    const [entry] = entries;
    
    Array.from(entry.target.querySelectorAll('.progress')).forEach(el => {
        if (entry.isIntersecting) {
            el.firstElementChild.style.width = el.getAttribute("aria-valuenow") + "%";
        } else {
            el.firstElementChild.style.width = 0;
        }
    })
        
});

progressObserver.observe(progressDiv);


const swiper = new Swiper('.swiper', {
    // Optional parameters
    loop: true,

    // If we need pagination
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



