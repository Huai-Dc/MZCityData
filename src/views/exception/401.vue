<template>
    <div class="error-page">
        <Row>
            <Col :span="12">
                <h1 class="text-jumbo text-ginormous">
                    糟糕!
                </h1>
                <h2>你没有权限去该页面</h2>
                <Button type="primary">返回首页</Button>
            </Col>
            <Col :span="12">
                <img :src="errGif" width="313" height="428" alt="Girl has dropped her ice cream.">
            </Col>
        </Row>
    </div>
</template>

<script>
    import errGif from '@/assets/images/exception/401.gif'
    import {Row, Col} from 'view-design'
    export default {
        name: "Page401",
        components: {
            Row, Col
        },
        data(){
            return {
                errGif: errGif + '?' + +new Date(),
            }
        }
    }
</script>

<style lang="scss" scoped>
    .error-page{
        width: 800px;
        max-width: 100%;
        margin: 100px auto;
        h2{
            margin: 20px auto;
        }
        .text-jumbo {
            font-size: 60px;
            font-weight: 700;
            color: #484848;
            margin: 40px auto;
        }
    }
</style>
