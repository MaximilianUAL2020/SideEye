<template>
  <div class="wrapper">
    <div class="block-list">
      <h1>One line per site:</h1>
      <textarea
        rows="10"
        v-model="list"
        autocorrect="off"
        autocomplete="off"
        spellcheck="false"
        autocapitalize="off"
        placeholder="example.com"
      ></textarea>
      <button type="button" class="save" @click="saveList">Save</button>
    </div>
    <hr />
    <div class="buttons">
      <button
        type="button"
        @click="setActive(false)"
        :class="{ 'is-active': !active }"
      >
        Off
      </button>
      <button
        type="button"
        @click="setActive(true)"
        :class="{ 'is-active': active }"
      >
        On
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: true,
      list: "example.com",
    };
  },
  methods: {
    setActive(active) {
      this.active = active;
      chrome.storage.sync.set(
        {
          toggleSitesActive: active,
        },
        () => {}
      );
    },
    saveList() {
      chrome.storage.sync.set({ toggleSitesList: this.list }, () => {});
    },
  },
  created() {
    chrome.storage.sync.get(
      ["toggleSitesActive", "toggleSitesList"],
      (result) => {
        this.active = result.toggleSitesActive;
        this.list = result.toggleSitesList;
      }
    );
  },
};
</script>

<style scoped>
* {
  font-size: 12px;
  box-sizing: border-box;
  font-family: Arial, Helvetica, sans-serif;
}
body {
  width: 200px;
  color: #1e1e1e;
  background: #e1e1e1;
}
h1 {
  margin: 0;
  padding: 0;
}
.wrapper {
  gap: 1em;
  width: 100%;
  padding: 1em;
  display: flex;
  flex-direction: column;
}
.block-list {
  gap: 2em;
  width: 100%;
  display: flex;
  flex-direction: column;
  /* border: 1px solid green; */
}
.buttons {
  gap: 1em;
  width: 100%;
  display: flex;
  flex-direction: row;
}
button {
  width: 100%;
  padding: 1em;
}
textarea {
  width: 100%;
  resize: none;
  outline: none;
  padding: 1em;
  background: transparent;
  border-color: transparent;
  border: 1px solid #1e1e1e;
}
textarea,
textarea:focus,
textarea:active {
  border-radius: 0;
  -webkit-border-radius: 0;
  -webkit-appearance: none;
}
::placeholder {
  color: #808080;
}
hr {
  border: 0;
  width: 100%;
  height: 1px;
  background: #808080;
  margin: 1em 0 1em 0;
}
button,
button:focus,
button:active {
  padding: 1em;
  outline: none;
  cursor: pointer;
  border-radius: 50px;
}
.save {
  border: none;
  color: #e1e1e1;
  background: #1e1e1e;
}
.save:hover {
  border: none;
  color: #1e1e1e;
  background: #808080;
}
.buttons button {
  color: #1e1e1e;
  background: transparent;
  border: 1px solid #1e1e1e;
}
.is-active {
  color: #e1e1e1 !important;
  background: #1e1e1e !important;
  border: 1px solid #1e1e1e !important;
}
</style>
