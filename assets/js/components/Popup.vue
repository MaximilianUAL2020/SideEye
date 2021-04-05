l<template>
  <div class="main-wrapper">
    <!-- logo -->
    <div class="flex filled">
      <span>Hello</span>
    </div>
    <!-- instructions -->
    <div class="flex outline">
      <span>One line per site</span>
    </div>
    <!-- textarea -->
    <div class="outline" id="no-border">
      <textarea
        v-model="list"
        autocorrect="off"
        autocomplete="off"
        spellcheck="false"
        autocapitalize="off"
        placeholder="example.com"
      ></textarea>
    </div>
    <!-- save -->
    <div class="flex filled">
      <button type="button" class="save" @click="saveList">Save</button>
    </div>
    <!-- toggle -->
    <div class="switch">
      <input
        id="my-switch"
        type="checkbox"
        class="switch-checkbox"
        @click="toggleActive"
        v-model="active"
      />
      <label class="switch-label" for="my-switch"></label>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: false,
      list: "example.com",
      icons: {
        active: "images/48-on.png",
        inactive: "images/48-off.png",
      },
    };
  },
  methods: {
    toggleActive() {
      this.active = !this.active;
      chrome.storage.sync.set(
        {
          toggleSitesActive: this.active,
        },
        () => {
          chrome.browserAction.setIcon({
            path: this.icons[this.active ? "active" : "inactive"],
          });
        }
      );
    },
    saveList() {
      chrome.storage.sync.set(
        { toggleSitesList: this.list.toLowerCase() },
        () => {}
      );
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
.main-wrapper {
  gap: 1em;
  width: 100%;
  height: 100%;
  padding: 1em;
  display: grid;
  background-color: var(--dark-grey);
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: var(--master-height) auto auto auto var(--master-height) var(
      --master-height
    );
  grid-template-areas:
    "logo instructions instructions"
    "input input input"
    "input input input"
    "input input input"
    "save save save"
    "toggle toggle toggle";
}
.flex {
  display: flex;
  align-items: center;
  justify-content: center;
}
.outline {
  background: transparent;
  color: var(--light-grey);
  border: 1px solid var(--light-grey);
}
.filled {
  border: none;
  color: var(--dark-grey);
  background: var(--light-grey);
}
.main-wrapper div {
  width: 100%;
  height: 100%;
}
.main-wrapper div:nth-of-type(1) {
  grid-area: logo;
  border-radius: 100px;
}
.main-wrapper div:nth-of-type(2) {
  border-radius: 100px;
  grid-area: instructions;
}
.main-wrapper div:nth-of-type(3) {
  grid-area: input;
  border-radius: 20px;
}
.main-wrapper div:nth-of-type(4) {
  grid-area: save;
  border-radius: 100px;
}
.main-wrapper div:nth-of-type(5) {
  border: none;
  grid-area: toggle;
  position: relative;
}
#no-border {
  border: none !important;
}
textarea {
  width: 100%;
  height: 100%;
  padding: 1em;
  resize: none;
  outline: none;
  background: transparent;
  color: var(--light-grey);
  border-radius: 20px;
  -webkit-border-radius: 20px;
  border-color: var(--light-grey);
  transition: border-color 0.2s, color 0.2s;
}
textarea:focus {
  color: var(--medium-grey);
  border-color: var(--medium-grey);
}
::placeholder {
  color: var(--medium-grey);
}
button,
button:focus,
button:active {
  width: 100%;
  height: 100%;
  border: none;
  outline: none;
  cursor: pointer;
  border-radius: inherit;
  background-color: transparent;
  transition: all 0.2s;
}
button:hover {
  cursor: pointer;
  color: var(--light-grey);
  background: var(--dark-grey);
  border: 1px solid var(--light-grey);
  transition: all 0.2s;
}
.switch-checkbox {
  opacity: 0;
  position: absolute;
  pointer-events: none;
}
.switch-label {
  padding: 0;
  display: block;
  cursor: pointer;
  overflow: hidden;
  height: var(--master-height);
  line-height: var(--master-height);
  border-radius: var(--master-height);
  border: 1px solid var(--light-grey);
  transition: all 0.2s;
}
.switch-label:before {
  bottom: 0;
  margin: 0px;
  content: "";
  display: block;
  position: absolute;
  border-radius: 100px;
  top: var(--myPadding);
  right: var(--button-end);
  width: var(--button-height);
  height: var(--button-height);
  background: var(--light-grey);
  transition: all 0.2s;
}
.switch-checkbox:checked + .switch-label {
  background: var(--light-grey);
}
.switch-checkbox:checked + .switch-label:before {
  right: var(--myPadding);
  background: var(--dark-grey);
}
</style>
