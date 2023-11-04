import React, { useState, useMemo } from "react";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import Sidebar from "../components/Sidebar";

const Table = () => {
  const data = useMemo(
    () => [
      {
        id: 1,
        name: "John Doe",
        email: "john@example.com",
        phone: "123-456-7890",
        user_role: 0,
        created_at: "2023-01-01 08:00:00",
        updated_at: "2023-01-02 09:00:00",
      },
      {
        id: 2,
        name: "Jane Smith",
        email: "jane@example.com",
        phone: "987-654-3210",
        user_role: 0,
        created_at: "2023-02-01 10:00:00",
        updated_at: "2023-02-02 11:00:00",
      },
      {
        id: 1,
        name: "John Doe",
        email: "john@example.com",
        phone: "123-456-7890",
        user_role: 0,
        created_at: "2023-01-01 08:00:00",
        updated_at: "2023-01-02 09:00:00",
      },
      {
        id: 2,
        name: "Jane Smith",
        email: "jane@example.com",
        phone: "987-654-3210",
        user_role: 0,
        created_at: "2023-02-01 10:00:00",
        updated_at: "2023-02-02 11:00:00",
      },
      {
        id: 1,
        name: "John Doe",
        email: "john@example.com",
        phone: "123-456-7890",
        user_role: 0,
        created_at: "2023-01-01 08:00:00",
        updated_at: "2023-01-02 09:00:00",
      },
      {
        id: 2,
        name: "Jane Smith",
        email: "jane@example.com",
        phone: "987-654-3210",
        user_role: 0,
        created_at: "2023-02-01 10:00:00",
        updated_at: "2023-02-02 11:00:00",
      },
      {
        id: 1,
        name: "John Doe",
        email: "john@example.com",
        phone: "123-456-7890",
        user_role: 0,
        created_at: "2023-01-01 08:00:00",
        updated_at: "2023-01-02 09:00:00",
      },
      {
        id: 2,
        name: "Jane Smith",
        email: "jane@example.com",
        phone: "987-654-3210",
        user_role: 0,
        created_at: "2023-02-01 10:00:00",
        updated_at: "2023-02-02 11:00:00",
      },
      {
        id: 1,
        name: "John Doe",
        email: "john@example.com",
        phone: "123-456-7890",
        user_role: 0,
        created_at: "2023-01-01 08:00:00",
        updated_at: "2023-01-02 09:00:00",
      },
      {
        id: 2,
        name: "Jane Smith",
        email: "jane@example.com",
        phone: "987-654-3210",
        user_role: 0,
        created_at: "2023-02-01 10:00:00",
        updated_at: "2023-02-02 11:00:00",
      },
      {
        id: 1,
        name: "John Doe",
        email: "john@example.com",
        phone: "123-456-7890",
        user_role: 0,
        created_at: "2023-01-01 08:00:00",
        updated_at: "2023-01-02 09:00:00",
      },
      {
        id: 2,
        name: "Jane Smith",
        email: "jane@example.com",
        phone: "987-654-3210",
        user_role: 0,
        created_at: "2023-02-01 10:00:00",
        updated_at: "2023-02-02 11:00:00",
      },
      {
        id: 1,
        name: "John Doe",
        email: "john@example.com",
        phone: "123-456-7890",
        user_role: 0,
        created_at: "2023-01-01 08:00:00",
        updated_at: "2023-01-02 09:00:00",
      },
      {
        id: 2,
        name: "Jane Smith",
        email: "jane@example.com",
        phone: "987-654-3210",
        user_role: 0,
        created_at: "2023-02-01 10:00:00",
        updated_at: "2023-02-02 11:00:00",
      },
      {
        id: 1,
        name: "John Doe",
        email: "john@example.com",
        phone: "123-456-7890",
        user_role: 0,
        created_at: "2023-01-01 08:00:00",
        updated_at: "2023-01-02 09:00:00",
      },
      {
        id: 2,
        name: "Jane Smith",
        email: "jane@example.com",
        phone: "987-654-3210",
        user_role: 0,
        created_at: "2023-02-01 10:00:00",
        updated_at: "2023-02-02 11:00:00",
      },
      {
        id: 1,
        name: "John Doe",
        email: "john@example.com",
        phone: "123-456-7890",
        user_role: 0,
        created_at: "2023-01-01 08:00:00",
        updated_at: "2023-01-02 09:00:00",
      },
      {
        id: 2,
        name: "Jane Smith",
        email: "jane@example.com",
        phone: "987-654-3210",
        user_role: 0,
        created_at: "2023-02-01 10:00:00",
        updated_at: "2023-02-02 11:00:00",
      },
      {
        id: 1,
        name: "John Doe",
        email: "john@example.com",
        phone: "123-456-7890",
        user_role: 0,
        created_at: "2023-01-01 08:00:00",
        updated_at: "2023-01-02 09:00:00",
      },
      {
        id: 2,
        name: "Jane Smith",
        email: "jane@example.com",
        phone: "987-654-3210",
        user_role: 0,
        created_at: "2023-02-01 10:00:00",
        updated_at: "2023-02-02 11:00:00",
      },
      {
        id: 1,
        name: "John Doe",
        email: "john@example.com",
        phone: "123-456-7890",
        user_role: 0,
        created_at: "2023-01-01 08:00:00",
        updated_at: "2023-01-02 09:00:00",
      },
      {
        id: 2,
        name: "Jane Smith",
        email: "jane@example.com",
        phone: "987-654-3210",
        user_role: 0,
        created_at: "2023-02-01 10:00:00",
        updated_at: "2023-02-02 11:00:00",
      },
      {
        id: 1,
        name: "John Doe",
        email: "john@example.com",
        phone: "123-456-7890",
        user_role: 0,
        created_at: "2023-01-01 08:00:00",
        updated_at: "2023-01-02 09:00:00",
      },
      {
        id: 2,
        name: "Jane Smith",
        email: "jane@example.com",
        phone: "987-654-3210",
        user_role: 0,
        created_at: "2023-02-01 10:00:00",
        updated_at: "2023-02-02 11:00:00",
      },
      {
        id: 1,
        name: "John Doe",
        email: "john@example.com",
        phone: "123-456-7890",
        user_role: 0,
        created_at: "2023-01-01 08:00:00",
        updated_at: "2023-01-02 09:00:00",
      },
      {
        id: 2,
        name: "Jane Smith",
        email: "jane@example.com",
        phone: "987-654-3210",
        user_role: 0,
        created_at: "2023-02-01 10:00:00",
        updated_at: "2023-02-02 11:00:00",
      },
      {
        id: 1,
        name: "John Doe",
        email: "john@example.com",
        phone: "123-456-7890",
        user_role: 0,
        created_at: "2023-01-01 08:00:00",
        updated_at: "2023-01-02 09:00:00",
      },
      {
        id: 2,
        name: "Jane Smith",
        email: "jane@example.com",
        phone: "987-654-3210",
        user_role: 0,
        created_at: "2023-02-01 10:00:00",
        updated_at: "2023-02-02 11:00:00",
      },
      {
        id: 1,
        name: "John Doe",
        email: "john@example.com",
        phone: "123-456-7890",
        user_role: 0,
        created_at: "2023-01-01 08:00:00",
        updated_at: "2023-01-02 09:00:00",
      },
      {
        id: 2,
        name: "Jane Smith",
        email: "jane@example.com",
        phone: "987-654-3210",
        user_role: 0,
        created_at: "2023-02-01 10:00:00",
        updated_at: "2023-02-02 11:00:00",
      },
      {
        id: 1,
        name: "John Doe",
        email: "john@example.com",
        phone: "123-456-7890",
        user_role: 0,
        created_at: "2023-01-01 08:00:00",
        updated_at: "2023-01-02 09:00:00",
      },
      {
        id: 2,
        name: "Jane Smith",
        email: "jane@example.com",
        phone: "987-654-3210",
        user_role: 0,
        created_at: "2023-02-01 10:00:00",
        updated_at: "2023-02-02 11:00:00",
      },
      {
        id: 1,
        name: "John Doe",
        email: "john@example.com",
        phone: "123-456-7890",
        user_role: 0,
        created_at: "2023-01-01 08:00:00",
        updated_at: "2023-01-02 09:00:00",
      },
      {
        id: 2,
        name: "Jane Smith",
        email: "jane@example.com",
        phone: "987-654-3210",
        user_role: 0,
        created_at: "2023-02-01 10:00:00",
        updated_at: "2023-02-02 11:00:00",
      },
      {
        id: 1,
        name: "John Doe",
        email: "john@example.com",
        phone: "123-456-7890",
        user_role: 0,
        created_at: "2023-01-01 08:00:00",
        updated_at: "2023-01-02 09:00:00",
      },
      {
        id: 2,
        name: "Jane Smith",
        email: "jane@example.com",
        phone: "987-654-3210",
        user_role: 0,
        created_at: "2023-02-01 10:00:00",
        updated_at: "2023-02-02 11:00:00",
      },
      {
        id: 1,
        name: "John Doe",
        email: "john@example.com",
        phone: "123-456-7890",
        user_role: 0,
        created_at: "2023-01-01 08:00:00",
        updated_at: "2023-01-02 09:00:00",
      },
      {
        id: 2,
        name: "Jane Smith",
        email: "jane@example.com",
        phone: "987-654-3210",
        user_role: 0,
        created_at: "2023-02-01 10:00:00",
        updated_at: "2023-02-02 11:00:00",
      },
      // ... more users
    ],
    []
  );

  const [sorting, setSorting] = useState([]);
  const [filtering, setFiltering] = useState("");

  const columns = [
    {
      header: "ID",
      accessorKey: "id",
      footer: "id",
    },
    {
      header: "Name",
      accessorKey: "name",
      footer: "name",
    },
    {
      header: "Email",
      accessorKey: "email",
      footer: "email",
    },
    {
      header: "User Role",
      accessorKey: "user_role",
      footer: "user_role",
    },
    {
      header: "created_at",
      accessorKey: "created_at",
      footer: "created_at",
    },
    {
      header: "updated_at",
      accessorKey: "updated_at",
      footer: "updated_at",
    },
    {
      header: "EDIT",
      accessorKey: "EDIT",
    },
    {
      header: "Delete",
      accessorKey: "delete",
      cell: () => <button className="text-red-600">🗑️</button>,
    },
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting: sorting,
      globalFilter: filtering,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setFiltering,
  });

  return (
    <div className="flex h-[100vh] bg-white">
      {/* Sidebar */}
      <Sidebar />
      {/* Table */}
      <div className="flex flex-col items-center h-full w-full">
        <div className="bg-white shadow-md rounded-lg p-4 w-full max-w-screen-xl">
          <input
            type="text"
            value={filtering}
            className="block w-full px-4 py-2 rounded-md border border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            placeholder="Search anything..."
            onChange={(e) => setFiltering(e.target.value)}
          />
          <table className="min-w-full mt-4 divide-y divide-gray-200">
            <thead className="bg-gray-50">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                      onClick={header.column.getToggleSortingHandler()}
                    >
                      <div>
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        {
                          {
                            asc: "🔼",
                            desc: "🔽",
                          }[header.column.getIsSorted() ?? null]
                        }
                      </div>
                    </th>
                  ))}
                </tr>
              ))}
            </thead>

            <tbody className="bg-white divide-y divide-gray-200">
              {table.getRowModel().rows.map((row) => (
                <tr key={row.id} className="hover:bg-gray-50">
                  {row.getVisibleCells().map((cell) => (
                    <td
                      className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"
                      key={cell.id}
                    >
                      {" "}
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex justify-between items-center mt-4">
            <div>
              <button
                className="bg-gray-400 text-white rounded-l-md px-4 py-2 hover:bg-blue-600"
                onClick={() => table.setPageIndex(0)}
              >
                First Page
              </button>
              <button
                className="bg-gray-400 text-white border-r border-l border-blue-600 px-4 py-2 hover:bg-blue-600"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
              >
                Prev
              </button>
              <button
                className="bg-gray-400 text-white border-r border-blue-600 px-4 py-2 hover:bg-blue-600"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
              >
                Next
              </button>
              <button
                className="bg-gray-400 text-white rounded-r-md px-4 py-2 hover:bg-blue-600"
                onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              >
                Last Page
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Table;
