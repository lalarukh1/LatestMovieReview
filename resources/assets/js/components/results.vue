<template>
    <div id="app">
        <ais-index
                app-id="7VM1U74DCL"
                api-key="5af9433923da9f95516b8c7d6cfb3866"
                indexName="reviews"
        >
            <div class="flex flex-row w-full">
                <div class="flex flex-wrap w-full mr-8">
                    <div class="flex w-48 h-70 flex-no-wrap mt-2 border mr-8 shadow-sm bg-grey-darkest">
                        <div class="flex flex-col p-2">
                            <div class="flex text-sm font-sans text-white w-8 h-8 mb-8 mt-4">
                                <ais-input placeholder="Search"
                                           :class-names="{'ais-input': 'form-control'}"></ais-input>
                                <ais-clear :class-names="{'ais-clear': 'bg-grey-dark h-6 text-white'}">
                            <span aria-hidden="true">
                                <svg style="width:20px;height:20px" viewBox="0 0 24 24">
                                    <path fill="#000000"
                                          d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z">
                                    </path>
                                </svg>
                            </span>
                                </ais-clear>
                            </div>

                            <div class="text-sm font-sans pt-2 pb-2 no-underline text-white">
                                <ais-refinement-list attribute-name="opening_date"
                                                     :classNames="{'ais-refinement-list__count': 'badge','ais-refinement-list__item': 'checkbox'}">
                                    <template slot="header">
                                        <h2 class="pb-4 text-lg text-pink-custom">
                                            Release Date
                                        </h2>
                                    </template>
                                </ais-refinement-list>
                            </div>

                            <div class="text-sm font-sans pt-2 pb-2 no-underline lowercase capitalize text-white">
                                <ais-refinement-list attribute-name="byline"
                                                     :classNames="{'ais-refinement-list__count': 'badge','ais-refinement-list__item': 'checkbox'}">
                                    <template slot="header">
                                        <h4 class="pb-4 text-lg text-pink-custom">
                                            Reviewed By
                                        </h4>
                                    </template>
                                </ais-refinement-list>
                            </div>
                        </div>
                    </div>

                    <div class="flex w-5/6">
                        <ais-results>
                            <template slot-scope="{ result }">
                                <div class="inline-flex w-64 justify-start p-2 font-sans ">
                                    <div class="shadow-md border">
                                        <img class="flex" :src="result.src" style="height: 200px">
                                        <div class="p-2 pt-2 bg-grey-darker h-40">
                                            <div class="font-bold text-white text-xl mb-2">
                                                <ais-highlight :result="result"
                                                               attribute-name="display_title"></ais-highlight>
                                            </div>
                                            <p class="text-grey-light text-sm">
                                                <ais-highlight :result="result"
                                                               attribute-name="summary_short"></ais-highlight>
                                            </p>
                                        </div>
                                        <div class="bg-grey-darkest p-3 text-center">
                                            <span class="inline-block text-lg font-bold text-pink-custom mr-2 ">
                                                <a :href="result.url"
                                                   class="no-underline text-pink-custom">Read Review</a>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </template>
                        </ais-results>
                    </div>
                </div>
            </div>

            <div class="flex-col text-center">
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
                    'api-key': "f2ba5949ff8e47939e3b551d1fc42af1",
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
    .checkbox {
        padding-bottom: 10px;
    }

    .badge {
        background-color: #b9bbbe;
        padding: 4px;
        border-radius: 40px;
        margin-right: 6%;
        float: right;
        font-size: 12px;
        color: #4d4d4d;
    }

    .form-control {
        height: 24px;
    }

    .pagination {
        margin-top: 60px;
        margin-left: 100px;
    }

    .pagination ul {
        font-size: 0;
        list-style-type: none;
        text-align: center;
    }

    .pagination li {
        font-size: 14px;
        display: inline;
        background-color: #606f7b;
        color: white;
        padding-top: 6px;
        padding-bottom: 6px;
    }

    .pagination a {
        padding: 8px 12px;
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