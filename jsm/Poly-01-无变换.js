import Vector2 from "./Vector2.js";

/*Poly 多边形
*   close 是否闭合
*   fill 是否填充
*   stroke 是否描边
*   shadow 是否投影
*   vertices 顶点集合
* */
export default class Poly{
    constructor(param={}){
        const {
            close=false,
            fill=false,
            stroke=false,
            shadow=false,
            vertices=[],

            fillStyle='#000',
            strokeStyle='#000',
            lineWidth=1,
            dash=[],
            lineCap='butt',
            lineJoin='miter',
            miterLimit=10,
            shadowColor='rgba(0,0,0,0)',
            shadowBlur=0,
            shadowOffsetX=0,
            shadowOffsetY=0,

            crtPath=crtLinePath,
            pos=new Vector2(0,0)

        }=param;

        this.close=close;
        this.fill=fill;
        this.stroke=stroke;
        this.vertices=vertices;

        this.fillStyle=fillStyle;
        this.strokeStyle=strokeStyle;
        this.lineWidth=lineWidth;
        this.dash=dash;
        this.lineCap=lineCap;
        this.lineJoin=lineJoin;
        this.miterLimit=miterLimit;
        this.shadowColor=shadowColor;
        this.shadowBlur=shadowBlur;
        this.shadowOffsetX=shadowOffsetX;
        this.shadowOffsetY=shadowOffsetY;

        this.crtPath=crtPath;
        this.pos=pos;
    }
    draw(ctx){
        const {
            shadow,shadowColor,shadowBlur,shadowOffsetX,shadowOffsetY,
            stroke,close,strokeStyle,lineWidth,lineCap,lineJoin,miterLimit,
            fill,fillStyle,
            pos:{x,y}
        }=this;
        ctx.save();

        /*投影*/
        if(shadow){
            ctx.shadowColor=shadowColor;
            ctx.shadowBlur=shadowBlur;
            ctx.shadowOffsetX=shadowOffsetX;
            ctx.shadowOffsetY=shadowOffsetY;
        }

        this.crtPath(ctx);

        /*描边*/
        if(stroke){
            ctx.strokeStyle=strokeStyle;
            ctx.lineWidth=lineWidth;
            ctx.lineCap=lineCap;
            ctx.lineJoin=lineJoin;
            ctx.miterLimit=miterLimit;
            close&&ctx.closePath();
            ctx.stroke();
        }

        /*投影*/
        if(fill){
            ctx.fillStyle=fillStyle;
            ctx.fill();
        }

        ctx.restore();
    }
    /*crtPath(ctx){
        const {vertices}=this;
        /!*连点成线*!/
        ctx.beginPath();
        ctx.moveTo(vertices[0].x,vertices[0].y);
        const len=vertices.length;
        for(let i=1;i<len;i++){
            ctx.lineTo(vertices[i].x,vertices[i].y);
        }
    }*/
    checkPointInPath(ctx,{x,y}){
        this.crtPath(ctx);
        const bool=ctx.isPointInPath(x,y);
    }
}
/*绘制多边形*/
function crtLinePath(ctx){
    const {vertices}=this;
    /*连点成线*/
    ctx.beginPath();
    ctx.moveTo(vertices[0].x,vertices[0].y);
    const len=vertices.length;
    for(let i=1;i<len;i++){
        ctx.lineTo(vertices[i].x,vertices[i].y);
    }
}