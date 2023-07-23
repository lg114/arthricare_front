<!-- My Meds Page -->
<template> 
    <!-- fluidはcontainerを左右いっぱいに広げる -->
    <!-- fill-heightの中の要素は上下中央寄せで表示される -->
    <v-container fluid fill-height class="container">
      <!-- v-layoutの意味としては<div style=”display: flex;”></div>と同じ -->
      <v-layout wrap>
        <v-flex>
          <!-- Top Bar -->    
          <div style="display: flex;">
            <!-- Hamburger Menu -->
            <div style="margin-left: 56px; padding-top:21px; margin-right:auto;" @click="showMenu">
              <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M3 8.5V6.5H21V8.5H3ZM3 13.5H21V11.5H3V13.5ZM3 18.5H21V16.5H3V18.5Z" fill="white"/>
              </svg>
            </div> 
            <!-- Page Title -->
            <div style="margin-left:auto; margin-right:auto;">
              <p id="title">My Meds</p>
            </div> 
            <!-- Notification Icon -->
            <div style="margin-right: 56px; padding-top:24px; margin-left:auto;">
              <svg width="18" height="21" viewBox="0 0 18 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7 19H11C11 20.1 10.1 21 9 21C7.9 21 7 20.1 7 19ZM18 17V18H0V17L2 15V9C2 5.9 4 3.2 7 2.3V2C7 0.9 7.9 0 9 0C10.1 0 11 0.9 11 2V2.3C14 3.2 16 5.9 16 9V15L18 17ZM14 9C14 6.2 11.8 4 9 4C6.2 4 4 6.2 4 9V16H14V9Z" fill="white"/>
              </svg>
            </div>
          </div>
  
          <div id="container2" class="d-flex flex-column scrollable">
            <p class="currentOrPast">Current Medication</p>
            <hr>
            <div v-for="(medicine, index) in medicineData" :key="medicine.name" class="cupsaleRow">
              <v-card>
                <div style="display: flex;">
                  <!-- a capsule icon -->
                  <div style="padding-right: 17px;">
                    <div class="button-wrapper" style="background:#be108d;">
                      <svg width="39" height="39" viewBox="0 0 39 39" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M27.6947 11.5003C27.4847 12.1304 26.8073 12.4732 26.1765 12.2718C26.172 12.2705 26.1602 12.2672 26.1415 12.2626C26.1011 12.2527 26.0295 12.2372 25.9314 12.2232C25.7345 12.195 25.4366 12.174 25.0716 12.2145C24.3612 12.2935 23.3367 12.6108 22.2593 13.6883C21.7859 14.1616 21.0184 14.1616 20.5451 13.6883C20.0717 13.2149 20.0717 12.4474 20.5451 11.9741C22.0389 10.4802 23.5858 9.94046 24.8039 9.80512C25.4031 9.73854 25.9087 9.77106 26.2743 9.82328C26.4574 9.84945 26.6068 9.88075 26.7171 9.90771C26.7723 9.9212 26.8179 9.93366 26.8532 9.94391C26.8709 9.94904 26.886 9.95363 26.8985 9.95753L26.9153 9.96286L26.9222 9.9651L26.9253 9.96611L26.9267 9.96659L26.7171 9.90771L26.9281 9.96705C27.5632 10.1787 27.9064 10.8652 27.6947 11.5003Z" fill="white"/>
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M18.8309 8.5457C22.1444 5.23216 27.5167 5.23216 30.8303 8.5457C34.1438 11.8592 34.1438 17.2316 30.8303 20.5451L20.5451 30.8303C17.2315 34.1438 11.8592 34.1438 8.5457 30.8303C5.23216 27.5167 5.23216 22.1444 8.5457 18.8309L18.8309 8.5457ZM29.1161 10.2599C26.7493 7.89309 22.9119 7.89309 20.5451 10.2599L14.5454 16.2596L23.1164 24.8306L29.1161 18.8309C31.4829 16.4641 31.4829 12.6267 29.1161 10.2599ZM10.2599 20.5451L12.8312 17.9738L21.4022 26.5448L18.8309 29.1161C16.4641 31.4829 12.6267 31.4829 10.2599 29.1161C7.89309 26.7493 7.89309 22.9119 10.2599 20.5451Z" fill="white"/>
                      </svg> 
                    </div>
                  </div>
                  <!-- the detail of the capsule -->
                  <div>
                    <v-card-title>{{ medicine.name }}</v-card-title><br>
                    <v-card-subtitle class="subtitle">Next Reminder: {{ medicine.nextReminder }}</v-card-subtitle>
                  </div>
                  <!-- an arrow button -->
                  <div class="arrowButton">
                    <svg width="14" height="19" viewBox="0 0 14 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M2.76721 18.0872C2.46584 18.3142 2.08228 18.4381 1.63023 18.4381C0.72613 18.4381 0.000108744 17.9014 0.000108738 17.2202C0.000108735 16.8796 0.191889 16.57 0.506954 16.3326L10.0959 9.27316L0.506954 2.23436C0.191889 1.99698 0.000108612 1.67703 0.00010861 1.34676C0.000108604 0.66559 0.72613 0.128906 1.63023 0.128906C2.08228 0.128906 2.46584 0.252756 2.76721 0.479815L13.4247 8.32365C13.8082 8.59199 13.9863 8.92226 14 9.28349C14 9.64471 13.8082 9.95434 13.4247 10.233L2.76721 18.0872Z" fill="#A5A5A7"/>
                    </svg>
                  </div>
                </div>
              </v-card>
              <div v-if="index != medicineData.length-1">
                <hr class="short">
              </div>
              <div v-else>
                <p style="height: 20px;"></p>
              </div>
            </div>
            <hr>
            <p class="currentOrPast">Past Medication</p>
            <hr>
            <div v-for="(medicine, index) in pastMedicineData" :key="medicine.name" class="cupsaleRow">
              <v-card>
                <div style="display:flex;">
                  <div style="padding-right: 17px;">
                    <div class="button-wrapper" style="background:#48C234;">
                      <svg width="39" height="39" viewBox="0 0 39 39" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M27.6947 11.5003C27.4847 12.1304 26.8073 12.4732 26.1765 12.2718C26.172 12.2705 26.1602 12.2672 26.1415 12.2626C26.1011 12.2527 26.0295 12.2372 25.9314 12.2232C25.7345 12.195 25.4366 12.174 25.0716 12.2145C24.3612 12.2935 23.3367 12.6108 22.2593 13.6883C21.7859 14.1616 21.0184 14.1616 20.5451 13.6883C20.0717 13.2149 20.0717 12.4474 20.5451 11.9741C22.0389 10.4802 23.5858 9.94046 24.8039 9.80512C25.4031 9.73854 25.9087 9.77106 26.2743 9.82328C26.4574 9.84945 26.6068 9.88075 26.7171 9.90771C26.7723 9.9212 26.8179 9.93366 26.8532 9.94391C26.8709 9.94904 26.886 9.95363 26.8985 9.95753L26.9153 9.96286L26.9222 9.9651L26.9253 9.96611L26.9267 9.96659L26.7171 9.90771L26.9281 9.96705C27.5632 10.1787 27.9064 10.8652 27.6947 11.5003Z" fill="white"/>
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M18.8309 8.5457C22.1444 5.23216 27.5167 5.23216 30.8303 8.5457C34.1438 11.8592 34.1438 17.2316 30.8303 20.5451L20.5451 30.8303C17.2315 34.1438 11.8592 34.1438 8.5457 30.8303C5.23216 27.5167 5.23216 22.1444 8.5457 18.8309L18.8309 8.5457ZM29.1161 10.2599C26.7493 7.89309 22.9119 7.89309 20.5451 10.2599L14.5454 16.2596L23.1164 24.8306L29.1161 18.8309C31.4829 16.4641 31.4829 12.6267 29.1161 10.2599ZM10.2599 20.5451L12.8312 17.9738L21.4022 26.5448L18.8309 29.1161C16.4641 31.4829 12.6267 31.4829 10.2599 29.1161C7.89309 26.7493 7.89309 22.9119 10.2599 20.5451Z" fill="white"/>
                      </svg> 
                    </div>
                  </div>
                  <div>
                    <v-card-title>{{ medicine.name }}</v-card-title><br>
                    <v-card-subtitle class="subtitle">{{ medicine.numOfTimesTaken }} times</v-card-subtitle>
                  </div>
                  <div class="arrowButton">
                    <svg width="14" height="19" viewBox="0 0 14 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M2.76721 18.0872C2.46584 18.3142 2.08228 18.4381 1.63023 18.4381C0.72613 18.4381 0.000108744 17.9014 0.000108738 17.2202C0.000108735 16.8796 0.191889 16.57 0.506954 16.3326L10.0959 9.27316L0.506954 2.23436C0.191889 1.99698 0.000108612 1.67703 0.00010861 1.34676C0.000108604 0.66559 0.72613 0.128906 1.63023 0.128906C2.08228 0.128906 2.46584 0.252756 2.76721 0.479815L13.4247 8.32365C13.8082 8.59199 13.9863 8.92226 14 9.28349C14 9.64471 13.8082 9.95434 13.4247 10.233L2.76721 18.0872Z" fill="#A5A5A7"/>
                    </svg>
                  </div>
                </div>  
              </v-card>
              <div v-if="index != pastMedicineData.length-1">
                  <hr class="short">
                </div>
                <div v-else>
                  <p style="height: 20px;"></p>
                </div>
            </div>
            <hr>
          </div>
  
          <!-- Bottom Navigation Bar -->
          <div id="bottomNavBar">    <!-- <v-bottom-navigation :active="active" color="pink"> -->
            <ul>
              <!-- Home Icon -->
              <li>
                <svg width="50" height="39" viewBox="0 0 50 39" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <a href="/#/Home">
                    <path d="M24.9171 6.7604C24.3208 6.29063 23.3539 6.29063 22.7575 6.7604L8.57886 17.9294C7.6332 18.6743 7.14798 19.7076 7.25055 20.758L8.34523 31.9681C8.40643 32.5948 9.06986 33.0787 9.8678 33.0787H19.2561V27.0641C19.2561 25.0711 21.3072 23.4554 23.8373 23.4554C25.9932 23.4554 28.4999 24.3213 29.1943 25.8105L24.9171 6.7604Z" fill="#949596"/>
                    <path d="M28.4185 33.0787H37.8068C38.6048 33.0787 39.2682 32.5948 39.3294 31.9681L30.7092 29.4698L28.4185 33.0787Z" fill="#949596"/>
                    <path d="M29.1943 25.8105L29.3808 26.6412C29.3808 26.3464 29.3149 26.069 29.1943 25.8105Z" fill="#949596"/>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M27.0767 5.05921C25.2876 3.6499 22.387 3.6499 20.5979 5.05921L6.41926 16.2282C4.84316 17.4698 4.03446 19.1918 4.20542 20.9425L5.3001 32.1526C5.4837 34.0328 7.47396 35.4846 9.8678 35.4846H19.2561C20.9429 35.4846 22.3102 34.4075 22.3102 33.0787V27.0641C22.3102 26.3998 22.9939 25.8612 23.8373 25.8612C24.6807 25.8612 25.3644 26.3998 25.3644 27.0641V33.0787C25.3644 34.4075 26.7318 35.4846 28.4185 35.4846H37.8068C40.2007 35.4846 42.1909 34.0328 42.3745 32.1526L43.4692 20.9425C43.6402 19.1918 42.8315 17.4698 41.2554 16.2282L27.0767 5.05921ZM22.7575 6.7604C23.3539 6.29063 24.3208 6.29063 24.9171 6.7604L29.1943 25.8105C29.3149 26.069 29.3808 26.3464 29.3808 26.6412L30.7092 29.4698L39.3294 31.9681C39.2682 32.5948 38.6048 33.0787 37.8068 33.0787H28.4185L30.7092 29.4698L29.3808 26.6412L29.1943 25.8105C28.4999 24.3213 25.9932 23.4554 23.8373 23.4554C21.3072 23.4554 19.2561 25.0711 19.2561 27.0641V33.0787H9.8678C9.06986 33.0787 8.40643 32.5948 8.34523 31.9681L7.25055 20.758C7.14798 19.7076 7.6332 18.6743 8.57886 17.9294L22.7575 6.7604Z" fill="#949596"/>
                  </a>
                </svg> 
                <p class="tabBarItem">Home</p>
              </li>
              <!-- NOTE: Alternative
                <v-btn>
                  <v-icon>mdi-home</v-icon>
                  Home
                </v-btn>
              -->
  
              <!-- Calender Icon -->
              <li>
                <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <a href="/#/Calender">
                    <path d="M7.47692 16.6154C7.17104 16.6154 6.92308 16.8633 6.92308 17.1692V21.6C6.92308 21.9059 7.17104 22.1538 7.47692 22.1538H11.9077C12.2136 22.1538 12.4615 21.9059 12.4615 21.6V17.1692C12.4615 16.8633 12.2136 16.6154 11.9077 16.6154H7.47692Z" fill="#949596"/>
                    <path d="M6.92308 25.4769C6.92308 25.171 7.17104 24.9231 7.47692 24.9231H11.9077C12.2136 24.9231 12.4615 25.171 12.4615 25.4769V29.9077C12.4615 30.2136 12.2136 30.4615 11.9077 30.4615H7.47692C7.17104 30.4615 6.92308 30.2136 6.92308 29.9077V25.4769Z" fill="#949596"/>
                    <path d="M15.7846 16.6154C15.4787 16.6154 15.2308 16.8633 15.2308 17.1692V21.6C15.2308 21.9059 15.4787 22.1538 15.7846 22.1538H20.2154C20.5213 22.1538 20.7692 21.9059 20.7692 21.6V17.1692C20.7692 16.8633 20.5213 16.6154 20.2154 16.6154H15.7846Z" fill="#949596"/>
                    <path d="M15.2308 25.4769C15.2308 25.171 15.4787 24.9231 15.7846 24.9231H20.2154C20.5213 24.9231 20.7692 25.171 20.7692 25.4769V29.9077C20.7692 30.2136 20.5213 30.4615 20.2154 30.4615H15.7846C15.4787 30.4615 15.2308 30.2136 15.2308 29.9077V25.4769Z" fill="#949596"/>
                    <path d="M24.0923 16.6154C23.7864 16.6154 23.5385 16.8633 23.5385 17.1692V21.6C23.5385 21.9059 23.7864 22.1538 24.0923 22.1538H28.5231C28.829 22.1538 29.0769 21.9059 29.0769 21.6V17.1692C29.0769 16.8633 28.829 16.6154 28.5231 16.6154H24.0923Z" fill="#949596"/>
                    <path d="M23.5385 25.4769C23.5385 25.171 23.7864 24.9231 24.0923 24.9231H28.5231C28.829 24.9231 29.0769 25.171 29.0769 25.4769V29.9077C29.0769 30.2136 28.829 30.4615 28.5231 30.4615H24.0923C23.7864 30.4615 23.5385 30.2136 23.5385 29.9077V25.4769Z" fill="#949596"/>
                    <path d="M8.30769 11.0769C7.54299 11.0769 6.92308 11.6968 6.92308 12.4615C6.92308 13.2262 7.54299 13.8462 8.30769 13.8462H27.6923C28.457 13.8462 29.0769 13.2262 29.0769 12.4615C29.0769 11.6968 28.457 11.0769 27.6923 11.0769H8.30769Z" fill="#949596"/>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M24.9231 4.15385H11.0769V1.38462C11.0769 0.619913 10.457 0 9.69231 0C8.92761 0 8.30769 0.619913 8.30769 1.38462V4.15385H4.15385C1.85974 4.15385 0 6.01359 0 8.30769V31.8462C0 34.1403 1.85974 36 4.15385 36H31.8462C34.1403 36 36 34.1403 36 31.8462V8.30769C36 6.01359 34.1403 4.15385 31.8462 4.15385H27.6923V1.38462C27.6923 0.619913 27.0724 0 26.3077 0C25.543 0 24.9231 0.619913 24.9231 1.38462V4.15385ZM9.69231 8.30769C8.92761 8.30769 8.30769 7.68778 8.30769 6.92308H4.15385C3.38914 6.92308 2.76923 7.54299 2.76923 8.30769V31.8462C2.76923 32.6109 3.38914 33.2308 4.15385 33.2308H31.8462C32.6109 33.2308 33.2308 32.6109 33.2308 31.8462V8.30769C33.2308 7.54299 32.6109 6.92308 31.8462 6.92308H27.6923C27.6923 7.68778 27.0724 8.30769 26.3077 8.30769C25.543 8.30769 24.9231 7.68778 24.9231 6.92308H11.0769C11.0769 7.68778 10.457 8.30769 9.69231 8.30769Z" fill="#949596"/>
                  </a>
                </svg>
                <p class="tabBarItem">Calender</p>
              </li>
  
              <!-- Plus Button -->
              <li>
                <div class="button-wrapper" id="plusIcon" @click="addMedicine">
                  <Plus color="#FFF" style="width: 3em; height: 3em;" />
                </div>
              </li>
  
              <!-- My meds Icon -->
              <li>
                <svg width="42" height="36" viewBox="0 0 42 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <a href="/#/MyMeds">
                    <path d="M8.07692 13.8462C8.96908 13.8462 9.69231 14.4661 9.69231 15.2308V29.0769C9.69231 29.8416 8.96908 30.4615 8.07692 30.4615C7.18477 30.4615 6.46154 29.8416 6.46154 29.0769V22.1538V15.2308C6.46154 14.4661 7.18477 13.8462 8.07692 13.8462Z" fill="#1890FF"/>
                    <path d="M35.5385 15.2308C35.5385 14.4661 34.8152 13.8462 33.9231 13.8462C33.0309 13.8462 32.3077 14.4661 32.3077 15.2308V29.0769C32.3077 29.8416 33.0309 30.4615 33.9231 30.4615C34.8152 30.4615 35.5385 29.8416 35.5385 29.0769V15.2308Z" fill="#1890FF"/>
                    <path d="M21 16.6154C21.8922 16.6154 22.6154 17.2353 22.6154 18V20.7692H25.8462C26.7383 20.7692 27.4615 21.3891 27.4615 22.1538C27.4615 22.9185 26.7383 23.5385 25.8462 23.5385H22.6154V26.3077C22.6154 27.0724 21.8922 27.6923 21 27.6923C20.1078 27.6923 19.3846 27.0724 19.3846 26.3077V23.5385H16.1538C15.2617 23.5385 14.5385 22.9185 14.5385 22.1538C14.5385 21.3891 15.2617 20.7692 16.1538 20.7692H19.3846V18C19.3846 17.2353 20.1078 16.6154 21 16.6154Z" fill="#1890FF"/>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M4.84615 8.30769C2.1697 8.30769 0 10.1674 0 12.4615V31.8462C0 34.1403 2.1697 36 4.84615 36H37.1538C39.8303 36 42 34.1403 42 31.8462V12.4615C42 10.1674 39.8303 8.30769 37.1538 8.30769V6.92308C37.1538 6.15838 36.4306 5.53846 35.5385 5.53846H32.3077C31.8793 5.53846 31.4684 5.68434 31.1654 5.94401C30.8625 6.20367 30.6923 6.55585 30.6923 6.92308V8.30769H27.4615V4.15385C27.4615 1.85974 25.2918 0 22.6154 0H19.3846C16.7082 0 14.5385 1.85974 14.5385 4.15385V8.30769H11.3077V6.92308C11.3077 6.15838 10.5845 5.53846 9.69231 5.53846H6.46154C6.03311 5.53846 5.62223 5.68434 5.31929 5.94401C5.01635 6.20367 4.84615 6.55585 4.84615 6.92308V8.30769ZM17.7692 4.15385C17.7692 3.38914 18.4925 2.76923 19.3846 2.76923H22.6154C23.5075 2.76923 24.2308 3.38914 24.2308 4.15385V8.30769H17.7692V4.15385ZM4.84615 11.0769C3.954 11.0769 3.23077 11.6968 3.23077 12.4615V31.8462C3.23077 32.6109 3.954 33.2308 4.84615 33.2308H37.1538C38.046 33.2308 38.7692 32.6109 38.7692 31.8462V12.4615C38.7692 11.6968 38.046 11.0769 37.1538 11.0769H4.84615Z" fill="#1890FF"/>
                  </a>
                </svg>
                <p class="tabBarItem" style="color:#178ffe">My meds</p> <!-- 'style' needs to be updated -->
              </li>
  
              <!-- Rewards Icon -->
              <li>
                <svg width="48" height="36" viewBox="0 0 48 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <a href="/#/Rewards">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M40 0C40.6429 0 41.2466 0.213952 41.6225 0.575016C41.9984 0.936081 42.1007 1.40023 41.8974 1.82247L39.7208 6.34312C39.3741 7.06309 38.8679 7.72338 38.2347 8.30769H46C47.1046 8.30769 48 8.92761 48 9.69231V15.2308C48 15.9955 47.1046 16.6154 46 16.6154H44V34.6154C44 35.3801 43.1046 36 42 36H6C4.89543 36 4 35.3801 4 34.6154V16.6154H2C0.895432 16.6154 0 15.9955 0 15.2308V9.69231C0 8.92761 0.895432 8.30769 2 8.30769H9.76529C9.13216 7.72339 8.62592 7.0631 8.27927 6.34314L6.10263 1.82247C5.89933 1.40024 6.00161 0.936083 6.37751 0.575018C6.75342 0.213953 7.35711 0 8 0H16.0001C19.2712 0 22.1756 1.08739 24 2.76854C25.8245 1.08739 28.7288 0 32 0H40ZM22 11.0769H4V13.8462H22V11.0769ZM26 11.0769H44V13.8462H26V11.0769ZM26 16.6154H40V33.2308H26V16.6154ZM22 33.2308H8V16.6154H22V33.2308ZM26 6.90907C26.0109 4.62141 28.693 2.76923 32 2.76923H37.2251L35.926 5.46741C35.1093 7.1636 32.8165 8.30769 30.2339 8.30769H26L26 6.90907ZM12.074 5.46742C12.8907 7.1636 15.1835 8.30769 17.7661 8.30769H22L22 6.90907C21.9891 4.62141 19.307 2.76923 16.0001 2.76923H10.7749L12.074 5.46742Z" fill="#949596"/>
                  </a>
                  </svg>
                <p class="tabBarItem">Rewards</p>
              </li>
            </ul>
          <!-- </v-bottom-navigation> -->
          </div> 
          </v-flex>
        </v-layout>
      </v-container>
  </template>
    
  <script setup>
    import { ref } from 'vue';
    import { Plus } from '@element-plus/icons-vue';
    import '@mdi/font/css/materialdesignicons.css';
    
    // Sample data for the current medicine cards
    const medicineData = ref([
        { name: 'Ibuprofen', nextReminder: 'Today: 10:00 AM', bgc: '#860fbe'},
        { name: 'Furosemide', nextReminder: 'Tomorrow: 8:00 AM', bgc: '#24a4ca'}
    ]);
    
    // Sample data for the past medicine cards
    const pastMedicineData = ref([
        { name: 'Acetaminophen', numOfTimesTaken: '10/10', bgc: '#be108d'},
        { name: 'Furosemide', numOfTimesTaken: '8/8', bgc: '#47c233'},
        { name: 'Methotrexate', numOfTimesTaken: '15/15', bgc: '#3b24ca'}
    ]);
    
    const addMedicine = () => {
        const newMedicine = {
        name: 'New Medicine',
        nextReminder: 'Tomorrow: 9:00 AM',
        bgc: '#860fbe'
        };
        medicineData.value.push(newMedicine);
    };
    
    //const menuItems = ref([
        //{ name: 'MyProfile', url: '/MyProfile' },
        //{ name: 'Message', url: '/Message' },
        //{ name: 'Community', url: '/Community' },
        //{ name: 'Education', url: '/Education' },
        //{ name: 'About', url: '/About' },
        //{ name: 'Logout', url: '/Logout' },
    //]);
  </script>
    
  <script>
    // eslint-disable-next-line no-unused-vars
    export default {
        data() {
        return {
            drawer: false
        }
        },
        mounted() {
        document.title = 'Mymeds | AthriCare';
        }
    };
  </script>
  
  
  <style scoped>
    .container{
        display: flex;
        align-items: center;
        /*height: 100vh;*/
        background-color: #ff0000;
        overflow: auto;
        flex-direction: column;
        margin: 0 auto;
        min-width: 100vh;
    }
    #container2{
        margin-left: 100%;
        margin-right: 100%;
        margin: 0 auto;
        justify-content: bottom;
        align-items: center;
        background-color: rgb(253, 253, 253);
        position: relative;
        height: 1100px;
        flex-direction: column;
        display: inline-block;
        padding-bottom: 100px;
    }
    hr{
        width: 100%;
    }
    hr.short{
        margin-right: 0px;
        margin-top: 20px;
    }
    ul{
        width: 100%;
        margin: auto;
        display: flex;
        justify-content: space-between;
        padding: 0;
        list-style: none;
    }
    ul>li{
        padding-top: 13px;
        width: fit-content;
        margin: auto;
        align-items: center;
        justify-content: center;
    }
    .subtitle {
        color: darkgray;
        font-size: 11px;
    }
    .button-wrapper{
        display: flex;
        align-items: center;
        justify-content: center;
        width: 50px;
        height: 50px;
        background: #178ffe;
        color: #fff;
        border-radius: 50%;
        opacity: 1;
        transition: opacity 0.3s ease-in-out;
    }
    #plusIcon{
        box-shadow: 0px 4px 4px 0px rgba(0,0,0,.25) inset;
    }
    .button-wrapper:hover{
        opacity: 0.5;
    }  
    .button-wrapper:hover Plus{
        opacity: 1;
    }
    ul{
        display: flex;
        list-style: none;
    }
    li{
        text-align: center;
    }
    .scrollable{
        overflow-y: auto;
        max-height: 700px; /* Adjust the max-height to your preference */
    }
    #title{
        font-size: 22px;
        position: relative;
        color: #FFFFFF;
        margin: 5px;
        padding-top: 15px;
        padding-bottom: 15px;
        width: 150px;
        text-align: center;
    }
    p.currentOrPast{
        font-style: normal;
        font-size: 15px;
        margin-top: 9px;
        margin-bottom: 9px;
        width: 157px;
        text-align: left;
        margin-left: -155px;
    }
    .cupsaleRow{
        width: 354px; 
        margin-left: 56px; 
        margin-right: 20px; 
        margin-top: 20px;
    }
    .arrowButton{
        font-size: 30px;
        margin-left: auto;
    }
    #bottomNavBar{
        background-color: #ffffff;
        box-shadow: 0px 4px 4px 0px rgba(0,0,0,.05) inset;
        display: flex;
        align-items: center;
        height: 78px;
        text-align: center;
    }
    .tabBarItem{
        text-align: center;
        font-size: 12px;
        color: #949596;
        width: 81px;
        margin-top: -7px;
    }
    v-img{
        align-items: flex-start;
        border-radius: 20px;
        display: flex;
        height: 40px;
        width: 40px;
        margin-left: 10px;
        margin-right: 17px;
    }
    v-card-title{
        font-size: 12px;
    }
    v-layout{
        background-color: #1890FF;
        height: auto;
    }
  </style>
  
  