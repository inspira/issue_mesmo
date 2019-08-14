'use strict';

let activityLacbel = document.getElementById("activity");
let messageLabel = document.getElementById("message");
let startButton = document.getElementById("start");
let stopButton = document.getElementById("stop");
let duracaoSpan = document.getElementById("duration");

// 🥄: função que retorna código da issue do jira
const getIssueCode = (url) => {
  if(url.host.includes("atlassian.net")){
    if(url.searchParams.has("selectedIssue")){
      return url.searchParams.get("selectedIssue");
    }else{
      return url.pathname.replace("\/browse\/", "");
    }
  }
  return "Não é uma página da Atlassian"
}

chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {

  // since only one tab should be active and in the current window at once
  // the return should only have one entry
  let activeTab = tabs[0];
  let url = new URL(activeTab.url);

  // 🥄: pega o código da issue
  activityLabel.innerHTML = getIssueCode(url);

  // 🥄: exemplo de onclick
  startButton.onclick = function(){
    
    var issueCode = getIssueCode(url);
    let startDate = new Date();
    
    chrome.storage.sync.set({"issue": issueCode, "dateStart": startDate}, function() {
      let startDateFormatted = startDate.toLocaleString();
      message.innerHTML = 'Value is set to ' + issueCode + " / startDate: " + startDateFormatted;
      console.log('Value is set to ' + issueCode);
      
    });
  };
  
  /* ✨ Façam a mágica aqui ✨*/

  stopButton.onclick = function(){
    
    var issueCode = getIssueCode(url);
    let stopTime = new Date();
     chrome.storage.sync.get('dateStart', function(olderDate) {
      
      let stopTimeFormatted = stopTime.toLocaleString();
      message.innerHTML = " start: " + JSON.stringify(olderDate.dateStart);
      var duracao = difference_times(stopTime, olderDate.dateStart);
      duracaoSpan.innerHTML = duracao;
    });
    
 
  };

function difference_times(newerDate, olderDate){
  
  var milliseconds = (newerDate - olderDate);
  return Math.round((milliseconds % 86400000) / 60000);
}


  
});