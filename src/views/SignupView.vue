<template>
  <component :is="currentStep" :formData="formData" @updateFormData="updateFormData" @prevStep="prevStep" @nextStep="nextStep" @continueToNextStep="continueToNextStep" />
</template>
<script>
import signupStep1 from '@/component/signup/signupStep1.vue';
import signupStep2 from '@/component/signup/signupStep2.vue';
import signupStep3 from '@/component/signup/signupStep3.vue';
import signupStep4 from '@/component/signup/signupStep4.vue';
import signupStep5 from '@/component/signup/signupStep5.vue';
import signupStep6 from '@/component/signup/signupStep6.vue';
  
import { Snackbar } from '@varlet/ui';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import store from '@/store';

export default {
  mounted() {
      document.title = 'Sign Up | ArthriCare';
  },
  components: {
      signupStep1,
      signupStep2,
      signupStep3,
      signupStep4,
      signupStep5,
      signupStep6
  },
  setup() {
      const router = useRouter();
      const currentStep = ref('signupStep1');
      const formData = ref({
          email: '',
          password: '',
          name: '',
          age: '',
          gender: '',
          weight: '',
          height: '',
          weightUnit: '',
          heightUnit: '',
      });

      const prevStep = () => {
          const step = currentStep.value;
          if(step === 'signupStep1'){
              router.push('/');
          }else if(step === 'signupStep2'){
              currentStep.value = 'signupStep1';
          }else if(step === 'signupStep3'){
              currentStep.value = 'signupStep2';
          }else if(step === 'signupStep4'){
              currentStep.value = 'signupStep3';
          }else if(step === 'signupStep5'){
              currentStep.value = 'signupStep4';
          }else if(step === 'signupStep6'){
              currentStep.value = 'signupStep5'
          }
      };

      const nextStep = () => {
          const step = currentStep.value;
          if(step === 'signupStep1'){
              currentStep.value = 'signupStep2';
          }else if(step === 'signupStep2'){
              currentStep.value = 'signupStep3';
          }else if(step === 'signupStep3'){
              currentStep.value = 'signupStep4';
          }else if(step === 'signupStep4'){
              currentStep.value = 'signupStep5';
          }else if(step === 'signupStep5'){
              currentStep.value = 'signupStep6';
          }
      };

      const continueToNextStep = async () => {
          const step = currentStep.value;
          if(step === 'signupStep1'){
              currentStep.value = 'signupStep2';
          }else if(step === 'signupStep2'){
              currentStep.value = 'signupStep3';
          }else if(step === 'signupStep3'){
              currentStep.value = 'signupStep4';
          }else if(step === 'signupStep4'){
              currentStep.value = 'signupStep5';
          }else if(step === 'signupStep5'){
              currentStep.value = 'signupStep6';
          } else if (step === 'signupStep6') {
              if (formData.value.email === '' && formData.value.password === '') {
                  Snackbar.error('Please fill in both email and password');
              } else if (formData.value.password === '') {
                  Snackbar.error('Please fill in your password');
              } else if (formData.value.email === '') {
                  Snackbar.error('Please fill in your email');
              } else {
                  try {
                      await store.dispatch('user/registerUser', {
                          email: formData.value.email,
                          password: formData.value.password,
                          name: formData.value.name,
                          age: formData.value.age,
                          gender: formData.value.gender,
                          weight: formData.value.weight,
                          height: formData.value.height,
                          weightUnit: formData.value.weightUnit,
                          heightUnit: formData.value.heightUnit,
                      });
                  } catch (error) {
                      console.log('Sign up error:', error);
                  }
              }
          }
      };

      const updateFormData = (data) => {
          formData.value = { ...formData.value, ...data };
      };

      return {
          currentStep,
          formData,
          prevStep,
          nextStep,
          continueToNextStep,
          updateFormData
      };
  }
};
</script>
