# Getting Started 

Go on Code > download zip file of repository

## After download

Paste the files from zip file into folder you would like and open that folder in your source code editor

After you open it, in your terminal run npm install, npm install axios 

After that run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.



### First screen

On first screen you are required to enter your name otherwise you can't play the game

### Hangman game

Guess the quote by pressing letter on keyboard.

### Wrong letters & unsuccessful

If you press latter that's not in the quote that latter will be displayed as error and will count every wrong letter pressed.
You have up to 5 errors to make, after 6 one the game is over and the screen will show you the quote which was there to be guessed
and it will give you option to restart game and start again.

### Correct letters

If you guees the correct letter in quote that latter will be displayed to you. The guessed letter is not case sensitive,
for example if you press uppercase letter N every N or n letter will be displayed to you.

### Game finished successful

If you guess all the latters in quote before hitting 6 errors, you will finish game successfully, your score will be send to server
, popup window telling you finished game successfully will be presented and also you will be able to see highscore table with best scores.

### Score

The score in highscore table is calculated on this parameters:
The ones who have less errors got better score
The ones who got same errors but more unique characters (such as ., etc.) will have better score
If you have same number of errors and unique character than the ones who have more quote letters will have better score
If you have same number of errors, unique characters and letters quote, than the ones who solve faster will have better score

All 4 parameters are taken in calculating the final score

### Have fun playing the game and enjoy
