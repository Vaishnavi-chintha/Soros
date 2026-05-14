"use client";

import { TechCategory, REQUIRED_CATEGORIES } from "@/lib/types";
import { TECH_CATALOG, CATEGORY_LABELS } from "@/lib/tech-catalog";
import { useStackStore } from "@/store/stack-store";
import TechChip from "./TechChip";
import {
  Layers, Server, Database, Palette, Shield, GitBranch, Webhook,
  Binary, Cloud, CheckCircle, Package, RefreshCw, HardDrive, Activity,
  CreditCard, Lock, Zap, FileText, Mail, ClipboardCheck, BarChart3,
  Gauge, Smartphone, Brain,
} from "lucide-react";

const ICONS: Record<TechCategory, React.ReactNode> = {
  "Frontend Frameworks": <Layers size={16} />,
  "Backend & Runtimes": <Server size={16} />,
  "Databases (SQL & NoSQL)": <Database size={16} />,
  "Styling & Design Systems": <Palette size={16} />,
  "Authentication & Identity": <Shield size={16} />,
  "State Management": <GitBranch size={16} />,
  "API Architecture & Protocols": <Webhook size={16} />,
  "ORMs & Database Tooling": <Binary size={16} />,
  "Infrastructure & Deployment": <Cloud size={16} />,
  "Testing & Quality Assurance": <CheckCircle size={16} />,
  "Package Managers & Build Tools": <Package size={16} />,
  "CI/CD & DevOps": <RefreshCw size={16} />,
  "Storage & CDN": <HardDrive size={16} />,
  "Monitoring, Logging & Observability": <Activity size={16} />,
  "Payment & Subscription Processing": <CreditCard size={16} />,
  "Security & Encryption": <Lock size={16} />,
  "Real-time Communication": <Zap size={16} />,
  "Headless CMS": <FileText size={16} />,
  "Email & Messaging Services": <Mail size={16} />,
  "Form Handling & Validation": <ClipboardCheck size={16} />,
  "Analytics & SEO": <BarChart3 size={16} />,
  "Caching & Performance": <Gauge size={16} />,
  "Mobile & Cross-Platform Development": <Smartphone size={16} />,
  "Machine Learning & AI Integration": <Brain size={16} />,
};

const isRequired = (cat: TechCategory) => REQUIRED_CATEGORIES.includes(cat);

interface CategoryPanelProps {
  category: TechCategory;
}

export default function CategoryPanel({ category }: CategoryPanelProps) {
  const selected = useStackStore((s) => s.selected);
  const select = useStackStore((s) => s.select);
  const remove = useStackStore((s) => s.remove);
  const technologies = TECH_CATALOG[category];
  const selectedId = selected[category];

  return (
    <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 backdrop-blur-sm">
      {/* Header */}
      <div className="mb-3 flex items-center gap-2">
        <span className="text-[#FA5D19]">{ICONS[category]}</span>
        <h3 className="text-sm font-semibold uppercase tracking-wider text-zinc-300">
          {CATEGORY_LABELS[category]}
        </h3>
        {selectedId ? (
          <span className="ml-auto rounded-full bg-[#FA5D19]/10 px-2 py-0.5 text-[10px] font-medium text-[#FA5D19]">
            Set
          </span>
        ) : isRequired(category) ? (
          <span className="ml-auto rounded-full bg-red-500/10 px-2 py-0.5 text-[10px] font-medium text-red-400">
            Required
          </span>
        ) : (
          <span className="ml-auto rounded-full bg-white/[0.03] px-2 py-0.5 text-[10px] font-medium text-zinc-600">
            Optional
          </span>
        )}
      </div>

      {/* Chips */}
      <div className="flex flex-wrap gap-2">
        {technologies.map((tech) => (
          <TechChip
            key={tech.id}
            name={tech.name}
            selected={selectedId === tech.id}
            onClick={() => {
              if (selectedId === tech.id) {
                remove(category);
              } else {
                select(category, tech.id);
              }
            }}
          />
        ))}
      </div>
    </div>
  );
}
