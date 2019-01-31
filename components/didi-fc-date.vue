<template>
    <didi-fc-cell :model="model" v-model="value">
        <tg-datetime-picker
            v-if="!formReadonly && !readonly"
            slot="content"
			v-model="value"
			:placeholder="placeholder||'请选择'"
			:type="type"
			:segment-picker="isdatetime"
			@confirm="handleConfirm"
		>
		</tg-datetime-picker>
        <Static v-else slot="content" :display="display" :value="value"></Static>
    </didi-fc-cell>
</template>

<script>
import {ConnectItem} from 'tg-turing';
import DidiFcCell from './cell';
import Static from './static';
export default {
    name:"didi-fc-date",
    extends: ConnectItem,
    data(){
        return {
            isdatetime:false
        }
    },
    computed:{
        currentValue:function(){
            var key = this.model.xtype;
			switch (key) {
				case 'date-full':
					return this.value.split(' ');
					break;
				default:
					return this.value;
					break;
			}
        },
		type:function(){
			// debugger;
			var key = this.model.xtype;
			switch (key) {
				case 'date':
					return 'date';
					break;
				case 'date-ym':
					return 'dateym';
					break;
				case 'date-full':
					this.isdatetime = true;
					return 'datetime';
					break;
				default:
					return 'date';
					break;
			}
		}
	},
    methods:{
        handleConfirm:function(a,b,c){
            switch (this.model.xtype) {
				case 'date':
					this.$emit('input',a);
					break;
				case 'date-ym':
					this.$emit('input',a);
					break;
				case 'date-full':
					this.$emit('input',a[0] + ' ' +a[1]);
					break;
				default:
					this.$emit('input',a);
					break;
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
