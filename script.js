
let texts = [];
let user = prompt("Bem-Vindo ao Bate-Papo Uol! Por favor insira seu nome:")

function postUser(){    
    
    let participant = {name:user}
    let promessa = axios.post('https://mock-api.driven.com.br/api/v6/uol/participants', participant)
    promessa.then(getData)
    promessa.catch(theError)
    
    
    //promessa.then(usersHere)
}

function stillConected (){
    const participant2 = {name:user}
    let promessa2 = axios.post('https://mock-api.driven.com.br/api/v6/uol/status', participant2)
    promessa2.then(console.log('still here'))
}

setTimeout(setInterval(stillConected,5000),1000)

function getData(){
    console.log('nome de usuário enviado')
}

function theError(erro){
    if(erro.response.status === 400){
        alert("O campo está vazio ou este nome já está em uso! Por favor insira um nome válido:")
        window.location.reload()
    }
}

postUser()


function getMessages(resposta){
    
    const promessa3 = axios.get('https://mock-api.driven.com.br/api/v6/uol/messages')
    promessa3.then(messagesHere)
}
setInterval(getMessages,3200)

function messagesHere(resposta) {
    texts = resposta.data
    console.log(texts)

    renderMessages()
} 


function renderMessages (){
    const ul = document.querySelector('.messages')
    ul.innerHTML=''

    for (let i=0;i<texts.length;i++){
        
        if(texts[i].type === 'message'){
            ul.innerHTML = ul.innerHTML + `
            <li class="message"><span class="hour">(${texts[i].time})</span><span class="user">${texts[i].from}</span>para<span class="user">${texts[i].to}:</span><span>${texts[i].text}</span></li>
        `
        }else if(texts[i].type === 'status'){
            ul.innerHTML = ul.innerHTML + `
            <li class="status"><span class="hour">(${texts[i].time})</span><span class="user">${texts[i].from}</span></span>${texts[i].text}</li>
        `
        }else{
            ul.innerHTML = ul.innerHTML + `
            <li class="private_message"><span class="hour">(${texts[i].time})</span><span class="user">${texts[i].from}</span>reservadamente para<span class="user">${texts[i].to}:</span>${texts[i].text}</li>
        `
        }

    }
     
}  

renderMessages()


function addMessage(){

    const texto = document.querySelector('.writen')
    /* if (texto !== ''){ */
        const newMessage = {
            from: user,
            to: "Todos",
            text: texto.value,
            type:"message"
        }
        const promessa5 = axios.post('https://mock-api.driven.com.br/api/v6/uol/messages',newMessage)
        promessa5.then(eraseInput)
   /*  }else{
        alert("A mensagem encontra-se em branco")
    } */
 
} 

let chat;
let lastMessage;

function alwaysOnDisplay(){

    let chat = document.querySelector('li:nth-last-child(-n+1)')
    chat.scrollIntoView()
    console.log(chat)
}

setInterval(alwaysOnDisplay,3300) 

function eraseInput(){
    const write = document.querySelector('.writen') 
    write.value = ''
}
