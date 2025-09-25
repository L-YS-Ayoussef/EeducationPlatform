<script setup>
import { ref } from 'vue'
const { modelValue, label, placeholder, required, autocomplete } = defineProps({
  modelValue: String,
  label: String,
  placeholder: String,
  required: Boolean,
  autocomplete: String
})
const emit = defineEmits(['update:modelValue'])
const show = ref(false)
</script>

<template>
  <div class="field">
    <label v-if="label">{{ label }}</label>
    <div style="position:relative">
      <input
        class="input"
        :type="show ? 'text' : 'password'"
        :placeholder="placeholder"
        :required="required"
        :autocomplete="autocomplete || 'current-password'"
        :value="modelValue"
        @input="emit('update:modelValue',$event.target.value)"
      />
      <button type="button" class="btn" style="position:absolute; inset-inline-start:6px; inset-block:6px; height:30px"
              @click="show = !show">{{ show ? 'إخفاء' : 'إظهار' }}</button>
    </div>
  </div>
</template>
