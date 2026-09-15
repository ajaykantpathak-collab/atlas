'use client';

import { useState, useCallback, useMemo, useEffect } from 'react';
import { motion, AnimatePresence, easeOut } from 'framer-motion';
import {
  useTeacherClasses,
  useClassStudents,
  useClassProgress,
  useCreateWorksheet,
  useSendWorksheet,
  useAssignHomework,
  type Class as ApiClass,
  type Student as ApiStudent,
  type ClassProgress,
  type WorksheetQuestion as ApiWorksheetQuestion,
  Difficulty,
  ContentLanguage,
} from '@/services/teacher.service';
import { useAuthStore } from '@/stores/authStore';

// --- TYPES ---
interface Student {
  id: string;
  name: string;
  mastery: number; // 0–100
  completedHomework: boolean;
  topicsStruggling: string[];
}

interface ClassData {
  id: string;
  name: string;
  subject: string;
  studentCount: number;
  averageMastery: number;
  homeworkCompletionRate: number;
  students: Student[];
}

interface WorksheetQuestion {
  id: string;
  text: string;
  difficulty: 'easy' | 'medium' | 'hard';
  competency: string;
}

interface WorksheetForm {
  subject: string;
  topic: string;
  difficulty: 'easy' | 'medium' | 'hard' | 'mixed';
  numQuestions: number;
  competencyRatios: Record<string, number>;
}

// --- I18N TRANSLATIONS ---
const translations: Record<string, Record<string, any>> = {
  en: {
    dashboardTitle: 'Teacher Dashboard',
    classes: 'My Classes',
    students: 'students',
    avgMastery: 'Avg Mastery',
    completionRate: 'Completion Rate',
    createWorksheet: 'Create Worksheet',
    preview: 'Preview',
    sendWhatsApp: 'Send via WhatsApp',
    performance: 'Class Performance',
    struggling: 'Struggling',
    remediation: 'Send Remediation',
    subject: 'Subject',
    topic: 'Topic',
    difficulty: 'Difficulty',
    numQuestions: 'Questions',
    competencies: 'Competency Ratios',
    memory: 'Memory',
    understanding: 'Understanding',
    application: 'Application',
    easy: 'Easy',
    medium: 'Medium',
    hard: 'Hard',
    mixed: 'Mixed',
    worksheetPreview: 'Worksheet Preview',
    generatedQuestions: 'Generated Questions',
    confirmSend: 'Confirm & Send',
    sent: 'Sent!',
    allStudents: 'All Students',
    mastery: 'Mastery',
    homeworkStatus: 'Homework Status',
    strugglingTopics: 'Struggling Topics',
    language: 'Language',
    back: 'Back',
    noStruggling: 'No struggling students 🎉',
    generateWorksheet: 'Generate Worksheet',
  },
  hi: {
    dashboardTitle: 'शिक्षक डैशबोर्ड',
    classes: 'मेरी कक्षाएं',
    students: 'छात्र',
    avgMastery: 'औसत महारत',
    completionRate: 'पूर्णता दर',
    createWorksheet: 'वर्कशीट बनाएं',
    preview: 'पूर्वावलोकन',
    sendWhatsApp: 'व्हाट्सएप से भेजें',
    performance: 'कक्षा प्रदर्शन',
    struggling: 'कठिनाई',
    remediation: 'सुधार भेजें',
    subject: 'विषय',
    topic: 'विषय',
    difficulty: 'कठिनाई स्तर',
    numQuestions: 'प्रश्न',
    competencies: 'क्षमता अनुपात',
    memory: 'स्मृति',
    understanding: 'समझ',
    application: 'अनुप्रयोग',
    easy: 'आसान',
    medium: 'मध्यम',
    hard: 'कठिन',
    mixed: 'मिश्रित',
    worksheetPreview: 'वर्कशीट पूर्वावलोकन',
    generatedQuestions: 'उत्पन्न प्रश्न',
    confirmSend: 'पुष्टि करें और भेजें',
    sent: 'भेज दिया!',
    allStudents: 'सभी छात्र',
    mastery: 'महारत',
    homeworkStatus: 'होमवर्क स्थिति',
    strugglingTopics: 'कठिनाई विषय',
    language: 'भाषा',
    back: 'वापस',
    noStruggling: 'कोई कठिनाई नहीं 🎉',
    generateWorksheet: 'वर्कशीट बनाएं',
  },
  hinglish: {
    dashboardTitle: 'Teacher Dashboard',
    classes: 'Meri Classes',
    students: 'students',
    avgMastery: 'Avg Mastery',
    completionRate: 'Completion Rate',
    createWorksheet: 'Worksheet Banaye',
    preview: 'Preview',
    sendWhatsApp: 'WhatsApp se Bheje',
    performance: 'Class Performance',
    struggling: 'Struggling',
    remediation: 'Remediation Bheje',
    subject: 'Subject',
    topic: 'Topic',
    difficulty: 'Difficulty',
    numQuestions: 'Questions',
    competencies: 'Competency Ratios',
    memory: 'Memory',
    understanding: 'Understanding',
    application: 'Application',
    easy: 'Easy',
    medium: 'Medium',
    hard: 'Hard',
    mixed: 'Mixed',
    worksheetPreview: 'Worksheet Preview',
    generatedQuestions: 'Generated Questions',
    confirmSend: 'Confirm & Send',
    sent: 'Sent!',
    allStudents: 'All Students',
    mastery: 'Mastery',
    homeworkStatus: 'Homework Status',
    strugglingTopics: 'Struggling Topics',
    language: 'Language',
    back: 'Back',
    noStruggling: 'No struggling students 🎉',
    generateWorksheet: 'Worksheet Banaye',
  },
};

function t(key: string, lang: string): string {
  return translations[lang]?.[key] ?? translations.en[key] ?? key;
}

