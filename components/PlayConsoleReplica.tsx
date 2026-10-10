'use client';

import React, {useState} from 'react';
import {
  ArrowLeft,
  ArrowRight,
  BarChart2,
  Bell,
  Check,
  ChevronDown,
  ChevronUp,
  CircleHelp,
  CirclePlay,
  ClipboardCheck,
  Clock3,
  Copy,
  Edit3,
  ExternalLink,
  Globe,
  LayoutGrid,
  Link2,
  List,
  Play,
  Plus,
  RotateCcw,
  Rocket,
  Search,
  Tag,
  Trash2,
  TrendingUp,
  Activity,
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
      notes: 'Initial production release bundle (1.0.0) queued for 100% staged rollout upon review approval.',
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
      notes: 'Targeted regional availability expansion across Albania, Algeria, Argentina, Australia, Austria, Bangladesh, Belgium, Brazil, Canada, Germany, India, Japan, United Kingdom, United States, and 162 additional territories.',
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
      notes: 'Enables automatic availability in any newly supported Google Play countries and rest-of-world regions.',
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
      notes: 'Open testing track release promoted to all public beta opt-in testers.',
    },
  },
];

const INITIAL_APPS = [
  {name: 'Subha Fun', packageName: 'com.subhafun.app', status: 'In review'},
  {name: 'Subha Studio Pro', packageName: 'com.subhastudio.pro', status: 'Production'},
  {name: 'Daily Puzzle Quest', packageName: 'com.subha.puzzlequest', status: 'Draft'},
];

