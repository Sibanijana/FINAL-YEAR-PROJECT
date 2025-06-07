
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export interface TimeSlot {
  time: string;
  subject: string;
  teacher: string;
  room: string;
}

export interface DaySchedule {
  day: string;
  slots: TimeSlot[];
}

export interface Routine {
  id: string;
  name: string;
  description?: string;
  schedule: DaySchedule[];
  createdAt: Date;
  createdBy: string;
  isActive: boolean;
}

interface RoutineState {
  routines: Routine[];
  activeRoutine: Routine | null;
  isLoading: boolean;
  addRoutine: (routine: Omit<Routine, 'id' | 'createdAt'>) => void;
  updateRoutine: (id: string, updates: Partial<Routine>) => void;
  deleteRoutine: (id: string) => void;
  setActiveRoutine: (id: string) => void;
  getRoutineById: (id: string) => Routine | undefined;
  getRoutinesByCreator: (creatorId: string) => Routine[];
}

export const useRoutineStore = create<RoutineState>()(
  persist(
    (set, get) => ({
      routines: [],
      activeRoutine: null,
      isLoading: false,

      addRoutine: (routineData) => {
        const newRoutine: Routine = {
          ...routineData,
          id: crypto.randomUUID(),
          createdAt: new Date(),
        };
        
        set((state) => ({
          routines: [...state.routines, newRoutine],
        }));
      },

      updateRoutine: (id, updates) => {
        set((state) => ({
          routines: state.routines.map((routine) =>
            routine.id === id ? { ...routine, ...updates } : routine
          ),
        }));
      },

      deleteRoutine: (id) => {
        set((state) => ({
          routines: state.routines.filter((routine) => routine.id !== id),
          activeRoutine: state.activeRoutine?.id === id ? null : state.activeRoutine,
        }));
      },

      setActiveRoutine: (id) => {
        const routine = get().routines.find((r) => r.id === id);
        set({ activeRoutine: routine || null });
      },

      getRoutineById: (id) => {
        return get().routines.find((routine) => routine.id === id);
      },

      getRoutinesByCreator: (creatorId) => {
        return get().routines.filter((routine) => routine.createdBy === creatorId);
      },
    }),
    {
      name: 'routine-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