// --- MOCK DATA ---
const mockClasses: ClassData[] = [
  {
    id: '1',
    name: 'Class 11A — Maths',
    subject: 'Mathematics',
    studentCount: 32,
    averageMastery: 68,
    homeworkCompletionRate: 82,
    students: [
      { id: 's1', name: 'Aarav Sharma', mastery: 88, completedHomework: true, topicsStruggling: [] },
      { id: 's2', name: 'Priya Patel', mastery: 45, completedHomework: false, topicsStruggling: ['Integration'] },
      { id: 's3', name: 'Rahul Verma', mastery: 72, completedHomework: true, topicsStruggling: [] },
      { id: 's4', name: 'Sneha Gupta', mastery: 35, completedHomework: false, topicsStruggling: ['Calculus', 'Limits'] },
      { id: 's5', name: 'Karan Singh', mastery: 91, completedHomework: true, topicsStruggling: [] },
      { id: 's6', name: 'Ananya Joshi', mastery: 52, completedHomework: true, topicsStruggling: ['Differentiation'] },
      { id: 's7', name: 'Dev Mehta', mastery: 29, completedHomework: false, topicsStruggling: ['Integration', 'Differentiation'] },
      { id: 's8', name: 'Ishita Rao', mastery: 76, completedHomework: true, topicsStruggling: [] },
      { id: 's9', name: 'Arjun Nair', mastery: 63, completedHomework: true, topicsStruggling: ['Probability'] },
      { id: 's10', name: 'Diya Krishnan', mastery: 81, completedHomework: true, topicsStruggling: [] },
      { id: 's11', name: 'Vivaan Agarwal', mastery: 47, completedHomework: false, topicsStruggling: ['Trigonometry', 'Limits'] },
      { id: 's12', name: 'Myra Reddy', mastery: 95, completedHomework: true, topicsStruggling: [] },
      { id: 's13', name: 'Reyansh Bose', mastery: 58, completedHomework: true, topicsStruggling: ['Vectors'] },
      { id: 's14', name: 'Anika Pillai', mastery: 73, completedHomework: true, topicsStruggling: [] },
      { id: 's15', name: 'Kabir Saxena', mastery: 41, completedHomework: false, topicsStruggling: ['Matrices', 'Determinants'] },
      { id: 's16', name: 'Saanvi Kapoor', mastery: 67, completedHomework: true, topicsStruggling: ['Permutations'] },
      { id: 's17', name: 'Vihaan Malhotra', mastery: 84, completedHomework: true, topicsStruggling: [] },
      { id: 's18', name: 'Aadhya Jain', mastery: 36, completedHomework: false, topicsStruggling: ['Integration', 'Differential Equations'] },
      { id: 's19', name: 'Advait Menon', mastery: 79, completedHomework: true, topicsStruggling: [] },
      { id: 's20', name: 'Kiara Bhatt', mastery: 55, completedHomework: true, topicsStruggling: ['Complex Numbers'] },
      { id: 's21', name: 'Dhruv Iyer', mastery: 92, completedHomework: true, topicsStruggling: [] },
      { id: 's22', name: 'Riya Chowdhury', mastery: 48, completedHomework: false, topicsStruggling: ['Limits', 'Continuity'] },
      { id: 's23', name: 'Kabir Khanna', mastery: 71, completedHomework: true, topicsStruggling: [] },
      { id: 's24', name: 'Sara Ali', mastery: 65, completedHomework: true, topicsStruggling: ['Probability'] },
      { id: 's25', name: 'Yuvan Das', mastery: 33, completedHomework: false, topicsStruggling: ['Calculus', 'Integration', 'Differentiation'] },
      { id: 's26', name: 'Ira Banerjee', mastery: 87, completedHomework: true, topicsStruggling: [] },
      { id: 's27', name: 'Shaurya Gill', mastery: 60, completedHomework: true, topicsStruggling: ['Trigonometry'] },
      { id: 's28', name: 'Navya Trivedi', mastery: 78, completedHomework: true, topicsStruggling: [] },
      { id: 's29', name: 'Aryan Ghosh', mastery: 42, completedHomework: false, topicsStruggling: ['Vectors', '3D Geometry'] },
      { id: 's30', name: 'Mahira Luthra', mastery: 89, completedHomework: true, topicsStruggling: [] },
      { id: 's31', name: 'Ved Bhalla', mastery: 54, completedHomework: true, topicsStruggling: ['Binomial Theorem'] },
      { id: 's32', name: 'Zoya Qureshi', mastery: 69, completedHomework: true, topicsStruggling: [] },
    ],
  },
  {
    id: '2',
    name: 'Class 12B — Physics',
    subject: 'Physics',
    studentCount: 28,
    averageMastery: 74,
    homeworkCompletionRate: 89,
    students: [
      { id: 's33', name: 'Aditya Verma', mastery: 90, completedHomework: true, topicsStruggling: [] },
      { id: 's34', name: 'Tara Sengupta', mastery: 77, completedHomework: true, topicsStruggling: [] },
      { id: 's35', name: 'Neil Choudhary', mastery: 56, completedHomework: true, topicsStruggling: ['Electromagnetism'] },
      { id: 's36', name: 'Ayesha Khan', mastery: 85, completedHomework: true, topicsStruggling: [] },
      { id: 's37', name: 'Rohan Desai', mastery: 39, completedHomework: false, topicsStruggling: ['Optics', 'Wave Optics'] },
      { id: 's38', name: 'Meera Acharya', mastery: 82, completedHomework: true, topicsStruggling: [] },
      { id: 's39', name: 'Karan Bhatia', mastery: 64, completedHomework: true, topicsStruggling: ['Semiconductors'] },
      { id: 's40', name: 'Ishani Roy', mastery: 71, completedHomework: true, topicsStruggling: [] },
      { id: 's41', name: 'Tejas Wadhwa', mastery: 48, completedHomework: false, topicsStruggling: ['Electrostatics', 'Capacitors'] },
      { id: 's42', name: 'Nisha Pillai', mastery: 93, completedHomework: true, topicsStruggling: [] },
      { id: 's43', name: 'Arnav Goel', mastery: 58, completedHomework: true, topicsStruggling: ['Magnetism'] },
      { id: 's44', name: 'Suhani Mehta', mastery: 80, completedHomework: true, topicsStruggling: [] },
      { id: 's45', name: 'Laksh Nambiar', mastery: 35, completedHomework: false, topicsStruggling: ['Electromagnetic Induction', 'AC Circuits'] },
      { id: 's46', name: 'Diya Rana', mastery: 76, completedHomework: true, topicsStruggling: [] },
      { id: 's47', name: 'Saksham Tandon', mastery: 61, completedHomework: true, topicsStruggling: ['Modern Physics'] },
      { id: 's48', name: 'Aadya Saxena', mastery: 88, completedHomework: true, topicsStruggling: [] },
      { id: 's49', name: 'Rudra Mishra', mastery: 44, completedHomework: false, topicsStruggling: ['Thermodynamics', 'Kinetic Theory'] },
      { id: 's50', name: 'Avani Bhardwaj', mastery: 73, completedHomework: true, topicsStruggling: [] },
      { id: 's51', name: 'Veer Chauhan', mastery: 67, completedHomework: true, topicsStruggling: ['Nuclear Physics'] },
      { id: 's52', name: 'Pari Agnihotri', mastery: 86, completedHomework: true, topicsStruggling: [] },
      { id: 's53', name: 'Shaurya Raghav', mastery: 52, completedHomework: true, topicsStruggling: ['Current Electricity'] },
      { id: 's54', name: 'Myra Khurana', mastery: 79, completedHomework: true, topicsStruggling: [] },
      { id: 's55', name: 'Kabir Sehgal', mastery: 31, completedHomework: false, topicsStruggling: ['Optics', 'Electromagnetism', 'Modern Physics'] },
      { id: 's56', name: 'Anaya Dutta', mastery: 84, completedHomework: true, topicsStruggling: [] },
      { id: 's57', name: 'Rayaan Qadir', mastery: 69, completedHomework: true, topicsStruggling: ['Communication Systems'] },
      { id: 's58', name: 'Nitya Bansal', mastery: 75, completedHomework: true, topicsStruggling: [] },
      { id: 's59', name: 'Aarush Lamba', mastery: 57, completedHomework: true, topicsStruggling: ['Dual Nature of Radiation'] },
      { id: 's60', name: 'Saanjh Rawat', mastery: 91, completedHomework: true, topicsStruggling: [] },
    ],
  },
  {
    id: '3',
    name: 'Class 10C — Science',
    subject: 'Science',
    studentCount: 35,
    averageMastery: 71,
    homeworkCompletionRate: 78,
    students: [
      { id: 's61', name: 'Reyansh Bose', mastery: 67, completedHomework: true, topicsStruggling: ['Chemical Reactions'] },
      { id: 's62', name: 'Anika Pillai', mastery: 82, completedHomework: true, topicsStruggling: [] },
      { id: 's63', name: 'Kabir Saxena', mastery: 44, completedHomework: false, topicsStruggling: ['Light', 'Refraction'] },
      { id: 's64', name: 'Myra Reddy', mastery: 90, completedHomework: true, topicsStruggling: [] },
      { id: 's65', name: 'Vihaan Trivedi', mastery: 73, completedHomework: true, topicsStruggling: [] },
      { id: 's66', name: 'Sara Khan', mastery: 56, completedHomework: true, topicsStruggling: ['Electricity', 'Magnetic Effects'] },
      { id: 's67', name: 'Aryan Bose', mastery: 38, completedHomework: false, topicsStruggling: ['Carbon Compounds', 'Periodic Classification'] },
      { id: 's68', name: 'Diya Nair', mastery: 85, completedHomework: true, topicsStruggling: [] },
      { id: 's69', name: 'Karan Reddy', mastery: 62, completedHomework: true, topicsStruggling: ['Heredity', 'Evolution'] },
      { id: 's70', name: 'Ishita Jain', mastery: 78, completedHomework: true, topicsStruggling: [] },
      { id: 's71', name: 'Dev Sharma', mastery: 49, completedHomework: false, topicsStruggling: ['Acids', 'Bases', 'Salts'] },
      { id: 's72', name: 'Ananya Mehta', mastery: 88, completedHomework: true, topicsStruggling: [] },
      { id: 's73', name: 'Rahul Gupta', mastery: 65, completedHomework: true, topicsStruggling: ['Life Processes'] },
      { id: 's74', name: 'Sneha Rao', mastery: 41, completedHomework: false, topicsStruggling: ['Reflection', 'Refraction', 'Human Eye'] },
      { id: 's75', name: 'Arjun Singh', mastery: 77, completedHomework: true, topicsStruggling: [] },
      { id: 's76', name: 'Priya Verma', mastery: 59, completedHomework: true, topicsStruggling: ['Sources of Energy'] },
      { id: 's77', name: 'Vivaan Agarwal', mastery: 83, completedHomework: true, topicsStruggling: [] },
      { id: 's78', name: 'Nisha Patel', mastery: 34, completedHomework: false, topicsStruggling: ['Chemical Reactions', 'Equations', 'Acids'] },
      { id: 's79', name: 'Karan Malhotra', mastery: 70, completedHomework: true, topicsStruggling: [] },
      { id: 's80', name: 'Riya Khanna', mastery: 86, completedHomework: true, topicsStruggling: [] },
      { id: 's81', name: 'Aarav Iyer', mastery: 53, completedHomework: true, topicsStruggling: ['Electricity'] },
      { id: 's82', name: 'Saanvi Bhatt', mastery: 75, completedHomework: true, topicsStruggling: [] },
      { id: 's83', name: 'Rudra Das', mastery: 46, completedHomework: false, topicsStruggling: ['Metals', 'Non-Metals'] },
      { id: 's84', name: 'Aadhya Menon', mastery: 81, completedHomework: true, topicsStruggling: [] },
      { id: 's85', name: 'Shaurya Gill', mastery: 68, completedHomework: true, topicsStruggling: ['Control and Coordination'] },
      { id: 's86', name: 'Kiara Luthra', mastery: 92, completedHomework: true, topicsStruggling: [] },
      { id: 's87', name: 'Ved Chauhan', mastery: 50, completedHomework: true, topicsStruggling: ['Our Environment'] },
      { id: 's88', name: 'Mahira Ali', mastery: 72, completedHomework: true, topicsStruggling: [] },
      { id: 's89', name: 'Advait Ghosh', mastery: 37, completedHomework: false, topicsStruggling: ['Life Processes', 'Control and Coordination'] },
      { id: 's90', name: 'Ira Banerjee', mastery: 79, completedHomework: true, topicsStruggling: [] },
      { id: 's91', name: 'Yuvan Trivedi', mastery: 63, completedHomework: true, topicsStruggling: ['Periodic Classification'] },
      { id: 's92', name: 'Navya Wadhwa', mastery: 87, completedHomework: true, topicsStruggling: [] },
      { id: 's93', name: 'Aryan Rana', mastery: 55, completedHomework: true, topicsStruggling: ['Magnetic Effects of Current'] },
      { id: 's94', name: 'Zoya Qureshi', mastery: 74, completedHomework: true, topicsStruggling: [] },
      { id: 's95', name: 'Laksh Sehgal', mastery: 42, completedHomework: false, topicsStruggling: ['Evolution', 'Heredity'] },
    ],
  },
  {
    id: '4',
    name: 'Class 9A — Maths',
    subject: 'Mathematics',
    studentCount: 30,
    averageMastery: 65,
    homeworkCompletionRate: 75,
    students: [
      { id: 's96', name: 'Aarush Kumar', mastery: 82, completedHomework: true, topicsStruggling: [] },
      { id: 's97', name: 'Saanvi Rao', mastery: 47, completedHomework: false, topicsStruggling: ['Polynomials', 'Linear Equations'] },
      { id: 's98', name: 'Veer Singh', mastery: 73, completedHomework: true, topicsStruggling: [] },
      { id: 's99', name: 'Anaya Gupta', mastery: 58, completedHomework: true, topicsStruggling: ['Quadrilaterals'] },
      { id: 's100', name: 'Rudra Patel', mastery: 36, completedHomework: false, topicsStruggling: ['Number Systems', 'Real Numbers'] },
      { id: 's101', name: 'Pari Sharma', mastery: 89, completedHomework: true, topicsStruggling: [] },
      { id: 's102', name: 'Arnav Nair', mastery: 66, completedHomework: true, topicsStruggling: ['Circles'] },
      { id: 's103', name: 'Myra Reddy', mastery: 78, completedHomework: true, topicsStruggling: [] },
      { id: 's104', name: 'Kabir Mehta', mastery: 43, completedHomework: false, topicsStruggling: ['Surface Areas', 'Volumes'] },
      { id: 's105', name: 'Diya Jain', mastery: 91, completedHomework: true, topicsStruggling: [] },
      { id: 's106', name: 'Shaurya Bose', mastery: 61, completedHomework: true, topicsStruggling: ['Statistics'] },
      { id: 's107', name: 'Nitya Khanna', mastery: 85, completedHomework: true, topicsStruggling: [] },
      { id: 's108', name: 'Aryan Verma', mastery: 52, completedHomework: true, topicsStruggling: ['Probability'] },
      { id: 's109', name: 'Sara Ali', mastery: 70, completedHomework: true, topicsStruggling: [] },
      { id: 's110', name: 'Dhruv Iyer', mastery: 39, completedHomework: false, topicsStruggling: ['Triangles', 'Heron\'s Formula'] },
      { id: 's111', name: 'Kiara Bhatt', mastery: 84, completedHomework: true, topicsStruggling: [] },
      { id: 's112', name: 'Vivaan Das', mastery: 67, completedHomework: true, topicsStruggling: ['Coordinate Geometry'] },
      { id: 's113', name: 'Riya Chowdhury', mastery: 75, completedHomework: true, topicsStruggling: [] },
      { id: 's114', name: 'Laksh Malhotra', mastery: 48, completedHomework: false, topicsStruggling: ['Polynomials'] },
      { id: 's115', name: 'Anika Pillai', mastery: 80, completedHomework: true, topicsStruggling: [] },
      { id: 's116', name: 'Karan Gill', mastery: 63, completedHomework: true, topicsStruggling: ['Euclid\'s Geometry'] },
      { id: 's117', name: 'Ishita Rao', mastery: 88, completedHomework: true, topicsStruggling: [] },
      { id: 's118', name: 'Advait Menon', mastery: 55, completedHomework: true, topicsStruggling: ['Linear Equations in Two Variables'] },
      { id: 's119', name: 'Navya Trivedi', mastery: 72, completedHomework: true, topicsStruggling: [] },
      { id: 's120', name: 'Rudra Mishra', mastery: 33, completedHomework: false, topicsStruggling: ['Surface Areas', 'Volumes', 'Circles'] },
      { id: 's121', name: 'Saanjh Rawat', mastery: 79, completedHomework: true, topicsStruggling: [] },
      { id: 's122', name: 'Aarush Lamba', mastery: 60, completedHomework: true, topicsStruggling: ['Construction'] },
      { id: 's123', name: 'Mahira Luthra', mastery: 86, completedHomework: true, topicsStruggling: [] },
      { id: 's124', name: 'Ved Bhalla', mastery: 50, completedHomework: true, topicsStruggling: ['Statistics', 'Probability'] },
      { id: 's125', name: 'Zoya Qureshi', mastery: 77, completedHomework: true, topicsStruggling: [] },
    ],
  },
  {
    id: '5',
    name: 'Class 8B — Science',
    subject: 'Science',
    studentCount: 33,
    averageMastery: 69,
    homeworkCompletionRate: 81,
    students: [
      { id: 's126', name: 'Aarav Sharma', mastery: 84, completedHomework: true, topicsStruggling: [] },
      { id: 's127', name: 'Priya Patel', mastery: 51, completedHomework: true, topicsStruggling: ['Force and Pressure'] },
      { id: 's128', name: 'Rahul Verma', mastery: 76, completedHomework: true, topicsStruggling: [] },
      { id: 's129', name: 'Sneha Gupta', mastery: 38, completedHomework: false, topicsStruggling: ['Friction', 'Sound'] },
      { id: 's130', name: 'Karan Singh', mastery: 87, completedHomework: true, topicsStruggling: [] },
      { id: 's131', name: 'Ananya Joshi', mastery: 64, completedHomework: true, topicsStruggling: ['Light', 'Reflection'] },
      { id: 's132', name: 'Dev Mehta', mastery: 45, completedHomework: false, topicsStruggling: ['Chemical Effects of Current'] },
      { id: 's133', name: 'Ishita Rao', mastery: 90, completedHomework: true, topicsStruggling: [] },
      { id: 's134', name: 'Arjun Nair', mastery: 68, completedHomework: true, topicsStruggling: ['Some Natural Phenomena'] },
      { id: 's135', name: 'Diya Krishnan', mastery: 73, completedHomework: true, topicsStruggling: [] },
      { id: 's136', name: 'Vivaan Agarwal', mastery: 56, completedHomework: true, topicsStruggling: ['Stars and Solar System'] },
      { id: 's137', name: 'Myra Reddy', mastery: 81, completedHomework: true, topicsStruggling: [] },
      { id: 's138', name: 'Reyansh Bose', mastery: 42, completedHomework: false, topicsStruggling: ['Pollution of Air and Water'] },
      { id: 's139', name: 'Anika Pillai', mastery: 78, completedHomework: true, topicsStruggling: [] },
      { id: 's140', name: 'Kabir Saxena', mastery: 59, completedHomework: true, topicsStruggling: ['Crop Production and Management'] },
    ],
  },
];

