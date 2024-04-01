import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";
const supabase = createClient("https://czibkypjyfbtsxpigztg.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN6aWJreXBqeWZidHN4cGlnenRnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTE4MDY1MjYsImV4cCI6MjAyNzM4MjUyNn0.Eizv6pKn1tqGNwJ676SeIqQnKrqNJHy8Uo-Dej6G14s");

async function Search(){
    const searchQuery = document.getElementById("searchInput").value;

    const {data, error} = await supabase
        .from("Vehicles")
        .select("*")
        .eq("VehicleID", searchQuery);

    if (error){
        console.log("error");
        return;
    }
    const output = document.getElementById("output");
    output.innerHTML = "";

    if (!data || data.length === 0){
        const notFound = document.createElement("li");
        notFound.textContent = "Vehicle not found.";
        output.appendChild(notFound);
        return;
    }
    
    const car = data[0];
    
    const line = document.createElement("li");
    line.textContent = `VehicleID: ${car.VehicleID},  Make: ${car.Make},  Model: ${car.Model},
    Colour: ${car.Colour}`;
    output.appendChild(line);

    const {data: data2, error: error2} = await supabase
        .from("People")
        .select("*")
        .eq("PersonID", car.OwnerID);

        if (error2){
            console.log("error", error2);
            return;
        }
        if (!data2 || data2.length === 0){
            const notFound = document.createElement("li");
            notFound.textContent = "Owner Unknown.";
            output.appendChild(notFound);
            return;
        }

    const line2 = document.createElement("li");
    line2.textContent = `Owner Name: ${data2[0].Name}, Owner's License ID: ${data2[0].LicenseNumber}`;
    
    output.appendChild(document.createElement("br"));
    output.appendChild(line2);
        
}
    
document.getElementById("searchButton").addEventListener("click", Search);
    
    

