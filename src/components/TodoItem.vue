<template>
  <li data-testid="todo-item">
    <div
      class="flex items-center flex-1 gap-2 p-2 pl-4 pr-2 overflow-hidden border shadow-sm group rounded-t-xl"
      :style="`border-color: ${localTodo.isCompleted ? 'lightgray' : colors[localTodo.priority]}`"
      :class="`${isOpen ? '' : ' rounded-b-xl'}  ${localTodo.isCompleted ? 'bg-gray-100' : ''}`"
      :data-priority="localTodo.priority"
    >
      <i
        :class="isOpen ? 'pi pi-chevron-up' : 'pi pi-chevron-down'"
        class="!text-sm aspect-square cursor-pointer"
        @click="isOpen = !isOpen"
        data-testid="accordion-icon"
      ></i>

      <Checkbox v-model="localTodo.isCompleted" :binary="true" @change="toggleCompleted" />

      <label
        class="truncate max-w-[inherit] cursor-pointer flex-1 -my-2 py-3"
        :class="localTodo.isCompleted ? 'line-through' : ''"
        :title="localTodo.title"
        @click="showEditDialog"
        >{{ localTodo.title }}</label
      >

      <div class="flex flex-row gap-0 ml-auto">
        <Button
          @click="showEditDialog"
          size="small"
          icon="pi pi-pencil"
          severity="info"
          text
          class="invisible ml-auto transition-all group-hover:visible"
        >
        </Button>

        <Button
          @click="removeItem"
          size="small"
          icon="pi pi-trash"
          severity="danger"
          text
          class="ml-auto"
          :data-testid="'remove-' + localTodo.title"
        >
        </Button>
      </div>
    </div>
    <div v-if="isOpen" class="flex flex-col bg-gray-100 border border-t-0 divide-y rounded-b-lg">
      <p v-if="localTodo.subtasks?.length === 0" class="py-2 text-center">No subtasks</p>

      <div
        v-else
        v-for="subtask in localTodo.subtasks"
        :key="subtask.timestamp"
        class="flex flex-row gap-2 pl-[38px] pr-5 items-center py-2"
        :class="subtask.isCompleted ? 'bg-gray-200' : ''"
      >
        <Checkbox
          v-model="subtask.isCompleted"
          :binary="true"
          size="small"
          :data-testid="subtask.isCompleted ? 'task-completed' : 'task-incomplete'"
        />

        <span class="text-sm" :class="subtask.isCompleted ? 'line-through' : ''">{{
          subtask.title
        }}</span>

        <i
          class="ml-auto pi pi-flag-fill"
          style="font-size: 1rem"
          :style="`color: ${colors[subtask.priority as PriorityVal]}`"
          :title="subtask.priority"
          :data-testid="subtask.priority"
        ></i>
      </div>
    </div>
  </li>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from 'vue'
import type { PriorityVal, Todo } from '../types/Todo'
import Button from 'primevue/button'
import { PRIORITY_COLOR } from '@/utils/consts'
import { $dt } from '@primevue/themes'

export default defineComponent({
  props: {
    todo: {
      type: Object as () => Todo,
      required: true
    }
  },
  setup(props, { emit }) {
    const isOpen = ref(false)

    const localTodo = computed(() => props.todo)

    const removeItem = () => emit('removeItem')
    const showEditDialog = () => emit('showEditDialog')
    const toggleCompleted = () => emit('toggleCompleted')

    const colors = computed(
      () =>
        Object.fromEntries(
          Object.entries(PRIORITY_COLOR).map(([key, value]) => [key, $dt(value as string).value])
        ) as typeof PRIORITY_COLOR
    )

    return {
      isOpen,
      localTodo,
      removeItem,
      showEditDialog,
      toggleCompleted,
      colors
    }
  }
})
</script>
