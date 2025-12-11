/**
 * Extrait le prénom et le nom à partir d'un email.
 * - Ex : "pierre.marie.wade@gmail.com" -> { firstName: "Pierre Marie", lastName: "Wade" }
 * - Ex : "jean-paul.dupont@gmail.com" -> { firstName: "Jean Paul", lastName: "Dupont" }
 * - Ex : "hugo@gmail.com" -> { firstName: "Hugo", lastName: "" }
 */
export function GetNameFromEmail(email: string) {
  if (!email.includes("@")) {
    return { firstName: "", lastName: "" };
  }

  // Extraire la partie locale de l'email (avant le @)
  const localPart = email.split("@")[0];
  if (!localPart) return { firstName: "", lastName: "" };

  // Découper la chaîne sur les délimiteurs courants (. _ -)
  const parts = localPart.split(/[\._\-]/).filter(Boolean);

  // Si pas assez d'infos, construction générique
  if (parts.length === 0) {
    return { firstName: "", lastName: "" };
  }

  // Dernier mot = nom de famille
  const lastName = parts.length > 1 ? capitalize(parts[parts.length - 1]!) : "";

  // Prénoms = tout sauf le dernier mot
  const firstName =
    parts.slice(0, -1).map(capitalize).join(" ") || capitalize(parts[0]!);

  return { firstName, lastName };
}

/**
 * Met la première lettre en majuscule
 */
function capitalize(word: string): string {
  return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
}

/**
 * Extrait le nom de l'entreprise à partir d'un email.
 * Ex : "mamadou@company.com" -> "Company"
 * Ex : "contact@subdomain.google.co.uk" -> "Google"
 */
export function GetCompanyNameFromEmail(email: string): string {
  if (!email.includes("@")) return "";

  const domainPart = email.split("@")[1];
  if (!domainPart) return "";

  // Supprime les sous-domaines (ex: mail. ou info.)
  const domainSegments = domainPart.split(".");
  let baseDomain = domainSegments[0]!;

  // Gestion de cas où le premier segment est courant (ex: "mail.company.com")
  const commonSubdomains = [
    "mail",
    "info",
    "contact",
    "support",
    "admin",
    "hello",
  ];
  if (
    commonSubdomains.includes(baseDomain.toLowerCase()) &&
    domainSegments.length > 1
  ) {
    baseDomain = domainSegments[1]!;
  }

  return capitalize(baseDomain);
}

/**
 * Retourne le site web de l'entreprise à partir d'un email.
 * Ex : "mamadou@company.com" -> "https://company.com"
 * Ex : "contact@mail.google.co.uk" -> "https://google.co.uk"
 */
export function GetCompanyWebsiteFromEmail(email: string): string {
  if (!email.includes("@")) return "";

  // Récupération du domaine
  const domainPart = email.split("@")[1];
  if (!domainPart) return "";

  // Liste des sous-domaines à ignorer
  const commonSubdomains = [
    "mail",
    "info",
    "contact",
    "support",
    "admin",
    "hello",
  ];

  // Séparation des parties du domaine
  const domainSegments = domainPart.split(".");

  // Vérifier si le premier segment est un sous-domaine à ignorer
  let startIndex = 0;
  if (
    commonSubdomains.includes(domainSegments[0]!.toLowerCase()) &&
    domainSegments.length > 1
  ) {
    startIndex = 1;
  }

  // Reconstruire le domaine principal (ex : "google.co.uk")
  const mainDomain = domainSegments.slice(startIndex).join(".");

  return mainDomain;
}
