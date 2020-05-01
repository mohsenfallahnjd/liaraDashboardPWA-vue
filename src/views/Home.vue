<template>
    <div id="home" class="home">
        <nav class="home-nav">
            <h3><strong>برنامه‌ها</strong></h3>
            <h3><b-icon-box-arrow-left @click="logOut" /></h3>
        </nav>
        <div class="card-list">
            <Card
                class="card-component"
                v-for="item in projects"
                :key="item.id"
                :details="item"
            />
        </div>
        <b-icon-plus-circle-fill
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
                    <!-- <p class="float-left">Modal Footer Content</p> -->
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
        createProgram() {
            console.log(this.newProgram)
        },
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
        z-index: 1
    .card-list
        height: 500px
        display: flex
        align-items: center
        justify-content: center
        overflow-x: auto
        overflow-y: hidden
        &::-webkit-scrollbar
            display: none
        .card-component
            flex: 0 0 auto
    .floating-plus-btn
        position: fixed
        bottom: 40px
        right: 40px
        z-index: 1
</style>
