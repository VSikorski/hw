<template>
    <nav class="header">

        <div class="header-logo">
          <img alt="HW logo" src="../assets/logo.png">
        </div>
        

        <ul class="header-list">
            <li class="header-item"><router-link to="/">Home</router-link></li>
            <li class="header-item"><router-link to="/">Blog</router-link></li>
            <li class="header-item"><router-link to="/">My collection</router-link></li>
            <li class="header-item"><router-link to="/">Wishlist</router-link></li>
        </ul>

        <div class="header-log-in-block">
            <span class="header-log-in">Log in</span>
            <span class="header-sign-up">Sign up</span>
        </div>
    </nav>
</template>

<script>
import '../assets/css/page-header.css';

export default {
  name: 'PageHeader'
}

window.onscroll = function() {
    var header = document.querySelector('.header');
    if (window.scrollY > 0) {
      header.classList.add('sticky');
    } else {
      header.classList.remove('sticky');
    }
  };
  
</script>