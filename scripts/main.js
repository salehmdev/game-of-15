// Created 10/28/2016

var boardTiles = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, " "];
var totalMoves = 0;
var emptyTileRow = 4; // Used to keep track of empty tile
var emptyTileCol = 4;
var timer = 0;
var totalSeconds = 0;

function Shuffle(){
	// Resets the array for making new table
	boardTiles = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, " "];
	var tempNum = 0;
	var x = 0;
	clearInterval(timer); // resets timer
	
	// Shuffles the array randomly
    for (var i = boardTiles.length; i > 0; i--) {
        tempNum = Math.floor(Math.random() * i);
        x = boardTiles[i - 1];
        boardTiles[i - 1] = boardTiles[tempNum];
        boardTiles[tempNum] = x;
    }    
    
    document.getElementById("message-to-user").innerHTML = " ";
    totalMoves = 0; // Resets if game is shuffled
	SetTable();
}

function SetTable(){
	// Placing values into table
    var tempNum = 0;
	for(var i = 1; i < 5; i++){
		for(var j = 1; j < 5; j++){
		document.getElementById("row" + i + "col" + j).innerHTML = boardTiles[tempNum];
		if (boardTiles[tempNum] == " "){
			// Empty cell index stored
			emptyTileRow = i;
			emptyTileCol = j;
		}
		tempNum++;
		}
	}// End for loops
	
	clearTimeout(timer);
	totalSeconds = 0;
	timer = setInterval(CountTimer, 1000);
	document.getElementById("number-of-moves").innerHTML = "0";
	document.getElementById("time").innerHTML = "0:0:0";
	document.getElementById("message-to-user").innerHTML = "One of the slots is empty. The other slots are occupied by 15 tiles," + 
															" randomly numbered from 1 through 15. Any tile next to the currently empty" + 
															" slot can be moved into the currently empty slot by clicking on the tile." +
															" The goal is to try and put the tiles in order.";
}

// Shuffles the table cells when page is loaded
window.addEventListener("load" , Shuffle, false); 

// Moves tile to empty position
function MoveTile(clickedTileId){
	var tempRow = parseInt(clickedTileId.charAt(3));
	var tempCol = parseInt(clickedTileId.charAt(7));
	if (CheckAdjacentTiles(tempRow, tempCol))
	{
		SwapTiles(clickedTileId, emptyTileRow, emptyTileCol);
	}
	else{
		alert("Only tiles next to the empty tile can be moved!");
	}
}

// Checks adjecent tiles for the empty tile
function CheckAdjacentTiles(row, col){
	var check = 0;
	// Offesets of the clicked tile. Up, down, left, and right of clicked tile is checked
	var up = row - 1;
	var right = col + 1;
	var down = row + 1;
	var left = col - 1;
	
	if(up > 0 && document.getElementById("row" + up + "col" + col).innerHTML == " ")
	{
		return true;
	} 
	
	if(right < 5 && document.getElementById("row" + row + "col" + right).innerHTML == " ")
	{
		return true;

	} 
	
	if(left > 0 && document.getElementById("row" + row + "col" + left).innerHTML == " ")
	{
		return true;

	}
	
	if(down < 5 && document.getElementById("row" + down + "col" + col).innerHTML == " ")
	{
		return true;
	}
	
	return false;	// <- Reaching here means no empty cell located adjacent to clicked tile
}

// Switches the clicked tile with the empty tile
// Input: clickedTile's Id , and the current row and col of the empty tile
function SwapTiles(clickedTile, row, col){
	var temp = document.getElementById(clickedTile).innerHTML;
	var tempIndex = 0;
	
	document.getElementById(clickedTile).innerHTML = document.getElementById("row" + row + "col" + col).innerHTML;
	document.getElementById("row" + row + "col" + col).innerHTML = temp;
	// Updates position of new empty cell by extracting row/col from clicked tile id
	emptyTileRow = parseInt(clickedTile.charAt(3)); 
	emptyTileCol = parseInt(clickedTile.charAt(7));
	
	// Update array's position of tiles
	for(var i = 1; i < 5; i++){
		for(var j = 1; j < 5; j++){
		boardTiles[tempIndex] = document.getElementById("row" + i + "col" + j).innerHTML;
		tempIndex++;
		}
	}// End for loops
	
	totalMoves++;
	UpdateMoveCounter();
	CheckForSuccess();
	
}

function CreateSimpleGame(){
	boardTiles = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, " ", 15]; // Simple game sets game up to require 1 move
	SetTable();
	totalMoves = 0; // Reset
}

function CheckForSuccess(){
	var successTilePositions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, " "];
	var check = true;
	
	for(var i = 0; i < boardTiles.length; i++)
	{
		if(boardTiles[i] != successTilePositions[i]) // Only 1 mismatch needed to confirm no success
		{
			check = false;
		}
	}
	
	if (check) // All positions in array must match to be true
	{
		clearTimeout(timer);
		totalSeconds = 0;
		clearInterval(timer);
		// Added a span element in order to give this dialog a special style
		document.getElementById("message-to-user").innerHTML = "<span id=\"success-dialog\">Congrats, you won!</span>" +
																"<br>Click \"New Game\" or \"Simple Game\" to play again.";
	}
}

function CountTimer() {
	totalSeconds++;
	var hour = Math.floor(totalSeconds /3600);
	var minute = Math.floor((totalSeconds - hour*3600)/60);
	var seconds = totalSeconds - (hour*3600 + minute*60);
	
	document.getElementById("time").innerHTML = hour + ":" + minute + ":" + seconds;
}

function UpdateMoveCounter(){
	document.getElementById("number-of-moves").innerHTML = totalMoves;
}
