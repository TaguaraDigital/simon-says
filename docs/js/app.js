"use strict";var mainNav=document.getElementById("nav__links"),toggleMenu=document.getElementById("toggle-menu"),navList=document.getElementById("nav__list"),navItems=document.querySelectorAll(".nav__item"),navLenght=navItems.length,menuOpen=!1;toggleMenu.addEventListener("click",(function(){mainNav.classList.toggle("show-menu"),toggleMenu.classList.toggle("open"),menuOpen=!menuOpen})),navItems.forEach((function(e){e.addEventListener("click",(function(){navList.querySelector(".nav__item--active").classList.remove("nav__item--active"),e.classList.add("nav__item--active"),menuOpen&&(mainNav.classList.toggle("show-menu"),toggleMenu.classList.toggle("open"),menuOpen=!1)}))}));var flash,level,good,compTurn,intervalId,win,userName,userScores=[],bestScores=[],gameOrder=[],playerOrder=[],on=!1,strict=!1,noise=!0,numberOfLevels=100,displayCounter=document.getElementById("level"),pads=document.getElementById("pads"),green=document.getElementById("green"),red=document.getElementById("red"),gold=document.getElementById("gold"),blue=document.getElementById("blue"),onBtn=document.getElementById("on-btn"),startBtn=document.getElementById("start-btn"),strictBtn=document.getElementById("strict-btn"),activePlayer=document.getElementById("activePlayer"),btnIntro=document.getElementById("btn-intro"),intro=document.getElementById("intro"),colors=[{pad:green,normal:"green",press:"green--on",clip:"green-sound"},{pad:red,normal:"red",press:"red--on",clip:"red-sound"},{pad:gold,normal:"gold",press:"gold--on",clip:"gold-sound"},{pad:blue,normal:"blue",press:"blue--on",clip:"blue-sound"}];function showBestScores(e){var n=1,t=document.getElementById("best-score");t.innerHTML="",e.forEach((function(e){t.innerHTML+="<li> ".concat(n,".- ").concat(e.player," ").concat(e.score,"</li>"),n++}))}function showUserScores(e){var n=document.getElementById("user-title"),t=document.getElementById("user-score");n.innerHTML=" ".concat(userName," scores"),t.innerHTML="";for(var r=0;r<e.length;r++)t.innerHTML+="<li> ".concat(r+1,".- ").concat(e[r],"</li>")}function play(){win=!1,gameOrder=[],playerOrder=[],flash=0,intervalId=0,level=1,displayCounter.innerHTML=1,good=!0,gameOrder.push(Math.floor(4*Math.random()));for(var e=0;e<4;e++)action(colors[e]);compTurn=!0,intervalId=setInterval(gameTurn,800)}function gameTurn(){on=!1,activePlayer.innerHTML="It is computer turn",activePlayer.classList="activePlayer activePlayer--show",flash===level&&(clearInterval(intervalId),compTurn=!1,clearColor(),on=!0,gameOrder.length<=level&&gameOrder.push(Math.floor(4*Math.random())),console.log("Next play",gameOrder),activePlayer.innerHTML="".concat(userName," is your turn")),compTurn&&(clearColor(),setTimeout((function(){0===gameOrder[flash]&&action(colors[0]),1===gameOrder[flash]&&action(colors[1]),2===gameOrder[flash]&&action(colors[2]),3===gameOrder[flash]&&action(colors[3]),flash++}),200))}function action(e){noise&&document.getElementById(e.clip).play(),noise=!0,e.pad.classList.add("".concat(e.press))}function clearColor(){for(var e=0;e<colors.length;e++)colors[e].pad.classList.remove("".concat(colors[e].press))}function flashColor(){for(var e=0;e<colors.length;e++)colors[e].pad.classList.add("".concat(colors[e].press))}function errorSound(){noise&&document.getElementById("error").play(),noise=!0}function check(){playerOrder[playerOrder.length-1]!==gameOrder[playerOrder.length-1]&&(good=!1),playerOrder.length===numberOfLevels&&good&&winGame(),good||(errorSound(),flashColor(),displayCounter.innerHTML="NO!",setTimeout((function(){displayCounter.innerHTML=level,clearColor(),strict?(null!==userScores?userScores.push(level-1):(userScores=[level-1],scores.classList.add("scores--show"),activePlayer.classList.add("activePlayer--show")),order(userScores,userName),localStorage.setItem("userScore-".concat(userName),JSON.stringify(userScores)),localStorage.setItem("bestScore",JSON.stringify(bestScores)),play()):(compTurn=!0,flash=0,playerOrder=[],good=!0,intervalId=setInterval(gameTurn,800))}),800),noise=!1),level===playerOrder.length&&good&&!win&&(level++,playerOrder=[],compTurn=!0,flash=0,displayCounter.innerHTML=level,intervalId=setInterval(gameTurn,800))}function order(e,n){var t;null!==bestScores?bestScores.push({player:n,score:e[e.length-1]}):bestScores=[{player:n,score:e[e.length-1]}],e.sort((function(e,n){return n-e})),t=Math.min(10,e.length),showUserScores(e=e.slice(0,t)),bestScores.sort((function(e,n){return n.score-e.score})),t=Math.min(10,bestScores.length),showBestScores(bestScores=bestScores.slice(0,t))}function winGame(){flashColor(),displayCounter.innerHTML="WIN",on=!1,win=!0}function buttonPush(e){on&&(playerOrder.push(e),check(),action(colors[e]),win||setTimeout((function(){clearColor()}),300))}btnIntro.addEventListener("click",(function(e){e.preventDefault(),userName=document.getElementById("user").value.trim();var n=document.getElementById("scores"),t=document.getElementById("activePlayer"),r=document.getElementById("msg-errors");bestScores=JSON.parse(localStorage.getItem("bestScore"))||null,console.log("bestscore= ",bestScores),0===userName||null===userName||""===userName?r.innerHTML=" Enter your name to play":(null!==(userScores=JSON.parse(localStorage.getItem("userScore-".concat(userName)))||null)&&(n.classList.add("scores--show"),t.classList.add("activePlayer--show"),showUserScores(userScores)),intro.classList.remove("intro--show")),null!==bestScores&&showBestScores(bestScores)})),strictBtn.addEventListener("click",(function(e){strict=!!strictBtn.checked})),onBtn.addEventListener("click",(function(e){!0===onBtn.checked?(displayCounter.innerHTML="-",on=!0):(displayCounter.innerHTML="",on=!1,clearColor(),clearInterval(intervalId))})),startBtn.addEventListener("click",(function(e){(on||win)&&play()})),pads.addEventListener("click",(function(e){switch(e.target.id){case"green":buttonPush(0);break;case"red":buttonPush(1);break;case"gold":buttonPush(2);break;case"blue":buttonPush(3)}}));