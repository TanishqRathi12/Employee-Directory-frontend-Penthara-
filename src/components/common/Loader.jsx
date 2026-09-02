
// It is used to show the loader while the data is being fetched from the server
const Loader = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#1b0633]">
      <div className="flex flex-col items-center justify-center gap-4">
        <div className="relative flex items-center justify-center">
          <div className="h-20 w-20 animate-spin rounded-full border-4 border-purple-900 border-t-[#ff2ca8] border-r-[#8b2cff]" />

          <div className="absolute h-10 w-10 animate-pulse rounded-full bg-linear-to-br from-[#8b2cff] to-[#ff2ca8] blur-md" />

          <div className="absolute h-5 w-5 rounded-full bg-white shadow-[0_0_20px_#ff2ca8]" />
        </div>

        <p className="text-sm font-medium tracking-[0.2em] text-[#f3d9ff] uppercase">
          Loading...
        </p>
      </div>
    </div>
  );
};

export default Loader;
