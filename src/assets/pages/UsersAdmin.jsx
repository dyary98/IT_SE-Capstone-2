import React, { useState, useMemo, useEffect } from "react";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import Sidebar from "../components/Sidebar";
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";
import { db } from "../email_signin/config";
import { Link } from "react-router-dom";
const Table = () => {
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, "users")); // Replace "users" with your collection name
      const users = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setUserData(users);
    };

    fetchData();
  }, []);

  const data = useMemo(() => userData, [userData]);

  const deleteUser = async (userId) => {
    try {
      await deleteDoc(doc(db, "users", userId));
      setUserData(userData.filter((user) => user.id !== userId));
    } catch (error) {
      console.error("Error deleting user: ", error);
    }
  };
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
      accessorKey: "fullName",
      footer: "name",
    },
    {
      header: "Email",
      accessorKey: "email",
      footer: "email",
    },
    {
      header: "User Role",
      accessorKey: "userRole",
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
      cell: (info) => (
        <button
          className="text-red-600"
          onClick={() => deleteUser(info.row.original.id)}
        >
          🗑️
        </button>
      ),
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
    <div className="flex h-[120vh] bg-gray-100">
      {" "}
      {/* Updated background color for a lighter look */}
      <Sidebar />
      <div className="flex flex-col items-center h-full w-full pl-72 py-4 pr-8">
        <div className="bg-white p-4 w-full max-w-screen-xl">
          <div className="bg-white p-4 w-full max-w-screen-xl">
            {/* Add the new user button */}
            <Link
              to="/admin/users/create"
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 mb-4"
            >
              Create New User
            </Link>
            {/* ... (rest of your table and search input) */}
          </div>
          {/* Search input styling updated for a flat look */}
          <input
            type="text"
            value={filtering}
            className="block w-full px-4 py-2 rounded-md border border-gray-300 focus:border-blue-500 focus:outline-none"
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
