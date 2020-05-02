<template>
    <div id="home" class="home">
        <nav class="home-nav">
            <h3><strong>برنامه‌ها</strong></h3>
            <h3><b-icon-box-arrow-left @click="logOut" /></h3>
        </nav>
        <div class="banner" id="banner" v-show="!banner">
            <p id="banner-p"></p>
        </div>
        <div class="card-list">
            <Card
                class="card-component"
                v-for="item in projects"
                :key="item.id"
                :details="item"
                @deleteErr="pushBanner"
                @deleteOk="deleteOk"
            />
        </div>
        <b-icon-plus-circle-fill
            id="floating-plus"
            variant="primary"
            scale="3"
            class="floating-plus-btn"
            @click="modalShow = !modalShow"
        />
        <b-modal centered v-model="modalShow">
            <template v-slot:modal-header>
                <div class="w-100">
                    <h3 class="float-right">ساخت برنامه‌ی جدید</h3>
                </div>
            </template>

            <BuildNewProgram
                @name="getName"
                @platform="getPlatform"
                @plan="getPlanID"
            />

            <template v-slot:modal-footer>
                <div class="w-100">
                    <b-button
                        variant="success"
                        size="sm"
                        class="float-right"
                        @click="
                            createProgram()
                            modalShow = false
                        "
                    >
                        ایجاد برنامه
                    </b-button>
                </div>
            </template>
        </b-modal>
    </div>
</template>

<script>
import axios from 'axios'
import Card from '@/components/Card.vue'
import BuildNewProgram from '@/components/BuildNewProgram.vue'
export default {
    name: 'Home',
    data: () => ({
        projects: {},
        modalShow: false,
        newProgram: {
            name: '',
            platform: '',
            planID: '',
        },
        banner: false,
    }),
    components: {
        Card,
        BuildNewProgram,
    },
    created() {
        if (!localStorage.token) {
            this.$router.push({ name: 'Login' })
        } else {
            this.getAxios('https://api.liara.ir/v1/projects', 'v1/projects')
        }
    },
    methods: {
        getName(i) {
            this.newProgram.name = i
        },
        getPlatform(i) {
            this.newProgram.platform = i
        },
        getPlanID(i) {
            this.newProgram.planID = i
        },
        logOut() {
            localStorage.token = ''
            this.$router.push({ name: 'Login' })
        },
        deleteOk(deleteItem) {
            this.pushBanner('برنامه با موفقیت حذف شد', '#6DDE17 ')
            this.projects = this.projects.filter(
                item => item.project_id != deleteItem
            )
        },
        pushBanner(content = 'لطفا مجددا تلاش کنید', color = '#dc3545') {
            this.banner = true

            document.getElementById('banner-p').textContent = content.toString()
            document.getElementById(
                'banner'
            ).style.backgroundColor = color.toString()
            document.getElementById('banner').style.top = '69px'

            setTimeout(function() {
                document.getElementById('banner').style.top = '0px'
            }, 5000)
            this.banner = false
        },
        createProgram() {
            document.getElementById('floating-plus').disabled = true
            this.postAxios(
                'https://api.liara.ir/v1/projects',
                this.newProgram,
                'create New Program'
            )
        },
        getAxios(url, nameOfGet) {
            axios
                .get(url, {
                    headers: {
                        Authorization:
                            'Bearer ' + localStorage.token.toString(),
                    },
                })
                .then(response => {
                    if (response.status === 200) {
                        console.log(`${nameOfGet} Success`)
                        this.projects = response.data.projects
                        console.log(this.projects)
                    } else {
                        console.log(response)
                    }
                })
                .catch(e => {
                    if (e.response) {
                        console.log('Error Response')
                        if (e.response.status === 401) {
                            console.log('Unauthorized')
                        } else {
                            console.log(e, `${nameOfGet} Fail`)
                        }
                    } else if (e.request) {
                        console.log('Error Request')
                        console.log(e.request)
                    } else {
                        console.log('Error', e)
                    }
                })
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
                        this.pushBanner('برنامه با موفقیت ایجاد شد', '#6DDE17 ')
                        setTimeout(function() {
                            location.reload()
                        }, 5000)
                    } else {
                        this.pushBanner('لطفا مجددا تلاش کنید', '#dc3545')
                        console.log(response)
                    }
                    document.getElementById('floating-plus').disabled = false
                })
                .catch(e => {
                    document.getElementById('floating-plus').disabled = false
                    this.pushBanner()

                    if (e.response) {
                        console.log('Error Response')
                        if (e.response.status === 401) {
                            console.log('Unauthorized')
                        } else if (
                            e.response.data.message === 'Project exists.'
                        ) {
                            document.getElementById('banner-p').textContent =
                                'این شناسه موجود است...!'
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
}
</script>

<style lang="sass" scoped>
$themeColor : #2c333f
$red : #dc3545
$white : #ffffff
.home
    width: 100%
    height: 100%
    display: flex
    flex-direction: column
    justify-content: center
    align-items: center
    overflow: hidden
    .home-nav
        height: 69px
        width: 100%
        background-color: $themeColor
        color: $white
        position: fixed
        top: 0
        display: flex
        align-items: center
        justify-content: space-between
        padding: 8px 20px 0px 20px
        box-shadow: 4px 6px 15px -8px rgba(0,0,0,0.85)
        z-index: 2
    .banner
        width: 100%
        height: 50px
        position: absolute
        display: block !important
        text-align: center
        color: $white
        border-radius: 0px 0px 12px 12px
        transition: top 0.8s
        top: 0px
        z-index: 1
        > p
            padding-top: 0.8rem
    .card-list
        height: 500px
        width: 98vw
        display: flex
        align-items: center
        overflow-x: auto
        overflow-y: hidden
        &::-webkit-scrollbar
            display: none
        .card-component
            flex: 0 0 auto
            margin-top: 30px
    .floating-plus-btn
        position: fixed
        bottom: 40px
        right: 40px
        z-index: 1
</style>
