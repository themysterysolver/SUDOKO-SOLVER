var selectedTile=null;

//CLASS SUDOKO 
class sudoko{
    constructor(questions=""){
        this.rHash=Array.from({length:9},()=>new Set());
        this.cHash=Array.from({length:9},()=>new Set());
        this.boxHash=Array.from({length:9},()=>new Set());

        this.question=questions;
        //this.solution=solution;
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
        //const ans=this.solution;
        const finalAns=this.boardToString(mat);
        return mat;
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

        this.val="0"; //all tiles are initially 0 I mean,strings!

        this.element.innerHTML=(this.val!=="0")?this.val:"";

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
    constructor(id){ //integer
        this.id=id+1; //this stores integer
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
                    selectedTile.val="0";
                }
            });
        }else{
            this.element.addEventListener("click",()=>{
                console.log("CLICKED",this.id);
                if(selectedTile){
                    selectedTile.element.innerHTML=this.id;
                    selectedTile.val=this.id.toString()
                }
            });
        }
    }
}

let board=document.getElementById('board');

//array to chnage div elements
//tiles defiend!
const grid=Array.from({length:9},()=>new Array(9)); 

//populating the grid with tile
for(let i=0;i<9;i++){
    for(let j=0;j<9;j++){
        grid[i][j]=new Tile(i,j);
        board.appendChild(grid[i][j].element);
    }
}

// function clear(){
//     for(let i=0;i<9;i++){
//         for(let j=0;j<9;j++){
//             grid[i][j].val="";
//             grid[i][j].element.innerHTML="";
//             if(grid[i][j].element.classList.contains("OG-clrs")){
//                 grid[i][j].element.classList.remove("OG-clrs");
//             }   
//         }
//     }
//     if (selectedTile) {
//         selectedTile.element.classList.remove("selected");
//         selectedTile = null;
//     }
//     numb.style.display="block";
// }

//CLEAR BUTTON
let clear=(()=>{window.location.reload()})
document.getElementById("reset").addEventListener("click",()=>{clear();console.log("RESETTED!")});

//querying and populatting
let num=document.getElementById('numbers');
let buttons=Array(10);
for(let i=0;i<10;i++){
    buttons[i]=new numbers(i);
    num.appendChild(buttons[i].element);
}

function display(mat){
    for(let i=0;i<9;i++){
        for(let j=0;j<9;j++){
            grid[i][j].element.innerHTML=mat[i][j];
        }
    }
}

let numb=document.getElementById("numbers");

function consoleDisplay(mat){
    console.log(mat);
}
document.getElementById("submit").addEventListener("click",()=>{
    let boardString=grid.map(row=>row.map(cell=>{
        const val=cell.val;
        return (val===""||val=="0")?"0":val;
    }).join("")).join("");

    console.log(boardString);

    //colouring 'em with OG given colours
    grid.forEach((val)=>val.forEach((el)=>{
        const val=el.element.innerHTML.trim();
        if(val!==""){
            el.element.classList.add("OG-clrs");
        }
    }))

    let SUDOKO=new sudoko(boardString);
    const solved = SUDOKO.solveIt();
    console.log(solved);

    consoleDisplay(solved);

    //actual display (painting the board)
    display(solved);

    numb.style.display="none";
});
