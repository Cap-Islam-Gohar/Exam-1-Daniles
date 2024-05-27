
const Filter = (target) => {

    target = document.querySelector(target)

    let tabs = [...target.querySelectorAll("[data-filter]")];
    let contents = [...target.querySelectorAll("[data-filter-references]")];

    let activeTab = (tab) =>  {
        
        tabs.forEach(el => {
            el.classList.contains('active') ? el.classList.remove("active") : tab.classList.add("active")
        });

        contents.forEach(el => {
            
            const references = el.dataset.filterReferences.split(',');
            if (references.includes(tab.dataset.filter) || tab.dataset.filter === "*") {
                el.classList.add("show-filter-card");
                el.classList.remove("hide-filter-card");
                
            } else {

                el.classList.remove("show-filter-card");
                el.classList.add("hide-filter-card");
            }
        });
    }

    activeTab(
        tabs.find(el => el.closest(".active")) ?? tabs[0]
    )

    tabs.forEach(element => {
        element.addEventListener('click', function (e) {
            activeTab(e.target)
        })
    });
};
