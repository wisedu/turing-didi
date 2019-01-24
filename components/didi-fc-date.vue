<template>
    <didi-fc-cell :model="model" v-model="value">
        <Static slot="content" :display="display" :value="value"></Static>
    </didi-fc-cell>
</template>

<script>
import {ConnectItem} from 'tg-turing';
import DidiFcCell from './cell';
import Static from './static';
export default {
    name:"didi-fc-date",
    extends: ConnectItem,
    components: {
      Static   
    }
}
</script>

<style>

</style>
