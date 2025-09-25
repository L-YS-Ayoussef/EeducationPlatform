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
      <strong>واجب</strong>
      <button class="mini-btn" @click="$emit('remove')">حذف</button>
    </div>
    <div class="row">
      <div style="flex:0 0 140px">
        <div class="field"><label>رقم</label>
          <input type="number" class="input" :value="modelValue.assignmentNumber" @input="update('assignmentNumber', +$event.target.value)" min="1" />
        </div>
      </div>
      <div style="flex:1 1 220px">
        <div class="field"><label>العنوان</label>
          <input class="input" :value="modelValue.title" @input="update('title', $event.target.value)" />
        </div>
      </div>
      <div style="flex:1 1 220px">
        <div class="field"><label>رابط PDF</label>
          <input class="input" :value="modelValue.pdfUrl" @input="update('pdfUrl', $event.target.value)" placeholder="https://..." />
        </div>
      </div>
      <div style="flex:0 0 160px">
        <div class="field"><label>الدرجة القصوى</label>
          <input type="number" class="input" :value="modelValue.maxScore" @input="update('maxScore', +$event.target.value)" min="0" />
        </div>
      </div>
    </div>
    <div class="field"><label>الوصف</label>
      <textarea class="textarea" :value="modelValue.description" @input="update('description', $event.target.value)"></textarea>
    </div>
  </div>
</template>
