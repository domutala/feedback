export default defineNuxtRouteMiddleware((to, from) => {
  const { $localePath } = useNuxtApp();
  if (!Store.auth.auth && to.path.startsWith("/admin")) {
    return navigateTo($localePath({ name: "login" }));
  }
});
