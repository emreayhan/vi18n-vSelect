<template>
  <div class="nav_wrapper">
    <b-navbar toggleable="lg" class="navbar-horizantal">
      <b-navbar-brand class="navbar-brand">
        <img src="../assets/scorp.svg" class="img-icon" />
        <span class="current-page">{{ currentPage }}</span>
      </b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" class="collapse" is-nav>
        <b-navbar-nav class="ml-auto">
          <b-nav-form class="ml-auto">
            <router-link to="/">
              <li class="nav-item">
                <a> {{ $t("message.homeLink") }}</a>
              </li>
            </router-link>
            <router-link to="/contact">
              <li class="nav-item">
                <a> {{ $t("message.contactUsLink") }}</a>
              </li>
            </router-link>
            <router-link to="/" v-if="!user">
              <li class="nav-item">
                <a @click="handleLoginModal"> {{ $t("message.login") }}</a>
              </li>
            </router-link>
            <b-dropdown
              v-if="user"
              size="lg"
              variant="link"
              toggle-class="text-decoration-none"
              no-caret
            >
              <template #button-content>
                {{ user.name }}
              </template>
              <b-dropdown-item href="#">{{ user.email }}</b-dropdown-item>
              <b-dropdown-item href="#" @click="handleLogOut('logout')">
                {{ $t("message.logout") }}</b-dropdown-item
              >
            </b-dropdown>
            <v-select
              class="ml-2"
              :clearable="false"
              label="text"
              :options="countryOptions"
              @input="handleChangeOption"
              :value="language"
            >
            </v-select>
          </b-nav-form>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>

    <LoginModal ref="loginModal"></LoginModal>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import LoginModal from "@/components/LoginModal.vue";
import router from "@/router";
export default {
  data: () => ({
    language: null
  }),

  components: {
    LoginModal
  },

  created() {
    this.language = localStorage.getItem("lang");
  },

  computed: {
    ...mapState(["user", "localLanguage"]),
    currentPage() {
      const { path } = this.$route;
      switch (path) {
        case "/contact":
          return "Contact Us";
        case "/":
          return "";
        default:
          break;
      }
      return path;
    },
    countryOptions() {
      const options = [
        { value: "tr", text: "TR" },
        { value: "en", text: "EN" }
      ];
      return options;
    }
  },

  methods: {
    ...mapActions(["logout"]),
    async handleLogOut() {
      await this.logout();
      await this.$bvToast.toast("Kullanıcı Çıkışı", {
        title: "Bilgilendirme",
        variant: "info",
        solid: true,
        autoHideDelay: 10
      });
    },

    async handleContact() {
      router.push({ name: "Contact" });
    },

    handleLoginModal() {
      this.$refs.loginModal.show();
    },

    handleChangeOption(value) {
      localStorage.setItem("lang", value.value);
      window.location.reload();
    }
  }
};
</script>

<style scoped>
.nav_wrapper {
  background: #ffede1;
  padding: 20px;
}

.current-page {
  position: relative;
  left: 12px;
  font-size: 14px;
}

.language_selection {
  width: 130px;
}

.navbar-horizantal {
  max-width: 1090px;
  margin: 0 auto;
}

li a {
  color: #0e1c36;
  text-decoration: none;
  font-size: 16px;
  margin-left: 5px;
  transition: all 0.2s;
}
li a:hover {
  color: #594157;
}

@media only screen and (max-width: 600px) {
  .nav-item {
    margin-top: 2px;
    margin-left: 5px;
  }

  .img-icon {
    height: 100px;
    width: 100px;
  }

  .navbar-brand {
    margin-top: -25px;
    margin-bottom: -20px;
  }
}
</style>
