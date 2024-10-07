<template>
  <div
    class="flex flex-col gap-2 p-2 transition-all bg-white border-2 shadow-sm rounded-xl hover:shadow-lg focus-within:shadow-lg"
    :style="`border-color: ${colors[priority as PriorityVal]}`"
  >
    <h4
      v-if="actionName === 'Edit'"
      class="px-2 p-2 pb-1 -mt-2 rounded-t-lg -mx-2 w-[calc(100%+1rem)] text-3xl bg-black/5"
    >
      Edit Task
    </h4>

    <input
      v-model="title"
      placeholder="Title Starts Here..."
      class="px-2 py-1 transition-colors bg-transparent rounded-md focus:outline-none hover:bg-gray-100 font-roboto-slab"
    />

    <hr class="-my-1 border-top" />

    <textarea
      v-model="description"
      placeholder="Describe your thoughts..."
      class="px-2 py-1 transition-colors bg-transparent rounded-md focus:outline-none hover:bg-gray-100"
    ></textarea>

    <div
      v-if="actionName === 'Edit'"
      class="flex flex-col items-center gap-2 pt-4 my-2 border-t-2 border-dashed"
    >
      <div
        class="flex flex-col w-full overflow-hidden bg-gray-100 border divide-y rounded-lg shadow-sm"
      >
        <p v-if="subtasks?.length === 0" class="py-2 text-center">No subtasks</p>

        <p v-else class="py-2 text-center bg-white">Subtasks</p>

        <div
          v-for="subtask in subtasks"
          :key="subtask.timestamp"
          class="flex flex-row items-center gap-2 px-4 py-2"
          :class="subtask.isCompleted ? 'bg-gray-200' : ''"
        >
          <Checkbox v-model="subtask.isCompleted" :binary="true" size="small" />

          <span class="text-sm" :class="subtask.isCompleted ? 'line-through' : ''">{{
            subtask.title
          }}</span>

          <i
            class="ml-auto pi pi-flag-fill"
            style="font-size: 1rem"
            :style="`color: ${colors[subtask.priority as PriorityVal]}`"
            :title="subtask.priority"
          ></i>
        </div>
      </div>

      <div class="flex flex-row w-full gap-2">
        <InputText
          v-model="subtask"
          type="text"
          size="small"
          placeholder="Add new Subtask"
          class="w-full"
        />

        <SelectFlag :priority="subtaskPriority" @update:priority="subtaskPriority = $event">
        </SelectFlag>

        <Button
          @click="addSubtask"
          icon="pi pi-plus"
          iconPos="right"
          size="small"
          class="shrink-0"
          label="Add"
          severity="secondary"
        ></Button>
      </div>
    </div>

    <div class="flex flex-row items-center gap-2">
      <div class="flex flex-row justify-center gap-2 card">
        <SelectFlag :priority="priority" @update:priority="priority = $event"> </SelectFlag>

        <Button
          @click="addAttachment"
          icon="pi pi-paperclip"
          iconPos="right"
          size="small"
          class="mr-auto"
          label="Add Attachment"
          severity="secondary"
          text
        ></Button>
      </div>

      <div class="flex flex-row gap-2 ml-auto">
        <Button
          v-if="actionName === 'Edit'"
          @click="discardChanges"
          iconPos="right"
          size="small"
          class="mr-auto"
          label="Cancel"
          severity="secondary"
        ></Button>

        <Button
          @click="submitTodo"
          :label="actionName ? actionName : 'Add'"
          :icon="actionIcon ? actionIcon : 'pi pi-plus'"
          iconPos="right"
          size="small"
          :disabled="!title || !description"
          :title="
            !title || !description
              ? 'Add a title and description'
              : `Click to ${actionName ? actionName : 'Add'} task`
          "
        ></Button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
import type { BaseTodo, PriorityVal, Todo } from '../../types/Todo'
import { $dt } from '@primevue/themes'
import { PRIORITY, PRIORITY_COLOR } from '@/utils/consts'
import SelectFlag from '../atoms/SelectFlag.vue'
import NoTodo from '../molecules/NoTodo.vue'
import InputText from 'primevue/inputtext'

export default defineComponent({
  name: 'AddTodo',
  props: {
    todo: {
      type: Object as () => Todo,
      required: false
    },
    actionName: {
      type: String,
      required: false
    },
    actionIcon: {
      type: String,
      required: false
    }
  },
  components: {
    SelectFlag,
    NoTodo
  },
  setup(props, { emit }) {
    const priorities = Object.values(PRIORITY)

    const title = ref(props.todo?.title || '')
    const description = ref(props.todo?.description || '')
    const priority = ref(props.todo?.priority || priorities[priorities.length - 1])

    const subtasks = ref<BaseTodo[]>(props.todo?.subtasks || [])
    const subtask = ref<string>('')
    const subtaskPriority = ref(priorities[priorities.length - 1])

    const resetForm = () => {
      title.value = ''
      description.value = ''
      priority.value = priorities[priorities.length - 1]
      subtasks.value = []
      subtask.value = ''
      subtaskPriority.value = priorities[priorities.length - 1]
    }

    const submitTodo = () => {
      if (title.value) {
        emit('addItem', {
          title: title.value,
          description: description.value,
          priority: priority.value as PriorityVal,
          isCompleted: false,
          timestamp: props.actionName === 'Edit' ? props.todo.timestamp : new Date().getTime(),
          subtasks: subtasks.value
        } as Todo)
        resetForm()
      }
    }

    const getPriorityColors = () => {
      const priorityColorEntries = Object.entries(PRIORITY_COLOR)
      const transformedEntries = priorityColorEntries.map(([key, value]) => {
        const transformedValue = $dt(value as string).value
        return [key, transformedValue]
      })
      const transformedPriorityColor = Object.fromEntries(transformedEntries)

      return transformedPriorityColor as typeof PRIORITY_COLOR
    }

    const addAttachment = () => {
      // Add attachment logic
    }

    const discardChanges = () => {
      emit('discardEditDialog')
    }

    const addSubtask = () => {
      if (subtask.value) {
        subtasks.value.push({
          title: subtask.value,
          description: '',
          priority: subtaskPriority.value as PriorityVal,
          isCompleted: false,
          timestamp: new Date().getTime()
        })
        subtask.value = ''
        subtaskPriority.value = priorities[priorities.length - 1]
      }
    }

    const colors = computed(getPriorityColors)

    return {
      title,
      description,
      priority,
      subtasks,
      subtask,
      subtaskPriority,
      submitTodo,
      addAttachment,
      discardChanges,
      addSubtask,
      priorities,
      colors
    }
  }
})
</script>
