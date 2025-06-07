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

const fs=require('fs')
const data=fs.readFileSync('data.json');
const json=JSON.parse(data);

for(const [question,solution] of Object.entries(json)){
    console.log(new sudoko(question,solution).solveIt());
}