import Vector2 from "./Vector2.js";
/*Mesh 网格对象
*   triangles 三角形集合
*   points 所有的顶点
*
* */
export default class Mesh{
    constructor(points=[]) {
        this.points=points;
        this.triangles=[];
        this.tmpPoints=[];
        this.position=new Vector2(0,0);
        this.polys=null;
        this.update();
    }
    update(){
        this.tmpPoints=[...this.points];
        this.crtMesh(0);
    }
    crtMesh(start){
        const points=this.tmpPoints;
        const len=points.length;

        const [i0,i1,i2]=[
            start%len,
            (start+1)%len,
            (start+2)%len
        ];
        const [p0,p1,p2]=[
            points[i0],
            points[i1],
            points[i2],
        ];
        if(points.length===3){
            this.triangles.push([p0,p1,p2]);
        }else{
            const area=this.triangleArea(p0,p1,p2);
            if(area>=0||this.hasOtherPointInTriangle(p0,p1,p2)){
                //凹三角
                this.crtMesh(i1);
            }else{
                //凸三角
                this.triangles.push([p0,p1,p2]);
                points.splice(i1,1);
                this.crtMesh(i1);
            }
        }
    }
    hasOtherPointInTriangle(p0,p1,p2){
        for (let ele of this.tmpPoints){
            if(ele!==p0&&ele!==p1&&ele!==p2){
                if (ele.inTriangle(p0,p1,p2)){
                    return true;
                }
            }
        }
        return false;
    }
    triangleArea(p0,p1,p2){
        const [bx,by,cx,cy]=[
            p1.x-p0.x,
            p1.y-p0.y,
            p2.x-p0.x,
            p2.y-p0.y,
        ];
        return (bx*cy-cx*by)/2;
    }
    inMesh(v){
        const len=this.triangles.length;
        for(let ind=0;ind<len;ind++){
            const triangle=this.triangles[ind];
            if(v.inTriangle(...triangle)){
                return {ind,triangle};
            }
        }
        return null;
    }
}