<template>
  <div class="custom-select" ref="selectContainer">
    <div class="select-wrapper" @click="toggleDropdown">
      <div class="selected-item">
        {{ selectedItem ? selectedItem.label : placeholder }}
      </div>
      <div v-if="dropdownOpen" class="dropdown">
        <div
            v-for="item in options"
            :key="item.value"
            class="dropdown-item"
            @click="selectItemClick(item)"
            @click.stop
        >
          {{ item.label }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'

interface Option {
  label: string
  value: string | number
}

const props = defineProps({
  options: {
    type: Array as PropType<Option[]>,
    required: true
  },
  placeholder: {
    type: String,
    default: 'Select an option'
  },
  modelValue: {
    type: [String, Number],
    required: false
  }
})

const emit = defineEmits(['update:modelValue'])

const selectedItem = ref<Option | null>(null)
const dropdownOpen = ref(false)
const selectContainer = ref<HTMLElement | null>(null)

// Dropdown 열기/닫기 토글
const toggleDropdown = (event: MouseEvent) => {
  // 드롭다운이 열려있지 않으면 열기
  if (!dropdownOpen.value) {
    dropdownOpen.value = true
  } else {
    // 드롭다운이 열려있으면 닫기
    dropdownOpen.value = false
  }
  event.stopPropagation() // 상위 요소로 이벤트 전파를 막기 위해 추가
}

// 옵션 선택
const selectItemClick = (item: Option) => {
  selectedItem.value = item;
  dropdownOpen.value = false;  // 드롭다운 닫기
  emit('update:modelValue', item.value)  // v-model에 값 전달
}

// 외부 클릭 시 드롭다운 닫기
const closeDropdown = (event: MouseEvent) => {
  // 드롭다운 외부 클릭을 감지해서 닫기
  if (selectContainer.value && !selectContainer.value.contains(event.target as Node)) {
    dropdownOpen.value = false
  }
}

// 이벤트 리스너 설정 및 제거
onMounted(() => {
  // document를 사용하여 클릭 이벤트를 처리
  document.addEventListener('mousedown', closeDropdown)
})

onBeforeUnmount(() => {
  // 컴포넌트가 언등록될 때 이벤트 리스너 제거
  document.removeEventListener('mousedown', closeDropdown)
})
</script>
