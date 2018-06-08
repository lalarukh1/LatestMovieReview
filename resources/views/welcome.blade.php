<!doctype html>
<html lang="{{ app()->getLocale() }}">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>Laravel</title>
        {{--<link href="https://cdn.jsdelivr.net/npm/tailwindcss/dist/tailwind.min.css" rel="stylesheet">--}}
        <link href="https://fonts.googleapis.com/css?family=Holtwood+One+SC|Raleway|Pacifico|Marmelad" rel="stylesheet">
        <link rel="stylesheet" href="/css/output.css">
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/animate.css@3.5.2/animate.min.css">
        <script src="{{ asset('js/app.js') }}" defer></script>
    </head>

    <body class="sans bg-grey-lighter">

    <header class="bg-black border-b-4 border-pink-custom">
        <div class="container mx-auto h-16 pt-2 pb-2 ">

            <div class="flex pt-2 pb-2">

                <div class="w-1/2 text-2xl font-serif tracking-wide text-white">
                    <h3> NY Reviews </h3>
                </div>

                <div class="w-1/2 flex justify-end font-sans leading-loose">
                    <h3 class="border-solid border-red border-bottom rounded-sm">
                        <a href="#" class="no-underline text-grey-light shadow-inner shadow-sm p-1 pr-3 pl-3 hover:text-white"> Info </a>
                    </h3>
                </div>
            </div>
        </div>
    </header>

    <div>
        <div>
            <div class="flex flex-row w-full items-center content-center content-between justify-center mt-4">
                <input class="w-1/4 focus: no-outline  border border-pink-custom rounded-l text-grey-darker px-4 py-2" type="text">
                <button class="border border-pink-custom rounded-r bg-pink-custom text-white h-auto font-sans px-4 py-2 hover:bg-pink-custom hover:border-pink-custom">
                    Search </button>
            </div>
        </div>
    </div>
        </div>
    </header>

<div class="pt-6 pb-6 justify-center ">
    <h3 class="inline-block font-sans bg-grey-darkest text-white p-2 pl-4 pr-6 border rounded rounded-l-none shadow-md"> Critic's Picks </h3>
    <div id="app">
        <carousal></carousal>
    </div>
</div>

    <div class="flex flex-row w-6/7">

    <div class="flex flex-wrap p-2 w-full mr-8">
        @for ($i = 0; $i < 20; $i++)

            <div class="inline-flex w-1/5 justify-start">
                <div class="flex w-full h-64 m-4">
                    <div class="flex w-full h-full bg-no-repeat bg-cover rounded-lg rounded-tr-none" style="background-image: url({{$data->body->results[$i]->multimedia->src}})">

                        <div class="flex content-between flex-wrap h-64 w-full font-sans">

                        <div class="w-full">
                            <div class="bg-pink-custom p-2 pb-1 pl-2 float-right shadow-md">
                                <div class="flex text-white text-md">
                                    <a href="{{$data->body->results[$i]->link->url}}" class="no-underline text-white">
                                        Read Review </a>
                                    <a href="{{$data->body->results[$i]->link->url}}" class="no-underline text-white">
                                        <svg class="w-auto h-6 pb-1 fill-current" viewBox="0 0 24 24">
                                            <path  d="M5.59,7.41L7,6L13,12L7,18L5.59,16.59L10.17,12L5.59,7.41M11.59,7.41L13,6L19,12L13,18L11.59,16.59L16.17,12L11.59,7.41Z" />
                                        </svg>
                                    </a>
                                </div>
                            </div>
                        </div>

                        <div class="w-full">
                            <div class="bg-black opacity-75 p-2 font-sans w-full pt-4">
                                <div class="text-white font-bold text-l mb-2">
                                    {{$data->body->results[$i]->display_title}}
                                    <p class="pt-2 text-sm">{{$data->body->results[$i]->headline}}</p>
                                </div>
                            </div>
                        </div>
                        </div>

                    </div>
                </div>
            </div>
        @endfor
    </div>

        {{--<div class="flex-col w-1/5 ">--}}

            {{--@for ($i = 0; $i < 20; $i++)--}}
                {{--<div class="border rounded-full w-32 h-32 flex items-center m-4 ml-8">--}}
                    {{--<div class="flex content-center text-center p-6">{{$critics->body->results[$i]->display_name}}</div>--}}
                {{--</div>--}}
            {{--@endfor--}}

        {{--</div>--}}
    </div>



    <div class="border p-2">
        footer
    </div>

    </body>
</html>
