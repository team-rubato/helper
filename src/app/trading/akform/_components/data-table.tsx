"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Copy, CopyCheck } from "lucide-react";
import { AKFormType } from "../page";
import { formattedNum } from "@/lib/utils";
import { useState, useMemo } from "react";
import { toast } from "sonner";

type TotalDataType = {
  partNo: string;
  pallet: number;
  subTotal: number;
  netWeight: number;
  grossWeight: number;
};

const CopyButton = <T,>({ row }: { row: { getValue: (key: string) => T } }) => {
  const [copied, setCopied] = useState(false);

  const onCopy = () => {
    const pallet = row.getValue("pallet") as number;
    const subTotal = row.getValue("subTotal") as number;
    const netWeight = row.getValue("netWeight") as number;
    const grossWeight = row.getValue("grossWeight") as number;

    const text = `${formattedNum(pallet)}PG   ${formattedNum(
      subTotal
    )}EA   ${formattedNum(netWeight)}KGS   ${formattedNum(grossWeight)}KGS`;
    navigator.clipboard.writeText(text);
    toast.success(`${text}가 복사되었습니다.`);

    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Button
      variant="outline"
      size="icon-sm"
      className="cursor-pointer"
      onClick={onCopy}
    >
      {copied ? <CopyCheck /> : <Copy />}
    </Button>
  );
};

const columns: ColumnDef<AKFormType>[] = [
  {
    accessorKey: "po",
    header: "PO#",
    cell: ({ row }) => <div className="capitalize">{row.getValue("po")}</div>,
  },
  {
    accessorKey: "partNo",
    header: "Part No",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("partNo")}</div>
    ),
  },
  {
    accessorKey: "pallet",
    header: "Pallet",
    cell: ({ row }) => {
      const value = row.getValue("pallet") as number;
      const onCopy = () => {
        const text = formattedNum(value);
        navigator.clipboard.writeText(text);
        toast.success(`${text}가 복사되었습니다.`);
      };
      return (
        <div className="capitalize">
          <Button variant="ghost" className="cursor-pointer" onClick={onCopy}>
            {formattedNum(value)}PG
          </Button>
        </div>
      );
    },
  },
  {
    accessorKey: "subTotal",
    header: "SUB Total",
    cell: ({ row }) => {
      const value = row.getValue("subTotal") as number;
      const onCopy = () => {
        const text = formattedNum(value);
        navigator.clipboard.writeText(text);
        toast.success(`${text}가 복사되었습니다.`);
      };
      return (
        <div className="capitalize">
          <Button variant="ghost" className="cursor-pointer" onClick={onCopy}>
            {formattedNum(value)}EA
          </Button>
        </div>
      );
    },
  },
  {
    accessorKey: "netWeight",
    header: "Net Weight",
    cell: ({ row }) => {
      const value = row.getValue("netWeight") as number;
      const onCopy = () => {
        const text = formattedNum(value);
        navigator.clipboard.writeText(text);
        toast.success(`${text}가 복사되었습니다.`);
      };
      return (
        <div className="capitalize">
          <Button variant="ghost" className="cursor-pointer" onClick={onCopy}>
            {formattedNum(value)}KGS
          </Button>
        </div>
      );
    },
  },
  {
    accessorKey: "grossWeight",
    header: "Gross Weight",
    cell: ({ row }) => {
      const value = row.getValue("grossWeight") as number;
      const onCopy = () => {
        const text = formattedNum(value);
        navigator.clipboard.writeText(text);
        toast.success(`${text}가 복사되었습니다.`);
      };
      return (
        <div className="capitalize">
          <Button variant="ghost" className="cursor-pointer" onClick={onCopy}>
            {formattedNum(value)}KGS
          </Button>
        </div>
      );
    },
  },
  {
    id: "copy",
    enableHiding: false,
    cell: ({ row }) => <CopyButton row={row} />,
  },
];

