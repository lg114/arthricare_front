const state = {
  takeMedNum: 0,
  alreadyTakeMedNum:0,
  puzzleNum:0,
  addPuzzleNum:0
};

const mutations = {
  setTakeMedNum(state, newValue) {
    state.takeMedNum = newValue;
  },
  setAlreadyTakeMedNum(state, newValue) {
    state.alreadyTakeMedNum = newValue;
  },
  addAlreadyTakeMedNum(state){
    state.alreadyTakeMedNum++;
  },
  setPuzzleNum(state, newValue) {
    state.puzzleNum = newValue;
  },
  addPuzzleNum(state) {
    state.puzzleNum++;
    state.addPuzzleNum++;
  },
  resetAddPuzzleNum(state){
    state.addPuzzleNum = 0;
  }
};

const getters = {
    takeMedNum: (state) => state.takeMedNum,
    alreadyTakeMedNum: (state) => state.alreadyTakeMedNum,
    puzzleNum: (state) => state.puzzleNum,
    addPuzzleNum: (state) => state.addPuzzleNum,
};

export default {
  namespaced: true,
  state,
  mutations,
  getters,
};