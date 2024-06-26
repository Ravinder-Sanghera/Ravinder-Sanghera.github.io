import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";
const supabase = createClient("https://czibkypjyfbtsxpigztg.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN6aWJreXBqeWZidHN4cGlnenRnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTE4MDY1MjYsImV4cCI6MjAyNzM4MjUyNn0.Eizv6pKn1tqGNwJ676SeIqQnKrqNJHy8Uo-Dej6G14s");

async function Search(){
    const message = document.getElementById("message");
    message.textContent =  '';
    const output = document.getElementById("results");
    output.innerHTML = "<h2>Results:</h2>";
    
    const searchQueryP = document.getElementById("name").value;
    const searchQueryL = document.getElementById("license").value;
    if (searchQueryL === "" && searchQueryP === ""){
        message.textContent =  'Error';
        return;
    }
    else if (searchQueryL != "" && searchQueryP != ""){
        message.textContent = 'Error';
        return;
    }
    
    else if (searchQueryL === ""){
        const {data, error} = await supabase
            .from("People")
            .select("*")
            .ilike(`Name`, `%${searchQueryP}%`);
    
        if (error){
            console.log("error");
            return;
        }

        print(data)
    }
    else{
        const {data, error} = await supabase
            .from("People")
            .select("*")
            .eq('LicenseNumber', searchQueryL);
    
        if (error){
            console.log("error");
            return;
        }
        print(data)
  
    }
    
}

function print(data){
    let found = false;
    const message = document.getElementById("message");
    const output = document.getElementById("results");
    output.innerHTML = "<h2>Results:</h2>";

    for (const Row of data){
        const div = document.createElement("div"); // Create a div for each row
        div.textContent = `Name: ${Row.Name},   Address: ${Row.Address},   DOB: ${Row.DOB}, 
        LicenseNumber: ${Row.LicenseNumber},   Expiry Date: ${Row.ExpiryDate}`;
        output.appendChild(div); // Append the div to the output container
        found = true;
    }
    if (!found){
        message.textContent =  'No result found';
    }
    else{
        message.textContent =  'Search successful';
    }
}
    
document.getElementById("searchButton").addEventListener("click", Search);
    
    

