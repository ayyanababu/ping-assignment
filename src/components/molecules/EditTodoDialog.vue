<template>
  <div class="fixed inset-0 z-50 w-screen h-screen bg-black/10 backdrop-blur-sm">
    <div class="max-w-3xl mx-auto mt-24" data-testid="edit-dialog">
      <Motion is="div" preset="slideVisibleTop" class="relative">
        <button
          @click="discardEditDialog()"
          class="absolute right-0 flex flex-row items-center justify-center w-8 transition-colors rounded-full -top-12 bg-black/30 hover:bg-black/70 aspect-square"
        >
          <i class="text-3xl text-white pi pi-times"></i>
        </button>

        <AddTodo
          @addItem="saveEditDialog"
          @discardEditDialog="discardEditDialog"
          :todo="todo"
          actionName="Edit"
          actionIcon="pi pi-pencil"
        />
      </Motion>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import type { GroupedTodo, Todo } from '@/types/Todo'
import AddTodo from './AddTodo.vue'

export default defineComponent({
  name: 'EditTodoDialog',
  props: {
    todo: {
      type: Object as () => GroupedTodo,
      required: true
    }
  },
  components: {
    AddTodo
  },
  setup(props, { emit }) {
    const saveEditDialog = (newTodo: Todo) => {
      emit('saveEditDialog', { ...props.todo, ...newTodo } as GroupedTodo)
    }
    const discardEditDialog = () => {
      emit('discardEditDialog')
    }

    return {
      saveEditDialog,
      discardEditDialog
    }
  }
})
</script>
