<template>
    <div id="app">
        <ais-index app-id="7VM1U74DCL" api-key="5af9433923da9f95516b8c7d6cfb3866" indexName="reviews">
            <div class="lg:flex mx-8 my-4 py-4 justify-between">
                <div class="sidebar lg:w-1/6 px-4 py-4 bg-purple-darker text-white overflow-hidden lg:mr-8 mb-8">
                    <div class="flex bg-pink-custom -mx-4 -mt-4 mb-4 p-3 justify-between items-center rounded-t">
                        <h1 class="text-base text-white text-center"> Search </h1>
                        <ais-clear :class-names="{'ais-clear': 'bg-pink text-white text-sm px-2 py-1 rounded shadow-md font-bold'}" title="Clear search">Reset</ais-clear>
                    </div>
                    <div class="items-center text-center my-3">
                        <ais-input placeholder=" Search" :class-names="{'ais-input': 'form-control p-2 rounded w-full'}"></ais-input>
                    </div>
                    <div class="items-center my-3">
                        <ais-refinement-list attribute-name="opening_date" :classNames="{'ais-refinement-list__count': 'badge','ais-refinement-list__item': 'checkbox'}">
                        <template slot="header"><h2 class="my-6 p-2 bg-teal text-base -mx-4 shadow">Release Date</h2></template>
                        </ais-refinement-list>
                    </div>
                    <div class="items-center my-3">
                        <ais-refinement-list attribute-name="byline" :classNames="{'ais-refinement-list__count': 'badge','ais-refinement-list__item': 'checkbox'}">
                        <template slot="header"><h2 class="my-6 p-2 bg-teal text-base -mx-4 shadow">Reviewed By</h2></template>
                        </ais-refinement-list>
                    </div>
                </div>
                <div class="flex-row lg:w-4/5 md:full px-4 lg:ml-4 border-l border-black">
                    <div class="mx-auto items-center">
                        <ais-no-results>
                        <template slot-scope="props">
                            <p class="text-lg text-white">Sorry, No movies found for '<i class="text-purple-light">{{ props.query }}</i>'</p>.
                        </template>
                        </ais-no-results>
                    </div>
                    <div class="text-white">
                        <ais-results>
                        <template slot-scope="{ result }">
                        <div class="lg:inline-flex float-right lg:w-64 md:w-full bg-purple-darker shadow rounded lg:mx-4 md:mx-0 mb-8">
                        <div>
                        <img :src="result.src" class="rounded-t shadow w-full">
                        <div class="mx-4 my-4 h-40 mb-8">
                        <div class="text-md items-center my-2 leading-normal">
                        <ais-highlight :result="result" attribute-name="display_title"></ais-highlight>
                        </div>
                        <p class="text-purple-light leading-normal text-sm"> <ais-highlight :result="result" attribute-name="summary_short"></ais-highlight> </p>
                        </div>
                        <div class="w-full items-center p-3 bg-pink-custom text-center">
                        <span> <a :href="result.url" class="no-underline text-white">Read Review</a> </span>
                        </div>
                        </div>
                        </div>

                        </template>
                        </ais-results>
                    </div>

                </div>
            </div>
            <!--<div class="flex flex-row w-full">-->
                    <!--<div class="flex flex-col mt-2 border mx-4 px-3 bg-grey-darkest pb-3 h-full">-->
                            <!--<div class="flex my-2">-->
                                <!--<h2 class="w-full text-lg text-pink-custom pt-3">Search</h2>-->
                                <!--<ais-clear :class-names="{'ais-clear': 'bg-pink-custom h-6 text-white text-xs px-2 mt-3 font-bold'}" title="Clear search">Reset</ais-clear>-->
                            <!--</div>-->
                            <!--<div class="flex text-sm font-sans text-white mt-6 h-6 w-full">-->
                                <!--<ais-input placeholder=" Search"-->
                                           <!--:class-names="{'ais-input': 'form-control'}">-->
                                <!--</ais-input>-->
                            <!--</div>-->
                            <!--<div class="text-sm font-sans pt-6 mt-6 pb-2 no-underline text-white">-->
                                <!--<ais-refinement-list attribute-name="opening_date"-->
                                                     <!--:classNames="{'ais-refinement-list__count': 'badge','ais-refinement-list__item': 'checkbox'}">-->
                                    <!--<template slot="header">-->
                                        <!--<h2 class="pb-4 text-lg text-pink-custom">-->
                                            <!--Release Date-->
                                        <!--</h2>-->
                                    <!--</template>-->
                                <!--</ais-refinement-list>-->
                            <!--</div>-->
                            <!--<div class="text-sm font-sans pt-2 pb-2 no-underline lowercase capitalize text-white">-->
                                <!--<ais-refinement-list attribute-name="byline"-->
                                                     <!--:classNames="{'ais-refinement-list__count': 'badge','ais-refinement-list__item': 'checkbox'}">-->
                                    <!--<template slot="header">-->
                                        <!--<h4 class="pb-4 text-lg text-pink-custom">-->
                                            <!--Reviewed By-->
                                        <!--</h4>-->
                                    <!--</template>-->
                                <!--</ais-refinement-list>-->
                            <!--</div>-->
                    <!--</div>-->

                    <!--<div class="flex flex-col mx-3">-->
                        <!--<ais-no-results>-->
                            <!--<template slot-scope="props">-->
                                <!--<p class="text-xl font-bold my-6 mx-5 text-grey-darkest">Sorry, No movies found for '<i>{{ props.query }}</i>'</p>.-->
                            <!--</template>-->
                        <!--</ais-no-results>-->
                        <!--<ais-results>-->
                            <!--<template slot-scope="{ result }">-->
                                <!--<div class="inline-flex lg:w-1/5 md:w-1/3 sm-w-1/2 xs:w-1/2 justify-start m-4 font-sans rounded shadow-md">-->
                                    <!--<div class="flex flex-col">-->
                                        <!--<img class="flex" :src="result.src">-->
                                        <!--<div class="p-2 pt-2 bg-grey-darker lg:h-40 md:h-48 sm:h-64 xs:h-48">-->
                                            <!--<div class="font-bold text-white text-xl mb-2">-->
                                                <!--<ais-highlight :result="result"-->
                                                               <!--attribute-name="display_title"></ais-highlight>-->
                                            <!--</div>-->
                                            <!--<p class="text-grey-light text-sm my-2">-->
                                                <!--<ais-highlight :result="result"-->
                                                               <!--attribute-name="summary_short"></ais-highlight>-->
                                            <!--</p>-->
                                        <!--</div>-->
                                        <!--<div class="bg-grey-darkest p-3 text-center">-->
                                            <!--<span class="inline-block text-lg font-bold text-pink-custom mr-2 ">-->
                                                <!--<a :href="result.url"-->
                                                   <!--class="no-underline text-pink-custom">Read Review</a>-->
                                            <!--</span>-->
                                        <!--</div>-->
                                    <!--</div>-->
                                <!--</div>-->
                            <!--</template>-->
                        <!--</ais-results>-->
                    <!--</div>-->
            <!--</div>-->
            <div class="block text-center items-center -ml-8 mb-8">
                <ais-pagination v-on:page-change="onPageChange" class="pagination"
                                :classNames="{ 'ais-pagination': 'pagination ', 'ais-pagination__item--active': 'active','ais-pagination__item--disabled': 'disabled' }">
                </ais-pagination>
            </div>
        </ais-index>
    </div>
