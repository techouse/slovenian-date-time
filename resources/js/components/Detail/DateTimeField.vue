<template>
    <panel-item :field="field">
        <template slot="value">
            <p v-if="field.value" class="text-90">{{ localizedDateTime }}</p>
            <p v-else>&mdash;</p>
        </template>
    </panel-item>
</template>

<script>
    import {InteractsWithDates} from 'laravel-nova'

    export default {
        mixins: [InteractsWithDates],

        props: {
            resource:     {
                type:     Object,
                required: true
            },
            resourceName: {
                type:     String,
                required: true
            },
            resourceId:   {
                type:     Number | String,
                required: true
            },
            field:        {
                type:     Object,
                required: true
            }
        },

        data() {
            return {
                defaultMomentJSFormat: 'YYYY-MM-DD HH:mm:ss',
            }
        },

        computed: {
            /**
             * Get the localized date time.
             */
            localizedDateTime() {
                return moment(this.field.value, this.defaultMomentJSFormat).format(this.field.format)
            },
        },
    }
</script>
