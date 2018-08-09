<template>
    <cube-form
        :model="formValue"
        :schema="schema"
        :immediate-validate="false"
        :options="options"
        @validate="validateHandler"
        @submit="submitHandler"
        @reset="resetHandler"></cube-form>
</template>

<script>
import didiForm from "./form";
import DidiFcStatic from "./didi-fc-static.vue";
import {FormConnector} from "tg-turing";
export default {
    name:"didi-fc-form",
    extends: FormConnector,
    components: {
        DidiFcStatic
    },
    created(){
        console.log(this.fields)
    },
    computed:{
        schema(){
            var result = {
                fields:[]
            };
            result.fields = this.fields.map(function(item){
                var adapterSchema = {
                    type: item.xtype,
                    modelKey: item.name,
                    label: item.caption,
                    props:{
                        
                    },
                    rules: {
                        required: item.required
                    },
                    messages: {
                        required: didiForm[item.xtype].required.message
                    }
                };
                var options = {};
                //console.log('------------adapterSchema----------')
                switch (adapterSchema.type) {
                    case 'checkboxlist':
                        adapterSchema.type = 'checkbox-group'
                        break;
                    case 'date-local':
                        adapterSchema.type = 'text';
                        break;
                    //case 'date-local':
                    case 'selecttable':
                    case 'date-ym':
                    case 'text':
                        adapterSchema.type = 'input';
                        break;
                    case 'uploadfile':
                        adapterSchema.type = 'upload';
                        break;
                       
                    default:
                        break;
                }
                switch (adapterSchema.type) {
                    case 'checkbox':
                    case 'checkbox-group':
                    case 'radio':
                    case 'radio-group':
                        options = ['1','2','3'];
                        adapterSchema.props.options = options;
                        break;
                    case 'select':
                        options = [2015, 2016, 2017, 2018, 2019, 2020];
                        adapterSchema.props.options = options;
                        break;
                    case 'input':
                        options = 'hello world';
                        adapterSchema.props.options = options;
                        break;
                    default:
                        break;
                }
                
                return adapterSchema;
            });
            console.log('------------result------------')
            console.log(result);
            result.fields.push({
                type: 'submit',
                label: 'Submit'
              });
            return result
        }
    },
    data() {
        return {
            validity: {},
            valid: undefined,
            options: {
                scrollToInvalidField: true,
                layout: 'standard' // classic fresh
            }
        }
    },
    methods: {
        submitHandler(e) {
            e.preventDefault()
            console.log('submit', e)
        },
        validateHandler(result) {
            this.validity = result.validity
            this.valid = result.valid
            console.log('validity', result.validity, result.valid, result.dirty, result.firstInvalidFieldIndex)
        },
        resetHandler(e) {
            console.log('reset', e)
        }
    }
}
</script>

<style>
.cube-form {
    font-size: 14px;
}
.cube-textarea-wrapper {
    box-sizing: content-box
}
/* .cube-form_standard .cube-form-item_required .cube-form-label:before {
    position: absolute;
    left: 6px;
}
.readonly .ivu-form{
    border-top: 1px solid #e9eaec;
    border-left: 1px solid #e9eaec;
}
.readonly .ivu-form .ivu-form-item-label{
    background-color: #f8f8f9;
    border-bottom: 1px solid #e9eaec;
    border-right: 1px solid #e9eaec;
}
.readonly .ivu-form .ivu-form-item{
    margin-bottom: 0;
    display: flex;
}
.readonly .ivu-form .ivu-form-item-content{
    border-bottom: 1px solid #e9eaec;
    border-right: 1px solid #e9eaec;
    width: calc(100% - 100px);
    margin-left: 0!important;
}
.readonly .ivu-form .ivu-upload-select{
    display: none;
} */
</style>
