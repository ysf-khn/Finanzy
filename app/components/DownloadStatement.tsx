"use client";

import React from "react";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import { Button } from "@/components/ui/button";
import { formatNumberWithCommas, formatStatementTime } from "@/lib/utils";

const DownloadStatement = ({ transactions }: any) => {
  const exportPDF = () => {
    const unit = "pt";
    const size = "A4"; // Use A1, A2, A3 or A4
    const orientation = "portrait"; // portrait or landscape

    // console.log(transactions.length);

    const marginLeft = 40;
    const doc = new jsPDF(orientation, unit, size);

    doc.setFontSize(15);

    const title = "Statement";
    const headers = [["Name", "Date", "Amount", "Category", "Payment Method"]];

    const data = transactions.map((transaction: any) => [
      transaction.name,
      formatStatementTime(transaction.createdAt),
      `Rs. ${formatNumberWithCommas(transaction.amount)}`,
      transaction.category || "None",
      transaction.paymentMode || "Not Specified",
    ]);

    let content = {
      startY: 50,
      head: headers,
      body: data,
    };

    doc.text(title, marginLeft, 40);
    // @ts-ignore
    doc.autoTable(content);
    doc.save("report.pdf");
  };

  return (
    <Button
      className={`p-6 hover:bg-white hover:text-black border border-green-500 bg-black text-white w-full sm:w-auto ${
        transactions.length === 0 ? "pointer-events-none opacity-50" : ""
      }`}
      onClick={exportPDF}
      aria-disabled={transactions.length === 0}
      tabIndex={transactions.length === 0 ? -1 : undefined}
    >
      Download Statement
    </Button>
  );
};

export default DownloadStatement;
