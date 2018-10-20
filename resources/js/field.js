Nova.booting((Vue, router) => {
    Vue.component('index-slovenian-date-time', require('./components/Index/DateTimeField'))
    Vue.component('detail-slovenian-date-time', require('./components/Detail/DateTimeField'))
    Vue.component('form-slovenian-date-time', require('./components/Form/DateTimeField'))
})
