import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useTask, Task } from '@/contexts/TaskContext';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { FloatingActionButton } from '@/components/ui/floating-action-button';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import TaskCard from '@/components/TaskCard';
import TaskForm from '@/components/TaskForm';
import { Plus, LogOut, CheckCircle2, Circle, ListTodo, Settings } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const TaskScreen = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { openTasks, completedTasks, addTask, updateTask, deleteTask, toggleTask } = useTask();
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | undefined>(undefined);
  const [activeTab, setActiveTab] = useState('open');
  const { toast } = useToast();

  const handleAddTask = () => {
    setEditingTask(undefined);
    setShowTaskForm(true);
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setShowTaskForm(true);
  };

  const handleSaveTask = (taskData: {
    title: string;
    description: string;
    dueDate: Date;
    priority: 'low' | 'medium' | 'high';
    userId: string;
  }) => {
    if (editingTask) {
      updateTask(editingTask.id, taskData);
      toast({
        title: "Task updated",
        description: "Your task has been successfully updated.",
      });
    } else {
      addTask(taskData);
      toast({
        title: "Task added",
        description: "Your new task has been created.",
      });
    }
    setShowTaskForm(false);
    setEditingTask(undefined);
  };

  const handleDeleteTask = (id: string) => {
    deleteTask(id);
    toast({
      title: "Task deleted",
      description: "The task has been permanently removed.",
    });
  };

  const handleToggleTask = (id: string) => {
    const task = [...openTasks, ...completedTasks].find(t => t.id === id);
    toggleTask(id);
    toast({
      title: task?.completed ? "Task reopened" : "Task completed",
      description: task?.completed ? "Task moved to open tasks." : "Great job! Task marked as complete.",
    });
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
  };

  const EmptyState = ({ type }: { type: 'open' | 'completed' }) => (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="mb-4">
        {type === 'open' ? (
          <ListTodo className="h-16 w-16 text-muted-foreground" />
        ) : (
          <CheckCircle2 className="h-16 w-16 text-muted-foreground" />
        )}
      </div>
      <h3 className="text-lg font-semibold mb-2">
        {type === 'open' ? 'No open tasks' : 'No completed tasks'}
      </h3>
      <p className="text-muted-foreground mb-4">
        {type === 'open' 
          ? "You're all caught up! Add a new task to get started."
          : "Complete some tasks to see them here."
        }
      </p>
      {type === 'open' && (
        <Button onClick={handleAddTask}>
          <Plus className="mr-2 h-4 w-4" />
          Add Your First Task
        </Button>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-surface">
      {/* Header */}
      <header className="bg-card shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold text-foreground">My Tasks</h1>
            <div className="bg-primary/10 px-3 py-1 rounded-full">
              <span className="text-sm font-medium text-primary">
                {openTasks.length} active
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/profile')}
              className="flex items-center gap-2"
            >
              <Avatar className="h-8 w-8">
                <AvatarImage src={user?.picture} alt={user?.name} />
                <AvatarFallback>
                  {user?.name?.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <span className="text-sm font-medium hidden sm:inline">
                {user?.name}
              </span>
              <Settings className="h-4 w-4 hidden sm:inline" />
            </Button>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="outline" size="sm">
                  <LogOut className="h-4 w-4" />
                  <span className="hidden sm:ml-2 sm:inline">Logout</span>
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    You will be logged out and redirected to the login screen.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleLogout}>
                    Logout
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="open" className="flex items-center gap-2">
              <Circle className="h-4 w-4" />
              Open Tasks ({openTasks.length})
            </TabsTrigger>
            <TabsTrigger value="completed" className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4" />
              Completed ({completedTasks.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="open" className="space-y-4">
            {openTasks.length === 0 ? (
              <EmptyState type="open" />
            ) : (
              <div className="space-y-3">
                {openTasks.map((task) => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    onToggle={handleToggleTask}
                    onDelete={handleDeleteTask}
                    onEdit={handleEditTask}
                  />
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="completed" className="space-y-4">
            {completedTasks.length === 0 ? (
              <EmptyState type="completed" />
            ) : (
              <div className="space-y-3">
                {completedTasks.map((task) => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    onToggle={handleToggleTask}
                    onDelete={handleDeleteTask}
                    onEdit={handleEditTask}
                  />
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </main>

      {/* Floating Action Button */}
      <FloatingActionButton onClick={handleAddTask}>
        <Plus className="h-6 w-6" />
      </FloatingActionButton>

      {/* Task Form Modal */}
      {showTaskForm && (
        <TaskForm
          task={editingTask}
          onSave={handleSaveTask}
          onCancel={() => {
            setShowTaskForm(false);
            setEditingTask(undefined);
          }}
        />
      )}
    </div>
  );
};

export default TaskScreen;