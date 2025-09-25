<script setup>
import '../../assets/styles/static.css'
import FaqAccordion from '@/components/course/FaqAccordion.vue'
import { ref, onMounted, onBeforeUnmount } from 'vue'

// Section nav (Arabic labels)
const tabs = [
  { id: 'about',   label: 'من نحن' },
  { id: 'pricing', label: 'الأسعار' },
  { id: 'faq',     label: 'الأسئلة الشائعة' },
  { id: 'contact', label: 'اتصل بنا' },
  { id: 'privacy', label: 'الخصوصية' },
  { id: 'terms',   label: 'الشروط والأحكام' }
]
const activeId = ref('about')
function go(id) {
  const el = document.getElementById(id)
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

// Observe sections to highlight active tab
let observer
onMounted(() => {
  observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) activeId.value = e.target.id
    })
  }, { rootMargin: '-40% 0px -50% 0px', threshold: 0.01 })
  tabs.forEach(t => {
    const el = document.getElementById(t.id)
    if (el) observer.observe(el)
  })
})
onBeforeUnmount(() => observer && observer.disconnect())

// Static content (Arabic)
const stats = [
  { label: 'المتعلمون', value: '١٠٬٠٠٠+' },
  { label: 'الدورات',    value: '١٥٠+'   },
  { label: 'المدرّسون',  value: '٨٠+'    }
]
const plans = [
  { name:'مجاني',    price:'0 ر.س',         cta:'ابدأ الآن',  features:['وصول لعدد من الدروس','شهادة إتمام أساسية','مجتمع المتعلمين'] },
  { name:'احترافي',  price:'٤٩ ر.س / شهر',  cta:'اشترك',      features:['وصول لجميع الدورات','مشاريع تطبيقية','دعم أولوية'] },
  { name:'مؤسسات',   price:'مخصّص',         cta:'تواصل معنا', features:['حسابات فرق','لوحة تقارير','تكاملات خاصة'] }
]
const faqItems = [
  { q:'كيف أسجّل في المنصّة؟', a:'يمكنك إنشاء حساب مجاني ثم اختيار الخطة المناسبة.' },
  { q:'هل توجد شهادات؟',        a:'نعم، تُصدر شهادة إتمام لكل دورة بعد اجتياز المتطلبات.' },
  { q:'هل المحتوى بالعربية؟',   a:'المحتوى الأساسي بالعربية مع دعم لغات أخرى لبعض الدورات.' }
]
const form = ref({ name:'', email:'', subject:'', message:'' })
function submit(){
  alert('تم إرسال رسالتك (نموذج تجريبي).')
  form.value = { name:'', email:'', subject:'', message:'' }
}
</script>

