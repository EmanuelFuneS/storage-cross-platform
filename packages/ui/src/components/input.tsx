import React from "react";
import Typography from "./typography";
import {
  FieldErrors,
  FieldValues,
  Path,
  UseFormRegister,
  get,
} from "react-hook-form";

interface InputProps<
  T extends FieldValues,
> extends React.HTMLAttributes<HTMLInputElement> {
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
  name: Path<T>;
  label: string;
}

export default function Input<T extends FieldValues>({
  name,
  label,
  register,
  errors,
}: InputProps<T>) {
  const error = get(errors, name);

  return (
    <div className="flex flex-col h-15 space-y-2">
      <Typography as="span" type="body" className="capitalize">
        {label}
      </Typography>
      <input
        className="p-2.5 rounded-xl bg-slate-500"
        type="text"
        {...register(name, {
          required: true,
        })}
      />
      {error && (
        <Typography as="span" type="body" className="text-error capitalize">
          {error.message as string}
        </Typography>
      )}
    </div>
  );
}
