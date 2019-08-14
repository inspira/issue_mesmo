'use strict';

let activityLabel = document.getElementById("activity");
let startLabel = document.getElementById("started");
let stopLabel = document.getElementById("finished");
let durationLabel = document.getElementById("duration");
let formattedLabel = document.getElementById("formatted");
let historyLabel = document.getElementById("history");

let startButton = document.getElementById("start");
let stopButton = document.getElementById("stop");
let cleanButton = document.getElementById("clean");
let historyButton = document.getElementById("showHistory");

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

  startButton.onclick = function(){
    let issueCode = getIssueCode(url);
    activityLabel.innerHTML = issueCode;
    
    let startDate = new Date();
    startLabel.innerHTML = startDate.toLocaleString();

    chrome.storage.sync.set({dateStart: startDate.getTime(), issueCode: issueCode});
  };
  
  stopButton.onclick = function(){
    let dateStop = new Date();
    stopLabel.innerHTML = dateStop.toLocaleString();
      chrome.storage.sync.get(function(result) {
        var milliseconds = (dateStop.getTime() - result.dateStart);
        var minutes = Math.round((milliseconds % 86400000) / 60000);
        durationLabel.innerHTML = minutes + ' minutos';
        chrome.storage.sync.set({dateStop: dateStop.getTime(), duration: minutes});
      });
  };
  
  cleanButton.onclick = function(){
    chrome.storage.sync.get(function(result) {
      let formatted = "task: " + result.issueCode + " - " + result.duration + " minutos";
      formattedLabel.value = formatted;
      formattedLabel.select();
      document.execCommand("copy");
      
      activityLabel.innerHTML = "";
      startLabel.innerHTML = "";
      stopLabel.innerHTML = "";
      durationLabel.innerHTML = "";
      
      chrome.storage.sync.remove(['issueCode', 'dateStart', 'dateStop', 'duration']);

      if(result.history){
        result.history = result.history + '\n' + formatted;
      }else{
        result['history'] = formatted;
      }
      chrome.storage.sync.set({history: result.history});
    });
  };
  
  historyButton.onclick = function(){
    chrome.storage.sync.get(function(result) {
      if(result.history){
        historyLabel.innerHTML = result.history;
      }else{
        result.history = "Nada no histório ainda";
      }
    });
  };

  chrome.storage.sync.get(function(result) {
    console.log(result);
    
    if(result.issueCode && result.dateStart){
      let startDate = new Date(result.dateStart);
      activityLabel.innerHTML = result.issueCode;
      startLabel.innerHTML = startDate.toLocaleString();
      
      if(result.dateStop){
        let stopDate = new Date(result.dateStop);
        durationLabel.innerHTML = result.duration + " minutos";
        stopLabel.innerHTML = stopDate.toLocaleString();
      }
    }
  });
  
});