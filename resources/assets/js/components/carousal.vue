<template>
    <div id="app">
        <carousel-3d :controls-visible="true" :clickable="true" :on-slide-change="onSlideChanged" :on-main-slide-click="onMainSlideClick" class="mx-8 px-8">
            <slide v-for="(slide, i) in slides" :index="i">
                <figure>
                    <img v-bind:src="results.results[i].multimedia.src" class="carousel-img">
                    <figcaption>
                        <p>{{results.results[i].display_title}}</p>
                        {{results.results[i].summary_short}}
                    </figcaption>
                </figure>
            </slide>
        </carousel-3d>
        <div class="bg-purple-darker text-center py-4 mt-8 lg:px-4 shadow-md">
            <div class="p-2 bg-purple-darkest items-center text-indigo-lightest leading-normal lg:rounded flex lg:inline-flex" role="alert">
                <span class="flex font-sans rounded bg-pink px-2 py-1 text-xs font-bold mr-3">{{results.results[this.index].byline}}</span>
                <span class="font-semibold font-sans mr-2 text-left flex-auto animated lightSpeedIn">
                    <a :href="results.results[this.index].link.url" class="no-underline text-white">{{results.results[this.index].headline}}</a>
                </span>
                <svg class="fill-current opacity-75 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M12.95 10.707l.707-.707L8 4.343 6.586 5.757 10.828 10l-4.242 4.243L8 15.657l4.95-4.95z"></path>
                </svg>
            </div>
        </div>
    </div>
</template>
<script>
    import {Carousel3d, Slide} from 'vue-carousel-3d';
    export default {
        data() {
            return {
                slides: 20,
                results: [],
                name: '',
                index: 0
            }
        },
        components: {
            Carousel3d,
            Slide
        },
        async created() {
            await axios.get('https://api.nytimes.com/svc/movies/v2/reviews/search.json', {
                params: {
                    'api-key': "B4M0PyBla9l9HJKQ9aVro4Fux05rahlH",
                    'offset': 40,
                    'critics-pick': "Y"
                },
            }).then(response => {
                if (response.data.count !== 0) {
                    this.results = response.data;
                }
            });
        },
        methods: {
            onMainSlideClick() {
                console.log('onMainSlideClick Callback Triggered')
            },
            onSlideChanged(index) {
                this.index = index;
            },
        },
    };
</script>
<style>
    #app .carousel-img {
        width: 100%;
        height: 270px;
    }

    .carousel-3d-container {
        width: 80% !important;
    }

    .carousel-3d-container .prev, .carousel-3d-container .next {
        color: #21183C;
    }
    .carousel-3d-container figcaption {
        font-family: Marmelad;
        position: absolute;
        background-color: rgba(33, 24, 60, 0.6);
        color: #fff;
        bottom: 0;
        padding: 15px;
        font-size: 12pt;
        min-width: 100%;
        box-sizing: border-box;
    }

    .carousel-3d-container figcaption p {
        font-size: 16pt;
        padding-bottom: 10px;
    }

</style>