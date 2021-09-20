# rave-reviews

## Local Development
### Dependencies
You will need to have node installed to run the app (I'm using v14, I believe >= v12
should work).

### Running the app
First make sure all dependencies are installed. Navigate to the main folder and 
run `npm install`. Once that is complete, to run the application you just run
`npm run dev` (also from the main directory). The webapp can be accessed
 at http://localhost:3000

### Running tests
Tests can be run by navigating to the main directory and running `npm run test`. The server
cannot be running at the same time.

## Design decisions & Future work
### Database
I opted to just use some local json files for storing data. That was going to be much
quicker and easier for me for this project. Obviously if this were ever turned into a 
real application you would want to setup an actual database.

### Ratings storage
I chose to store the ratings as a float between 0 and 1. I liked that approach because then you could change your scale (5 stars, 10 stars, 100 stars, etc.) and previous ratings could easily be applied.

You do lose some information though, you don't know what the rating scale was at the time the review was saved. There would be a couple ways to store that information if you wanted to. You could store the scale as a field on each review object, though that would be a lot of duplicated data you are saving. You could also store the time at which the review was made, and if you keep your own internal history of the scale's over time then you could have some logic to determine what the scale was for that particular review.

For this app I decided to keep it simple and just store the rating and that is all.

### Express server
I chose express for the server since it's pretty easy to setup and add some api endpoints. I did not want to have a ton of overhead, wanted to keep that as straightforward as possible.

### Client structure
If I were to redo this project, I would add more structure to the client from the beginning. I'm familiar with some libraries that setup frontends for you (like `create-react-app`) but I'm not aware of anything like that for just a plain old vanilla js app. I'm sure there are some tools out there though, and utilizing that from the beginning to get the skeleton code setup could have been useful.

I would also look into client-side component libraries. Again, for react I know a good one is `Material UI`. I'm sure there are some component libraries that work with vanilla js and just use html/css.

### Future work
These are just some ideas I had while working on the app, listed in no particular order

* Pagination - right now it loads all reviews at once, that won't scale well
* Better error handling - The client is not setup to display user friendly error messages if the server returns an error.
* Better real-time updates - I did the 'real-time' updates by just setting up a poll to hit the server every 10 seconds. Ideally though we'd have something better setup like websockets or server-side events.
* User management - no concept of users right now. Would be good to have actual accounts, or at the very least ask for a name and/or email when people are leaving reviews.
* More automated testing - setup the structure for backend automated tests. Only wrote a couple of simple API tests, could be expanded.
* Logging - have no logging setup anywhere. At the very least it's needed on the backend for a real production app.
