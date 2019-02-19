</head>
<body>
<div id="wrapper">
    <div id="header">
        <h1> Movies Review App </h1>
        <p> A movies review app made with laravel, vue.js and tailwind css while making use of The New York Times free Movie Reviews API. </p>
    </div>
    <main>
        <h2>Introduction</h2>
        <p> This one page app displays latest movies for which data is received through JSON calls to Newyork Times API. Critic's reviews are displayed on the top in a carousel. Headlines update along with carousel slides scrolling. Rest of the movies are all in the section below in the form of cards. Sidebar at the left can be used to search realtime or filter the results.
        </p>
        <br>
        <h2> Technologies</h2>
        <p> Tailwind.css is used to design the front-end. Vue carousel-3d is used to design the carousel. Search functionality is built using vue instant search provided by Algolia. Api call is live for the carousel however the results for the rest of the movies are cached in Algolia database and they need to be updated manually. A local database also stores the results and is in-sync with Algolia. The site is fully responsive with one column layout for mobile screen.
       </p>
    </main>
</div>
</body>
</html>
