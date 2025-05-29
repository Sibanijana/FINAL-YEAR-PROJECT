import { create } from "zustand";

export interface RoutineClass {
  id: string;
  day: string;
  startTime: string;
  endTime: string;
  subject: string;
  teacher: string;
  room: string;
  department: string;
  departmentId: string;
  semester?: string;
  section?: string;
}

interface RoutineState {
  routines: RoutineClass[];
  departments: { id: string; name: string }[];
  addRoutine: (routine: RoutineClass) => void;
  updateRoutine: (id: string, updatedRoutine: Partial<RoutineClass>) => void;
  deleteRoutine: (id: string) => void;
  getRoutinesByDepartment: (departmentId: string) => RoutineClass[];
  getRoutinesByStudentCriteria: (
    departmentId: string,
    semester: string,
    section: string
  ) => RoutineClass[];
}

// Mock data for departments
const mockDepartments = [
  { id: "cs", name: "Computer Science" },
  { id: "ee", name: "Electrical Engineering" },
  { id: "me", name: "Mechanical Engineering" },
  { id: "ce", name: "Civil Engineering" },
];

// Mock data for routines
const mockRoutines: RoutineClass[] = [
  {
    id: "1",
    day: "Monday",
    startTime: "09:00",
    endTime: "10:30",
    subject: "Data Structures",
    teacher: "Dr. Smith",
    room: "CS-101",
    department: "Computer Science",
    departmentId: "cs",
    semester: "6th",
    section: "A",
  },
  {
    id: "2",
    day: "Monday",
    startTime: "11:00",
    endTime: "12:30",
    subject: "Database Systems",
    teacher: "Prof. Johnson",
    room: "CS-102",
    department: "Computer Science",
    departmentId: "cs",
    semester: "6th",
    section: "A",
  },
  {
    id: "3",
    day: "Tuesday",
    startTime: "09:00",
    endTime: "10:30",
    subject: "Software Engineering",
    teacher: "Dr. Williams",
    room: "CS-103",
    department: "Computer Science",
    departmentId: "cs",
    semester: "6th",
    section: "A",
  },
  {
    id: "4",
    day: "Tuesday",
    startTime: "11:00",
    endTime: "12:30",
    subject: "Computer Networks",
    teacher: "Prof. Davis",
    room: "CS-104",
    department: "Computer Science",
    departmentId: "cs",
    semester: "6th",
    section: "A",
  },
  {
    id: "5",
    day: "Wednesday",
    startTime: "09:00",
    endTime: "10:30",
    subject: "Digital Systems",
    teacher: "Dr. Brown",
    room: "EE-101",
    department: "Electrical Engineering",
    departmentId: "ee",
    semester: "4th",
    section: "B",
  },
  {
    id: "6",
    day: "Wednesday",
    startTime: "11:00",
    endTime: "12:30",
    subject: "Circuit Theory",
    teacher: "Prof. Miller",
    room: "EE-102",
    department: "Electrical Engineering",
    departmentId: "ee",
    semester: "4th",
    section: "B",
  },
];

export const useRoutineStore = create<RoutineState>((set, get) => ({
  routines: mockRoutines,
  departments: mockDepartments,

  addRoutine: (routine) => {
    set((state) => ({
      routines: [...state.routines, routine],
    }));
  },

  updateRoutine: (id, updatedRoutine) => {
    set((state) => ({
      routines: state.routines.map((routine) =>
        routine.id === id ? { ...routine, ...updatedRoutine } : routine
      ),
    }));
  },

  deleteRoutine: (id) => {
    set((state) => ({
      routines: state.routines.filter((routine) => routine.id !== id),
    }));
  },

  getRoutinesByDepartment: (departmentId) => {
    return get().routines.filter(
      (routine) => routine.departmentId === departmentId
    );
  },

  getRoutinesByStudentCriteria: (departmentId, semester, section) => {
    return get().routines.filter(
      (routine) =>
        routine.departmentId === departmentId &&
        routine.semester === semester &&
        routine.section === section
    );
  },
}));
