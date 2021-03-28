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
      <button
        type="button"
        class="save"
        :class="{ saved: saved }"
        @click="saveList"
      >
        Save
      </button>
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
      saved: false,
      active: true,
      list: "example.com",
      icons: {
        active: "images/48-on.png",
        inactive: "images/48-off.png",
      },
    };
  },
  methods: {
    setActive(active) {
      this.active = active;
      chrome.storage.sync.set(
        {
          toggleSitesActive: active,
        },
        () => {
          chrome.browserAction.setIcon({
            path: this.icons[active ? "active" : "inactive"],
          });
        }
      );
    },
    saveList() {
      chrome.storage.sync.set({ toggleSitesList: this.list }, () => {});
      this.saved = true;
      setTimeout(() => {
        this.saved = false;
      }, 1000);
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
  transition: all 0.2s ease;
  font-family: Arial, Helvetica, sans-serif;
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
  color: #e1e1e1;
  font-weight: bold;
  background: #1e1e1e;
  border-color: transparent;
}
textarea,
textarea:focus,
textarea:active {
  border-radius: 0;
  -webkit-border-radius: 0;
  -webkit-appearance: none;
}
textarea:focus {
  color: #1e1e1e;
  background: transparent;
  border: 1px solid #1e1e1e;
}
::placeholder {
  color: #808080;
}
hr {
  border: 0;
  width: 100%;
  height: 1px;
  margin: 1em 0 1em 0;
  background: #808080;
}
button,
button:focus,
button:active {
  padding: 1em;
  outline: none;
  cursor: pointer;
  border-radius: 50px;
}
.saved {
  color: lightgreen !important;
  background: green !important;
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
