import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";
const supabase = createClient("https://czibkypjyfbtsxpigztg.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN6aWJreXBqeWZidHN4cGlnenRnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTE4MDY1MjYsImV4cCI6MjAyNzM4MjUyNn0.Eizv6pKn1tqGNwJ676SeIqQnKrqNJHy8Uo-Dej6G14s");

async function Search(){
    const searchQuery = document.getElementById("rego").value;
    const message = document.getElementById("message");
    const output = document.getElementById("results");
    output.innerHTML = "";

    if (searchQuery === ""){
        message.textContent =  'Error';
        return;
    }

    const {data, error} = await supabase
        .from("Vehicles")
        .select("*")
        .eq("VehicleID", searchQuery);

    if (error){
        console.log("error");
        return;
    }

    if (!data || data.length == 0){
        message.textContent =  'No result found';
        return;
    }
    
    const car = data[0];
    
    const div = document.createElement("div"); // Create a div
    div.textContent = `VehicleID: ${car.VehicleID},  Make: ${car.Make},  Model: ${car.Model},
    Colour: ${car.Colour}`;
    output.appendChild(div); // Append the div to the output container
    
    message.textContent =  'Search successful';

    const {data: data2, error: error2} = await supabase
        .from("People")
        .select("*")
        .eq("PersonID", car.OwnerID);

        if (error2){
            console.log("error", error2);
            return;
        }
        if (!data2 || data2.length == 0){
            return;
        }
    
    const div2 = document.createElement("div"); // Create a div
    div2.textContent = `Owner Name: ${data2[0].Name}, Owner's License ID: ${data2[0].LicenseNumber}`;
    output.appendChild(div2); // Append the div to the output container
        
}
    
document.getElementById("searchButton").addEventListener("click", Search);
    
    

