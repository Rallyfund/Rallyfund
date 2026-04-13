'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Trophy, Plus, User, Phone, Mail, Heart, Home, MessageSquare } from 'lucide-react';
import { Program, ProgramStudent, Contact, addContact, refreshProgram, markAsSent } from '@/lib/programStore';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/Button';

interface Props {
  program: Program;
  studentName: string;
  studentId: string;
  programCode: string;
}

export function StudentPortal({ program: initialProgram, studentName, studentId, programCode }: Props) {
  const [program, setProgram] = useState(initialProgram);
  const [showContactForm, setShowContactForm] = useState(false);
  const [contactForm, setContactForm] = useState({ name: '', email: '', phone: '', relationship: '' });
  const [saving, setSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [sentIds, setSentIds] = useState<Set<string>>(new Set());

  const handleSendText = async (contact: Contact) => {
    if (!contact.phone) return;
    
    // Mark as sent in DB
    await markAsSent(contact.id);
    
    // Update local UI state
    setSentIds(prev => new Set(prev).add(contact.id));
    
    // Open SMS link
    const href = getSmsHref(contact.name, contact.phone);
    window.open(href, '_blank');
  };

  const refresh = async () => {
    const p = await refreshProgram(programCode);
    if (p) setProgram(p);
  };

  // Realtime: refresh when students table changes for this program
  useEffect(() => {
    const channel = supabase
      .channel(`student-portal-${programCode}`)
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'students', filter: `program_code=eq.${programCode}` },
        () => { refresh(); }
      )
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'donations', filter: `program_code=eq.${programCode}` },
        () => { refresh(); }
      )
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [programCode]);

  const student: ProgramStudent | undefined = program.students.find(
    (s) => s.id === studentId || s.name.toLowerCase() === studentName.toLowerCase()
  );

  const sortedStudents = [...program.students].sort((a, b) => b.raised - a.raised);
  const rank = student ? sortedStudents.findIndex((s) => s.id === student.id || s.name.toLowerCase() === student.name.toLowerCase()) + 1 : 0;
  const progress = Math.min((program.totalRaised / program.goal) * 100, 100);

  const handleAddContact = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!student) return;
    setSaving(true);
    const contact = await addContact(programCode, student.id, {
      name: contactForm.name,
      email: contactForm.email || undefined,
      phone: contactForm.phone || undefined,
      relationship: contactForm.relationship || undefined,
    });
    if (contact) {
      await refresh();
      setContactForm({ name: '', email: '', phone: '', relationship: '' });
      setShowContactForm(false);
      setSuccessMsg('Contact added successfully!');
      setTimeout(() => setSuccessMsg(''), 3000);
    }
    setSaving(false);
  };

  const rankLabel = (r: number) => {
    if (r === 1) return '🥇';
    if (r === 2) return '🥈';
    if (r === 3) return '🥉';
    return `#${r}`;
  };

  const getSmsHref = (contactName: string, phone: string) => {
    const isIOS = typeof navigator !== 'undefined' && /iPad|iPhone|iPod/.test(navigator.userAgent);
    const origin = typeof window !== 'undefined' ? window.location.origin : 'https://rallyfund.com';
    const message = `Hi ${contactName}! I'm raising money for ${program.programName} with Rallyfund. Would you consider supporting my fundraiser? Here is my link: ${origin}/donate/${studentId}`;
    const separator = isIOS ? '&' : '?';
    // Strip everything but numbers and '+' for maximum compat
    const cleanPhone = phone.replace(/[^\d+]/g, '');
    return `sms:${cleanPhone}${separator}body=${encodeURIComponent(message)}`;
  };

  const currentContacts: Contact[] = student?.contacts ?? [];

  return (
    <div className="min-h-screen bg-[#0a172e]">
      {/* Portal header */}
      <header className="bg-[#0f1f3d] border-b border-white/10 sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#22C55E] flex items-center justify-center">
              <TrendingUp className="w-4 h-4 text-white" />
            </div>
            <span className="text-white font-bold text-sm">Rallyfund</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <p className="text-white/40 text-xs">Signed in as</p>
              <p className="text-white font-semibold text-sm">{studentName}</p>
            </div>
            <a
              href="/"
              className="p-2 rounded-lg text-white/40 hover:text-white hover:bg-white/10 transition-colors"
              title="Back to home"
            >
              <Home className="w-4 h-4" />
            </a>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-8 space-y-5">
        {/* Program overview */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/5 border border-white/10 rounded-2xl p-6"
        >
          <p className="text-[#22C55E] text-xs font-bold uppercase tracking-wider">{program.schoolName}</p>
          <h1 className="text-2xl font-extrabold text-white mt-1">{program.programName}</h1>
          <div className="mt-4">
            <div className="flex justify-between text-sm text-white/50 mb-2">
              <span className="font-semibold text-white">${program.totalRaised.toLocaleString()} raised</span>
              <span>Goal: ${program.goal.toLocaleString()}</span>
            </div>
            <div className="h-2.5 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-2.5 bg-[#22C55E] rounded-full transition-all duration-700"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="flex justify-between mt-2">
              <p className="text-[#22C55E] text-xs font-semibold">{progress.toFixed(0)}% of goal</p>
              <p className="text-white/40 text-xs">{program.daysRemaining} days left</p>
            </div>
          </div>
        </motion.div>

        {/* Personal stats */}
        {student && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-3 gap-3"
          >
            <div className="bg-white/5 border border-white/10 rounded-2xl p-4 text-center">
              <p className="text-3xl font-bold text-white">{rankLabel(rank)}</p>
              <p className="text-white/40 text-xs mt-1.5 font-medium">Your Rank</p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-4 text-center">
              <p className="text-xl font-bold text-[#22C55E]">${student.raised.toLocaleString()}</p>
              <p className="text-white/40 text-xs mt-1.5 font-medium">Raised</p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-4 text-center">
              <p className="text-xl font-bold text-white">{currentContacts.length}</p>
              <p className="text-white/40 text-xs mt-1.5 font-medium">Contacts</p>
            </div>
          </motion.div>
        )}

        {/* Contacts */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white/5 border border-white/10 rounded-2xl p-6"
        >
          <div className="flex items-start justify-between mb-4">
            <div>
              <h2 className="text-lg font-bold text-white">My Donor Contacts</h2>
              <p className="text-white/40 text-sm">People who might support your fundraiser</p>
            </div>
            <button
              onClick={() => setShowContactForm((v) => !v)}
              className="flex items-center gap-1.5 bg-[#22C55E] hover:bg-[#16a34a] text-white px-3 py-2 rounded-xl font-semibold text-sm transition-colors flex-shrink-0"
            >
              <Plus className="w-4 h-4" />
              <span className="hidden sm:inline">Add Contact</span>
              <span className="sm:hidden">Add</span>
            </button>
          </div>

          {successMsg && (
            <div className="bg-[#22C55E]/15 border border-[#22C55E]/30 rounded-xl px-4 py-3 mb-4 text-[#22C55E] text-sm font-medium">
              {successMsg}
            </div>
          )}

          {showContactForm && (
            <motion.form
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              onSubmit={handleAddContact}
              className="bg-white/5 border border-white/10 rounded-xl p-4 mb-4 space-y-3"
            >
              <input
                required
                placeholder="Contact name *"
                value={contactForm.name}
                onChange={(e) => setContactForm((p) => ({ ...p, name: e.target.value }))}
                className="w-full bg-white/10 border border-white/15 rounded-lg px-3 py-2.5 text-white placeholder:text-white/30 focus:outline-none focus:border-[#22C55E] text-sm transition-all"
              />
              <div className="grid grid-cols-2 gap-3">
                <input
                  placeholder="Email address"
                  type="email"
                  value={contactForm.email}
                  onChange={(e) => setContactForm((p) => ({ ...p, email: e.target.value }))}
                  className="w-full bg-white/10 border border-white/15 rounded-lg px-3 py-2.5 text-white placeholder:text-white/30 focus:outline-none focus:border-[#22C55E] text-sm transition-all"
                />
                <input
                  placeholder="Phone number"
                  type="tel"
                  value={contactForm.phone}
                  onChange={(e) => setContactForm((p) => ({ ...p, phone: e.target.value }))}
                  className="w-full bg-white/10 border border-white/15 rounded-lg px-3 py-2.5 text-white placeholder:text-white/30 focus:outline-none focus:border-[#22C55E] text-sm transition-all"
                />
              </div>
              <input
                placeholder="Relationship (e.g., Grandma, Uncle Dave)"
                value={contactForm.relationship}
                onChange={(e) => setContactForm((p) => ({ ...p, relationship: e.target.value }))}
                className="w-full bg-white/10 border border-white/15 rounded-lg px-3 py-2.5 text-white placeholder:text-white/30 focus:outline-none focus:border-[#22C55E] text-sm transition-all"
              />
              {contactForm.phone && (
                <p className="text-white/30 text-xs leading-relaxed px-1">
                  By saving a phone number, you confirm this person has agreed to receive a text message from you about your fundraiser. Message &amp; data rates may apply.
                </p>
              )}
              <div className="flex gap-2 pt-1">
                <Button variant="primary" size="sm" type="submit" disabled={saving}>
                  {saving ? 'Saving...' : 'Save Contact'}
                </Button>
                <button
                  type="button"
                  onClick={() => setShowContactForm(false)}
                  className="px-4 py-2 text-white/40 hover:text-white text-sm transition-colors"
                >
                  Cancel
                </button>
              </div>
            </motion.form>
          )}

          {currentContacts.length > 0 ? (
            <div className="space-y-2">
              {currentContacts.map((contact) => (
                <div
                  key={contact.id}
                  className="flex items-center gap-3 bg-white/5 rounded-xl px-4 py-3"
                >
                  <div className="w-9 h-9 rounded-full bg-[#1B3A6B] flex items-center justify-center flex-shrink-0">
                    <User className="w-4 h-4 text-white/50" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-white font-semibold text-sm">{contact.name}</p>
                      {contact.lastSentAt && !contact.isUnsubscribed && (new Date().getTime() - new Date(contact.lastSentAt).getTime() > 48 * 60 * 60 * 1000) && (
                        <span className="bg-red-500/20 text-red-400 text-[10px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider">
                          Follow-up Due
                        </span>
                      )}
                    </div>
                    <div className="flex flex-wrap gap-x-3 gap-y-0.5 mt-0.5">
                      {contact.relationship && (
                        <span className="text-white/40 text-xs">{contact.relationship}</span>
                      )}
                      {contact.email && (
                        <span className="text-white/40 text-xs flex items-center gap-1">
                          <Mail className="w-3 h-3" />
                          {contact.email}
                        </span>
                      )}
                      {contact.phone && (
                        <span className="text-white/40 text-xs flex items-center gap-1">
                          <Phone className="w-3 h-3" />
                          {contact.phone}
                        </span>
                      )}
                    </div>
                  </div>
                  {contact.phone ? (
                    <button
                      onClick={() => handleSendText(contact)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex-shrink-0 ${
                        contact.lastSentAt || sentIds.has(contact.id)
                          ? 'bg-white/10 text-white/60'
                          : 'bg-[#22C55E]/10 hover:bg-[#22C55E]/20 text-[#22C55E]'
                      }`}
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>{contact.lastSentAt || sentIds.has(contact.id) ? 'Sent ✅' : 'Send Text'}</span>
                    </button>
                  ) : (
                    <Heart className="w-4 h-4 text-white/15 flex-shrink-0" />
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-10">
              <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-3">
                <User className="w-6 h-6 text-white/20" />
              </div>
              <p className="text-white/40 text-sm">No contacts yet.</p>
              <p className="text-white/25 text-xs mt-1">Add people who might donate to your fundraiser!</p>
            </div>
          )}
        </motion.div>

        {/* Leaderboard */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white/5 border border-white/10 rounded-2xl p-6"
        >
          <div className="flex items-center gap-2 mb-5">
            <Trophy className="w-5 h-5 text-[#F59E0B]" />
            <h2 className="text-lg font-bold text-white">Leaderboard</h2>
          </div>
          <div className="space-y-2">
            {sortedStudents.map((s, i) => {
              const isMe =
                s.id === student?.id ||
                s.name.toLowerCase() === studentName.toLowerCase();
              return (
                <div
                  key={s.id}
                  className={`flex items-center gap-3 rounded-xl px-4 py-3 transition-all ${
                    isMe
                      ? 'bg-[#22C55E]/10 border border-[#22C55E]/30'
                      : 'bg-white/[0.03] border border-transparent'
                  }`}
                >
                  <span className="text-base w-8 flex-shrink-0 text-center">
                    {i < 3 ? ['🥇', '🥈', '🥉'][i] : <span className="text-white/40 text-sm font-bold">#{i + 1}</span>}
                  </span>
                  <span
                    className={`flex-1 font-semibold text-sm truncate ${
                      isMe ? 'text-[#22C55E]' : 'text-white/80'
                    }`}
                  >
                    {s.name}
                    {isMe && (
                      <span className="ml-2 text-[#22C55E]/60 text-xs font-normal">(you)</span>
                    )}
                  </span>
                  <span
                    className={`font-bold text-sm flex-shrink-0 ${
                      isMe ? 'text-[#22C55E]' : 'text-white/60'
                    }`}
                  >
                    ${s.raised.toLocaleString()}
                  </span>
                </div>
              );
            })}
          </div>
        </motion.div>

        <div className="pb-8" />
      </div>
    </div>
  );
}