export default function PlayConsoleReplica() {
  const [activeNav, setActiveNav] = useState<string>('Publishing overview');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isChangesHidden, setIsChangesHidden] = useState<boolean>(false);
  const [changes, setChanges] = useState<ReviewChangeItem[]>(INITIAL_CHANGES);
  const [closedTrackTitle, setClosedTrackTitle] = useState<string>(
    'Closed testing - first closed testing RELEASE'
  );
  const [selectedApp, setSelectedApp] = useState<string>('Subha Fun');
  const [appDropdownOpen, setAppDropdownOpen] = useState<boolean>(false);

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

  return (
    <div className="min-h-screen w-full bg-white flex text-[#202124] font-sans antialiased">
      {/* LEFT SIDEBAR */}
      <aside className="w-[258px] shrink-0 bg-[#f8f9fa] min-h-screen flex flex-col select-none pb-8">
        {/* Google Play Console Brand Mark */}
        <div className="pt-[15px] pb-[14px] px-[20px] flex items-center gap-2.5">
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
            className={`w-full h-[46px] rounded-full border border-[#dadce0] bg-[#f8f9fa] hover:bg-[#eef1f5] active:bg-[#e4e8ee] px-[18px] flex items-center gap-3.5 text-[14px] text-[#3c4043] transition-colors cursor-pointer ${
              activeNav === 'All apps' ? 'ring-2 ring-[#1a73e8]/30 bg-[#eef2f6]' : ''
            }`}
          >
            <ArrowLeft className="w-[17px] h-[17px] text-[#3c4043] stroke-[1.8] shrink-0" />
            <span className="truncate font-normal">All apps</span>
          </button>
        </div>

        {/* Top 3 Flat / Active Pill Nav Items */}
        <nav className="flex flex-col space-y-0.5">
          {/* Dashboard */}
          <button
            type="button"
            onClick={() => setActiveNav('Dashboard')}
            className={`mx-1 px-[22px] h-[44px] rounded-full flex items-center gap-[18px] text-[14px] transition-colors cursor-pointer ${
              activeNav === 'Dashboard'
                ? 'bg-[#e8f0fe] text-[#1967d2] font-medium border-[1.5px] border-[#1a73e8]'
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

          {/* Statistics */}
          <button
            type="button"
            onClick={() => setActiveNav('Statistics')}
            className={`mx-1 px-[22px] h-[44px] rounded-full flex items-center gap-[18px] text-[14px] transition-colors cursor-pointer ${
              activeNav === 'Statistics'
                ? 'bg-[#e8f0fe] text-[#1967d2] font-medium border-[1.5px] border-[#1a73e8]'
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

          {/* Publishing overview (Active in screenshot with blue outline pill) */}
          <div className="pt-0.5 pb-1 pr-[10px] pl-[1px]">
            <button
              type="button"
              onClick={() => setActiveNav('Publishing overview')}
              className={`w-full px-[21px] h-[46px] rounded-full flex items-center gap-[17px] text-[14px] transition-all cursor-pointer ${
                activeNav === 'Publishing overview'
                  ? 'bg-[#e8f0fe] text-[#174ea6] font-medium border-[1.5px] border-[#1a73e8] shadow-[0_0_0_2px_rgba(26,115,232,0.12)]'
                  : 'text-[#202124] font-normal hover:bg-[#eef2f6]'
              }`}
            >
              {/* Combined List + Clock icon matching Play Console's Publishing Overview icon */}
              <span className="relative w-[20px] h-[20px] flex items-center justify-center shrink-0">
                <List
                  className={`w-[16px] h-[16px] -mt-1 -ml-1 stroke-[2] ${
                    activeNav === 'Publishing overview' ? 'text-[#1967d2]' : 'text-[#3c4043]'
                  }`}
                />
                <Clock3
                  className={`w-[11px] h-[11px] absolute bottom-0 right-0 bg-[#e8f0fe] rounded-full stroke-[2.2] ${
                    activeNav === 'Publishing overview' ? 'text-[#1967d2]' : 'text-[#3c4043]'
                  }`}
                />
              </span>
              <span className="truncate text-[#1967d2]">Publishing overview</span>
            </button>
          </div>
        </nav>

        {/* 4 Grouped Section Navigation Cards */}
        <div className="mt-2.5 px-[10px] flex flex-col gap-[9px]">
          <button
            type="button"
            onClick={() => setActiveNav('Test and release')}
            className={`w-full h-[50px] px-[14px] rounded-[10px] flex items-center gap-[17px] text-[14px] transition-colors cursor-pointer ${
              activeNav === 'Test and release'
                ? 'bg-[#dce5f2] text-[#174ea6] font-medium'
                : 'bg-[#eef2f6] hover:bg-[#e4eaf1] text-[#202124] font-normal'
            }`}
          >
            <Rocket className="w-[19px] h-[19px] text-[#202124] stroke-[1.8] shrink-0" />
            <span className="truncate">Test and release</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveNav('Monitor and improve')}
            className={`w-full h-[50px] px-[14px] rounded-[10px] flex items-center gap-[17px] text-[14px] transition-colors cursor-pointer ${
              activeNav === 'Monitor and improve'
                ? 'bg-[#dce5f2] text-[#174ea6] font-medium'
                : 'bg-[#eef2f6] hover:bg-[#e4eaf1] text-[#202124] font-normal'
            }`}
          >
            <Activity className="w-[19px] h-[19px] text-[#202124] stroke-[1.8] shrink-0" />
            <span className="truncate">Monitor and improve</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveNav('Grow users')}
            className={`w-full h-[50px] px-[14px] rounded-[10px] flex items-center gap-[17px] text-[14px] transition-colors cursor-pointer ${
              activeNav === 'Grow users'
                ? 'bg-[#dce5f2] text-[#174ea6] font-medium'
                : 'bg-[#eef2f6] hover:bg-[#e4eaf1] text-[#202124] font-normal'
            }`}
          >
            <TrendingUp className="w-[19px] h-[19px] text-[#202124] stroke-[1.8] shrink-0 border-b border-l border-[#202124] p-[1px]" />
            <span className="truncate">Grow users</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveNav('Monetize with Play')}
            className={`w-full h-[50px] px-[14px] rounded-[10px] flex items-center gap-[17px] text-[14px] transition-colors cursor-pointer ${
              activeNav === 'Monetize with Play'
                ? 'bg-[#dce5f2] text-[#174ea6] font-medium'
                : 'bg-[#eef2f6] hover:bg-[#e4eaf1] text-[#202124] font-normal'
            }`}
          >
            <Tag className="w-[19px] h-[19px] text-[#202124] stroke-[1.8] -scale-x-100 shrink-0" />
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
                            4 changes across Production and Open testing are now being reviewed.
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
                    {INITIAL_APPS.map((app) => (
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

          {/* Sub-header Bar: "Publishing overview" */}
          <div className="pt-[14px] pb-[15px] border-b border-[#e0e2e0] flex items-center justify-between">
            <h1 className="text-[20px] font-medium text-[#202124] tracking-[-0.01em] leading-snug">
              {activeNav}
            </h1>
            {activeNav !== 'Publishing overview' && (
              <button
                type="button"
                onClick={() => setActiveNav('Publishing overview')}
                className="text-[13px] font-medium text-[#0b57d0] hover:underline cursor-pointer"
              >
                Return to Publishing overview
              </button>
            )}
          </div>
        </header>

        {/* Main Section Body */}
        <main className="pl-[36px] pr-[18px] pt-[28px] pb-16 flex-1">
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
        </main>
      </div>

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
