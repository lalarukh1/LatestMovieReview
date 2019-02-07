<template>
    <div id="app">
        <ais-index app-id="7VM1U74DCL" api-key="5af9433923da9f95516b8c7d6cfb3866" indexName="reviews">
            <div class="lg:flex md:flex sm:flex mx-8 my-4 py-4 justify-between">
                <div class="sidebar lg:w-1/6 md:w-1/4 sm:w-1/2 px-4 py-4 bg-purple-darker text-white overflow-hidden lg:mr-8 mb-8">
                    <div class="flex bg-pink-custom -mx-4 -mt-4 mb-4 p-3 justify-between items-center rounded-t">
                        <h1 class="text-base text-white text-center"> Search </h1>
                        <ais-clear
                                :class-names="{'ais-clear': 'bg-pink hover:bg-pink-custom text-white text-sm px-2 py-1 rounded shadow-md font-bold'}"
                                title="Clear search">Reset
                        </ais-clear>
                    </div>
                    <div class="items-center text-center my-3">
                        <ais-input placeholder=" Search"
                                   :class-names="{'ais-input': 'form-control p-2 rounded w-full'}"></ais-input>
                    </div>
                    <div class="items-center my-3 hidden sm:block lg:block md:block">
                        <ais-refinement-list attribute-name="opening_date" :sort-by="['isRefined:desc', 'name:desc']"
                                             :classNames="{'ais-refinement-list__count': 'badge','ais-refinement-list__item': 'checkbox'}">
                            <template slot="header"><h2 class="my-6 p-2 border-b border-pink-custom text-base -mx-4 shadow">Release
                                Date</h2></template>
                        </ais-refinement-list>
                    </div>
                    <div class="items-center my-3 hidden sm:block lg:block md:block">
                        <ais-refinement-list attribute-name="byline" :sort-by="['name:asc']"
                                             :classNames="{'ais-refinement-list__count': 'badge','ais-refinement-list__item': 'checkbox'}">
                            <template slot="header"><h2 class="my-6 p-2 border-b border-pink-custom  text-base -mx-4 shadow">Reviewers</h2>
                            </template>
                        </ais-refinement-list>
                    </div>
                </div>
                <div class="flex-row lg:w-4/5 md:w-4/5 sm:w-4/5 px-4 lg:ml-4 lg:border-l lg:border-indigo-darkest md:ml-4 md:border-l md:border-indigo-darkest">
                    <div class="mx-auto items-center">
                        <ais-no-results>
                            <template slot-scope="props">
                                <p class="text-lg text-white">Sorry, No movies found for '<i class="text-purple-light">{{
                                    props.query }}</i>'</p>.
                            </template>
                        </ais-no-results>
                    </div>
                    <ais-results class="text-white flex flex-wrap lg:-mr-8 md:-mr-8">
                        <template slot-scope="{ result }">
                            <div class="xl:1/6 lg:w-1/4 md:w-2/5 sm:w-full bg-purple-darker shadow rounded lg:mx-8 md:mx-4 sm:mx-1 mb-8">
                                <div>
                                    <img :src="result.src" class="rounded-t shadow w-full">
                                    <div class="overflow-hidden mx-4 my-2 h-32 mb-4 pb-2">
                                        <div class="text-lg sm:text-md items-center my-2 leading-normal">
                                            <ais-highlight :result="result"
                                                           attribute-name="display_title"></ais-highlight>
                                        </div>
                                        <div class="text-xs items-center my-2 text-purple-light leading-normal">
                                            <span class="mr-2"><i class="fas fa-user-edit text-white"></i></span>
                                            <ais-highlight :result="result"
                                                           attribute-name="byline"></ais-highlight>
                                        </div>
                                        <p class="text-purple-light leading-normal text-sm mb-2 pb-2">
                                            <ais-highlight :result="result"
                                                           attribute-name="summary_short"></ais-highlight>
                                        </p>
                                    </div>
                                    <div class="w-full items-center p-3 bg-pink-custom hover:bg-pink-custom text-center">
                                        <span> <a :href="result.url" class="no-underline text-white"><i
                                                class="fab fa-readme px-2 items-end"></i>Read Review</a> </span>
                                    </div>
                                </div>
                            </div>
                        </template>
                    </ais-results>
                </div>
            </div>
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
        padding-left: 10px;
    }

    .ais-refinement-list__item--active {
        margin-left: -20px;
        margin-right: -20px;
        margin-bottom: 10px;
        padding-left: 20px;
        padding-right: 20px;
        padding-top: 10px;
        background-color: rgba(232, 74, 99, 0.41);
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