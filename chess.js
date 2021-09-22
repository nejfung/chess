var piecesLink = [["blackpawn", "https://codehs.com/uploads/64a74698bc7f948c4530bd9e9362cf6c"], ["whitepawn", "https://codehs.com/uploads/5db86aa44758556b45202d8176aa7a8a"], ["blackrook", "https://codehs.com/uploads/43881a826602e8aa03d147831160d813"], ["whiterook", "https://codehs.com/uploads/87a4625f837cf86e5abd972b791b4cb4"], ["blackknight", "https://codehs.com/uploads/e4dc0bf233a3b3d88b92f37c37341e04"], ["whiteknight", "https://codehs.com/uploads/07088a2f250e8fc449854feb0ca977a7"], ["blackbishop", "https://codehs.com/uploads/a0ef197ee2e9fd4c73831c69ffcaf5f0"], ["whitebishop", "https://codehs.com/uploads/6b80c1ed13f25ab840a8857884f094b4"], ["blackqueen", "https://codehs.com/uploads/05ffffbacfbe6446a0b18d0105a14504"], ["whitequeen", "https://codehs.com/uploads/84e6dd6b2b2ec40ccb936cb075e0dfce"], ["blackking", "https://codehs.com/uploads/8ae0614739c62c1df23adf88004dec6d"], ["whiteking", "https://codehs.com/uploads/4bcbab88615f03b9b9c72da8e7508ada"]];
var pieces;
var turn = "white";
var dots = [];
var clickedPiece = [];
var turnlabel = new Text(turn, "20pt Arial");
var castling = [[true, true], [true, true]];

makeGrid();
pieces = makePieces();
mouseClickMethod(onMouseClick);


function onMouseClick(e){
    var clickSpot = getGrid(e.getX(), e.getY());
    var looking = true;
    
    if(turn == "white"){
        var WoB = 0;
    }
    else{
        var WoB = 1;
    }
    
    var turnpieces = pieces[WoB];
        
    //if click on piece
    for(var i = 0; i < turnpieces.length; i++){
        var pieceSpot = getGrid(turnpieces[i][0].getX(), turnpieces[i][0].getY());
        if(pieceSpot == clickSpot){
            if(turnpieces[i][0] == clickedPiece){
                for(var i = 0; i < dots.length; i++){
                    remove(dots[i]);
                }
                
                clickedPiece = [];
                
            }
            else{
                findMoves(turnpieces[i]);
                
                clickedPiece = turnpieces[i][0];
            }
            looking = false;
            break;
        }
    }
    
    
    //if click on dot
    if(looking){
        for(var i = 0; i < dots.length; i++){
            var dotSpot = getGrid(dots[i].getX(), dots[i].getY());
            if(dotSpot == clickSpot){
                
                var newPiece = clickedPiece;
                newPiece.setPosition(dots[i].getX()-14, dots[i].getY()-20);
                
                clickedPiece = "";
                
                for(var j = 0; j < dots.length; j++){
                    remove(dots[j]);
                }
                
                dots = [];
                
                eatIfSpot(dotSpot, (WoB+1)%2);
                
                if(turn == "white"){
                    turn = "black";
                }
                else{
                    turn = "white";
                }
                turnlabel.setText(turn);
                
                break;
                
            }
        }
    }
    
}

function eatIfSpot(dotSpot, colour){
    var turnpieces = pieces[colour];
    
    for(var i = 0; i < turnpieces.length; i++){
        var grid = getGrid(turnpieces[i][0].getX(), turnpieces[i][0].getY());
        if(grid == dotSpot){
            remove(pieces[colour][i][0]);
            turnpieces.remove(i);
            
            break;
        }
    }
    
    pieces[colour] = turnpieces;

}

