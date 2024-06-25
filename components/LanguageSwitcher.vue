<template>
  <div class="flex gap-2">
    <button
      :class="{ 'font-bold': lang === 'en' }"
      @click="setLang('en')"
      :disabled="lang === 'en'"
    >
      ENG
    </button>
    <button
      :class="{ 'font-bold': lang === 'sk' }"
      @click="setLang('sk')"
      :disabled="lang === 'sk'"
    >
      SK
    </button>
  </div>
</template>

<script setup lang="ts">
import { useLang } from "../composables/useLang";
const { lang, setLang } = useLang();
</script>
