<!-- https://primeng.org/icons -->
<template>
  <Select
    v-model="priority"
    :options="priorities"
    class="min-w-max"
    size="small"
    variant="filled"
    data-testid="select-flag"
  >
    <template #value="slotProps">
      <div
        v-if="slotProps.value"
        class="flex flex-row items-center gap-2"
        :data-testid="slotProps.value"
      >
        <i
          class="pi pi-flag-fill"
          style="font-size: 1rem"
          :style="`color: ${colors[slotProps.value as PriorityVal]}`"
          :title="slotProps.value"
        ></i>
        <p>
          {{ slotProps.value }}
        </p>
      </div>
    </template>
    <template #option="slotProps">
      <div class="flex flex-row items-center gap-2">
        <i
          class="pi pi-flag"
          style="font-size: 1rem"
          :style="`color: ${colors[slotProps.option as PriorityVal]}`"
          :title="slotProps.option"
          :data-testid="slotProps.option"
        ></i>
        <p>
          {{ slotProps.option }}
        </p>
      </div>
    </template>
  </Select>
</template>

<script lang="ts">
import type { PriorityVal } from '@/types/Todo';
import { PRIORITY, PRIORITY_COLOR } from '@/utils/consts';
import { $dt } from '@primevue/themes';
import { computed, defineComponent } from 'vue';

export default defineComponent({
  name: 'SelectFlag',

  props: {
    priority: {
      type: String,
      required: true,
    },
  },

  setup(props, { emit }) {
    const priorities = Object.values(PRIORITY);

    console.log('### priorities', priorities);

    const colors = computed(
      () =>
        Object.fromEntries(
          Object.entries(PRIORITY_COLOR).map(([key, value]) => [key, $dt(value as string).value])
        ) as typeof PRIORITY_COLOR
    );

    const priority = computed({
      get() {
        return props.priority;
      },
      set(value) {
        emit('update:priority', value);
      },
    });

    return { priorities, colors, priority };
  },
});
</script>
