'use client';

import React, {useState} from 'react';
import {
  Activity,
  AlertCircle,
  ArrowDownRight,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  BarChart2,
  Bell,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  ChevronUp,
  CircleHelp,
  CirclePlay,
  ClipboardCheck,
  Clock3,
  CreditCard,
  Download,
  Edit3,
  ExternalLink,
  FileText,
  Filter,
  FlaskConical,
  Globe,
  Layers,
  LayoutGrid,
  Link2,
  List,
  Lock,
  MessageSquare,
  Package,
  Play,
  Plus,
  RefreshCw,
  Rocket,
  RotateCcw,
  Search,
  ShieldCheck,
  Smartphone,
  Star,
  Tag,
  TrendingUp,
  Users,
  X,
} from 'lucide-react';

export interface ReviewChangeItem {
  id: string;
  track: 'production' | 'open_testing' | 'closed_testing';
  title: string;
  subtitle?: string;
  indented?: boolean;
  description: string;
  details: {
    status: string;
    submittedAt: string;
    versionCode?: string;
    targetSdk?: string;
    rolloutPercentage?: string;
    notes: string;
  };
}

export interface ConsoleApp {
  name: string;
  packageName: string;
  status: string;
  updateStatus: string;
  activeDevices: string;
  lastUpdated: string;
  rating: string;
}

const INITIAL_CHANGES: ReviewChangeItem[] = [
  {
    id: 'prod-release-1',
    track: 'production',
    title: 'Subha Fun',
    subtitle: '1.0.0',
    indented: true,
    description: 'Start full rollout',
    details: {
      status: 'In review',
      submittedAt: 'Oct 10, 2026, 5:14 AM',
      versionCode: '100',
      targetSdk: '35 (Android 15)',
      rolloutPercentage: '100%',
      notes:
        'Initial production release bundle (1.0.0) queued for 100% staged rollout upon review approval.',
    },
  },
  {
    id: 'prod-countries-176',
    track: 'production',
    title: 'Countries / regions',
    indented: false,
    description: 'Add 176 countries / regions: Albania, Algeria, and 174 more',
    details: {
      status: 'In review',
      submittedAt: 'Oct 10, 2026, 5:12 AM',
      rolloutPercentage: '176 regions',
      notes:
        'Targeted regional availability expansion across Albania, Algeria, Argentina, Australia, Austria, Bangladesh, Belgium, Brazil, Canada, Germany, India, Japan, United Kingdom, United States, and 162 additional territories.',
    },
  },
  {
    id: 'prod-countries-row',
    track: 'production',
    title: 'Countries / regions',
    indented: false,
    description: 'Add rest of world',
    details: {
      status: 'In review',
      submittedAt: 'Oct 10, 2026, 5:12 AM',
      rolloutPercentage: 'Global',
      notes:
        'Enables automatic availability in any newly supported Google Play countries and rest-of-world regions.',
    },
  },
  {
    id: 'open-testing-2',
    track: 'open_testing',
    title: '2nd Open Testing Release',
    indented: false,
    description: 'Start full rollout',
    details: {
      status: 'In review',
      submittedAt: 'Oct 9, 2026, 8:40 PM',
      versionCode: '98',
      targetSdk: '35 (Android 15)',
      rolloutPercentage: '100%',
      notes:
        'Open testing track release promoted to all public beta opt-in testers.',
    },
  },
];

const INITIAL_APPS: ConsoleApp[] = [
  {
    name: 'Subha Fun',
    packageName: 'com.subhafun.app',
    status: 'Production (In review)',
    updateStatus: 'Changes in review',
    activeDevices: '4,890',
    lastUpdated: 'Oct 10, 2026',
    rating: '4.8',
  },
  {
    name: 'Subha Studio Pro',
    packageName: 'com.subhastudio.pro',
    status: 'Production',
    updateStatus: 'Ready to publish',
    activeDevices: '18,420',
    lastUpdated: 'Sep 28, 2026',
    rating: '4.7',
  },
  {
    name: 'Daily Puzzle Quest',
    packageName: 'com.subha.puzzlequest',
    status: 'Open testing',
    updateStatus: 'Live on Play',
    activeDevices: '1,250',
    lastUpdated: 'Oct 2, 2026',
    rating: '4.6',
  },
];

const COUNTRY_STATS = [
  {country: 'India', installs: '1,842', audience: '2,140', conversion: '38.4%', change: '+22.1%'},
  {country: 'United States', installs: '940', audience: '1,120', conversion: '34.2%', change: '+14.8%'},
  {country: 'Brazil', installs: '518', audience: '640', conversion: '31.9%', change: '+19.3%'},
  {country: 'United Kingdom', installs: '312', audience: '390', conversion: '33.5%', change: '+11.0%'},
  {country: 'Germany', installs: '274', audience: '330', conversion: '29.8%', change: '+9.4%'},
  {country: 'Albania', installs: '148', audience: '180', conversion: '41.2%', change: '+44.0%'},
  {country: 'Algeria', installs: '136', audience: '165', conversion: '39.6%', change: '+38.5%'},
];

const INITIAL_PRODUCTS = [
  {
    id: 'subha_vip_pass',
    name: 'Subha Fun VIP Pass (Monthly)',
    type: 'Subscription',
    price: '$4.99 / month',
    status: 'Active',
    conversions: '312 active subscribers',
  },
  {
    id: 'coin_bundle_1000',
    name: '1,000 Bonus Coins Pack',
    type: 'In-app product',
    price: '$1.99',
    status: 'Active',
    conversions: '845 purchases (30d)',
  },
  {
    id: 'ad_free_unlock',
    name: 'Remove Interstitial Ads Forever',
    type: 'In-app product',
    price: '$2.99',
    status: 'Active',
    conversions: '419 purchases (30d)',
  },
];

