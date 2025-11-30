export type FeedbackModel = {
  name: boolean;
  name_required: boolean;
  email: boolean;
  email_required: boolean;
  phone: boolean;
  phone_required: boolean;
  address: boolean;
  address_required: boolean;
  comment: "notRequired" | "required" | "no";
  count: number | null;
};

export type FeedbackData = {
  rate: number;
  name?: string;
  email?: string;
  phone?: string;
  comment?: string;
};
