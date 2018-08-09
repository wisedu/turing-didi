<template>
    <didi-fc-cell :model="model" v-model="value">
        <didi-fc-readonly slot="content" :display="display" :value="value"></didi-fc-readonly>
    </didi-fc-cell>
</template>

<script>
import {ConnectItem} from 'tg-turing'
import DidiFcCell from './didi-fc-cell'
import DidiFcReadonly from './didi-fc-readonly'
export default {
    name:"didi-fc-static",
    extends: ConnectItem,
}
</script>

<style>

</style>
