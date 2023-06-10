Brad Balassaitis
CS 601 -- Final project
Summer 1 - 2023



*************************************************************************************************************
*************************************************************************************************************

					UPDATE DOCUMENTATION

*************************************************************************************************************
*************************************************************************************************************
[CSS]
Print stylesheet
	[ ] WHERE USED?

[RWD]
	> grids
	> hamburger Menu
	> changes font sizes in some cases


[Hamburger Menu]
> Added hamburger menu based on: https://alvarotrigo.com/blog/hamburger-menu-css-responsive/
> Added comments throughout the CSS to demonstrate my understanding of the implementation
> Customized to fit within my site's styling

[Location Page]
> Added a page to show the regions that I've lived in
> Pages use embedded Google maps to show the suburbs and the proximity to the closest major city
> This page uses a responsive grid layout

[Static API]
> Added a page with a button to make an API call to get and display a random Chuck Norris joke.
This uses an XMLHttpRequest to make the API call, then parse and display the response.

[Interactive API]
> Going a step further, added another page with a more interactive API call to check stock prices.
The user can enter one or more stock symbols (comma-separated).
When the button is clicked, it will make the API call, parse the results, and display them in a table on the page dynamically
> NOTE: This logic to build the table uses the new ES6 syntax for looping
> Added on-screen error messages to display if either no symbols are entered or if invalid symbols are entered
> Tested these cases succesfully:
	No stock symbols entered:  Displays a message that no data was found
	Invalid stock symbol entered: Displays a message that no data was found
	Mix of invalid and valid stock symbols entered: Displays data for the valid symbols only


IN PROGRESS
			[Form and Database Interaction]
			> Created a NoSQL database at restdb.io to power this page
			> Displays a list of favorite players from the database
			> Has a form to add to the list. Then displays the updated list.
				> Set auto-focus to first field and tab index of input fields
				> Has validation on the first two required fields -- displays msgs and changes field border to red
				> Has icon in each row of player data to delete that player
			> Drop-down to filter by team?
				> auto-builds drop-down with list of teams from actual data (unique list)
				> on change of drop-down, re-runs the query and filters the results
			> Using local storage to store team filter
				Does this to pre-set the drop-down and remember it between sessions when re-loaded as well
			

ES6 Features
	> fetch API in database API code and chuck norris joke api code
	> template string for handling error messages on database API call in ___  (METHOD)
	> local storage in database API code
	> async/await in database API code
	> arrow functions with async/await in database API code
	> Object constructor in database api code


[DOM Manipulation]
[ ] MAKE NOTE OF REFERENCES TO CODE SEARCHING FOR ELEMENTS AND SETTING innerHTML to populate error messages and HTML tables dynamically after making API calls
[ ] Selections by ID (and class name?)
Players page -- writes table of player data from DB into a driven

> CHALLENGES -- Main menu navigation -- hard to get all of the nav links to fit in some ranges
	> hamburger menu works wells, there's just a point between _____px and _____px

> CHALLENGE -- figuring out vue.just
	I got an in-page simple example working fairly quickly
	I was able to externalize a simple example
	I then worked on turning the footer into a reusable component
	I ended up trying to use the (?SFC?) syntax without realizing a more complicated build process would be needed
	I ran into some challenges binding variables in the footer component because it didn't want to interpolate for attribures like href on a couple of links
	I then had to figure out how to initialize two separate components on differnet parts of the page, but I eventually figured it out
	I'm sure I could have kept it simpler to get credit for using Vue, but I wanted to do some meaningful learning and the struggle was worth it to get a better understanding


> CHALLENGE
	Getting two separate API calls going out separately and waiting for both to come back with data
	I probably overdid it with the async and wait calls at several levels, but it took a lot of tweaking to get it working



[LINTING NOTES]
> jslint.com was used to lint the code
> Notes:
	The following options need to be enabled to suppress unrelevant warnings:
		browser, devel, fart, for, long, single, this, unordered, white
	Even with these settings, there are some anomalies:
		1) It does not handle for...of loops properly. It's flagging the variable declaration as an error (it is not okay with let,var, or const)
		2) The linter chokes on arrow functions with single parameters if they don't have parentheses around the single parameter, so I added them throughout so the rest of the linting could compelte



[About]

This project fulfills and exceeds the requirements for homework assignments #1-2. It is a website about key aspects of my life.

