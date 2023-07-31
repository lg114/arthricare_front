<template>
  <div class="menu">
    <div class="selected-option" @click="toggleOptions">
      {{ selectedItem ? selectedItem.title : 'Select an option' }}
    </div>
    <ul v-if="showOptions" class="options">
      <li v-for="item in menuItems" :key="item.id" @click="handleItemClick(item)">
        <i class="fas fa-circle"></i> {{ item.title }}
      </li>
    </ul>
  </div>
</template>

<style>
.menu {
  position: relative;
  display: inline-block;
}

.selected-option {
  width: 200px;
  padding: 10px;
  background-color: #f4f4f4;
  border-radius: 5px;
  cursor: pointer;
}

.options {
  position: absolute;
  top: 100%;
  left: 0;
  width: 200px;
  padding: 0;
  margin-top: 5px;
  list-style: none;
  background-color: #f4f4f4;
  border-radius: 5px;
}

.options li {
  padding: 10px;
  cursor: pointer;
  transition: background-color 0.3s;
  display: flex;
  align-items: center;
}

.options li i {
  margin-right: 5px;
}

.options li:hover {
  background-color: #e0e0e0;
}
</style>

<script>
export default {
  data() {
    return {
      menuItems: [
        { id: 1, title: 'Option 1' },
        { id: 2, title: 'Option 2' },
        { id: 3, title: 'Option 3' },
        // Add more options as needed
      ],
      selectedItem: null,
      showOptions: false,
    };
  },
  methods: {
    handleItemClick(item) {
      this.selectedItem = item;
      this.showOptions = false;
    },
    toggleOptions() {
      this.showOptions = !this.showOptions;
    },
  },
};
</script>