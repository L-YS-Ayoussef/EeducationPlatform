<script setup>
import { ref } from 'vue'
// Import the separated CSS (relative path avoids alias issues)
import '../../assets/styles/home.css'

const q = ref('')
const featured = ref([
  { id: 1, title: 'أساسيات البرمجة', meta: ['مبتدئ', '١٢ ساعة', '4.8★'] },
  { id: 2, title: 'مقدمة في علم البيانات', meta: ['مبتدئ', '٩ ساعات', '4.7★'] },
  { id: 3, title: 'دورة مكثفة: Vue 3 + Vite', meta: ['كل المستويات', '٦ ساعات', '4.9★'] },
  { id: 4, title: 'واجهات المستخدم للمطورين', meta: ['متوسط', '٨ ساعات', '4.6★'] },
])

function doSearch() {
  // For now just navigate to /courses with ?q=
  if (q.value?.trim()) {
    window.location.href = `/courses?q=${encodeURIComponent(q.value)}`
  } else {
    window.location.href = '/courses'
  }
}
</script>

<template>
  <!-- HERO -->
  <section class="home-hero">
    <div class="home-container">
      <span class="home-kicker">منصّة التعلّم الإلكتروني</span>
      <h1 class="home-title">تعلّم أيّ شيء.<br />طوِّر مهاراتك. واحصل على شهادتك.</h1>
      <p class="home-sub">
        دورات عالية الجودة يقدّمها خبراء. تعلّم بالوتيرة التي تناسبك وتابع تقدّمك عبر جميع أجهزتك.
      </p>

      <!-- البحث / أزرار الدعوة -->
      <div class="home-ctaRow">
        <div class="home-search" role="search" aria-label="بحث عن الدورات">
          <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
            <path
              fill="currentColor"
              d="M21 20l-4.2-4.2a7.5 7.5 0 10-1 1L20 21zM4 10.5A6.5 6.5 0 1110.5 17 6.5 6.5 0 014 10.5z"
            />
          </svg>
          <input
            v-model="q"
            type="search"
            placeholder="ابحث في الدورات (مثلاً: Vue، بايثون، الإنجليزية)..."
            @keydown.enter="doSearch"
          />
          <button class="btn btn-primary" @click="doSearch">ابحث</button>
        </div>

        <RouterLink to="/courses" class="btn btn-ghost">تصفّح جميع الدورات</RouterLink>
      </div>

      <div class="home-meta">
        <span>موثوق به من أكثر من 10 آلاف متعلّم</span>
        <span class="dot"></span>
        <span>دورات جديدة كل أسبوع</span>
      </div>
    </div>
  </section>

  <!-- الدورات المميزة -->
  <section class="section">
    <div class="home-container">
      <div class="section-head">
        <div>
          <h2 class="section-title">الدورات المميّزة</h2>
          <div class="section-sub">اختيارات منتقاة لتبدأ بسرعة</div>
        </div>
        <RouterLink to="/courses" class="btn btn-ghost">عرض المزيد</RouterLink>
      </div>

      <div class="grid">
        <article v-for="c in featured" :key="c.id" class="card">
          <div class="card-thumb" />
          <div class="card-body">
            <div class="card-title">{{ c.title }}</div>
            <div class="card-meta">
              <span v-for="m in c.meta" :key="m">{{ m }}</span>
            </div>
          </div>
        </article>
      </div>
    </div>
  </section>

  <!-- لماذا نحن -->
  <section class="section alt">
    <div class="home-container">
      <div class="section-head">
        <h2 class="section-title">لماذا تتعلّم معنا؟</h2>
      </div>
      <div class="benefits">
        <div class="benefit">
          <h4>مدرّسون خبراء</h4>
          <p>ممارسون من الواقع العملي بخبرة مثبتة.</p>
        </div>
        <div class="benefit">
          <h4>تتبّع التقدّم</h4>
          <p>اختبارات، واجبات، وشهادات إتمام.</p>
        </div>
        <div class="benefit">
          <h4>تعلّم مرِن</h4>
          <p>دروس ذاتيّة الإيقاع وفيديوهات مناسبة للأجهزة المحمولة.</p>
        </div>
        <div class="benefit">
          <h4>مجتمع ودعم</h4>
          <p>منتديات، جلسات مباشرة، وقنوات مساعدة مخصّصة.</p>
        </div>
      </div>
    </div>
  </section>

  <!-- CTA -->
  <!-- دعوة للإجراء -->
  <section class="section">
    <div class="home-container">
      <div class="home-cta">
        <h3>هل أنت مستعد للبدء؟</h3>
        <p>أنشئ حسابًا مجانيًا وابدأ التعلّم اليوم.</p>
        <div class="home-ctaRow" style="justify-content: center">
          <RouterLink to="/auth/register" class="btn btn-primary">ابدأ الآن</RouterLink>
          <RouterLink to="/courses" class="btn btn-ghost">استكشف الدورات</RouterLink>
        </div>
      </div>
    </div>
  </section>
</template>
