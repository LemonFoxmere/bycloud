import { callbacks } from "./app";

export interface trigger_element{ // this is for a single element update
    scroll_past:callbacks
    scroll_back:callbacks
};

export interface trigger_event_map{ // this is for a trigger update
    trig_id:string,
    target_trig_id:string,
    elements:trigger_element[],
    passed:boolean,
    passed2:boolean,
};

let trig_elements:trigger_event_map[] = [];

export const add_trigger_listener = (trig_id:string, target_trig_id:string, elements:trigger_element[], passed:boolean=false, passed2:boolean=false):void => {
    trig_elements.push({
        trig_id,
        target_trig_id,
        elements,
        passed,
        passed2,
    });
}

export const update_trigger_listener = ():void => {
    for(let i = 0; i < trig_elements.length; i++){
        let trig_id:string= trig_elements[i].trig_id;
        let target_trig_id:string = trig_elements[i].target_trig_id;
        let elements:trigger_element[] = trig_elements[i].elements;

        // update trigger status
        trig_elements[i].passed = document.getElementById(trig_id)!.getBoundingClientRect().y < document.getElementById(target_trig_id)!.getBoundingClientRect().y;
        
        // if the trigger is passed, update check if the passed has been assigned to true yet
        if(trig_elements[i].passed){
            // if it has, check if the passed 2 has been passed yet
            if(!trig_elements[i].passed2){
                // if it hasn't, execute trigger code

                for(let j = 0; j < elements.length; j++){
                    elements[j].scroll_past();
                }

                trig_elements[i].passed2 = trig_elements[i].passed; // reset passed 2
                continue;
            } else continue; // if it has passed, do not execute callbacks again
        } else {
            // if it hasn't, check if the passed 2 has been passed yet
            if(trig_elements[i].passed2){
                // if it hasn, execute trigger code (for return)

                for(let j = 0; j < elements.length; j++){
                    elements[j].scroll_back();
                }
                
                trig_elements[i].passed2 = trig_elements[i].passed; // reset passed 2
                continue;
            } else continue; // if it hasn't passed, do not execute callbacks again
        }

        // request frame update
        requestAnimationFrame(() => {});
    }
}