<script setup>
const props = defineProps({
  modelValue: { type: Object, required: true }
})
const emit = defineEmits(['update:modelValue','remove'])

function update(key, val){
  emit('update:modelValue', { ...props.modelValue, [key]: val })
}
</script>

<template>
  <div class="item">
    <div class="item-head">
      <strong>درس</strong>
      <button class="mini-btn" @click="$emit('remove')">حذف</button>
    </div>
    <div class="row">
      <div style="flex:1 1 260px">
        <div class="field"><label>العنوان</label>
          <input class="input" :value="modelValue.title" @input="update('title', $event.target.value)" />
        </div>
      </div>
      <div style="flex:1 1 260px">
        <div class="field"><label>رابط الفيديو</label>
          <input class="input" :value="modelValue.videoUrl" @input="update('videoUrl', $event.target.value)" placeholder="https://..." />
        </div>
      </div>
    </div>
    <div class="field"><label>الوصف</label>
      <textarea class="textarea" :value="modelValue.description" @input="update('description', $event.target.value)"></textarea>
    </div>
  </div>
</template>
