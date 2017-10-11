/*The "AI" part starts here */
var minimaxRoot = function(depth, game, isMaximisingPlayer) {

    var newGameMoves = game.ugly_moves();
    var bestMove = -99999;
    var bestMoveFound;

    for(var i = 0; i < newGameMoves.length; i++) {
        var newGameMove = newGameMoves[i]
        game.move(newGameMove);
        var value = minimax(depth - 1, game, -100000, 100000, !isMaximisingPlayer);
        game.undo();
        if(value >= bestMove) {
            bestMove = value;
            bestMoveFound = newGameMove;
        }
    }
    return bestMoveFound;
};

var minimax = function (depth, game, alpha, beta, isMaximisingPlayer) {
    positionCount++;
    if (depth === 0) {
		if( isMaximisingPlayer ) {
			return evaluateBoard(game.board());
		} else {
			return -evaluateBoard(game.board());
		}
    }

    var newGameMoves = game.ugly_moves();

    if (isMaximisingPlayer) {
        var bestMove = -99999;
        for (var i = 0; i < newGameMoves.length; i++) {
            game.move(newGameMoves[i]);
            bestMove = Math.max(bestMove, minimax(depth - 1, game, alpha, beta, isMaximisingPlayer));
            game.undo();
            alpha = Math.max(alpha, bestMove);
            if (beta <= alpha) {
                return bestMove;
            }
        }
        return bestMove;
    } else {
        var bestMove = 99999;
        for (var i = 0; i < newGameMoves.length; i++) {
            game.move(newGameMoves[i]);
            bestMove = Math.min(bestMove, minimax(depth - 1, game, alpha, beta, !isMaximisingPlayer));
            game.undo();
            beta = Math.min(beta, bestMove);
            if (beta <= alpha) {
                return bestMove;
            }
        }
        return bestMove;
    }
};

var evaluateBoard = function (board) {
    var totalEvaluation = 0;
    for (var row = 0; row < 8; row++) {
        for (var col = 0; col < 8; col++) {
            totalEvaluation = totalEvaluation + getPieceValue(board, row, col);
        }
    }
    return totalEvaluation;
};

var getEmptyFiles = function (board) {
	var fileArray = [true, true, true, true, true, true, true, true];

    for (var row = 0; row < 8; row++) {
        for (var col = 0; col < 8; col++) {
			var piece = board[col][row];
			if( piece !== null ){
				fileArray[i] = false;
				break;
			}
        }
    }	
	
	return fileArray;
}

var getPieceValue = function (board, x, y) {
	var piece = board[x][y];
	var absoluteValue = 0;
	var isWhite = true;
	
    if (piece !== null) {

		isWhite = piece.color === 'w';
	
		absoluteValue = baseValues[piece.type];
	
        if (piece.type === 'p') {
            absoluteValue += getPawnValue(isWhite, x, y);
        } else if (piece.type === 'n') {
            absoluteValue += getKnightValue(isWhite, x, y);
        } else if (piece.type === 'b') {
            absoluteValue += getBishopValue(isWhite, x, y);
        } else if (piece.type === 'r') {
            absoluteValue += getRookValue(isWhite, x, y);
        } else if (piece.type === 'q') {
            absoluteValue += getQueenValue(isWhite, x, y);
        } else if (piece.type === 'k') {
            absoluteValue += getKingValue(isWhite, x, y);
        }
	}
	
    return isWhite ? absoluteValue : -absoluteValue;
};

var getPawnValue = function (isWhite, x, y) {
	return ( isWhite ? pawnEvalWhite[y][x] : pawnEvalBlack[y][x] );
}

var getKnightValue = function (isWhite, x, y) {
	return knightEval[y][x];
}

var getBishopValue = function (isWhite, x, y) {
	return ( isWhite ? bishopEvalWhite[y][x] : bishopEvalBlack[y][x] );
}

var getRookValue = function (isWhite, x, y) {
	return ( isWhite ? rookEvalWhite[y][x] : rookEvalBlack[y][x] );
}

var getQueenValue = function (isWhite, x, y) {
	return evalQueen[y][x];
}

var getKingValue = function (isWhite, x, y) {
	return ( isWhite ? kingEvalWhite[y][x] : kingEvalBlack[y][x] );
}