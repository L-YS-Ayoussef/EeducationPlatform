<script setup>
const { modelValue, label, type, placeholder, required, autocomplete } = defineProps({
  modelValue: [String, Number],
  label: String,
  type: { type: String, default: 'text' },
  placeholder: String,
  required: { type: Boolean, default: false },
  autocomplete: String
})
const emit = defineEmits(['update:modelValue'])
</script>

<template>
  <div class="field">
    <label v-if="label">{{ label }}</label>
    <input
      class="input"
      :type="type"
      :placeholder="placeholder"
      :required="required"
      :autocomplete="autocomplete"
      :value="modelValue"
      @input="emit('update:modelValue',$event.target.value)"
    />
  </div>
</template>
