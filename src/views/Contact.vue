<template>
  <div class="mb-5">
    <h2 class="form-title">{{ $t("message.contactUsLink") }}</h2>
    <b-form @submit.prevent class="form-wrapper">
      <b-form-group :label="$t('message.username')" class="form-label">
        <b-form-input
          v-model="form.username"
          type="text"
          v-validate="{ max: 12, required: true }"
          name="username"
          data-vv-as="username"
          :state="form.username !== null ? !veeErrors.has('username') : null"
        />
      </b-form-group>
      <b-form-group :label="$t('message.email')" class="form-label">
        <b-form-input
          v-model="form.email"
          type="email"
          v-validate="'required|email'"
          name="email"
          data-vv-as="email"
          :state="form.email !== null ? !veeErrors.has('email') : null"
        />
      </b-form-group>
      <b-form-group :label="$t('message.phoneNumber')" class="form-label">
        <b-form-input
          v-model="form.phoneNumber"
          type="text"
          v-validate="'required|numeric'"
          name="phoneNumber"
          data-vv-as="phoneNumber"
          :state="
            form.phoneNumber !== null ? !veeErrors.has('phoneNumber') : null
          "
        />
      </b-form-group>
      <b-form-group :label="$t('message.country')" class="form-label">
        <v-select
          label="text"
          :options="countryOptions"
          v-model="form.country"
        ></v-select>
      </b-form-group>
      <b-form-group :label="$t('message.text')" class="form-label">
        <b-form-textarea
          v-model="form.text"
          v-validate="{ max: 200, required: true }"
          :placeholder="$t('message.textPlaceHolder')"
          name="comment"
          data-vv-as="comment"
          rows="4"
          max-rows="4"
          :state="form.text !== null ? !veeErrors.has('comment') : null"
        />
      </b-form-group>
      <button
        class="submit-btn"
        @click="submitForm('success')"
        :disabled="disableIfOneOfFieldsIsEmpty"
      >
        {{ $t("message.send") }}
      </button>
      <div class="empty-fields-warning" v-if="disableIfOneOfFieldsIsEmpty">
        {{ $t("message.warning") }}...
      </div>
    </b-form>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import router from "@/router";
export default {
  name: "Contact",

  data() {
    return {
      form: {
        username: null,
        email: null,
        phoneNumber: null,
        text: null,
        country: null
      }
    };
  },

  created() {
    this.form.username = this.user ? this.user.name : null;
    this.form.email = this.user ? this.user.email : null;
  },

  computed: {
    ...mapState(["user"]),
    countryOptions() {
      const options = [
        { value: "TR", text: "Turkey" },
        { value: "US", text: "United States of America" },
        { value: "GB", text: "United Kingdom" },
        { value: "DE", text: "Germany" },
        { value: "SE", text: "Sweden" },
        { value: "KE", text: "Kenya" },
        { value: "BR", text: "Brazil" },
        { value: "ZW", text: "Zimbabwe" }
      ];
      return options;
    },
    disableIfOneOfFieldsIsEmpty() {
      return Object.values(this.form).some(
        value =>
          value == null ||
          (Array.isArray(value) && value.length === 0) ||
          this.veeErrors.items.length > 0
      );
    }
  },

  methods: {
    ...mapActions(["sendInfo"]),
    async submitForm() {
      const country_code = this.form.country.value;
      this.form = { country_code, ...this.form };
      await this.sendInfo(this.form);

      await this.$bvToast.toast("Form başarılı bir şekilde gönderilmiştir.", {
        title: "Başarılı",
        variant: "success",
        solid: true,
        autoHideDelay: 10
      });
      router.push({ name: "Home" });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.form-wrapper {
  width: 500px;
  margin: 10px auto;
  margin-bottom: 70px;
}
.form-title {
  margin-top: 60px;
  margin-bottom: 50px;
  line-height: 1.1;
  letter-spacing: -1.1px;
  font-weight: 500;
  color: #222;
  font-size: 46px;
}
.form-label {
  letter-spacing: 0.7px;
  font-size: 14px;
  font-weight: 500;
  color: #222;
}
.empty-fields-warning {
  margin-top: 5px;
  letter-spacing: 0.5px;
  font-size: 12px;
  font-weight: 200;
  color: #222;
}
.submit-btn {
  font-size: 18px;
  font-weight: 700;
  color: #fff;
  padding: 10px 20px;
  border-radius: 10px;
  background: #9b59b6;
  border: none;
}
.submit-btn:hover {
  font-size: 18px;
  font-weight: 700;
  color: #e7c5f5;
  padding: 10px 20px;
  border-radius: 10px;
  background: #8b33ad;
  cursor: pointer;
}
.submit-btn:disabled,
.submit-btn[disabled] {
  background-color: #e7c5f5;
  color: #7c7c7c;
}

@media only screen and (max-width: 600px) {
  .form-wrapper {
    width: 300px;
  }
}
</style>
