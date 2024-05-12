## Additional Work:

### HTML:
I had to make changes to achieve a 100% accesibility score in lighthouse:
- Add placeholders in all text boxes to provide extra context or clarity. THis may be needed for visually impared users
  - searchpeople.html - lines 53 and 57
  - searchcars.html - line 54
  - newcars.html - lines 60, 62, 64, 66, 76, 78, 80, 82, 84, 86
- The text in the header needed to change colour to have a contrasting colour to the background to be easily read
  - styles.css - lines 22 and 33

### CSS:
To make the front end feel responsive i had to:
- Use 'vh' and 'vw' to specify sizes and padding amounts instead of pixels to adapt to different screen sizes
- Use media queries to change layouts, sizes, fontsizes, etc to fit on smaller screens
  - styles.css line 105 onwards
 
### JavaScrpit and Database:
I made additional playwright tests for untested conditions (additional-tests.spec.js):
- invalid people searches - This checked that when both input fields where empty or both were filled, an error message was displayed and no results were shown
- missing people searches - This checked that when a person wasn't found in the database, no results were shown and the message 'No result found' is shown
- invalid vehicle searches - This checked that when the input field was left empty, an error message was displayed and no result was shown
- missing vehicle searches - This checked that when a vehicle wasn't found in teh database, no result was shown and the message 'No result found' is shown
- invalid vehicle added - This checked that if any field was left empty, an error message would be shown

