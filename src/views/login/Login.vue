<template>
    <div class="login-container">
        <Form class="login-form-content">
            <div class="login-form-title">欢迎登录</div>
            <FormItem prop="username">
                <Input type="text" :value.sync="loginForm.username" placeholder="请输入用户名">
                    <Icon type="ios-person" slot="prepend"></Icon>`q
                </Input>
            </FormItem>
            <FormItem prop="password">
                <Input type="text" :value.sync="loginForm.password" placeholder="请输入密码">
                    <Icon type="md-lock"  slot="prepend"/>
                </Input>
            </FormItem>
            <FormItem>
                <Button
                        :loading="loading"
                        type="primary"
                        size="large"
                        @click="doLogin"
                        long>登录</Button>
            </FormItem>
        </Form>

        <ParticleWave></ParticleWave>
    </div>
</template>

<script>
    import ParticleWave from '../../components/particleWave/Index'
    import {Form, FormItem, Input} from 'view-design'
    export default {
        name: "Login",
        components: {
            ParticleWave, Form, FormItem, Input
        },
        data(){
            return {
                loginForm: {
                    username: '',
                    password: ''
                },
                loading: false
            }
        },
        methods: {
            doLogin(){
                console.log("111")
            }
        }
    }
</script>

<style scoped lang="scss">
.login-container{
    position: fixed;
    height: 100%;
    width: 100%;
    background-image: radial-gradient(circle, #7fdaf8, #7171B7); /*linear-gradient(to right , #7a88ff, #05145f);*/
    .login-form-content{
        width: 450px;
        height: 270px;
        padding: 0 20px 10px 20px;
        position: fixed;
        top: 200px;
        right: 100px;
        background: rgba(25,139,216, 0.25);
        filter:progid:DXImageTransform.Microsoft.gradient(startColorstr=#3f198bd8, endColorstr=#3f198bd8);
        z-index: 2;
        .login-form-title{
            height: 50px;
            line-height: 50px;
            margin-bottom: 15px;
            text-align: center;
            font-size: 20px;
            font-weight: bolder;
            color: white;
        }
    }
}
</style>
