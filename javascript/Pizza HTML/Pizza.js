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
    }
});
