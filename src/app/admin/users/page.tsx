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
    fetch("/api/admin/users")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch users");
        return res.json();
      })
      .then((data) => data.users)
      .then(setUsers)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  };

  useEffect(() => fetchUsers, []);

  const updateRole = (userId: number, role: string) => {
    setUpdatingId(userId);
    setError(null);
    fetch("/api/admin/users", {
      method: "PATCH",
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
    <div className="min-h-screen bg-soft-gray">
      <aside className="fixed left-0 top-0 z-40 h-full w-64 bg-navy text-white">
        <div className="flex h-16 items-center justify-between border-b border-white/10 px-4">
          <span className="font-heading font-bold">Admin</span>
        </div>
        <nav className="p-4 space-y-2">
          <Link
            href="/admin"
            className="flex items-center gap-3 rounded-lg px-4 py-3 text-white/80 hover:bg-white/10"
          >
            Dashboard
          </Link>
          <Link
            href="/admin/orders"
            className="flex items-center gap-3 rounded-lg px-4 py-3 text-white/80 hover:bg-white/10"
          >
            Orders
          </Link>
          <Link
            href="/admin/products"
            className="flex items-center gap-3 rounded-lg px-4 py-3 text-white/80 hover:bg-white/10"
          >
            Products
          </Link>
          <Link
            href="/admin/users"
            className="flex items-center gap-3 rounded-lg bg-red/20 px-4 py-3 font-medium text-red"
          >
            <Users className="h-5 w-5" />
            Users & Roles
          </Link>
        </nav>
      </aside>

      <main className="ml-64 p-8">
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
          <div className="mb-6 rounded-lg bg-red/10 p-4 text-red">{error}</div>
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
      </main>
    </div>
  );
}
