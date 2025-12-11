export const useAuth = () => {
  return useState<string | null>("auth_token", () => {
    const nuxtApp = useNuxtApp();
    return nuxtApp.ssrContext?.event.context.authToken ?? null;
  });
};
