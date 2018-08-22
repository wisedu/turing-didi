<template>
    <span class="didi-slot-span">{{display !== undefined ? display : value}}</span>
</template>

<script>
import {ConnectItem} from 'tg-turing'
export default {
    name:"Static",
    extends: ConnectItem,
    props:{
        display:String|Number,
        value:String|Number
    }
}
</script>

<style>
.didi-slot-span {
    height:34px;
    line-height:34px;
}
</style>
