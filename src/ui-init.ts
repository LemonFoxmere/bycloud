import anime from "animejs";
import { callbacks } from "./app";

interface parallax_hmap{
    id:string,
    speed:number,
    offset?:string
}

// update title container
export const update_title_container = (update_height:boolean=true):void => { // for updating the front page title container
    document.getElementById("title-container")!.style.height = `${document.getElementById("main-bg")!.getBoundingClientRect().height}px`;
    document.getElementById("title-container")!.style.width = `${document.getElementById("main-bg")!.getBoundingClientRect().width > window.innerWidth ? window.innerWidth : document.getElementById("main-bg")!.getBoundingClientRect().width}px`;
    document.getElementById("title-container")!.style.marginLeft = `${document.getElementById("main-bg")!.getBoundingClientRect().width > window.innerWidth ? 0 : document.getElementById("main-bg")!.getBoundingClientRect().x}px`;

    // update spacer height
    document.getElementById("title-spacer")!.style.height = `${(window.innerHeight - document.getElementById("main-bg")!.getBoundingClientRect().height) / 2}px`;
}

// update background container of image
export const update_bg_container = ():void => { // for updating the front page title container
    document.getElementById("bg-container")!.style.height = `${document.getElementById("main-bg")!.getBoundingClientRect().height}px`;
    document.getElementById("bg-container")!.style.width = `${document.getElementById("main-bg")!.getBoundingClientRect().width}px`;
    // document.getElementById("bg-container")!.style.top = `${document.getElementById("main-bg")!.getBoundingClientRect().y}px`;
    document.getElementById("bg-container")!.style.left = `${document.getElementById("main-bg")!.getBoundingClientRect().width > window.innerWidth ? 0 : document.getElementById("main-bg")!.getBoundingClientRect().x}px`;
}

// flicker an element
export const set_flicker = async (id:string, twice:boolean, color:string, init_blink:number, time:number = 5000, deviation:number = 3000,) => {
    const flicker = (id:string, twice:boolean, color:string) => {
        document.getElementById(id)!.style.backgroundColor = "transparent";
        setTimeout(() => {
            document.getElementById(id)!.style.backgroundColor = color;
        }, Math.random() * 200 + 200);

        // if blink twice, wait some time before next blink
        if(twice){
            setTimeout(() => {
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

// background fadein
export const fadein_background = ():Promise<void> => {
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

let parallax_elements:parallax_hmap[]=[];

// set a parallax
export const add_element_parallax = (id:string, speed:number, offset:string="0px"):void => {
    parallax_elements.push({id, speed, offset})
}
export const set_element_parallax = (index:number, speed:number, offset:string="0px"):void => {
    parallax_elements[index].speed = speed; 
    parallax_elements[index].offset = offset;
}

// start parallax
export const update_parallax = ():void => {
    for(let i = 0; i < parallax_elements.length; i++){
        let ele = document.getElementById!(parallax_elements[i].id);
        if(!ele) continue; // if the element is null, continue to next element
        let speed = parallax_elements[i].speed;
        let offset = parallax_elements[i].offset;
        
        ele.style.transform = `translateY(calc(${offset} + calc(-1 * ${document.getElementById("main-page")!.scrollTop * speed}px)))`;
        
        // request frame update
        requestAnimationFrame(() => {});
    }
}