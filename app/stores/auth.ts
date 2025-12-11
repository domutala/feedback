import { useAuth } from "~/pages/composables/useAuth";

const store = defineStore(
  "auth",
  () => {
    const auth = ref<{ token: string }>();

    async function getAuth(token: string) {
      const { $i18n } = useNuxtApp();

      const res = await $fetch("/api/auth", {
        method: "POST",
        body: { token: Use.route.params.token },
      });

      auth.value = { token: res.token };
    }

    function logout() {
      auth.value = undefined;
      Use.router.push(Use.localePath({ name: "login" }));
    }

    return {
      auth,
      getAuth,
      logout,
    };
  },
  { persist: true }
);

export default store;
