<template>
    <div id="login" class="login">
        <div class="unauthorized" id="unauthorized" v-show="!unauthorized">
            <p id="unauthorized-p"></p>
        </div>
        <div class="login-box">
            <h1>سلام !</h1>
            <h5 :class="requireValue ? 'empty-input' : ''">
                API key خودتو وارد کن
            </h5>
            <b-form-input
                class="login-box--input"
                v-model="apiKey"
                :state="requireValue ? false : null"
            />
            <b-button
                id="login-box--btn"
                class="login-box--btn"
                variant="success"
                @click="login"
            >
                ورود
            </b-button>
        </div>
        <div class="liara-details">
            <p class="liara-details__site">
                برای دسترسی به API key وارد<a :href="liaraURL" target="_blank">
                    حساب کاربری</a
                >
                خود شده <br />
                و در قسمت API کد مربوط را کپی کنید
            </p>

            <div class="liara-details__title">
                <img
                    src="../assets/logo.svg"
                    class="liara-details__title--logo"
                />
                <span>
                    <h4>لیارا</h4>
                </span>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    name: 'Login',
    data: () => ({
        liaraURL: 'https://console.liara.ir/API',
        apiKey: '',
        unauthorized: false,
        requireValue: false,
    }),
    created() {
        if (localStorage.token) {
            this.$router.push({ name: 'Home' })
        }
    },
    methods: {
        login() {
            if (this.apiKey) {
                document.getElementById('login-box--btn').disabled = true
                this.getAxios('https://api.liara.ir/v1/projects', 'Login')
            } else {
                this.requireValue = true
            }
        },
        getAxios(url, nameOfGet) {
            axios
                .get(url, {
                    headers: {
                        Authorization: 'Bearer ' + this.apiKey.toString(),
                    },
                })
                .then(response => {
                    if (response.status === 200) {
                        console.log(`${nameOfGet} Success`)
                        localStorage.setItem('token', this.apiKey)
                        this.$router.push({
                            name: 'Home',
                        })
                    } else {
                        console.log(response)
                        this.errorBaner('خطا - مجددا تلاش کنید')
                    }
                })
                .catch(e => {
                    if (e.response) {
                        console.log('Error Response')
                        if (e.response.status === 401) {
                            console.log('Unauthorized')
                            this.errorBaner('API key معتبر نمی‌باشد')
                            this.unauthorized = true
                        } else {
                            console.log(e, `${nameOfGet} Fail`)
                            this.errorBaner('خطا - مجددا تلاش کنید')
                        }
                    } else if (e.request) {
                        this.errorBaner('خطا - مجددا تلاش کنید')
                        console.log('Error Request')
                        console.log(e.request)
                    } else {
                        this.errorBaner('خطا - مجددا تلاش کنید')
                        console.log('Error', e)
                    }
                })
        },
        errorBaner(content) {
            document.getElementById(
                'unauthorized-p'
            ).textContent = content.toString()
            document.getElementById('unauthorized').style.top = '0'
            setTimeout(function() {
                document.getElementById('unauthorized').style.top = '-56px'
                document.getElementById('login-box--btn').disabled = false
            }, 5000)
        },
    },
}
</script>

<style lang="sass" scoped>
$themeColor : #2c333f
$red : #dc3545
$white : #ffffff
.login
    width: 100%
    height: 100%
    display: flex
    flex-direction: column
    justify-content: center
    align-items: center
    .unauthorized
        width: 100%
        position: absolute
        display: block !important
        text-align: center
        color: $white
        background-color: $red
        border-radius: 0px 0px 12px 12px
        transition: top 0.8s
        top: -56px
        > p
            padding-top: 1rem

    .login-box
        display: flex
        flex-direction: column
        justify-content: center
        align-items: center
        margin-top: auto
        width: 90%
        .empty-input
            color: $red
        &--input
            align-self: center
            margin: 30px 0
            background: #f1f2f6
            border-radius: 8px
            width: 90%
            direction: ltr
        &--btn
            width: 100px
    .liara-details
        text-align: center
        display: flex
        flex-direction: column
        margin-top: auto
        margin-bottom: 2em
        &__title
            display: flex
            flex-direction: row
            align-items: center
            justify-content: center
            &--logo
                width: 12%
                margin-bottom: 0.8em
                margin-left: 0.5em
        &__site
            font-size: 13px
</style>
