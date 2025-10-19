"use client";

import { useState } from "react";
import DataTable from "./_components/data-table";
import PasteArea from "./_components/paste-area";

export type AKFormType = {
  id: string;
  po: string; // 발주서 id
  partNo: string; // 품목명
  pallet: number; // 팔레트 개수, 단위: PG
  subTotal: number; // 개수, 단위: EA
  netWeight: number; // 순중량, 단위: KGS
  grossWeight: number; // 총중량, 단위: KGS
};

const AKFormPage = () => {
  const [tableData, setTableData] = useState<AKFormType[]>([]);

  return (
    <div>
      <PasteArea setTableData={setTableData} />
      <DataTable data={tableData} />
    </div>
  );
};

export default AKFormPage;
