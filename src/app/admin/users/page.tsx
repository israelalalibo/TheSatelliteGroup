"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ChevronRight, Users, Shield, User } from "lucide-react";

interface UserRow {
  id: number;
  email: string;
  fullName: string | null;
  phone: string | null;
  accountType: string;
  role: string;
  createdAt: string;
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState<UserRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [updatingId, setUpdatingId] = useState<number | null>(null);

  const fetchUsers = () => {
    setLoading(true);
    setError(null);
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15000);
    fetch("/api/admin/users", { credentials: "include", signal: controller.signal })
      .then(async (res) => {
        const text = await res.text();
        let data: { users?: unknown[]; error?: string } = {};
        try {
          data = text ? JSON.parse(text) : {};
        } catch {
          throw new Error(res.ok ? "Invalid response" : `Server error (${res.status})`);
        }
        if (!res.ok) {
          throw new Error(data.error || `Failed to fetch users (${res.status})`);
        }
        setUsers(Array.isArray(data.users) ? (data.users as UserRow[]) : []);
      })
      .catch((e) => setError(e.name === "AbortError" ? "Request timed out. Please try again." : e.message))
      .finally(() => {
        clearTimeout(timeout);
        setLoading(false);
      });
  };

  useEffect(() => { fetchUsers(); }, []);

  const updateRole = (userId: number, role: string) => {
    setUpdatingId(userId);
    setError(null);
    fetch("/api/admin/users", {
      method: "PATCH",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, role }),
    })
      .then(async (res) => {
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Update failed");
        fetchUsers();
      })
      .catch((e) => setError(e.message))
      .finally(() => setUpdatingId(null));
  };

  const formatDate = (dateStr: string) => {
    try {
      return new Date(dateStr).toLocaleDateString("en-NG", {
        dateStyle: "medium",
      });
    } catch {
      return dateStr;
    }
  };

  return (
    <>
        <nav className="mb-8 flex items-center gap-2 text-sm text-charcoal/70">
          <Link href="/" className="hover:text-red">Home</Link>
          <ChevronRight className="h-4 w-4" />
          <Link href="/admin" className="hover:text-red">Admin</Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-navy">Users & Roles</span>
        </nav>

        <h1 className="font-heading text-section font-bold text-navy mb-2">
          Users & Roles
        </h1>
        <p className="text-charcoal/70 mb-8">
          Assign admin role to users. Admins can access the admin area and manage orders.
        </p>

        {error && (
          <div className="mb-6 rounded-lg border border-red/30 bg-red/10 p-4">
            <p className="font-medium text-red">{error}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => fetchUsers()}
                className="rounded-lg bg-red px-4 py-2 text-sm font-medium text-white hover:bg-red-dark"
              >
                Try again
              </button>
              {error.toLowerCase().includes("access denied") && (
                <Link
                  href="/auth/login?redirect=/admin/users"
                  className="rounded-lg border border-red px-4 py-2 text-sm font-medium text-red hover:bg-red/10"
                >
                  Log in again
                </Link>
              )}
            </div>
          </div>
        )}

        {loading && <p className="text-charcoal/70">Loading users...</p>}

        {!loading && !error && users.length === 0 && (
          <div className="rounded-xl border border-charcoal/10 bg-white p-12 text-center">
            <p className="text-charcoal/70">No users yet</p>
          </div>
        )}

        {!loading && !error && users.length > 0 && (
          <div className="overflow-hidden rounded-xl border border-charcoal/10 bg-white shadow-sm">
            <table className="w-full">
              <thead>
                <tr className="border-b border-charcoal/10 bg-soft-gray/50">
                  <th className="px-4 py-3 text-left font-semibold text-navy">User</th>
                  <th className="px-4 py-3 text-left font-semibold text-navy">Role</th>
                  <th className="px-4 py-3 text-left font-semibold text-navy">Joined</th>
                  <th className="px-4 py-3 text-left font-semibold text-navy">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr
                    key={user.id}
                    className="border-b border-charcoal/5 hover:bg-soft-gray/30"
                  >
                    <td className="px-4 py-3">
                      <div>
                        <p className="font-medium text-navy">
                          {user.fullName || "—"}
                        </p>
                        <p className="text-sm text-charcoal/70">{user.email}</p>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium ${
                          user.role === "admin"
                            ? "bg-red/20 text-red"
                            : "bg-charcoal/10 text-charcoal/70"
                        }`}
                      >
                        {user.role === "admin" ? (
                          <Shield className="h-3.5 w-3.5" />
                        ) : (
                          <User className="h-3.5 w-3.5" />
                        )}
                        {user.role}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-charcoal/70">
                      {formatDate(user.createdAt)}
                    </td>
                    <td className="px-4 py-3">
                      {updatingId === user.id ? (
                        <span className="text-sm text-charcoal/50">
                          Updating...
                        </span>
                      ) : (
                        <select
                          value={user.role}
                          onChange={(e) =>
                            updateRole(user.id, e.target.value)
                          }
                          className="rounded-lg border border-charcoal/20 px-3 py-2 text-sm focus:border-red focus:outline-none focus:ring-1 focus:ring-red"
                        >
                          <option value="user">User</option>
                          <option value="admin">Admin</option>
                        </select>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
    </>
  );
}