<template>
  <!-- Sticky Section Nav -->
  <div class="section-nav">
    <div class="tabs" role="tablist" aria-label="أقسام الصفحة">
      <button
        v-for="t in tabs" :key="t.id"
        class="tab" :class="{ active: activeId === t.id }"
        @click="go(t.id)"
      >{{ t.label }}</button>
    </div>
  </div>

  <!-- About -->
  <section id="about" class="hero">
    <div class="page-container">
      <h1 class="hero-title">من نحن</h1>
      <p class="hero-sub">
        منصّة عربية للتعلّم الإلكتروني توفّر دورات عالية الجودة ومدرّسين خبراء بتجربة استخدام متوافقة مع RTL.
      </p>
    </div>
  </section>

  <section class="section">
    <div class="page-container grid">
      <div class="card">
        <h2 class="section-title">رسالتنا</h2>
        <p>تسهيل الوصول إلى التعلّم النوعي باللغة العربية وتمكين المتعلمين من بناء مسارات مهنية حقيقية.</p>
      </div>
      <div class="card">
        <h2 class="section-title">قيمنا</h2>
        <ul class="list">
          <li>الجودة أولاً</li>
          <li>مجتمع داعم</li>
          <li>الشفافية والموثوقية</li>
        </ul>
      </div>
      <div class="card">
        <h2 class="section-title">أرقام سريعة</h2>
        <div style="display:flex;gap:10px;flex-wrap:wrap">
          <span v-for="s in stats" :key="s.label" class="badge">{{ s.value }} — {{ s.label }}</span>
        </div>
      </div>
    </div>
  </section>

  <!-- Pricing -->
  <section id="pricing" class="section">
    <div class="page-container">
      <h2 class="section-title">الأسعار</h2>
      <p class="muted" style="margin-bottom:12px">خطط مرنة تناسب احتياجك، مع إمكانية الترقية أو الإلغاء في أي وقت.</p>
      <div class="grid">
        <div v-for="p in plans" :key="p.name" class="card" style="text-align:center">
          <h3 class="section-title">{{ p.name }}</h3>
          <div style="font-size:26px;font-weight:800;margin:8px 0">{{ p.price }}</div>
          <ul class="list" style="margin:8px auto 12px; text-align:right; max-width: 340px;">
            <li v-for="f in p.features" :key="f">{{ f }}</li>
          </ul>
          <button class="btn btn-primary">{{ p.cta }}</button>
        </div>
      </div>
    </div>
  </section>

  <!-- FAQ -->
  <section id="faq" class="section">
    <div class="page-container">
      <h2 class="section-title">الأسئلة الشائعة</h2>
      <FaqAccordion :items="faqItems" />
    </div>
  </section>

  <!-- Contact -->
  <section id="contact" class="section">
    <div class="page-container grid">
      <div class="card form">
        <h2 class="section-title">اتصل بنا</h2>
        <div class="field">
          <label>الاسم</label>
          <input class="input" v-model="form.name" required />
        </div>
        <div class="field">
          <label>البريد الإلكتروني</label>
          <input class="input" type="email" v-model="form.email" required />
        </div>
        <div class="field">
          <label>الموضوع</label>
          <input class="input" v-model="form.subject" />
        </div>
        <div class="field">
          <label>الرسالة</label>
          <textarea class="textarea" v-model="form.message" required />
        </div>
        <button class="btn btn-primary" @click="submit">إرسال</button>
      </div>

      <div class="card">
        <h2 class="section-title">معلومات التواصل</h2>
        <p class="muted">البريد: support@example.com</p>
        <p class="muted">الهاتف: 0000-000-000</p>
        <p class="muted">الأوقات: 9ص–5م (UTC+3) — أيام العمل</p>
      </div>
    </div>
  </section>

  <!-- Privacy -->
  <section id="privacy" class="section">
    <div class="page-container">
      <h2 class="section-title">سياسة الخصوصية</h2>
      <p>نلتزم بحماية بياناتك واستخدامها بشفافية.</p>
      <ul class="list">
        <li>بيانات الحساب الأساسية (الاسم، البريد).</li>
        <li>بيانات الاستخدام لتحسين التجربة.</li>
      </ul>
      <h3 class="section-title" style="font-size:18px;margin-top:14px">حقوقك</h3>
      <p>يمكنك طلب تصحيح أو حذف بياناتك عبر التواصل مع الدعم.</p>
    </div>
  </section>

  <!-- Terms -->
  <section id="terms" class="section">
    <div class="page-container">
      <h2 class="section-title">الشروط والأحكام</h2>
      <p>استخدامك للمنصّة يعني موافقتك على هذه الشروط.</p>
      <h3 class="section-title" style="font-size:18px">الحساب والاستخدام المقبول</h3>
      <ul class="list">
        <li>تحمّل مسؤولية سرية بيانات الدخول.</li>
        <li>منع مشاركة المحتوى خارج بنود الترخيص.</li>
      </ul>
      <h3 class="section-title" style="font-size:18px;margin-top:14px">ملكية المحتوى</h3>
      <p>جميع العلامات والمحتويات محمية بحقوق النشر الخاصة بمالكيها.</p>
    </div>
  </section>
</template>
