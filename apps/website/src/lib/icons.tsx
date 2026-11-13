import {
  ArrowRight,
  BadgeCheck,
  BookOpen,
  Briefcase,
  Building2,
  CalendarClock,
  CheckCircle2,
  Compass,
  FileCheck2,
  FileSearch,
  Fingerprint,
  Globe2,
  GraduationCap,
  HandHeart,
  History,
  Languages,
  Layers,
  Lock,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Plane,
  Scale,
  ShieldCheck,
  Sparkles,
  Users,
  Wallet,
  type LucideIcon,
} from 'lucide-react';

/**
 * Single icon registry. Content modules reference icons by stable string keys so
 * the CMS can later swap artwork without touching component code.
 */
export const iconRegistry: Record<string, LucideIcon> = {
  graduation: GraduationCap,
  briefcase: Briefcase,
  plane: Plane,
  building: Building2,
  users: Users,
  'file-check': FileCheck2,
  'shield-check': ShieldCheck,
  lock: Lock,
  history: History,
  layers: Layers,
  hand: HandHeart,
  book: BookOpen,
  mail: Mail,
  message: MessageCircle,
  phone: Phone,
  'map-pin': MapPin,
  compass: Compass,
  globe: Globe2,
  scale: Scale,
  wallet: Wallet,
  sparkles: Sparkles,
  check: CheckCircle2,
  badge: BadgeCheck,
  calendar: CalendarClock,
  search: FileSearch,
  fingerprint: Fingerprint,
  languages: Languages,
  arrow: ArrowRight,
};

export function Icon({
  name,
  className,
  strokeWidth = 1.75,
}: {
  name: string;
  className?: string;
  strokeWidth?: number;
}) {
  const Component = iconRegistry[name] ?? Compass;
  return <Component className={className} strokeWidth={strokeWidth} aria-hidden />;
}

export { ArrowRight };
