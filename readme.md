## Cory Martin's entry for the 2015/16 TruMedia MLB Hackathon

TruMedia Networks sponsored a [hackathon](http://www.trumedianetworks.com/hackathon/) in December 2015. In this project, you will find the code I used for my entry.

I chose [Laravel](http://laravel.com/) as the back-end PHP Framework, and [Angular](https://angularjs.org/) as the front end Javascript Framework. I also used a template, purchased from [WrapBootstrap](https://wrapbootstrap.com/) as a visual framework.

## Database Structure and Seeding

The database/migrations folder contains information which defines the database structure for the project. The database/seeds folder contains information about processing the Raw Data that was sent to seed the project. This Raw Data contained over 2.1M rows of data, each describing one pitch from the 2013, 2014, and 2015 MLB Regular Season and Post Season.

## Features

### Heat Zone

The Heat Zone is a tool where a user can select a batter and/or a pitcher and view the pitches they threw (or saw as a batter). The results are shown on a graphical representation of the Strike Zone and highlights areas where the batter performed well. The user can click on a pitch to view more information about it, or compare the outcomes from different pitch types within the result set.

### Reports

The Catcher Framing report compares how well different catchers frame their pitches. In this report they are scored with the following metric: (Strikes gained - Strikes Lost) / (Pitches Received). In the "Additional Filters" tab, the user can modify the parameters to see (e.g.) which catcher was the best framer with two outs and a full count in extra innings, etc.

The Pitcher Velocity Difference report measures how wide the gap is between a pitcher's Fastball and his Changeup. Similarly, the user can change the parameters to see which pitchers are best, situationally.


## Hosting

As of January 2, 2016, the project is hosted at [http://trumedia.corymmartin.com/](http://trumedia.corymmartin.com/). Feel free to peruse it there.

## License

Per the specifications of the Hackathon contest, this project is open-sourced software licensed under the [MIT license](http://opensource.org/licenses/MIT), bearing in mind that it uses a proprietary template from [WrapBootstrap](https://wrapbootstrap.com/).
