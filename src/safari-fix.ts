export const fix_safari_display = ():boolean => {
    const is_safari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    if(!is_safari) return false;

    // for safari, remove all parallax gap elements
    document.querySelectorAll(".no-safari-display")!.forEach((e):void => {
        const ele = <HTMLElement> e;
        ele.style.display = "none";
        e = ele;
    })
    return true;
}