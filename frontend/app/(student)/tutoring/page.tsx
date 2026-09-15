'use client'

import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowLeft, Video, Mic, MicOff, VideoOff, PhoneOff,
  ScreenShare, MessageSquare, Users, Clock, Star,
  Sparkles, ChevronRight, Send, Hand, Settings as SettingsIcon,
  Volume2, Maximize, Calendar, Search,
} from 'lucide-react'
import Link from 'next/link'
import { PrismLogo } from '@/components/prism/PrismLogo'
import { useState, useRef, useEffect } from 'react'

const tutors = [
  { id: 't1', name: 'Dr. Anjali Mehta', subject: 'Mathematics', rating: 4.9, reviews: 320, avatar: 'from-brand-500 to-accent-500', online: true, expertise: ['Algebra', 'Calculus', 'Geometry'], price: '₹0', bio: 'IIT Delhi alumni · 12+ years teaching' },
  { id: 't2', name: 'Prof. Rajesh Iyer', subject: 'Physics', rating: 4.8, reviews: 245, avatar: 'from-mint-500 to-gold-500', online: true, expertise: ['Mechanics', 'Optics', 'Thermodynamics'], price: '₹0', bio: 'IIT Bombay alumni · 10+ years teaching' },
  { id: 't3', name: 'Ms. Kavitha Nair', subject: 'Chemistry', rating: 4.9, reviews: 189, avatar: 'from-purple-500 to-brand-500', online: false, expertise: ['Organic', 'Inorganic', 'Physical'], price: '₹0', bio: 'MSc Chemistry · 7+ years teaching' },
  { id: 't4', name: 'Mr. Arjun Singh', subject: 'Biology', rating: 4.7, reviews: 156, avatar: 'from-gold-500 to-orange-500', online: true, expertise: ['Botany', 'Zoology', 'Genetics'], price: '₹0', bio: 'MBBS · 5+ years teaching' },
  { id: 't5', name: 'Ms. Sneha Reddy', subject: 'English', rating: 4.8, reviews: 203, avatar: 'from-accent-500 to-purple-500', online: true, expertise: ['Grammar', 'Literature', 'Writing'], price: '₹0', bio: 'MA English · 8+ years teaching' },
  { id: 't6', name: 'Mr. Vikram Joshi', subject: 'Computer Science', rating: 4.9, reviews: 178, avatar: 'from-cyan-500 to-brand-500', online: false, expertise: ['Python', 'Java', 'Data Structures'], price: '₹0', bio: 'Ex-Google · 6+ years teaching' },
]

const upcomingSessions = [
  { id: 's1', tutor: 'Dr. Anjali Mehta', subject: 'Mathematics', topic: 'Quadratic Equations', date: 'Today', time: '4:00 PM', duration: '45 min' },
  { id: 's2', tutor: 'Prof. Rajesh Iyer', subject: 'Physics', topic: 'Laws of Motion', date: 'Tomorrow', time: '5:30 PM', duration: '60 min' },
]

const chatMessages = [
  { id: 'm1', sender: 'tutor', text: 'Hello! Ready to start with quadratic equations?', time: '4:00 PM' },
  { id: 'm2', sender: 'student', text: 'Yes, I have some questions about the discriminant.', time: '4:01 PM' },
  { id: 'm3', sender: 'tutor', text: 'Great! The discriminant tells us the nature of roots. Let me explain with examples.', time: '4:02 PM' },
]

