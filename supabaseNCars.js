import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";
const supabase = createClient("https://czibkypjyfbtsxpigztg.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN6aWJreXBqeWZidHN4cGlnenRnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTE4MDY1MjYsImV4cCI6MjAyNzM4MjUyNn0.Eizv6pKn1tqGNwJ676SeIqQnKrqNJHy8Uo-Dej6G14s");

const OwnerDetails = document.querySelector(".OwnerDetails");

function hideOwnerDetails(){
    OwnerDetails.style.display = "none";
}
function showOwnerDetails(){
    OwnerDetails.style.display = "block";
}

const checkbox = document.getElementById('toggle');
checkbox.addEventListener('click', function (){
    if (checkbox.checked){
        showOwnerDetails();
    } else{
        hideOwnerDetails();
    }
});

async function newOwner(name){
    const address = document.getElementById("Address").value;
    const DOB = document.getElementById("DOB").value;
    const license = document.getElementById("License").value;
    const expiry = document.getElementById("Expiry").value;

    const {data, error} = await supabase
        .from("People")
        .insert({Name: name, Address: address, DOB: DOB, LicenseNumber: license, ExpiryDate: expiry})
        .select();
    if (error){
        return -1;
    }else{
        return data[0].PersonID;
    }
}

async function existingOwner(name){
    const {data, error} = await supabase
        .from("People")
        .select("*")
        .ilike("Name", `%${name}%`);
    if (error){
        return -1;
    }
    try{
        return data[0].PersonID;
    }catch{
        return -1;
    }
}

function notFound(output){
    const line = document.createElement("p");
    line.textContent = "Error: Name not Found";
    output.appendChild(line);
}

async function Submit(){
    const output = document.getElementById("error");
    output.innerHTML = "";
    const name = document.getElementById("Name").value;
    const reg = document.getElementById("RegInput").value;
    const make = document.getElementById("MakeInput").value;
    const model = document.getElementById("ModelInput").value;
    const colour = document.getElementById("ColInput").value;
    let ownerID;
    if (checkbox.checked){
        ownerID = await newOwner(name);
    }else{
        ownerID = await existingOwner(name);
        if (ownerID == -1){
            notFound(output);
            return;
        }
    }
    const {error} = await supabase
        .from("Vehicles")
        .insert({VehicleID: reg, Make: make, Model: model, Colour: colour, OwnerID: ownerID});
}



document.getElementById("submitButton").addEventListener("click", Submit);