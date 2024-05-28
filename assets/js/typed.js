

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
        
        if (this.targetEl.querySelector(".typed-text") === null) {
            
            const el = document.createElement("span");
            const cursor = document.createElement("span");
            cursor.classList.add("typed-cursor")
            el.classList.add("typed-text");
            
            this.targetEl.appendChild(el)
            this.targetEl.appendChild(cursor)
        }
        
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