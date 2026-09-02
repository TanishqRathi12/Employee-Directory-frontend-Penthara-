import { useEffect, useState } from "react";
import { useEditEmployee } from "../../query/employeeQueries";
import Button from "../common/Button";
import Modal from "../common/Modal";
import EmployeeForm from "./EmployeeForm";

const EmployeeCard = ({ id, name, department, role }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { mutateAsync: editEmployee, isPending } = useEditEmployee();

  useEffect(() => {
    // Prevent background scrolling when modal is open
    document.body.style.overflow = isModalOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isModalOpen]);

  const handleEditEmployee = async (data) => {
    await editEmployee({ id, data });
    setIsModalOpen(false);
  };

  const initials = name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <div className="group w-full max-w-full cursor-pointer rounded-lg border border-slate-200 bg-white p-3 text-left shadow-sm transition-all duration-200 hover:shadow-md sm:max-w-xs sm:p-4">
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#1E293B] text-sm font-semibold text-white">
          {initials}
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="truncate text-sm font-semibold text-slate-900 transition-all duration-200 group-hover:underline">
            {name}
          </h3>
          <p className="truncate text-sm text-slate-500">{role}</p>
        </div>
      </div>

      <div className="mt-3 flex items-center justify-between border-t border-slate-100 pt-2.5">
        <span className="block wrap-break-word text-xs font-medium text-slate-600">
          {department}
        </span>

        <Button
          type="button"
          onClick={() => {
            setIsModalOpen(true);
          }}
          className="text-xs font-semibold text-slate-500 transition-colors hover:text-blue-600"
        >
          Edit
        </Button>
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title="Edit Employee"
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm"
          contentClassName="w-full max-w-xl rounded-2xl bg-white p-6 shadow-2xl"
        >
          <EmployeeForm
            onSubmit={handleEditEmployee}
            onCancel={() => setIsModalOpen(false)}
            submitting={isPending}
            defaultValues={{ name, department, role }}
            isEditing={true}
          ></EmployeeForm>
        </Modal>
      </div>
    </div>
  );
};

export default EmployeeCard;
