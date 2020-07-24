<template>
    <Layout>
        <Sider class="i-layout-sider-dark" width="250" hide-trigger collapsible :collapsed-width="78" v-model="isCollapsed">
            <MSider></MSider>
        </Sider>
        <Layout>
            <Header>
                <MHeader></MHeader>
            </Header>
            <Content>
                <router-view></router-view>
            </Content>
        </Layout>
    </Layout>
</template>

<script>
    import { Layout, Header, Content, Footer, Sider } from 'view-design'
    import { MSider, MHeader } from './components/index'
    import {mapGetters} from "vuex";
    export default {
        name: "MyLayout",
        components: {
            Layout, Header, Content, Footer, Sider, MSider, MHeader
        },
        computed: {
            ...mapGetters([
                'isCollapsed'
            ])
        }
    }
</script>

<style scoped lang="scss">

</style>
