import React from "react";

const Page = () => {
  return (
    <section className="w-1/2">
      <div className="font-bold mb-6">It&apos;s Thursday, 14-03-2024</div>
      <div className="flex flex-col justify-center gap-4 p-6 rounded-md border border-black w-full">
        <div className="flex justify-between p-4 font-semibold">
          <p>Current Cycle</p>
          <p>📆</p>
        </div>
        <div className="flex items-center justify-between gap-4">
          <div className="border rounded-md p-4 flex-1 text-center">
            <p className="font-bold">200K</p>
            <p>Budget</p>
          </div>
          <div className="border rounded-md p-4 flex-1 text-center">
            <p  className="font-bold">50K</p>
            <p>Spent</p>
          </div>
          <div className="border rounded-md p-4 flex-1 text-center">
            <p  className="font-bold">150K</p>
            <p>Remaining</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Page;
