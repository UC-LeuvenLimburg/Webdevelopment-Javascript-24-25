$("header").load("header.html");

fetch('footer.html')
//.then(function(response){...})
 .then(response => {
    console.log(response);
    return response.text(); 
})
//.then(function(body){...})
 .then(body => {
    console.log(body);
    document.querySelector('footer').innerHTML = body;})


async function loadAside(){
    const response = await fetch('aside.html');
    console.log(response);
    const body = await response.text();  
    console.log(body);  
    return body;
}

loadAside()
     .then(body =>{document.querySelector('aside').innerHTML = body});