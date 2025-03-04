//object Pizzas
var Pizzas = {
    Hawai: {
        price: 15,
        ingredients: ["tomatensaus", "mozzarella", "hesp", "ananas"]
    },
    Margherita: {
        price: 12.5,
        ingredients: ["tomatensaus", "mozzarella"]
    }
};

var ingredients = ["tomatensaus", "mozzarella", "hesp", "ananas"];

var winkelmandje = {};

//pizzas zou ook een array kunnen zijn
// var Pizzas = [
//     {  
//         name: "Hawai", 
//         price: 15, 
//         ingredients:["tomatensaus","mozzarella", "hesp", "ananas"]
//     }, 
//     {   
//         name: "Margherita",
//         price: 12.5, 
//         ingredients:["tomatensaus","mozzarella"]
//     }
// ];

// var winkelmandje = [];

function addItemToSelect(selectId, item) {
    let select = document.getElementById(selectId);
    let option = document.createElement("option");
    option.innerHTML = item;
    select.add(option);
    select.size = select.options.length;
}


function addList() {
    //bij object Pizzas
    for (let pizza in Pizzas) {
        addItemToSelect("pizzaLijst", pizza);
    }

    // bij array Pizzas
    // for (let pizza of Pizzas) {
    //     addItemToSelect("pizzaLijst", pizza.name);
    //     //addItemToSelect("pizzaLijst", pizza["name"]);
    // }

    for (let ingredient of ingredients) {
        addItemToSelect("ingredientenLijst", ingredient);
    }
}

addList();

document.getElementById("pizzaLijst").addEventListener("change", function () {
    document.getElementById("showPizzaName").innerHTML = this.value;
    // bij object
    document.getElementById("showPizzaDetails").innerHTML = "Prijs: " + Pizzas[this.value].price + "€";
    document.getElementById("showPizzaDetails").innerHTML += "<br>Ingrediënten: " + Pizzas[this.value].ingredients.join(", ");
    // bij array
    // for (let pizza of Pizzas) {
    //     if (pizza.name === this.value) {
    //         document.getElementById("showPizzaDetails").innerHTML = "Prijs: "+ pizza.price + "€";
    //         document.getElementById("showPizzaDetails").innerHTML += "<br>Ingrediënten: " + pizza.ingredients.join(", ");
    //     }
    // }
   
});


document.getElementById("orderPizza").addEventListener("click", function () {
    let aantal = +document.getElementById("aantal").value;
    let pizza = document.getElementById("pizzaLijst").value;
    console.log(pizza);

    if (isNaN(aantal) || aantal <= 0) {
        alert("Gelieve een positief aantal in te vullen");
    } else if (pizza == undefined || pizza == "") {
        alert("Gelieve een pizza te selecteren");
    } else {
        // bij object
        if (winkelmandje[pizza]) {
            winkelmandje[pizza].aantal += aantal;
            winkelmandje[pizza].prijs = winkelmandje[pizza].aantal * Pizzas[pizza].price; //alleen als Pizzas een object is
        } else {
            winkelmandje[pizza] = { aantal: aantal, name: pizza, prijs: aantal * Pizzas[pizza].price }; //alleen als Pizzas een object is
        }

        // bij array
        // let selectedPizza;
        // for (let pizzaItem of Pizzas) {
        //     if (pizzaItem.name === pizza) {
        //         selectedPizza = pizzaItem;
        //     }
        // }
        // console.log(selectedPizza);
        // let addPizza = true;
        // for (let item of winkelmandje) {
        //     if (item.name === pizza) {
        //         item.aantal += aantal;
        //         item.prijs = item.aantal * selectedPizza.price;
        //         addPizza = false;
        //     } 
        // }
        // if (addPizza) {
        //     winkelmandje.push({ aantal: aantal, name: pizza, prijs: aantal * selectedPizza.price });
        // }

        console.log(winkelmandje);
        toonWinkelmandje();
    }
});
function toonWinkelmandje(){
    let winkelmandjeDiv = document.getElementById("winkelmandje");
    
    while(winkelmandjeDiv.children.length > 2){
        winkelmandjeDiv.removeChild(winkelmandjeDiv.children[1]);
    }
    let totaal = 0;
    for (let item in winkelmandje) {
        // bij array
        // for (let item of winkelmandje) {
        let row = document.createElement("tr");
        let cellAmount = document.createElement("td");
        let cellName = document.createElement("td");
        let cellPrice = document.createElement("td");
        cellAmount.innerHTML = winkelmandje[item].aantal;
        cellName.innerHTML = item;
        cellPrice.innerHTML = winkelmandje[item].prijs + "€";
        // bij array
        // cellAmount.innerHTML = item.aantal;
        // cellName.innerHTML = item.name;
        // cellPrice.innerHTML = item.prijs + "€";
        row.appendChild(cellAmount);
        row.appendChild(cellName);
        row.appendChild(cellPrice);
        // row.innerHTML = "<td>" + winkelmandje[item].aantal + "</td><td>" + item + "</td><td>" + winkelmandje[item].prijs + "€</td>";
        winkelmandjeDiv.insertBefore(row, winkelmandjeDiv.lastElementChild);
    
        totaal += winkelmandje[item].prijs
        // bij array
        // totaal += item.prijs;
    }
    document.getElementById("totaal").innerHTML = totaal + "€";
}

document.getElementById("addPizza").addEventListener("click", function () {
    let pizzaName = document.getElementById("pizzaName").value;
    let pizzaPrice = +document.getElementById("pizzaPrijs").value;
    //let pizzaIngredients = document.getElementById("ingredientenLijst").value;
    
    if (pizzaName.length < 1) {
        alert("Gelieve een pizzanaam in te vullen");
    } else {
        for (let pizza in Pizzas) {
            if (pizza === pizzaName) {
                alert("Pizza bestaat al");
                return;
            }
        }
        if (isNaN(pizzaPrice) || pizzaPrice <= 0) {
            alert("Gelieve een positief prijs in te vullen");
        } else {
            let pizzaIngredients = [];
            let ingredienten = document.getElementById("ingredientenLijst").options;
            for (let i=0; i<ingredienten.length; i++) {
                if (ingredienten[i].selected) {
                    pizzaIngredients.push(ingredienten[i].value);
                }
            }
            console.log(pizzaIngredients);
            if (pizzaIngredients.length < 1) {
                alert("Gelieve minstens 1 ingredient te selecteren");
                return;
            }
            Pizzas[pizzaName] = { price: pizzaPrice, ingredients: pizzaIngredients };
            addItemToSelect("pizzaLijst", pizzaName);
        }
           
    }
});


document.getElementById("addIngredient").addEventListener("click", function () {

    let ingredientName = document.getElementById("ingredient").value;
    if (ingredientName.length < 1) {
        alert("Gelieve een ingredientnaam in te vullen");
    } else {
        for (let ingredient of ingredients) {
            if (ingredient === ingredientName) {
                alert("Ingredient bestaat al");
                return;
            }
        }
        ingredients.push(ingredientName);
        addItemToSelect("ingredientenLijst", ingredientName);
    }
});