<template>
  <FormKit
    type="form"
    @submit="handleSubmit"
    :submit-label="submitLabel"
    :actions="true"
    #default="{ value }"
  >
    <pre>{{ value }}</pre>
    <FormKitSchema :schema="schema" :library="library" />
  </FormKit>
</template>

<script setup lang="ts">
// TODO: add custom submit button to the end of form... not really necessary, because we have the CRUD header ... but would be nice
import { PropType } from 'vue';
import { FormKitSchema } from '@formkit/vue';
import { FormKitSchemaCondition, FormKitSchemaNode } from '@formkit/core';
const Button = resolveComponent('Button');

defineProps({
  submitLabel: {
    type: String,
    default: 'Submit',
  },
  schema: {
    type: Array as PropType<FormKitSchemaCondition | FormKitSchemaNode[]>,
    required: true,
  },
  library: {
    type: Object,
  },
});

const emit = defineEmits(['submit']);

const handleSubmit = (data: any) => {
  emit('submit', data);
};
</script>

<style lang="scss">
.formkit-label > span {
  color: blue;
  font-weight: 500;
}
</style>
