import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function generateSlug(companyName: string): string {
  const base = companyName
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim()

  const date = new Date()
  const month = date.toLocaleString("pt-BR", { month: "short" }).replace(".", "")
  const year = date.getFullYear()

  return `${base}-${month}-${year}`
}

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value)
}

export function getLeadTemperature(score: number): "HOT" | "WARM" | "COOL" | "COLD" {
  if (score >= 80) return "HOT"
  if (score >= 60) return "WARM"
  if (score >= 40) return "COOL"
  return "COLD"
}

export function getTemperatureColor(temp: string): string {
  switch (temp) {
    case "HOT": return "text-red-500"
    case "WARM": return "text-orange-500"
    case "COOL": return "text-blue-400"
    case "COLD": return "text-blue-700"
    default: return "text-gray-500"
  }
}
