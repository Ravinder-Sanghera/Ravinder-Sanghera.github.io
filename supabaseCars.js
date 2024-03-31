import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";
const supabase = createClient("https://czibkypjyfbtsxpigztg.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN6aWJreXBqeWZidHN4cGlnenRnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTE4MDY1MjYsImV4cCI6MjAyNzM4MjUyNn0.Eizv6pKn1tqGNwJ676SeIqQnKrqNJHy8Uo-Dej6G14s");

async function Search(){
    const searchQuery = document.getElementById("searchInput").value;

    const {data, error} = await supabase
        .from("Vehicles")
        .select("*")
        .eq(VehicleID, searchQuery);

    if (error){
        console.log("error");
        return;
    }
    if (!data){
        return;
    }

    const output = document.getElementById("output");
    output.innerHTML = "";

    const line = document.createElement("li");
    line.textContent = `VehicleID: ${Row.VehicleID},  Make: ${Row.Make},  Model: ${Row.Model},
                        Colour: ${Row.Colour}, Expiry Date: ${Row.ExpiryDate}`;

    const {data2, error2} = await supabase
        .from("People")
        .select("Name", "LicenseNumber")
        .eq(PersonID, data.OwnerID);

    const line2 = document.createElement("li");
    line2.textContent = `Owner Name: ${data2.Name}, Owner's License ID: ${data2.LicenseNumber}`;
    
    output.appendChild(line);
    output.appendChild(document.createElement("br"));
    output.appendChild(line2);
        
}
    
document.getElementById("searchButton").addEventListener("click", Search);
    
    

