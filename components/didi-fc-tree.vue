<template>
    <didi-fc-cell :model="model" v-model="value">
        <tg-tree 
            v-if="!formReadonly && !readonly"
            slot="content" 
            v-model="currentValue" 
            :keyId="keyId" 
            :options="options" 
            :parentSelectable="true" 
            :is-view="true" 
            :is-async="true" 
            @cell-click="cellClick" 
            @selector-click="loadOptions" 
            @selected-click="getSelectedValue"
        ></tg-tree>
        <Static v-else slot="content" :display="display" :value="value"></Static>
    </didi-fc-cell>
</template>

<script>
import {ConnectItem} from 'tg-turing';
import DidiFcCell from './cell';
import Static from './static';
export default {
    name:"didi-fc-tree",
    extends: ConnectItem,
    data: function() {
		return {
			keyId:'',
			currentValue:this.value,
			options:[]
		}
	},
	computed:{
		
	},
	mounted: function() {
		// console.log(this)
	},
	watch:{
		currentValue(val){
			if(val){
				this.$emit('input',val);
			}
		}
	},
	methods: {
		loadOptions:function(key){
			// debugger
			var that = this;
			this.options = [];
			window["tg-turing"].defaults.getDictTreeData[0](this.model.dict, {key:key}, datas => {
				this.options = datas.map(function(item) {
					return item;
				});
			});
		},
		getSelectedValue:function(){
			// debugger
			this.$emit('input',this.currentValue);
		},
		cellClick:function(){
			var key = "";
			if (this.model.dict !== undefined) {
				// debugger
				window["tg-turing"].defaults.getDictTreeData[0](this.model.dict, {key},datas => {
					this.options = datas.map(function(item) {
						return item;
					});
				});
			}
		}
	},
    components: {
      Static   
    }
}
</script>

<style>

</style>
