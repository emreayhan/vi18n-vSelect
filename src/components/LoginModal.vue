<template>
  <b-modal ref="loginModal" title="Login" hide-footer @hidden="hide">
    <template #modal-header>
      <div class="w-100 h-25 d-flex flex-column">
        <div class="w-100 d-flex justify-content-end align-items-center">
          <v-select
            class="ml-2"
            :clearable="false"
            label="text"
            :options="countryOptions"
            @input="handleChangeOption"
            :value="language"
          >
          </v-select>
        </div>
        <h3>{{ $t("message.login") }}</h3>
      </div>
    </template>
    <b-form-group :label="$t('message.username')">
      <b-form-input
        v-model="user.name"
        name="newRole"
        placeholder="Kullanıcı Adı"
        maxlength="20"
        inline
      />
      <b-form-text class="text-muted">
        {{ $t("message.maxChar", { max: "20" }) }}
      </b-form-text>
    </b-form-group>
    <b-form-group :label="$t('message.password')">
      <b-form-input
        v-model="user.password"
        name="newRole"
        placeholder="Şifre"
        maxlength="8"
        inline
        type="password"
      />
      <b-form-text class="text-muted">
        {{ $t("message.maxChar", { max: "8" }) }}
      </b-form-text>
    </b-form-group>
    <b-form-group :label="$t('message.email')">
      <b-form-input
        v-model="user.email"
        name="newRole"
        placeholder="test@test.com"
        maxlength="100"
        inline
      />
    </b-form-group>

    <template>
      <div class="w-100 d-flex flex-column footer">
        <div class="w-100 d-flex justify-content-center align-items-baseline">
          <template>
            <b-button class="mr-2" variant="outline-secondary" @click="hide">
              {{ $t("message.cancel") }}
            </b-button>
            <b-button
              icon="save"
              variant="primary"
              @click="handleLogin"
              :disabled="!user.name || !user.email || !user.password"
            >
              {{ $t("message.login") }}
            </b-button>
          </template>
        </div>
      </div>
    </template>
  </b-modal>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "Login",

  data: () => ({
    user: {
      name: null,
      email: null,
      password: null
    },
    language: null
  }),

  created() {
    this.language = localStorage.getItem("lang");
  },

  computed: {
    countryOptions() {
      const options = [
        { value: "tr", text: "TR" },
        { value: "en", text: "EN" }
      ];
      return options;
    }
  },

  methods: {
    ...mapActions(["login", "setLocalLanguage"]),
    show() {
      this.$refs.loginModal.show();
    },
    hide() {
      this.$refs.loginModal.hide();
    },
    async handleLogin() {
      await this.login(this.user);
      await this.hide();
      await this.$bvToast.toast("Kullanıcı Girişi Başarılı", {
        title: "Bilgilendirme",
        variant: "success",
        solid: true,
        autoHideDelay: 10
      });
      console.log(this.user);
    },
    handleChangeOption(value) {
      localStorage.setItem("lang", value.value);
      window.location.reload();
      console.log("value: ", value);
    }
  }
};
</script>

<style scoped></style>
