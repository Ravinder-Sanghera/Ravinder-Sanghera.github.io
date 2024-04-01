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




// document.getElementById("submitButton").addEventListener("click", Submit);