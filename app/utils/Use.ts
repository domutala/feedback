class Use {
  get router() {
    const router = useRouter();
    return router;
  }

  get localePath() {
    const { $localePath } = useNuxtApp();
    return $localePath;
  }

  get route() {
    const route = useRoute();
    return route;
  }
}

export default new Use();
