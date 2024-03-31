import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";
const supabase = createClient("https://czibkypjyfbtsxpigztg.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN6aWJreXBqeWZidHN4cGlnenRnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTE4MDY1MjYsImV4cCI6MjAyNzM4MjUyNn0.Eizv6pKn1tqGNwJ676SeIqQnKrqNJHy8Uo-Dej6G14s")

async function Search(){
    const searchQuery = document.getElementById("searchInput").value;

    const { data, error } = await supabase
    .from("People")
    .select("Name", "Address", "DOB", "LicenceNumber", "ExpiryDate")
    .or(
        //supabase.ilike("Name", "*${searchQuery}*"),
        supabase.eq("LicenceNumber", searchQuery)
    );

    console.log(data);
    
}

document.getElementById("searchButton").addEventListener("click", Search);