Note: I am a Dad of many children, so I can't help but sneak a bunch of puns in. Most of them can be seen in the window/tab titles. One of the puns doesn't seem to fit the context as well as the others, but it was actually the title of a presentation I gave at a conference a few years ago (https://www.slideshare.net/balassaitis/the-grid-the-brad-and-the-ugly)


[Project Structure]

	CS601_HW_Balassaitis
		|__ assets
			|__images
			|__scripts
			|__styles
			|__video



[Running the Site]

Extract the zip file, open the base project folder, and open index.html in the browser.

The consistent navigation bar at the top will allow the user to reach any page from any other page.


/*********************************
			WEEK 2
**********************************/

[Above & Beyond]

> I spent a lot of time styling a lot of things throughout the site. There are over 330 lines of CSS altogether

> Folder structure (added /styles/ folder for CSS files)

> Modularized styling into 6 style sheets to keep them organized and manageable, but included others in the main stylesheet, so I can use all 6 of them, but only have to add 1 stylesheet to the pages 

> CSS Variables for 2 nonstandard colors in the Dr Pepper color palette defined and used in header: 
	--drpepper-dark: #711f25;
	--drpepper-light: #d51143;

> Set cursor to be a crosshair on links

> Set nav list to look like buttons and have reversing colors on hover

> Floated the link to the top in the footer

> h1 -- added gradient background, padding, kerning, font weight

> paragraphs -- played with styling to figure out how to make the first letter of the first paragraph of each section or article to be twice the size of the other text in the paragraph. Never saw two chained psuedoselectors, so I didn't realize it was possible.

> figures -- maybe going a bit overboard, but trying things out. I've added hover effects to include a bigger drop shadow with a different color as well a scaling the picture up 25%

> tables -- added CSS to style tables -- horizontal borders, table header styles, alternate row color, separte color on row hover, smaller relative font sizes, padding

> layout -- added three different grid layouts on the education and family and fandom pages

> media queries at 480px and 768px breakpoints
	> both change the grid to a single column
	> both remove the section border
	> each has relative font size adjustments
	> each has a different bg color so it's clear when the new set of styles is being picked up
	> 768 - menu adjustments to shrink links and header styling to save space

> media query at 1366px
	> changes 3-column grid to 2 columns

> Added a print style sheet that hides the header, footer, video, and sets the body and main margins to 0



[Challenges]

(1) Design -- I have more trouble with choosing colors and fonts than implementing a grid. UI design is such a different skillset than coding/implementation. It's hard not to waste time trying to make things look better. To get moving on this assignment, I decided to use a color scheme based on the dr pepper logo so at least color choices were taken care of.

(2) Margins -- it's a challenge to figure out all of the various margin settings at different levels and differnt screen sizes
	> Set body margin and padding to 0 to fix the header and footer in place and take up full screen width
	> Gave some left margin to sections for readability, but then smaller screen sizes had some content going off the screen
	> There was a small band (high 700px) where some content was a bit cut off on the right, but I made some adjustments to get it almost good at all sizes.

(3) RWD -- It was a challenge conceputalizing the order to list media queries for different screen sizes took some testing and tweaking. I also spent a little time trying to learn how to set properties at the lowest or highest valid setting and not repeat them at other settings when not necessary. This was a good learning experience.

(4) Image Licensing -- It took a little time to find images that I could use, license-wise. I couldn't find a good BU logo or pic to use, but I saw the usage guidelines and it said that staff or faculty could grant permission to a student. I sent you an email at the time I'm writing this, so I'm under the assumption that I can use it
	> Also, I knew I wouldn't be able to find a free name tag image with my name on it (on index.html), so I just created something similar with CSS

(5) Time! -- It is very easy to get lost in the weeds tweaking CSS. I have more ideas, but, unfortunately, need to sleep and work...
	> Specifically, I would love to have had the time to implement a hamburger menu or work on adjusting image sizes as the viewport scaled down, but I did not have time.

(6) RWD -- I'm pretty happy with how much I was able to get the pages to be responsive given the time contraints. The one thing that bugs me at the moment (aside from image sizing) is that there's a small window (769px - 828px) where one nav link wraps and messes up the spacing at the top. But some settings to scale down kick in at 768px.


[Image Attributions]
[1] Drexel University
Image from https://commons.wikimedia.org/wiki/File:Drexel-logo.png, used with Creative Commons Licnense

[2] Boston University
Image from https://www.bu.edu/home/img/masterplate112x50.png, used *pending* BU faculty/staff permission

[3] Philadelphia Eagles
Image Source: http://clipart-library.com/clipart/Bcarng9Ri.htm -- Licensed for personal use

[4] Philadelphia Phillies
Image Source:  http://clipart-library.com/clipart/8TApEjpTa.htm -- licensed for personal use

[5] Philadelphia 76ers
Image Source:  http://clipart-library.com/clipart/6cr6MXzEi.htm -- licenced for personal use


/*********************************
			WEEK 1
**********************************/


[Above & Beyond]

> There are significantly more than 5-7 semantic elements on almost every page
> Instead of 3 pages, I created 6
> I actually wrote up a lot of content on several of the pages
> I added a link in the footer of each page to jump to the top of the page
> I set up all external links to open in a new tab/window
> I added an icon to visually inform the user that external links will open in a separate tab/window
> I added a <p> tag for alt text in the video
> There is more than 1 table
> There is more than 1 list
> I put all images within <figure> tags an added <figcaption> tags within them
> I added some cross-page hash links to jump to specific places on other pages
> The footer contains a <details> tag with a summary 
> I used <em> in a couple of places and <mark> in one place


[Challenges]

(1) It wasn't complicated, but I was surprised by an issue that the validator picked up, because I saw several instances of this message: "no p element in scope but a p end tag seen"

These message were seen in cases where I opened a p tag, then included some text and then included a list or table, and then closed the p tag. I assumed that p could contain other block elements, but the validator called these errors, so I closed the p tags earlier to pass validation.

(2) From a general development perspective, it kind of hurts to have so many copies of reusable sections like headers, footers, and navigation. I know this will be streamlined when we get to a UI framework that can reuse components. It just feels wrong to have all of this duplication!

(3) I had trouble putting a YouTube video on the Fandom page. It wouldn't load properly with a <video> tag or an <embed> tag with source directly from YouTube. But I didn't have any more time to fool with it, so I just made it an external link, which works fine.  (I have a separate <video> tag still in the site on the martialarts page.)

(4) I am way too driven to overachieve. I'm exhausted and scrambling to complete week 1 after getting a late start due to travel and my daughter's graduation, but I still had to create extra pages and probably way more content than was necessary. But I'd rather overdo it than leave any points on the table. (Plus, I know it won't be wasted effort, since the final project will need to be larger.)


[Outstanding Question]

I wasn't clear on how to properly attribute images downloaded from other sites. I did so by indicating the URI of the source in a comment before the img tag. Is there a better way that this should have been handled?