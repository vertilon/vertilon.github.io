var playerNumber=2;

$(document).ready(function() {
  $(".wrapper").append("<div class='table'></div>");
  
  putPlayers();
  setupCards();
  dealCards();
  console.log(getNumberCards());

});

function putPlayers() {
  $(".table").append("<div id='player_img1' class='player_img'> <img id='img1' class='img' src='img/JohnDoeMasthead.jpg'></div>");
  $("#player_img1").show().css("bottom", "-7vw").css("left",40-8/2+"vw").append("<div id='payer_box1' class='player_box'>John Doe</div>")
  $(".table").append("<div id='player_img2' class='player_img'> <img id='img2' class='img' src='img/Joandoe.png'></div>");
  $("#player_img2").show().css("top", "-10vw").css("left",40-8/2+"vw").append("<div id='payer_box2' class='player_box'>Joan Doe</div>")
}

function setupCards(){
  for (i = 0; i < 52; i++) {
    $(".table").append("<div id='card"+i+"' class='card'></div>");
    $("#card"+i).css("top",35/2-5.25/2+0.01*i+"vw").css("left",12+80/2-3/2+0.01*i+"vw");
  }
}

function dealCards(player_box){
  for (i=51; i > 51-2; i--){

    $("#card"+i).animate({ top: 3+(i-51)*0.5+"vw", left: "40vw", transform: "rotate(-270deg)" });
    $("#card"+i).attr("id","player_card"+i)
  }
}

function getNumberOfCardsInBox(){
  a=0;
  while($("#card"+i).attr("id")!=undefined) a++;
  return a;
}

 