function findMoves(piece){
    var piecetype = piece[1];

    if(piecetype%2 == 1){
        var colour = "white";
        var othercolour = "black";
    }
    else{
        var colour = "black";
        var othercolour = "white";
    }
    
    for(var i = 0; i < dots.length; i++){
        remove(dots[i]);
    }
    var grid = getGrid(piece[0].getX(), piece[0].getY());
    
    if(piecetype == 0){   //black pawn
        if(!checkPiece(colour, (grid[0]) + "" + (parseInt(grid[1])+1)) && !checkPiece(othercolour, (grid[0]) + "" + (parseInt(grid[1])+1))){
            makedot((grid[0]) + (parseInt(grid[1])+1));
            
            if(grid[1] == 2 && !checkPiece(colour, (grid[0]) + "" + (parseInt(grid[1])+2)) && !checkPiece(othercolour, (grid[0]) + "" + (parseInt(grid[1])+2))){
                makedot((grid[0]) + (parseInt(grid[1])+2));
            }
        }
        
        if(checkPiece(othercolour, (parseInt(grid[0])+1) + "" + (parseInt(grid[1])+1))){
            makedot((parseInt(grid[0])+1) + "" + (parseInt(grid[1])+1));
        }
        if(checkPiece(othercolour, (parseInt(grid[0])-1) + "" + (parseInt(grid[1])+1))){
            makedot((parseInt(grid[0])-1) + "" + (parseInt(grid[1])+1));
        }
    }
    
    else if(piecetype == 1){   //white pawn
        
        if(!checkPiece(colour, (grid[0]) + "" + (parseInt(grid[1])-1)) && !checkPiece(othercolour, (grid[0]) + "" + (parseInt(grid[1])-1))){
            makedot((grid[0]) + (parseInt(grid[1])-1));
            
            if(grid[1] == 7 && !checkPiece(colour, (grid[0]) + "" + (parseInt(grid[1])-2)) && !checkPiece(othercolour, (grid[0]) + "" + (parseInt(grid[1])-2))){
                makedot((grid[0]) + (parseInt(grid[1])-2));
            }
        }
        
        
        if(checkPiece(othercolour, (parseInt(grid[0])+1) + "" + (parseInt(grid[1])-1)) && !checkPiece(colour, (parseInt(grid[0])+1) + "" + (parseInt(grid[1])-1))){
            makedot((parseInt(grid[0])+1) + "" + (parseInt(grid[1])-1));
        }
        
        if(checkPiece(othercolour, (parseInt(grid[0])-1) + "" + (parseInt(grid[1])-1)) && !checkPiece(colour, (parseInt(grid[0])+1) + "" + (parseInt(grid[1])-1))){
            makedot((parseInt(grid[0])-1) + "" + (parseInt(grid[1])-1));
        }
    }
    
    else if(piecetype == 4 || piecetype == 5){  //horse
        var horizontal = 1;
        var vertical = 2;
        
        for(var i = 0; i<8; i++){
            if(!checkPiece(colour, (parseInt(grid[0])+horizontal) + "" + (parseInt(grid[1])+vertical))){
                makedot((parseInt(grid[0])+horizontal) + "" + (parseInt(grid[1])+vertical));
            }
            vertical = 0-vertical;
            if(i%2 == 0) { horizontal = 0-horizontal; }
            if((i+1)%4 == 0) {
                vertical = 1; 
                horizontal = 2;
                
            }
        }
    }
    
    else if(piecetype == 10 || piecetype == 11){    //king
        for(var i = -1; i < 2; i++){
            for(var j = -1; j < 2; j++){
                if(!checkPiece(colour, (parseInt(grid[0]) + i) + "" + (parseInt(grid[1]) + j))){
                    makedot((parseInt(grid[0]) + i) + "" + (parseInt(grid[1]) + j));
                }
            }
        }
        
        //castling
        
        if(piecetype%2 == 1){
            if(castling[piecetype%2][0] == true && !checkPiece(colour, "28") && !checkPiece(colour, "38") && !checkPiece(colour, "48") && !checkPiece(othercolour, "28") && !checkPiece(othercolour, "38") && !checkPiece(othercolour, "48")){
                makedot("38");
            }
            if(castling[piecetype%2][1] == true && !checkPiece(colour, "78") && !checkPiece(colour, "88") && !checkPiece(othercolour, "78") && !checkPiece(othercolour, "88")){
                makedot("78");
            }
        }
        else if(piecetype % 2 == 0){
            if(castling[piecetype%2][0] == true){
                makedot("31");
            }
            if(castling[piecetype%2][1] == true){
                makedot("71");
            }
        }
        
    }
    
    else if(piecetype == 2 || piecetype == 3 || piecetype == 8 || piecetype == 9){  //rook
        var checkSpotsAway = 1;
        //right
        while((parseInt(grid[0])-checkSpotsAway) > 0 && !checkPiece(colour, (parseInt(grid[0])-checkSpotsAway) + "" + (parseInt(grid[1]))) && !checkPiece(othercolour, (parseInt(grid[0])-checkSpotsAway) + "" + (parseInt(grid[1]))) && checkSpotsAway < 8){
            //print(parseInt(grid[0])-checkSpotsAway);
            makedot(parseInt(grid[0])-checkSpotsAway + "" + grid[1]);
            checkSpotsAway++;
        }
        if(!checkPiece(colour, parseInt(grid[0])-checkSpotsAway + "" + (parseInt(grid[1]))) && checkPiece(othercolour, (parseInt(grid[0])-checkSpotsAway) + "" + (parseInt(grid[1])))){makedot((parseInt(grid[0])-checkSpotsAway) + "" + (parseInt(grid[1])));}
        
        checkSpotsAway = 1;
        //left
        while((parseInt(grid[0])+checkSpotsAway) < 9 && !checkPiece(colour, (parseInt(grid[0])+checkSpotsAway) + "" + (parseInt(grid[1]))) && !checkPiece(othercolour, (parseInt(grid[0])+checkSpotsAway) + "" + (parseInt(grid[1])))&& checkSpotsAway < 8){
            //print(parseInt(grid[0])+checkSpotsAway);
            makedot(parseInt(grid[0])+checkSpotsAway + "" + (parseInt(grid[1])));
            checkSpotsAway++;
        }
        if(!checkPiece(colour, parseInt(grid[0])+checkSpotsAway + "" + (parseInt(grid[1]))) && checkPiece(othercolour, parseInt(grid[0])+checkSpotsAway + "" + (parseInt(grid[1])))){makedot(parseInt(grid[0])+checkSpotsAway + "" + (parseInt(grid[1])));}
        
        checkSpotsAway = 1;
        //up
        while((parseInt(grid[1])-checkSpotsAway) > 0 && !checkPiece(colour, grid[0] + "" + parseInt(grid[1])-checkSpotsAway) && !checkPiece(othercolour, grid[0] + "" + parseInt(grid[1])-checkSpotsAway) && checkSpotsAway < 8){
            makedot(grid[0] + "" + (parseInt(grid[1])-checkSpotsAway));
            checkSpotsAway++;
        }
        if(!checkPiece(colour, grid[0] + "" + (parseInt(grid[1])-checkSpotsAway)) && checkPiece(othercolour, grid[0] + "" + (parseInt(grid[1])-checkSpotsAway))){makedot(grid[0] + "" + (parseInt(grid[1])-checkSpotsAway));}
        
        checkSpotsAway = 1;
        //down
        while((parseInt(grid[1])+checkSpotsAway) < 9 && !checkPiece(colour, grid[0] + "" + (parseInt(grid[1])+checkSpotsAway)) && !checkPiece(othercolour, grid[0] + "" + (parseInt(grid[1])+checkSpotsAway)) && checkSpotsAway < 8){
            makedot(grid[0] + "" + (parseInt(grid[1])+checkSpotsAway));
            checkSpotsAway++;
        }
        if(!checkPiece(colour, grid[0] + "" + (parseInt(grid[1])+checkSpotsAway) ) && checkPiece(othercolour, grid[0] + "" + (parseInt(grid[1])+checkSpotsAway) )){makedot(grid[0] + "" + (parseInt(grid[1])+checkSpotsAway));}
    }
    
    if(piecetype == 6 || piecetype == 7 || piecetype == 8 || piecetype == 9){  //bishop
    
        var checkSpotsAway = 1;
        //left/up
        while((parseInt(grid[0])-checkSpotsAway) > 0 && (parseInt(grid[1])-checkSpotsAway) > 0 && !checkPiece(colour, (parseInt(grid[0])-checkSpotsAway) + "" + (parseInt(grid[1])-checkSpotsAway)) && !checkPiece(othercolour, (parseInt(grid[0])-checkSpotsAway) + "" + (parseInt(grid[1])-checkSpotsAway)) && checkSpotsAway < 8){
            makedot((parseInt(grid[0])-checkSpotsAway) + "" + (parseInt(grid[1])-checkSpotsAway));
            checkSpotsAway++;
        }
        if(!checkPiece(colour, (parseInt(grid[0])-checkSpotsAway) + "" + (parseInt(grid[1])-checkSpotsAway)) && checkPiece(othercolour, (parseInt(grid[0])-checkSpotsAway) + "" + (parseInt(grid[1])-checkSpotsAway))){makedot((parseInt(grid[0])-checkSpotsAway) + "" + (parseInt(grid[1])-checkSpotsAway));}
        
        checkSpotsAway = 1;
        //right/up
        while((parseInt(grid[0])+checkSpotsAway) > 0 && (parseInt(grid[1])-checkSpotsAway) > 0 && !checkPiece(colour, (parseInt(grid[0])+checkSpotsAway) + "" + (parseInt(grid[1])-checkSpotsAway)) && !checkPiece(othercolour, (parseInt(grid[0])+checkSpotsAway) + "" + (parseInt(grid[1])-checkSpotsAway)) && checkSpotsAway < 8){
            makedot((parseInt(grid[0])+checkSpotsAway) + "" + (parseInt(grid[1])-checkSpotsAway));
            checkSpotsAway++;
        }
        if(!checkPiece(colour, (parseInt(grid[0])+checkSpotsAway) + "" + (parseInt(grid[1])-checkSpotsAway)) && checkPiece(othercolour, (parseInt(grid[0])+checkSpotsAway) + "" + (parseInt(grid[1])-checkSpotsAway))){makedot((parseInt(grid[0])+checkSpotsAway) + "" + (parseInt(grid[1])-checkSpotsAway));}
        
        checkSpotsAway = 1;
        //left/down
        while((parseInt(grid[0])-checkSpotsAway) > 0 && (parseInt(grid[1])+checkSpotsAway) > 0 && !checkPiece(colour, (parseInt(grid[0])-checkSpotsAway) + "" + (parseInt(grid[1])+checkSpotsAway)) && !checkPiece(othercolour, (parseInt(grid[0])-checkSpotsAway) + "" + (parseInt(grid[1])+checkSpotsAway)) && checkSpotsAway < 8){
            makedot((parseInt(grid[0])-checkSpotsAway) + "" + (parseInt(grid[1])+checkSpotsAway));
            checkSpotsAway++;
        }
        if(!checkPiece(colour, (parseInt(grid[0])-checkSpotsAway) + "" + (parseInt(grid[1])+checkSpotsAway)) && checkPiece(othercolour, (parseInt(grid[0])-checkSpotsAway) + "" + (parseInt(grid[1])+checkSpotsAway))){makedot((parseInt(grid[0])-checkSpotsAway) + "" + (parseInt(grid[1])+checkSpotsAway));}
        
        checkSpotsAway = 1;
        //right/up
        while((parseInt(grid[0])+checkSpotsAway) > 0 && (parseInt(grid[1])+checkSpotsAway) > 0 && !checkPiece(colour, (parseInt(grid[0])+checkSpotsAway) + "" + (parseInt(grid[1])+checkSpotsAway)) && !checkPiece(othercolour, (parseInt(grid[0])+checkSpotsAway) + "" + (parseInt(grid[1])+checkSpotsAway)) && checkSpotsAway < 8){
            makedot((parseInt(grid[0])+checkSpotsAway) + "" + (parseInt(grid[1])+checkSpotsAway));
            checkSpotsAway++;
        }
        if(!checkPiece(colour, (parseInt(grid[0])+checkSpotsAway) + "" + (parseInt(grid[1])+checkSpotsAway)) && checkPiece(othercolour, (parseInt(grid[0])+checkSpotsAway) + "" + (parseInt(grid[1])+checkSpotsAway))){makedot((parseInt(grid[0])+checkSpotsAway) + "" + (parseInt(grid[1])+checkSpotsAway));}
        
    }
    
}

