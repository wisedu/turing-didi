<template>
    <div class="didi-avater">
        <avatar :width="60" :ratio="1" contextPath="http://localhost:8080/emap"></avatar>
        <div class="didi-avater-des">修改头像</div>
    </div>
</template>
<script>
    import Vue from 'vue';
    import utils from '../utils';
    import avatar from './avatar';
    import {ConnectItem} from 'tg-turing';
    export default {
        name : "didi-fc-avatar",
        extends: ConnectItem,
        props: {

        },
        watch: {
        },
        data() {
            return {
                
            }
        },
        mounted() {
            
        },
        methods: {
        }
    }
</script>
<style>

</style>
<style scoped>
.didi-avater {
    padding:10px 0;
    margin-left:17px;
    box-shadow: inset 0 -1px 0 0 #EDF2FB;
}
.didi-avater-des {
    display:inline-block;
    padding-left:43px;
    color: #43454F;
}
</style>