import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Clock, BookOpen, Beaker, Coffee, Download, Save } from "lucide-react";
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

interface NewRoutineFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const NewRoutineForm = ({ open, onOpenChange }: NewRoutineFormProps) => {
  const { toast } = useToast();
  const [routineName, setRoutineName] = useState('');
  const [currentSlot, setCurrentSlot] = useState({
    type: 'class' as 'class' | 'lab' | 'recess',
    subject: '',
    teacher: '',
    duration: 50
  });
  const [schedule, setSchedule] = useState<TimeSlot[]>([]);

  // Generate time slots based on type and duration
  const generateTimeSlots = () => {
    const startTime = new Date();
    startTime.setHours(10, 15, 0, 0); // Start at 10:15 AM
    
    const slots: TimeSlot[] = [];
    let currentTime = new Date(startTime);
    
    schedule.forEach((slot, index) => {
      const endTime = new Date(currentTime);
      endTime.setMinutes(currentTime.getMinutes() + slot.duration);
      
      slots.push({
        ...slot,
        id: `slot-${index}`,
        startTime: currentTime.toLocaleTimeString('en-US', { 
          hour: '2-digit', 
          minute: '2-digit',
          hour12: false 
        }),
        endTime: endTime.toLocaleTimeString('en-US', { 
          hour: '2-digit', 
          minute: '2-digit',
          hour12: false 
        })
      });
      
      currentTime = new Date(endTime);
    });
    
    return slots;
  };

