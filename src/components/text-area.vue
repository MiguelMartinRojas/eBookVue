
<template>
  <div>
    <textarea class ="text-area" placeholder="Description" v-model="content"></textarea>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { beautify } from 'js-beautify/js'


@Component({

  methods: {
    
  }
})
export default class TextArea extends Vue {
  @Prop() private content!: string;
  
  
}
</script>


<style lang="scss" scoped>
.text-area {
  display: block;
	width: 100%;
  resize: vertical;
	border: 0;
	padding: 10px 5px;
  background: white no-repeat;
  /*
	* IMPORTANT PART HERE
	*/
	
  /* 2 imgs : 1px gray line (normal state) AND 2px green line (focus state) */
	background-image: linear-gradient(to bottom, #1abc9c, #1abc9c), linear-gradient(to bottom, silver, silver);
	/* sizes for the 2 images (default state) */
	background-size: 0 2px, 100% 1px;
	/* positions for the 2 images. Change both "50%" to "0%" or "100%" and tri again */
	background-position: 50% 100%, 50% 100%;

	/* animation solely on background-size */
  transition: background-size 0.3s cubic-bezier(0.64, 0.09, 0.08, 1);
}
.text-area:focus{
  /* sizes for the 2 images (focus state) */
	background-size: 100% 2px, 100% 1px;
	outline: none;
}
</style>
