</head>
<body>
<div id="wrapper">
    <div id="header">
        <h1> Movies Review App </h1>
        <p> A movie reviews app made with laravel, vue.js and tailwind css while experimenting with Algolia's Realtime Search. It makes use of The New York Times free Movie Reviews API. </p>
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
        For the front-end, it is designed using only tailwind. <br>
        It also requires a database to be setup in order to store information collected from API call for the purpose of synchronizing the data with Algolia. It uses Algolia Instant Realtime Search for searching and filtering the results.</p>
        <h2>Some Screenshots </h2>
        <h2> Carousel </h2>
        <img src="https://user-images.githubusercontent.com/35193027/46749132-08921500-ccad-11e8-9a65-866959af79f3.png">
        <h2> Main Results </h2>
        <img src="https://user-images.githubusercontent.com/35193027/46749251-38d9b380-ccad-11e8-8a5d-47e917e5d626.png">
        <h2> Search Results </h2>
        <img src="https://user-images.githubusercontent.com/35193027/46749357-73dbe700-ccad-11e8-8252-c4cd365b5a5f.png">
    </main>
</div>
</body>
</html>
