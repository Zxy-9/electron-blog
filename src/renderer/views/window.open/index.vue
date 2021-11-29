<template>
	<div>
		<h1>打开窗口</h1>
		<button@click="openW">点击</button>
	</div>
</template>

<script>
	export default{
		methods:{
			openW(){
				window.open('https://www.baidu.com')
			}
		}
	}
</script>

<style>
</style>
