<template>
    <div id="plan" class="plan">
        <div class="plan--title">
            <span>RAM</span>
            <span>CPU</span>
            <span>فضا</span>
            <span>در هر ساعت</span>
        </div>
        <div class="plan--details">
            <span>{{ plan[0].RAM }}</span>
            <span>{{ plan[0].cpu }}</span>
            <span>{{ plan[0].memory }}</span>
            <span>{{ plan[0].CPH }}</span>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Plan',
    props: {
        planID: {
            type: String,
        },
    },
    data: () => ({
        plans: [
            {
                id: 'small',
                RAM: '512 MB',
                cpu: '0.25 Core',
                memory: '2 گیگ',
                cost: '27,000 تومان در ماه',
                CPH: '37.5 تومان',
            },
            {
                id: 'medium',
                RAM: '1 GB',
                cpu: '0.5 Core',
                memory: '5 گیگ',
                cost: '54,000 تومان در ماه',
                CPH: '75 تومان',
            },
            {
                id: 'standard',
                RAM: '2 GB',
                cpu: '1 Core',
                memory: '10 گیگ',
                cost: '108,000 تومان در ماه',
                CPH: '150 تومان',
            },
            {
                id: 'standard-2x',
                RAM: '4 GB',
                cpu: '2 Core',
                memory: '20 گیگ',
                cost: '216,000 تومان در ماه',
                CPH: '300 تومان',
            },
            {
                id: 'large',
                RAM: '6 GB',
                cpu: '3 Core',
                memory: '40 گیگ',
                cost: '324,000 تومان در ماه',
                CPH: '450 تومان',
            },
            {
                id: 'large-2x',
                RAM: '8 GB',
                cpu: '4 Core',
                memory: '60 گیگ',
                cost: '432,000 تومان در ماه',
                CPH: '600 تومان',
            },
        ],
    }),
    computed: {
        plan() {
            return this.plans.filter(plan => plan.id == this.planID)
        },
        // smallConvertNano() {
        //     return this.planID == 'small' ? 'nano' : this.planID
        // },
    },
}
</script>

<style lang="sass" scoped>
$themeColor : #2c333f
$red : #dc3545
$white : #ffffff
$gray : rgba(0, 0, 0, 0.3)
$green : #6DDE17
.plan
    width: 280px
    height: 40px
    border-radius: 3px
    // box-shadow: 4px 6px 15px -13px rgba(0,0,0,0.3)
    display: flex
    flex-direction: column
    align-items: center
    justify-content: center
    font-size: 13px
    font-weight: 600
    &--title
        display: flex
        width: 100%
        justify-content: space-around
    &--details
        display: flex
        width: 100%
        justify-content: space-around
</style>
