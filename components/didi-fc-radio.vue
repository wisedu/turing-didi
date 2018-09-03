<template>
    <didi-fc-cell :model="model" :class="{'didi-fc-item-error':isValidate}" :ref="name">
        <!-- <tg-input 
            v-if="!formReadonly && !readonly"
            slot="content"
            v-model="currentValue"
            :placeholder="placeholderText"
            type="text">
        </tg-input> -->
        <tg-radio
            v-if="!formReadonly && !readonly"
            slot="content"
            v-model="currentValue"
            :options="options"
            type="button"
            horizontal>
        </tg-radio>
        <Static v-else slot="content" :display="display" :value="value"></Static>
    </didi-fc-cell>
</template>

<script>
import {ConnectItem} from 'tg-turing';
import DidiFcCell from './cell';
import Static from './static';
export default {
    name:"didi-fc-radio",
    extends: ConnectItem,
    data(){
        return {
            currentValue:'',
            validateItem:this.validate,
            placeholderText:"请输入",
            isValidate:false
        } 
    },
    props:{
        validate:Array|String|Object
    },
    computed:{
        // placeholderText(){
        //     if(this.validateItem && this.validateItem.length>0){
        //         return this.validateItem[0].message;
        //     }
        //     return ;
        // }
    },
    created(){
        //debugger
        this.currentValue = this.value;
    },
    watch:{
        currentValue(val){
            this.$emit("input", val)
        },
        validate:{
            handler(newVal, oldVal) {
                console.log('------val------',newVal)
                this.validateItem = newVal;
                if(this.validateItem && this.validateItem.length>0){
                    this.isValidate = true;
                    this.placeholderText = this.validateItem[0].message;
                }
            },
            deep: true
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
        
    },
    components: {
      Static   
    }
}


</script>
<style scope>
.tg-radio .md-radio-item .md-field-item-inner {
    box-shadow:none !important;
}
</style>
