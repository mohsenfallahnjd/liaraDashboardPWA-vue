<template>
    <div class="card">
        <b-icon-trash class="delete-icon" scale="1.3" variant="danger" />
        <b-img class="logo-type" :src="getImgUrl" />
        <h1>
            <b>{{ details.project_id }}</b>
        </h1>
        <Plan :planID="details.planID" />
        <p>
            ایجاد شده در: <strong>{{ createdAt }}</strong>
        </p>
        <b-checkbox
            id="toggle-btn"
            switch
            size="lg"
            v-model="currentMode"
            @change="changeMode"
        >
            <b :class="currentMode ? 'greenColor' : 'redColor'">
                {{ onORoff }}
            </b>
        </b-checkbox>
    </div>
</template>

<script>
import axios from 'axios'
import moment from 'moment'
import fa from 'moment/src/locale/fa'
import Plan from '@/components/Plan.vue'
export default {
    name: 'Card',
    props: {
        details: {
            type: Object,
        },
    },
    components: {
        Plan,
    },
    data: () => ({
        currentMode: false,
    }),
    beforeMount() {
        this.currentMode = Boolean(Number(this.details.scale))
    },
    methods: {
        changeMode(checked) {
            document.getElementById('toggle-btn').disabled = true
            this.postAxios(
                `https://api.liara.ir/v1/projects/${this.details.project_id}/actions/scale`,
                {
                    scale: Number(checked),
                },
                'changeMode'
            )
        },
        postAxios(url, formData, nameOfPost) {
            axios
                .post(url, formData, {
                    headers: {
                        Authorization:
                            'Bearer ' + localStorage.token.toString(),
                    },
                })
                .then(response => {
                    if (response.status === 200) {
                        console.log(`${nameOfPost} Success`)
                    } else {
                        console.log(response)
                        this.currentMode = !this.currentMode
                    }
                    document.getElementById('toggle-btn').disabled = false
                })
                .catch(e => {
                    document.getElementById('toggle-btn').disabled = false
                    this.currentMode = !this.currentMode
                    if (e.response) {
                        console.log('Error Response')
                        if (e.response.status === 401) {
                            console.log('Unauthorized')
                        } else {
                            console.log(e, `${nameOfPost} Fail`)
                        }
                    } else if (e.request) {
                        console.log('Error Request')
                        console.log(e.request)
                    } else {
                        console.log('Error', e)
                    }
                })
        },
    },
    computed: {
        getImgUrl() {
            var images = require.context('../assets/img', false, /\.svg$/)
            return images('./' + this.details.type + '.svg')
        },
        createdAt() {
            moment.updateLocale('fa', fa)
            return moment(this.details.created_at).fromNow()
        },
        onORoff() {
            if (this.currentMode) {
                return 'روشن'
            } else {
                return 'خاموش'
            }
        },
    },
}
</script>
<style lang="sass" scoped>
$themeColor : #2c333f
$red : #dc3545
$white : #ffffff
$gray : rgba(0, 0, 0, 0.3)
$green : #6DDE17

.card
    width: 300px
    height: 450px
    border-radius: 8px
    border: none
    box-shadow: 4px 6px 15px -11px rgba(0,0,0,0.85)
    margin: 0px 15px
    display: flex
    flex-wrap: wrap
    justify-content: space-around
    align-items: center
    background-color: #fafafa
    .delete-icon
        position: absolute
        align-self: flex-start
        top: 10px
        margin-right: 10px
    .logo-type
        width: 150px
    .greenColor
        color: $green
    .grayColor
        color: $gray
    .redColor
        color: $red
</style>
