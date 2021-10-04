var loginDiv=document.querySelector('.login-form')
var registerDiv=document.querySelector('.register-form')

var registerShortcut=document.getElementById('register-shortcut')
var loginShortcut =document.getElementById('login-shortcut')

registerShortcut.onclick=()=> {
    registerDiv.style.display="block";
    loginDiv.style.display="none";
}

loginShortcut.onclick=()=> {
    registerDiv.style.display="none";
    loginDiv.style.display="block";
}
