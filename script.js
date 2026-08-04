function generatePassword(){

let length=document.getElementById("length").value;

if(length<4){

alert("Password length must be at least 4");

return;

}

const lowercase="abcdefghijklmnopqrstuvwxyz";

const uppercase="ABCDEFGHIJKLMNOPQRSTUVWXYZ";

const numbers="0123456789";

const symbols="!@#$%^&*()_+{}[]<>?/";

const all=lowercase+uppercase+numbers+symbols;

let password="";

password+=lowercase[Math.floor(Math.random()*lowercase.length)];

password+=uppercase[Math.floor(Math.random()*uppercase.length)];

password+=numbers[Math.floor(Math.random()*numbers.length)];

password+=symbols[Math.floor(Math.random()*symbols.length)];

for(let i=4;i<length;i++){

password+=all[Math.floor(Math.random()*all.length)];

}

password=password.split('').sort(()=>0.5-Math.random()).join('');

document.getElementById("password").value=password;

}

function copyPassword(){

let pass=document.getElementById("password");

pass.select();

navigator.clipboard.writeText(pass.value);

alert("Password Copied!");

}