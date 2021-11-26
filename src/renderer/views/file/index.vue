<template>
	<div>
		<div style="border:1px solid red;height: 100px;width:300px;" @drop="drop" @dragover.prevent>
		  <p style="color:#ccc;">{{this.dropData}}</p>
		</div>
	</div>
</template>

<script>
	const fs = require('fs')
	
	export default{
		data() {
		  return {
				 dropData:'00',
		  };
		},
		
		methods:{
			drop (event) {
				event.preventDefault()
				const path = event.dataTransfer.files[0].path
			  console.log('dropPath',path)
			 /* let data = event.dataTransfer.getData('item')
			  this.dropData = data */
			//  console.log('data: ', data)
			const content = fs.readFileSync(path)
			console.log(content.toString())
			},
			
		}
	}
</script>

<style>
	
</style>
