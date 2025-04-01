<template>
  <div class="introWrapper">
    <section>
      <div class="green-text-mid">
        Tell us where you are currently.
      </div>
      <CustomSelect
          :options="options"
          v-model="selectedValue"
          placeholder="Choose an option"
      />
      <button class="buttonDefaultGreen mt-4" type="button" @click="nextPage">Continue</button>
    </section>
  </div>

</template>
<script lang="ts" setup>
import {useRouter} from "vue-router";
import CustomSelect from "~/layouts/common/CustomSelect.vue";

definePageMeta({
  layout: 'default', // 사용할 레이아웃을 지정
  layoutProps: {
    showHeader: false,
    showBottom: false,
    showArrow: false
  },
});
const selectedValue = ref<string | number>('')
const options = ref([
  {label: 'Option 1', value: 1},
  {label: 'Option 2', value: 2},
  {label: 'Option 3', value: 3}
])

const router = useRouter();

onMounted(async () => {
//   api 호출 하면 됨 여기서
})

const nextPage = () => {
  router.push('/intro/move');

}
</script>