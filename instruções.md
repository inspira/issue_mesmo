# Missões
    1: Persistir o código da tarefa e horário de início

    2: Calcular a duração da tarefa ao clicar em Stop

    3: Copiar para o clipboard e limpar informações do popup

    desafio extra: histórico de atividades (salvar e exibir atividades/duração)


# Atalhos

* chrome storage
  
  - set
    ``` js
    chrome.storage.sync.set({key: value}, function() {
      console.log('Value is set to ' + value);
    });
    ```
  
  - get
    ``` js
    chrome.storage.sync.get(['key'], function(result) {
      console.log('Value currently is ' + result.key);
    });
    ```

* clipboard
  ``` js
  textElement.select();
  document.execCommand("copy");
  ```
* date
  ```js
  let date = new Date();
  ```
  - formato legível: 
    ```js
    date.toLocaleString();
    ```
  - timestamp: 
    ```js
    date.getTime();
    ```
  - difference in minutes:
    ```js
    var milliseconds = (newerDate - olderDate);
    var minutes = Math.round((milliseconds % 86400000) / 60000);
    ```

* onclick event
  ``` js
  document.getElementById("element").onclick = function(){
    alert("😱fui clicado!");
  };
  ```