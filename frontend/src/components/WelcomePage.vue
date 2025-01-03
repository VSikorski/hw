<template>
    <div class="welcome-page">
        <div class="welcome-page-main">
            <img alt="logo" src="../assets/logo.png" class="welcome-page-logo">
        </div>
        <div class="welcome-page-footer-container">
            <nav class="welcome-page-footer">
                <h1 class="welcome-page-footer-heading">HW Journal</h1>
                <ul class="welcome-page-footer-list">
                    <li class="disp-flex alg-start just-start"><router-link to="/explore">Explore</router-link></li>
                    <li class="disp-flex alg-start just-start">API</li>
                    <li class="disp-flex alg-start just-end">Social</li>
                    <li class="disp-flex alg-start just-end"><router-link to="/admin">Log in</router-link></li>
                </ul>
            </nav>
        </div>
    </div>
  </template>
  
<script>
import '../assets/css/general.css';
import '../assets/css/welcome-page.css';
export default {
    name: 'WelcomePage'
}
</script>
