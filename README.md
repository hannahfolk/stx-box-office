Box Office Data Compiler for STX Entertainment
=======

## Description

This application was developed for STX Entertainment to help them compile box office data in an easier way, so that they can generate competitive titles. The user can search by movie title, and from there, break down box office numbers by time period. The user can also search by weekend, where they enter a weekend and the number of years they want to look back on for that same weekend in the past, and see how different titles do during that weekend. Lastly, the user can search by genre, pulling in competetive titles and seeing how a certain genre does during a given time period. Once the response has been returned, the user can export all the data into an Excel file.

## Process

We began by researching different movie database APIs, ranging from Fandango's, to IMDB's, to boxofficemojo.com's data feed. Every API that we encountered did not give us what we wanted, which was box office data broken down by time period, until we found OpusData. We contacted OpusData, and they gave us sample files that showed box office numbers by day, week, and genre. This was excellent news, however, we did not realize how difficult it would be to call using this API.

After about a week of trying to make an AJAX call, Omar helped us out by calling using node.js, and then we were on our way. From there, we modified the response, sending things back and forth between our client-side js file and our server-side js file.

Our application is still in development, and we will continue to modify it so that the user can export all the data into an Excel file.

## Credits

Omar Patel helped us integrate node.js and heroku deployment. OpusData.com supplied the response data.

## License

MIT License

Copyright (c) [2019] [Hannah Folk, Marie Gilbert, Eduardo Urbaez]

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.