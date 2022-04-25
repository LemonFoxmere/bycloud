import anime from "animejs";

export type callbacks = (content?: any) => any;

// initialize all UI
const update_title_container = ():void => { // for updating the front page title container
    document.getElementById("title-container")!.style.height = `${document.getElementById("main-bg")!.getBoundingClientRect().height}px`;
    document.getElementById("title-container")!.style.width = `${document.getElementById("main-bg")!.getBoundingClientRect().width > window.innerWidth ? window.innerWidth : document.getElementById("main-bg")!.getBoundingClientRect().width}px`;
    document.getElementById("title-container")!.style.marginTop = `${document.getElementById("main-bg")!.getBoundingClientRect().y}px`;
    document.getElementById("title-container")!.style.marginLeft = `${document.getElementById("main-bg")!.getBoundingClientRect().width > window.innerWidth ? 0 : document.getElementById("main-bg")!.getBoundingClientRect().x}px`;
}

const set_flicker = async (id:string, twice:boolean, color:string, init_blink:number, time:number = 5000, deviation:number = 3000,) => {
    const flicker = (id:string, twice:boolean, color:string) => {
        document.getElementById(id)!.style.backgroundColor = "transparent";
        setTimeout(() => {
            document.getElementById(id)!.style.backgroundColor = color;
        }, Math.random() * 200 + 200);

        // if blink twice, wait some time before next blink
        if(twice){
            setTimeout(() => {
                console.log("123");
                document.getElementById(id)!.style.backgroundColor = "transparent";
                setTimeout(() => {
                    document.getElementById(id)!.style.backgroundColor = color;
                }, Math.random() * 200 + 200);
            }, Math.random() * 300 + 200)
        }
    }

    setTimeout(() => flicker(id, twice, color), init_blink)

    while (true){
        await new Promise((res:callbacks) => {
            setTimeout(() => {
                flicker(id, twice, color);
                res();
            }, Math.random() * deviation + time);
        })
    }
}

const fadein_background = ():Promise<void> => {
    return new Promise((res:callbacks) => {
        anime({
            targets: "#main-bg, #glo1, #glo2",
            opacity: [0,1],
            duration: 2000,
            easing: "easeInOutQuart",
            delay: 300,
            complete: ():void => {
                // end promise when animation is complete
                res();
            }
        })
    })
}

const init_ui = async () => {
    // init size of title
    update_title_container();
    await fadein_background();
    set_flicker("glo1", true, "#b91ad8", Math.random() * 700 + 500);
    set_flicker("glo2", true, "#84a4ff", Math.random() * 700 + 200, 3000, 6000)
}

window.onload = ():void => {
    init_ui();

    // update dimension for title section
    window.onresize = ():void => {
        update_title_container();
    }
}