const sampleQuestions: WorksheetQuestion[] = [
  // --- Mathematics: Calculus ---
  { id: 'q1', text: 'Find the derivative of f(x) = 3x² + 2x - 5', difficulty: 'easy', competency: 'Memory' },
  { id: 'q2', text: 'Evaluate: ∫(2x + 3) dx', difficulty: 'medium', competency: 'Understanding' },
  { id: 'q3', text: 'A particle moves along a curve y = x³. Find the velocity at x = 2.', difficulty: 'hard', competency: 'Application' },
  { id: 'q4', text: 'Find the area bounded by y = x², x-axis, x = 0 and x = 3', difficulty: 'medium', competency: 'Application' },
  { id: 'q5', text: 'Find the limit: lim(x→0) [sin(3x) / x]', difficulty: 'hard', competency: 'Application' },
  { id: 'q6', text: 'Find the slope of the tangent to y = ln(x) at x = e', difficulty: 'medium', competency: 'Understanding' },
  { id: 'q7', text: 'Find the maximum value of f(x) = -x² + 4x + 1', difficulty: 'hard', competency: 'Application' },
  { id: 'q8', text: 'Evaluate: ∫₀¹ (x² + 1) dx', difficulty: 'medium', competency: 'Understanding' },
  { id: 'q9', text: 'Find dy/dx if y = sin(x²)', difficulty: 'medium', competency: 'Understanding' },
  { id: 'q10', text: 'Find the critical points of f(x) = x³ - 3x + 2', difficulty: 'hard', competency: 'Application' },
  // --- Mathematics: Algebra ---
  { id: 'q11', text: 'Solve: x² - 5x + 6 = 0', difficulty: 'easy', competency: 'Memory' },
  { id: 'q12', text: 'Expand using binomial theorem: (1 + x)⁵', difficulty: 'easy', competency: 'Memory' },
  { id: 'q13', text: 'If sin θ + cos θ = 1, find the value of sin θ × cos θ', difficulty: 'medium', competency: 'Understanding' },
  { id: 'q14', text: 'Find the roots of 2x² + 7x + 3 = 0 using the quadratic formula', difficulty: 'easy', competency: 'Memory' },
  { id: 'q15', text: 'Solve the system: 2x + 3y = 7, x - y = 1', difficulty: 'medium', competency: 'Understanding' },
  { id: 'q16', text: 'Find the value of log₂(32) + log₃(27)', difficulty: 'easy', competency: 'Memory' },
  { id: 'q17', text: 'If α and β are roots of x² - 6x + 8 = 0, find α² + β²', difficulty: 'medium', competency: 'Understanding' },
  { id: 'q18', text: 'Simplify: (x² + 3x + 2) / (x + 1) × (x + 3) / (x² + 5x + 6)', difficulty: 'hard', competency: 'Application' },
  // --- Mathematics: Trigonometry ---
  { id: 'q19', text: 'Prove: sin²θ + cos²θ = 1', difficulty: 'easy', competency: 'Memory' },
  { id: 'q20', text: 'Find the value of sin 30° + cos 60° + tan 45°', difficulty: 'easy', competency: 'Memory' },
  { id: 'q21', text: 'Solve: 2sin²θ + sinθ - 1 = 0 for 0 ≤ θ ≤ 2π', difficulty: 'hard', competency: 'Application' },
  { id: 'q22', text: 'Find the general solution of cos 2x = 1/2', difficulty: 'medium', competency: 'Understanding' },
  { id: 'q23', text: 'If tan A = 3/4, find sin A and cos A', difficulty: 'medium', competency: 'Understanding' },
  // --- Mathematics: Vectors & 3D ---
  { id: 'q24', text: 'Find the dot product of a = (1, 2, 3) and b = (4, 5, 6)', difficulty: 'easy', competency: 'Memory' },
  { id: 'q25', text: 'Find the angle between vectors a = (1, 0, 1) and b = (0, 1, 1)', difficulty: 'medium', competency: 'Understanding' },
  { id: 'q26', text: 'Find the cross product of a = (2, 3, 4) and b = (5, 6, 7)', difficulty: 'medium', competency: 'Understanding' },
  { id: 'q27', text: 'Find the distance between points A(1,2,3) and B(4,5,6) in 3D space', difficulty: 'easy', competency: 'Memory' },
  { id: 'q28', text: 'Find the projection of vector a = (3, 4, 0) on b = (1, 0, 0)', difficulty: 'hard', competency: 'Application' },
  // --- Mathematics: Matrices ---
  { id: 'q29', text: 'Find the determinant of [[3, 1], [2, 4]]', difficulty: 'easy', competency: 'Memory' },
  { id: 'q30', text: 'Find the inverse of matrix A = [[1, 2], [3, 4]]', difficulty: 'medium', competency: 'Understanding' },
  { id: 'q31', text: 'If A = [[1,2],[3,4]] and B = [[5,6],[7,8]], find A × B', difficulty: 'medium', competency: 'Understanding' },
  { id: 'q32', text: 'Verify if A = [[2,-1],[-1,2]] is symmetric. Find A².', difficulty: 'hard', competency: 'Application' },
  // --- Mathematics: Probability & Statistics ---
  { id: 'q33', text: 'A die is thrown once. Find the probability of getting an even number.', difficulty: 'easy', competency: 'Memory' },
  { id: 'q34', text: 'Find the mean of: 10, 20, 30, 40, 50', difficulty: 'easy', competency: 'Memory' },
  { id: 'q35', text: 'Find the standard deviation of: 2, 4, 6, 8, 10', difficulty: 'medium', competency: 'Understanding' },
  { id: 'q36', text: 'Two cards are drawn from a deck of 52. Find P(both are aces).', difficulty: 'medium', competency: 'Understanding' },
  { id: 'q37', text: 'A box contains 3 red and 5 blue balls. Two are drawn at random. Find P(both red).', difficulty: 'medium', competency: 'Application' },
  { id: 'q38', text: 'Find the median of: 3, 7, 9, 11, 15, 18, 22', difficulty: 'easy', competency: 'Memory' },
  // --- Mathematics: Sequences ---
  { id: 'q39', text: 'Find the 10th term of the AP: 2, 5, 8, 11, ...', difficulty: 'easy', competency: 'Memory' },
  { id: 'q40', text: 'Find the sum of the first 20 terms of the AP: 1, 4, 7, 10, ...', difficulty: 'medium', competency: 'Understanding' },
  { id: 'q41', text: 'Find the 5th term of the GP: 3, 6, 12, 24, ...', difficulty: 'medium', competency: 'Understanding' },
  { id: 'q42', text: 'Find the sum to infinity of the GP: 1 + 1/2 + 1/4 + ...', difficulty: 'hard', competency: 'Application' },
  // --- Mathematics: Coordinate Geometry ---
  { id: 'q43', text: 'Find the distance between A(2, 3) and B(5, 7)', difficulty: 'easy', competency: 'Memory' },
  { id: 'q44', text: 'Find the midpoint of the line segment joining (2, -3) and (8, 5)', difficulty: 'easy', competency: 'Memory' },
  { id: 'q45', text: 'Find the equation of the line passing through (1, 2) with slope 3', difficulty: 'medium', competency: 'Understanding' },
  { id: 'q46', text: 'Find the center and radius of the circle x² + y² - 4x + 6y - 12 = 0', difficulty: 'hard', competency: 'Application' },
  // --- Physics: Mechanics ---
  { id: 'q47', text: 'A body moves with velocity v = 3t² + 2t. Find acceleration at t = 2.', difficulty: 'medium', competency: 'Application' },
  { id: 'q48', text: 'A ball is thrown upward at 20 m/s. Find max height (g = 10 m/s²).', difficulty: 'medium', competency: 'Application' },
  { id: 'q49', text: 'Find the momentum of a 2 kg object moving at 15 m/s.', difficulty: 'easy', competency: 'Memory' },
  { id: 'q50', text: 'A force of 10 N acts on a 5 kg body. Find the acceleration.', difficulty: 'easy', competency: 'Memory' },
  // --- Physics: Electromagnetism ---
  { id: 'q51', text: 'State Ohm\'s Law. If V = 12V and R = 4Ω, find I.', difficulty: 'easy', competency: 'Memory' },
  { id: 'q52', text: 'Find the equivalent resistance of 3Ω and 6Ω in parallel.', difficulty: 'medium', competency: 'Understanding' },
  { id: 'q53', text: 'A charge of 5 μC is in a field of 200 N/C. Find the force.', difficulty: 'medium', competency: 'Application' },
  { id: 'q54', text: 'Find the magnetic force on a wire of 0.5 m carrying 2 A in a 0.1 T field.', difficulty: 'hard', competency: 'Application' },
  // --- Physics: Optics ---
  { id: 'q55', text: 'Find the focal length of a lens with power 2.5 D.', difficulty: 'easy', competency: 'Memory' },
  { id: 'q56', text: 'Light travels from glass (n=1.5) to air. Find the critical angle.', difficulty: 'hard', competency: 'Application' },
  { id: 'q57', text: 'An object is placed 30 cm from a concave mirror (f = 10 cm). Find image position.', difficulty: 'medium', competency: 'Application' },
  // --- Physics: Modern Physics ---
  { id: 'q58', text: 'Find the energy of a photon of wavelength 500 nm (h = 6.6×10⁻³⁴ J·s).', difficulty: 'hard', competency: 'Application' },
  { id: 'q59', text: 'State the de Broglie wavelength formula. Find λ for an electron at 100 m/s.', difficulty: 'medium', competency: 'Understanding' },
  // --- Chemistry ---
  { id: 'q60', text: 'Balance the equation: Fe + O₂ → Fe₂O₃', difficulty: 'easy', competency: 'Memory' },
  { id: 'q61', text: 'Find the pH of a 0.001 M HCl solution.', difficulty: 'medium', competency: 'Application' },
  { id: 'q62', text: 'Calculate the molarity of 5.85 g NaCl in 500 mL solution.', difficulty: 'medium', competency: 'Application' },
  { id: 'q63', text: 'Write the electron configuration of Carbon (Z = 6).', difficulty: 'easy', competency: 'Memory' },
  { id: 'q64', text: 'Identify the oxidizing agent: 2Na + Cl₂ → 2NaCl', difficulty: 'medium', competency: 'Understanding' },
  // --- Biology ---
  { id: 'q65', text: 'Define photosynthesis. Write the balanced equation.', difficulty: 'easy', competency: 'Memory' },
  { id: 'q66', text: 'Explain the difference between mitosis and meiosis.', difficulty: 'medium', competency: 'Understanding' },
  { id: 'q67', text: 'What are the functions of the human heart\'s left ventricle?', difficulty: 'medium', competency: 'Understanding' },
  { id: 'q68', text: 'Describe the structure of a neuron and its role in signal transmission.', difficulty: 'hard', competency: 'Application' },
  // --- English ---
  { id: 'q69', text: 'Identify the figure of speech: "The wind whispered through the trees."', difficulty: 'easy', competency: 'Memory' },
  { id: 'q70', text: 'Write a paragraph (50 words) on "The Importance of Education."', difficulty: 'medium', competency: 'Application' },
  { id: 'q71', text: 'Change the voice: "The teacher praised the student."', difficulty: 'easy', competency: 'Memory' },
  { id: 'q72', text: 'Correct the sentence: "He don\'t know the answer."', difficulty: 'easy', competency: 'Memory' },
  // --- Class 9-10 Level ---
  { id: 'q73', text: 'Factorise: x² + 7x + 12', difficulty: 'easy', competency: 'Memory' },
  { id: 'q74', text: 'Find the HCF of 24 and 36 using Euclid\'s algorithm.', difficulty: 'medium', competency: 'Understanding' },
  { id: 'q75', text: 'Find the area of a triangle with base 12 cm and height 8 cm.', difficulty: 'easy', competency: 'Memory' },
  { id: 'q76', text: 'Find the volume of a cylinder with r = 7 cm and h = 10 cm (π = 22/7).', difficulty: 'medium', competency: 'Application' },
  { id: 'q77', text: 'Find the simple interest on ₹5000 at 8% per annum for 3 years.', difficulty: 'medium', competency: 'Application' },
  { id: 'q78', text: 'Find the compound interest on ₹10,000 at 10% per annum for 2 years.', difficulty: 'hard', competency: 'Application' },
  // --- Class 6-8 Level ---
  { id: 'q79', text: 'Find the LCM of 12, 15, and 20.', difficulty: 'easy', competency: 'Memory' },
  { id: 'q80', text: 'Convert 3/4 to a decimal and a percentage.', difficulty: 'easy', competency: 'Memory' },
  { id: 'q81', text: 'A shopkeeper sells an item for ₹450 at a 10% loss. Find the cost price.', difficulty: 'medium', competency: 'Application' },
  { id: 'q82', text: 'Find the perimeter of a rectangle with length 15 cm and width 8 cm.', difficulty: 'easy', competency: 'Memory' },
  { id: 'q83', text: 'If 5 pens cost ₹75, find the cost of 8 pens.', difficulty: 'medium', competency: 'Understanding' },
  { id: 'q84', text: 'Find the area of a circle with radius 14 cm (π = 22/7).', difficulty: 'medium', competency: 'Application' },
  { id: 'q85', text: 'Simplify: 3/4 + 5/6 - 1/3', difficulty: 'medium', competency: 'Understanding' },
  { id: 'q86', text: 'Find the missing number: 2, 6, 12, 20, 30, ?', difficulty: 'medium', competency: 'Understanding' },
  { id: 'q87', text: 'A car travels 240 km in 4 hours. Find its average speed.', difficulty: 'easy', competency: 'Memory' },
  { id: 'q88', text: 'Find the square root of 1764 by prime factorization.', difficulty: 'medium', competency: 'Understanding' },
  { id: 'q89', text: 'If 3x + 7 = 22, find the value of x.', difficulty: 'easy', competency: 'Memory' },
  { id: 'q90', text: 'Find the surface area of a cube with edge 5 cm.', difficulty: 'medium', competency: 'Application' },
];

