
// Using NaN instead of null is a clever hack. See checkForWinner for details.
var spaces = [
  NaN, NaN, NaN,
  NaN, NaN, NaN,
  NaN, NaN, NaN
];

var player1 = 'veggies';
var player1_wins = 0;
var player1_losses = 0;
var player2_wins = 0;
var player2_losses = 0;
var player2 = 'junkfood';
var currentPlayer = null;
var game_over = false;

var setNextTurn = function () {
  if (currentPlayer === player1) {
    currentPlayer = player2;
  }
  else {
    currentPlayer = player1;
  }
  $('#turn-label').text(currentPlayer);
};

var checkForWinner = function () {
  // Because (NaN === NaN) is always false, we can safely assume
  // that if three spaces in a row are the same, all three spaces are
  // marked by a player, and not all empty.

  if ( //horizontal win check 
    (spaces[0] === spaces[1] && spaces[1] === spaces[2]
    || spaces[3] === spaces[4] && spaces[4] === spaces[5]
    || spaces[6] === spaces[7] && spaces[7] === spaces[8])||
    //vertical win check
    (spaces[0] === spaces[3] && spaces[3] === spaces[6]
    || spaces[1] === spaces[4] && spaces[4] === spaces[7]
    || spaces[2] === spaces[5] && spaces[5] === spaces[8])||
    //diagnol win check
    (spaces[0] === spaces[4] && spaces[4] === spaces[8]
    || spaces[3] === spaces[4] && spaces[4] === spaces[6])
  )
  {
    console.log(currentPlayer+' has won');
    // TODO: Trigger 'game-win' event with the winning player as the event data
    $(document).trigger('game-win',currentPlayer);
  }
};

$(document).on('click', '#board .space', function (e) {
  if (game_over) return;
  var spaceNum = $(e.currentTarget).index();
  console.log('You clicked on space #' + spaceNum);

  // Marks the space with the current player's name
  // TODO: Don't mark it unless the space is blank
  if (!spaces[spaceNum] )//(spaces[spaceNum] != player2 && spaces[spaceNum] != player1)
  {
    spaces[spaceNum] = currentPlayer;
  
    // Adds a class to elem so css can take care of the visuals
    $('#board .space:eq(' + spaceNum + ')').addClass(currentPlayer);

    checkForWinner();
    if (!game_over)
      setNextTurn();
  }
});

$(document).on('game-win', function (e, winner) {
  // TODO: Alert who won the game
  alert(winner+" has won the game");
  $('#turn-label').text(" all over thanks to the last move on "+currentPlayer);
  game_over = true;
  if (winner == player1) 
  {
    player1_wins=player1_wins+1;
    player2_losses=player2_losses+1;
  }
  else  
  {
    player2_wins=player2_wins+1;
    player1_losses=player1_losses+1;
  }
  //$('#player1').text(player1);
  $('p #player1').siblings('#score').text(""+player1_wins);
  //$('#player2').text(player2);
  $('p #player2').siblings('#score').text(""+player2_wins);

  for (var i = spaces.length - 1; i >= 0; i--) {
    if (i%2==0)
      $('#board .space:eq(' + i + ')').fadeOut(3000);
  };
  $('#board .space').fadeOut(3000);
});

$('#newgame').on('click', function(e){
  console.log("new game button pressed");
  spaces = [
    NaN, NaN, NaN,
    NaN, NaN, NaN,
    NaN, NaN, NaN
  ];
  game_over = false;
  $('#board .space').removeClass(player1);
  $('#board .space').removeClass(player2);
  $('#board .space').fadeIn('fast');
});

$('#player1').text(player1);
$('#player2').text(player2);
// Start the game
setNextTurn();
