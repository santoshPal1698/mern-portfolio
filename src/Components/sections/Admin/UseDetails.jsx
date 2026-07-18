import { useState, useEffect, useMemo } from "react";
import UseDetails from "./jsonApi";

/**
 * Reference solution for the interview task:
 * Fetch users from JSONPlaceholder, display in a table with
 * custom (no-library) search, sort, and pagination logic.
 */

const API_URL = "https://jsonplaceholder.typicode.com/users";
const PAGE_SIZE_OPTIONS = [5, 10, 20];

// --- helper: read nested fields like "company.name" ---
function getField(obj, path) {
  return path.split(".").reduce((acc, key) => (acc ? acc[key] : ""), obj);
}

export default function UserTable() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: "name", direction: "asc" });
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  // --- 1. Fetch data ---
  useEffect(() => {
    let cancelled = false;
    async function fetchUsers() {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch(API_URL);
        if (!res.ok) throw new Error(`Request failed with status ${res.status}`);
        const data = await res.json();
        if (!cancelled) setUsers(data);
      } catch (err) {
        if (!cancelled) setError(err.message || "Something went wrong");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchUsers();
    return () => {
      cancelled = true;
    };
  }, []);


  // --- 2. Search (custom logic) ---
  const filteredUsers = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    if (!term) return users;
    return users.filter((user) => {
      const name = user.name?.toLowerCase() || "";
      const email = user.email?.toLowerCase() || "";
      const company = user.company?.name?.toLowerCase() || "";
      return (
        name.includes(term) || email.includes(term) || company.includes(term)
      );
    });
  }, [users, searchTerm]);


  // --- 3. Sort (custom logic, runs on top of filtered data) ---
  const sortedUsers = useMemo(() => {
    const { key, direction } = sortConfig;
    if (!key) return filteredUsers;

    const sortable = [...filteredUsers]; // never mutate state directly
    sortable.sort((a, b) => {
      const valA = getField(a, key);
      const valB = getField(b, key);

      if (valA == null) return 1;
      if (valB == null) return -1;


      const comparison =
        typeof valA === "number" && typeof valB === "number"
          ? valA - valB
          : String(valA).toLowerCase().localeCompare(String(valB).toLowerCase());

      return direction === "asc" ? comparison : -comparison;
    });

    return sortable;
  }, [filteredUsers, sortConfig]);

  // --- 4. Pagination (custom logic, runs on top of filtered + sorted data) ---
  const totalPages = Math.max(1, Math.ceil(sortedUsers.length / pageSize));

  const paginatedUsers = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return sortedUsers.slice(start, start + pageSize);
  }, [sortedUsers, currentPage, pageSize]);

  // Reset to page 1 whenever the search term, sort, or page size changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, pageSize, sortConfig]);

  // Clamp current page if data shrinks (e.g., after filtering)
  useEffect(() => {
    if (currentPage > totalPages) setCurrentPage(totalPages);
  }, [totalPages, currentPage]);

  function handleSort(key) {
    setSortConfig((prev) => {
      if (prev.key === key) {
        return { key, direction: prev.direction === "asc" ? "desc" : "asc" };
      }
      return { key, direction: "asc" };
    });
  }

  function sortIndicator(key) {
    if (sortConfig.key !== key) return "";
    return sortConfig.direction === "asc" ? " \u25B2" : " \u25BC";
  }

  const columns = [
    { key: "id", label: "ID" },
    { key: "name", label: "Name" },
    { key: "username", label: "Username" },
    { key: "email", label: "Email" },
    { key: "phone", label: "Phone" },
    { key: "website", label: "Website" },
    { key: "company.name", label: "Company" },
  ];

  if (loading) {
    return <div className="p-6 text-slate-500">Loading users…</div>;
  }

  if (error) {
    return (
      <div className="p-6 text-red-600">
        Failed to load users: {error}
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-4">
        {/* <UseDetails /> */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <input
          type="text"
          placeholder="Search by name, email, or company…"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border border-slate-300 rounded-md px-3 py-2 w-72 text-sm focus:outline-none focus:ring-2 focus:ring-slate-400"
        />

        <label className="text-sm text-slate-600 flex items-center gap-2">
          Rows per page:
          <select
            value={pageSize}
            onChange={(e) => setPageSize(Number(e.target.value))}
            className="border border-slate-300 rounded-md px-2 py-1 text-sm"
          >
            {PAGE_SIZE_OPTIONS.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="overflow-x-auto border border-slate-200 rounded-lg">
        <table className="w-full text-sm text-left border-collapse">
          <thead className="bg-slate-100 text-slate-700">
            <tr>
              {columns.map((col) => (
                <th
                  key={col.key}
                  onClick={() => handleSort(col.key)}
                  className="px-3 py-2 cursor-pointer select-none whitespace-nowrap hover:bg-slate-200"
                >
                  {col.label}
                  {sortIndicator(col.key)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginatedUsers.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="px-3 py-6 text-center text-slate-500">
                  No matching users found.
                </td>
              </tr>
            ) : (
              paginatedUsers.map((user) => (
                <tr key={user.id} className="border-t border-slate-200 hover:bg-slate-50">
                  <td className="px-3 py-2">{user.id}</td>
                  <td className="px-3 py-2">{user.name}</td>
                  <td className="px-3 py-2">{user.username}</td>
                  <td className="px-3 py-2">{user.email}</td>
                  <td className="px-3 py-2">{user.phone}</td>
                  <td className="px-3 py-2">{user.website}</td>
                  <td className="px-3 py-2">{user.company?.name}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between text-sm text-slate-600">
        <span>
          Showing {sortedUsers.length === 0 ? 0 : (currentPage - 1) * pageSize + 1}
          {"–"}
          {Math.min(currentPage * pageSize, sortedUsers.length)} of {sortedUsers.length}
        </span>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 border border-slate-300 rounded-md disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-100"
          >
            Previous
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="px-3 py-1 border border-slate-300 rounded-md disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-100"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}