  import { useEffect } from "react";

  const useScrollStop = (isModalOpen) => {
    useEffect(() => {
      // Prevent background scrolling while the modal is open.
      document.body.style.overflow = isModalOpen ? "hidden" : "";

      return () => {
        document.body.style.overflow = "";
      };
    }, [isModalOpen]);
  };

  export default useScrollStop;