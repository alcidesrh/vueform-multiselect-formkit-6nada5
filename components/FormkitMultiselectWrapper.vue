<script setup lang="ts">
import { computed, PropType } from 'vue';
import { FormKitFrameworkContext } from '@formkit/core';

const props = defineProps({
  context: Object as PropType<FormKitFrameworkContext>,
});

const value = computed({
  get() {
    return props.context._value || '';
  },
  set(value) {
    props.context.node.input(value);
  },
});
</script>

<template>
  <VueMultiselect
    v-model="value"
    class="mb-3 form-builder-select"
    mode="single"
    :options="context.options"
    placeholder="Please choose..."
    style="z-index: 1000"
  />
</template>
