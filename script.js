/*
 * start the board and display the numbers 
 */
function initialize ()
{
    resetBoard ();
    numMoves = 0;
    document.getElementById ("comments").innerHTML = "Click on the Start Button to Shuffle the Puzzle";
    display ();
}

/*
 * swap the value/position of two different element
 */
function swap (i, j)
{
    document.getElementById (j).innerHTML = document.getElementById (i).innerHTML;
    document.getElementById (i).innerHTML = "";
    numMoves++;
    canReset = true;
    display ();
    checkIfComplete ();
}

/*
 * check if the element at position (r,c) can be swap to another
 * position
 */
function change (r, c)
{
    //Check top
    if (r > 0 && document.getElementById ("" + (r - 1) + c).innerHTML == "")
    {
        //console.log ("up");
        swap (("" + r + c), ("" + (r - 1) + c));
    } 
    //Check Bottom  
    else if (r < 3 && document.getElementById ("" + (r + 1) + c).innerHTML == "")
    {
        //console.log ("down");
        swap (("" + r + c), ("" + (r + 1) + c));
    }
    //Check Left
    else if (c > 1 && document.getElementById ("" + r + (c - 1)).innerHTML == "")
    {
        //console.log ("left");
        swap (("" + r + c), ("" + r + (c - 1)));
    }
    //Check Right
    else if (c < 4 && document.getElementById ("" + r + (c + 1)).innerHTML == "")
    {
        //console.log ("right");
        swap (("" + r + c), ("" + r + (c + 1)));
    }
}

/*
 * check if the board is complete and all the pieces are in order
 */
function checkIfComplete ()
{
    if (isShuffled)
    {
        var num = 1;
        for (var r = 0; r < 3; r++)
        {
            for (var c = 1; c < 5; c++)
            {
                if (document.getElementById ("" + r + c).innerHTML == num)
                {
                    //console.log (num);
                    num++;
                }
                else
                {
                    boardSolved = false;
                    break;
                }
            }
        }
        for (var c = 1; c < 4; c++)
        {
            if (document.getElementById ("" + 3 + c).innerHTML == num)
            {
                //console.log (num);
                num++;
            }
            else
            {
                //console.log ("num: " + num);
                boardSolved = false;
                break;
            }
        }
        //console.log (boardSolved);
        if (boardSolved)
        {
            document.getElementById ("comments").innerHTML = "You won! <br/> You Moved " + numMoves + " Time(s). <br/> Click Start to Shuffle Again.";
        }
        boardSolved = true;
    }
}

/*
 * shuffle the board
 */
function shuffle ()
{
    var i = 0;
    while (numMoves < 1000)
    {
        change ((parseInt (Math.random () * 4)), (parseInt (Math.random () * 4) + 1));
    }
    numMoves = 0;
    isShuffled = true;
    display (); 
}

/*
 * start the game and shuffle the board
 */
function start ()
{
    shuffle ();
    document.getElementById ("comments").innerHTML = "The Puzzle has been shuffled 1000 times. <br/> Good Luck and Have Fun! <br/> Click the Reset button to Reset the board";
}

/*
 * resets the board to its original position
 */
function resetBoard ()
{
    var num = 1;
    for (var r = 0; r < 4; r++)
    {
        for (var c = 1; c < 5; c++)
        {
            document.getElementById ("" + r + c).innerHTML = num;
            num++;
        }
    }
    document.getElementById ("34").innerHTML = "";
    boardSolved = true;
    isShuffled = false;
    canReset = false;
}

/*
 * checks if the board can be reset
 */
function reset ()
{
    if (canReset)
    {
        resetBoard ();
        document.getElementById ("comments").innerHTML = "The Board has been Reset. <br/> Press Start to Shuffle.";
    }
}

/*
 * display the number of moves of the player
 */
function display ()
{
    document.getElementById ("move").innerHTML = numMoves;
}
