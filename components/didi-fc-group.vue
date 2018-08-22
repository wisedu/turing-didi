<template>
    <!-- <div class="tg-mb-24">
        <h4 class="didi-fc-group-title">{{name}}</h4>
        <slot></slot>
    </div> -->
    <tg-cell-group :title="name">
		<slot></slot>
	</tg-cell-group>
</template>

<script>
export default {
    name:"didi-fc-group",
    props: {
        name: String,
        desc: String
    }
}
</script>

<style>
/* .didi-fc-group-title {
    font-size: 16px;
    font-weight: 700;
    padding-left: 8px;
    line-height: 16px;
    min-height: 0;
    margin-bottom: 16px
} */
</style>
