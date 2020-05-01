<template>
    <div id="new-program" class="new-program">
        <b-container fluid>
            <b-row class="mb-1 text-center">
                <b-col cols="3"></b-col>
                <b-col></b-col>
                <b-col></b-col>
            </b-row>

            <b-row class="mb-1">
                <b-col cols="3">شناسه‌</b-col>
                <b-col cols="9">
                    <b-form-input
                        class="name-input"
                        v-model="name"
                        :state="requireValue ? false : null"
                    />
                </b-col>
            </b-row>

            <b-row class="mb-1">
                <b-col cols="3">پلتفرم</b-col>
                <b-col cols="9">
                    <b-form-select
                        v-model="platform"
                        :options="platforms"
                    ></b-form-select>
                </b-col>
            </b-row>

            <b-row>
                <b-col cols="3">پلن</b-col>
                <b-col cols="9">
                    <b-form-select :options="plans" v-model="plan">
                    </b-form-select>
                </b-col>
            </b-row>
        </b-container>
    </div>
</template>

<script>
export default {
    name: 'BuildNewProgram',
    data() {
        return {
            name: '',
            show: false,
            requireValue: false,
            plan: '',
            plans: [
                'nano',
                'micro',
                'standard-1x',
                'standard-2x',
                'performance-1x',
                'performance-2x',
            ],
            platform: '',
            platforms: ['vue', 'react', 'angular', 'nodejs', 'laravel'],
        }
    },
    watch: {
        name() {
            this.$emit('name', this.name)
        },
        plan() {
            this.$emit('plan', this.plan)
        },
        platform() {
            this.$emit('platform', this.platform)
        },
    },
}
</script>

<style lang="sass" scoped>
.new-program
    .name-input
        direction: ltr
</style>
