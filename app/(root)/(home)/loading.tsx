import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  // Or a custom loading skeleton component
  return (
    <section className="w-full max-sm:px-2 px-6">
      <Skeleton className="h-[40px] w-2/3 rounded-md" />
      <div className="md:flex items-center justify-between font-semibold max-sm:mb-8 md:mb-12 md:text-xl">
        <p className="max-sm:mb-4"></p>
        <div className="sm:flex gap-4">
          <Skeleton className="h-auto rounded-md p-6  w-full sm:w-auto mb-2 sm:mb-0" />
          <Skeleton className="h-auto rounded-md p-6  w-full sm:w-auto mb-2 sm:mb-0" />
        </div>
      </div>

      <div className="md:flex gap-6">
        <div className="md:w-2/3">
          <div className="mb-6">
            <h2>This Cycle</h2>
            <Skeleton className="h-full flex-grow rounded-md" />
            <div className="flex gap-4">
              <Skeleton className="h-full flex-grow rounded-md" />
              <Skeleton className="h-full flex-grow rounded-md" />
            </div>
          </div>

          <div className="mb-6">
            <h2 className="md:text-xl font-semibold mb-4 md:mb-6">Overall</h2>
            <div className="md:flex items-center justify-between gap-6 max-sm:space-y-3">
              <div className="p-3 md:p-8 flex-1 rounded-xl md:rounded-md border border-1 ">
                <div className="flex items-center justify-between mb-4">
                  <Skeleton className="h-full flex-grow" />
                </div>
                <p className="text-xl md:text-2xl font-bold">
                  <Skeleton className="h-full w-[50px]" />
                </p>
              </div>

              {/* large screens */}
              <div className="p-8 flex-1 rounded-md border border-1 max-sm:hidden">
                <div className="flex items-center justify-between mb-4">
                  <Skeleton className="h-full flex-grow" />
                </div>
                <p className="text-xl md:text-2xl font-bold">
                  <Skeleton className="h-full w-[50px]" />
                </p>
              </div>
              <div className="p-8 flex-1 rounded-md border border-1 max-sm:hidden">
                <div className="flex items-center justify-between mb-4">
                  <Skeleton className="h-full flex-grow" />
                </div>
                <p className="text-xl md:text-2xl font-bold">
                  <Skeleton className="h-full w-[50px]" />
                </p>
              </div>

              {/* small screens */}
              <div className="max-sm:flex max-sm:gap-4 hidden">
                <div className="p-3 md:p-8 flex-1 rounded-xl md:rounded-md border border-1 ">
                  <div className="flex items-center justify-between mb-4">
                    <Skeleton className="h-full flex-grow" />
                  </div>
                  <p className="text-xl md:text-2xl font-bold">
                    <Skeleton className="h-full w-[50px]" />
                  </p>
                </div>
                <div className="p-3 md:p-8 flex-1 rounded-xl md:rounded-md border border-1 ">
                  <div className="flex items-center justify-between mb-4">
                    <Skeleton className="h-full flex-grow" />
                  </div>
                  <p className="text-xl md:text-2xl font-bold">
                    <Skeleton className="h-full w-[50px]" />
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="md:w-1/3">
          <h2 className="md:text-xl font-semibold mb-4 md:mb-6">
            Recent transactions
          </h2>
          {"abcde".split("").map((i) => (
            <Skeleton key={i} className="w-full h-[30px] rounded-md" />
          ))}
        </div>
      </div>
    </section>
  );
}
