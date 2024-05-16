<template>
  <AdminFormBuilder
    :submit-label="submitLabel"
    :schema="schema"
    @submit="handleSubmit"
  />
</template>

<script lang="ts" setup>
import { FormKitSchemaCondition, FormKitSchemaNode } from '@formkit/core';
const { $toast } = useNuxtApp();
const AdminCrudHeader = resolveComponent('AdminCrudHeader');

const createAdminCrudHeaderProps = (
  title: string,
  overviewRoute: string,
  saveButtonTitle: string,
  isLoading: boolean
) => {
  return {
    title,
    overviewRoute,
    saveButtonTitle,
    isLoading,
  };
};

// TODO: use $t for labels etc.
const submitLabel = ref('Save Recipe');
const schema = ref<FormKitSchemaCondition | FormKitSchemaNode[]>([
  {
    $cmp: AdminCrudHeader,
    props: createAdminCrudHeaderProps(
      'Create Recipe',
      '/admin/recipes',
      submitLabel.value,
      false
    ),
  },
  {
    $formkit: 'text',
    name: 'title',
    label: 'Recipe Title',
    validation: 'required',
    value: '',
  },
  {
    $formkit: 'text',
    name: 'subtitle',
    label: 'Subtitle',
    value: '',
  },
  {
    $formkit: 'file',
    name: 'images',
    label: 'Images',
    multiple: true,
    accept: '.jpg,.jpeg',
    help: 'Please provide images as JPG and with a minimum resolution of 1920px x 1080px',
  },
  {
    $formkit: 'number',
    name: 'time_needed',
    label: 'Time needed',
    validation: 'required',
    value: '',
    placeholder: '30',
    help: 'In minutes',
  },
  {
    $formkit: 'multiselect',
    name: 'badges',
    label: 'Badges',
    value: 'spicy',
    options: ['spicy', 'vegan', 'vegitarian'],
  },
]);

const handleSubmit = async (data) => {
  console.log(data);
};
</script>

<style lang="scss">
@import '@vueform/multiselect/themes/default.css';
</style>
