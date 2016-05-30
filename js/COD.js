//Init
function pusH(s,e){
  prev=$("#place"+(s)).text();
  for(var i=s;i<=e;i++){
    next=$("#place"+(i)).text();
    $("#place"+(i)).text(prev);
    prev=next;
  }
}
function revPush(s,e){
  prev=$("#place"+(s)).text();
  for(i=s;i>=e;i--){
    next=$("#place"+(i)).text();
    $("#place"+(i)).text(prev);
    prev=next;
  }
}
var angle = 0;
var flag=0;
  setInterval(function(){
    if(!flag)
      angle+=4;
    else
      angle-=4;
    if(angle==60){
      flag=1;
    }
    if(angle==-60){
      flag=0;
    }
    if(angle==-40){
      if(flag){
        $("#l1").animate({ opacity: 0 });
        pusH(1,10);
       }
      else{
        $("#l1").animate({ opacity: 1 });
        revPush(10,1);
       
      }
    }
    if(angle==-48){
      if(flag){
        $("#l2").animate({ opacity: 0 });
        pusH(2,10);
      }
      else{
        $("#l2").animate({ opacity: 1 });
        revPush(10,2);
      }
    }

    if(angle==-56){
      if(flag){
       $("#l3").animate({ opacity: 0 });
        pusH(2,10);
      }
      else{
       $("#l3").animate({ opacity: 1 });;
        revPush(10,2);
       }
    }

    if(angle==40){
      if(!flag){
       $("#l4").animate({ opacity: 0 });
        pusH(11,20);
       }
      else{
        $("#l4").animate({ opacity: 1 });;
        revPush(20,11);
       }
    }
    if(angle==48){
      if(!flag){
       $("#l5").animate({ opacity: 0 });
        pusH(12,20);
       }
      else{ 
        $("#l5").animate({ opacity: 1 });;
        revPush(20,12);
      }
    }

    if(angle==56){
      if(!flag){
       $("#l6").animate({ opacity: 0 });
        pusH(13,20);
      }
      else{
        $("#l6").animate({ opacity: 1 });;
        revPush(20,13);
      }
    }


  $("#wheel").rotate({
    angle:angle,
    center: ["50%", "55%"]
  });
  },50);
var loginFlag=0;
 $('#nowhere').prepend($('#bookingform')).fadeIn('slow');
  $("#topnav").show();
 $("#map-input").css("background-color","rgba(255,255,255, 1)");
  $("#Time").css("background-color","rgba(255,255,255, 1)");
$("#header").css("height","61px");
$("#header").css("color","rgba(255,255,255,0.3");


var mapMode=0;
if(document.cookie=="")
  $('#logout').hide();
else{
  $("#logout").show();
  $("#login").hide();
}
var $win = $(window);
$win.scroll(function(){
if($win.scrollTop()!=0)
{
  $(".navbar-brand").show();
  $("#header").addClass("header");
}
else
{
  $(".navbar-brand").hide();
  $("#header").removeClass("header");
}

if( $win.scrollTop() >= $('#nowhere').position().top){
  $('#here').prepend($('#bookingform')).fadeIn('slow');
  $("#topnav").hide();
  $("#map-input").css("background-color","rgba(255,255,255, 0.3)");
  $("#Time").css("background-color","rgba(255,255,255, 0.3)");
  $("#Date").css("background-color","rgba(255,255,255, 0.3)");
}
else{
  if(!mapMode){
  $('#nowhere').prepend($('#bookingform')).fadeIn('slow');
  $("#topnav").show();
 $("#map-input").css("background-color","rgba(255,255,255, 1)");
  $("#Time").css("background-color","rgba(255,255,255, 1)");
  $("#Date").css("background-color","rgba(255,255,255, 1)");
}
}

});

$('#close_login').click(function(){
  mapMode=0;
  $('html').css('overflow','visible');
  $('.angle').show();
 $('#nowhere').prepend($('#bookingform')).fadeIn('slow');
 $("#map-input").css("background-color","rgba(255,255,255, 1)");
 $("#Time").css("background-color","rgba(255,255,255, 1)");
 $("#Date").css("background-color","rgba(255,255,255, 1)");
$("#map").animate({ opacity: 0 });
//scroll to top
$("#close_login").hide();
$('#map-input').click(function(){xx();this.onclick=null;});
$('#map-input').val("");
});

