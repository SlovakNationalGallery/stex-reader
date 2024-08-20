<template>
  <div class="flex h-screen flex-col bg-[#FFF3E3] font-display">
    <div class="flex h-[80px] w-full items-center justify-between p-6 text-2xl">
      <div class="flex items-center gap-4">
        <span class="font-bold">{{
          trans(`library.${publication.id}.author`)
        }}</span>
        <span>{{ trans(`library.${publication.id}.title`) }}</span>
        <span>{{ trans(`library.${publication.id}.year`) }}</span>
      </div>
      <LanguageSwitcher />
    </div>
    <div class="flex pt-10 items-center">
      <div
        class="no-scrollbar flex w-full snap-x snap-mandatory gap-x-5 overflow-x-auto px-80"
        ref="booksContainer"
      >
        <div
          v-for="(image, index) in images"
          :key="index"
          class="flex min-w-max snap-start items-center justify-around gap-8 overflow-hidden pl-6"
        >
          <div class="h-[720px]" ref="booksRefs" :book-index="index">
            <img
              class="h-full"
              :src="image.src"
              :ref="(el) => (image.wrapperRef = el as HTMLElement)"
              @touchstart="(event) => handleTouchStart(event, index)"
              @touchmove="(event) => handleTouchMove(event, index)"
              @touchend="(event) => handleTouchEnd(event, index)"
            />
          </div>
          <article
            class="flex w-[250px] flex-col items-start justify-around gap-6 pt-8 text-2xl"
          >
            <h2 class="font-bold">
              {{ trans(`library.${publication.id}.photosTitles[${index}]`) }}
            </h2>
            <div
              v-if="
                trans(`library.${publication.id}.photosDescriptions[${index}]`)
              "
              class="flex flex-col gap-4 text-lg"
            >
              <span>{{ trans("preklad") }}</span>
              <p
                class="italic"
                v-html="
                  trans(
                    `library.${publication.id}.photosDescriptions[${index}]`,
                  )
                "
              />
            </div>
          </article>
        </div>
      </div>
    </div>
    <div class="inline-flex w-full items-center justify-center">
      <div class="bg-black/5 rounded-xl gap-2 px-4 py-2 mt-10 flex items-center">
        <PinchOut class="h-8 w-8 stroke-black" />
        <span class="ml-4 text-xl leading-6 align-middle">{{ trans("gestureInstruction") }}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { LIBRARY } from "../../consts";
import PinchOut from "~/assets/img/pinch-out.svg?component";

const route = useRoute();
const index = route.params.id;
const publication = LIBRARY[Number(index)];
const activeBookIndex = ref<Number>();
const booksRefs = ref([]);
const booksContainer = ref<HTMLElement | null>();
const isPopoverOpen = ref<boolean>(false);

const intersectionObserver = new IntersectionObserver(
  (entries, _) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        activeBookIndex.value = Number(entry.target.getAttribute("book-index"));
      }
    });
  },
  { threshold: 1 },
);

const { trans, setLang } = useLang();

const IDLE_TIMEOUT = 60000; // 1 minute
let idleTimer: ReturnType<typeof setTimeout> | null = null;

interface ImageData {
  src: string;
  initialDistance: number;
  initialTouchCenterX: number;
  initialTouchCenterY: number;
  wrapperRef: HTMLElement | null;
}

const images: Ref<Array<ImageData> | null> = ref(null);

const minScale = 1;
const maxScale = 3;

const handleTouchStart = (event: TouchEvent, index: number) => {
  if (!images.value) return;
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
  if (!images.value) return;
  const image = images.value[index];
  const frameRect = image.wrapperRef?.parentElement?.getBoundingClientRect();
  const wrapperRef = image.wrapperRef;

  if (!wrapperRef) return;
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
    if (!frameRect) return;
    const x = 2 * image.initialTouchCenterX - touchCenterX - frameRect.left;
    const y = 2 * image.initialTouchCenterY - touchCenterY - frameRect.top;

    wrapperRef.style.transform = `scale(${scale})`;
    wrapperRef.style.transformOrigin = `${x}px ${y}px`;
  } else {
    wrapperRef.style.transition = `all .25s`;
  }
};

const handleTouchEnd = (event: TouchEvent, index: number) => {
  if (!images.value) return;
  const image = images.value[index];
  const wrapperRef = image.wrapperRef;
  if (!wrapperRef) return;
  wrapperRef.style.transition = `all .25s`;
  wrapperRef.style.transform = `scale(1)`;
  wrapperRef.style.transformOrigin = `0px 0px`;
};

const formatDescription = (description: string) => {
  return description.replace(/\n/g, "<br>");
};

onBeforeMount(() => {
  const config = useRuntimeConfig();
  let pageImages: Array<ImageData> = [];
  for (let i = 0; i < Number(publication.pages); i++) {
    pageImages.push({
      initialDistance: 0,
      initialTouchCenterX: 0,
      initialTouchCenterY: 0,
      //This is an issue in nuxt 3. Remove once fixed
      src: `${config.app.baseURL}library/${publication.id}/${publication.id}-${
        i + 1
      }.jpg`,
      wrapperRef: null,
    });
  }
  images.value = pageImages;
});

onMounted(() => {
  window.addEventListener("touchstart", handleUserActivity);
  window.addEventListener("mousemove", handleUserActivity);
  booksRefs.value.map((bookRef) => intersectionObserver.observe(bookRef));
});

onBeforeUnmount(() => {
  window.removeEventListener("touchstart", handleUserActivity);
  window.removeEventListener("mousemove", handleUserActivity);
  booksRefs.value.map((bookRef) => intersectionObserver.unobserve(bookRef));
  if (idleTimer) {
    clearTimeout(idleTimer);
  }
});

const resetOnIdle = () => {
  activeBookIndex.value = 0;
  setLang("sk");
  booksContainer.value?.scrollTo({ top: 0, left: 0, behavior: "auto" });
};

const resetIdleTimer = () => {
  if (idleTimer) {
    clearTimeout(idleTimer);
  }
  idleTimer = setTimeout(() => {
    resetOnIdle();
  }, IDLE_TIMEOUT);
};

const handleUserActivity = () => {
  resetIdleTimer();
};
</script>
