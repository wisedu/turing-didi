<template>
    <span>{{display !== undefined ? display : value}}</span>
</template>

<script>
import {ConnectItem} from 'tg-turing'
import DidiFcReadonly from './didi-fc-readonly'
export default {
    name:"didi-fc-readonly",
    extends: ConnectItem,
    props:{
        display:String|Number,
        value:String|Number
    }
}
</script>

<style>

</style>
