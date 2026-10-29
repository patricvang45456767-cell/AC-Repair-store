import React, { useState, useEffect } from 'react';
import {
  Shield,
  Search,
  Filter,
  Phone,
  MessageSquare,
  CheckCircle2,
  Clock,
  Calendar,
  AlertCircle,
  X,
  Plus,
  RefreshCw,
  LogOut,
  Settings as SettingsIcon,
  Inbox,
  User,
  Wrench,
  Check,
  ChevronRight,
  ExternalLink,
  Save,
  ArrowLeft
} from 'lucide-react';
import { ServiceRequest, SiteSettings } from '../../types';
import { fetchAdminRequests, updateRequestStatus, addRequestNote, saveSiteSettings } from '../../lib/api';
import { formatDate, timeAgo, getStatusDetails, createTelUrl, createWhatsAppUrl } from '../../lib/utils';
import { supabase } from '../../lib/supabase';

interface AdminDashboardProps {
  isOpen: boolean;
  onClose: () => void;
  settings: SiteSettings;
  onUpdateSettings: (newSettings: SiteSettings) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  isOpen,
  onClose,
  settings,
  onUpdateSettings,
}) => {
  // Auth state
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [authLoading, setAuthLoading] = useState(false);

  // Dashboard state
  const [activeTab, setActiveTab] = useState<'requests' | 'settings'>('requests');
  const [requests, setRequests] = useState<ServiceRequest[]>([]);
  const [counts, setCounts] = useState<Record<string, number>>({});
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<ServiceRequest | null>(null);

  // New Note input
  const [newNoteText, setNewNoteText] = useState('');
  const [noteSubmitting, setNoteSubmitting] = useState(false);

  // Editable settings state
  const [editableSettings, setEditableSettings] = useState<SiteSettings>(settings);
  const [settingsSaved, setSettingsSaved] = useState(false);

  // Status transitions
  const statusOptions = [
    { value: 'new', label: 'New' },
    { value: 'contacted', label: 'Contacted' },
    { value: 'scheduled', label: 'Scheduled' },
    { value: 'in_progress', label: 'In Progress' },
    { value: 'completed', label: 'Completed' },
    { value: 'cancelled', label: 'Cancelled' },
    { value: 'unable_to_serve', label: 'Unable to Serve' },
  ];

  const loadRequests = async () => {
    setLoading(true);
    try {
      const res = await fetchAdminRequests(statusFilter, searchQuery);
      if (res.success) {
        setRequests(res.data);
        setCounts(res.counts);
        // keep selected request updated
        if (selectedRequest) {
          const updated = res.data.find((r) => r.id === selectedRequest.id);
          if (updated) setSelectedRequest(updated);
        } else if (res.data.length > 0 && !selectedRequest) {
          setSelectedRequest(res.data[0]);
        }
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated && isOpen) {
      loadRequests();
    }
  }, [isAuthenticated, isOpen, statusFilter, searchQuery]);

  // Restore only an authenticated Supabase session that is still assigned admin access.
  useEffect(() => {
    if (!isOpen) return;
    let cancelled = false;

    const restoreSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        if (!cancelled) setIsAuthenticated(false);
        return;
      }

      const { data: isAdmin, error } = await supabase.rpc('is_current_user_admin');
      if (cancelled) return;
      if (!error && isAdmin === true) {
        setIsAuthenticated(true);
      } else {
        await supabase.auth.signOut();
        setIsAuthenticated(false);
      }
    };

    void restoreSession();
    return () => {
      cancelled = true;
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (authLoading) return;

    setAuthLoading(true);
    setLoginError('');
    try {
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

      if (signInError) {
        setLoginError('Email ya password ghalat hai.');
        return;
      }

      const { data: isAdmin, error: permissionError } = await supabase.rpc('is_current_user_admin');
      if (permissionError || isAdmin !== true) {
        await supabase.auth.signOut();
        setLoginError('Is account ko admin access nahi diya gaya.');
        return;
      }

      setIsAuthenticated(true);
      setPassword('');
    } catch {
      setLoginError('Login abhi nahi ho saka. Dobara koshish karein.');
    } finally {
      setAuthLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
    } finally {
      setIsAuthenticated(false);
      setRequests([]);
      setCounts({});
      setSelectedRequest(null);
      setActiveTab('requests');
      setEmail('');
      setPassword('');
      setLoginError('');
    }
  };

  const handleStatusChange = async (newStatus: string) => {
    if (!selectedRequest) return;
    try {
      const res = await updateRequestStatus(selectedRequest.id, newStatus, `Status updated to ${newStatus}`);
      if (res.success && res.data) {
        setSelectedRequest(res.data);
        loadRequests();
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleAddNote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedRequest || !newNoteText.trim()) return;
    setNoteSubmitting(true);
    try {
      const res = await addRequestNote(selectedRequest.id, newNoteText.trim(), 'Admin Dispatcher');
      if (res.success) {
        setNewNoteText('');
        loadRequests();
      }
    } catch (e) {
      console.error(e);
    } finally {
      setNoteSubmitting(false);
    }
  };

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    const ok = await saveSiteSettings(editableSettings);
    if (ok) {
      onUpdateSettings(editableSettings);
      setSettingsSaved(true);
      setTimeout(() => setSettingsSaved(false), 3000);
    }
  };

  return (
    <div className="min-h-screen w-full bg-slate-950 text-white flex flex-col overflow-hidden">
      <div className="bg-slate-900 text-white w-full min-h-screen border-0 shadow-none flex flex-col overflow-hidden">
        
        {/* Top Navbar */}
        <div className="px-6 py-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-cyan-600 flex items-center justify-center text-white font-bold">
              <Shield className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-base text-white font-display">ABC Operations Desk</span>
                <span className="text-[10px] font-bold uppercase tracking-wider bg-cyan-950 text-cyan-400 px-2 py-0.5 rounded-full border border-cyan-800">
                  Dispatcher v1.0
                </span>
              </div>
              <p className="text-xs text-slate-400">Live Intake & Technician Follow-up System</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {isAuthenticated && (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveTab('requests')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                    activeTab === 'requests'
                      ? 'bg-cyan-600 text-white'
                      : 'bg-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  Requests Inbox
                </button>
                <button
                  onClick={() => setActiveTab('settings')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5 ${
                    activeTab === 'settings'
                      ? 'bg-cyan-600 text-white'
                      : 'bg-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  <SettingsIcon className="w-3.5 h-3.5" />
                  <span>Shop Settings</span>
                </button>
                <button
                  onClick={() => void handleLogout()}
                  className="px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5 bg-slate-800 text-slate-300 hover:text-white"
                  title="Sign out of admin panel"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Sign Out</span>
                </button>
              </div>
            )}

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
              title="Return to Public Website"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Auth Guard */}
        {!isAuthenticated ? (
          <div className="flex-1 flex items-center justify-center p-6 bg-slate-900">
            <div className="bg-slate-800/90 border border-slate-700 rounded-2xl p-8 max-w-md w-full shadow-2xl">
              <div className="text-center mb-6">
                <div className="w-12 h-12 rounded-2xl bg-cyan-950 text-cyan-400 flex items-center justify-center mx-auto mb-3 border border-cyan-800/60">
                  <Shield className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-extrabold text-white font-display">Staff & Admin Login</h3>
                <p className="text-xs text-slate-400 mt-1">
                  Access incoming AC service requests and technician notes
                </p>
              </div>

              {loginError && (
                <div className="mb-4 p-3 rounded-xl bg-rose-950/60 border border-rose-800 text-rose-300 text-xs">
                  {loginError}
                </div>
              )}

              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    autoComplete="username"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Password</label>
                  <input
                    type="password"
                    required
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <button
                  type="submit"
                  disabled={authLoading}
                  className="w-full py-3 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded-xl text-sm transition-all shadow-md cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {authLoading ? 'Signing In…' : 'Sign In to Dashboard'}
                </button>
              </form>
            </div>
          </div>
        ) : (
          /* Main Authenticated View */
          <div className="flex-1 flex flex-col overflow-hidden">
            
            {activeTab === 'requests' ? (
              <div className="flex-1 flex flex-col overflow-hidden">
                
                {/* Metrics Bar */}
                <div className="bg-slate-950/60 border-b border-slate-800 px-6 py-3 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3 text-xs">
                  <div className="p-2.5 bg-slate-900/80 rounded-xl border border-slate-800">
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Total Inquiries</span>
                    <span className="text-xl font-extrabold text-white font-display">{counts.all || requests.length}</span>
                  </div>
                  <div className="p-2.5 bg-emerald-950/40 rounded-xl border border-emerald-900/60">
                    <span className="text-emerald-400 block text-[10px] uppercase font-bold">New Requests</span>
                    <span className="text-xl font-extrabold text-emerald-300 font-display">{counts.new || 0}</span>
                  </div>
                  <div className="p-2.5 bg-blue-950/40 rounded-xl border border-blue-900/60">
                    <span className="text-blue-400 block text-[10px] uppercase font-bold">Contacted</span>
                    <span className="text-xl font-extrabold text-blue-300 font-display">{counts.contacted || 0}</span>
                  </div>
                  <div className="p-2.5 bg-purple-950/40 rounded-xl border border-purple-900/60">
                    <span className="text-purple-400 block text-[10px] uppercase font-bold">Scheduled</span>
                    <span className="text-xl font-extrabold text-purple-300 font-display">{counts.scheduled || 0}</span>
                  </div>
                  <div className="p-2.5 bg-teal-950/40 rounded-xl border border-teal-900/60">
                    <span className="text-teal-400 block text-[10px] uppercase font-bold">Completed</span>
                    <span className="text-xl font-extrabold text-teal-300 font-display">{counts.completed || 0}</span>
                  </div>
                  <div className="p-2.5 bg-slate-900/80 rounded-xl border border-slate-800 flex items-center justify-between">
                    <div>
                      <span className="text-slate-400 block text-[10px] uppercase font-bold">Refresh</span>
                      <button
                        onClick={loadRequests}
                        className="text-xs font-bold text-cyan-400 hover:text-cyan-300 flex items-center gap-1 mt-1 cursor-pointer"
                      >
                        <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
                        <span>Update List</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Filter & Search Bar */}
                <div className="p-4 bg-slate-900 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
                  {/* Status Pills */}
                  <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
                    {['all', 'new', 'contacted', 'scheduled', 'in_progress', 'completed', 'cancelled'].map((st) => (
                      <button
                        key={st}
                        onClick={() => setStatusFilter(st)}
                        className={`px-3 py-1.5 rounded-lg font-bold capitalize whitespace-nowrap transition-colors cursor-pointer ${
                          statusFilter === st
                            ? 'bg-cyan-500 text-slate-950'
                            : 'bg-slate-800 text-slate-400 hover:text-white'
                        }`}
                      >
                        {st.replace('_', ' ')}
                      </button>
                    ))}
                  </div>

                  {/* Search Input */}
                  <div className="relative w-full sm:w-64">
                    <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search name, phone, ref, area..."
                      className="w-full pl-9 pr-3 py-1.5 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                    />
                  </div>
                </div>

                {/* Main Content Split (Inbox List + Details Panel) */}
                <div className="flex-1 grid grid-cols-1 md:grid-cols-12 overflow-hidden">
                  
                  {/* Left Column: Requests List (5 cols) */}
                  <div className="md:col-span-5 border-r border-slate-800 overflow-y-auto divide-y divide-slate-800/80">
                    {requests.length === 0 ? (
                      <div className="p-8 text-center text-slate-500 text-xs">
                        No service requests matching current filters.
                      </div>
                    ) : (
                      requests.map((req) => {
                        const statusStyle = getStatusDetails(req.status);
                        const isSelected = selectedRequest?.id === req.id;
                        return (
                          <div
                            key={req.id}
                            onClick={() => setSelectedRequest(req)}
                            className={`p-4 transition-colors cursor-pointer hover:bg-slate-800/60 ${
                              isSelected ? 'bg-slate-800 border-l-4 border-cyan-400' : ''
                            }`}
                          >
                            <div className="flex items-center justify-between mb-1.5">
                              <span className="font-mono text-[11px] font-bold text-cyan-400">
                                {req.refCode}
                              </span>
                              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${statusStyle.bg} ${statusStyle.text}`}>
                                {statusStyle.label}
                              </span>
                            </div>

                            <div className="font-bold text-sm text-white mb-0.5">
                              {req.customerName}
                            </div>
                            <div className="text-xs text-slate-400 flex items-center justify-between">
                              <span>{req.areaText}</span>
                              <span className="text-[11px] text-slate-500">{timeAgo(req.createdAt)}</span>
                            </div>

                            <p className="text-xs text-slate-400 line-clamp-2 mt-2 bg-slate-900/60 p-2 rounded-lg border border-slate-800">
                              {req.problemDescription}
                            </p>
                          </div>
                        );
                      })
                    )}
                  </div>

                  {/* Right Column: Detailed Request View & Action Hub (7 cols) */}
                  <div className="md:col-span-7 overflow-y-auto p-6 bg-slate-900/95 flex flex-col justify-between">
                    {selectedRequest ? (
                      <div className="space-y-6">
                        {/* Top Header of Selected Request */}
                        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-800">
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-mono font-bold text-cyan-400 bg-cyan-950 px-2 py-0.5 rounded border border-cyan-800">
                                {selectedRequest.refCode}
                              </span>
                              <h3 className="text-xl font-extrabold text-white font-display">
                                {selectedRequest.customerName}
                              </h3>
                            </div>
                            <div className="text-xs text-slate-400 mt-1">
                              Received {formatDate(selectedRequest.createdAt)}
                            </div>
                          </div>

                          {/* Quick Action Dial / WhatsApp Buttons */}
                          <div className="flex items-center gap-2">
                            <a
                              href={createTelUrl(selectedRequest.customerPhone)}
                              className="px-3 py-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold rounded-xl text-xs flex items-center gap-1.5 shadow-xs transition-colors"
                            >
                              <Phone className="w-3.5 h-3.5" />
                              <span>Call Client</span>
                            </a>
                            <a
                              href={createWhatsAppUrl(
                                selectedRequest.customerPhone,
                                `Hello ${selectedRequest.customerName}, this is Apex Air Care dispatcher regarding your AC service request #${selectedRequest.refCode}. We have assigned an engineer for your inspection.`
                              )}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-3 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 shadow-xs transition-colors"
                            >
                              <MessageSquare className="w-3.5 h-3.5 fill-white" />
                              <span>WhatsApp</span>
                            </a>
                          </div>
                        </div>

                        {/* Status Lifecycle Dropdown */}
                        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-wrap items-center justify-between gap-3">
                          <div>
                            <span className="text-xs font-bold text-slate-400 block mb-0.5">Current Lifecycle Stage:</span>
                            <div className="text-sm font-bold text-white capitalize">{selectedRequest.status.replace('_', ' ')}</div>
                          </div>

                          <div className="flex items-center gap-2">
                            <span className="text-xs text-slate-400">Change Status:</span>
                            <select
                              value={selectedRequest.status}
                              onChange={(e) => handleStatusChange(e.target.value)}
                              className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs font-bold text-cyan-400 focus:outline-none focus:border-cyan-500 cursor-pointer"
                            >
                              {statusOptions.map((opt) => (
                                <option key={opt.value} value={opt.value}>
                                  {opt.label}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>

                        {/* Customer & Technical Breakdown Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                          <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 space-y-2">
                            <span className="font-bold text-slate-300 block uppercase tracking-wider text-[10px]">Client Details</span>
                            <div><strong>Phone:</strong> {selectedRequest.customerPhone}</div>
                            <div><strong>Area / Sector:</strong> {selectedRequest.areaText}</div>
                            <div><strong>Preferred Visit:</strong> {selectedRequest.preferredDate || 'Earliest available'} ({selectedRequest.preferredTimeWindow || 'Anytime'})</div>
                          </div>

                          <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 space-y-2">
                            <span className="font-bold text-slate-300 block uppercase tracking-wider text-[10px]">AC System Specification</span>
                            <div><strong>Service Category:</strong> {selectedRequest.serviceLabel}</div>
                            <div><strong>AC Type:</strong> <span className="capitalize">{selectedRequest.acType}</span></div>
                            <div><strong>Brand / Model:</strong> {selectedRequest.brandModel || 'Unspecified'}</div>
                          </div>
                        </div>

                        {/* Full Problem Description */}
                        <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800">
                          <span className="font-bold text-slate-300 block uppercase tracking-wider text-[10px] mb-1.5">
                            Customer Problem Description:
                          </span>
                          <p className="text-xs text-slate-200 leading-relaxed whitespace-pre-wrap">
                            {selectedRequest.problemDescription}
                          </p>
                          {selectedRequest.additionalNotes && (
                            <div className="mt-2 pt-2 border-t border-slate-800 text-xs text-slate-400">
                              <strong>Additional Note:</strong> {selectedRequest.additionalNotes}
                            </div>
                          )}
                        </div>

                        {/* Internal Dispatcher & Technician Notes Timeline */}
                        <div className="space-y-3">
                          <span className="font-bold text-white text-xs uppercase tracking-wider block">
                            Internal Technician & Dispatch Notes:
                          </span>

                          <div className="space-y-2 max-h-44 overflow-y-auto pr-1">
                            {selectedRequest.notes.map((note) => (
                              <div key={note.id} className="p-3 bg-slate-950 border border-slate-800 rounded-xl text-xs space-y-1">
                                <div className="flex items-center justify-between text-[10px] text-slate-400">
                                  <span className="font-bold text-cyan-400">{note.author}</span>
                                  <span>{formatDate(note.createdAt)}</span>
                                </div>
                                <p className="text-slate-300">{note.text}</p>
                              </div>
                            ))}
                          </div>

                          {/* Add Note Form */}
                          <form onSubmit={handleAddNote} className="flex gap-2">
                            <input
                              type="text"
                              value={newNoteText}
                              onChange={(e) => setNewNoteText(e.target.value)}
                              placeholder="Add technician visit note, quote amount, or appointment update..."
                              className="flex-1 bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                            />
                            <button
                              type="submit"
                              disabled={noteSubmitting || !newNoteText.trim()}
                              className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded-xl text-xs transition-colors disabled:opacity-50 cursor-pointer"
                            >
                              Add Note
                            </button>
                          </form>
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center h-full text-center text-slate-500 text-xs">
                        Select a request on the left to review details and change status.
                      </div>
                    )}
                  </div>

                </div>

              </div>
            ) : (
              /* Settings Tab */
              <div className="flex-1 overflow-y-auto p-6 max-w-3xl mx-auto w-full">
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-800">
                  <div>
                    <h3 className="text-xl font-extrabold text-white font-display">Business Profile & Website Settings</h3>
                    <p className="text-xs text-slate-400">Update business contact numbers, service areas, and pricing notice without modifying code.</p>
                  </div>
                  {settingsSaved && (
                    <span className="text-xs font-bold px-3 py-1 bg-emerald-950 text-emerald-300 rounded-full border border-emerald-800 flex items-center gap-1">
                      <Check className="w-3.5 h-3.5" />
                      Saved Successfully
                    </span>
                  )}
                </div>

                <form onSubmit={handleSaveSettings} className="space-y-4 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-bold text-slate-300 mb-1">Business Name</label>
                      <input
                        type="text"
                        value={editableSettings.businessName}
                        onChange={(e) => setEditableSettings({ ...editableSettings, businessName: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-slate-300 mb-1">Display Phone</label>
                      <input
                        type="text"
                        value={editableSettings.phoneDisplay}
                        onChange={(e) => setEditableSettings({ ...editableSettings, phoneDisplay: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-bold text-slate-300 mb-1">Phone E.164 (Dialer format)</label>
                      <input
                        type="text"
                        value={editableSettings.phoneE164}
                        onChange={(e) => setEditableSettings({ ...editableSettings, phoneE164: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-slate-300 mb-1">WhatsApp Number (e.g. +92300...)</label>
                      <input
                        type="text"
                        value={editableSettings.whatsappE164}
                        onChange={(e) => setEditableSettings({ ...editableSettings, whatsappE164: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-300 mb-1">Operating Hours</label>
                    <input
                      type="text"
                      value={editableSettings.openingHours}
                      onChange={(e) => setEditableSettings({ ...editableSettings, openingHours: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-300 mb-1">Pricing & Inspection Fee Policy Text</label>
                    <textarea
                      rows={3}
                      value={editableSettings.pricePolicy}
                      onChange={(e) => setEditableSettings({ ...editableSettings, pricePolicy: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white"
                    ></textarea>
                  </div>

                  <div className="pt-3">
                    <button
                      type="submit"
                      className="px-6 py-2.5 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded-xl text-xs sm:text-sm transition-all flex items-center gap-2 cursor-pointer shadow-md"
                    >
                      <Save className="w-4 h-4" />
                      <span>Save Settings</span>
                    </button>
                  </div>
                </form>
              </div>
            )}

          </div>
        )}

      </div>
    </div>
  );
};
