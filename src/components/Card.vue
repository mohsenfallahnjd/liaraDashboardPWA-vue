<template>
    <div class="card">
        <b-icon-trash
            id="delete-btn"
            class="delete-icon"
            scale="1.3"
            variant="danger"
            @click="showAlert"
        />

        <b-alert
            :show="dismissCountDown"
            fade
            dismissible
            variant="danger"
            @dismiss-count-down="countDownChanged"
            class="delete-alert"
        >
            آیا برای حذف کردن مطمئن هستید؟!

            <b-button @click="deleteProgram" variant="success">
                بله
            </b-button>
        </b-alert>

        <b-img class="logo-type" :src="getImgUrl" />
        <h1>
            <b>{{ details.project_id }}</b>
        </h1>
        <Plan :planID="details.planID" />
        <p>
            ایجاد شده در: <strong>{{ createdAt }}</strong>
        </p>
        <b-checkbox switch size="lg" v-model="currentMode" @change="changeMode">
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
        dismissSecs: 25,
        dismissCountDown: 0,
    }),
    beforeMount() {
        this.currentMode = Boolean(Number(this.details.scale))
    },
    methods: {
        countDownChanged(dismissCountDown) {
            this.dismissCountDown = dismissCountDown
        },
        showAlert() {
            this.dismissCountDown = this.dismissSecs
        },
        deleteProgram() {
            document.getElementById('delete-btn').disabled = true
            this.dismissCountDown = 0
            axios
                .delete(
                    `https://api.liara.ir/v1/projects/${this.details.project_id}`,
                    {
                        headers: {
                            Authorization:
                                'Bearer ' + localStorage.token.toString(),
                        },
                    }
                )
                .then(response => {
                    if (response.status === 200) {
                        console.log(
                            `Delete '${this.details.project_id}' Program Success`
                        )
                        this.$emit('deleteOk', this.details.project_id)
                    } else {
                        console.log(response)
                        this.errorBanner()
                    }
                    document.getElementById('delete-btn').disabled = false
                })
                .catch(e => {
                    document.getElementById('delete-btn').disabled = false
                    this.errorBanner()
                    if (e.response) {
                        console.log('Error Response')
                        if (e.response.status === 401) {
                            console.log('Unauthorized')
                        } else {
                            console.log(
                                e,
                                `Delete '${this.details.project_id}' Program Fail`
                            )
                        }
                    } else if (e.request) {
                        console.log('Error Request')
                        console.log(e.request)
                    } else {
                        console.log('Error', e)
                    }
                })
        },
        errorBanner() {
            this.$emit('deleteErr')
        },
        changeMode(checked) {
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
                })
                .catch(e => {
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
    .delete-alert
        position: absolute
        align-self: center
        top: 10px
        display: flex
        justify-content: center
        flex-direction: column
        padding-right: 40px
    .logo-type
        width: 150px
    .greenColor
        color: $green
    .grayColor
        color: $gray
    .redColor
        color: $red
</style>
