<!doctype html>
<html lang="{{ app()->getLocale() }}" class="overflow-hidden overflow-y-scroll">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Movie Reviews - The New York Times</title>
    <meta name="description" content="Read latest movie reviews published by The New York Times famous critiques">
    <meta name="keywords" content="The New York Times, New York, Newyork, news, movie, review, latest, read">
    <link href="https://fonts.googleapis.com/css?family=Holtwood+One+SC|Raleway|Pacifico|Marmelad" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css?family=Black+Ops+One" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css?family=Pacifico" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/balloon-css/0.5.0/balloon.min.css">
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.6.3/css/all.css" integrity="sha384-UHRtZLI+pbxtHCWp1t77Bi1L4ZtiqrqD80Kn4Z8NTSRyMA2Fd33n5dQ8lWUE00s/" crossorigin="anonymous">
    <link rel="stylesheet" href="/css/output.css">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/animate.css@3.5.2/animate.min.css">
    <script src="{{ './js/app.js' }}" defer></script>
</head>

<body class="sans" style="background: radial-gradient(ellipse at center,rgba(32,36,63,0.2) 0,rgba(32,36,63,0.31) 100%);">
<header class="bg-purple-darkest border-b-4 border-pink-custom">
    <div class="container mx-auto">
        <div class="flex w-full px-6 justify-between items-center py-2">
            <div class="w-1/2 text-md font-serif text-white px-2 py-2">
                <h1 class="lg:text-2xl md:text-xl sm:text-xl text-lg"> Movie Mag </h1>
            </div>
            <div class="flex font-sans leading-none">
                <p class="mx-1 shadow-md hover:bg-purple-darker rounded leading-none px-1 py-1 border-2 border-purple-darker" data-balloon="My Github" data-balloon-pos="down">
                    <a href="https://github.com/lalarukh1/LatestMovieReview" class="no-underline text-white">
                        <i class="fab fa-github"></i>
                    </a>
                </p>
                <p class="mx-1 shadow-md hover:bg-purple-darker rounded leading-none px-1 py-1 border-2 border-purple-darker" data-balloon="The Newyork Times website" data-balloon-pos="down">
                    <a href="https://www.nytimes.com/section/movies" class="no-underline text-white">
                        <i class="fas fa-newspaper"></i>
                    </a>
                </p>
            </div>
        </div>
    </div>
</header>
<div id="app" class="font-sans">
    <div class="pt-6 justify-center bg-no-repeat bg-cover bg-white">
        <h2 class="text-center text-purple-darkest px-2 py-1 font-sans leading-none tracking-tight">
            CRITIC'S PICKS
        </h2>
        <carousal></carousal>
    </div>
    <results></results>
    <div class="font-sans px-4 py-4 bg-purple-darkest text-white text-sm text-right">
        Lala Rukh
    </div>
</div>
</body>
</html>
