var selectedTile=null;

class sudoko{
    constructor(questions,solution){
        this.rHash=Array.from({length:9},()=>new Set());
        this.cHash=Array.from({length:9},()=>new Set());
        this.boxHash=Array.from({length:9},()=>new Set());

        this.question=questions;
        this.solution=solution;
    }
    display=(mat)=>{
        mat.array.forEach(element => {
            console.log(element);
        });
        console.log('---------------')
    }

    boardToString=((mat)=>{return mat.map(row=>row.join("")).join("")})

    stringToMatrix=((s)=>{
        const mat=[]
        for(let i=0;i<81;i+=9){
            mat.push(s.slice(i,i+9).split(""));
        }
        return mat;
    })

    backtrack(r,c,board){
        if(r==9) return true;
        if(c==9) return this.backtrack(r+1,0,board);
        if(board[r][c]!=="0") return this.backtrack(r,c+1,board);

        for(let i=1;i<10;i++){
            const val=i.toString();
            const boxIdx=Math.floor(r/3)*3+Math.floor(c/3);
            if(!this.rHash[r].has(val) && !this.cHash[c].has(val) && !this.boxHash[boxIdx].has(val)){
                board[r][c]=val;
                this.rHash[r].add(val);
                this.cHash[c].add(val);
                this.boxHash[boxIdx].add(val);

                if(this.backtrack(r,c+1,board))return true;

                this.rHash[r].delete(val);
                this.cHash[c].delete(val);
                this.boxHash[boxIdx].delete(val);
                board[r][c]="0"
            }
        }
        return false;
    }

    solveIt(){
        const mat=this.stringToMatrix(this.question);
        for(let i=0;i<9;i++){
            for(let j=0;j<9;j++){
                if(mat[i][j]!=="0"){
                    this.rHash[i].add(mat[i][j]);
                    this.cHash[j].add(mat[i][j]);
                    this.boxHash[Math.floor(i/3)*3+Math.floor(j/3)].add(mat[i][j]);
                }
            }
        }
        this.backtrack(0,0,mat);
        const ans=this.solution;
        const finalAns=this.boardToString(mat);
        return ans===finalAns;
    }
}

// const fs=require('fs')
// const data=fs.readFileSync('data.json');
// const json=JSON.parse(data);

// for(const [question,solution] of Object.entries(json)){
//     console.log(new sudoko(question,solution).solveIt());
// }

const cellSize=30;
class Tile{
    constructor(r,c){
        this.x=r;
        this.y=c;
        this.element=document.createElement('div');
        this.element.id=r*9+c;
        this.element.style.width=cellSize+"px";
        this.element.style.height=cellSize+"px";
        this.element.classList.add("cell")
        this.val="";
        this.element.innerHTML=this.val!==""||this.val!=="0"?this.val:"";

        this.element.addEventListener("click",()=>{
            if(selectedTile) selectedTile.element.classList.remove("selected");
            selectedTile=this;
            this.element.classList.add("selected");
        });

        if(r%3===0) this.element.classList.add("thick-top");
        if(c%3===0) this.element.classList.add("thick-left");
        if(r===8) this.element.classList.add("thick-btm");
        if(c===8) this.element.classList.add("thick-right");
    }    
}

class numbers{
    constructor(id){
        this.id=id+1;
        this.element=document.createElement('div');
         this.element.style.width=cellSize+"px";
        this.element.style.height=cellSize+"px";
        this.element.classList.add("numss")
        this.element.id=this.id.toString();
        this.element.innerHTML=id!==9?this.id:"CLEAR";
        if(id===9){
            this.element.style.width=70+"px";
            this.element.addEventListener("click",()=>{
                console.log("CLEAR CLICKED!!");
                if(selectedTile){
                    selectedTile.element.innerHTML="";
                }
            });
        }else{
            this.element.addEventListener("click",()=>{
                console.log("CLICKED",this.id);
                if(selectedTile){
                    selectedTile.element.innerHTML=this.id;
                }
            });
        }
    }
}

let board=document.getElementById('board');
const grid=Array.from({length:9},()=>new Array(9));
for(let i=0;i<9;i++){
    for(let j=0;j<9;j++){
        grid[i][j]=new Tile(i,j);
        board.appendChild(grid[i][j].element);
    }
}
function clear(){
    for(let i=0;i<9;i++){
        for(let j=0;j<9;j++){
            grid[i][j].element.val="";
            grid[i][j].element.innerHTML="";
        }
    }
    selectedTile=null;
}
document.getElementById("reset").addEventListener("click",()=>{clear();console.log("RESETTED!")});

let num=document.getElementById('numbers');
let buttons=Array(10);
for(let i=0;i<10;i++){
    buttons[i]=new numbers(i);
    num.appendChild(buttons[i].element);
}

document.querySelector('numss');
