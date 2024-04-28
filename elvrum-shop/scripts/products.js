"use strict";

let products; // Declare products variable outside the scope

const container = document.querySelector(".main");

const xhr = new XMLHttpRequest();

xhr.onload = function() {
    if (xhr.status != 200) {
        container.textContent = "Verarbeitungsfehler";
        return;
    }
    
    if (xhr.responseType == "json") {
        products = xhr.response;
    } else {
        products = JSON.parse(xhr.responseText);
    }
    allIndex();
};

xhr.open("GET", "./products.json");
xhr.responseType = "json";
xhr.send();
