<!doctype html>
<html lang="{{ app()->getLocale() }}">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Movie Reviews - The New York Times</title>
    <meta name="description" content="Read latest movie reviews published by The New York Times famous critiques">
    <meta name="keywords" content="The New York Times, New York, Newyork, news, movie, review, latest, read">
    <link href="https://fonts.googleapis.com/css?family=Holtwood+One+SC|Raleway|Pacifico|Marmelad" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css?family=Black+Ops+One" rel="stylesheet">
    <link rel="stylesheet" href="/css/output.css">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/animate.css@3.5.2/animate.min.css">
    <script src="{{ './js/app.js' }}" defer></script>
</head>

<body class="sans bg-purple-darkest">
<header class="bg-purple-darkest border-b-4 border-pink-custom">
    <div class="container mx-auto h-16 py-2 ">
        <div class="flex w-full py-2 px-6 justify-between">
            <div class="lg:w-1/2 md:1/2 sm:w-64 xs:w-5/6 text-2xl font-serif tracking-wide text-white px-2">
                <h3> Movie Mag </h3>
            </div>
            <div class="flex justify-end font-sans leading-loose float-right">
                <h4 class="border-solid border-red border-bottom rounded-sm">
                    <a href="https://github.com/lalarukh1/NY-M-Reviews"
                       class="no-underline text-grey-light shadow-inner shadow-sm p-1 pr-3 pl-3 hover:text-white">
                        Info </a>
                </h4>
            </div>
        </div>
    </div>
</header>

<div id="app" class="font-sans">
    <div class="pt-6 justify-center bg-no-repeat bg-cover" style="background-image: url('https://i.ytimg.com/vi/w9iQBNyn4Ac/maxresdefault.jpg');">
        <h1 class="font-serif text-center text-white p-3 pl-4 pr-6 mt-3 mb-3">
            Critic's Picks
        </h1>
        <carousal></carousal>
    </div>
    <results></results>
    <div class="font-sans border p-4 mt-4 bg-grey text-grey-darkest text-right">
        Lala Rukh
    </div>
</div>
</body>
</html>
