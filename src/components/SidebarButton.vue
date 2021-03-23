.<template>
  <div id="sidebar-button-wrap">
    <router-link class="sidebar-button" :to="page" :key="name">
      <i>
        <i class="fas fa-tachometer-alt"></i>
      </i>
      <span>{{ name }}</span>
    </router-link>
    <router-link
      v-for="page in subpages"
      class="sidebar-sub-button"
      :to="page.page"
      :key="page.name"
    >
      <span class="sub-button-text">{{ page.name }}</span>
    </router-link>
  </div>
</template>

<script>
export default {
  name: "SidebarButton",
  props: ["name", "page", "subpages"],
  data: function () {
    return {
 
    };
  },
  methods: {},
};
</script>


<style scoped>
#sidebar-button-wrap {
  display: flex;
  flex-direction: column;
  margin-bottom: 5px;

  list-style: none;

  cursor: pointer;
}

.sidebar-button:hover {
  background-color: rgb(3, 149, 144);
  color: white;
}

.sidebar-button:hover * {
  color: white;
}
.sidebar-sub-button {
  padding-left: 32px;
}
.sub-button-text:hover {
  color: white !important;
}

.sub-button-text {
  padding: 10px;
  color: #aeb2b7;
  transition: color 1000ms linear;
}
.sidebar-button {
  color: #aeb2b7;
  flex-grow: 1;
  padding: 10px;
  transition: background-color 1000ms linear;
}

.sidebar-button > a {
  max-width: 32px;
}

a > span {
  display: inline-block;

  font-family: "Ruda", sans-serif;
}
i {
  display: inline-block;
  max-width: 16px;
  margin-right: 10px;
}

.router-link-exact-active {
  background-color: rgb(3, 149, 144);
  color: white;
}
.router-link-exact-active > .sub-button-text {
  color: white;
  background-color: unset !important;
}
</style>
