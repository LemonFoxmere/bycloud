// initialize all UI
let init_ui = ():void => {
    // init size of title
    document.getElementById("title-container")!.style.height = `${document.getElementById("main-bg")!.getBoundingClientRect().height}px`;
    document.getElementById("title-container")!.style.width = `${document.getElementById("main-bg")!.getBoundingClientRect().width > window.innerWidth ? window.innerWidth : document.getElementById("main-bg")!.getBoundingClientRect().width}px`;
    document.getElementById("title-container")!.style.marginTop = `${document.getElementById("main-bg")!.getBoundingClientRect().y}px`;
    document.getElementById("title-container")!.style.marginLeft = `${document.getElementById("main-bg")!.getBoundingClientRect().width > window.innerWidth ? 0 : document.getElementById("main-bg")!.getBoundingClientRect().x}px`;
}

window.onload = ():void => {
    init_ui();

    // update dimension for title section
    window.onresize = ():void => {
        document.getElementById("title-container")!.style.height = `${document.getElementById("main-bg")!.getBoundingClientRect().height}px`;
        document.getElementById("title-container")!.style.width = `${document.getElementById("main-bg")!.getBoundingClientRect().width > window.innerWidth ? window.innerWidth : document.getElementById("main-bg")!.getBoundingClientRect().width}px`;
        document.getElementById("title-container")!.style.marginTop = `${document.getElementById("main-bg")!.getBoundingClientRect().y}px`;
        document.getElementById("title-container")!.style.marginLeft = `${document.getElementById("main-bg")!.getBoundingClientRect().width > window.innerWidth ? 0 : document.getElementById("main-bg")!.getBoundingClientRect().x}px`;
    }
}
