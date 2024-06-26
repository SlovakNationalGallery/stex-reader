<template>
  <div class="flex h-screen flex-col bg-[#FFF3E3] font-display">
    <div class="flex h-[80px] w-full items-center justify-between p-6 text-2xl">
      <div class="flex items-center gap-4">
        <span class="font-bold">{{
          trans(`library.${publication.id}.author`)
        }}</span>
        <span>{{ trans(`library.${publication.id}.title`) }}</span>
        <span>({{ trans(`library.${publication.id}.year`) }})</span>
      </div>
      <LanguageSwitcher />
    </div>
    <div class="flex grow items-center">
      <div
        class="no-scrollbar flex w-full snap-x snap-mandatory gap-x-11 overflow-x-auto px-11 pb-6 pt-16"
      >
        <div
          class="flex min-w-[700px] snap-center items-center overflow-hidden"
          v-for="(image, index) in images"
          :key="index"
        >
          <div>
            <img
              class="w-full"
              :src="image.src"
              :ref="(el) => (image.wrapperRef = el)"
              @touchstart="(event) => handleTouchStart(event, index)"
              @touchmove="(event) => handleTouchMove(event, index)"
              @touchend="(event) => handleTouchEnd(event, index)"
            />
          </div>
        </div>
      </div>
    </div>
    <div
      class="flex h-[72px] w-full items-center justify-center p-6 text-neutral-900"
    >
      <Logo class="h-6 w-6" />
      <span class="ml-4 text-xl">{{ trans("sng") }}</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, Ref } from "vue";
import { LIBRARY } from "../../consts";
import LanguageSwitcher from "../components/LanguageSwitcher.vue";
import Logo from "~/assets/img/logo.svg?component";

const route = useRoute();
const index = route.params.id;
const publication = LIBRARY[Number(index)];

const { trans } = useLang();

interface ImageData {
  src: string;
  initialDistance: number;
  initialTouchCenterX: number;
  initialTouchCenterY: number;
  wrapperRef: Ref<HTMLElement | null>;
}

const images: Ref<Array<ImageData>> = ref([]);

const minScale = 1;
const maxScale = 3;

const handleTouchStart = (event: TouchEvent, index: number) => {
  const image = images.value[index];
  if (event.touches.length === 2) {
    event.preventDefault();
    const touch1 = event.touches[0];
    const touch2 = event.touches[1];
    image.initialDistance = Math.hypot(
      touch2.clientX - touch1.clientX,
      touch2.clientY - touch1.clientY,
    );
    image.initialTouchCenterX = (touch2.clientX + touch1.clientX) / 2;
    image.initialTouchCenterY = (touch2.clientY + touch1.clientY) / 2;
  }
};

const handleTouchMove = (event: TouchEvent, index: number) => {
  const image = images.value[index];
  const frameRect = image.wrapperRef?.parentElement?.getBoundingClientRect();
  const wrapperRef = image.wrapperRef;

  let scale = 1;
  if (event.touches.length === 2) {
    wrapperRef.style.transition = `all .0s`;
    event.preventDefault();
    const touch1 = event.touches[0];
    const touch2 = event.touches[1];
    const touchCenterX = (touch2.clientX + touch1.clientX) / 2;
    const touchCenterY = (touch2.clientY + touch1.clientY) / 2;

    const newDistance = Math.hypot(
      touch2.clientX - touch1.clientX,
      touch2.clientY - touch1.clientY,
    );

    const delta = newDistance - image.initialDistance;

    scale = Math.min(maxScale, Math.max(minScale, scale + delta * 0.01));

    //inverse movement
    const x = 2 * image.initialTouchCenterX - touchCenterX - frameRect.left;
    const y = 2 * image.initialTouchCenterY - touchCenterY - frameRect.top;

    wrapperRef.style.transform = `scale(${scale})`;
    wrapperRef.style.transformOrigin = `${x}px ${y}px`;
  } else {
    wrapperRef.style.transition = `all .25s`;
  }
};

const handleTouchEnd = (event: TouchEvent, index: number) => {
  const image = images.value[index];
  const wrapperRef = image.wrapperRef;
  wrapperRef.style.transition = `all .25s`;
  wrapperRef.style.transform = `scale(1)`;
  wrapperRef.style.transformOrigin = `0px 0px`;
};

onMounted(() => {
  const config = useRuntimeConfig()
  let pageImages: Array<ImageData> = [];
  for (let i = 0; i < Number(publication.pages); i++) {
    pageImages.push({
      initialDistance: 0,
      initialTouchCenterX: 0,
      initialTouchCenterY: 0,
      //This is an issue in nuxt 3. Remove once fixed
      src: `${config.app.baseURL}library/${publication.id}/${publication.id}-${i + 1}.jpg`,
      wrapperRef: ref(null),
    });
  }
  images.value = pageImages;
});
</script>