function makedot(pos){
    
    var circle = new Circle(5);
    var x = getPos(pos)[0] + 25;
    
    var y = getPos(pos)[1] + 25;
    circle.setColor(Color.GREY);
    circle.setPosition(x, y);
    dots.push(circle);
    add(circle);
}

function checkPiece(colour, pos){
    if(colour == "white"){
        var piecesToCheck = pieces[0];
    }
    else{
        var piecesToCheck = pieces[1];
    }
    //print(pos + " ");
    if(pos[0] > 8 || pos[0] < 1 || pos[1] > 8 || pos[1] < 1 || pos.length > 2){
        return true;
    }
    
    else{
        for(var i = 0; i < piecesToCheck.length; i++){
    
            if(getGrid(piecesToCheck[i][0].getX(), piecesToCheck[i][0].getY()) == pos){
                return true;
            }
        }
    }
    return false;
}

function getPos(grid){
    var x = (grid[0]-1)*50;
    
    var y = (grid[1]-1)*50 + 40;
    var toReturn = [x, y];
    return toReturn;
}

function getGrid(x, y){
    var gridX = parseInt((x-10)/50 + 1);
    
    var gridY = parseInt((y-45)/50 + 1);
    
    return gridX+ "" + gridY;
}

function makeGrid(){
    turnlabel.setPosition(160,30);
    add(turnlabel);
    for(var i = 0; i < 8; i++){
        for(var j = 0; j < 8; j++){
            var rect = new Rectangle(50, 50);
            rect.setPosition((i*50), (j*50)+40);
            if((i+j)%2 == 1){
                rect.setColor(Color.BLACK);
            }
            else{
                rect.setColor(Color.WHITE);
            }
            
            add(rect);
        }
    }
}

function makePieces(){
    var piecesOrder = [2, 4, 6, 8, 10, 6, 4, 2, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 3, 5, 7, 9, 11, 7, 5, 3];
    var blackpieces = [];
    var whitepieces = [];
    for(var i = 0; i < 8; i++){
        for(var j = 0; j < 4; j++){
            var piece = new WebImage(piecesLink[piecesOrder[i+j*8]][1]);
            piece.setSize(28, 40);
            if(j<2){
                piece.setPosition(10 + 50*i, 45 + 50*j);
                var listhold = [piece, piecesOrder[i+j*8]];
                blackpieces.push(listhold);
            }
            else{
                piece.setPosition(10 + 50*i, 245 + 50*j);
                var listhold = [piece, piecesOrder[i+j*8]];
                whitepieces.push(listhold);
            }
            add(piece);
        }
    }
    return [whitepieces, blackpieces];
}