<template>
    <div id="app">
        <ais-index app-id="7VM1U74DCL" api-key="5af9433923da9f95516b8c7d6cfb3866" indexName="reviews">
            <div class="lg:flex md:flex sm:flex lg:mx-8 md:mx-8 sm:mx-8 lg:my-4 md:my-4 sm:my-4 lg:py-4 md:py-4 sm:py-4 justify-between">
                <div class="sidebar lg:w-1/6 md:w-1/4 sm:w-1/2 px-4 py-4 bg-purple-darker text-white overflow-hidden lg:mr-8 mb-8 lg:rounded md:rounded sm:rounded rounded-none">
                    <div class="flex bg-purple-darkest -mx-4 -mt-4 mb-4 p-3 justify-between items-center lg:rounded-t md:rounded-t">
                        <h1 class="text-base text-white text-center"> Search </h1>
                        <ais-clear
                                :class-names="{'ais-clear': 'bg-pink hover:bg-pink-custom text-white text-sm px-2 py-1 rounded shadow-md font-bold'}"
                                title="Clear search">Reset
                        </ais-clear>
                    </div>
                    <div class="items-center text-center my-3 lg:hidden md:hidden sm:hidden block">
                        <ais-input placeholder=" Search"
                                   :class-names="{'ais-input': 'form-control p-2 rounded w-full'}"></ais-input>
                        <h4 class="text-md mt-6" v-on:click="isHidden = !isHidden">Filter Results
                            <i class="fas fa-chevron-circle-down mx-2"></i></h4>
                    </div>

                    <div class="filter items-center my-3 sm:block lg:block md:block animated fadeInDown" v-bind:class="{ hidden: isHidden }">
                        <ais-refinement-list attribute-name="opening_date" :sort-by="['isRefined:desc', 'name:desc']"
                                             :classNames="{'ais-refinement-list__count': 'badge','ais-refinement-list__item': 'checkbox'}">
                            <template slot="header"><h2 class="my-6 p-2 border-b border-pink-custom text-base -mx-4 shadow">Release
                                Date</h2></template>
                        </ais-refinement-list>
                    </div>

                    <div class="filter items-center my-3 sm:block lg:block md:block animated fadeInDown" v-bind:class="{ hidden: isHidden }">
                        <ais-refinement-list attribute-name="byline" :sort-by="['name:asc']"
                                             :classNames="{'ais-refinement-list__count': 'badge','ais-refinement-list__item': 'checkbox'}">
                            <template slot="header"><h2 class="my-6 p-2 border-b border-pink-custom  text-base -mx-4 shadow">Reviewers</h2>
                            </template>
                        </ais-refinement-list>
                    </div>

                    <h4 v-if="!isHidden" class="lg:hidden md:hidden sm:hidden block text-md my-3 text-center" v-on:click="isHidden = !isHidden">Close
                        <i class="fas fa-times-circle"></i></h4>
                </div>
                <div class="flex-row lg:w-4/5 md:w-4/5 sm:w-4/5 lg:px-4 md:px-4 sm:px-4 lg:ml-4 lg:border-l border-grey md:ml-4 md:border-l">
                    <div class="mx-auto items-center">
                        <ais-no-results>
                            <template slot-scope="props">
                                <p class="text-lg text-white">Sorry, No movies found for '<i class="text-purple-light">{{
                                    props.query }}</i>'</p>.
                            </template>
                        </ais-no-results>
                    </div>
                    <h2 class="block lg:hidden md:hidden sm:hidden text-center text-purple-darkest px-2 py-1 mb-4 font-sans leading-none tracking-tight">
                        LATEST MOVIES
                    </h2>
                    <ais-results class="text-purple-darkest flex flex-wrap lg:-mr-8 md:-mr-8 items-center justify-center">
                        <template slot-scope="{ result }">
                            <div class="xl:1/6 lg:w-1/4 md:w-2/5 sm:w-full w-2/5 bg-white lg:mx-8 md:mx-4 sm:mx-1 mx-2 mb-8 shadow-md rounded">
                                <div>
                                    <img :src="result.src" class="shadow-md w-full">
                                    <div class="overflow-hidden mx-4 my-2 lg:h-32 md:h-32 sm:h-32 h-40 mb-4 pb-2">
                                        <div class="lg:text-lg md:text-lg sm:text-md text-md items-center my-2 leading-normal font-bold">
                                            <ais-highlight :result="result"
                                                           attribute-name="display_title"></ais-highlight>
                                        </div>
                                        <div class="text-xs items-center my-2 text-pink-darkest leading-normal">
                                            <span class="mr-2">
                                                <i class="fas fa-user-edit text-pink-darkest shadow-md rounded-full"></i>
                                            </span>
                                            <ais-highlight :result="result"
                                                           attribute-name="byline"></ais-highlight>
                                        </div>
                                        <p class="text-purple-darker leading-normal text-sm mb-2 pb-2">
                                            <ais-highlight :result="result"
                                                           attribute-name="summary_short"></ais-highlight>
                                        </p>
                                    </div>
                                    <div class="w-full items-center lg:p-3 md:p-3 sm:p-2 p-2 bg-purple-darkest hover:bg-pink-darkest text-center">
                                        <span> <a :href="result.url" class="no-underline text-white text-md"><i
                                                class="fab fa-readme px-2 items-end"></i>Read Review</a> </span>
                                    </div>
                                </div>
                            </div>
                        </template>
                    </ais-results>
                </div>
            </div>
            <div class="flex items-center justify-center -ml-8 mr-2 mb-8">
                <ais-pagination v-on:page-change="onPageChange" class="inline-flex pagination">
                </ais-pagination>
            </div>
        </ais-index>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                isHidden: true
            }
        },
        methods: {
            onPageChange(page) {
                window.scrollTo(0, 520);
            },

        // filter() {
        //         var vm = this;
        //         const element = document.querySelector('.filter');
        //         const list =  document.querySelectorAll('.filter');
        //         list.forEach(element => {
        //             element.classList.remove('animated', 'fadeInDown');
        //             element.classList.add('animated', 'bounceOutLeft');
        //         });
        //         element.addEventListener('animationend', function()
        //         {
        //             console.log(vm.isHidden);
        //             vm.isHidden = true;
        //             console.log(vm.isHidden);
        //         })
        //         return this.isHidden;
        //     },
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
        list-style-type: none;
    }
    .pagination li {
        font-size: 14px;
        display: inline;
        color: white;
        padding: 0.3rem;
        background-color: #20243F;

    }
    .pagination a {
        padding: 0.5rem;
        text-decoration: none;
        color: white;
    }
    .pagination li:first-child {
        border-radius: 4px 0 0 4px;
    }
    .pagination li:last-child {
        border-radius: 0 4px 4px 0;
    }
    .pagination li.ais-pagination__item--active {
        background: #E84A63;
    }
    .pagination li.ais-pagination__item--disabled {
        background: #394166;
    }
    .pagination li.ais-pagination__item:hover {
        background: #E84A63;
    }
    .pagination li.ais-pagination__item--disabled:hover {
        background: #394166;
    }

    @media (max-width: 576px) {
        .pagination li.ais-pagination__item {
            display: none;
        }
        .pagination li.ais-pagination__item--next {
            display: block;
            border-radius: 0 4px 4px 0;
        }
        .pagination li.ais-pagination__item--previous {
            display: block;
            border-radius: 4px 0 0 4px;

        }
    }
</style>