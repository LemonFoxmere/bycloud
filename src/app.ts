import anime from "animejs";
import {
    update_title_container,
    update_bg_container,
    set_flicker,
    fadein_background,
    add_element_parallax,
    set_element_parallax,
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
    add_element_parallax("bg-container", 0.4); // 0
    add_element_parallax("main-bg", 0.4); // 1
    add_element_parallax("glo2", -0.02, "-2rem"); // 2
    add_element_parallax("glo1", -0.1); // 3

    const vid_title_paraspeed:number = -0.7;
    let vid_title_topoffset:number = 0;
    add_element_parallax("vid-sec-title-container", 0); // 4


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
                document.getElementById("title-theory")!.style.color = "#363636";
                document.getElementById("title-reality")!.style.color = "#f3f3f3";
            },
            scroll_back: ():void => {
                document.getElementById("title-theory")!.style.color = "#f3f3f3";
                document.getElementById("title-reality")!.style.color = "#363636";
            }
        },
    ])
    add_trigger_listener("trig-2", "trig-beta", [ // reveals the video title
        { // show titles
            scroll_past:():void => {
                document.getElementById("vid-sep")!.classList.remove("disable-hidden");
                document.getElementById("vid-section")!.classList.remove("disable-hidden");
                setTimeout(():void => {
                    document.getElementById("vid-sec-title")!.style.letterSpacing = "1pt";
                }, 150)
            },
            scroll_back: ():void => {}
        },
    ])

    add_trigger_listener("trig-3", "trig-alpha", [ // update the parallax for vid when scroll up
        { // show titles
            scroll_past:():void => {
                // update parallax offset
                vid_title_topoffset = document.getElementById("main-page")!.scrollTop * vid_title_paraspeed -
                    (document.getElementById("trig-alpha")!.getBoundingClientRect().y -
                    document.getElementById("trig-3")!.getBoundingClientRect().y)*vid_title_paraspeed // what the fuck?

                set_element_parallax(4, vid_title_paraspeed, `${vid_title_topoffset}px`);
            },
            scroll_back: ():void => {
                set_element_parallax(4, 0);
            }
        },
    ])
    add_trigger_listener("trig-4", "trig-beta", [ // stop parallax for vid
        { // show titles
            scroll_past:():void => {
                document.getElementById("vid-sec-title-container")!.classList.add("disable-hidden");
            },
            scroll_back: ():void => {
                document.getElementById("vid-sec-title-container")!.classList.remove("disable-hidden");
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
    update_trigger_listener();
    update_parallax();

    document.getElementById("main-page")!.onscroll = (evt):void => {
        // update trigger listeners
        update_trigger_listener();
        update_parallax();
    }

    // update dimension for title section
    window.onresize = ():void => {
        update_bg_container();
        update_title_container();

        // update trigger listeners
        update_trigger_listener();

        update_parallax();

        // request frame update
        requestAnimationFrame(() => {});
    }
}
