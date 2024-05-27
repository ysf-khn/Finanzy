"use client";

import React from "react";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import { Button } from "@/components/ui/button";
import { formatNumberWithCommas, formatStatementTime } from "@/lib/utils";

function getCurrentDate() {
  const currentDate = new Date();
  const day = String(currentDate.getDate()).padStart(2, "0");
  const month = String(currentDate.getMonth() + 1).padStart(2, "0");
  const year = currentDate.getFullYear();

  return `${day}-${month}-${year}`;
}

const DownloadStatement = ({ transactions }: any) => {
  const exportPDF = () => {
    const unit = "pt";
    const size = "A4"; // Use A1, A2, A3 or A4
    const orientation = "portrait"; // portrait or landscape
    const marginLeft = 40;
    const doc = new jsPDF(orientation, unit, size);

    // doc.setFontSize(15);

    // const title = [
    //   "Finanzy",
    //   `Transactions Statement (as of ${getCurrentDate()})`,
    // ];

    // doc.setTextColor(0, 128, 0); // RGB values for green
    // doc.text(title[0], marginLeft, 40); // Add the first element of the title array

    // const headers = [
    //   ["Item", "Date", "Amount", "Type", "Category", "Payment Method"],
    // ];

    // const data = transactions.map((transaction: any) => [
    //   transaction.name,
    //   formatStatementTime(transaction.createdAt),
    //   `Rs. ${formatNumberWithCommas(transaction.amount)}`,
    //   transaction.transactionType,
    //   transaction.category || "None",
    //   transaction.paymentMode || "Not Specified",
    // ]);

    // let content = {
    //   startY: 70,
    //   head: headers,
    //   body: data,
    // };

    // doc.text(title, marginLeft, 40);
    // // @ts-ignore
    // doc.autoTable(content);
    // doc.save(`Finanzy_Statement_${getCurrentDate()}.pdf`);

    doc.setProperties({
      title: "Finanzy | Transactions Statement",
      subject: "All Transactions Statement",
      author: "The Finanzy App",
      creator: "The Finanzy App",
    });

    // Define styles
    const titleStyle = {
      fontSize: 16,
      fontStyle: "bold",
      textColor: [0, 0, 0], // RGB color for black
    };
    const headerStyle = {
      fontSize: 14,
      fontStyle: "bold",
      textColor: [255, 255, 255], // RGB color for white
      fillColor: [0, 0, 0], // RGB color for a blue shade
    };
    const dataStyle = {
      fontSize: 10,
      textColor: [0, 0, 0], // RGB color for black
    };

    // @ts-ignore

    doc.setTextColor(...titleStyle.textColor);

    doc.setFontSize(titleStyle.fontSize);
    const titleText = "Finanzy | Transactions Statement";
    const titleWidth =
      (doc.getStringUnitWidth(titleText) * titleStyle.fontSize) /
      doc.internal.scaleFactor;
    const titleX = (doc.internal.pageSize.getWidth() - titleWidth) / 2;
    doc.text(titleText, titleX, 20);
    doc.setFontSize(dataStyle.fontSize);
    doc.text(`Statement Date: ${getCurrentDate()}`, titleX, 40);
    doc.line(20, 45, doc.internal.pageSize.getWidth() - 20, 45);

    const headers = [
      ["Item", "Date", "Amount", "Type", "Category", "Payment Method"],
    ];
    const data = transactions.map((transaction: any) => [
      transaction.name,
      formatStatementTime(transaction.createdAt),
      `Rs. ${formatNumberWithCommas(transaction.amount)}`,
      transaction.transactionType,
      transaction.category || "None",
      transaction.paymentMode || "Not Specified",
    ]);

    // Add table with styling
    // @ts-ignore
    doc.autoTable({
      startY: 50,
      head: headers,
      body: data,
      styles: {
        head: headerStyle,
        body: dataStyle,
      },
      didDrawPage: (data: any) => {
        doc.setFontSize(dataStyle.fontSize);
        const str = `Page ${data.pageCount}`;
        const pageWidth = doc.internal.pageSize.getWidth() - 20;
        const pageHeight = doc.internal.pageSize.getHeight() - 20;
        doc.text(str, data.settings.margin.left, pageHeight);
      },
      margin: { top: 50, bottom: 20 },
    });

    doc.save(`finanzy_statement_${getCurrentDate()}.pdf`);
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
