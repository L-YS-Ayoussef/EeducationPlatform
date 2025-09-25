<script setup>
import '../../assets/styles/instructor.css'
import { ref, computed, watch, onMounted } from 'vue'
import SectionEditor from './SectionEditor.vue'

const props = defineProps({
  mode: { type: String, default: 'create' },              // 'create' | 'edit'
  modelValue: { type: Object, default: () => ({}) },      // course object (when editing)
  loading: { type: Boolean, default: false }
})
const emit = defineEmits(['submit', 'cancel', 'update:modelValue'])

const form = ref({
  title: '', slug: '', shortDescription: '', description: '',
  category: '', level: '', language: 'ar', instructions: '',
  price: 0, durationHours: 0, thumbnailUrl: '',
  publishedAt: '', ratingAvg: 0, reviewsCount: 0,
  sections: [] // [{title, shortDescription, description, lessons:[], assignments:[]}]
})

watch(() => props.modelValue, (v) => {
  if(!v) return
  form.value = JSON.parse(JSON.stringify({
    ...form.value,
    ...v,
    sections: v.sections || []
  }))
}, { immediate: true })

function updateSlugAuto(){
  if(props.mode === 'edit') return
  if(!form.value.title) return
  form.value.slug = form.value.title
    .trim()
    .replace(/\s+/g,'-')
    .replace(/[^\u0600-\u06FF\w-]/g,'')     // keep Arabic letters, numbers, _ and -
    .toLowerCase()
}

const canSubmit = computed(() =>
  form.value.title && form.value.slug && form.value.language
)

function onSubmit(){
  emit('submit', JSON.parse(JSON.stringify(form.value)))
}

function onCancel(){ emit('cancel') }

// Keep v-model in sync (optional)
watch(form, (v) => emit('update:modelValue', v), { deep: true })

// Starter options (you can fetch from API later)
const levels = ['مبتدئ','متوسط','متقدم','كل المستويات']
const languages = ['ar','en']
const categories = ['البرمجة','البيانات','التصميم','اللغات']

onMounted(() => {
  if(props.mode==='create' && form.value.sections.length===0){
    // start with one empty section to guide the user
    form.value.sections.push({ title:'', shortDescription:'', description:'', lessons:[], assignments:[] })
  }
})
</script>

