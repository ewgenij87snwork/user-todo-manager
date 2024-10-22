export interface User {
  id: number;
  name: string;
  phone: string;
  companyName: string;
}

export interface FormField {
  id: string;
  label: string;
  type: string;
  placeholder: string;
  example: string;
  required: boolean;
  validation: FieldValidation;
}

interface FieldValidation {
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  errorMessage?: string;
}

export interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
  favorite?: boolean;
  hidden?: boolean;
}
