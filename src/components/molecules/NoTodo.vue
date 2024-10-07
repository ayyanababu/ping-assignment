<template>
  <div class="flex flex-col gap-2" :class="name ? ' my-16' : ' my-24'">
    <p class="text-lg text-center">No tasks added {{ name ? `in ${name}` : '' }}</p>
    <p v-if="!name" class="-mt-2 text-3xl text-center">Take nap</p>
    <img
      v-if="!name"
      :src="catImg"
      alt="Cat Sleeping"
      class="h-24 mx-auto mt-2 overflow-hidden rounded-lg"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import catImg from '../../assets/cat_sleeping.jpeg'

export default defineComponent({
  name: 'NoTodo',
  props: {
    name: {
      type: String,
      required: false
    }
  },
  setup(props) {
    return {
      catImg,
      name: props.name
    }
  }
})
</script>