export default function PlayConsoleReplica() {
  const [activeNav, setActiveNav] = useState<string>('Publishing overview');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isChangesHidden, setIsChangesHidden] = useState<boolean>(false);
  const [changes, setChanges] = useState<ReviewChangeItem[]>(INITIAL_CHANGES);
  const [closedTrackTitle, setClosedTrackTitle] = useState<string>(
    'Closed testing - first closed testing RELEASE'
  );
  const [apps, setApps] = useState<ConsoleApp[]>(INITIAL_APPS);
  const [selectedApp, setSelectedApp] = useState<string>('Subha Fun');
  const [appDropdownOpen, setAppDropdownOpen] = useState<boolean>(false);

  // Sub-tab states for other sections
  const [statsTimeRange, setStatsTimeRange] = useState<'7d' | '28d' | '90d'>('28d');
  const [statsMetric, setStatsMetric] = useState<string>('Installed audience');
  const [testReleaseSubTab, setTestReleaseSubTab] = useState<
    'overview' | 'production' | 'open' | 'closed' | 'internal'
  >('overview');
  const [monitorSubTab, setMonitorSubTab] = useState<
    'vitals' | 'crashes' | 'reviews' | 'policy'
  >('vitals');
  const [storeListingShortDesc, setStoreListingShortDesc] = useState<string>(
    'Play interactive mini-games, daily challenges, and social tournaments with friends.'
  );
  const [storeListingFullDesc, setStoreListingFullDesc] = useState<string>(
    'Subha Fun brings fast-paced social challenges, daily brain puzzles, and instant community leaderboards across 176+ countries and regions. Built for Android 15 with ultra-low latency matchmaking and smooth 120Hz performance.'
  );
  const [storeListingSaved, setStoreListingSaved] = useState<boolean>(false);
  const [products, setProducts] = useState(INITIAL_PRODUCTS);
  const [showNewReleaseModal, setShowNewReleaseModal] = useState<boolean>(false);
  const [newReleaseTrack, setNewReleaseTrack] = useState<
    'production' | 'open_testing' | 'closed_testing'
  >('production');
  const [newReleaseName, setNewReleaseName] = useState<string>('1.0.1');
  const [newReleaseDesc, setNewReleaseDesc] = useState<string>('Start full rollout');

  // Modals & Drawers
  const [selectedItem, setSelectedItem] = useState<ReviewChangeItem | null>(null);
  const [showHelpModal, setShowHelpModal] = useState<boolean>(false);
  const [showLearnMoreModal, setShowLearnMoreModal] = useState<boolean>(false);
  const [showRemoveConfirm, setShowRemoveConfirm] = useState<boolean>(false);
  const [showNotifications, setShowNotifications] = useState<boolean>(false);
  const [hasUnreadNotification, setHasUnreadNotification] = useState<boolean>(true);
  const [copiedLink, setCopiedLink] = useState<boolean>(false);
  const [isCustomizeOpen, setIsCustomizeOpen] = useState<boolean>(false);

  const filteredChanges = changes.filter((item) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      item.title.toLowerCase().includes(q) ||
      (item.subtitle && item.subtitle.toLowerCase().includes(q)) ||
      item.description.toLowerCase().includes(q)
    );
  });

  const productionChanges = filteredChanges.filter((c) => c.track === 'production');
  const openTestingChanges = filteredChanges.filter((c) => c.track === 'open_testing');
  const closedTestingChanges = filteredChanges.filter((c) => c.track === 'closed_testing');

  const handleCopyDeepLink = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href).catch(() => {});
    }
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleAppNameUpdate = (newName: string) => {
    setSelectedApp(newName);
    setChanges((prev) =>
      prev.map((item) =>
        item.id === 'prod-release-1' ? {...item, title: newName} : item
      )
    );
  };

  const handleRestoreDefaults = () => {
    setSelectedApp('Subha Fun');
    setChanges(INITIAL_CHANGES);
    setClosedTrackTitle('Closed testing - first closed testing RELEASE');
    setIsChangesHidden(false);
    setSearchQuery('');
  };

  const handleAddNewReleaseToReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReleaseName.trim()) return;
    const newItem: ReviewChangeItem = {
      id: `custom-${Date.now()}`,
      track: newReleaseTrack,
      title: newReleaseTrack === 'production' ? selectedApp : newReleaseName.trim(),
      subtitle: newReleaseTrack === 'production' ? newReleaseName.trim() : undefined,
      indented: newReleaseTrack === 'production',
      description: newReleaseDesc.trim() || 'Start full rollout',
      details: {
        status: 'In review',
        submittedAt: 'Just now',
        versionCode: '101',
        targetSdk: '35 (Android 15)',
        rolloutPercentage: '100%',
        notes: `New release queued from Test and release (${newReleaseName.trim()}).`,
      },
    };
    setChanges((prev) => [newItem, ...prev]);
    setShowNewReleaseModal(false);
    setActiveNav('Publishing overview');
  };

  return (
    <div className="min-h-screen w-full bg-white flex text-[#202124] font-sans antialiased">
      {/* LEFT SIDEBAR */}
      <aside className="w-[258px] shrink-0 bg-[#f8f9fa] min-h-screen flex flex-col select-none pb-8">
        {/* Google Play Console Brand Mark */}
        <div
          onClick={() => setActiveNav('Publishing overview')}
          className="pt-[15px] pb-[14px] px-[20px] flex items-center gap-2.5 cursor-pointer"
        >
          <div className="relative w-[26px] h-[26px] flex items-center justify-center shrink-0">
            <Play className="w-[26px] h-[26px] text-[#1a73e8] fill-[#4285f4] stroke-[1.5]" />
            <div className="absolute inset-0 flex items-center justify-center pr-1">
              <BarChart2 className="w-[11px] h-[11px] text-white stroke-[2.6]" />
            </div>
          </div>
          <div className="flex items-baseline tracking-[-0.01em] text-[18.5px] leading-none whitespace-nowrap">
            <span className="font-medium text-[#5f6368]">Google Play</span>
            <span className="font-normal text-[#1a73e8] ml-1.5">Console</span>
          </div>
        </div>

        {/* "All apps" Pill Button */}
        <div className="px-[14px] mt-1 mb-[18px]">
          <button
            type="button"
            onClick={() => setActiveNav('All apps')}
            className={`w-full h-[46px] rounded-full border px-[18px] flex items-center gap-3.5 text-[14px] transition-colors cursor-pointer ${
              activeNav === 'All apps'
                ? 'bg-[#e8f0fe] text-[#174ea6] font-medium border-[1.5px] border-[#1a73e8] shadow-[0_0_0_2px_rgba(26,115,232,0.12)]'
                : 'border-[#dadce0] bg-[#f8f9fa] hover:bg-[#eef1f5] active:bg-[#e4e8ee] text-[#3c4043] font-normal'
            }`}
          >
            <ArrowLeft
              className={`w-[17px] h-[17px] stroke-[1.8] shrink-0 ${
                activeNav === 'All apps' ? 'text-[#1967d2]' : 'text-[#3c4043]'
              }`}
            />
            <span className="truncate">All apps</span>
          </button>
        </div>

        {/* Top 3 Flat / Active Pill Nav Items */}
        <nav className="flex flex-col space-y-0.5">
          {/* Dashboard */}
          <div className="pr-[10px] pl-[1px]">
            <button
              type="button"
              onClick={() => setActiveNav('Dashboard')}
              className={`w-full px-[21px] h-[46px] rounded-full flex items-center gap-[17px] text-[14px] transition-all cursor-pointer ${
                activeNav === 'Dashboard'
                  ? 'bg-[#e8f0fe] text-[#174ea6] font-medium border-[1.5px] border-[#1a73e8] shadow-[0_0_0_2px_rgba(26,115,232,0.12)]'
                  : 'text-[#202124] font-normal hover:bg-[#eef2f6]'
              }`}
            >
              <LayoutGrid
                className={`w-[19px] h-[19px] stroke-[1.8] shrink-0 ${
                  activeNav === 'Dashboard' ? 'text-[#1967d2]' : 'text-[#3c4043]'
                }`}
              />
              <span className="truncate">Dashboard</span>
            </button>
          </div>

          {/* Statistics */}
          <div className="pr-[10px] pl-[1px]">
            <button
              type="button"
              onClick={() => setActiveNav('Statistics')}
              className={`w-full px-[21px] h-[46px] rounded-full flex items-center gap-[17px] text-[14px] transition-all cursor-pointer ${
                activeNav === 'Statistics'
                  ? 'bg-[#e8f0fe] text-[#174ea6] font-medium border-[1.5px] border-[#1a73e8] shadow-[0_0_0_2px_rgba(26,115,232,0.12)]'
                  : 'text-[#202124] font-normal hover:bg-[#eef2f6]'
              }`}
            >
              <BarChart2
                className={`w-[19px] h-[19px] stroke-[2] shrink-0 ${
                  activeNav === 'Statistics' ? 'text-[#1967d2]' : 'text-[#3c4043]'
                }`}
              />
              <span className="truncate">Statistics</span>
            </button>
          </div>

          {/* Publishing overview (Active in screenshot with blue outline pill) */}
          <div className="pt-0.5 pb-1 pr-[10px] pl-[1px]">
            <button
              type="button"
              onClick={() => setActiveNav('Publishing overview')}
              className={`w-full px-[21px] h-[46px] rounded-full flex items-center gap-[17px] text-[14px] transition-all cursor-pointer ${
                activeNav === 'Publishing overview'
                  ? 'bg-[#e8f0fe] text-[#1967d2] font-medium border-[1.5px] border-[#1a73e8] shadow-[0_0_0_2px_rgba(26,115,232,0.12)]'
                  : 'text-[#202124] font-normal hover:bg-[#eef2f6]'
              }`}
            >
              <span className="relative w-[20px] h-[20px] flex items-center justify-center shrink-0">
                <List
                  className={`w-[16px] h-[16px] -mt-1 -ml-1 stroke-[2] ${
                    activeNav === 'Publishing overview'
                      ? 'text-[#1967d2]'
                      : 'text-[#3c4043]'
                  }`}
                />
                <Clock3
                  className={`w-[11px] h-[11px] absolute bottom-0 right-0 rounded-full stroke-[2.2] ${
                    activeNav === 'Publishing overview'
                      ? 'text-[#1967d2] bg-[#e8f0fe]'
                      : 'text-[#3c4043] bg-[#f8f9fa]'
                  }`}
                />
              </span>
              <span className="truncate">Publishing overview</span>
            </button>
          </div>
        </nav>

        {/* 4 Grouped Section Navigation Cards */}
        <div className="mt-2.5 px-[10px] flex flex-col gap-[9px]">
          <button
            type="button"
            onClick={() => setActiveNav('Test and release')}
            className={`w-full h-[50px] px-[14px] rounded-[10px] flex items-center gap-[17px] text-[14px] transition-all cursor-pointer ${
              activeNav === 'Test and release'
                ? 'bg-[#e8f0fe] text-[#1967d2] font-medium border-[1.5px] border-[#1a73e8]'
                : 'bg-[#eef2f6] hover:bg-[#e4eaf1] text-[#202124] font-normal'
            }`}
          >
            <Rocket
              className={`w-[19px] h-[19px] stroke-[1.8] shrink-0 ${
                activeNav === 'Test and release' ? 'text-[#1967d2]' : 'text-[#202124]'
              }`}
            />
            <span className="truncate">Test and release</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveNav('Monitor and improve')}
            className={`w-full h-[50px] px-[14px] rounded-[10px] flex items-center gap-[17px] text-[14px] transition-all cursor-pointer ${
              activeNav === 'Monitor and improve'
                ? 'bg-[#e8f0fe] text-[#1967d2] font-medium border-[1.5px] border-[#1a73e8]'
                : 'bg-[#eef2f6] hover:bg-[#e4eaf1] text-[#202124] font-normal'
            }`}
          >
            <Activity
              className={`w-[19px] h-[19px] stroke-[1.8] shrink-0 ${
                activeNav === 'Monitor and improve'
                  ? 'text-[#1967d2]'
                  : 'text-[#202124]'
              }`}
            />
            <span className="truncate">Monitor and improve</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveNav('Grow users')}
            className={`w-full h-[50px] px-[14px] rounded-[10px] flex items-center gap-[17px] text-[14px] transition-all cursor-pointer ${
              activeNav === 'Grow users'
                ? 'bg-[#e8f0fe] text-[#1967d2] font-medium border-[1.5px] border-[#1a73e8]'
                : 'bg-[#eef2f6] hover:bg-[#e4eaf1] text-[#202124] font-normal'
            }`}
          >
            <TrendingUp
              className={`w-[19px] h-[19px] stroke-[1.8] shrink-0 border-b border-l p-[1px] ${
                activeNav === 'Grow users'
                  ? 'text-[#1967d2] border-[#1967d2]'
                  : 'text-[#202124] border-[#202124]'
              }`}
            />
            <span className="truncate">Grow users</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveNav('Monetize with Play')}
            className={`w-full h-[50px] px-[14px] rounded-[10px] flex items-center gap-[17px] text-[14px] transition-all cursor-pointer ${
              activeNav === 'Monetize with Play'
                ? 'bg-[#e8f0fe] text-[#1967d2] font-medium border-[1.5px] border-[#1a73e8]'
                : 'bg-[#eef2f6] hover:bg-[#e4eaf1] text-[#202124] font-normal'
            }`}
          >
            <Tag
              className={`w-[19px] h-[19px] stroke-[1.8] -scale-x-100 shrink-0 ${
                activeNav === 'Monetize with Play'
                  ? 'text-[#1967d2]'
                  : 'text-[#202124]'
              }`}
            />
            <span className="truncate">Monetize with Play</span>
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT VIEWPORT */}
      <div className="flex-1 min-w-0 bg-white flex flex-col">
        {/* Top Search & Utility Header + Page Title */}
        <header className="pl-[36px] pr-[18px] pt-[8px]">
          <div className="flex items-center justify-between gap-6">
            {/* Search Play Console Bar */}
            <div className="w-full max-w-[446px] h-[42px] bg-[#f1f3f4] focus-within:bg-white focus-within:ring-2 focus-within:ring-[#1a73e8] rounded-[8px] px-[14px] flex items-center gap-[12px] transition-all">
              <Search className="w-[18px] h-[18px] text-[#5f6368] stroke-[2] shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search Play Console"
                aria-label="Search Play Console"
                className="w-full bg-transparent text-[14.5px] text-[#202124] placeholder:text-[#5f6368] outline-none"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  aria-label="Clear search"
                  className="text-[#5f6368] hover:text-[#202124] p-0.5 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Right Utility Controls */}
            <div className="flex items-center gap-[18px] shrink-0">
              {/* Deep Link Copy Button */}
              <div className="relative">
                <button
                  type="button"
                  onClick={handleCopyDeepLink}
                  title="Copy page link"
                  className="w-9 h-9 rounded-full hover:bg-[#f1f3f4] flex items-center justify-center text-[#444746] transition-colors cursor-pointer"
                >
                  {copiedLink ? (
                    <Check className="w-[19px] h-[19px] text-[#188038]" />
                  ) : (
                    <Link2 className="w-[20px] h-[20px] -rotate-45 stroke-[1.9]" />
                  )}
                </button>
              </div>

              {/* Help Icon Button */}
              <button
                type="button"
                onClick={() => setShowHelpModal(true)}
                title="Help and support"
                className="w-9 h-9 rounded-full hover:bg-[#f1f3f4] flex items-center justify-center text-[#444746] transition-colors cursor-pointer"
              >
                <CircleHelp className="w-[20px] h-[20px] stroke-[1.9]" />
              </button>

              {/* Notification Bell with Red Dot */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => {
                    setShowNotifications((prev) => !prev);
                    setHasUnreadNotification(false);
                  }}
                  title="Notifications"
                  className="w-9 h-9 rounded-full hover:bg-[#f1f3f4] flex items-center justify-center text-[#444746] transition-colors cursor-pointer"
                >
                  <Bell className="w-[20px] h-[20px] stroke-[1.9]" />
                  {hasUnreadNotification && (
                    <span className="absolute top-[6px] right-[5px] w-[7px] h-[7px] rounded-full bg-[#d93025] ring-2 ring-white" />
                  )}
                </button>

                {showNotifications && (
                  <div className="absolute right-0 mt-2 w-[340px] bg-white rounded-[12px] border border-[#dadce0] shadow-lg z-40 p-4">
                    <div className="flex items-center justify-between pb-2.5 border-b border-[#e0e2e0]">
                      <span className="text-[14px] font-medium text-[#202124]">
                        Notifications
                      </span>
                      <button
                        type="button"
                        onClick={() => setShowNotifications(false)}
                        className="text-[#5f6368] hover:text-[#202124] p-1 cursor-pointer"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="py-3 space-y-3">
                      <div className="flex items-start gap-3">
                        <ClipboardCheck className="w-4 h-4 text-[#0b57d0] shrink-0 mt-0.5" />
                        <div>
                          <p className="text-[13px] font-medium text-[#202124]">
                            {selectedApp} 1.0.0 submitted for review
                          </p>
                          <p className="text-[12px] text-[#5f6368] mt-0.5">
                            {changes.length} changes across Production and Open testing are now being reviewed.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* App Switcher Dropdown ("Subha Fun") */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setAppDropdownOpen((prev) => !prev)}
                  className="h-[42px] min-w-[156px] px-[18px] rounded-[8px] border border-[#dadce0] bg-white hover:bg-[#f8f9fa] flex items-center justify-between gap-4 text-[14px] font-medium text-[#202124] transition-colors cursor-pointer"
                >
                  <span className="truncate">{selectedApp}</span>
                  <ChevronDown className="w-[15px] h-[15px] text-[#3c4043] stroke-[2.2] shrink-0" />
                </button>

                {appDropdownOpen && (
                  <div className="absolute right-0 mt-1.5 w-[260px] bg-white rounded-[10px] border border-[#dadce0] shadow-lg z-40 py-1.5">
                    <div className="px-3.5 py-1.5 text-[11px] font-medium text-[#5f6368]">
                      Select application
                    </div>
                    {apps.map((app) => (
                      <button
                        key={app.packageName}
                        type="button"
                        onClick={() => {
                          handleAppNameUpdate(app.name);
                          setAppDropdownOpen(false);
                        }}
                        className="w-full px-3.5 py-2.5 text-left hover:bg-[#f1f3f4] flex items-center justify-between cursor-pointer"
                      >
                        <div>
                          <div className="text-[13.5px] font-medium text-[#202124]">
                            {app.name}
                          </div>
                          <div className="text-[11.5px] text-[#5f6368] font-mono">
                            {app.packageName}
                          </div>
                        </div>
                        {selectedApp === app.name && (
                          <Check className="w-4 h-4 text-[#0b57d0]" />
                        )}
                      </button>
                    ))}
                    <div className="border-t border-[#e0e2e0] mt-1 pt-1 px-2">
                      <button
                        type="button"
                        onClick={() => {
                          setAppDropdownOpen(false);
                          setIsCustomizeOpen(true);
                        }}
                        className="w-full px-2.5 py-2 text-[13px] font-medium text-[#0b57d0] hover:bg-[#edf2fc] rounded-[6px] flex items-center gap-2 cursor-pointer"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                        <span>Customize app & release data</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sub-header Bar */}
          <div className="pt-[14px] pb-[15px] border-b border-[#e0e2e0] flex items-center justify-between">
            <h1 className="text-[20px] font-medium text-[#202124] tracking-[-0.01em] leading-snug">
              {activeNav}
            </h1>
          </div>
        </header>

        {/* Main Section Body — Renders Authentic View for Every Tab */}
        <main className="pl-[36px] pr-[18px] pt-[28px] pb-16 flex-1">
          {/* =========================================================
              1. PUBLISHING OVERVIEW (1:1 Exact Replica of Screenshot)
             ========================================================= */}
          {activeNav === 'Publishing overview' && (
            <>
              {/* Section Header: "Changes in review" */}
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <h2 className="text-[24px] font-medium text-[#202124] tracking-[-0.015em] leading-tight">
                    Changes in review
                  </h2>
                  <button
                    type="button"
                    onClick={() => setShowLearnMoreModal(true)}
                    aria-label="About changes in review"
                    className="text-[#5f6368] hover:text-[#202124] p-0.5 rounded-full cursor-pointer"
                  >
                    <CircleHelp className="w-[18px] h-[18px] stroke-[1.8]" />
                  </button>
                </div>

                <div className="flex items-center gap-[18px] pr-[6px]">
                  {changes.length > 0 ? (
                    <button
                      type="button"
                      onClick={() => setShowRemoveConfirm(true)}
                      className="text-[14px] font-medium text-[#0b57d0] hover:underline whitespace-nowrap cursor-pointer"
                    >
                      Remove changes
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={handleRestoreDefaults}
                      className="text-[14px] font-medium text-[#0b57d0] hover:underline flex items-center gap-1.5 whitespace-nowrap cursor-pointer"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Restore changes</span>
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={() => setIsChangesHidden((prev) => !prev)}
                    className="flex items-center gap-[10px] text-[14px] font-medium text-[#0b57d0] hover:underline whitespace-nowrap cursor-pointer"
                  >
                    <span>{isChangesHidden ? 'Show' : 'Hide'}</span>
                    {isChangesHidden ? (
                      <ChevronDown className="w-[17px] h-[17px] text-[#5f6368] stroke-[2]" />
                    ) : (
                      <ChevronUp className="w-[17px] h-[17px] text-[#5f6368] stroke-[2]" />
                    )}
                  </button>
                </div>
              </div>

              {/* Info Callout Banner */}
              <div className="mt-[20px] bg-[#edf2fc] rounded-[12px] px-[20px] py-[18px] flex items-center justify-between gap-4">
                <div className="flex items-center gap-[16px]">
                  <ClipboardCheck className="w-[21px] h-[21px] text-[#0b57d0] stroke-[1.9] shrink-0" />
                  <p className="text-[14px] text-[#1f1f1f] leading-normal">
                    {changes.length > 0
                      ? 'Your changes are now in review. We may find additional issues when reviewing your app.'
                      : 'There are currently no changes in review. Restore default changes or add a new release item.'}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setShowLearnMoreModal(true)}
                  className="text-[14px] font-medium text-[#0b57d0] hover:underline whitespace-nowrap shrink-0 pr-[4px] cursor-pointer"
                >
                  Learn more
                </button>
              </div>

              {/* Collapsible Table Container */}
              {!isChangesHidden && (
                <div className="mt-[25px]">
                  {/* Column Headers */}
                  <div className="flex items-center px-[14px] pb-[13px] text-[12px] font-medium text-[#5f6368]">
                    <div className="w-[292px] sm:w-[322px] shrink-0">Item changed</div>
                    <div className="flex-1">Description</div>
                    <div className="w-10 shrink-0" />
                  </div>

                  {/* Track 1: Production */}
                  <div className="bg-[#f1f3f4] border-t border-b border-[#dadce0] px-[14px] h-[48px] flex items-center gap-[14px]">
                    <Rocket className="w-[19px] h-[19px] text-[#202124] stroke-[1.85] -rotate-45 shrink-0" />
                    <span className="text-[14.5px] font-normal text-[#202124]">
                      Production
                    </span>
                  </div>

                  {productionChanges.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => setSelectedItem(item)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          setSelectedItem(item);
                        }
                      }}
                      className={`border-b border-[#e0e2e0] px-[14px] flex items-center hover:bg-[#f8f9fa] transition-colors cursor-pointer ${
                        item.subtitle ? 'py-[14px]' : 'h-[57px]'
                      }`}
                    >
                      <div
                        className={`w-[292px] sm:w-[322px] shrink-0 pr-4 ${
                          item.indented ? 'pl-[33px]' : ''
                        }`}
                      >
                        <div
                          className={`text-[14px] leading-[1.35] ${
                            item.subtitle
                              ? 'font-semibold text-[#202124]'
                              : 'font-normal text-[#202124]'
                          }`}
                        >
                          {item.title}
                        </div>
                        {item.subtitle && (
                          <div className="text-[14px] text-[#3c4043] leading-[1.35] mt-[1px] tabular-nums">
                            {item.subtitle}
                          </div>
                        )}
                      </div>

                      <div className="flex-1 text-[14px] text-[#202124] truncate pr-4">
                        {item.description}
                      </div>

                      <div className="w-10 shrink-0 flex justify-end pr-[6px]">
                        <ArrowRight className="w-[19px] h-[19px] text-[#0b57d0] stroke-[2]" />
                      </div>
                    </div>
                  ))}

                  {/* Track 2: Open testing */}
                  <div className="bg-[#f1f3f4] border-b border-[#dadce0] px-[14px] h-[48px] flex items-center gap-[14px]">
                    <CirclePlay className="w-[19px] h-[19px] text-[#202124] stroke-[1.85] shrink-0" />
                    <span className="text-[14.5px] font-normal text-[#202124]">
                      Open testing
                    </span>
                  </div>

                  {openTestingChanges.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => setSelectedItem(item)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          setSelectedItem(item);
                        }
                      }}
                      className="border-b border-[#e0e2e0] px-[14px] h-[57px] flex items-center hover:bg-[#f8f9fa] transition-colors cursor-pointer"
                    >
                      <div className="w-[292px] sm:w-[322px] shrink-0 pr-4 text-[14px] text-[#202124]">
                        {item.title}
                      </div>
                      <div className="flex-1 text-[14px] text-[#202124] truncate pr-4">
                        {item.description}
                      </div>
                      <div className="w-10 shrink-0 flex justify-end pr-[6px]">
                        <ArrowRight className="w-[19px] h-[19px] text-[#0b57d0] stroke-[2]" />
                      </div>
                    </div>
                  ))}

                  {/* Track 3: Closed testing - first closed testing RELEASE */}
                  <div className="bg-[#f1f3f4] border-b border-[#dadce0] px-[14px] h-[48px] flex items-center gap-[14px]">
                    <CirclePlay className="w-[19px] h-[19px] text-[#202124] stroke-[1.85] shrink-0" />
                    <span className="text-[14.5px] font-normal text-[#202124]">
                      {closedTrackTitle}
                    </span>
                  </div>

                  {closedTestingChanges.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => setSelectedItem(item)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          setSelectedItem(item);
                        }
                      }}
                      className="border-b border-[#e0e2e0] px-[14px] h-[57px] flex items-center hover:bg-[#f8f9fa] transition-colors cursor-pointer"
                    >
                      <div className="w-[292px] sm:w-[322px] shrink-0 pr-4 text-[14px] text-[#202124]">
                        {item.title}
                      </div>
                      <div className="flex-1 text-[14px] text-[#202124] truncate pr-4">
                        {item.description}
                      </div>
                      <div className="w-10 shrink-0 flex justify-end pr-[6px]">
                        <ArrowRight className="w-[19px] h-[19px] text-[#0b57d0] stroke-[2]" />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}

          {/* =========================================================
              2. ALL APPS VIEW
             ========================================================= */}
          {activeNav === 'All apps' && (
            <div className="space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h2 className="text-[22px] font-medium text-[#202124]">
                    Applications ({apps.length})
                  </h2>
                  <p className="text-[14px] text-[#5f6368] mt-1">
                    Select an app to view its Publishing overview, releases, or Android vitals.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsCustomizeOpen(true)}
                  className="h-10 px-5 rounded-[8px] bg-[#0b57d0] hover:bg-[#0842a0] text-white text-[14px] font-medium flex items-center gap-2 cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Customize app details</span>
                </button>
              </div>

              <div className="border border-[#dadce0] rounded-[12px] overflow-hidden">
                <div className="bg-[#f8f9fa] border-b border-[#dadce0] px-5 py-3.5 grid grid-cols-12 text-[12px] font-medium text-[#5f6368]">
                  <div className="col-span-4">App name</div>
                  <div className="col-span-2">Active devices</div>
                  <div className="col-span-2">App status</div>
                  <div className="col-span-2">Update status</div>
                  <div className="col-span-2 text-right pr-2">Last updated</div>
                </div>
                <div className="divide-y divide-[#e0e2e0]">
                  {apps.map((app) => (
                    <div
                      key={app.packageName}
                      onClick={() => {
                        handleAppNameUpdate(app.name);
                        setActiveNav('Publishing overview');
                      }}
                      className="px-5 py-4 grid grid-cols-12 items-center hover:bg-[#f8f9fa] transition-colors cursor-pointer"
                    >
                      <div className="col-span-4 flex items-center gap-3.5 pr-3">
                        <div className="w-10 h-10 rounded-[10px] bg-[#e8f0fe] border border-[#d2e3fc] flex items-center justify-center text-[#0b57d0] font-semibold text-[15px] shrink-0">
                          {app.name.slice(0, 2).toUpperCase()}
                        </div>
                        <div className="min-w-0">
                          <div className="text-[14px] font-semibold text-[#202124] truncate">
                            {app.name}
                          </div>
                          <div className="text-[12.5px] text-[#5f6368] font-mono truncate">
                            {app.packageName}
                          </div>
                        </div>
                      </div>
                      <div className="col-span-2 text-[14px] text-[#202124] tabular-nums">
                        {app.activeDevices}
                      </div>
                      <div className="col-span-2 text-[14px] text-[#3c4043]">
                        {app.status}
                      </div>
                      <div className="col-span-2 flex items-center gap-1.5 text-[14px] text-[#0b57d0] font-medium">
                        <ClipboardCheck className="w-4 h-4 shrink-0" />
                        <span>{app.updateStatus}</span>
                      </div>
                      <div className="col-span-2 flex items-center justify-end gap-4 text-[13.5px] text-[#5f6368] tabular-nums">
                        <span>{app.lastUpdated}</span>
                        <ArrowRight className="w-[18px] h-[18px] text-[#0b57d0]" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* =========================================================
              3. DASHBOARD VIEW
             ========================================================= */}
          {activeNav === 'Dashboard' && (
            <div className="space-y-7">
              {/* App Identity Banner */}
              <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-[#e0e2e0]">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-[14px] bg-[#e8f0fe] border border-[#d2e3fc] flex items-center justify-center text-[#0b57d0] font-semibold text-[20px]">
                    {selectedApp.slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <h2 className="text-[22px] font-medium text-[#202124]">
                      {selectedApp}
                    </h2>
                    <div className="flex items-center gap-2 text-[13.5px] text-[#5f6368] mt-0.5">
                      <span className="font-mono">com.subhafun.app</span>
                      <span>·</span>
                      <span>Release 1.0.0 (Version code 100)</span>
                      <span>·</span>
                      <span>176 countries + Rest of world</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setActiveNav('Publishing overview')}
                    className="h-10 px-4 rounded-[8px] border border-[#dadce0] hover:bg-[#f8f9fa] text-[14px] font-medium text-[#0b57d0] flex items-center gap-2 cursor-pointer"
                  >
                    <ClipboardCheck className="w-4 h-4" />
                    <span>View changes in review ({changes.length})</span>
                  </button>
                </div>
              </div>

              {/* Active Review Callout */}
              <div className="bg-[#edf2fc] rounded-[12px] px-5 py-4 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3.5">
                  <ClipboardCheck className="w-5 h-5 text-[#0b57d0] shrink-0" />
                  <span className="text-[14px] text-[#1f1f1f]">
                    <strong>{changes.length} changes in review:</strong> Production rollout (1.0.0), 176 countries / regions expansion, and 2nd Open Testing Release.
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveNav('Publishing overview')}
                  className="text-[14px] font-medium text-[#0b57d0] hover:underline whitespace-nowrap flex items-center gap-1 cursor-pointer"
                >
                  <span>Go to Publishing overview</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {/* KPI Metrics Strip */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-[18px] font-medium text-[#202124]">
                    Key performance indicators (Last 28 days)
                  </h3>
                  <button
                    type="button"
                    onClick={() => setActiveNav('Statistics')}
                    className="text-[14px] font-medium text-[#0b57d0] hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <span>Explore in Statistics</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="border border-[#dadce0] rounded-[12px] p-5">
                    <div className="text-[13px] text-[#5f6368] flex items-center justify-between">
                      <span>New users acquired</span>
                      <Users className="w-4 h-4 text-[#5f6368]" />
                    </div>
                    <div className="text-[26px] font-medium text-[#202124] mt-2 tabular-nums">
                      1,420
                    </div>
                    <div className="text-[12.5px] text-[#188038] mt-1.5 flex items-center gap-1 tabular-nums">
                      <ArrowUpRight className="w-3.5 h-3.5" />
                      <span>+18.4% vs previous 28 days</span>
                    </div>
                  </div>

                  <div className="border border-[#dadce0] rounded-[12px] p-5">
                    <div className="text-[13px] text-[#5f6368] flex items-center justify-between">
                      <span>Active devices</span>
                      <Smartphone className="w-4 h-4 text-[#5f6368]" />
                    </div>
                    <div className="text-[26px] font-medium text-[#202124] mt-2 tabular-nums">
                      4,890
                    </div>
                    <div className="text-[12.5px] text-[#188038] mt-1.5 flex items-center gap-1 tabular-nums">
                      <ArrowUpRight className="w-3.5 h-3.5" />
                      <span>+12.1% vs previous 28 days</span>
                    </div>
                  </div>

                  <div className="border border-[#dadce0] rounded-[12px] p-5">
                    <div className="text-[13px] text-[#5f6368] flex items-center justify-between">
                      <span>User-perceived crash rate</span>
                      <ShieldCheck className="w-4 h-4 text-[#188038]" />
                    </div>
                    <div className="text-[26px] font-medium text-[#202124] mt-2 tabular-nums">
                      0.16%
                    </div>
                    <div className="text-[12.5px] text-[#5f6368] mt-1.5 tabular-nums">
                      Bad behavior threshold: 1.09%
                    </div>
                  </div>

                  <div className="border border-[#dadce0] rounded-[12px] p-5">
                    <div className="text-[13px] text-[#5f6368] flex items-center justify-between">
                      <span>User-perceived ANR rate</span>
                      <Activity className="w-4 h-4 text-[#188038]" />
                    </div>
                    <div className="text-[26px] font-medium text-[#202124] mt-2 tabular-nums">
                      0.04%
                    </div>
                    <div className="text-[12.5px] text-[#5f6368] mt-1.5 tabular-nums">
                      Bad behavior threshold: 0.47%
                    </div>
                  </div>
                </div>
              </div>

              {/* Release Track Summary */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-[18px] font-medium text-[#202124]">
                    Release tracks summary
                  </h3>
                  <button
                    type="button"
                    onClick={() => setActiveNav('Test and release')}
                    className="text-[14px] font-medium text-[#0b57d0] hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <span>Manage releases</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

                <div className="border border-[#dadce0] rounded-[12px] divide-y divide-[#e0e2e0]">
                  <div
                    onClick={() => setActiveNav('Publishing overview')}
                    className="p-4 flex items-center justify-between hover:bg-[#f8f9fa] cursor-pointer"
                  >
                    <div className="flex items-center gap-3.5">
                      <Rocket className="w-5 h-5 text-[#202124] -rotate-45" />
                      <div>
                        <div className="text-[14px] font-medium text-[#202124]">
                          Production — {selectedApp} 1.0.0
                        </div>
                        <div className="text-[13px] text-[#5f6368]">
                          Full rollout queued · 176 countries / regions + Rest of world
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-[13px] font-medium text-[#0b57d0]">
                        In review
                      </span>
                      <ArrowRight className="w-4 h-4 text-[#0b57d0]" />
                    </div>
                  </div>

                  <div
                    onClick={() => setActiveNav('Publishing overview')}
                    className="p-4 flex items-center justify-between hover:bg-[#f8f9fa] cursor-pointer"
                  >
                    <div className="flex items-center gap-3.5">
                      <CirclePlay className="w-5 h-5 text-[#202124]" />
                      <div>
                        <div className="text-[14px] font-medium text-[#202124]">
                          Open testing — 2nd Open Testing Release
                        </div>
                        <div className="text-[13px] text-[#5f6368]">
                          Version code 98 · Start full rollout
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-[13px] font-medium text-[#0b57d0]">
                        In review
                      </span>
                      <ArrowRight className="w-4 h-4 text-[#0b57d0]" />
                    </div>
                  </div>

                  <div
                    onClick={() => setActiveNav('Test and release')}
                    className="p-4 flex items-center justify-between hover:bg-[#f8f9fa] cursor-pointer"
                  >
                    <div className="flex items-center gap-3.5">
                      <CirclePlay className="w-5 h-5 text-[#202124]" />
                      <div>
                        <div className="text-[14px] font-medium text-[#202124]">
                          {closedTrackTitle}
                        </div>
                        <div className="text-[13px] text-[#5f6368]">
                          Version code 95 · 240 active testers opted in
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-[13px] text-[#188038] font-medium">
                        Available to testers
                      </span>
                      <ArrowRight className="w-4 h-4 text-[#0b57d0]" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* =========================================================
              4. STATISTICS VIEW
             ========================================================= */}
          {activeNav === 'Statistics' && (
            <div className="space-y-6">
              {/* Filter Controls Bar */}
              <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-[#e0e2e0]">
                <div className="flex flex-wrap items-center gap-3">
                  <div>
                    <label className="block text-[11px] font-medium text-[#5f6368] mb-1">
                      Metric
                    </label>
                    <select
                      value={statsMetric}
                      onChange={(e) => setStatsMetric(e.target.value)}
                      className="h-9 px-3 rounded-[8px] border border-[#dadce0] bg-white text-[13.5px] font-medium text-[#202124] outline-none"
                    >
                      <option value="Installed audience">
                        Installed audience (All devices)
                      </option>
                      <option value="User acquisition">
                        User acquisition (New users)
                      </option>
                      <option value="Daily active users">
                        Daily active users (DAU)
                      </option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-medium text-[#5f6368] mb-1">
                      Dimension
                    </label>
                    <div className="h-9 px-3 rounded-[8px] border border-[#dadce0] bg-[#f8f9fa] text-[13.5px] text-[#202124] flex items-center gap-2">
                      <Globe className="w-4 h-4 text-[#5f6368]" />
                      <span>Countries / regions (176 + ROW)</span>
                    </div>
                  </div>
                </div>

                {/* Segmented Time Period Selector */}
                <div className="flex items-center gap-1 p-1 bg-[#f1f3f4] rounded-[8px]">
                  {(['7d', '28d', '90d'] as const).map((period) => (
                    <button
                      key={period}
                      type="button"
                      onClick={() => setStatsTimeRange(period)}
                      className={`px-3.5 py-1.5 text-[13px] font-medium rounded-[6px] transition-colors cursor-pointer ${
                        statsTimeRange === period
                          ? 'bg-white text-[#0b57d0] shadow-xs'
                          : 'text-[#5f6368] hover:text-[#202124]'
                      }`}
                    >
                      {period === '7d'
                        ? 'Last 7 days'
                        : period === '28d'
                        ? 'Last 28 days'
                        : 'Last 90 days'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Interactive Trend Chart Box */}
              <div className="border border-[#dadce0] rounded-[12px] p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <div className="text-[13px] text-[#5f6368]">{statsMetric}</div>
                    <div className="text-[24px] font-medium text-[#202124] mt-0.5 tabular-nums">
                      {statsTimeRange === '7d'
                        ? '4,890 devices'
                        : statsTimeRange === '28d'
                        ? '4,620 avg devices'
                        : '3,980 avg devices'}
                    </div>
                  </div>
                  <div className="text-[13px] text-[#188038] font-medium flex items-center gap-1 tabular-nums">
                    <ArrowUpRight className="w-4 h-4" />
                    <span>+18.4% vs previous period</span>
                  </div>
                </div>

                {/* Clean Bar Chart Visualization */}
                <div className="h-44 flex items-end gap-2.5 pt-6 border-b border-[#e0e2e0]">
                  {[42, 48, 45, 53, 58, 62, 59, 66, 71, 68, 75, 82, 86, 94].map(
                    (val, idx) => (
                      <div
                        key={idx}
                        className="flex-1 flex flex-col items-center gap-2 group"
                      >
                        <div className="w-full bg-[#e8f0fe] group-hover:bg-[#d2e3fc] rounded-t-[4px] relative flex items-end overflow-hidden transition-colors"
                             style={{height: `${val * 1.4}px`}}>
                          <div
                            className="w-full bg-[#1a73e8] rounded-t-[4px]"
                            style={{height: `${val}%`}}
                          />
                        </div>
                      </div>
                    )
                  )}
                </div>
                <div className="flex justify-between text-[12px] text-[#5f6368] pt-2.5 tabular-nums">
                  <span>Sep 13, 2026</span>
                  <span>Sep 20, 2026</span>
                  <span>Sep 27, 2026</span>
                  <span>Oct 4, 2026</span>
                  <span>Oct 10, 2026</span>
                </div>
              </div>

              {/* Regional Breakdown Table */}
              <div>
                <h3 className="text-[17px] font-medium text-[#202124] mb-3">
                  Breakdown by country / region
                </h3>
                <div className="border border-[#dadce0] rounded-[12px] overflow-hidden">
                  <div className="bg-[#f8f9fa] border-b border-[#dadce0] px-5 py-3 grid grid-cols-12 text-[12px] font-medium text-[#5f6368]">
                    <div className="col-span-4">Country / region</div>
                    <div className="col-span-3 text-right">New user acquisitions</div>
                    <div className="col-span-3 text-right">Installed audience</div>
                    <div className="col-span-2 text-right">28d change</div>
                  </div>
                  <div className="divide-y divide-[#e0e2e0]">
                    {COUNTRY_STATS.map((row) => (
                      <div
                        key={row.country}
                        className="px-5 py-3.5 grid grid-cols-12 items-center text-[13.5px] hover:bg-[#f8f9fa]"
                      >
                        <div className="col-span-4 font-medium text-[#202124]">
                          {row.country}
                        </div>
                        <div className="col-span-3 text-right text-[#3c4043] tabular-nums">
                          {row.installs}
                        </div>
                        <div className="col-span-3 text-right text-[#3c4043] tabular-nums">
                          {row.audience}
                        </div>
                        <div className="col-span-2 text-right text-[#188038] font-medium tabular-nums">
                          {row.change}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* =========================================================
              5. TEST AND RELEASE VIEW
             ========================================================= */}
          {activeNav === 'Test and release' && (
            <div className="space-y-6">
              {/* Sub-navigation bar */}
              <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-[#e0e2e0]">
                <div className="flex items-center gap-1 p-1 bg-[#f1f3f4] rounded-[8px]">
                  {[
                    {id: 'overview', label: 'Releases overview'},
                    {id: 'production', label: 'Production'},
                    {id: 'open', label: 'Open testing'},
                    {id: 'closed', label: 'Closed testing'},
                    {id: 'internal', label: 'Internal testing'},
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() =>
                        setTestReleaseSubTab(
                          tab.id as typeof testReleaseSubTab
                        )
                      }
                      className={`px-3.5 py-1.5 text-[13px] font-medium rounded-[6px] transition-colors cursor-pointer ${
                        testReleaseSubTab === tab.id
                          ? 'bg-white text-[#0b57d0] shadow-xs'
                          : 'text-[#5f6368] hover:text-[#202124]'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={() => setShowNewReleaseModal(true)}
                  className="h-10 px-4 rounded-[8px] bg-[#0b57d0] hover:bg-[#0842a0] text-white text-[14px] font-medium flex items-center gap-2 cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Create new release</span>
                </button>
              </div>

              {/* Latest Releases Table */}
              <div className="border border-[#dadce0] rounded-[12px] overflow-hidden">
                <div className="bg-[#f8f9fa] border-b border-[#dadce0] px-5 py-3.5 grid grid-cols-12 text-[12px] font-medium text-[#5f6368]">
                  <div className="col-span-4">Track & release name</div>
                  <div className="col-span-2">Version code</div>
                  <div className="col-span-3">Release status</div>
                  <div className="col-span-3 text-right pr-2">Rollout & availability</div>
                </div>

                <div className="divide-y divide-[#e0e2e0]">
                  {(testReleaseSubTab === 'overview' ||
                    testReleaseSubTab === 'production') && (
                    <div className="px-5 py-4 grid grid-cols-12 items-center hover:bg-[#f8f9fa]">
                      <div className="col-span-4 flex items-center gap-3">
                        <Rocket className="w-5 h-5 text-[#202124] -rotate-45 shrink-0" />
                        <div>
                          <div className="text-[14px] font-semibold text-[#202124]">
                            Production — {selectedApp} 1.0.0
                          </div>
                          <div className="text-[12.5px] text-[#5f6368]">
                            Android App Bundle · Target SDK 35
                          </div>
                        </div>
                      </div>
                      <div className="col-span-2 font-mono text-[13.5px] text-[#3c4043] tabular-nums">
                        100
                      </div>
                      <div className="col-span-3 flex items-center gap-1.5 text-[13.5px] font-medium text-[#0b57d0]">
                        <ClipboardCheck className="w-4 h-4" />
                        <span>In review (Full rollout)</span>
                      </div>
                      <div className="col-span-3 text-right text-[13.5px] text-[#3c4043]">
                        176 countries + Rest of world
                      </div>
                    </div>
                  )}

                  {(testReleaseSubTab === 'overview' ||
                    testReleaseSubTab === 'open') && (
                    <div className="px-5 py-4 grid grid-cols-12 items-center hover:bg-[#f8f9fa]">
                      <div className="col-span-4 flex items-center gap-3">
                        <CirclePlay className="w-5 h-5 text-[#202124] shrink-0" />
                        <div>
                          <div className="text-[14px] font-semibold text-[#202124]">
                            Open testing — 2nd Open Testing Release
                          </div>
                          <div className="text-[12.5px] text-[#5f6368]">
                            Public beta track · Unlimited testers
                          </div>
                        </div>
                      </div>
                      <div className="col-span-2 font-mono text-[13.5px] text-[#3c4043] tabular-nums">
                        98
                      </div>
                      <div className="col-span-3 flex items-center gap-1.5 text-[13.5px] font-medium text-[#0b57d0]">
                        <ClipboardCheck className="w-4 h-4" />
                        <span>In review (Start full rollout)</span>
                      </div>
                      <div className="col-span-3 text-right text-[13.5px] text-[#3c4043]">
                        100% of open testers
                      </div>
                    </div>
                  )}

                  {(testReleaseSubTab === 'overview' ||
                    testReleaseSubTab === 'closed') && (
                    <div className="px-5 py-4 grid grid-cols-12 items-center hover:bg-[#f8f9fa]">
                      <div className="col-span-4 flex items-center gap-3">
                        <CirclePlay className="w-5 h-5 text-[#202124] shrink-0" />
                        <div>
                          <div className="text-[14px] font-semibold text-[#202124]">
                            {closedTrackTitle}
                          </div>
                          <div className="text-[12.5px] text-[#5f6368]">
                            Closed alpha track · Email list opt-in
                          </div>
                        </div>
                      </div>
                      <div className="col-span-2 font-mono text-[13.5px] text-[#3c4043] tabular-nums">
                        95
                      </div>
                      <div className="col-span-3 flex items-center gap-1.5 text-[13.5px] font-medium text-[#188038]">
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Available to testers</span>
                      </div>
                      <div className="col-span-3 text-right text-[13.5px] text-[#3c4043] tabular-nums">
                        240 opted-in testers
                      </div>
                    </div>
                  )}

                  {(testReleaseSubTab === 'overview' ||
                    testReleaseSubTab === 'internal') && (
                    <div className="px-5 py-4 grid grid-cols-12 items-center hover:bg-[#f8f9fa]">
                      <div className="col-span-4 flex items-center gap-3">
                        <FlaskConical className="w-5 h-5 text-[#202124] shrink-0" />
                        <div>
                          <div className="text-[14px] font-semibold text-[#202124]">
                            Internal testing — 1.0.0-rc2
                          </div>
                          <div className="text-[12.5px] text-[#5f6368]">
                            QA team verification build
                          </div>
                        </div>
                      </div>
                      <div className="col-span-2 font-mono text-[13.5px] text-[#3c4043] tabular-nums">
                        99
                      </div>
                      <div className="col-span-3 flex items-center gap-1.5 text-[13.5px] font-medium text-[#188038]">
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Available to internal testers</span>
                      </div>
                      <div className="col-span-3 text-right text-[13.5px] text-[#3c4043] tabular-nums">
                        18 QA testers
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* =========================================================
              6. MONITOR AND IMPROVE VIEW
             ========================================================= */}
          {activeNav === 'Monitor and improve' && (
            <div className="space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-[#e0e2e0]">
                <div className="flex items-center gap-1 p-1 bg-[#f1f3f4] rounded-[8px]">
                  {[
                    {id: 'vitals', label: 'Android vitals'},
                    {id: 'crashes', label: 'Crashes and ANRs'},
                    {id: 'reviews', label: 'Ratings and reviews'},
                    {id: 'policy', label: 'Policy status'},
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() =>
                        setMonitorSubTab(tab.id as typeof monitorSubTab)
                      }
                      className={`px-3.5 py-1.5 text-[13px] font-medium rounded-[6px] transition-colors cursor-pointer ${
                        monitorSubTab === tab.id
                          ? 'bg-white text-[#0b57d0] shadow-xs'
                          : 'text-[#5f6368] hover:text-[#202124]'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
              </div>

              {monitorSubTab === 'vitals' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="border border-[#dadce0] rounded-[12px] p-5">
                    <div className="flex items-center justify-between">
                      <span className="text-[14px] font-medium text-[#202124]">
                        User-perceived crash rate
                      </span>
                      <span className="text-[12.5px] text-[#188038] font-medium flex items-center gap-1">
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Below bad behavior threshold</span>
                      </span>
                    </div>
                    <div className="text-[28px] font-medium text-[#202124] mt-3 tabular-nums">
                      0.16%
                    </div>
                    <p className="text-[13px] text-[#5f6368] mt-1">
                      99.84% of daily sessions were crash-free across all Android 13–15 devices.
                    </p>
                  </div>

                  <div className="border border-[#dadce0] rounded-[12px] p-5">
                    <div className="flex items-center justify-between">
                      <span className="text-[14px] font-medium text-[#202124]">
                        User-perceived ANR rate
                      </span>
                      <span className="text-[12.5px] text-[#188038] font-medium flex items-center gap-1">
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Below bad behavior threshold</span>
                      </span>
                    </div>
                    <div className="text-[28px] font-medium text-[#202124] mt-3 tabular-nums">
                      0.04%
                    </div>
                    <p className="text-[13px] text-[#5f6368] mt-1">
                      Main thread frame pacing within 16.6ms on 99.96% of active sessions.
                    </p>
                  </div>
                </div>
              )}

              {monitorSubTab === 'crashes' && (
                <div className="border border-[#dadce0] rounded-[12px] p-5 space-y-4">
                  <h3 className="text-[16px] font-medium text-[#202124]">
                    Recent crash clusters (Open testing 98)
                  </h3>
                  <div className="p-4 rounded-[8px] bg-[#f8f9fa] border border-[#e0e2e0] flex items-center justify-between">
                    <div>
                      <div className="font-mono text-[13px] text-[#202124] font-medium">
                        java.lang.NullPointerException: com.subhafun.app.ui.LobbyFragment.onResume
                      </div>
                      <div className="text-[12.5px] text-[#5f6368] mt-1">
                        Resolved in Version code 100 (Production 1.0.0 in review) · 3 occurrences
                      </div>
                    </div>
                    <span className="text-[13px] font-medium text-[#188038]">
                      Fixed in 1.0.0
                    </span>
                  </div>
                </div>
              )}

              {monitorSubTab === 'reviews' && (
                <div className="border border-[#dadce0] rounded-[12px] p-5 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-[16px] font-medium text-[#202124]">
                        Public ratings & tester feedback
                      </h3>
                      <p className="text-[13px] text-[#5f6368]">
                        Average rating: 4.8 / 5.0 across 142 ratings
                      </p>
                    </div>
                    <div className="flex items-center gap-1 text-[#fbbc04]">
                      <Star className="w-5 h-5 fill-[#fbbc04]" />
                      <Star className="w-5 h-5 fill-[#fbbc04]" />
                      <Star className="w-5 h-5 fill-[#fbbc04]" />
                      <Star className="w-5 h-5 fill-[#fbbc04]" />
                      <Star className="w-5 h-5 fill-[#fbbc04]" />
                    </div>
                  </div>
                </div>
              )}

              {monitorSubTab === 'policy' && (
                <div className="bg-[#edf2fc] rounded-[12px] p-5 flex items-center gap-4">
                  <ShieldCheck className="w-6 h-6 text-[#0b57d0] shrink-0" />
                  <div>
                    <div className="text-[15px] font-medium text-[#202124]">
                      No policy declarations blocking review
                    </div>
                    <div className="text-[13.5px] text-[#3c4043] mt-0.5">
                      Data safety, Advertising ID declaration, and Target API level 35 compliance are complete for {selectedApp}.
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* =========================================================
              7. GROW USERS VIEW (Main Store Listing & Conversion)
             ========================================================= */}
          {activeNav === 'Grow users' && (
            <div className="space-y-6 max-w-[820px]">
              <div>
                <h2 className="text-[22px] font-medium text-[#202124]">
                  Main store listing
                </h2>
                <p className="text-[14px] text-[#5f6368] mt-1">
                  Manage how {selectedApp} appears to users on Google Play across 176+ countries and regions.
                </p>
              </div>

              <div className="border border-[#dadce0] rounded-[12px] p-6 space-y-5">
                <div>
                  <label className="block text-[13px] font-medium text-[#202124] mb-1.5">
                    App name (30 characters max)
                  </label>
                  <input
                    type="text"
                    value={selectedApp}
                    onChange={(e) => handleAppNameUpdate(e.target.value)}
                    className="w-full h-10 px-3.5 rounded-[8px] border border-[#dadce0] text-[14px] text-[#202124] focus:border-[#0b57d0] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[13px] font-medium text-[#202124] mb-1.5">
                    Short description (80 characters max)
                  </label>
                  <input
                    type="text"
                    value={storeListingShortDesc}
                    onChange={(e) => setStoreListingShortDesc(e.target.value)}
                    className="w-full h-10 px-3.5 rounded-[8px] border border-[#dadce0] text-[14px] text-[#202124] focus:border-[#0b57d0] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[13px] font-medium text-[#202124] mb-1.5">
                    Full description (4,000 characters max)
                  </label>
                  <textarea
                    rows={4}
                    value={storeListingFullDesc}
                    onChange={(e) => setStoreListingFullDesc(e.target.value)}
                    className="w-full p-3.5 rounded-[8px] border border-[#dadce0] text-[14px] text-[#202124] focus:border-[#0b57d0] outline-none"
                  />
                </div>

                <div className="flex items-center justify-between pt-2">
                  {storeListingSaved ? (
                    <span className="text-[13.5px] text-[#188038] font-medium flex items-center gap-1.5">
                      <Check className="w-4 h-4" />
                      <span>Store listing changes saved and synced</span>
                    </span>
                  ) : (
                    <span className="text-[13px] text-[#5f6368]">
                      Localized in English (United States) — en-US
                    </span>
                  )}

                  <button
                    type="button"
                    onClick={() => {
                      setStoreListingSaved(true);
                      setTimeout(() => setStoreListingSaved(false), 2500);
                    }}
                    className="h-10 px-5 rounded-[8px] bg-[#0b57d0] hover:bg-[#0842a0] text-white text-[14px] font-medium cursor-pointer"
                  >
                    Save store listing
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* =========================================================
              8. MONETIZE WITH PLAY VIEW
             ========================================================= */}
          {activeNav === 'Monetize with Play' && (
            <div className="space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h2 className="text-[22px] font-medium text-[#202124]">
                    Products & subscriptions
                  </h2>
                  <p className="text-[14px] text-[#5f6368] mt-1">
                    Manage in-app products, recurring subscriptions, and regional pricing across 176 countries.
                  </p>
                </div>
              </div>

              <div className="border border-[#dadce0] rounded-[12px] overflow-hidden">
                <div className="bg-[#f8f9fa] border-b border-[#dadce0] px-5 py-3.5 grid grid-cols-12 text-[12px] font-medium text-[#5f6368]">
                  <div className="col-span-4">Product name & ID</div>
                  <div className="col-span-2">Type</div>
                  <div className="col-span-2">Default price</div>
                  <div className="col-span-2">Status</div>
                  <div className="col-span-2 text-right">Performance</div>
                </div>
                <div className="divide-y divide-[#e0e2e0]">
                  {products.map((prod) => (
                    <div
                      key={prod.id}
                      className="px-5 py-4 grid grid-cols-12 items-center text-[14px] hover:bg-[#f8f9fa]"
                    >
                      <div className="col-span-4">
                        <div className="font-medium text-[#202124]">{prod.name}</div>
                        <div className="text-[12px] font-mono text-[#5f6368] mt-0.5">
                          {prod.id}
                        </div>
                      </div>
                      <div className="col-span-2 text-[#3c4043]">{prod.type}</div>
                      <div className="col-span-2 font-mono text-[#202124] tabular-nums">
                        {prod.price}
                      </div>
                      <div className="col-span-2 text-[#188038] font-medium">
                        {prod.status}
                      </div>
                      <div className="col-span-2 text-right text-[13px] text-[#5f6368] tabular-nums">
                        {prod.conversions}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* CREATE NEW RELEASE MODAL */}
      {showNewReleaseModal && (
        <div
          className="fixed inset-0 bg-black/30 z-50 flex items-center justify-center p-4"
          onClick={() => setShowNewReleaseModal(false)}
        >
          <form
            onSubmit={handleAddNewReleaseToReview}
            className="w-full max-w-[460px] bg-white rounded-[12px] shadow-xl border border-[#dadce0] p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-[#e0e2e0]">
              <h3 className="text-[18px] font-medium text-[#202124]">
                Queue new release for review
              </h3>
              <button
                type="button"
                onClick={() => setShowNewReleaseModal(false)}
                className="p-1.5 rounded-full hover:bg-[#f1f3f4] text-[#5f6368] cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="mt-4 space-y-4">
              <div>
                <label className="block text-[12.5px] font-medium text-[#5f6368] mb-1">
                  Target track
                </label>
                <select
                  value={newReleaseTrack}
                  onChange={(e) =>
                    setNewReleaseTrack(e.target.value as typeof newReleaseTrack)
                  }
                  className="w-full h-10 px-3 rounded-[8px] border border-[#dadce0] bg-white text-[14px]"
                >
                  <option value="production">Production</option>
                  <option value="open_testing">Open testing</option>
                  <option value="closed_testing">Closed testing</option>
                </select>
              </div>

              <div>
                <label className="block text-[12.5px] font-medium text-[#5f6368] mb-1">
                  Release version / name
                </label>
                <input
                  type="text"
                  value={newReleaseName}
                  onChange={(e) => setNewReleaseName(e.target.value)}
                  className="w-full h-10 px-3 rounded-[8px] border border-[#dadce0] text-[14px]"
                />
              </div>

              <div>
                <label className="block text-[12.5px] font-medium text-[#5f6368] mb-1">
                  Description action
                </label>
                <input
                  type="text"
                  value={newReleaseDesc}
                  onChange={(e) => setNewReleaseDesc(e.target.value)}
                  className="w-full h-10 px-3 rounded-[8px] border border-[#dadce0] text-[14px]"
                />
              </div>
            </div>

            <div className="mt-6 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowNewReleaseModal(false)}
                className="px-4 py-2 text-[14px] font-medium text-[#0b57d0] hover:bg-[#edf2fc] rounded-[8px] cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 text-[14px] font-medium text-white bg-[#0b57d0] hover:bg-[#0842a0] rounded-[8px] cursor-pointer"
              >
                Send to review
              </button>
            </div>
          </form>
        </div>
      )}

      {/* ITEM DETAILS DRAWER / MODAL */}
      {selectedItem && (
        <div
          className="fixed inset-0 bg-black/30 z-50 flex items-center justify-end"
          onClick={() => setSelectedItem(null)}
        >
          <div
            className="w-full max-w-[460px] bg-white h-full shadow-2xl border-l border-[#dadce0] p-6 flex flex-col justify-between overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-[#e0e2e0]">
                <div>
                  <span className="text-[12px] font-medium text-[#5f6368]">
                    Change details
                  </span>
                  <h3 className="text-[18px] font-medium text-[#202124] mt-0.5">
                    {selectedItem.title}{' '}
                    {selectedItem.subtitle ? `(${selectedItem.subtitle})` : ''}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedItem(null)}
                  className="p-2 rounded-full hover:bg-[#f1f3f4] text-[#5f6368] cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="mt-5 space-y-4">
                <div className="bg-[#edf2fc] rounded-[10px] p-4 flex items-start gap-3">
                  <ClipboardCheck className="w-5 h-5 text-[#0b57d0] shrink-0 mt-0.5" />
                  <div>
                    <div className="text-[13.5px] font-medium text-[#1f1f1f]">
                      Status: {selectedItem.details.status}
                    </div>
                    <div className="text-[12.5px] text-[#3c4043] mt-0.5">
                      Submitted {selectedItem.details.submittedAt}
                    </div>
                  </div>
                </div>

                <div className="border border-[#e0e2e0] rounded-[10px] divide-y divide-[#e0e2e0]">
                  <div className="px-4 py-3 flex justify-between text-[13.5px]">
                    <span className="text-[#5f6368]">Action</span>
                    <span className="font-medium text-[#202124]">
                      {selectedItem.description}
                    </span>
                  </div>
                  {selectedItem.details.versionCode && (
                    <div className="px-4 py-3 flex justify-between text-[13.5px]">
                      <span className="text-[#5f6368]">Version code</span>
                      <span className="font-mono text-[#202124] tabular-nums">
                        {selectedItem.details.versionCode}
                      </span>
                    </div>
                  )}
                  {selectedItem.details.targetSdk && (
                    <div className="px-4 py-3 flex justify-between text-[13.5px]">
                      <span className="text-[#5f6368]">Target SDK</span>
                      <span className="font-mono text-[#202124] tabular-nums">
                        {selectedItem.details.targetSdk}
                      </span>
                    </div>
                  )}
                  {selectedItem.details.rolloutPercentage && (
                    <div className="px-4 py-3 flex justify-between text-[13.5px]">
                      <span className="text-[#5f6368]">Rollout scope</span>
                      <span className="font-medium text-[#202124] tabular-nums">
                        {selectedItem.details.rolloutPercentage}
                      </span>
                    </div>
                  )}
                </div>

                <div>
                  <h4 className="text-[13px] font-medium text-[#5f6368] mb-1.5">
                    Release summary
                  </h4>
                  <p className="text-[13.5px] text-[#3c4043] leading-relaxed bg-[#f8f9fa] p-3.5 rounded-[8px] border border-[#e0e2e0]">
                    {selectedItem.details.notes}
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-[#e0e2e0] flex items-center justify-between">
              <button
                type="button"
                onClick={() => {
                  setIsCustomizeOpen(true);
                  setSelectedItem(null);
                }}
                className="px-4 py-2 text-[13.5px] font-medium text-[#0b57d0] hover:bg-[#edf2fc] rounded-[8px] flex items-center gap-2 cursor-pointer"
              >
                <Edit3 className="w-4 h-4" />
                <span>Edit row text</span>
              </button>
              <button
                type="button"
                onClick={() => setSelectedItem(null)}
                className="px-5 py-2 text-[13.5px] font-medium text-white bg-[#0b57d0] hover:bg-[#0842a0] rounded-[8px] cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CUSTOMIZE APP & RELEASE DATA MODAL */}
      {isCustomizeOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-50 flex items-center justify-center p-4"
          onClick={() => setIsCustomizeOpen(false)}
        >
          <div
            className="w-full max-w-[540px] bg-white rounded-[12px] shadow-xl border border-[#dadce0] p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-[#e0e2e0]">
              <h3 className="text-[18px] font-medium text-[#202124]">
                Customize Publishing Overview Data
              </h3>
              <button
                type="button"
                onClick={() => setIsCustomizeOpen(false)}
                className="p-1.5 rounded-full hover:bg-[#f1f3f4] text-[#5f6368] cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="mt-4 space-y-4 max-h-[65vh] overflow-y-auto pr-1">
              <div>
                <label className="block text-[12.5px] font-medium text-[#5f6368] mb-1">
                  App Name (Header & Production Release)
                </label>
                <input
                  type="text"
                  value={selectedApp}
                  onChange={(e) => handleAppNameUpdate(e.target.value)}
                  className="w-full h-10 px-3 rounded-[8px] border border-[#dadce0] text-[14px] text-[#202124] focus:border-[#0b57d0] outline-none"
                />
              </div>

              {changes.map((item, idx) => (
                <div
                  key={item.id}
                  className="p-3.5 rounded-[8px] bg-[#f8f9fa] border border-[#e0e2e0] space-y-2.5"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[12px] font-medium text-[#5f6368]">
                      Row #{idx + 1} ({item.track.replace('_', ' ')})
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-2.5">
                    <div>
                      <label className="block text-[11.5px] text-[#5f6368] mb-1">
                        Item changed
                      </label>
                      <input
                        type="text"
                        value={item.title}
                        onChange={(e) => {
                          const val = e.target.value;
                          setChanges((prev) =>
                            prev.map((c) =>
                              c.id === item.id ? {...c, title: val} : c
                            )
                          );
                        }}
                        className="w-full h-9 px-2.5 rounded-[6px] border border-[#dadce0] bg-white text-[13px]"
                      />
                    </div>
                    <div>
                      <label className="block text-[11.5px] text-[#5f6368] mb-1">
                        Description
                      </label>
                      <input
                        type="text"
                        value={item.description}
                        onChange={(e) => {
                          const val = e.target.value;
                          setChanges((prev) =>
                            prev.map((c) =>
                              c.id === item.id ? {...c, description: val} : c
                            )
                          );
                        }}
                        className="w-full h-9 px-2.5 rounded-[6px] border border-[#dadce0] bg-white text-[13px]"
                      />
                    </div>
                  </div>
                  {item.subtitle !== undefined && (
                    <div>
                      <label className="block text-[11.5px] text-[#5f6368] mb-1">
                        Version / Subtitle
                      </label>
                      <input
                        type="text"
                        value={item.subtitle}
                        onChange={(e) => {
                          const val = e.target.value;
                          setChanges((prev) =>
                            prev.map((c) =>
                              c.id === item.id ? {...c, subtitle: val} : c
                            )
                          );
                        }}
                        className="w-full h-9 px-2.5 rounded-[6px] border border-[#dadce0] bg-white text-[13px]"
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-5 pt-3 border-t border-[#e0e2e0] flex items-center justify-between">
              <button
                type="button"
                onClick={handleRestoreDefaults}
                className="px-3.5 py-2 text-[13px] font-medium text-[#5f6368] hover:text-[#202124] flex items-center gap-1.5 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset to original screenshot</span>
              </button>
              <button
                type="button"
                onClick={() => setIsCustomizeOpen(false)}
                className="px-5 py-2 text-[13.5px] font-medium text-white bg-[#0b57d0] hover:bg-[#0842a0] rounded-[8px] cursor-pointer"
              >
                Save & close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* REMOVE CHANGES CONFIRMATION MODAL */}
      {showRemoveConfirm && (
        <div
          className="fixed inset-0 bg-black/30 z-50 flex items-center justify-center p-4"
          onClick={() => setShowRemoveConfirm(false)}
        >
          <div
            className="w-full max-w-[440px] bg-white rounded-[12px] shadow-xl border border-[#dadce0] p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-[18px] font-medium text-[#202124]">
              Remove changes from review?
            </h3>
            <p className="text-[14px] text-[#3c4043] mt-2 leading-relaxed">
              Removing changes from review will return your queued releases and country updates for{' '}
              <span className="font-medium text-[#202124]">{selectedApp}</span> to draft status.
            </p>
            <div className="mt-6 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowRemoveConfirm(false)}
                className="px-4 py-2 text-[14px] font-medium text-[#0b57d0] hover:bg-[#edf2fc] rounded-[8px] cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  setChanges([]);
                  setShowRemoveConfirm(false);
                }}
                className="px-4 py-2 text-[14px] font-medium text-white bg-[#d93025] hover:bg-[#b3261e] rounded-[8px] cursor-pointer"
              >
                Remove changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* LEARN MORE / HELP MODAL */}
      {(showLearnMoreModal || showHelpModal) && (
        <div
          className="fixed inset-0 bg-black/30 z-50 flex items-center justify-center p-4"
          onClick={() => {
            setShowLearnMoreModal(false);
            setShowHelpModal(false);
          }}
        >
          <div
            className="w-full max-w-[480px] bg-white rounded-[12px] shadow-xl border border-[#dadce0] p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-[#e0e2e0]">
              <div className="flex items-center gap-2.5">
                <ClipboardCheck className="w-5 h-5 text-[#0b57d0]" />
                <h3 className="text-[17px] font-medium text-[#202124]">
                  About Play Console app reviews
                </h3>
              </div>
              <button
                type="button"
                onClick={() => {
                  setShowLearnMoreModal(false);
                  setShowHelpModal(false);
                }}
                className="p-1.5 rounded-full hover:bg-[#f1f3f4] text-[#5f6368] cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="mt-4 space-y-3 text-[14px] text-[#3c4043] leading-relaxed">
              <p>
                All changes made to your app across Production, Open testing, and Closed testing tracks are reviewed to ensure compliance with Google Play Developer Program Policies.
              </p>
              <p>
                Once your changes are approved, they will be published automatically unless Managed Publishing is turned on.
              </p>
            </div>
            <div className="mt-6 flex justify-end">
              <button
                type="button"
                onClick={() => {
                  setShowLearnMoreModal(false);
                  setShowHelpModal(false);
                }}
                className="px-5 py-2 text-[14px] font-medium text-white bg-[#0b57d0] hover:bg-[#0842a0] rounded-[8px] cursor-pointer"
              >
                Got it
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
