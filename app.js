window.onload = () => {
    div = null;
    main();
}

function main(){
    const cpButton = document.querySelector('#copyButton');
    const chButton = document.querySelector('#changeButton');
    const body = document.querySelector('body');
    const input = document.querySelector('#inp');

    chButton.addEventListener('click',function(){
        let hexColor = generateHexColor();
        input.value = hexColor.substring(1);
        body.style.backgroundColor = hexColor;
    })

    cpButton.addEventListener('click',function(){
        navigator.clipboard.writeText(`#${input.value}`);
        if (div != null) {
            div.remove();
            div = null;
        }
        if (isHexValid(input.value)){
            generateToastMessage(input.value);
        }else{
            alert(`invalid Hexcode`);
        }
        
    })
    
    input.addEventListener('keyup',function(e){
        const color = e.target.value;
        if (color){
           input.value = color.toUpperCase();
         }
        if (isHexValid(color)) {
            body.style.backgroundColor = `#${color}`;
        }
    });
}



function generateHexColor(){
    let red = Math.round(Math.random()*255);
    let green = Math.round(Math.random()*255);
    let blue = Math.round(Math.random()*255);
    return `#${red.toString(16)}${green.toString(16)}${blue.toString(16)}`;
}


function generateToastMessage(msg){
    div = document.createElement(`div`);
    div.innerHTML = `#${msg} copied`;
    div.className = `toast-message toast-message-slide-in`;
    div.addEventListener('click',function (){
        div.classList.remove("toast-message-slide-in");
        div.classList.add("toast-message-slide-out");
        div.addEventListener('animationend',function (){
            div.remove();
            div = null;
        })
    })
    document.body.appendChild(div);
}


function isHexValid(color){
    if (color.length != 6) return false;
    return /^[0-9A-Fa-f]{6}$/i.test(color);
}