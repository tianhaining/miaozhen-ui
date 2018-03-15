<template>
  <i :class="'mz-icon-' + name"></i>
</template>

<script>
  export default {
    name: 'MzIcon',

    props: {
      name: String
    }
  };
</script>
<style lang="less">
@font-face {
  font-family: 'miaozhen-icons';
  src: url("fonts/element-icons.woff?t=1510834658947") format("woff"), url("fonts/element-icons.ttf?t=1510834658947") format("truetype");
  /* chrome, firefox, opera, Safari, Android, iOS 4.2+*/
  font-weight: normal;
  font-style: normal; }
[class^="mz-icon-"], [class*=" mz-icon-"] {
  /* use !important to prevent issues with browser extensions that change fonts */
  font-family: 'miaozhen-icons' !important;
  speak: none;
  font-style: normal;
  font-weight: normal;
  font-variant: normal;
  text-transform: none;
  line-height: 1;
  vertical-align: baseline;
  display: inline-block;
  /* Better Font Rendering =========== */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale; }

.mz-icon-upload:before {
  content: "\e60d"; }

.mz-icon-error:before {
  content: "\e62c"; }

.mz-icon-success:before {
  content: "\e62d"; }

.mz-icon-warning:before {
  content: "\e62e"; }

.mz-icon-sort-down:before {
  content: "\e630"; }

.mz-icon-sort-up:before {
  content: "\e631"; }

.mz-icon-arrow-left:before {
  content: "\e600"; }

.mz-icon-circle-plus:before {
  content: "\e601"; }

.mz-icon-circle-plus-outline:before {
  content: "\e602"; }

.mz-icon-arrow-down:before {
  content: "\e603"; }

.mz-icon-arrow-right:before {
  content: "\e604"; }

.mz-icon-arrow-up:before {
  content: "\e605"; }

.mz-icon-back:before {
  content: "\e606"; }

.mz-icon-circle-close:before {
  content: "\e607"; }

.mz-icon-date:before {
  content: "\e608"; }

.mz-icon-circle-close-outline:before {
  content: "\e609"; }

.mz-icon-caret-left:before {
  content: "\e60a"; }

.mz-icon-caret-bottom:before {
  content: "\e60b"; }

.mz-icon-caret-top:before {
  content: "\e60c"; }

.mz-icon-caret-right:before {
  content: "\e60e"; }

.mz-icon-close:before {
  content: "\e60f"; }

.mz-icon-d-arrow-left:before {
  content: "\e610"; }

.mz-icon-check:before {
  content: "\e611"; }

.mz-icon-delete:before {
  content: "\e612"; }

.mz-icon-d-arrow-right:before {
  content: "\e613"; }

.mz-icon-document:before {
  content: "\e614"; }

.mz-icon-d-caret:before {
  content: "\e615"; }

.mz-icon-edit-outline:before {
  content: "\e616"; }

.mz-icon-download:before {
  content: "\e617"; }

.mz-icon-goods:before {
  content: "\e618"; }

.mz-icon-search:before {
  content: "\e619"; }

.mz-icon-info:before {
  content: "\e61a"; }

.mz-icon-message:before {
  content: "\e61b"; }

.mz-icon-edit:before {
  content: "\e61c"; }

.mz-icon-location:before {
  content: "\e61d"; }

.mz-icon-loading:before {
  content: "\e61e"; }

.mz-icon-location-outline:before {
  content: "\e61f"; }

.mz-icon-menu:before {
  content: "\e620"; }

.mz-icon-minus:before {
  content: "\e621"; }

.mz-icon-bell:before {
  content: "\e622"; }

.mz-icon-mobile-phone:before {
  content: "\e624"; }

.mz-icon-news:before {
  content: "\e625"; }

.mz-icon-more:before {
  content: "\e646"; }

.mz-icon-more-outline:before {
  content: "\e626"; }

.mz-icon-phone:before {
  content: "\e627"; }

.mz-icon-phone-outline:before {
  content: "\e628"; }

.mz-icon-picture:before {
  content: "\e629"; }

.mz-icon-picture-outline:before {
  content: "\e62a"; }

.mz-icon-plus:before {
  content: "\e62b"; }

.mz-icon-printer:before {
  content: "\e62f"; }

.mz-icon-rank:before {
  content: "\e632"; }

.mz-icon-refresh:before {
  content: "\e633"; }

.mz-icon-question:before {
  content: "\e634"; }

.mz-icon-remove:before {
  content: "\e635"; }

.mz-icon-share:before {
  content: "\e636"; }

.mz-icon-star-on:before {
  content: "\e637"; }

.mz-icon-setting:before {
  content: "\e638"; }

.mz-icon-circle-check:before {
  content: "\e639"; }

.mz-icon-service:before {
  content: "\e63a"; }

.mz-icon-sold-out:before {
  content: "\e63b"; }

.mz-icon-remove-outline:before {
  content: "\e63c"; }

.mz-icon-star-off:before {
  content: "\e63d"; }

.mz-icon-circle-check-outline:before {
  content: "\e63e"; }

.mz-icon-tickets:before {
  content: "\e63f"; }

.mz-icon-sort:before {
  content: "\e640"; }

.mz-icon-zoom-in:before {
  content: "\e641"; }

.mz-icon-time:before {
  content: "\e642"; }

.mz-icon-view:before {
  content: "\e643"; }

.mz-icon-upload2:before {
  content: "\e644"; }

.mz-icon-zoom-out:before {
  content: "\e645"; }

.mz-icon-loading {
  animation: rotating 2s linear infinite; }

.mz-icon--right {
  margin-left: 5px; }

.mz-icon--left {
  margin-right: 5px; }

@keyframes rotating {
  0% {
    transform: rotateZ(0deg); }
  100% {
    transform: rotateZ(360deg); } }
</style>
