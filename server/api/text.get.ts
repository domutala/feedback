import { arrayContains, count, asc, desc } from "drizzle-orm";
import { Auth } from "~~/server/database/schema";

export default defineEventHandler(async (event) => {
  const t = await useTranslation(event);
  const appc = useAppConfig(event);
  console.log(appc.site?.name);

  return {
    hello: "you",
    test: `${t("mail.author.main_team", { name: "Feedback" })} <noreplay@sya.sn>`,
  };
});
