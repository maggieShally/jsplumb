<!--
 * @Description: 
 * @Date: 2022-07-19 14:57:57
 * @LastEditTime: 2024-08-13 15:29:43
 * @FilePath: \webpack-teste:\others\jsplumb-test\src\views\others\tailwindcss\index.vue
-->
<template>
	<div>
		<div class="flex h-20 space-x-4">
			<div class="flex-initial p-2 border-2 border-pink-300 border-dashed rounded-md"> {{ $t("person.name") }} </div>
			<div class="flex-initial p-2 border-2 border-pink-300 border-dashed rounded-md">{{ $t("person.hobby") }}</div>
			<div class="flex-initial p-2 overflow-auto border-2 border-pink-300 border-dashed rounded-md">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Qui ad labore ipsam, aut rem quo repellat
				esse
				tempore id, quidem</div>
		</div>

		<div class="my-5 border-2 border-pink-300 border-dashed rounded-md"></div>

		<div style="width: 100%; display: flex; align-items: center;">

			<div class="testBox"></div>

			<ul class="strip-loading">
				<li style="--line-index: 1;"></li>
				<li style="--line-index: 2;"></li>
				<li style="--line-index: 3;"></li>
				<li style="--line-index: 4;"></li>
				<li style="--line-index: 5;"></li>
				<li style="--line-index: 6;"></li>
			</ul>

			<!-- 背景颜色渐变 -->
			<div class="linerBg"></div>

			<!-- 心型 -->
			<div class="heart-shape"></div>

			<!-- 细边框 0.5 -->
			<div class="thinBorder"></div>
		</div>

		<!-- 自动打字 -->
		<div class="auto-typing">
			Do You Want To Know More About CSS Development Skill
		</div>

		<!-- 手风琴效果 -->
		<div class="accordion">
			<li style="--line-index: 1;"></li>
			<li style="--line-index: 2;"></li>
			<li style="--line-index: 3;"></li>
			<li style="--line-index: 4;"></li>
			<li style="--line-index: 5;"></li>
			<li style="--line-index: 6;"></li>
		</div>
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

.testBox {
	width: 40px;
	height: 40px;
	background-color: var(--bg-color-red);
	border: 1px solid #ddd;
}

.strip-loading {
	display: flex;
	justify-content: center;
	align-items: center;
	width: 200px;
	height: 200px;

	li {
		--time: calc((var(--line-index) - 1) * 200ms);
		border-radius: 3px;
		width: 6px;
		height: 30px;
		background-color: #f66;
		animation: beat 1s ease-in-out var(--time) infinite;

		&+li {
			margin-left: 5px;
		}
	}
}

@keyframes beat {
	0%,
	100% {
		transform: scaleY(1);
	}

	50% {
		transform: scaleY(.5);
	}
}

.linerBg {
	width: 200px;
	height: 150px;
	background: linear-gradient(135deg, #f66, #f90, #3c9, #09f, #66f) center/400% 400%;
}

// 心型
.heart-shape {
	margin: 30px;
	width: 50px;
	height: 50px;
	background-color: #ddd;
	position: relative;
	transform: rotate(45deg);
	
	animation: testScale 1s infinite;

	&::before,
	&::after {
		content: '';
		width: 100%;
		height: 100%;
		border-radius: 50%;
	}

	&::before {
		background-color: #ddd;
		position: absolute;
		transform: translate(-50%);
	}

	&::after {
		background-color: #ddd;
		position: absolute;
		transform: translate(0, -50%);
	}
}

@keyframes testScale {
  0%, 100% {
    transform: rotate(45deg) scale(1.2);
  }
  50% {
    transform: rotate(45deg) scale(1);
  }
}

// 0.5细边框
.thinBorder {
	width: 100px;
	height: 100px;
	position: relative;

	&::after {
		content: '';
		width: 200%;
		height: 200%;
		position: absolute;
		top: 0;
		left: 0;
		border: 1px solid #ddd;
		transform: scale(0.5);
		transform-origin: left top;
	}
}


// 自动打字
.typing(@count: 0, @duration: 0, @delay: 0) {
	overflow: hidden;
	border-right: 1px solid transparent;
	@counts: @count + 1;
	width:~"@{counts}ch";
	white-space: nowrap;
	animation: typing~"@{duration}s" steps(@count + 1)~"@{delay}s" infinite backwards,
	caret 500ms steps(1)~"@{delay}s" infinite forwards;
}

.auto-typing {
	font-weight: bold;
	font-size: 20px;
	color: #09f;
	.typing(52, 5);
}

@keyframes caret {
	50% {
		border-right-color: currentcolor;
	}
}

@keyframes typing {
	from {
		width: 0;
	}
}


// 手风琴效果

.accordion {
	display: flex;
	width: 400px;
	height: 100px;

	li {
		flex: 1;
		transition:  all 0.5s ease-in-out;

		&:nth-of-type(1) {
			background-color: #09f;
		}
		&:nth-of-type(2) {
			background-color: rgb(60, 74, 83);
		}
		&:nth-of-type(3) {
			background-color: rgb(39, 146, 96);
		}
		&:nth-of-type(4) {
			background-color: rgb(202, 235, 110);
		}
		&:nth-of-type(5) {
			background-color: rgb(165, 116, 88);
		}
		&:nth-of-type(6) {
			background-color: rgb(80, 27, 71);
		}

		&:hover {
			flex: 2;
		}
	}
}
</style>