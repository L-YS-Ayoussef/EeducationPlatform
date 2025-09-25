<script setup>
import '../../assets/styles/layout.css'
</script>

<template>
  <footer class="site-footer">
    <div class="site-container">
      <div class="footer-grid">
        <div class="footer-col">
          <h4>عن المنصّة</h4>
          <p style="color:var(--ink-700); line-height:1.8; margin:0">
            منصّة عربية للتعلّم الإلكتروني تقدّم دورات عالية الجودة من خبراء.
          </p>
        </div>
        <div class="footer-col">
          <h4>روابط سريعة</h4>
          <RouterLink to="/courses">الدورات</RouterLink>
          <RouterLink to="/instructors">المدرّسون</RouterLink>
          <RouterLink to="/about#pricing">الأسعار</RouterLink>
          <RouterLink to="/about#faq">الأسئلة الشائعة</RouterLink>
        </div>
        <div class="footer-col">
          <h4>قانوني</h4>
          <RouterLink to="/about#privacy">الخصوصية</RouterLink>
          <RouterLink to="/about#terms">الشروط والأحكام</RouterLink>
        </div>
        <div class="footer-col">
          <h4>تواصل</h4>
          <a href="mailto:support@example.com">support@example.com</a>
          <a href="tel:+0000000000">+00 000 0000</a>
        </div>
      </div>

      <div class="footer-bottom site-container">
        © {{ new Date().getFullYear() }} منصّة التعلّم — جميع الحقوق محفوظة.
      </div>
    </div>
  </footer>
</template>