<template>
  <div class="instructor-wrap">
    <div class="container">
      <div class="page-title">
        {{ mode === 'edit' ? 'تعديل الدورة' : 'إنشاء دورة جديدة' }}
      </div>

      <div class="grid">
        <!-- LEFT: Main editor -->
        <div class="card">
          <h3 class="card-title">معلومات الدورة</h3>

          <div class="form">
            <div class="row">
              <div style="flex:2 1 260px">
                <div class="field">
                  <label>عنوان الدورة</label>
                  <input class="input" v-model="form.title" placeholder="مثال: أساسيات البرمجة" @blur="updateSlugAuto" />
                </div>
              </div>
              <div style="flex:1 1 180px">
                <div class="field">
                  <label>اللغة</label>
                  <select class="select" v-model="form.language">
                    <option v-for="l in languages" :key="l" :value="l">{{ l }}</option>
                  </select>
                </div>
              </div>
            </div>

            <div class="field">
              <label>الرابط (Slug)</label>
              <input class="input" v-model="form.slug" placeholder="مثال: programming-basics" />
              <div class="small">سيظهر كـ <span class="kbd">/courses/{{ form.slug || '...' }}</span></div>
            </div>

            <div class="row">
              <div style="flex:1 1 200px">
                <div class="field">
                  <label>التصنيف</label>
                  <select class="select" v-model="form.category">
                    <option value="">— اختر —</option>
                    <option v-for="c in categories" :key="c" :value="c">{{ c }}</option>
                  </select>
                </div>
              </div>
              <div style="flex:1 1 200px">
                <div class="field">
                  <label>المستوى</label>
                  <select class="select" v-model="form.level">
                    <option value="">— اختر —</option>
                    <option v-for="lv in levels" :key="lv" :value="lv">{{ lv }}</option>
                  </select>
                </div>
              </div>
              <div style="flex:1 1 200px">
                <div class="field">
                  <label>السعر</label>
                  <input type="number" class="input" v-model.number="form.price" min="0" />
                </div>
              </div>
              <div style="flex:1 1 200px">
                <div class="field">
                  <label>الساعات</label>
                  <input type="number" class="input" v-model.number="form.durationHours" min="0" />
                </div>
              </div>
            </div>

            <div class="field">
              <label>وصف مختصر</label>
              <input class="input" v-model="form.shortDescription" placeholder="ملخص سريع لمحتوى الدورة" />
            </div>

            <div class="field">
              <label>الوصف التفصيلي</label>
              <textarea class="textarea" v-model="form.description" placeholder="ماذا سيتعلم الطالب بالتحديد؟"></textarea>
            </div>

            <div class="field">
              <label>تعليمات / إرشادات</label>
              <textarea class="textarea" v-model="form.instructions" placeholder="متطلبات، ملاحظات عامة، سياسات..."></textarea>
            </div>

            <div class="row">
              <div style="flex:1 1 260px">
                <div class="field">
                  <label>صورة مصغّرة (URL)</label>
                  <input class="input" v-model="form.thumbnailUrl" placeholder="https://..." />
                </div>
              </div>
              <div style="flex:1 1 200px">
                <div class="field">
                  <label>تاريخ النشر</label>
                  <input type="date" class="input" v-model="form.publishedAt" />
                </div>
              </div>
            </div>
          </div>

          <hr style="border:none; border-top:1px solid var(--ring); margin:16px 0" />

          <h3 class="card-title">محتوى الدورة</h3>
          <p class="small">أقسام، دروس، واجبات — يمكنك الإضافة والحذف بحرّية.</p>

          <SectionEditor v-model="form.sections" />

          <div class="toolbar" style="justify-content:flex-end; margin-top:14px">
            <button class="btn" @click="onCancel">إلغاء</button>
            <button class="btn btn-primary" :disabled="!canSubmit || loading" @click="onSubmit">
              {{ loading ? 'جارٍ الحفظ…' : (mode==='edit' ? 'حفظ التعديلات' : 'إنشاء الدورة') }}
            </button>
          </div>
        </div>

        <!-- RIGHT: live preview / tips -->
        <aside class="card">
          <h3 class="card-title">معاينة سريعة</h3>
          <div class="item">
            <div class="item-head">
              <div class="inline">
                <div style="width:56px; height:56px; background:#eef1f8; border:1px solid var(--ring); border-radius:10px; overflow:hidden">
                  <img :src="form.thumbnailUrl || 'https://placehold.co/112x112?text=Thumb'" alt="" style="width:100%; height:100%; object-fit:cover" />
                </div>
                <div>
                  <div style="font-weight:800; color:var(--ink-900)">{{ form.title || '—' }}</div>
                  <div class="small">{{ form.category || 'التصنيف' }} • {{ form.level || 'المستوى' }} • {{ form.language || 'ar' }}</div>
                </div>
              </div>
              <span class="tag">{{ form.price ? (form.price + ' ر.س') : 'مجانية' }}</span>
            </div>
            <div class="small" style="color:var(--ink-700)">{{ form.shortDescription || 'الوصف المختصر سيظهر هنا' }}</div>
          </div>

          <div class="item" style="margin-top:10px">
            <div class="item-head"><strong>نصائح</strong></div>
            <ul class="small" style="padding:0 16px 0 0; list-style: disc inside;">
              <li>احرص أن يكون العنوان واضحًا.</li>
              <li>قسّم المحتوى لأقسام قصيرة.</li>
              <li>أضف واجبات لرفع التفاعل.</li>
            </ul>
          </div>
        </aside>
      </div>
    </div>
  </div>
</template>
