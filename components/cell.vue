<template>
    <tg-cell :title="model.caption" customized solid :required="model.required">
        <slot name="content"></slot>
    </tg-cell>
</template>

<script>
import {ConnectItem} from 'tg-turing'
export default {
    name:"didi-fc-cell",
    extends: ConnectItem,
    data(){
        return {
            currentValue:''
        } 
    },
    props:{
        model:Object
    },
    computed:{
        // currentValue(){
        //     return this.value;
        // }
    },
    created(){
        this.currentValue = this.value;
    },
    watch:{
        currentValue(val){
            this.$emit("input", val)
        }
    },
    methods:{
        // onChange(value){
        //     if (event.isComposing !== true) {
        //         let label = value;
        //         this.$emit("on-item-change", this.name, value, label, this.model)
        //         this.$emit("input", currentValue)
        //     }
        // }
    },
    mounted(){
        
    }
}


</script>

<style>
.cube-form-label {
    width:100px;
}
.cube-form-msg:before {
    color:red;
    content: "\E614";
    padding-left: 5px;
    font-family: cube-icon!important;
    font-size: 20px;
    font-style: normal;
    -webkit-font-smoothing: antialiased;
    -webkit-text-stroke-width: .2px;
    -moz-osx-font-smoothing: grayscale;
}
.cube-form_standard .cube-form-item_required .cube-form-label:before {
    position: absolute;
    left: 6px;
}
</style>
