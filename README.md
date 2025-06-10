## SUDOKO SOLVER

## About this repo
A simple, interactive `Sudoku solver` built using vanilla JavaScript. It allows users to input their own Sudoku puzzle, validates entries, and solves the puzzle using a *backtracking algorithm*.

## History of sudoko
Sudoku is a logic-based number-placement puzzle. 
The modern version was popularized in Japan in the 1980s (the name “Sudoku” is short for a phrase meaning “single number”) and 
French newspapers featured similar puzzles in the 19th century, and the modern form of the puzzle first appeared in 1979 puzzle books by Dell Magazines under the name Number Place.
The classic 9x9 Sudoku board requires each row, column, and 3x3 sub-grid to contain all digits from 1 to 9 exactly once.

## DEMO

#### Web page
<img src="https://github.com/user-attachments/assets/1917ac15-9655-40af-88a3-c431becd9c48" width="700"/>  
<img src="https://github.com/user-attachments/assets/47c1f9b2-253e-47bf-98b0-8b2d940d6bd4" width="700"/>  

#### Error handling
<img src="https://github.com/user-attachments/assets/0e505096-b4e6-4bff-8e3b-d9b53acad10c" width="700"/>  

#### Reference and proof  
<img src="https://github.com/user-attachments/assets/c295b157-76dd-4928-945b-083fd208848a" width="300"/>  
<img src="https://github.com/user-attachments/assets/a25a95a7-ba90-4809-936b-11649061b5e3" width="300" height="500"/>  




## Working
- ***STEP-1***:Select the tile you want to place the number.
- ***STEP-2***:Select the number you want to choose/also you can delete the selected cell.
- similarly populate the grid as per your problem.

## Features
- Backtracking algorithm to solve the given sudoko
- Clear and reset button.
    - `clear buttons` clears the selected tile
    - `reset button` clears the board.
- Validates error when it violates sudoko rules.

## why this repo?
- wanna revise backtracking
- warming up hcj and python
- ofc for fun

## REPO structure

```
.
├── PROTOTYPE
│   ├── JS
│   │   ├── data.json
│   │   └── solver.js
│   └── PYTHON
│       ├── solver.ipynb
│       └── sudoko.csv
├── index.html
├── script.js
└── style.css
```
- `PROTOTYPE` directory has `JS,Py` in which I have wrote the base backtracking algorithm and tested with *json,csv*
- `script.js` contains the main logic for `indx.html` handling.

## Sudoku Rules
Sudoku is played on a 9×9 grid, divided into nine 3×3 subgrids (also called "boxes" or "regions"). The objective is to fill the grid so that:
- Each row must contain all digits from 1 to 9, with no repetition.
- Each column must also contain all digits from 1 to 9, with no repetition.
- Each 3×3 subgrid must contain all digits from 1 to 9, with no repetition.
