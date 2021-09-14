const w : number = window.innerWidth
const h : number = window.innerHeight
const parts : number = 4 
const scGap : number = 0.04 / parts 
const strokeFactor : number = 90 
const sizeFactor : number = 13.9 
const delay : number = 20 
const backColor : string = "#BDBDBD"
const rot : number = Math.PI / 2 
const colors : Array<string> = [
    "#EF5350",
    "#4A148C",
    "#0091EA",
    "#006064",
    "#FF6D00"
] 

class ScaleUtil {
    
    static maxScale(scale : number, i : number, n : number) : number {
        return Math.max(0, scale - i / n)
    }

    static divideScale(scale : number, i : number, n : number) : number {
        return Math.min(1 / n, ScaleUtil.maxScale(scale, i, n))
    }
}