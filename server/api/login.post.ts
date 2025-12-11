import { arrayContains, sql } from "drizzle-orm";
import * as z from "zod";
import jwt from "jsonwebtoken";
import { Resend } from "resend";

const EMAIL_CONTENT = `Bonjour,

Vous avez demandé à vous connecter à votre compte sur Sya.
Cliquez simplement sur le lien ci-dessous pour accéder à votre session :

👉 Lien de connexion : {{loginUrl}}

Ce lien est valide pour une durée limitée et peut être utilisé une seule fois.

Si vous n’êtes pas à l’origine de cette demande, vous pouvez ignorer cet email en toute sécurité.

Merci,
L’équipe Sya`;

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const body = await readBody(event);

  const r2 = z.email("login.errors.email").safeParse(body.email);
  if (r2.error) {
    throw createError({
      statusCode: 400,
      data: { zod: r2.error.message },
    });
  }

  arrayContains(tables.model.emails, [body.email]);
  const models = await dataSource
    .select()
    .from(tables.model)
    .where(arrayContains(tables.model.emails, [body.email]));

  if (models.length) {
    const token = jwt.sign({ email: body.email }, config.jwtPrivateKey, {
      expiresIn: "15m",
    });

    const resend = new Resend(config.resendApiKey);
    const e = await resend.emails.send({
      from: "Équipe des comptes Sya <auth@sya.sn>",
      to: [body.email, "ibntalla@gmail.com"],
      subject: "Votre lien de connexion à Sya",
      html: EMAIL_CONTENT.replaceAll(
        "{{loginUrl}}",
        `${config.public.baseUrl}/auth-${token}`
      ),
    });
  }

  return;
});
