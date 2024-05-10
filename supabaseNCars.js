import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";
const supabase = createClient("https://czibkypjyfbtsxpigztg.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN6aWJreXBqeWZidHN4cGlnenRnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTE4MDY1MjYsImV4cCI6MjAyNzM4MjUyNn0.Eizv6pKn1tqGNwJ676SeIqQnKrqNJHy8Uo-Dej6G14s");

const OwnerDetails = document.querySelector(".owner-group");
const OwnerDetailsB = document.querySelector(".owner-group-button");
const output = document.getElementById("message");

function hideOwnerDetails(){
    OwnerDetails.style.display = "none";
    OwnerDetailsB.style.display = "none";
    output.textContent =  'Vehicle added successfully';
}
function showOwnerDetails(){
    OwnerDetails.style.display = "block";
    OwnerDetailsB.style.display = "block";
}

async function Submit2(){
    output.innerHTML = "";
    const reg = document.getElementById("rego").value;
    const make = document.getElementById("make").value;
    const model = document.getElementById("model").value;
    const colour = document.getElementById("colour").value;

    const name = document.getElementById("name").value;
    const id = document.getElementById("personid").value;
    const address = document.getElementById("address").value;
    const DOB = document.getElementById("dob").value;
    const license = document.getElementById("license").value;
    const expiry = document.getElementById("expire").value;

    if (name != "" && reg != "" && make != "" && model != "" && colour != "" && id != "" && address != "" && DOB != "" && license != "" && expiry != ""){
        const {error} = await supabase
            .from("Vehicles")
            .insert({VehicleID: reg, Make: make, Model: model, Colour: colour, OwnerID: id});
            
            const {error2} = await supabase
            .from("People")
            .insert({PersonID: id, Name: name, Address: address, DOB: DOB, LicenseNumber: license, ExpiryDate: expiry})
            
            hideOwnerDetails()
    }else{
        output.textContent =  'Error';
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

async function Submit(){
    output.innerHTML = "";
    const name = document.getElementById("owner").value;
    const reg = document.getElementById("rego").value;
    const make = document.getElementById("make").value;
    const model = document.getElementById("model").value;
    const colour = document.getElementById("colour").value;
    let ownerID = -1;

    console.log(name + reg + make + model + colour + ownerID);
    
    ownerID = await existingOwner(name);
    console.log(ownerID);

    if (ownerID == -1){
        showOwnerDetails();
    }else if (name != "" && reg != "" && make != "" && model != "" && colour != ""){
        const {error} = await supabase
            .from("Vehicles")
            .insert({VehicleID: reg, Make: make, Model: model, Colour: colour, OwnerID: ownerID});
        hideOwnerDetails()
    }else{
        output.textContent =  'Error';
    }
    
}



document.getElementById("Add").addEventListener("click", Submit);
document.getElementById("submitButton2").addEventListener("click", Submit2);