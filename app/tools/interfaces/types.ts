import * as z from "zod";

export type zodStringProperty =
  | "string"
  | {
      schema: "string";
      params?: string | z.core.$ZodStringParams;
      suits?: (
        | zodMaxProperty
        | zodMinProperty
        | zodLengthProperty
        | zodEmailProperty
        | zodUUIDProperty
      )[];
    };

export type zodEmailProperty =
  | "email"
  | { schema: "email"; params?: string | z.core.$ZodEmailParams };

export type zodUUIDProperty =
  | "uuid"
  | { schema: "uuid"; params?: string | z.core.$ZodUUIDParams };
export type zodUrlProperty =
  | "url"
  | { schema: "url"; params?: string | z.core.$ZodURLParams };

export type zodMaxProperty = {
  schema: "max";
  maxLength: number;
  params?: string | z.core.$ZodCheckMaxLengthParams;
};
export type zodMinProperty = {
  schema: "min";
  minLength: number;
  params?: string | z.core.$ZodCheckMinLengthParams;
};
export type zodLengthProperty = {
  schema: "length";
  len: number;
  params?: string | z.core.$ZodCheckLengthEqualsParams;
};

export type zodNumberProperty =
  | "number"
  | { schema: "number"; params?: string | z.core.$ZodNumberParams };

export type zodBigintProperty =
  | "bigint"
  | { schema: "bigint"; params?: string | z.core.$ZodBigInt };

export type zodBooleanProperty =
  | "boolean"
  | { schema: "boolean"; params?: string | z.core.$ZodBooleanParams };

export type zodSymbolProperty =
  | "symbol"
  | { schema: "symbol"; params?: string | z.core.$ZodSymbolParams };

export type zodUndefinedProperty =
  | "undefined"
  | { schema: "undefined"; params?: string | z.core.$ZodUndefinedParams };

export type zodNullProperty =
  | "null"
  | { schematype: "null"; params?: string | z.core.$ZodNullParams };

export type zodLiteralProperty = {
  schema: "literal";
  value: any;
  params?: string;
};

export type ZodProperty =
  | zodStringProperty
  | zodEmailProperty
  | zodUUIDProperty
  | zodUrlProperty
  | zodNumberProperty
  | zodBigintProperty
  | zodBooleanProperty
  | zodSymbolProperty
  | zodUndefinedProperty
  | zodNullProperty
  | zodLiteralProperty;

// ———————————————— Object ————————————————
export type zodObjectProperty = {
  schema: "object";
  properties: Record<string, ZodProperty>;
};