  const addSlot = () => {
    if (currentSlot.type !== 'recess' && (!currentSlot.subject || !currentSlot.teacher)) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields for classes and labs.",
        variant: "destructive"
      });
      return;
    }

    const newSlot: TimeSlot = {
      id: `temp-${Date.now()}`,
      startTime: '',
      endTime: '',
      type: currentSlot.type,
      subject: currentSlot.subject,
      teacher: currentSlot.teacher,
      duration: currentSlot.duration
    };

    setSchedule([...schedule, newSlot]);
    setCurrentSlot({
      type: 'class',
      subject: '',
      teacher: '',
      duration: 50
    });
  };

  const removeSlot = (index: number) => {
    setSchedule(schedule.filter((_, i) => i !== index));
  };

  const handleTypeChange = (type: 'class' | 'lab' | 'recess') => {
    let duration = 50;
    if (type === 'lab') duration = 140;
    if (type === 'recess') duration = 45;
    
    setCurrentSlot({
      ...currentSlot,
      type,
      duration,
      subject: type === 'recess' ? 'Recess' : '',
      teacher: type === 'recess' ? '' : currentSlot.teacher
    });
  };

  const downloadPDF = async () => {
    try {
      const doc = new jsPDF();
      const finalSchedule = generateTimeSlots();
      
      doc.setFontSize(20);
      doc.text('Class Routine', 20, 20);
      
      const tableData = finalSchedule.map(slot => [
        `${slot.startTime} - ${slot.endTime}`,
        slot.subject || 'Recess',
        slot.teacher || '-',
        `${slot.duration} min`,
        slot.type.charAt(0).toUpperCase() + slot.type.slice(1)
      ]);
      
      // Use the autoTable method
      doc.autoTable({
        head: [['Time', 'Subject', 'Teacher', 'Duration', 'Type']],
        body: tableData,
        startY: 30,
      });
      
      doc.save('routine.pdf');
      
      toast({
        title: "PDF Downloaded",
        description: "Routine has been saved as PDF.",
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

  const downloadExcel = () => {
    const finalSchedule = generateTimeSlots();
    
    const worksheetData = finalSchedule.map(slot => ({
      'Time': `${slot.startTime} - ${slot.endTime}`,
      'Subject': slot.subject || 'Recess',
      'Teacher': slot.teacher || '-',
      'Duration (min)': slot.duration,
      'Type': slot.type.charAt(0).toUpperCase() + slot.type.slice(1)
    }));
    
    const worksheet = XLSX.utils.json_to_sheet(worksheetData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Routine');
    
    XLSX.writeFile(workbook, 'routine.xlsx');
    
    toast({
      title: "Excel Downloaded",
      description: "Routine has been saved as Excel file.",
    });
  };

  const saveRoutine = () => {
    if (schedule.length === 0) {
      toast({
        title: "Empty Schedule",
        description: "Please add at least one time slot.",
        variant: "destructive"
      });
      return;
    }

    if (!routineName.trim()) {
      toast({
        title: "Missing Name",
        description: "Please enter a name for your routine.",
        variant: "destructive"
      });
      return;
    }

    const finalSchedule = generateTimeSlots();
    
    // Create the routine object
    const newRoutine = {
      id: `routine-${Date.now()}`,
      name: routineName.trim(),
      createdAt: new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }),
      slots: finalSchedule
    };

    // Save to localStorage
    const existingRoutines = JSON.parse(localStorage.getItem('savedRoutines') || '[]');
    const updatedRoutines = [...existingRoutines, newRoutine];
    localStorage.setItem('savedRoutines', JSON.stringify(updatedRoutines));
    
    console.log('Saved routine:', newRoutine);
    
    toast({
      title: "Routine Saved",
      description: `Successfully created routine "${routineName}" with ${finalSchedule.length} time slots.`,
    });
    
    // Reset form
    setSchedule([]);
    setRoutineName('');
    setCurrentSlot({
      type: 'class',
      subject: '',
      teacher: '',
      duration: 50
    });
    onOpenChange(false);
  };

  const generatedSlots = generateTimeSlots();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Create New Routine
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Routine Name Input */}
          <Card className="border-0 bg-white/60 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="space-y-2">
                <Label htmlFor="routine-name">Routine Name</Label>
                <Input
                  id="routine-name"
                  value={routineName}
                  onChange={(e) => setRoutineName(e.target.value)}
                  placeholder="Enter routine name (e.g., Monday Schedule, Week 1 Timetable)"
                  className="text-lg"
                />
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Add Slot Form */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Add Time Slot</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="slot-type">Slot Type</Label>
                  <Select
                    value={currentSlot.type}
                    onValueChange={(value: 'class' | 'lab' | 'recess') => handleTypeChange(value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select slot type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="class">
                        <div className="flex items-center gap-2">
                          <BookOpen className="h-4 w-4" />
                          Regular Class (50 min)
                        </div>
                      </SelectItem>
                      <SelectItem value="lab">
                        <div className="flex items-center gap-2">
                          <Beaker className="h-4 w-4" />
                          Lab Class (140 min)
                        </div>
                      </SelectItem>
                      <SelectItem value="recess">
                        <div className="flex items-center gap-2">
                          <Coffee className="h-4 w-4" />
                          Recess (45 min)
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {currentSlot.type !== 'recess' && (
                  <>
                    <div>
                      <Label htmlFor="subject">Subject/Class Name</Label>
                      <Input
                        id="subject"
                        value={currentSlot.subject}
                        onChange={(e) => setCurrentSlot({ ...currentSlot, subject: e.target.value })}
                        placeholder="Enter subject name"
                      />
                    </div>

                    <div>
                      <Label htmlFor="teacher">Teacher Name</Label>
                      <Input
                        id="teacher"
                        value={currentSlot.teacher}
                        onChange={(e) => setCurrentSlot({ ...currentSlot, teacher: e.target.value })}
                        placeholder="Enter teacher name"
                      />
                    </div>
                  </>
                )}

                <div>
                  <Label htmlFor="duration">Duration (minutes)</Label>
                  <Input
                    id="duration"
                    type="number"
                    value={currentSlot.duration}
                    onChange={(e) => setCurrentSlot({ ...currentSlot, duration: parseInt(e.target.value) || 0 })}
                    placeholder="Duration in minutes"
                  />
                </div>

                <Button onClick={addSlot} className="w-full">
                  <Plus className="h-4 w-4 mr-2" />
                  Add to Schedule
                </Button>
              </CardContent>
            </Card>

            {/* Schedule Preview */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Schedule Preview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 max-h-96 overflow-y-auto">
                  {generatedSlots.length > 0 ? (
                    generatedSlots.map((slot, index) => (
                      <div
                        key={index}
                        className={`p-3 rounded-lg border ${
                          slot.type === 'class' ? 'bg-blue-50 border-blue-200' :
                          slot.type === 'lab' ? 'bg-purple-50 border-purple-200' :
                          'bg-green-50 border-green-200'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            {slot.type === 'class' && <BookOpen className="h-4 w-4 text-blue-600" />}
                            {slot.type === 'lab' && <Beaker className="h-4 w-4 text-purple-600" />}
                            {slot.type === 'recess' && <Coffee className="h-4 w-4 text-green-600" />}
                            <div>
                              <p className="font-medium">
                                {slot.subject || 'Recess'}
                              </p>
                              {slot.teacher && (
                                <p className="text-sm text-muted-foreground">
                                  {slot.teacher}
                                </p>
                              )}
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-medium">
                              {slot.startTime} - {slot.endTime}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {slot.duration} min
                            </p>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeSlot(index)}
                            className="ml-2"
                          >
                            ×
                          </Button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-muted-foreground text-center py-8">
                      No time slots added yet. Add your first slot to see the schedule.
                    </p>
                  )}
                </div>

                {schedule.length > 0 && (
                  <div className="pt-4 border-t mt-4">
                    <Button onClick={saveRoutine} className="w-full gap-2">
                      <Save className="h-4 w-4" />
                      Save Routine
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Complete Routine Display */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Complete Routine</CardTitle>
                {generatedSlots.length > 0 && (
                  <div className="flex gap-2">
                    <Button onClick={downloadPDF} size="sm" variant="outline" className="flex-1">
                      <Download className="h-4 w-4 mr-2" />
                      PDF
                    </Button>
                    <Button onClick={downloadExcel} size="sm" variant="outline" className="flex-1">
                      <Download className="h-4 w-4 mr-2" />
                      Excel
                    </Button>
                  </div>
                )}
              </CardHeader>
              <CardContent>
                {generatedSlots.length > 0 ? (
                  <div className="max-h-96 overflow-y-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Time</TableHead>
                          <TableHead>Subject</TableHead>
                          <TableHead>Teacher</TableHead>
                          <TableHead>Duration</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {generatedSlots.map((slot, index) => (
                          <TableRow key={index}>
                            <TableCell className="font-medium">
                              {slot.startTime} - {slot.endTime}
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                {slot.type === 'class' && <BookOpen className="h-3 w-3 text-blue-600" />}
                                {slot.type === 'lab' && <Beaker className="h-3 w-3 text-purple-600" />}
                                {slot.type === 'recess' && <Coffee className="h-3 w-3 text-green-600" />}
                                {slot.subject || 'Recess'}
                              </div>
                            </TableCell>
                            <TableCell>{slot.teacher || '-'}</TableCell>
                            <TableCell>{slot.duration} min</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                ) : (
                  <p className="text-muted-foreground text-center py-8">
                    Build your routine to see the complete schedule here.
                  </p>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default NewRoutineForm;
