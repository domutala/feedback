import * as z from "zod";

// --- Propriétés de Base (Primitives et Types Simples) ---

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
        | zodURLProperty
        | zodUUIDProperty
        | zodCUIDProperty
        | zodDateTimeProperty
        | zodEmojiProperty
        | zodRegexProperty
        | zodTrimProperty
        | zodStartsWithProperty
        | zodEndsWithProperty
      )[];
    };

export type zodNumberProperty =
  | "number"
  | {
      schema: "number";
      params?: string | z.core.$ZodNumberParams;
      suits?: (
        | zodGtProperty
        | zodGteProperty
        | zodLtProperty
        | zodLteProperty
        | zodIntProperty
        | zodPositiveProperty
        | zodNonNegativeProperty
        | zodNegativeProperty
        | zodNonPositiveProperty
        | zodMultipleOfProperty
      )[];
    };

export type zodBigintProperty =
  | "bigint"
  | {
      schema: "bigint";
      params?: string | z.core.$ZodBigIntParams;
      suits?: (
        | zodGtProperty
        | zodGteProperty
        | zodLtProperty
        | zodLteProperty
        | zodPositiveProperty
        | zodNonNegativeProperty
        | zodNegativeProperty
        | zodNonPositiveProperty
        | zodMultipleOfProperty
      )[];
    };

export type zodBooleanProperty =
  | "boolean"
  | { schema: "boolean"; params?: string | z.core.$ZodBooleanParams };

export type zodDateProperty =
  | "date"
  | {
      schema: "date";
      params?: string | z.core.$ZodDateParams;
      suits?: (zodMaxProperty | zodMinProperty)[]; // max/min pour les dates
    };

export type zodSymbolProperty =
  | "symbol"
  | { schema: "symbol"; params?: string | z.core.$ZodSymbolParams };

export type zodUndefinedProperty =
  | "undefined"
  | { schema: "undefined"; params?: string | z.core.$ZodUndefinedParams };

export type zodNullProperty =
  | "null"
  | { schema: "null"; params?: string | z.core.$ZodNullParams };

export type zodAnyProperty =
  | "any"
  | { schema: "any"; params?: string | z.core.$ZodAnyParams };

export type zodUnknownProperty =
  | "unknown"
  | { schema: "unknown"; params?: string | z.core.$ZodUnknownParams };

export type zodVoidProperty =
  | "void"
  | { schema: "void"; params?: string | z.core.$ZodVoidParams };

export type zodNeverProperty =
  | "never"
  | { schema: "never"; params?: string | z.core.$ZodNeverParams };

export type zodLiteralProperty = {
  schema: "literal";
  value: any;
  params?: string;
};

// --- Propriétés de Raffinement (Spécifiques aux types comme String/Number) ---

// Raffinements de type String (validation de format)
export type zodEmailProperty =
  | "email"
  | { schema: "email"; params?: string | z.core.$ZodEmailParams };

export type zodUUIDProperty =
  | "uuid"
  | { schema: "uuid"; params?: string | z.core.$ZodUUIDParams };

export type zodCUIDProperty =
  | "cuid"
  | { schema: "cuid"; params?: string | z.core.$ZodCUIDParams };

export type zodURLProperty =
  | "url"
  | { schema: "url"; params?: string | z.core.$ZodURLParams };

export type zodDateTimeProperty =
  | "datetime"
  | {
      schema: "datetime";
      params?: string | z.core.$ZodISODateTimeParams;
      offset?: boolean;
      precision?: number;
    };

export type zodEmojiProperty =
  | "emoji"
  | { schema: "emoji"; params?: string | z.core.$ZodEmojiParams };

export type zodRegexProperty = {
  schema: "regex";
  regex: RegExp;
  params?: string | z.core.$ZodCheckRegexParams;
};

export type zodTrimProperty = {
  schema: "trim";
};

export type zodStartsWithProperty = {
  schema: "startsWith";
  prefix: string;
  params?: string | z.core.$ZodCheckStartsWithParams;
};

