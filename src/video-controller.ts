import { callbacks } from "./app";
import { add_trigger_listener } from "./trig-handler";

export const load_video = async (video_id:string, src:string, trig_id:string, trigend_id:string, pause:boolean=false) => {
    const ele:HTMLVideoElement = <HTMLVideoElement> document.getElementById(video_id)!;
    if(!ele) return; // return if no values

    ele.src = src;
    ele.load();
    if(pause) ele.pause();

    // add automatic pausing & playing
    add_trigger_listener(trig_id, "trig-theta", [ // stop parallax for vid
        { // show titles
            scroll_past: ():void => { (<HTMLVideoElement> document.getElementById(video_id)!).play(); },
            scroll_back: ():void => { (<HTMLVideoElement> document.getElementById(video_id)!).pause(); }
        },
    ])
    add_trigger_listener(trigend_id, "trig-omega", [ // stop parallax for vid
        { // show titles
            scroll_past: ():void => { (<HTMLVideoElement> document.getElementById(video_id)!).pause(); },
            scroll_back: ():void => { (<HTMLVideoElement> document.getElementById(video_id)!).play(); }
        },
    ])
}

export const add_video_control_elements = (id:string):void => {
    const ctrl:HTMLImageElement = <HTMLImageElement> document.getElementById(id)!;
    if(!ctrl) return; // stop function if element doesnt exist

    const vid_id:string = ctrl.getAttribute("ctrl-video-id")!;
    const vid_elmnt:HTMLVideoElement = <HTMLVideoElement> document.getElementById(vid_id)!;
    if(!vid_elmnt) return; // stop function if element doesnt exist

    // start adding in event listeners and states
    let paused:boolean = false;
    
    ctrl.addEventListener("mouseenter", ():void => { // user hover into the button
        ctrl.src = paused ? "./assets/img/vec/play-hr.svg" : "./assets/img/vec/pause-hr.svg"; // change hover image based on state
    });
    ctrl.addEventListener("mouseleave", ():void => { // user hover out of the button
        ctrl.src = paused ? "./assets/img/vec/play-nm.svg" : "./assets/img/vec/pause-nm.svg"; // change hoverout image based on state
    });
    ctrl.addEventListener("click", ():void => { // user clicks to pause or play the video
        paused = !paused; // flip state
        ctrl.src = paused ? "./assets/img/vec/play-hr.svg" : "./assets/img/vec/pause-hr.svg"; // change hoverout image based on state
        requestAnimationFrame(() => {});
    
        // actually pause the video
        if(paused) vid_elmnt.pause();
        else vid_elmnt.play();
    });
    vid_elmnt.addEventListener("play", ()=>{
        paused = false;
        ctrl.src = paused ? "./assets/img/vec/play-nm.svg" : "./assets/img/vec/pause-nm.svg"; // change hoverout image based on state
        requestAnimationFrame(() => {});
    });
    vid_elmnt.addEventListener("pause", ()=>{
        paused = true;
        ctrl.src = paused ? "./assets/img/vec/play-nm.svg" : "./assets/img/vec/pause-nm.svg"; // change hoverout image based on state
        requestAnimationFrame(() => {});
    });
}