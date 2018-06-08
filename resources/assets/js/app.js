
/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

import Vue from 'vue';


require('./bootstrap');

window.Vue = require('vue');


import Carousel3d from 'vue-carousel-3d';
Vue.use(Carousel3d);

import InstantSearch from 'vue-instantsearch';

Vue.use(InstantSearch);

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */
Vue.component('results', require('./components/results.vue'));
Vue.component('carousal', require('./components/carousal.vue'));



const app = new Vue({
    el: '#app',
    data: {
        slides: 40
    },
    components: {
        'carousel-3d': Carousel3d.Carousel3d,
        'slide': Carousel3d.Slide
    }
});
