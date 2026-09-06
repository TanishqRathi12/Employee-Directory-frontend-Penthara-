import { useEffect, useState } from "react";
import { useAddEmployee } from "../../query/employeeQueries";
import Button from "../common/Button";
import Modal from "../common/Modal";
import EmployeeForm from "../employee/EmployeeForm";

const EmployeeDirectoryHeader = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { mutateAsync: addEmployee, isPending } = useAddEmployee();

  
  useEffect(() => {                                               // Prevent background scrolling while the modal is open.
    document.body.style.overflow = isModalOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isModalOpen]);

  
  const handleAddEmployee = async (data) => {
    await addEmployee(data);
    setIsModalOpen(false);
  };

  return (
    <div className="bg-[#0F172A] px-6 py-6">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/15 text-lg font-bold text-white">
            P
          </div>
          <div>
            <p className="text-xs font-medium text-blue-100">
              Penthara Technologies
            </p>
            <h1 className="text-xl font-semibold text-white">
              Employee Directory
            </h1>
          </div>
        </div>

        <Button
          className="w-full bg-white px-4 py-2.5 text-sm font-medium text-[#0F172A] hover:bg-blue-50 sm:w-auto sm:text-base"
          onClick={() => setIsModalOpen(true)}
        >
          + Add Employee
        </Button>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Add Employee"
        className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm"
        contentClassName="w-full max-w-xl rounded-2xl bg-white p-6 shadow-2xl"
      >
        <EmployeeForm
          onSubmit={handleAddEmployee}
          onCancel={() => setIsModalOpen(false)}
          submitting={isPending}
        />
      </Modal>
    </div>
  );
};

export default EmployeeDirectoryHeader;