const totalColumns: ColumnDef<TotalDataType>[] = [
  {
    accessorKey: "partNo",
    header: "Part No",
    cell: ({ row }) => (
      <div className="capitalize font-semibold">{row.getValue("partNo")}</div>
    ),
  },
  {
    accessorKey: "pallet",
    header: "Pallet",
    cell: ({ row }) => {
      const value = row.getValue("pallet") as number;
      const onCopy = () => {
        const text = formattedNum(value);
        navigator.clipboard.writeText(text);
        toast.success(`${text}가 복사되었습니다.`);
      };
      return (
        <div className="capitalize">
          <Button
            variant="ghost"
            className="cursor-pointer font-semibold"
            onClick={onCopy}
          >
            {formattedNum(value)}PG
          </Button>
        </div>
      );
    },
  },
  {
    accessorKey: "subTotal",
    header: "SUB Total",
    cell: ({ row }) => {
      const value = row.getValue("subTotal") as number;
      const onCopy = () => {
        const text = formattedNum(value);
        navigator.clipboard.writeText(text);
        toast.success(`${text}가 복사되었습니다.`);
      };
      return (
        <div className="capitalize">
          <Button
            variant="ghost"
            className="cursor-pointer font-semibold"
            onClick={onCopy}
          >
            {formattedNum(value)}EA
          </Button>
        </div>
      );
    },
  },
  {
    accessorKey: "netWeight",
    header: "Net Weight",
    cell: ({ row }) => {
      const value = row.getValue("netWeight") as number;
      const onCopy = () => {
        const text = formattedNum(value);
        navigator.clipboard.writeText(text);
        toast.success(`${text}가 복사되었습니다.`);
      };
      return (
        <div className="capitalize">
          <Button
            variant="ghost"
            className="cursor-pointer font-semibold"
            onClick={onCopy}
          >
            {formattedNum(value)}KGS
          </Button>
        </div>
      );
    },
  },
  {
    accessorKey: "grossWeight",
    header: "Gross Weight",
    cell: ({ row }) => {
      const value = row.getValue("grossWeight") as number;
      const onCopy = () => {
        const text = formattedNum(value);
        navigator.clipboard.writeText(text);
        toast.success(`${text}가 복사되었습니다.`);
      };
      return (
        <div className="capitalize">
          <Button
            variant="ghost"
            className="cursor-pointer font-semibold"
            onClick={onCopy}
          >
            {formattedNum(value)}KGS
          </Button>
        </div>
      );
    },
  },
  {
    id: "copy",
    enableHiding: false,
    cell: ({ row }) => <CopyButton row={row} />,
  },
];

type DataTableProps = {
  data: AKFormType[];
};

const DataTable = ({ data }: DataTableProps) => {
  const [filterInput, setFilterInput] = useState("");

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  // 필터된 데이터로 합계 계산
  const filteredRows = table.getRowModel().rows;
  const totalData = useMemo(() => {
    if (filteredRows.length === 0) return null;

    const uniquePartNos = new Set(
      filteredRows.map((row) => row.getValue("partNo"))
    );

    // PartNo가 모두 같을 때만 합계 테이블 표시
    if (uniquePartNos.size !== 1) return null;

    return [
      {
        partNo: filteredRows[0].getValue("partNo") as string,
        pallet: filteredRows.reduce(
          (sum, row) => sum + (row.getValue("pallet") as number),
          0
        ),
        subTotal: filteredRows.reduce(
          (sum, row) => sum + (row.getValue("subTotal") as number),
          0
        ),
        netWeight: filteredRows.reduce(
          (sum, row) => sum + (row.getValue("netWeight") as number),
          0
        ),
        grossWeight: filteredRows.reduce(
          (sum, row) => sum + (row.getValue("grossWeight") as number),
          0
        ),
      },
    ];
  }, [filteredRows]);

  const totalTable = useReactTable({
    data: totalData || [],
    columns: totalColumns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter Part No..."
          value={filterInput}
          onChange={(event) => {
            const value = event.target.value;
            setFilterInput(value);
            table.getColumn("partNo")?.setFilterValue(value.trim());
          }}
          onFocus={(e) => e.target.select()}
          className="max-w-sm"
        />
      </div>
      {/* Data Table */}
      <div className="overflow-hidden rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map(({ id, headers }) => {
              return (
                <TableRow key={id}>
                  {headers.map(({ id, isPlaceholder, column, getContext }) => {
                    return (
                      <TableHead key={id}>
                        {isPlaceholder
                          ? null
                          : flexRender(column.columnDef.header, getContext())}
                      </TableHead>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {/* Total Data Table */}
      {totalData && (
        <div className="overflow-hidden rounded-md border mt-4">
          <Table>
            <TableHeader>
              {totalTable.getHeaderGroups().map(({ id, headers }) => {
                return (
                  <TableRow key={id}>
                    {headers.map(
                      ({ id, isPlaceholder, column, getContext }) => {
                        return (
                          <TableHead key={id}>
                            {isPlaceholder
                              ? null
                              : flexRender(
                                  column.columnDef.header,
                                  getContext()
                                )}
                          </TableHead>
                        );
                      }
                    )}
                  </TableRow>
                );
              })}
            </TableHeader>
            <TableBody>
              {totalTable.getRowModel().rows.map((row) => (
                <TableRow key={row.id} className="bg-muted/50">
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
};

export default DataTable;
