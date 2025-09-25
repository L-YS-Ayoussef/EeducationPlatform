<script setup>
const { modelValue, categories, languages, sortOptions } = defineProps({
  modelValue: { type: Object, required: true },
  categories: { type: Array, default: () => [] },
  languages: { type: Array, default: () => [] },
  sortOptions: { type: Array, default: () => [] }
})
const emit = defineEmits(['update:modelValue','apply','reset'])
function update (k, v) { emit('update:modelValue', { ...modelValue, [k]: v }) }
</script>

<template>
  <div class="filters">
    <div class="field">
      <input
        type="search"
        :value="modelValue.q || ''"
        placeholder="ابحث عن مدرّس…"
        @input="update('q',$event.target.value)"
        @keydown.enter="$emit('apply')"
        style="min-width:220px"
      />
    </div>

    <div class="field">
      <select :value="modelValue.category || ''" @change="update('category',$event.target.value)">
        <option value="">كل الفئات</option>
        <option v-for="c in categories" :key="c" :value="c">{{ c }}</option>
      </select>
    </div>

    <div class="field">
      <select :value="modelValue.language || ''" @change="update('language',$event.target.value)">
        <option value="">كل اللغات</option>
        <option v-for="l in languages" :key="l" :value="l">{{ l }}</option>
      </select>
    </div>

    <div class="field">
      <select :value="modelValue.minRating || ''" @change="update('minRating',$event.target.value)">
        <option value="">كل التقييمات</option>
        <option value="4.5">4.5+ ★</option>
        <option value="4.0">4.0+ ★</option>
        <option value="3.5">3.5+ ★</option>
      </select>
    </div>

    <div class="field sort">
      <span>الترتيب:</span>
      <select :value="modelValue.sort || ''" @change="update('sort',$event.target.value)">
        <option value="">الأحدث</option>
        <option v-for="s in sortOptions" :key="s.value" :value="s.value">{{ s.label }}</option>
      </select>
    </div>

    <button class="btn btn-primary" @click="$emit('apply')">تطبيق</button>
    <button class="btn" @click="$emit('reset')">إعادة تعيين</button>
  </div>
</template>