// --- HELPER COMPONENTS ---

type Lang = 'en' | 'hi' | 'hinglish';

function LanguageToggle({ lang, setLang }: { lang: Lang; setLang: (l: Lang) => void }) {
  const opts = [
    { code: 'en', label: 'EN', full: 'English' },
    { code: 'hinglish', label: 'हिं', full: 'Hinglish' },
    { code: 'hi', label: 'हि', full: 'हिन्दी' },
  ] as const;
  return (
    <div className="flex items-center gap-1 p-1 rounded-xl bg-white/10 backdrop-blur-md border border-white/10" role="radiogroup" aria-label={t('language', lang)}>
      {opts.map((opt) => (
        <button
          key={opt.code}
          onClick={() => setLang(opt.code)}
          role="radio"
          aria-checked={lang === opt.code}
          aria-label={opt.full}
          className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-400/60 ${
            lang === opt.code
              ? 'bg-gradient-to-r from-indigo-500 to-pink-500 text-white shadow-lg shadow-indigo-500/25'
              : 'text-white/60 hover:text-white hover:bg-white/10'
          }`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}

function StatCard({ icon, label, value, color, delay }: { icon: string; label: string; value: string | number; color: string; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4, ease: easeOut }}
      className="rounded-xl p-4 border border-white/10 bg-white/5 backdrop-blur-md"
    >
      <div className="text-2xl mb-1">{icon}</div>
      <div className="text-white font-bold text-lg" style={{ color }}>{value}</div>
      <div className="text-white/40 text-xs">{label}</div>
    </motion.div>
  );
}

function MasteryBadge({ value, lang }: { value: number; lang: string }) {
  const label = value >= 75 ? (lang === 'hi' ? 'उत्कृष्ट' : 'Excellent') : value >= 50 ? (lang === 'hi' ? 'औसत' : 'Average') : (lang === 'hi' ? 'कमजोर' : 'Weak');
  const color = value >= 75
    ? 'bg-green-500/15 text-green-300 border-green-500/30'
    : value >= 50
    ? 'bg-yellow-500/15 text-yellow-300 border-yellow-500/30'
    : 'bg-red-500/15 text-red-300 border-red-500/30';
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold border ${color}`}>
      {value}% {lang === 'hi' ? ' — ' : '· '}{t('mastery', lang)}: {label}
    </span>
  );
}

function MasteryBar({ value }: { value: number }) {
  const barColor = value >= 75 ? '#34d399' : value >= 50 ? '#fbbf24' : '#f87171';
  return (
    <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden mt-1" role="progressbar" aria-valuenow={value} aria-valuemin={0} aria-valuemax={100} aria-label={`Mastery: ${value}%`}>
      <motion.div
        className="h-full rounded-full"
        style={{ backgroundColor: barColor }}
        initial={{ width: 0 }}
        animate={{ width: `${value}%` }}
        transition={{ duration: 0.8, ease: easeOut }}
      />
    </div>
  );
}

function ClassCard({ cls, onSelect, lang, index }: { cls: ClassData; onSelect: () => void; lang: string; index: number }) {
  const strugglingCount = cls.students.filter(s => s.mastery < 40).length;
  return (
    <motion.button
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, duration: 0.5, ease: easeOut }}
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      onClick={onSelect}
      className="w-full text-left rounded-2xl p-5 border border-white/10 bg-white/5 hover:bg-white/10 backdrop-blur-md transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400/60"
    >
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="text-white font-bold text-lg leading-tight">{cls.name}</h3>
          <p className="text-white/40 text-sm mt-0.5">{cls.subject}</p>
        </div>
        {strugglingCount > 0 && (
          <span className="text-xs px-2 py-1 rounded-full bg-red-500/15 text-red-300 border border-red-500/30 font-semibold">
            {strugglingCount} {t('struggling', lang)}
          </span>
        )}
      </div>
      <div className="flex gap-4 text-xs">
        <span className="text-white/60">👥 {cls.studentCount} {t('students', lang)}</span>
        <span className="text-green-400">🎯 {cls.averageMastery}%</span>
        <span className="text-blue-400">📋 {cls.homeworkCompletionRate}%</span>
      </div>
    </motion.button>
  );
}

