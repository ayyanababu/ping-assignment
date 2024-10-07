<template>
  <div class="flex flex-col max-w-3xl gap-4 p-4 mx-auto">
    <h1 class="text-3xl font-bold text-center">To-Do List</h1>

    <AddTodo @addItem="addItem" />

    <EditTodoDialog
      v-if="editingTodo"
      :todo="editingTodo"
      @saveEditDialog="saveEditDialog($event)"
      @discardEditDialog="discardEditDialog()"
    />

    <div class="flex flex-col gap-2">
      <div
        class="relative flex flex-col gap-2"
        v-for="(group, index) in groupedTodos"
        v-if="todos.length > 0"
        :key="index"
      >
        <div
          class="sticky top-0 z-10 flex flex-row items-center justify-between gap-2 py-2 bg-white border-b"
        >
          <h3 class="text-lg capitalize">{{ group.name }}</h3>

          <div class="flex flex-row items-center gap-2">
            <Button
              :title="`Switch to ${viewType !== 'Grid' ? 'Grid' : 'List'} view`"
              :icon="viewType !== 'Grid' ? 'pi pi-list' : 'pi pi-th-large'"
              @click="viewType = viewType === 'Grid' ? 'List' : 'Grid'"
              severity="secondary"
              text
              v-if="index === 0"
            />

            <Button
              :title="`Group by ${groupBy === 'Status' ? 'Priority' : 'Status'}`"
              :icon="groupBy === 'Status' ? 'pi pi-list-check' : 'pi pi-flag'"
              @click="groupBy = groupBy === 'Status' ? 'Priority' : 'Status'"
              severity="secondary"
              text
              v-if="index === 0"
            />

            <Button
              :title="`Sort ${sortOrder === 'asc' ? 'Descending' : 'Ascending'}`"
              :icon="sortOrder === 'asc' ? 'pi pi-arrow-down' : 'pi pi-arrow-up'"
              @click="sortOrder = sortOrder === 'asc' ? 'desc' : 'asc'"
              severity="secondary"
              text
              v-if="index === 0"
            />
          </div>
        </div>

        <ul
          class="gap-2"
          :class="viewType === 'Grid' ? 'grid grid-cols-2 md:grid-cols-3' : 'flex flex-col'"
        >
          <TodoItem
            v-for="(todo, index) in group.todos"
            :key="index"
            :todo="todo"
            @removeItem="removeItem(todo)"
            @showEditDialog="showEditDialog(todo)"
            @toggleCompleted="toggleCompleted(todo)"
          />
        </ul>

        <NoTodo v-if="group.todos.length === 0" :name="group.name" />
      </div>

      <Button
        v-if="todos.length > 0"
        @click="clearList"
        size="small"
        severity="danger"
        text
        class="rounded-xl"
        >Clear All</Button
      >

      <NoTodo v-if="todos.length === 0" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, onMounted, ref } from 'vue'
import TodoItem from './TodoItem.vue'
import LocalStorageService from '../services/LocalStorageService'
import type { GroupedTodo, GroupType, Todo, ViewType } from '../types/Todo'
import NoTodo from './molecules/NoTodo.vue'
import { PRIORITY_ORDER } from '@/utils/consts'
import AddTodo from './molecules/AddTodo.vue'
import EditTodoDialog from './molecules/EditTodoDialog.vue'
import { groupTodosByPriority, groupTodosByStatus } from '@/utils/TodoServices'

const VIEW_TYPE_LIST = 'List'
const GROUP_TYPE_STATUS = 'Status'
const SORT_ORDER_ASC = 'asc'

export default defineComponent({
  components: { AddTodo, TodoItem, NoTodo, EditTodoDialog },
  setup() {
    const todos = ref<Todo[]>([])
    const viewType = ref<ViewType>(VIEW_TYPE_LIST)
    const groupBy = ref<GroupType>(GROUP_TYPE_STATUS)
    const sortOrder = ref<'asc' | 'desc'>(SORT_ORDER_ASC)

    const editingTodo = ref<GroupedTodo | null>(null)

    onMounted(() => {
      todos.value = LocalStorageService.getTodos()
    })

    const getGroupedTodos = () => {
      let grpTodos =
        groupBy.value === 'Priority'
          ? groupTodosByPriority(todos.value)
          : groupTodosByStatus(todos.value)

      if (sortOrder.value === 'desc') {
        grpTodos.reverse()
      }

      return grpTodos
    }

    const addItem = (todo: Todo) => {
      todos.value.push(todo)
      todos.value.sort((a, b) => PRIORITY_ORDER[a.priority] - PRIORITY_ORDER[b.priority])
      LocalStorageService.saveTodos(todos.value)
    }

    const removeItem = (removedTodo: Todo) => {
      const updatedTodos = todos.value.filter(
        (todo: TODO) => todo.title !== removedTodo.title && todo.timestamp !== removedTodo.timestamp
      )
      todos.value = updatedTodos
      LocalStorageService.saveTodos(todos.value)
    }

    const clearList = () => {
      todos.value = []
      LocalStorageService.clearTodos()
    }

    const editItem = (index: number, updatedTodo: Todo) => {
      todos.value[index] = updatedTodo
      LocalStorageService.saveTodos(todos.value)
    }

    const toggleCompleted = (completedTodo: Todo) => {
      const todoToMarkComplete = todos.value.find(
        (todo: Todo) =>
          todo.timestamp === completedTodo.timestamp && todo.title === completedTodo.title
      )
      if (todoToMarkComplete) {
        todoToMarkComplete.isCompleted = !todoToMarkComplete.isCompleted
        todos.value = todos.value.map((todo) =>
          todo.timestamp === completedTodo.timestamp && todo.title === completedTodo.title
            ? todoToMarkComplete
            : todo
        )
      }
      LocalStorageService.saveTodos(todos.value)
    }

    const showEditDialog = (editedTodo: Todo) => {
      editingTodo.value = { ...editedTodo }
    }

    const discardEditDialog = () => {
      editingTodo.value = null
    }

    const saveEditDialog = (updatedTodo: GroupedTodo) => {
      todos.value = todos.value.map((todo) =>
        todo.timestamp === updatedTodo.timestamp ? updatedTodo : todo
      )
      LocalStorageService.saveTodos(todos.value)
      editingTodo.value = null
    }

    const groupedTodos = computed(getGroupedTodos)

    return {
      viewType,
      groupBy,
      sortOrder,
      todos,
      groupedTodos,
      editingTodo,
      addItem,
      removeItem,
      clearList,
      editItem,
      toggleCompleted,
      showEditDialog,
      discardEditDialog,
      saveEditDialog
    }
  }
})
</script>
