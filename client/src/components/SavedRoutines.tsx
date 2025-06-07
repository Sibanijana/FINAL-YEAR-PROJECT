
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Beaker, Coffee, Download, Trash2, Calendar, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';

// Extend jsPDF type to include autoTable
declare module 'jspdf' {
  interface jsPDF {
    autoTable: (options: any) => jsPDF;
  }
}

interface TimeSlot {
  id: string;
  startTime: string;
  endTime: string;
  type: 'class' | 'lab' | 'recess';
  subject?: string;
  teacher?: string;
  duration: number;
}

interface SavedRoutine {
  id: string;
  name: string;
  createdAt: string;
  slots: TimeSlot[];
}

const SavedRoutines = () => {
  const { toast } = useToast();
  const [savedRoutines, setSavedRoutines] = useState<SavedRoutine[]>([]);

  // Load saved routines from localStorage on component mount
  useEffect(() => {
    const stored = localStorage.getItem('savedRoutines');
    if (stored) {
      try {
        setSavedRoutines(JSON.parse(stored));
      } catch (error) {
        console.error('Error parsing saved routines:', error);
      }
    }
  }, []);

  const deleteRoutine = (routineId: string) => {
    const updatedRoutines = savedRoutines.filter(routine => routine.id !== routineId);
    setSavedRoutines(updatedRoutines);
    localStorage.setItem('savedRoutines', JSON.stringify(updatedRoutines));
    
    toast({
      title: "Routine Deleted",
      description: "The routine has been successfully deleted.",
    });
  };

  const downloadRoutinePDF = (routine: SavedRoutine) => {
    try {
      const doc = new jsPDF();
      
      doc.setFontSize(20);
      doc.text(`Class Routine: ${routine.name}`, 20, 20);
      
      doc.setFontSize(12);
      doc.text(`Created: ${routine.createdAt}`, 20, 35);
      
      const tableData = routine.slots.map(slot => [
        `${slot.startTime} - ${slot.endTime}`,
        slot.subject || 'Recess',
        slot.teacher || '-',
        `${slot.duration} min`,
        slot.type.charAt(0).toUpperCase() + slot.type.slice(1)
      ]);
      
      doc.autoTable({
        head: [['Time', 'Subject', 'Teacher', 'Duration', 'Type']],
        body: tableData,
        startY: 45,
      });
      
      doc.save(`${routine.name}.pdf`);
      
      toast({
        title: "PDF Downloaded",
        description: `${routine.name} has been saved as PDF.`,
      });
    } catch (error) {
      console.error('Error generating PDF:', error);
      toast({
        title: "PDF Error",
        description: "Failed to generate PDF. Please try again.",
        variant: "destructive"
      });
    }
  };

  const downloadRoutineExcel = (routine: SavedRoutine) => {
    const worksheetData = routine.slots.map(slot => ({
      'Time': `${slot.startTime} - ${slot.endTime}`,
      'Subject': slot.subject || 'Recess',
      'Teacher': slot.teacher || '-',
      'Duration (min)': slot.duration,
      'Type': slot.type.charAt(0).toUpperCase() + slot.type.slice(1)
    }));
    
    const worksheet = XLSX.utils.json_to_sheet(worksheetData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Routine');
    
    XLSX.writeFile(workbook, `${routine.name}.xlsx`);
    
    toast({
      title: "Excel Downloaded",
      description: `${routine.name} has been saved as Excel file.`,
    });
  };

  const getTotalDuration = (slots: TimeSlot[]) => {
    return slots.reduce((total, slot) => total + slot.duration, 0);
  };

  const getSlotTypeIcon = (type: string) => {
    switch (type) {
      case 'class':
        return <BookOpen className="h-3 w-3 text-blue-600" />;
      case 'lab':
        return <Beaker className="h-3 w-3 text-purple-600" />;
      case 'recess':
        return <Coffee className="h-3 w-3 text-green-600" />;
      default:
        return null;
    }
  };

  if (savedRoutines.length === 0) {
    return (
      <Card className="border-0 bg-white/60 backdrop-blur-sm">
        <CardContent className="flex flex-col items-center justify-center py-16">
          <Calendar className="h-16 w-16 text-slate-400 mb-4" />
          <h3 className="text-lg font-semibold text-slate-900 mb-2">No Saved Routines</h3>
          <p className="text-slate-600 text-center max-w-md">
            You haven't created any routines yet. Click "New Routine" to create your first schedule.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-900">Saved Routines</h2>
        <Badge variant="secondary" className="bg-blue-100 text-blue-700">
          {savedRoutines.length} routine{savedRoutines.length !== 1 ? 's' : ''}
        </Badge>
      </div>

      <div className="grid gap-6">
        {savedRoutines.map((routine) => (
          <Card key={routine.id} className="border-0 bg-white/60 backdrop-blur-sm">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-blue-600" />
                    {routine.name}
                  </CardTitle>
                  <div className="flex items-center gap-4 text-sm text-slate-600 mt-2">
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      Created: {routine.createdAt}
                    </div>
                    <div className="flex items-center gap-1">
                      <BookOpen className="h-4 w-4" />
                      {routine.slots.length} slots
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {getTotalDuration(routine.slots)} min total
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    onClick={() => downloadRoutinePDF(routine)}
                    size="sm"
                    variant="outline"
                    className="gap-2"
                  >
                    <Download className="h-4 w-4" />
                    PDF
                  </Button>
                  <Button
                    onClick={() => downloadRoutineExcel(routine)}
                    size="sm"
                    variant="outline"
                    className="gap-2"
                  >
                    <Download className="h-4 w-4" />
                    Excel
                  </Button>
                  <Button
                    onClick={() => deleteRoutine(routine.id)}
                    size="sm"
                    variant="outline"
                    className="gap-2 text-red-600 hover:bg-red-50 hover:border-red-300"
                  >
                    <Trash2 className="h-4 w-4" />
                    Delete
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Time</TableHead>
                    <TableHead>Subject</TableHead>
                    <TableHead>Teacher</TableHead>
                    <TableHead>Duration</TableHead>
                    <TableHead>Type</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {routine.slots.map((slot, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">
                        {slot.startTime} - {slot.endTime}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {getSlotTypeIcon(slot.type)}
                          {slot.subject || 'Recess'}
                        </div>
                      </TableCell>
                      <TableCell>{slot.teacher || '-'}</TableCell>
                      <TableCell>{slot.duration} min</TableCell>
                      <TableCell>
                        <Badge
                          variant="secondary"
                          className={
                            slot.type === 'class' ? 'bg-blue-100 text-blue-700' :
                            slot.type === 'lab' ? 'bg-purple-100 text-purple-700' :
                            'bg-green-100 text-green-700'
                          }
                        >
                          {slot.type.charAt(0).toUpperCase() + slot.type.slice(1)}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default SavedRoutines;
