

class progressAnimation {
    constructor(options = {}) {
        this.selector = options.selector;
        this.duration = options.duration;
        this.init()
    };
    init = () => {
        this.wrapper = document.querySelector(this.selector);
        Array.from(this.wrapper.querySelectorAll('.progress')).forEach(el => {
            el.firstElementChild.style.transition = `all ${this.duration}ms`;
            el.firstElementChild.style.width = "0%";
        });
        return this;
    };
    run = () => {
        const progressObserver = new IntersectionObserver((entries) => {
            const [entry] = entries;
            Array.from(entry.target.querySelectorAll('.progress')).forEach(el => {
                if (entry.isIntersecting) {
                    el.firstElementChild.style.width = `${el.getAttribute("aria-valuenow")}%`;
                } else {
                    el.firstElementChild.style.width = 0;
                }
            });
        });
        progressObserver.observe(this.wrapper);
    }
};