function StudentRow({ student, onRemediate, lang }: { student: Student; onRemediate: (id: string) => void; lang: string }) {
  const isStruggling = student.mastery < 40;
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      className={`rounded-xl p-4 border backdrop-blur-md flex items-center justify-between ${
        isStruggling ? 'border-red-500/30 bg-red-500/5' : 'border-white/10 bg-white/5'
      }`}
    >
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white shrink-0 ${
          isStruggling ? 'bg-red-500/30' : 'bg-indigo-500/30'
        }`}>
          {student.name.charAt(0)}
        </div>
        <div className="min-w-0">
          <p className="text-white font-semibold text-sm truncate">{student.name}</p>
          <p className="text-white/40 text-xs truncate">
            {student.completedHomework ? '✅' : '❌'} {t('homeworkStatus', lang)}
            {student.topicsStruggling.length > 0 && ` · ${t('strugglingTopics', lang)}: ${student.topicsStruggling.join(', ')}`}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-3 shrink-0">
        <div className="text-right">
          <span className={`text-xs font-bold min-w-[36px] text-right ${isStruggling ? 'text-red-300' : 'text-white/80'}`}>
            {student.mastery}%
          </span>
          <MasteryBar value={student.mastery} />
        </div>
        {isStruggling && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onRemediate(student.id)}
            className="px-3 py-1.5 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-red-300 text-xs font-semibold border border-red-500/30 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-red-400/60"
          >
            📱 {t('remediation', lang)}
          </motion.button>
        )}
      </div>
    </motion.div>
  );
}

function StudentTable({ students, onRemediate, lang }: { students: Student[]; onRemediate: (id: string) => void; lang: string }) {
  if (students.length === 0) {
    return (
      <div className="text-center py-8 text-white/40 text-sm">
        {t('noStruggling', lang)}
      </div>
    );
  }
  return (
    <div className="space-y-2">
      {students.map((student) => (
        <StudentRow key={student.id} student={student} onRemediate={onRemediate} lang={lang} />
      ))}
    </div>
  );
}

function WorksheetFormView({ form, setForm, onGenerate, onPreview, lang, isGenerating }: {
  form: WorksheetForm;
  setForm: (f: WorksheetForm) => void;
  onGenerate: () => void;
  onPreview: () => void;
  lang: string;
  isGenerating: boolean;
}) {
  const subjects = ['Mathematics', 'Physics', 'Chemistry', 'Biology', 'English'];
  const difficulties: Array<'easy' | 'medium' | 'hard' | 'mixed'> = ['easy', 'medium', 'hard', 'mixed'];

  return (
    <div className="space-y-5">
      {/* Subject */}
      <div>
        <label className="text-white/50 text-xs font-medium uppercase tracking-wider mb-2 block">{t('subject', lang)}</label>
        <select
          value={form.subject}
          onChange={(e) => setForm({ ...form, subject: e.target.value })}
          className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/15 text-white text-sm backdrop-blur-md focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400/60"
        >
          {subjects.map(s => <option key={s} value={s} className="bg-gray-900">{s}</option>)}
        </select>
      </div>

      {/* Topic */}
      <div>
        <label className="text-white/50 text-xs font-medium uppercase tracking-wider mb-2 block">{t('topic', lang)}</label>
        <input
          type="text"
          value={form.topic}
          onChange={(e) => setForm({ ...form, topic: e.target.value })}
          placeholder={lang === 'hi' ? 'विषय दर्ज करें...' : 'Enter topic...'}
          className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/15 text-white text-sm placeholder:text-white/30 backdrop-blur-md focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400/60"
        />
      </div>

      {/* Difficulty */}
      <div>
        <label className="text-white/50 text-xs font-medium uppercase tracking-wider mb-2 block">{t('difficulty', lang)}</label>
        <div className="flex gap-2">
          {difficulties.map(d => (
            <button
              key={d}
              onClick={() => setForm({ ...form, difficulty: d })}
              className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-all border focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400/60 ${
                form.difficulty === d
                  ? 'bg-gradient-to-r from-indigo-500/30 to-pink-500/30 text-white border-indigo-400/50 shadow-md'
                  : 'text-white/40 hover:text-white hover:bg-white/5 border-white/10'
              }`}
            >
              {t(d, lang)}
            </button>
          ))}
        </div>
      </div>

      {/* Number of Questions */}
      <div>
        <label className="text-white/50 text-xs font-medium uppercase tracking-wider mb-2 block">
          {t('numQuestions', lang)}: <span className="text-white font-bold">{form.numQuestions}</span>
        </label>
        <input
          type="range"
          min={1}
          max={10}
          value={form.numQuestions}
          onChange={(e) => setForm({ ...form, numQuestions: parseInt(e.target.value) })}
          className="w-full accent-indigo-500"
        />
      </div>

      {/* Competency Ratios */}
      <div>
        <label className="text-white/50 text-xs font-medium uppercase tracking-wider mb-2 block">{t('competencies', lang)}</label>
        <div className="space-y-3">
          {(['memory', 'understanding', 'application'] as const).map(comp => (
            <div key={comp} className="flex items-center gap-3">
              <span className="text-white/60 text-xs w-24 capitalize">{t(comp, lang)}</span>
              <input
                type="range"
                min={0}
                max={100}
                value={form.competencyRatios[comp] || 0}
                onChange={(e) => setForm({
                  ...form,
                  competencyRatios: { ...form.competencyRatios, [comp]: parseInt(e.target.value) }
                })}
                className="flex-1 accent-pink-500"
              />
              <span className="text-white/80 text-xs w-8 text-right">{form.competencyRatios[comp] || 0}%</span>
            </div>
          ))}
        </div>
      </div>

      {/* Generate Button */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={onGenerate}
        disabled={isGenerating}
        className="w-full py-3.5 rounded-xl bg-gradient-to-r from-indigo-500 to-pink-500 text-white font-bold text-sm shadow-lg shadow-indigo-500/25 disabled:opacity-50 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-400/60"
      >
        {isGenerating ? '⏳ ' + (lang === 'hi' ? 'बन रहा है...' : 'Generating...') : `📝 ${t('generateWorksheet', lang)}`}
      </motion.button>
    </div>
  );
}

