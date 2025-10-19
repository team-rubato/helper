"use client";

import { Textarea } from "@/components/ui/textarea";
import React, { SetStateAction } from "react";
import { AKFormType } from "../page";
import { strToNum } from "@/lib/utils";

type PasteAreaProps = {
  setTableData: React.Dispatch<SetStateAction<AKFormType[]>>;
};

const PasteArea = ({ setTableData }: PasteAreaProps) => {
  const onPaste = (e: React.ClipboardEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    try {
      const clipboardData = e.clipboardData.getData("text");
      const rowDatas = clipboardData.split("\n");
      const formattedRows = rowDatas.map((row) => row.split("\t"));

      const newTableData: AKFormType[] = [];
      formattedRows.forEach((row, idx) => {
        if (idx === 0) return;

        const po = row[1],
          partNo = row[2],
          pallet = row[9],
          subTotal = row[12],
          netWeight = row[14],
          grossWeight = row[16];

        if (partNo === "") return;

        newTableData.push({
          id: `${po}_${partNo}`,
          po,
          partNo,
          pallet: strToNum(pallet),
          subTotal: strToNum(subTotal),
          netWeight: strToNum(netWeight),
          grossWeight: strToNum(grossWeight),
        });

        setTableData(newTableData);
      });
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Textarea
      className="resize-none"
      placeholder="엑셀의 테이블을 붙여넣어주세요."
      autoComplete="off"
      onPaste={onPaste}
    />
  );
};

export default PasteArea;
