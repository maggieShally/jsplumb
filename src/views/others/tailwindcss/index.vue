
<!--
 * @Description: 
 * @Date: 2022-07-19 14:57:57
 * @LastEditTime: 2024-05-27 10:58:04
 * @FilePath: \webpack-teste:\others\jsplumb-test\src\views\others\tailwindcss\index.vue
-->
<template>
	<div class="flex h-20 space-x-4">
		<div class="flex-initial p-2 border-2 border-pink-300 border-dashed rounded-md"> {{ $t("person.name") }} </div>
		<div class="flex-initial p-2 border-2 border-pink-300 border-dashed rounded-md">{{ $t("person.hobby") }}</div>
		<div class="flex-initial p-2 overflow-auto border-2 border-pink-300 border-dashed rounded-md">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Qui ad labore ipsam, aut rem quo repellat esse
			tempore id, quidem</div>
	</div>

	<div class="my-5 border-2 border-pink-300 border-dashed rounded-md"></div>

	<div class="two-column-layout">
		<div class="left"></div>
		<div class="right"></div>
	</div>
	
</template> 

<script>
import { reactive, toRefs, onMounted } from 'vue'

export default {
	name: 'TailWindCssPage',
	components: {
	},
	setup() {
		const state = reactive({

		})

		onMounted(() => {
		})


		return {
			...toRefs(state)

		}
	}
}
</script>

<style lang="less" scoped>
.grail-layout {
	padding: 0 100px;
	width: 400px;
	height: 400px;

	.left {
		float: left;
		margin-left: -100px;
		width: 100px;
		height: 100%;
		background-color: #f66;
	}

	.right {
		float: right;
		margin-right: -100px;
		width: 100px;
		height: 100%;
		background-color: #66f;
	}

	.center {
		height: 100%;
		background-color: #3c9;
	}
}
</style>