</template>
<script>
    export default {
        methods: {
            onPageChange(page) {
                window.scrollTo(0, 520);
            },
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
    }
</script>
<style>
    .sidebar {
        height: fit-content;
    }
    .checkbox {
        padding-bottom: 17px;
        padding-right: 2px;
    }

    .ais-refinement-list__value {
        font-size: 14px;
        padding-left : 10px;
    }

    .badge {
        background-color: #CF2F49;
        padding: 2%;
        border-radius: 20px;
        float: right;
        font-size: 10px;
        color: white;
    }

    .pagination ul {
        font-size: 0;
        list-style-type: none;
        text-align: center;
    }

    .pagination li {
        margin: 0px !important;
        font-size: 14px;
        font-weight: bold;
        display: inline;
        background-color: #606f7b;
        color: white;
        padding-top: 12px;
        padding-bottom: 12px;

    }

    .pagination a {
        padding: 12px;
        margin: 0px !important;
        text-decoration: none;
        color: white;
        border: 1px solid #eee;
    }

    .pagination a:hover {
        background: #3d4852;
    }

    .pagination li:first-child a {
        border-top-left-radius: 4px;
        border-bottom-left-radius: 4px;
    }

    .pagination li:last-child a {
        border-right: 1px solid #eee;
        border-top-right-radius: 4px;
        border-bottom-right-radius: 4px;
    }

    .pagination li.ais-pagination--item__active a:hover {
        cursor: default;
    }

    .pagination li.ais-pagination--item__disabled a:hover {
        background: none;
    }
</style>