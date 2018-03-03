$(document).ready(function(){
   //api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid=eee56f4b1d1f8a2893dd4f590f49b6ff
 
  //obtaining location

  var lat;
  var long;
  var farenheit;
  var celsius;
  var fMax;
  var cMax;
  var tempSwitch = false;
  var tempButtonF="Farenheit";
  var temButtonC="Celsiusl";
 
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(function(position) {
    lat=position.coords.latitude;
    long=position.coords.longitude;

      
      
        //begin JSON data call
 var api = 'https://cors-anywhere.herokuapp.com/api.openweathermap.org/data/2.5/weather?lat='+lat+'&lon='+long+'&appid=eee56f4b1d1f8a2893dd4f590f49b6ff';
  
$.getJSON(api, function(data){
  var city = "Current weather in "+data.name;
  var windSpeed = data.wind.speed+" MPH";
  var windDirection = data.wind.deg;
  var kelvin = data.main.temp;
  var description = data.weather[0].description;
  var humidity = "Humidity: "+data.main.humidity+'%';
  var tempMax = data.main.temp_max;
  var weatherIconURL=data.weather[0].icon;
var weatherIcon="<img src='http://openweathermap.org/img/w/"+weatherIconURL+".png'>";
  //temperature conversions
  farenheit =  (9/5*(kelvin - 273) + 32).toFixed(2)+"°F";
  celsius = (kelvin - 273).toFixed(2)+"°C";
  
  fMax = "High of "+(9/5*(tempMax - 273)+ 32).toFixed(2)+"°F";
  cMax = "High of "+(tempMax-273).toFixed(2)+"°C";
  
  //connecting HTML to Jquery objects
  $('#farenheit').html(farenheit);
  $('#tempButton').click(function(){
  
    
    //These functions are if we are set at farenheit, and click to switch to celsius
    if (tempSwitch==false){
      $("#farenheit").fadeOut("fast", function(){
       $("#farenheit").html(celsius);
       $("#farenheit").fadeIn("fast");
      });
      
      
      $("#tempButton").fadeOut("slow",function(){
        $("#tempButton").html("See in Farenheit");
        $("#tempButton").fadeIn("slow");
      });
      
       $("#fMax").fadeOut("fast", function(){
       $("#fMax").html(cMax);
       $("#fMax").fadeIn("fast");
      });
            $("#tempSwitch").html(tempSwitch);
      tempSwitch=true;
    }
//Now if we want to go from celsius to farenheit  
    else {
      $("#farenheit").fadeOut("fast", function(){
       $("#farenheit").html(farenheit);
       $("#farenheit").fadeIn("fast");
      });
      
      $("#tempButton").fadeOut("slow",function(){
        $("#tempButton").html("See in Ceslsius");
        $("#tempButton").fadeIn("slow");
      });
      
      $("#fMax").fadeOut("fast", function(){
       $("#fMax").html(fMax);
       $("#fMax").fadeIn("fast");
      });
      $("#tempSwitch").html(tempSwitch);
      tempSwitch=false;

    }
    
  });
  $('#weatherIcon').html(weatherIcon);
  $('#windSpeed').html(windSpeed);
  $('#humidity').html(humidity);
  $('#city').html(city);
  $('#fMax').html(fMax)
  
  $(".hoverable").hover(function(){
    
    $(this).toggleClass("hovered")
    
  });
  });
      
  });
}

  


});