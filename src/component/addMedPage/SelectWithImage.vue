<!--select with image component-->
<!--
    Author: zhenxi zhang
    Student number: 6062027
    Date: 2023/10/20  
-->
<template>
    <var-select variant="outlined" v-model="selectedValue" class="selectControler">
        <template #default>
        <var-option label="Pill">
            <var-image class="selected-icon" :src="pill"></var-image>
            <span>Pill</span>
        </var-option>
        <var-option label="Tablet">
            <var-image class="selected-icon" :src="tablet"></var-image>
            <span>Tablet</span>
        </var-option>
        <var-option label="Drop">
            <var-image class="selected-icon" :src="drop"></var-image>
            <span>Drop</span>
        </var-option>
        <var-option label="Injection">
            <var-image class="selected-icon" :src="injection"></var-image>
            <span>Injectiont</span>
        </var-option>
        </template>
        <template #selected>
            <var-image
                class="selected-icon"
                :src="selectedValue === 'Pill' ? pill :
                    selectedValue === 'Tablet' ? tablet :
                    selectedValue === 'Drop' ? drop : injection">
            </var-image>
            <span>{{ selectedValue }}</span>
        </template>
    </var-select>
</template>


<script setup>
import { ref, watch, defineEmits,} from 'vue';
import injection from "@/assets/injection.png";
import drop from "@/assets/drop.png";
import pill from "@/assets/capsules.png";
import tablet from "@/assets/pill.png";

const emit = defineEmits(['category-selected']);
const selectedValue = ref("Pill");


// Watch for changes in selectedValue and emit those changes
watch(selectedValue, (newValue) => {
  emit('category-selected', newValue);
});


</script>


<style scoped>

.selected-icon
{
    width: 24px;
    height: 24px;
    margin-right: 20px;
}

.selectControler
{
    --field-decorator-outlined-normal-padding-top: 6px;
    --field-decorator-outlined-normal-padding-bottom: 6px;
    --field-decorator-outlined-normal-padding-right: 11px;
    --field-decorator-outlined-normal-padding-left: 11px;
    --field-decorator-blur-color:#555;
}
</style>

