import { useAuth } from "~/pages/composables/useAuth";

const store = defineStore(
  "auth",
  () => {
    const auth = ref<{ token: string; user: { email: string } }>();
    const logouting = ref(false);

    async function getAuth(token: string) {
      const { $i18n } = useNuxtApp();

      const res = await $fetch("/api/auth", {
        method: "POST",
        body: { token: Use.route.params.token },
      });

      auth.value = { token: res.token, user: res.user };
    }

    async function logout() {
      try {
        logouting.value = true;

        await $fetch("/api/logout", { method: "post" });
        auth.value = undefined;
        Use.router.push(Use.localePath({ name: "login" }));
      } catch (error) {
        console.log(error);
      } finally {
        logouting.value = false;
      }
    }

    return {
      auth,
      getAuth,
      logout,
      logouting,
    };
  },
  { persist: true },
);

export default store;
