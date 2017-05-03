$(document).ready(function(){
  $("#home").click(function(){
    console.log("home");
    $(".main-box").css("display","block");
    $(".marcas-box").css("display","none");

  })
  $("#marcas").click(function(){
    console.log("marcas");
    $(".main-box").css("display","none");
    $(".marcas-box").css("display","block");
  })
});