function xx(){
  mapMode=1;
  $('html').css('overflow','hidden');
  $('.angle').hide();
  $("#close_login").show();
  $('#here').prepend($('#bookingform1')).fadeIn('slow');
  $("#topnav").hide();
  $("#map-input").css("background-color","rgba(255,255,255, 0.2)");
  $("#Time").css("background-color","rgba(255,255,255, 0.2)");
  $("#Date").css("background-color","rgba(255,255,255, 0.2)");
  //$("#map").animate({ opacity: 1 });
  $("#map").css("visibility","visible");
  $("#header").removeClass("header");
  $('html,body').animate({
      scrollTop: $("#nowhere").offset().top},
        'slow');

       

      function bookApiCall(addr){
        //Booking api call here    
        var date = $('#Date').val();
        var time = $('#Time').val();
        var expectedHoldup = $('#Holdup').val();
        //confirm
         //alert("Api call data :: "+addr+", request_date :"+date+", re : "+time+", Minimum time chauffeur is required : "+expectedHoldup);
         
        //Popup to confirm! 
        var id = 1,token=34;
        var data = {user_id : id,security_token:token,address:addr,city:"Kolkata",state:"West Bengal",pin:"",min_hours:expectedHoldup,request_date:data,request_time:time};
        //alert(JSON.stringify(data));
        var r = window.confirm("Confirm booking to "+addr+" at "+data+" "+time+" for "+expectedHoldup+" hours?");
        if(r){
        var request = $.ajax({
          url:'https://careodrive.com/order/new.php',
          type:'post',
          data:JSON.stringify(data),
          contentType:"application/json"
          
        });
        }

      }
}
function isLoggedIn(){
  var mobile = $('#mobileLogin').val();
  var password = $("#passwordLogin").val();
  var obj;
  $.ajax({ 
              type: 'POST', 
              url: 'http://careodrive.com/checkLogin.php', 
              data: {mobile: mobile,password: password}, 
              dataType: 'json',
              success: function (response) {
                console.log(JSON.stringify(response,null,2));
                loginFlag = response[0]['status'];
                document.cookie="user_id="+response[0]['user_id']+"; security_token="+response[0]['security_token']+";";
                if(loginFlag=="error"){
                  alert("You aren't logged in.");
                }
                else if(loginFlag=="ok"){
                  alert("You logged in.");
                  $("#logout").show();
                  $("#login").hide();
                }

                //console.log(new String(response[0]['status']));
                //return new String(response[0]['status']);
              }
          });
}
function logout(){
  $("#logout").hide();
  $("#login").show();
  document.cookie="";
}
function verifyOTPRegistered(){
  var mobile = $('#mobileSignup').val();
  var otp = $('#otp').val();
  console.log("hello");
  $.ajax({ 
              type: 'POST', 
              url: 'http://careodrive.com/user/verify_otp_register.php', 
              data: {mobile:mobile,otp: otp}, 
              dataType: 'json',
              success: function (response) { 
                console.log(JSON.stringify(response,null,2));
                if(response[0]['status']=="error"){
                  alert("OTP not verified");
                }
                else if(response[0]['status']=="ok"){
                  alert("OTP verified");
                }
                return response[0]['status']; 
              }
          });  
}

function newUser(){
  var name = $('#nameR').val();
  var mobile = $('#mobileSignup').val();
  var email = $('#emailR').val();
  var password = $('#newpassword').val();
  
  //Show otp verification
  $("#tab2").hide();
  $("#tab3").show();
  $(".only").hide();

  
    $.ajax({ 
              type: 'POST', 
              url: 'http://careodrive.com/user/add.php', 
              data: {name:name,mobile:mobile,email:email,password:password}, 
              dataType: 'json',
              success: function (response) { 
                console.log(JSON.stringify(response,null,2));
                console.log({name:name,mobile:mobile,email:email,password:password});
                return response[0]['status'];
              }
          });  
}


