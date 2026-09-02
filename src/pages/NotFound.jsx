const NotFound = () => {  // It will render the 404 page when the user navigates to a non-existent route
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50 px-6 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-[#0F62D6] text-xl font-bold text-white">
        P
      </div>

      <h1 className="mt-6 text-6xl font-semibold text-[#0F62D6]">404</h1>
      <p className="mt-2 text-lg font-medium text-slate-900">Page not found</p>
      <p className="mt-1 max-w-sm text-sm text-slate-500">
        The page you're looking for doesn't exist or may have been moved.
      </p>

      <a
        href="/"
        className="mt-6 inline-block rounded-md bg-[#0F62D6] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#0B4CB0]"
      >
        Back to Employee Directory
      </a>
    </div>
  );
};

export default NotFound;