function QuestionPreview({ questions, onConfirm, onBack, lang }: {
  questions: WorksheetQuestion[];
  onConfirm: () => void;
  onBack: () => void;
  lang: string;
}) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-white font-bold text-lg">{t('worksheetPreview', lang)}</h3>
        <span className="text-xs text-white/40 bg-white/5 px-3 py-1 rounded-full">
          {questions.length} {t('generatedQuestions', lang)}
        </span>
      </div>

      <div className="space-y-3">
        {questions.map((q, i) => (
          <motion.div
            key={q.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="rounded-xl p-4 border border-white/10 bg-white/5 backdrop-blur-md"
          >
            <div className="flex items-start gap-3">
              <span className="text-white/40 text-sm font-bold shrink-0">Q{i + 1}.</span>
              <div className="flex-1">
                <p className="text-white text-sm">{q.text}</p>
                <div className="flex gap-2 mt-2">
                  <span className={`text-xs px-2 py-0.5 rounded-full border ${
                    q.difficulty === 'easy' ? 'bg-green-500/15 text-green-300 border-green-500/30' :
                    q.difficulty === 'medium' ? 'bg-yellow-500/15 text-yellow-300 border-yellow-500/30' :
                    'bg-red-500/15 text-red-300 border-red-500/30'
                  }`}>
                    {t(q.difficulty, lang)}
                  </span>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-indigo-500/15 text-indigo-300 border border-indigo-500/30">
                    {q.competency}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="flex gap-3">
        <button
          onClick={onBack}
          className="flex-1 py-3 rounded-xl bg-white/10 hover:bg-white/15 text-white/70 text-sm font-semibold border border-white/10 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
        >
          ← {t('back', lang)}
        </button>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onConfirm}
          className="flex-1 py-3 rounded-xl bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold text-sm shadow-lg shadow-green-500/25 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-green-400/60"
        >
          📱 {t('confirmSend', lang)}
        </motion.button>
      </div>
    </div>
  );
}

// --- MAIN COMPONENT ---
export default function TeacherDashboard() {
  const [lang, setLang] = useState<'en' | 'hi' | 'hinglish'>('en');
  const [selectedClassId, setSelectedClassId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'worksheet' | 'performance'>('overview');
  const [subTab, setSubTab] = useState<'form' | 'preview'>('form');
  const [worksheetForm, setWorksheetForm] = useState<WorksheetForm>({
    subject: 'Mathematics',
    topic: '',
    difficulty: 'mixed',
    numQuestions: 5,
    competencyRatios: { memory: 20, understanding: 30, application: 50 },
  });
  const [generatedQuestions, setGeneratedQuestions] = useState<WorksheetQuestion[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [sentFlash, setSentFlash] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [createdWorksheetId, setCreatedWorksheetId] = useState<string | null>(null);

  // ── Real API hooks ──
  const user = useAuthStore((s) => s.user);
  const teacherId = user?.id ?? 'me';
  const { data: classesData, isLoading: classesLoading } = useTeacherClasses(teacherId);
  const { data: studentsData, isLoading: studentsLoading } = useClassStudents(selectedClassId);
  const { data: classProgress } = useClassProgress(selectedClassId);
  const createWorksheet = useCreateWorksheet();
  const sendWorksheet = useSendWorksheet(createdWorksheetId);
  const assignHomework = useAssignHomework();

  // Map API classes to display format
  const apiClasses: ClassData[] = useMemo(() => {
    if (!classesData?.data) return [];
    return classesData.data.map((c: ApiClass) => ({
      id: c.id,
      name: c.name,
      subject: c.subject,
      studentCount: c.studentCount,
      averageMastery: Math.round(classProgress?.averageScore ?? 0),
      homeworkCompletionRate: Math.round((classProgress?.overallCompletionRate ?? 0) * 100),
      students: [],
    }));
  }, [classesData, classProgress]);

  // Map API students to display format
  const apiStudents: Student[] = useMemo(() => {
    if (!studentsData) return [];
    return studentsData.map((s: ApiStudent) => ({
      id: s.id,
      name: `${s.firstName} ${s.lastName}`,
      mastery: 0, // TODO: wire to per-student mastery when endpoint available
      completedHomework: false,
      topicsStruggling: [],
    }));
  }, [studentsData]);

  // Build the selected class with students
  const selectedClass = useMemo(() => {
    if (!selectedClassId) return null;
    const cls = apiClasses.find((c) => c.id === selectedClassId);
    if (!cls) return null;
    return { ...cls, students: apiStudents };
  }, [selectedClassId, apiClasses, apiStudents]);

  const handleGenerate = useCallback(async () => {
    setIsGenerating(true);
    try {
      const difficultyMap: Record<string, Difficulty> = {
        easy: Difficulty.Easy,
        medium: Difficulty.Medium,
        hard: Difficulty.Hard,
      };
      const difficulty = worksheetForm.difficulty === 'mixed'
        ? Difficulty.Medium
        : difficultyMap[worksheetForm.difficulty] ?? Difficulty.Medium;

      const langMap: Record<string, ContentLanguage> = {
        en: ContentLanguage.English,
        hi: ContentLanguage.Hindi,
        hinglish: ContentLanguage.Hinglish,
      };

      const questions: Omit<ApiWorksheetQuestion, 'id'>[] = Array.from(
        { length: worksheetForm.numQuestions },
        (_, i) => ({
          type: 'short_answer' as const,
          prompt: `${worksheetForm.topic} — Question ${i + 1}`,
          correctAnswer: '',
          marks: 5,
          hints: [],
        }),
      );

      const worksheet = await createWorksheet.mutateAsync({
        title: `${worksheetForm.subject}: ${worksheetForm.topic || 'Worksheet'}`,
        subject: worksheetForm.subject,
        grade: selectedClass ? parseInt(selectedClass.name.match(/\d+/)?.[0] ?? '10') : 10,
        chapter: worksheetForm.topic,
        difficulty,
        language: langMap[lang] ?? ContentLanguage.English,
        questions,
      });

      setCreatedWorksheetId(worksheet.id);
      setGeneratedQuestions(
        worksheet.questions.map((q) => ({
          id: q.id,
          text: q.prompt,
          difficulty: q.type.includes('choice') ? 'easy' : 'medium',
          competency: 'Understanding',
        })),
      );
      setSubTab('preview');
    } catch (err) {
      console.error('Worksheet generation failed:', err);
      // Fallback: show empty preview with error message
      setGeneratedQuestions([]);
      setSubTab('preview');
    } finally {
      setIsGenerating(false);
    }
  }, [worksheetForm, createWorksheet, selectedClass, lang]);

  const handleSendWhatsApp = useCallback(async () => {
    if (!createdWorksheetId || !selectedClass) return;
    setSentFlash(true);
    try {
      const recipientIds = selectedClass.students.map((s) => s.id);
      await sendWorksheet.mutateAsync({ recipientIds, message: 'Your worksheet is ready!' });
    } catch (err) {
      console.error('WhatsApp send failed:', err);
    } finally {
      setTimeout(() => setSentFlash(false), 3000);
    }
  }, [createdWorksheetId, selectedClass, sendWorksheet]);

  const handleRemediate = useCallback((studentId: string) => {
    // In production this would call a remediation endpoint
    console.log(`Remediation triggered for student: ${studentId}`);
  }, []);

  const filteredStudents = useMemo(() => {
    if (!selectedClass) return [];
    const students = selectedClass.students;
    if (!searchQuery.trim()) return students;
    const q = searchQuery.toLowerCase();
    return students.filter(s =>
      s.name.toLowerCase().includes(q) ||
      s.topicsStruggling.some(t => t.toLowerCase().includes(q))
    );
  }, [selectedClass, searchQuery]);

  // --- CLASS SELECTION VIEW ---
  if (!selectedClass) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-950 via-indigo-950/30 to-gray-950" role="main">
        <div className="max-w-lg mx-auto px-4 py-8">
          <header className="flex items-center justify-between mb-8">
            <div>
              <motion.h1
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-2xl font-bold text-white"
              >
                👩‍🏫 {t('dashboardTitle', lang)}
              </motion.h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-white/40 text-sm mt-1"
              >
                {user?.name ?? 'Teacher'}
              </motion.p>
            </div>
            <LanguageToggle lang={lang} setLang={setLang} />
          </header>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.15 }}
            className="text-white/50 text-sm mb-4"
          >
            {t('classes', lang)}
          </motion.p>

          {classesLoading ? (
            <div className="text-center py-8 text-white/40 text-sm">Loading classes…</div>
          ) : apiClasses.length === 0 ? (
            <div className="text-center py-8 text-white/40 text-sm">No classes assigned yet.</div>
          ) : (
            <div className="space-y-4">
              {apiClasses.map((cls, i) => (
                <ClassCard
                  key={cls.id}
                  cls={cls}
                  lang={lang}
                  index={i}
                  onSelect={() => setSelectedClassId(cls.id)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }

  // --- CLASS DETAIL VIEW ---
  const cls = selectedClass;
  const strugglingCount = cls.students.filter(s => s.mastery < 40).length;
  const tabs = [
    { key: 'overview' as const, label: t('classes', lang), icon: '📊' },
    { key: 'worksheet' as const, label: t('createWorksheet', lang), icon: '📝' },
    { key: 'performance' as const, label: t('performance', lang), icon: '📈' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-indigo-950/30 to-gray-950" role="main">
      <div className="max-w-2xl mx-auto px-4 py-6">
        {/* Header */}
        <header className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => { setSelectedClassId(null); setActiveTab('overview'); setSubTab('form'); setGeneratedQuestions([]); setCreatedWorksheetId(null); }}
              className="w-9 h-9 rounded-xl bg-white/10 hover:bg-white/15 border border-white/10 flex items-center justify-center text-white/70 hover:text-white transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
              aria-label="Back to classes"
            >
              ←
            </motion.button>
            <div>
              <motion.h1 className="text-xl font-bold text-white leading-tight" layout>
                {cls.name}
              </motion.h1>
              <motion.p className="text-white/40 text-xs" layout>
                {cls.subject} · {cls.studentCount} {t('students', lang)}
              </motion.p>
            </div>
          </div>
          <LanguageToggle lang={lang} setLang={setLang} />
        </header>

        {/* Tab Switcher */}
        <div className="flex p-1 rounded-xl bg-white/5 border border-white/10 mb-6" role="tablist" aria-label="Dashboard sections">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              role="tab"
              aria-selected={activeTab === tab.key}
              onClick={() => { setActiveTab(tab.key); if (tab.key !== 'worksheet') setSubTab('form'); }}
              className={`flex-1 py-2.5 rounded-lg text-xs font-semibold transition-all flex items-center justify-center gap-1.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400/60 ${
                activeTab === tab.key
                  ? 'bg-gradient-to-r from-indigo-500/30 to-pink-500/30 text-white shadow-md'
                  : 'text-white/40 hover:text-white/60'
              }`}
            >
              <span>{tab.icon}</span>
              <span className="hidden sm:inline">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          {activeTab === 'overview' && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25, ease: easeOut }}
              className="space-y-5"
            >
              <div className="grid grid-cols-3 gap-3">
                <StatCard icon="👥" label={t('students', lang)} value={cls.studentCount} color="#6366f1" delay={0} />
                <StatCard icon="🎯" label={t('avgMastery', lang)} value={`${cls.averageMastery}%`} color="#f472b6" delay={0.1} />
                <StatCard icon="📋" label={t('completionRate', lang)} value={`${cls.homeworkCompletionRate}%`} color="#34d399" delay={0.2} />
              </div>

              {strugglingCount > 0 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="rounded-2xl p-5 border border-red-500/30 bg-red-500/10 backdrop-blur-xl"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xl">⚠️</span>
                    <h3 className="text-red-300 font-bold text-sm">
                      {strugglingCount} {t('struggling', lang)} {t('students', lang).toLowerCase()}
                    </h3>
                  </div>
                  <p className="text-red-300/60 text-xs">
                    Mastery below 40%. Tap Performance tab for details and remediation.
                  </p>
                </motion.div>
              )}

              <div>
                <h3 className="text-white/50 text-xs font-medium uppercase tracking-wider mb-3">Quick Actions</h3>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { icon: '📝', label: t('createWorksheet', lang), action: () => setActiveTab('worksheet') },
                    { icon: '📈', label: t('performance', lang), action: () => setActiveTab('performance') },
                  ].map((action, i) => (
                    <motion.button
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 + i * 0.08 }}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={action.action}
                      className="rounded-xl p-4 border border-white/10 bg-white/5 hover:bg-white/10 backdrop-blur-md text-left transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400/60"
                    >
                      <span className="text-2xl block mb-2">{action.icon}</span>
                      <span className="text-white text-sm font-semibold">{action.label}</span>
                    </motion.button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'worksheet' && (
            <motion.div
              key="worksheet"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25, ease: easeOut }}
            >
              <AnimatePresence mode="wait">
                {subTab === 'form' && (
                  <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    <WorksheetFormView
                      form={worksheetForm}
                      setForm={setWorksheetForm}
                      onGenerate={handleGenerate}
                      onPreview={() => setSubTab('preview')}
                      lang={lang}
                      isGenerating={isGenerating}
                    />
                  </motion.div>
                )}
                {subTab === 'preview' && (
                  <motion.div key="preview" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    <QuestionPreview
                      questions={generatedQuestions}
                      onConfirm={handleSendWhatsApp}
                      onBack={() => setSubTab('form')}
                      lang={lang}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}

          {activeTab === 'performance' && (
            <motion.div
              key="performance"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25, ease: easeOut }}
              className="space-y-4"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-white font-bold text-lg">{t('allStudents', lang)}</h3>
                <span className="text-xs text-white/40 bg-white/5 px-3 py-1 rounded-full">
                  {filteredStudents.length} {t('students', lang)}
                </span>
              </div>

              <div className="relative">
                <input
                  type="search"
                  placeholder="Search students or topics..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-3 pl-10 rounded-xl bg-white/10 border border-white/15 text-white text-sm placeholder:text-white/30 backdrop-blur-md focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400/60 transition-all"
                  aria-label="Search students"
                />
                <span className="absolute left-3 top-3.5 text-white/30">🔍</span>
              </div>

              <StudentTable students={filteredStudents} onRemediate={handleRemediate} lang={lang} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* WhatsApp Sent Flash */}
        <AnimatePresence>
          {sentFlash && (
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-6 py-4 rounded-2xl bg-green-500 text-white shadow-2xl shadow-green-500/40 border border-green-400/30 flex items-center gap-3"
              role="alert"
            >
              <span className="text-2xl">✅</span>
              <div>
                <p className="font-bold text-sm">{t('sent', lang)}</p>
                <p className="text-green-100 text-xs">Homework sent to {cls.studentCount} students via WhatsApp</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
