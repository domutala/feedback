export async function getEmailTemplate(
  name: string,
  vars: Record<string, string>,
) {
  const assetStorage = useStorage("assets:server");
  let html = (await assetStorage.getItem(`mails/${name}.html`, {}))!.toString();

  Object.entries(vars).forEach(([key, value]) => {
    html = html.toString().replaceAll(`{{${key}}}`, value);
  });

  return html;
}
