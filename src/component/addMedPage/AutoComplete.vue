<!--auto complete component-->
<!--
    Author: zhenxi zhang
    Student number: 6062027
    Date: 2023/10/20  
-->
<template>
    <el-autocomplete
        v-model="selectedMed"
        :fetch-suggestions="querySearchAsync"
        :trigger-on-focus="false"
        style="width: 100%;"
        placeholder="Please Input Medication Name"
        @select="handleSelect"
    />
  </template>
  
  <script>
  import { ref, watch } from 'vue';
  
  export default {
    name: 'AutoCompleteComponent',

    setup(_,{ emit }) {
      const selectedMed = ref();
  
      const Meds = [
      "Abatacept","Adalimumab",
      "Allopurinol",
      "Ambrisentan",
      "Anakinra",
      "Anifrolumab",
      "Apremilast",
      "Azathioprine",
      "Baricitinib",
      "Biosimilars",
      "Bisphosphonates (Oral)",
      "Bisphosphonates (Intravenous/IV)",
      "Bosentan",
      "Cannabinoids - Medicinal Cannabis",
      "Certolizumab",
      "Colchicine",
      "Ciclosporin",
      "Cyclophosphamide",
      "Denosumab",
      "Duloxetine",
      "Etanercept",
      "Febuxostat",
      "Glucosamine",
      "Golimumab",
      "Goserelin",
      "Guselkumab",
      "Hyaluronic Acid",
      "Hydroxychloroquine",
      "Iloprost",
      "Infliximab",
      "Ixekizumab",
      "IV Immunuglobulin",
      "Leflunomide",
      "Methotrexate",
      "Self-Injecting Methotrexate for the Treatment of Arthritis",
      "Mycophenolate",
      "NSAIDs",
      "Opioids",
      "Paracetamol",
      "Prednisolone",
      "Pregabalin",
      "Probenecid",
      "Raloxifene",
      "Rituximab",
      "Romosozumab",
      "Secukinumab",
      "Sulfasalazine",
      "Tacrolimus",
      "Teriparatide",
      "Tocilizumab",
      "Tofacitinib",
      "Ustekinumab",
      "Upadacitinib"
        ].map(med => ({ label: med, value: med }));
  
    const querySearchAsync = (queryString, cb) => {
        const results = queryString
            ? Meds.filter(med => med.label.toLowerCase().includes(queryString.toLowerCase()))
            : Meds;
        console.log(results);
        cb(results);
    };
  
      const handleSelect = (item) => {
        emit('med-selected', item.value);
      };

      watch(selectedMed, (newValue) => {
        emit('med-selected', newValue);  // Emitting the input value to parent
      });

  
      return {
        selectedMed,
        querySearchAsync,
        handleSelect
      };
    }

    
  };
  </script>
  
  <style scoped>
  </style>
  

  