export default function TutoringPage() {
  const [view, setView] = useState<'list' | 'session'>('list')
  const [selectedTutor, setSelectedTutor] = useState<typeof tutors[0] | null>(null)
  const [micOn, setMicOn] = useState(true)
  const [videoOn, setVideoOn] = useState(true)
  const [handRaised, setHandRaised] = useState(false)
  const [chatOpen, setChatOpen] = useState(true)
  const [messages, setMessages] = useState(chatMessages)
  const [newMessage, setNewMessage] = useState('')
  const [search, setSearch] = useState('')
  const chatEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const startSession = (tutor: typeof tutors[0]) => {
    setSelectedTutor(tutor)
    setView('session')
  }

  const endSession = () => {
    setView('list')
    setSelectedTutor(null)
    setMicOn(true)
    setVideoOn(true)
    setHandRaised(false)
  }

  const sendMessage = () => {
    if (!newMessage.trim()) return
    setMessages([...messages, { id: `m${messages.length + 1}`, sender: 'student', text: newMessage, time: 'Now' }])
    setNewMessage('')
  }

  const filteredTutors = tutors.filter((t) =>
    t.name.toLowerCase().includes(search.toLowerCase()) ||
    t.subject.toLowerCase().includes(search.toLowerCase()) ||
    t.expertise.some((e) => e.toLowerCase().includes(search.toLowerCase()))
  )

  if (view === 'session' && selectedTutor) {
    return (
      <div className="min-h-screen mesh-bg flex flex-col">
        {/* Session header */}
        <div className="glass-strong border-b border-surface-300/30 px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={endSession} className="btn-ghost px-2">
              <ArrowLeft className="w-4 h-4" />
            </button>
            <div className="flex items-center gap-2">
              <div className={`w-9 h-9 rounded-full bg-gradient-to-br ${selectedTutor.avatar} flex items-center justify-center text-xs font-bold text-white`}>
                {selectedTutor.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}
              </div>
              <div>
                <p className="text-sm font-medium text-white">{selectedTutor.name}</p>
                <p className="text-[10px] text-mint-300 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-mint-400 animate-pulse" /> Live · {selectedTutor.subject}
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs text-surface-600">
            <Clock className="w-3.5 h-3.5" />
            <span className="tabular-nums">23:45</span>
          </div>
        </div>

        {/* Video area */}
        <div className="flex-1 flex">
          <div className="flex-1 relative bg-surface-900/50 flex items-center justify-center p-4">
            {/* Tutor video (mock) */}
            <div className="absolute inset-4 rounded-2xl bg-gradient-to-br from-surface-800/50 to-surface-900/50 flex items-center justify-center overflow-hidden">
              <div className="text-center">
                <div className={`w-24 h-24 rounded-full bg-gradient-to-br ${selectedTutor.avatar} flex items-center justify-center text-3xl font-bold text-white mx-auto mb-3`}>
                  {selectedTutor.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}
                </div>
                <p className="text-sm text-white font-medium">{selectedTutor.name}</p>
                <p className="text-xs text-surface-600">{selectedTutor.subject} Tutor</p>
              </div>
              <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2 py-1 rounded-lg bg-red-500/20 border border-red-500/30">
                <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" />
                <span className="text-[10px] text-red-300 font-medium">REC</span>
              </div>
            </div>

            {/* Self video (mock) */}
            <div className="absolute bottom-6 right-6 w-32 h-24 sm:w-40 sm:h-28 rounded-xl bg-gradient-to-br from-brand-500/30 to-accent-500/30 border border-surface-300/30 flex items-center justify-center overflow-hidden">
              {videoOn ? (
                <div className="w-10 h-10 rounded-full bg-brand-gradient flex items-center justify-center text-sm font-bold text-white">
                  You
                </div>
              ) : (
                <VideoOff className="w-5 h-5 text-surface-600" />
              )}
            </div>

            {/* Hand raised indicator */}
            <AnimatePresence>
              {handRaised && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="absolute top-6 left-1/2 -translate-x-1/2 glass-card px-4 py-2 rounded-full flex items-center gap-2"
                >
                  <Hand className="w-4 h-4 text-gold-300" />
                  <span className="text-xs text-white font-medium">Hand raised</span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Chat sidebar */}
          {chatOpen && (
            <div className="w-72 border-l border-surface-300/30 glass-strong flex flex-col">
              <div className="px-4 py-3 border-b border-surface-300/20 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-brand-300" />
                  <span className="text-xs font-medium text-white">Chat</span>
                </div>
                <button onClick={() => setChatOpen(false)} className="text-surface-600 hover:text-white">
                  <ChevronRight className="w-4 h-4 rotate-180" />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto p-3 space-y-3">
                {messages.map((msg) => (
                  <div key={msg.id} className={`flex ${msg.sender === 'student' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[80%] px-3 py-2 rounded-lg text-xs ${
                      msg.sender === 'student'
                        ? 'bg-brand-500/20 text-white border border-brand-500/30'
                        : 'glass-card text-surface-400'
                    }`}>
                      <p>{msg.text}</p>
                      <p className="text-[9px] text-surface-600 mt-1">{msg.time}</p>
                    </div>
                  </div>
                ))}
                <div ref={chatEndRef} />
              </div>
              <div className="p-3 border-t border-surface-300/20 flex items-center gap-2">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                  placeholder="Type a message..."
                  className="input-field text-xs h-9 flex-1"
                />
                <button onClick={sendMessage} className="btn-primary p-2 rounded-lg">
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Controls bar */}
        <div className="glass-strong border-t border-surface-300/30 px-4 py-3 flex items-center justify-center gap-3">
          <button
            onClick={() => setMicOn(!micOn)}
            className={`w-11 h-11 rounded-full flex items-center justify-center transition-all ${
              micOn ? 'bg-surface-200/20 text-white hover:bg-surface-200/30' : 'bg-red-500/20 text-red-300 border border-red-500/30'
            }`}
          >
            {micOn ? <Mic className="w-4 h-4" /> : <MicOff className="w-4 h-4" />}
          </button>
          <button
            onClick={() => setVideoOn(!videoOn)}
            className={`w-11 h-11 rounded-full flex items-center justify-center transition-all ${
              videoOn ? 'bg-surface-200/20 text-white hover:bg-surface-200/30' : 'bg-red-500/20 text-red-300 border border-red-500/30'
            }`}
          >
            {videoOn ? <Video className="w-4 h-4" /> : <VideoOff className="w-4 h-4" />}
          </button>
          <button
            onClick={() => setHandRaised(!handRaised)}
            className={`w-11 h-11 rounded-full flex items-center justify-center transition-all ${
              handRaised ? 'bg-gold-500/20 text-gold-300 border border-gold-500/30' : 'bg-surface-200/20 text-white hover:bg-surface-200/30'
            }`}
          >
            <Hand className="w-4 h-4" />
          </button>
          <button className="w-11 h-11 rounded-full bg-surface-200/20 text-white hover:bg-surface-200/30 flex items-center justify-center transition-all">
            <ScreenShare className="w-4 h-4" />
          </button>
          <button
            onClick={() => setChatOpen(!chatOpen)}
            className={`w-11 h-11 rounded-full flex items-center justify-center transition-all ${
              chatOpen ? 'bg-brand-500/20 text-brand-300 border border-brand-500/30' : 'bg-surface-200/20 text-white hover:bg-surface-200/30'
            }`}
          >
            <MessageSquare className="w-4 h-4" />
          </button>
          <div className="w-px h-8 bg-surface-300/30 mx-1" />
          <button
            onClick={endSession}
            className="px-5 h-11 rounded-full bg-red-500/20 text-red-300 border border-red-500/30 hover:bg-red-500/30 flex items-center gap-2 transition-all"
          >
            <PhoneOff className="w-4 h-4" />
            <span className="text-xs font-medium">End</span>
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen mesh-bg">
      {/* Header */}
      <div className="sticky top-0 z-40 glass-strong border-b border-surface-300/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <PrismLogo size={28} />
            <Link href="/dashboard" className="btn-ghost px-2">
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <h1 className="font-display text-sm font-semibold text-white">Live Tutoring</h1>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-surface-600" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search tutors..."
              className="input-field pl-9 text-xs h-9 w-40 sm:w-56"
            />
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        {/* Upcoming sessions */}
        {upcomingSessions.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xs font-semibold text-surface-600 uppercase tracking-wider mb-3 flex items-center gap-2">
              <Calendar className="w-3.5 h-3.5" /> Upcoming Sessions
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {upcomingSessions.map((session, i) => (
                <motion.div
                  key={session.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="glass-card-hover p-4 rounded-xl"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-sm font-medium text-white">{session.topic}</h3>
                      <p className="text-[10px] text-surface-600 mt-0.5">{session.tutor} · {session.subject}</p>
                    </div>
                    <span className="badge-accent text-[9px]">{session.date}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 text-[10px] text-surface-600">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {session.time}
                      </span>
                      <span className="flex items-center gap-1">
                        <Video className="w-3 h-3" /> {session.duration}
                      </span>
                    </div>
                    <button
                      onClick={() => startSession(tutors.find((t) => t.name === session.tutor) || tutors[0])}
                      className="btn-primary text-[10px] px-3 py-1.5 rounded-lg flex items-center gap-1"
                    >
                      <Video className="w-3 h-3" /> Join
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Available tutors */}
        <h2 className="text-xs font-semibold text-surface-600 uppercase tracking-wider mb-3 flex items-center gap-2">
          <Users className="w-3.5 h-3.5" /> Available Tutors
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredTutors.map((tutor, i) => (
            <motion.div
              key={tutor.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="glass-card-hover p-4 rounded-xl"
            >
              <div className="flex items-start gap-3 mb-3">
                <div className="relative">
                  <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${tutor.avatar} flex items-center justify-center text-sm font-bold text-white`}>
                    {tutor.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}
                  </div>
                  {tutor.online && (
                    <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-mint-400 border-2 border-surface-900" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-medium text-white truncate">{tutor.name}</h3>
                  <p className="text-[10px] text-surface-600">{tutor.subject}</p>
                  <div className="flex items-center gap-1 mt-1">
                    <Star className="w-3 h-3 text-gold-300" />
                    <span className="text-[10px] text-white">{tutor.rating}</span>
                    <span className="text-[10px] text-surface-600">({tutor.reviews})</span>
                  </div>
                </div>
              </div>
              <p className="text-[10px] text-surface-600 mb-2">{tutor.bio}</p>
              <div className="flex flex-wrap gap-1 mb-3">
                {tutor.expertise.map((exp) => (
                  <span key={exp} className="px-2 py-0.5 rounded-md bg-surface-200/20 text-[9px] text-surface-400">
                    {exp}
                  </span>
                ))}
              </div>
              <button
                onClick={() => startSession(tutor)}
                disabled={!tutor.online}
                className={`w-full text-xs py-2 rounded-lg flex items-center justify-center gap-1.5 transition-all ${
                  tutor.online
                    ? 'btn-primary'
                    : 'glass-card text-surface-600 cursor-not-allowed'
                }`}
              >
                {tutor.online ? (
                  <>
                    <Video className="w-3.5 h-3.5" /> Start Session
                  </>
                ) : (
                  'Offline'
                )}
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
