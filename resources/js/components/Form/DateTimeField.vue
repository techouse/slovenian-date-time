<template>
    <default-field :field="field" :errors="errors">
        <template slot="field">
            <div class="flex items-center">
                <slovenian-date-time-picker :field="field"
                                            :value="localizedValue"
                                            :date-format="dateFormat"
                                            class="w-full form-control form-input form-input-bordered"
                                            @change="handleChange"/>
                <span class="text-80 text-sm ml-2">({{ userTimezone }})</span>
            </div>
        </template>
    </default-field>
</template>

<script>
    import SlovenianDateTimePicker                                  from '../SlovenianDateTimePicker'
    import DateTimeFormatConverter                                  from '../../DateTimeFormatConverter'
    import {FormField, HandlesValidationErrors, InteractsWithDates} from 'laravel-nova'

    export default {

        components: {
            SlovenianDateTimePicker
        },

        mixins: [HandlesValidationErrors,
                 FormField,
                 InteractsWithDates],

        data() {
            return {
                defaultMomentJSFormat:  'YYYY-MM-DD HH:mm:ss',
                defaultFlatpickrFormat: 'd.m.Y H:i:S',
                localizedValue:         ''
            }
        },

        computed: {
            dateFormat() {
                if (this.field.format) {
                    try {
                        return DateTimeFormatConverter.momentToFlatpickr(this.field.format)
                    } catch (e) {
                        console.warn(e)
                    }
                }

                return this.defaultFlatpickrFormat
            }
        },

        methods: {
            /*
             * Set the initial value for the field
             */
            setInitialValue() {
                // Set the initial value of the field
                this.$set(this, 'value', this.field.value || '')

                // If the field has a value let's convert it from the app's timezone
                // into the user's local time to display in the field
                if (this.value !== '') {
                    this.$set(this, 'localizedValue', moment(this.value, this.defaultMomentJSFormat).format(this.field.format || this.defaultFlatpickrFormat))
                }
            },

            /**
             * Update the field's internal value when it's value changes
             */
            handleChange(value) {
                this.$set(this, 'value', moment(value, this.field.format).format(this.defaultMomentJSFormat))
            },
        },
    }
</script>
