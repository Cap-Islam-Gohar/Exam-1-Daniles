
class counterAnimaion {
    constructor(options = {}) {
        this.selector = options.selector;
        this.duration = options.duration;
        this.init()
    };
    init = () => {
        this.wrapper = document.querySelector(this.selector);
        return this;
    };
    startcounter = () => {
        Array.from(this.wrapper.querySelectorAll('.number')).forEach(el => {
            const num = el.dataset.num; 
            let average = num / this.duration;
            let i = 0;
            const counter = setInterval(() => {
                if (i <= num) {
                    i += average;
                    el.innerHTML = Math.floor(i)
                }
            }, 1);
        });
    };
    retriveToZero = () => {
        Array.from(this.wrapper.querySelectorAll('.number')).forEach(el => {
            const num = el.dataset.num; 
            let average = num / this.duration;
            let i = 0;
            const counter = setInterval(() => {
                if (i > 0) {
                    i -= average;
                    el.innerHTML = Math.floor(i)
                }
            }, 1);
        });
    }
    run = () => {
        const counterObserver = new IntersectionObserver((entries) => {
            const [entry] = entries;
            Array.from(entry.target.querySelectorAll('.number')).forEach(el => {
                if (entry.isIntersecting) {
                    this.startcounter()
                } else {
                    this.retriveToZero()
                }
            });
        });
        counterObserver.observe(this.wrapper);
    }
};
