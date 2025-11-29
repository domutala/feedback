import * as z from "zod";
import type { FeedbackModel } from "./interfaces";

export function stepTwoValidator(
  model: FeedbackModel,
  translator: (label: string) => string
) {
  const schema = [];

  if (model.name) {
    let v = z.string(translator("rate.errors.name.required"));
    if (!model.name_required) v = v.optional() as any;

    schema.push({
      key: "name",
      value: z.transform((v) => (v === "" ? undefined : v)).pipe(v),
    });
  }

  if (model.email) {
    let v = z.email(translator("rate.errors.name.email"));
    if (!model.email_required) v = v.optional() as any;

    schema.push({
      key: "email",
      value: z.transform((v) => (v === "" ? undefined : v)).pipe(v),
    });
  }

  if (model.address) {
    let v = z.string(translator("rate.errors.name.address"));
    if (!model.address_required) v = v.optional() as any;

    schema.push({
      key: "address",
      value: z.transform((v) => (v === "" ? undefined : v)).pipe(v),
    });
  }

  if (model.comment !== "no") {
    let v = z
      .string(translator("rate.errors.comment.required"))
      .max(500, translator("rate.errors.comment.length"));
    if (model.comment === "notRequired") v = v.optional() as any;

    schema.push({
      key: "comment",
      value: z.transform((v) => (v === "" ? undefined : v)).pipe(v),
    });
  }

  const obj = Object.fromEntries(schema.map(({ key, value }) => [key, value]));
  return obj;
}
