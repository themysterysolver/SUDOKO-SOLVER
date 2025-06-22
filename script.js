var selectedTile=null;
var error=false;
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
    isValid=(ch)=>{
        let x=selectedTile.x;
        let y=selectedTile.y;
        let bIdx=Math.floor(x/3)*3+Math.floor(y/3);
        return !(this.rHash[x].has(ch) || this.cHash[y].has(ch) || this.boxHash[bIdx].has(ch))
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

function checker(character){
    let boardString=grid.map(row=>row.map(cell=>{
        const val=cell.val;
        return (val===""||val=="0")?"0":val;
    }).join("")).join("");
    let SUDOKO=new sudoko(boardString);

    const mat = SUDOKO.stringToMatrix(boardString);
    for(let i = 0; i < 9; i++){
        for(let j = 0; j < 9; j++){
            const val = mat[i][j];
            if(val !== "0"){
                SUDOKO.rHash[i].add(val);
                SUDOKO.cHash[j].add(val);
                SUDOKO.boxHash[Math.floor(i/3)*3 + Math.floor(j/3)].add(val);
            }
        }
    }

    return SUDOKO.isValid(character);
}

function toggleClick(targetTile){
    if(selectedTile) selectedTile.element.classList.remove("selected");
    selectedTile=targetTile;
    targetTile.element.classList.add("selected");
}

const cellSize=45;
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

        this.element.addEventListener("click", () => toggleClick(this));
        if(r%3===0) this.element.classList.add("thick-top");
        if(c%3===0) this.element.classList.add("thick-left");
        if(r===8) this.element.classList.add("thick-btm");
        if(c===8) this.element.classList.add("thick-right");
    }    
}

function enterNumber(enteredNumber){
    console.log("CLICKED",enteredNumber);
    if(selectedTile){

        selectedTile.element.innerHTML=enteredNumber;
        selectedTile.val=enteredNumber.toString();

        if(!isFullBoardError()){
            sub.style.display="none";
            error=true;
            showError();
        }else{
            sub.style.display="block";
            clearError();
            if(error){
                clearError();
                error=false;
            }
        }

    }
}

function clearNumber(){
    console.log("CLEAR CLICKED!!");
    if(selectedTile){
        selectedTile.element.innerHTML="";
        selectedTile.val="0";

        if(isFullBoardError()){ //if no error return True
            sub.style.display="block";
            error=false;
            clearError();
        }else{
            //make board normal!
            showError();
            error=true;
        }
    }
}

var sub=document.getElementById('submit');
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
            this.element.addEventListener("click",()=>clearNumber());
        }else{
            this.element.addEventListener("click",()=>enterNumber(this.id));
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

function submit(){
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
}

document.addEventListener("keydown", (e) => {
    function moveSelection(deltaX, deltaY){
        let x = selectedTile.x, 
            y = selectedTile.y;
        x += deltaX;
        y += deltaY;
        if(x < 0 || x >= 9 || y < 0 || y >= 9)
            return selectedTile;
        else
            return grid[x][y];
    }
    let target;
    if(!selectedTile){
        target = grid[0][0];
    }else{
        switch(e.key){
            case "ArrowLeft": 
                target = moveSelection(0, -1);
                break;
            case "ArrowDown": 
                target = moveSelection(1, 0);
                break;
            case "ArrowUp": 
                target = moveSelection(-1, 0);
                break;
            case "ArrowRight": 
                target = moveSelection(0, 1);
                break;
            case "1":
            case "2":
            case "3":
            case "4":
            case "5":
            case "6":
            case "7":
            case "8":
            case "9":
                enterNumber(e.key);
                return;
            case "Enter":
                if(!error) submit();
                return;
            case "Backspace":
                clearNumber();
                return;
            default:
                return;
        }
    }
    toggleClick(target);
})

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
document.getElementById("submit").addEventListener("click",()=>submit());


function isFullBoardError(){
    let boardString=grid.map(row=>row.map(cell=>{
        const val=cell.val;
        return (val===""||val=="0")?"0":val;
    }).join("")).join("");
    let SUDOKO=new sudoko(boardString);

    const mat = SUDOKO.stringToMatrix(boardString);
    for(let i = 0; i < 9; i++){
        for(let j = 0; j < 9; j++){
            const val = mat[i][j];
            if(val !== "0"){
                if(SUDOKO.rHash[i].has(val)||SUDOKO.cHash[j].has(val)||SUDOKO.boxHash[Math.floor(i/3)*3 + Math.floor(j/3)].has(val)){
                    return false
                }
                else{
                    SUDOKO.rHash[i].add(val);
                    SUDOKO.cHash[j].add(val);
                    SUDOKO.boxHash[Math.floor(i/3)*3 + Math.floor(j/3)].add(val);
                }
            }
        }  
    }
    return true;
}

function clearError(){
    let theBoard=grid;
    for(let i=0;i<9;i++){
        for(let j=0;j<9;j++){
            if(theBoard[i][j].element.classList.contains("alert-it")){
                theBoard[i][j].element.classList.remove("alert-it")
            }
        }
    }
}

function showError(){
    clearError();

    let boardString=grid.map(row=>row.map(cell=>{
        const val=cell.val;
        return (val===""||val=="0")?"0":val;
    }).join("")).join("");
    let SUDOKO=new sudoko(boardString);

    const mat = SUDOKO.stringToMatrix(boardString);
    // for(let i = 0; i < 9; i++) {
    //     for(let j = 0; j < 9; j++) {
    //         const val = mat[i][j];
    //         if(val !== "0") {
    //             SUDOKO.rHash[i].add(val);
    //             SUDOKO.cHash[j].add(val);
    //             SUDOKO.boxHash[Math.floor(i/3)*3 + Math.floor(j/3)].add(val);
    //         }
    //     }
    // }

    for(let i = 0; i < 9; i++){
        for(let j = 0; j < 9; j++){
            const val = mat[i][j];
            if(val !== "0"){
                if(SUDOKO.rHash[i].has(val)){//||SUDOKO.cHash[j].has(val)||SUDOKO.boxHash[Math.floor(i/3)*3 + Math.floor(j/3)].has(val)){
                    for(let k=0;k<9;k++){
                        grid[i][k].element.classList.add("alert-it");
                    }
                }
                if(SUDOKO.cHash[j].has(val)){
                    for(let k=0;k<9;k++){
                        grid[k][j].element.classList.add("alert-it");
                    }
                }
                if(SUDOKO.boxHash[Math.floor(i/3)*3 + Math.floor(j/3)].has(val)){
                    const startRow=Math.floor(i/3)*3;
                    const startCol=Math.floor(j/3)*3;
                    for (let r=startRow; r<startRow+3; r++) {
                        for (let c=startCol; c<startCol+3; c++) {
                            grid[r][c].element.classList.add("alert-it");
                        }
                    }
                }
                SUDOKO.rHash[i].add(val);
                SUDOKO.cHash[j].add(val);
                SUDOKO.boxHash[Math.floor(i/3)*3 + Math.floor(j/3)].add(val);
                
            }
        }  
    }
}