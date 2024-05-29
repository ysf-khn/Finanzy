"use client";

import React from "react";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import { Button } from "@/components/ui/button";
import { formatNumberWithCommas, formatStatementTime } from "@/lib/utils";

const imgString: string =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAAXNSR0IArs4c6QAAAjxJREFUaEPtWT1P3EAQfXPQIXFIAQVxLugRhlQIhQZEERQakOig41cgpYUfQYnSIagSqOhIG3EnUCQ6YqDh43xQYg+y4NACZndtn2/P0rr17M57OzP7dnYJBf+o4PhhCZiOoDQCvbXKCjEtAjwJ0Oc2gfUJOA6J1xuj579UPmMJ9BwPD3YHDz8BzKgmyPM/A98brvdb5iOWQPnIOQBhOk9wOnMT8Kfuel8TESgfOasgbOo4yN2GcOWPegMJCVT+gmhcGLQdIvxx5178yx0wgHLVYdGP73rSOn33s1ytBACVmpMEXaWR+5Gzk3aAj3y0gMDrFSg8AQDbHGCt8cU7bUcUWh6BdoBW+JDqQkwNvE6hDiDwAiFOFwpFIE4XdAjsMjBBwFAHROPGd71PIg4lAdU+nDcpVVFbAjYCihWwKWSLWKNIknR+b8XM6C6UtvMTSRglkLbzExXZGIGMnd+173r9UXaaI1B19gB80+38PtpOTRKoRw2YbufXiQQuAQwWmUB03zMnppCs8+u4CPTVnAVm7GjIRJzJy7HaWA0830C8LWQtPsR0WB/7P2V0F4qcPwlZsAXwrBbyZyNmzDXGvH3jBJqge2vOMpiXCDQJQHoTx8Tz4qWv0RTSWXV7nLbHaZ08kdikSaFECpkRn3J4GgKJFFKJIKNBYgIZFTIjXOVw9cVWFoVUus9oICpwcyrJI19yhcyITzlcVGApgTQKqfSe3uCWmE7CUrgR9+xqX+rTL2xrRtoItGYd08/yCFm/g0Dpb99JAAAAAElFTkSuQmCC";

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
    const size = "A4";
    const orientation = "portrait";
    const marginLeft = 40;
    const doc = new jsPDF(orientation, unit, size);

    doc.setProperties({
      title: "Finanzy | Transactions Statement",
      subject: "All Transactions Statement",
      author: "The Finanzy App",
      creator: "The Finanzy App",
    });

    const titleStyle = {
      fontSize: 16,
      fontStyle: "bold",
      textColor: [0, 0, 0], // RGB color for black
    };
    const headerStyle = {
      fontSize: 14,
      fontStyle: "bold",
      textColor: [0, 0, 0], // RGB color for black
      halign: "center", // Center align header text
    };
    const dataStyle = {
      fontSize: 10,
      textColor: [0, 0, 0], // RGB color for black
    };
    const columnStyles = {
      0: { halign: "left" }, // Align 'Item' column to the left
      1: { halign: "center" }, // Align 'Date' column to the center
      2: { halign: "center" }, // Align 'Amount' column to the center
      3: { halign: "center" }, // Align 'Type' column to the center
      4: { halign: "center" }, // Align 'Category' column to the center
      5: { halign: "center" }, // Align 'Payment Method' column to the right
    };

    const imgProps = doc.getImageProperties(imgString);
    const imgWidth = imgProps.width / 2;
    const imgHeight = imgProps.height / 2;

    // Add image and title text on the same line
    doc.addImage(imgString, "PNG", 20, 20, imgWidth, imgHeight);

    // doc.setTextColor(titleStyle.textColor);
    doc.setFontSize(titleStyle.fontSize);
    const titleText = "Finanzy | Transactions Statement";
    const titleWidth =
      (doc.getStringUnitWidth(titleText) * titleStyle.fontSize) /
      doc.internal.scaleFactor;
    const titleX = (doc.internal.pageSize.getWidth() - titleWidth) / 2; // Center the title text horizontally
    doc.text(titleText, titleX, 20 + imgHeight / 2); // Adjust the y-coordinate for the title text

    doc.setFontSize(dataStyle.fontSize);
    doc.text(`Statement Date: ${getCurrentDate()}`, titleX, 40 + imgHeight / 2); // Adjust the y-coordinate for the statement date
    doc.line(
      20,
      45 + imgHeight,
      doc.internal.pageSize.getWidth() - 20,
      45 + imgHeight
    ); // Adjust the y-coordinate for the line

    const headers = [
      "Item",
      "Date",
      "Amount",
      "Type",
      "Category",
      "Payment Method",
    ];

    const data = transactions.map((transaction: any) => [
      transaction.name,
      formatStatementTime(transaction.createdAt),
      formatNumberWithCommas(transaction.amount),
      transaction.transactionType,
      transaction.category || "None",
      transaction.paymentMode || "Not Specified",
    ]);

    // const headers = [
    //   "Name",
    //   "Student_Date_Of_Birth",
    //   "Student_ID_No_Course",
    //   "Course",
    //   "Course_Total_Tuition_Fee",
    //   "Course_Intake",
    //   "Course_Year",
    //   "Course_Start_Month",
    //   "Commission_Rate",
    //   "Commission_Payable",
    // ];
    // const data = [
    //   {
    //     Name: "testing",
    //     Student_Date_Of_Birth: "testing",
    //     Student_ID_No_Course: "testing",
    //     Course: "testing",
    //     Course_Total_Tuition_Fee: "testing",
    //     Course_Intake: "testing",
    //     Course_Year: "testing",
    //     Course_Start_Month: "testing",
    //     Commission_Rate: "testing",
    //     Commission_Payable: "testing",
    //   },
    // ];

    doc.table(imgHeight, 60 + imgHeight, data, headers, {
      printHeaders: true,
      autoSize: true,
      margins: 4,
      headerBackgroundColor: "white",
    });

    // Add table with styling
    // @ts-ignore
    // doc.autoTable({
    //   startY: 60 + imgHeight,
    //   head: headers,
    //   body: data,
    //   styles: {
    //     head: headerStyle,
    //     body: dataStyle,
    //   },
    //   columnStyles: columnStyles, // Apply column styles
    //   // drawHeaderRow: (row: any, data: any) => {
    //   //   // Draw horizontal lines for header row
    //   //   doc.setDrawColor(0, 0, 0);
    //   //   doc.line(data.settings.margin.left, row.y, data.cursor.x, row.y);
    //   //   doc.line(data.cursor.x, row.y, data.cursor.x, row.y + row.height);
    //   // },
    //   // didDrawCell: (data: any) => {
    //   //   // Draw vertical lines for cells
    //   //   doc.setDrawColor(0, 0, 0);
    //   //   doc.line(
    //   //     data.col.x,
    //   //     data.row.y,
    //   //     data.col.x,
    //   //     data.row.y + data.row.height
    //   //   );
    //   // },
    //   didDrawPage: (data: any) => {
    //     doc.setFontSize(dataStyle.fontSize);
    //     const str = `Page ${data.pageCount}`;
    //     const pageWidth = doc.internal.pageSize.getWidth() - 20;
    //     const pageHeight = doc.internal.pageSize.getHeight() - 20;
    //     doc.text(str, data.settings.margin.left, pageHeight);
    //   },
    //   margin: { top: 50 + imgHeight, bottom: 20 },
    // });

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