export type zodEndsWithProperty = {
  schema: "endsWith";
  suffix: string;
  params?: string | z.core.$ZodCheckEndsWithParams;
};

// Raffinements de type String (longueur)
export type zodMaxProperty = {
  schema: "max";
  maxLength: number | Date; // utilisé aussi pour les dates
  params?: string | z.core.$ZodCheckMaxLengthParams;
};

export type zodMinProperty = {
  schema: "min";
  minLength: number | Date; // utilisé aussi pour les dates
  params?: string | z.core.$ZodCheckMinLengthParams;
};

export type zodLengthProperty = {
  schema: "length";
  len: number;
  params?: string | z.core.$ZodCheckLengthEqualsParams;
};

// Raffinements de type Number/BigInt (valeur)
export type zodGtProperty = {
  schema: "gt";
  value: number | bigint;
  params?: string | z.core.$ZodCheckGreaterThanParams;
};

export type zodGteProperty = {
  schema: "gte";
  value: number | bigint;
  params?: string | z.core.$ZodCheckGreaterThanParams;
};

export type zodLtProperty = {
  schema: "lt";
  value: number | bigint;
  params?: string | z.core.$ZodCheckLessThanParams;
};

export type zodLteProperty = {
  schema: "lte";
  value: number | bigint;
  params?: string | z.core.$ZodCheckLessThanParams;
};

export type zodMultipleOfProperty = {
  schema: "multipleOf";
  value: number | bigint;
  params?: string | z.core.$ZodCheckMultipleOfParams;
};

// Raffinements de type Number (spécifiques)
export type zodIntProperty = {
  schema: "int";
  params?: string | z.core.$ZodCheckNumberFormatParams;
};

export type zodPositiveProperty = {
  schema: "positive";
  params?: string | z.core.$ZodCheckGreaterThanParams;
};

export type zodNonNegativeProperty = {
  schema: "nonnegative";
  params?: string | z.core.$ZodCheckGreaterThanParams;
};

export type zodNegativeProperty = {
  schema: "negative";
  params?: string | z.core.$ZodCheckLessThanParams;
};

export type zodNonPositiveProperty = {
  schema: "nonpositive";
  params?: string | z.core.$ZodCheckLessThanParams;
};

// --- Propriétés de Schéma Complexes (Array, Object, Union, etc.) ---

export type ZodBaseSchemaProperty =
  | zodStringProperty
  | zodNumberProperty
  | zodBigintProperty
  | zodBooleanProperty
  | zodDateProperty
  | zodSymbolProperty
  | zodUndefinedProperty
  | zodNullProperty
  | zodAnyProperty
  | zodUnknownProperty
  | zodVoidProperty
  | zodNeverProperty
  | zodLiteralProperty;

export type zodArrayProperty = {
  schema: "array";
  elementType: ZodSchemaProperty; // Un schéma valide pour les éléments
  params?: string | z.core.$ZodArrayParams;
  suits?: (zodMaxProperty | zodMinProperty | zodLengthProperty)[];
};

export type zodObjectProperty = {
  schema: "object";
  shape: { [key: string]: ZodSchemaProperty }; // Définition des propriétés de l'objet
  params?: string | z.core.$ZodObjectParams;
  passthrough?: boolean; // .passthrough()
  strict?: boolean; // .strict()
  strip?: boolean; // .strip() (par défaut)
};

export type zodUnionProperty = {
  schema: "union";
  options: [ZodSchemaProperty, ZodSchemaProperty, ...ZodSchemaProperty[]];
  params?: string | z.core.$ZodUnionParams;
};

export type zodDiscriminatedUnionProperty = {
  schema: "discriminatedUnion";
  discriminator: string; // La clé de discrimination
  options: [ZodSchemaProperty, ZodSchemaProperty, ...ZodSchemaProperty[]];
  params?: string | z.core.$ZodDiscriminatedUnionParams;
};

