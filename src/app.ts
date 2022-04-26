import anime from "animejs";
import {
    update_title_container,
    update_bg_container,
    set_flicker,
    fadein_background,
    add_element_parallax,
    update_parallax,
} from "./ui-init";
import {
    add_trigger_listener,
    update_trigger_listener,
    trigger_element
} from "./trig-handler";

export type callbacks = (content?: any) => any;

const init_ui = async () => {    
    // init size of title
    update_bg_container();
    update_title_container();
    
    // add window scroll events
    add_element_parallax("bg-container", 0.4);
    add_element_parallax("main-bg", 0.4);
    add_element_parallax("glo2", -0.02, "-2rem");
    add_element_parallax("glo1", -0.1);

    // add triggers
    add_trigger_listener("trig-1", "trig-alpha", [
        { // show titles
            scroll_past:():void => {
                document.getElementById("about-content")!.classList.remove("disable-hidden");
                document.getElementById("title-text-container")!.classList.add("disable-hidden");
            },
            scroll_back: ():void => {
                document.getElementById("about-content")!.classList.add("disable-hidden");
                document.getElementById("title-text-container")!.classList.remove("disable-hidden");
            }
        },
    ])
    add_trigger_listener("trig-2", "trig-alpha", [ // reveals the page subtitle
        { // show titles
            scroll_past:():void => {
                document.getElementById("page-subtitle")!.classList.remove("disable-hidden");
            },
            scroll_back: ():void => {}
        },
    ])
    add_trigger_listener("trig-2", "trig-beta", [ // reveals the page subtitle
        { // show titles
            scroll_past:():void => {
                document.getElementById("title-theory")!.style.color = "#363636";
                document.getElementById("title-reality")!.style.color = "#f3f3f3";
            },
            scroll_back: ():void => {
                document.getElementById("title-theory")!.style.color = "#f3f3f3";
                document.getElementById("title-reality")!.style.color = "#363636";
            }
        },
    ])

    await fadein_background();
    set_flicker("glo1", true, "#b91ad8", Math.random() * 700 + 500);
    set_flicker("glo2", true, "#84a4ff", Math.random() * 700 + 200, 3000, 6000)

}

window.onload = ():void => {
    // set scroll animations
    init_ui();
    update_parallax();
    update_trigger_listener();

    document.getElementById("main-page")!.onscroll = (evt):void => {
        update_parallax();

        // update trigger listeners
        update_trigger_listener();

        // request frame update
        requestAnimationFrame(() => {});
    }

    // update dimension for title section
    window.onresize = ():void => {
        update_bg_container();
        update_title_container();

        // request frame update
        requestAnimationFrame(() => {});
    }
}
