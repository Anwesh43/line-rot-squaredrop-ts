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

class DrawingUtil {
    
    static drawLine(context : CanvasRenderingContext2D, x1 : number, y1 : number, x2 : number, y2 : number) {
        context.beginPath()
        context.moveTo(x1, y1)
        context.lineTo(x2, y2)
        context.stroke()
    }

    static drawLineRotToSquareDrop(context : CanvasRenderingContext2D, scale : number) {
        const size : number = Math.min(w, h) / sizeFactor 
        const sc1 : number = ScaleUtil.divideScale(scale, 0, parts)
        const sc2 : number = ScaleUtil.divideScale(scale, 1, parts)
        const sc3 : number = ScaleUtil.divideScale(scale, 2 ,parts)
        const sc4 : number = ScaleUtil.divideScale(scale, 3, parts)
        const rSize : number = size * Math.floor(sc1)
        context.save()
        context.translate(w / 2, h / 2 + (h * 0.5 - size / 2) * sc4)
        context.save()
        context.translate(0, h * 0.5 * (1 - sc1) + size * 0.5 * sc3)
        
        for (var j = 0; j < 2; j++) {
           context.save()
           context.rotate(rot * sc2 * (1 - 2 * j))
           DrawingUtil.drawLine(context, 0, 0, 0, size * 0.5)
           context.restore() 
        }
        context.restore()
        context.fillRect(-rSize / 2, -size * 0.5 * sc3, rSize, size * sc3)
        context.restore()
    }

    static drawLRTSDNode(context : CanvasRenderingContext2D, i : number, scale : number) {
        context.lineCap = 'round'
        context.lineWidth = Math.min(w, h) / strokeFactor 
        context.strokeStyle = colors[i]
        context.fillStyle = colors[i]
        DrawingUtil.drawLineRotToSquareDrop(context, scale)
    }
}

class Stage {

    canvas : HTMLCanvasElement = document.createElement('canvas')
    context : CanvasRenderingContext2D 

    initCanvas() {
        this.canvas.width = w 
        this.canvas.height = h 
        this.context = this.canvas.getContext('2d')
        document.body.appendChild(this.canvas)
    }

    render() {
        this.context.fillStyle = backColor 
        this.context.fillRect(0, 0, w, h)
    }

    handleTap() {
        this.canvas.onmousedown = () => {

        }
    }

    static init() {
        const stage : Stage = new Stage()
        stage.initCanvas()
        stage.render()
        stage.handleTap()
    }
}