export type zodIntersectionProperty = {
  schema: "intersection";
  left: ZodSchemaProperty;
  right: ZodSchemaProperty;
  params?: string | z.core.$ZodIntersectionParams;
};

export type zodTupleProperty = {
  schema: "tuple";
  items: ZodSchemaProperty[];
  params?: string | z.core.$ZodTupleParams;
};

export type zodEnumProperty = {
  schema: "enum";
  values: [string, ...string[]];
  params?: string | z.core.$ZodEnumParams;
};

/** @deprecated */
export type zodNativeEnumProperty = {
  schema: "nativeEnum";
  enum: object; // L'objet enum natif (JS/TS)
  params?: string | z.core.$ZodEnumParams;
};

export type zodRecordProperty = {
  schema: "record";
  keyType?: zodStringProperty | zodNumberProperty; // Type de clé (string ou number)
  valueType: ZodSchemaProperty; // Type de valeur
  params?: string | z.core.$ZodRecordParams;
};

export type zodMapProperty = {
  schema: "map";
  keyType: ZodSchemaProperty;
  valueType: ZodSchemaProperty;
  params?: string | z.core.$ZodMapParams;
};

export type zodSetProperty = {
  schema: "set";
  elementType: ZodSchemaProperty;
  params?: string | z.core.$ZodSetParams;
  suits?: (zodMaxProperty | zodMinProperty)[]; // max/min pour la taille du Set
};

export type zodFunctionProperty = {
  schema: "function";
  args: ZodSchemaProperty; // Schéma des arguments (généralement un ZodTuple)
  returns: ZodSchemaProperty; // Schéma du retour
};

export type zodPromiseProperty = {
  schema: "promise";
  type: ZodSchemaProperty; // Schéma du type résolu
  params?: string | z.core.$ZodPromiseParams;
};

export type zodLazyProperty = {
  schema: "lazy";
  getter: () => ZodSchemaProperty; // Fonction qui retourne le schéma
  params?: string | z.core.$ZodLazyParams;
};

// --- Propriétés de Modificateurs ---

// .optional() et .nullable()
export type zodOptionalProperty = {
  schema: "optional";
  type: ZodSchemaProperty;
  params?: string | z.core.$ZodOptionalParams;
};

export type zodNullableProperty = {
  schema: "nullable";
  type: ZodSchemaProperty;
  params?: string | z.core.$ZodNullableParams;
};

// .default()
export type zodDefaultProperty = {
  schema: "default";
  type: ZodSchemaProperty;
  value: unknown | (() => unknown); // La valeur par défaut ou une fonction
  params?: string | z.core.$ZodDefaultParams;
};

// .catch()
export type zodCatchProperty = {
  schema: "catch";
  type: ZodSchemaProperty;
  value: unknown | (() => unknown); // La valeur de secours ou une fonction
  params?: string | z.core.$ZodCatchParams;
};

// .pipe()
export type zodPipeProperty = {
  schema: "pipe";
  from: ZodSchemaProperty;
  to: ZodSchemaProperty;
  params?: string | z.core.$ZodPipeParams;
};

// --- Type de Schéma Global ---

export type ZodSchemaProperty =
  | ZodBaseSchemaProperty
  | zodArrayProperty
  | zodObjectProperty
  | zodUnionProperty
  | zodDiscriminatedUnionProperty
  | zodIntersectionProperty
  | zodTupleProperty
  | zodEnumProperty
  | zodNativeEnumProperty
  | zodRecordProperty
  | zodMapProperty
  | zodSetProperty
  | zodFunctionProperty
  | zodPromiseProperty
  | zodLazyProperty
  | zodOptionalProperty
  | zodNullableProperty
  | zodDefaultProperty
  | zodCatchProperty
  | zodPipeProperty;

// --- Propriété Racine de l'Objet DSL ---

export type ZodDSLSchema = {
  [key: string]: ZodSchemaProperty;
};
