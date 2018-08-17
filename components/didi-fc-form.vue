<template>
    <form :model="formValue" :label-width="labelWidth" :rules="validateRules" :class="{readonly:readonly}" class="cube-form_standard">
        <template v-for="item in fields" >
            <slot :name="item.name" :model="item" :value="formValue[item.name]" :display="formValue[item.name + displayFieldFormat]" :ref="'field_' + item.name" :formReadonly="readonly">
                <component :ref="'field_' + item.name" :model="item" :is="registedComponentList(item, didiForm, 'didi-fc-static', item.index)" v-model="formValue[item.name]" :display="formValue[item.name + displayFieldFormat]" :formReadonly="readonly" :validate="validateResult[item.name]"  @on-item-change="updateValue" v-bind="mergeDefaultParams(item)"></component>
            </slot>
        </template>
    </form>
</template>

<script>
import didiForm from "./form";
import DidiFcStatic from "./didi-fc-static.vue";
import {FormConnector} from "tg-turing";
import schema from 'async-validator';
//registedComponentList(item, didiForm, 'didi-fc-static', item.index)

export default {
    name:"didi-fc-form",
    extends: FormConnector,
    components: {
        DidiFcStatic
    },
    props:{
        labelWidth:Number,
        value:Object
    },
    watch:{
        fields(val){
            console.log(val)
        }
    },
    created(){
        //debugger
        console.log(this.fields)
    },
    data(){
        return {
            //当前字段隐藏时，让listview组件所占位的格子也隐藏
            didiForm: didiForm,
            validateResult:[]
        }
    },
    computed:{
    },
    methods: {
        validate() {
            var that = this;
            var validator = new schema(descriptor);
            validator.validate(that.formValue, (errors, fields) => {
                if(errors) {
                    // validation failed, errors is an array of all errors
                    // fields is an object keyed by field name with an array of
                    // errors per field
                    return that.handleErrors(errors, fields);
                }
                // validation passed
            });
            //this.$refs.form.validate(callback)
        },
        handleErrors(errors,fields){
            this.validateResult = fields
            console.log(errors,fields)
        },
        validateField() {
            this.$refs.form.validateField(prop, callback)
        },
        resetFields() {
            this.$refs.form.resetFields();
        },
        mergeDefaultParams(model) {
            //debugger
            let defaultParams = "";
            if(didiForm[model.xtype]){
                defaultParams = didiForm[model.xtype].default
            }
            if (defaultParams !== undefined) {
                return Object.assign({}, JSON.parse(JSON.stringify(defaultParams)), model);
            } else {
                return model;
            }
            
        }
    }
}
</script>

<style>


</style>
