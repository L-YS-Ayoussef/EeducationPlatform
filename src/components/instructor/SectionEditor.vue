<script setup>
import { ref } from 'vue'
import LessonRow from './LessonRow.vue'
import AssignmentRow from './AssignmentRow.vue'

const props = defineProps({
  modelValue: { type: Array, default: () => [] }
})
const emit = defineEmits(['update:modelValue'])

const sections = ref(props.modelValue)
function sync(){ emit('update:modelValue', sections.value) }

function addSection(){
  sections.value.push({ title:'', shortDescription:'', description:'', lessons:[], assignments:[] })
  sync()
}
function removeSection(i){
  sections.value.splice(i,1); sync()
}

function addLesson(i){
  sections.value[i].lessons.push({ title:'', description:'', videoUrl:'' }); sync()
}
function addAssignment(i){
  sections.value[i].assignments.push({ assignmentNumber: (sections.value[i].assignments.length+1), title:'', description:'', pdfUrl:'', maxScore:100 }); sync()
}
</script>

<template>
  <div class="section-list">
    <div v-for="(s, i) in sections" :key="i" class="item">
      <div class="item-head">
        <strong>القسم {{ i + 1 }}</strong>
        <div class="inline">
          <button class="mini-btn" @click="addLesson(i)">+ درس</button>
          <button class="mini-btn" @click="addAssignment(i)">+ واجب</button>
          <button class="mini-btn" @click="removeSection(i)">حذف القسم</button>
        </div>
      </div>

      <div class="form">
        <div class="field">
          <label>العنوان</label>
          <input class="input" v-model="s.title" @input="sync" placeholder="مثال: المقدمة" />
        </div>
        <div class="field">
          <label>وصف مختصر</label>
          <input class="input" v-model="s.shortDescription" @input="sync" />
        </div>
        <div class="field">
          <label>وصف تفصيلي</label>
          <textarea class="textarea" v-model="s.description" @input="sync"></textarea>
        </div>
      </div>

      <div class="item" style="margin-top:10px">
        <div class="item-head">
          <strong>الدروس</strong>
        </div>
        <div class="form" v-if="s.lessons.length===0">
          <div class="small">لا توجد دروس بعد.</div>
        </div>
        <div class="form" v-else>
          <LessonRow
            v-for="(l, li) in s.lessons"
            :key="li"
            v-model="s.lessons[li]"
            @remove="s.lessons.splice(li,1); sync()"
          />
        </div>
      </div>

      <div class="item" style="margin-top:10px">
        <div class="item-head">
          <strong>الواجبات</strong>
        </div>
        <div class="form" v-if="s.assignments.length===0">
          <div class="small">لا توجد واجبات بعد.</div>
        </div>
        <div class="form" v-else>
          <AssignmentRow
            v-for="(a, ai) in s.assignments"
            :key="ai"
            v-model="s.assignments[ai]"
            @remove="s.assignments.splice(ai,1); sync()"
          />
        </div>
      </div>
    </div>

    <button class="mini-btn mini-btn-primary" @click="addSection">+ إضافة قسم</button>
  </div>
</template>
