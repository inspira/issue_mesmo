'use strict';

let activityLabel = document.getElementById("activity");
let messageLabel = document.getElementById("message");
let startButton = document.getElementById("start");

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
    message.innerHTML = "clicadinho :)";
  };
  
  /* ✨ Façam a mágica aqui ✨*/

  


  
});