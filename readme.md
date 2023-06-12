Brad Balassaitis \
CS 601 - Final project \
Summer 1 - 2023 
<br><br>



# About

This project fulfills and exceeds the requirements the course final project. It is a website about key aspects of my life.
<br><br>

## Site Pages

| Page | Description |
| ----- | ----- |
| **Index** | Home Page with a brief overview |
| **Family** | Overview of my family, including our journey with fostering and adoption |
| **Locations** | List of areas where I've lived, including embedded Google Maps |
| **Education** | Overview of my undergraduate and graduate education |
| **Career** | List of some of the more well-known places that I've worked |
| **Fandom** | Overview of the recent success of my favorite pro sports teams |
| **Favorite Players** | List of some of my favorite players. Stored in a NoSQL database. Provides the ability to view the list, add players, delete players, and filter the list by team. Last selected filter is stored in LocalStorage. |
| **Martial Arts** | Overview of my martial arts experience |
| **Chuck Norris Joke** | Simple API call to display a random Chuck Norris joke. (Note: some are a little offensive) |
| **Stock Prices** | Allows the user to enter one or more stock symbols, then makes an API call to check stock prices. |
<br>

*Note: I am a Dad of many children, so I can't help but sneak a bunch of puns in. Most of them can be seen in the window/tab titles. One of the puns doesn't seem to fit the context as well as the others, but it was actually the title of a [presentation I gave](https://www.slideshare.net/balassaitis/the-grid-the-brad-and-the-ugly) at a conference a few years ago*
<br><br>

## Project Structure
<br>

	CS601_FINALPROJECT_Balassaitis
		|__ assets
			|__images
			|__scripts
			|__styles
			|__video

<br>

## Running the Site

The repository is stored on Github and the site is hosted with Github Pages

https://bu-balassaitis.github.io/CS601_FinalProject_Balassaitis/

<br>

# Above & Beyond

## HTML5 & CSS
- Extensive use of **HTML5 semantic elements** throughout (header, footer, main, section, article, aside, figure, figcaption)
- Requirement was 5-10 pages; this site contains 10, many with substantial content
- **HTML** form on the Players page includes form validation and disabling the submit button until validation passes. Fields failing **validation** are outlined in red and an error message is displayed on the page.
- **CSS**
	- Over 600 lines of CSS throughout
	- Modularized styling into 6 style sheets to keep them organized and manageable, but included others in the main stylesheet, so I can use all 6 of them, but only have to add 1 stylesheet to the pages 
	- **CSS Variables** for 2 nonstandard colors in the Dr Pepper color palette defined and used in header: 
		--drpepper-dark: #711f25;
		--drpepper-light: #d51143;
	- I found a "Hello My Name is Brad" image to use, but didn't have rights, so I used CSS to make something similar on the index page
	- Set cursor to be a crosshair on links
	- Set nav list to look like buttons and have reversing colors on hover
	- **h1** -- added gradient background, padding, kerning, font weight
	- **paragraphs** -- played with styling to figure out how to make the first letter of the first paragraph of each section or article to be twice the size of the other text in the paragraph. Never saw two chained psuedoselectors, so I didn't realize it was possible.
	- **figures** -- maybe going a bit overboard, but trying things out. I've added hover effects to include a bigger drop shadow with a different color as well a scaling the picture up 25%
	- **tables** -- added CSS to style tables -- horizontal borders, table header styles, alternate row color, separte color on row hover, smaller relative font sizes, padding
	- Added a **print style sheet** that hides the header, footer, video, and sets the body and main margins to 0

<br>

## Layout and Responsive Web Design
- Used **CSS Grids** on 6 pages (Education, Family, Fandom, Locations, Players, Stock Prices)

- Implemented 4 different **media queries** that adjust the navigation and grid layouts at varying screen sizes (layout.css)

- Hamburger Menu
	- Added hamburger menu based on: https://alvarotrigo.com/blog/hamburger-menu-css-responsive/
	- Added comments throughout the CSS to demonstrate my understanding of the implementation and customized to fit within my site's styling

- media queries at 480px and 768px breakpoints
	- change all grids to a single column
	- remove the section border
	- relative font size adjustments
	- different bg color so it's clear when the new set of styles is being picked up

- media query at 1024px
	- changes navigation links to a smaller font and margin sizes to fit in a smaller area

- media query at 1366px
	- changes some 3-column grids to 2 columns
	- changes some grids to 1 column
<br><br>


## JavaScript - ES6 Features Used
<br>

- `let` & `const` used throughout all script
- `fetch` API used in database and chuck norris joke API code
- Template Strings used in several places -- most importantly when dynamically generating HTML tables in several places
- `localStorage` used in database API code
- `async`/`await` used in database API code
- arrow functions with `async`/`await` used in database API code
- Object constructor used in database api code to build a Player object from the data on the form
- `for...of` loops used in database and stock price API code
<br><br>
## DOM Manipulation
There are several places where API calls write data to the page in a data `div` or an error `div`

Form valiation writes error message next to fields that fail validation

<br>

## APIs
There are three different external APIs used by the site. All three were initially implemented with `XMLHttpRequest`, but 2 were refactored to use `fetch` with `async`/`await`.
<br><br>

### Static API
<br>

Added a page with a button to make an API call to get and display a random Chuck Norris joke

This uses an `XMLHttpRequest` to make the API call, then parse and display the response on the page
<br><br>

### Simple Interactive API
<br>

Going a step further, the Stock Prices page has a more dynamic API call to check prices

- The user can enter one or more stock symbols (comma-separated)
- When the button is clicked, it will make the API call, parse the results, and display them in a table on the page dynamically
- Added on-screen error messages to display if either no symbols are entered or if invalid symbols are entered
- Tested these cases succesfully:

	| Case | Result |
	| --- | --- |
	| No stock symbols entered | Displays a message that no data was found |
	| Invalid stock symbol entered | Displays a message that no data was found |
	| Mix of invalid and valid stock symbols entered | Displays data for the valid symbols only |

<br>

### Complex Database API
<br>

- Created a NoSQL database at restdb.io to provide persistence for the data used on this page
- Displays a list of favorite players from the database
- Includes a form to add a player to the list (then display the updated list)
	- Set auto-focus to first field and tab index of input fields
	- Has validation on the first two required fields -- displays msgs and changes field border to red
- Player display includes an icon in each row of player data to delete that player
- Drop-down to filter by team
	- The drop-down is automatically populated with a (unique) list of teams based on the actual data
	- When a new selection is made, it re-runs the query and filters the results
- Using `localStorage` to store team filter
	- Does this to pre-set the drop-down and remember it between sessions when re-loaded as well
<br><br>

## Vue
- The project requirement was for a 1 single Vue component, but this site includes 2 components (header & footer) that are shared across all 10 pages

<br>

# Challenges

1. UI Design is not my forte. I have more trouble with choosing colors and fonts than implementing a grid. UI design is such a different skillset than coding/implementation. It's hard not to waste time trying to make things look better. To get moving on this assignment, I decided to use a color scheme based on the dr pepper logo so at least color choices were taken care of.

2. Knowing when to stop...when I learn new things, the ideas just keep flowing. The majority of the time spent on this project was on Above & Beyond tasks. It's hard to stop when there are more ideas and time.

3. Main menu navigation -- I started with a certain design and then it was hard to get all of the nav links to fit in some ranges when there were 10 links. I added a hamburger menu for smaller screen sizes, but also had to make some font size and margin adjustments with media queries before getting to that point.

4. Figuring out vue.js (two weeks before the week 6 lecture)
	I got an in-page simple example working fairly quickly
	I was able to externalize a simple example
	I then worked on turning the footer into a reusable component
	I ended up trying to use the SFC syntax without realizing a more complicated build process would be needed
	I ran into some challenges binding variables in the footer component because it didn't want to interpolate for attribures like href on a couple of links
	I then had to figure out how to initialize two separate components on differnet parts of the page, but I eventually figured it out
	I'm sure I could have kept it simpler to get credit for using Vue, but I wanted to do some meaningful learning and the struggle was worth it to get a better understanding

5. Coordinating multiple API calls
It was a challenge getting two separate API calls going out separately and waiting for both to come back with data
I probably overdid it with the async and wait calls at several levels, but it took a lot of tweaking to get it working


6. I had trouble putting a YouTube video on the Fandom page. It wouldn't load properly with a `<video>` tag or an `<embed>` tag with source directly from YouTube. But I didn't have any more time to fool with it, so I just made it an external link, which works fine.  (I have a separate `<video>` tag still in the site on the martialarts page.)

7. Working through linter limitations (detailed below)
<br><br>


# Linting Notes
- jslint.com was used to lint the code
- The following options need to be enabled to suppress unrelevant warnings:
	- browser
	- devel
	- fart
	- for
	- long
	- single
	- this
	- unordered
	- white
- Even with these settings, there are some anomalies:
	1. It does not handle for...of loops properly. It's flagging the variable declaration as an error (it is not okay with let,var, or const)
	2. The linter chokes on arrow functions with single parameters if they don't have parentheses around the single parameter, so I added them throughout so the rest of the linting could compelete

<br>


# Image Attributions
1. Drexel University
Image from https://commons.wikimedia.org/wiki/File:Drexel-logo.png, used with Creative Commons Licnense

2. Boston University
Image from https://www.bu.edu/home/img/masterplate112x50.png, used BU faculty permission

3. Philadelphia Eagles
Image Source: http://clipart-library.com/clipart/Bcarng9Ri.htm -- Licensed for personal use

4. Philadelphia Phillies
Image Source:  http://clipart-library.com/clipart/8TApEjpTa.htm -- licensed for personal use

5. Philadelphia 76ers
Image Source:  http://clipart-library.com/clipart/6cr6MXzEi.htm -- licenced for personal use
