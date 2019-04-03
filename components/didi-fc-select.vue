<template>
    <didi-fc-cell :model="model" v-model="value">
        <tg-select 
            v-if="!formReadonly && !readonly"
            slot="content"
            v-model="selectvalue" 
            :options="fullOptions"
            align="right"
            @confirm="handleConfirm" 
            @cancel="handleCancel"
        ></tg-select>
        <Static v-else slot="content" :display="display" :value="value"></Static>
    </didi-fc-cell>
</template>

<script>
import {ConnectItem} from 'tg-turing';
import DidiFcCell from './cell';
import Static from './static';
export default {
    name:"didi-fc-select",
    extends: ConnectItem,
    data: function() {
		return {
			localOptions:[],
            selectvalue:this.value,
            title:this.model.caption,
            selectoptions:this.options
		}
	},
    computed:{
    	fullOptions(){
            let opts = [];
            this.options.map(item => {
                if (opts.filter(opt => opt.value === item.value).length === 0) {
                    item.text = item.label;
                    opts.push(item)
                }
            })
            this.localOptions.map(item => {
                if (opts.filter(opt => opt.value === item.value).length === 0) {
                    item.text = item.label;
                    opts.push(item)
                }
            })
            return opts;
        }
    },
    watch:{
        value:function(val){
            this.selectvalue=this.value;
        }
    },
	mounted: function() {
		this.loadData('');
	},
	methods: {
		loadData(key){
            // debugger;
			//外部有加载数据的自定义函数
            if (this.loaddata !== undefined) {
                this.loaddata(this.name, items => {
                    if (Array.isArray(items) === false) {
                        this.localOptions = [];
                    } else {
                        this.localOptions = items;
                    }
                });
            } else {
                if (this.model.dict !== undefined) {
					// debugger
                	window["tg-turing"].defaults.getDictData[0](this.model.dict, {key}, datas => {
                        this.localOptions = datas.map(function(item) {
                        	item.text = item.label;
                        	return item;
                        });
                    });
                }
            }
        },
        handleConfirm(a,b){
            //debugger;
        	this.selectvalue=a.value;
            this.$emit('input',a.value);
        },
        handleCancel(){

        }
	},
    components: {
      Static   
    }
}
</script>

<style>

</style>
