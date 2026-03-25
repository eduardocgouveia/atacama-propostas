"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  FileText,
  Users,
  Settings,
  LogOut,
  Plus,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/proposals", label: "Propostas", icon: FileText },
  { href: "/prospects", label: "Prospects", icon: Users },
  { href: "/settings", label: "Configuracoes", icon: Settings },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="flex h-full w-64 flex-col border-r border-neutral-800 bg-neutral-950">
      {/* Logo */}
      <div className="flex h-16 items-center border-b border-neutral-800 px-6">
        <span className="text-lg font-bold tracking-tight">
          ATACAMA<span className="text-neutral-500"> PROPOSTAS</span>
        </span>
      </div>

      {/* New Proposal CTA */}
      <div className="p-4">
        <Link href="/proposals/new">
          <Button variant="orange" className="w-full gap-2">
            <Plus className="h-4 w-4" />
            Nova Proposta
          </Button>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 px-3">
        {navItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + "/")
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "bg-neutral-800 text-white"
                  : "text-neutral-400 hover:bg-neutral-900 hover:text-white"
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="border-t border-neutral-800 p-4">
        <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-neutral-400 transition-colors hover:bg-neutral-900 hover:text-white">
          <LogOut className="h-4 w-4" />
          Sair
        </button>
      </div>
    </aside>
  )
}
