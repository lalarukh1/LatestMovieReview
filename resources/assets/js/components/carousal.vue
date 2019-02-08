<template v-if="results.results">
    <div id="app">
        <carousel-3d :controls-visible="true" :clickable="true" :autoplay="true" :autoplay-timeout="5000" :on-slide-change="onSlideChanged" :on-main-slide-click="onMainSlideClick" class="mx-8">
            <slide v-for="(slide, i) in slides" :index="i">
                <figure>
                    <img v-if="results.results" v-bind:src="results.results[i].multimedia.src" class="carousel-img">
                    <figcaption>
                            <p v-if="results.results">{{results.results[i].display_title}}</p>
                    </figcaption>
                </figure>
            </slide>
        </carousel-3d>
        <div class="bg-purple-darker text-center py-4 mt-8 shadow-md">
            <div class="p-2 bg-purple-darkest items-center text-indigo-lightest leading-normal lg:rounded md:rounded flex px-4 lg:inline-flex md:inline-flex lg:py-3 md:py-3 sm:py-8 py-8" role="alert">
                <span v-if="results.results" class="flex font-sans rounded bg-white text-purple-darkest border-2 border-pink-darkest px-2 py-1 text-xs font-bold mr-3">{{results.results[this.index].byline}}</span>
                <span v-if="results.results" class="font-semibold font-sans mr-2 text-left flex-auto animated lightSpeedIn">
                    {{results.results[this.index].headline}}
                    <a :href="results.results[this.index].link.url" class="no-underline text-white">
                    <span class="mx-2 hover:text-pink-darkest text-white text-lg rounded-full shadow-md border border-purple-darkest ">
                        <i class="fas fa-chevron-circle-right"></i></span></a>
                </span>

            </div>
        </div>
    </div>
</template>
<script>
    import {Carousel3d, Slide} from 'vue-carousel-3d';
    export default {
        data() {
            return {
                slides: 10,
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
                    return this.results;
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
        background-color: white;
        border: thin solid #21183C;
        text-align: center;
        border-radius: 40px;
        color: #21183C;
    }
    .carousel-3d-container a.prev, .carousel-3d-container a.next {
        line-height: 30px !important;
    }
    .carousel-3d-container figcaption {
        font-family: Marmelad;
        position: absolute;
        background-color: rgba(33, 24, 60, 0.4);
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
    .carousel-3d-slide {
        border: thin solid rgba(255, 255, 255, 0) !important;
    }

</style>