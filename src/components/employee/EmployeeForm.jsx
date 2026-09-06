import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import Button from "../common/Button";
import ErrorMessage from "../common/ErrorMessage";
import Input from "../common/Input";

const EmployeeForm = ({
  defaultValues,
  onSubmit,
  onCancel,
  submitting,
  isEditing,
}) => {
  const { control, handleSubmit, setError } = useForm({ defaultValues });
  const [submitError, setSubmitError] = useState("");

  /**
   * Submits employee data and maps duplicate-email responses to the email field.
   */
  const handleFormSubmit = async (data) => {
    setSubmitError("");
    try {
      await onSubmit(data);
    } catch (err) {
      const isTimeout = err.message?.toLowerCase().includes("timeout");
      const backendMessage =
        err.response?.data?.message || err.response?.data?.error || err.message;

      if (isTimeout) {
        setSubmitError(
          "The request timed out. Please check your internet connection and try again.",
        );
        return;
      }

      if (err.response?.status === 400) {
        const message = backendMessage || "This email already exists.";
        setError("email", {
          type: "server",
          message,
        });
        return;
      }

      setSubmitError(
        backendMessage || "Unable to save employee. Please try again.",
      );
    }
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} noValidate>
      {submitError && (
        <ErrorMessage
          message={submitError}
          className="mb-4 text-sm text-red-600"
        />
      )}
      <Input
        name="name"
        control={control}
        rules={{
          required: "Name is required",
          validate: (value) => {
            const name = value?.trim() || "";
            return (
              /^[A-Za-z]+(?:\s+[A-Za-z]+)*$/.test(name) ||
              "Name can contain only letters and single spaces"
            );
          },
        }}
        label="Name"
        placeholder="Enter full name"
      />

      {!isEditing && (
        <Input
          name="email"
          control={control}
          rules={{
            required: "Email is required",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Enter a valid email",
            },
          }}
          label="Email"
          type="email"
          placeholder="Enter email"
        />
      )}
      <Controller
        name="department"
        control={control}
        rules={{ required: "Department is required" }}
        render={({ field, fieldState: { error } }) => (
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Department
            </label>
            <select
              {...field}
              value={field.value ?? ""}
              onChange={(e) => field.onChange(e.target.value)}
              className={`w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 ${
                error
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-blue-500"
              }`}
            >
              <option value="" disabled>
                Select department
              </option>
              <option value="Design">Design</option>
              <option value="Infrastructure">Infrastructure</option>
              <option value="Product">Product</option>
              <option value="Engineering">Engineering</option>
              <option value="Human Resources">Human Resources</option>
            </select>
            {error && (
              <ErrorMessage
                message={error.message}
                className="text-sm text-red-600"
              />
            )}
          </div>
        )}
      />

      <Input
        name="role"
        control={control}
        rules={{ required: "Role is required" }}
        label="Role"
        placeholder="Enter role"
      />

      <div className="flex justify-end gap-2 mt-4">
        {onCancel && (
          <Button
            type="button"
            className="bg-gray-100 text-gray-700 hover:bg-gray-200"
            onClick={onCancel}
          >
            Cancel
          </Button>
        )}
        <Button
          type="submit"
          className="text-white bg-[#0F172A] hover:bg-[#1E293B] disabled:opacity-60"
          disabled={submitting}
        >
          {submitting ? "Saving..." : "Save Employee"}
        </Button>
      </div>
    </form>
  );
};

export default EmployeeForm;
