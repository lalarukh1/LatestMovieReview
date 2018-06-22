<!doctype html>
<html>
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title> What's For Dinner </title>
    <link href="https://fonts.googleapis.com/css?family=Acme|Cabin|Josefin+Sans" rel="stylesheet">
    <style>
        body {
            font-family: 'Cabin', sans-serif;
            width: 100%;
            padding: 0px;
            margin: 0px;
            color: black;
        }
        #wrapper {
            width: 100%;
            margin: 0px;

        }
        #header {
            height: 25%;
            background-color: lightgray;
            text-align: center;
            margin: 0px;
            padding-top: 30px;
            padding-bottom: 30px;
            padding-left: 20%;
            padding-right: 20%;
        }
        h1, h2 {
            margin: 0;
            padding: 10px;
            font-family: 'Acme', sans-serif;
        }
        main p {
            text-align: justify;
            line-height: 1.6;
            font-size: 20px;
        }

        #header p {
            line-height: 1.6;
            font-size: 20px;
        }
        #header a {
            text-decoration: none;
            color: black;
        }
        #header #button  {
            position: relative;
            display: block;
        }
        #header #button a {
            border-bottom: thin solid black;
            padding: 6px;
            margin: 16px;
        }
        main {
            text-align: center;
            padding: 10px;
            padding-left: 20%;
            padding-right: 20%;
            text-justify: inter-word;
        }

        main img {
            width: 100%;
            opacity: 1;
            border: thin solid grey;
            margin-bottom: 10px;
        }

        footer {

            background-color: lightgray;
            height: 10%;
            padding: 10px;
            text-align: right;
            font-size: 14px;
        }
    </style>
</head>
<body>
<div id="wrapper">
    <div id="header">
        <h1> Movie Reviews App </h1>
        <p> A movie reviews app made with laravel, vue.js and tailwind css while making use of The New York Times free Movie Reviews API. </p>
    </div>
    <main>
        <h2>Introduction</h2>
        <p> This one page app displays a smart 3D carousal at the top that displays movies picked by critic's of The New York Times writers along with
            review headlines from these critics. After this section, it displays a list of latest movies in the form of cards that hold a link to full
            review of the movie.
            On the side is a panel holding search refine options. The app is integrated with Algolia search,
            therefore, it implements fast real time search experience. <br>
            The data is dynamic and comes from JSON API calls to The New york Times free API.</p>
        <h2> Technologies Used</h2>
        <p> The app was developed for the purpose of learning Tailwind css from scratch and to get a better understanding into laravel and vue.js frameworks.
        For the front-end, it is designed using only tailwind, without any particular use of basic css or bootstrap. <br>
        It also requires a database to be setup in order to store information collected from call for the purpose of synchronizing the data with Algolia.</p>
        <h2>Some Screenshots </h2>
        <img src="https://user-images.githubusercontent.com/35193027/41241556-25403cbc-6d95-11e8-80af-6c6339bb482c.png">
        <img src="https://user-images.githubusercontent.com/35193027/41241557-255b6a1e-6d95-11e8-94c4-5ec41aeebc24.png">
        <p>And that's it! Working on making it fully responsive now.</p>
    </main>
    <footer>
        <p>© Lala Rukh  </p>

    </footer>
</div>
</body>
</html>


