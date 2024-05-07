import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";
const supabase = createClient("https://czibkypjyfbtsxpigztg.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN6aWJreXBqeWZidHN4cGlnenRnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTE4MDY1MjYsImV4cCI6MjAyNzM4MjUyNn0.Eizv6pKn1tqGNwJ676SeIqQnKrqNJHy8Uo-Dej6G14s");

async function Search(){
    const searchQuery = document.getElementById("name").value;

    const {data, error} = await supabase
        .from("People")
        .select("*")
        .or(`Name.ilike.%${searchQuery}%`, `LicenseNumber.eq.${searchQuery}`);

    if (error){
        console.log("error");
        return;
    }

    const output = document.getElementById("results");
    output.innerHTML = "<h2>Results:</h2>";
    let found = false;

    for (const Row of data){
        const div = document.createElement("div"); // Create a div for each row
        div.textContent = `Name: ${Row.Name},   Address: ${Row.Address},   DOB: ${Row.DOB}, 
        LicenseNumber: ${Row.LicenseNumber},   Expiry Date: ${Row.ExpiryDate}`;
        output.appendChild(div); // Append the div to the output container
        found = true;
    }
    if (!found){
        const line = document.createElement("p");
        line.textContent = "Error: Not Found";
        output.appendChild(line);
        const message = document.getElementById("message");
        message.textContent =  'No result found';
    }
    else{
        const message = document.getElementById("message");
        message.textContent =  'Search successful';
    }
    
}
    
document.getElementById("searchButton").addEventListener("click", Search);
    
    

