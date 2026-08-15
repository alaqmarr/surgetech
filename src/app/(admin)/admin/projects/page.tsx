"use client";

import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Plus, Edit2, Trash2, Check, X, Building2 } from "lucide-react";
import toast from "react-hot-toast";

interface Project {
  id: string;
  title: string;
  location: string;
  type: string;
  size: string;
  savings: string;
  quote: string;
  author: string;
  isActive: boolean;
}

export default function AdminProjectsPage() {
  const { data: session } = useSession();
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  
  const [formData, setFormData] = useState<Partial<Project>>({
    title: "", location: "", type: "Residential", size: "", savings: "", quote: "", author: "", isActive: true
  });

  const fetchProjects = async () => {
    try {
      const res = await fetch("/api/admin/projects");
      if (res.ok) {
        const data = await res.json();
        setProjects(data);
      }
    } catch (error) {
      toast.error("Failed to fetch projects");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const openAddModal = () => {
    setFormData({ title: "", location: "", type: "Residential", size: "", savings: "", quote: "", author: "", isActive: true });
    setIsEditing(false);
    setIsModalOpen(true);
  };

  const openEditModal = (project: Project) => {
    setFormData(project);
    setIsEditing(true);
    setIsModalOpen(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const value = e.target.type === "checkbox" ? (e.target as HTMLInputElement).checked : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };

  const handleSave = async () => {
    const method = isEditing ? "PUT" : "POST";
    const url = isEditing ? `/api/admin/projects/${formData.id}` : "/api/admin/projects";
    
    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        toast.success(`Project ${isEditing ? 'updated' : 'added'} successfully!`);
        setIsModalOpen(false);
        fetchProjects();
      } else {
        toast.error("Failed to save project.");
      }
    } catch (error) {
      toast.error("An error occurred while saving.");
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this project?")) return;
    
    try {
      const res = await fetch(`/api/admin/projects/${id}`, { method: "DELETE" });
      if (res.ok) {
        toast.success("Project deleted.");
        fetchProjects();
      } else {
        toast.error("Failed to delete project.");
      }
    } catch (error) {
      toast.error("Error deleting project.");
    }
  };

  const toggleActive = async (project: Project) => {
    try {
      const res = await fetch(`/api/admin/projects/${project.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...project, isActive: !project.isActive }),
      });
      if (res.ok) fetchProjects();
    } catch (error) {
      toast.error("Failed to toggle status");
    }
  };

  if (isLoading) return <div className="animate-pulse text-cyan-400">Loading projects...</div>;

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2 font-heading">Case Studies</h1>
          <p className="text-surface-300">Manage the projects shown in the Proven Impact section on the homepage.</p>
        </div>
        <Button onClick={openAddModal} variant="primary" className="shrink-0">
          <Plus className="h-4 w-4 mr-2" /> Add Project
        </Button>
      </div>

      <div className="glass-dark rounded-2xl border border-white/10 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white/5 border-b border-white/10 text-surface-200 text-sm">
                <th className="px-6 py-4 font-semibold">Project Title</th>
                <th className="px-6 py-4 font-semibold">Location</th>
                <th className="px-6 py-4 font-semibold">Type</th>
                <th className="px-6 py-4 font-semibold">Size & Savings</th>
                <th className="px-6 py-4 font-semibold">Status</th>
                <th className="px-6 py-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {projects.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-surface-400">
                    <Building2 className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>No projects found. Add one to display the section on the homepage.</p>
                  </td>
                </tr>
              ) : (
                projects.map((p) => (
                  <tr key={p.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="px-6 py-4 text-white font-medium">{p.title}</td>
                    <td className="px-6 py-4 text-surface-300">{p.location}</td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 rounded bg-white/5 text-xs font-semibold text-cyan-400 border border-white/10">
                        {p.type}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-white text-sm">{p.size}</div>
                      <div className="text-green-400 text-xs font-semibold">{p.savings}</div>
                    </td>
                    <td className="px-6 py-4">
                      <button 
                        onClick={() => toggleActive(p)}
                        className={`px-3 py-1 rounded-full text-xs font-bold border transition-colors ${
                          p.isActive ? 'bg-green-500/10 text-green-400 border-green-500/20' : 'bg-surface-500/10 text-surface-400 border-surface-500/20'
                        }`}
                      >
                        {p.isActive ? 'Active' : 'Hidden'}
                      </button>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex justify-end gap-2">
                        <button onClick={() => openEditModal(p)} className="p-2 text-surface-300 hover:text-cyan-400 transition-colors">
                          <Edit2 className="h-4 w-4" />
                        </button>
                        <button onClick={() => handleDelete(p.id)} className="p-2 text-surface-300 hover:text-red-400 transition-colors">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/80 backdrop-blur-sm">
          <div className="bg-navy-900 border border-white/10 rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden max-h-[90vh] flex flex-col">
            <div className="p-6 border-b border-white/10 flex justify-between items-center bg-white/5">
              <h2 className="text-xl font-bold text-white">{isEditing ? 'Edit Project' : 'Add New Project'}</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-surface-300 hover:text-white">
                <X className="h-6 w-6" />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto flex-1 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm text-surface-200">Title</label>
                  <input name="title" value={formData.title} onChange={handleChange} className="w-full bg-navy-950 border border-white/10 rounded-lg px-4 py-2 text-white" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-surface-200">Location</label>
                  <input name="location" value={formData.location} onChange={handleChange} className="w-full bg-navy-950 border border-white/10 rounded-lg px-4 py-2 text-white" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-surface-200">Type</label>
                  <select name="type" value={formData.type} onChange={handleChange} className="w-full bg-navy-950 border border-white/10 rounded-lg px-4 py-2 text-white">
                    <option>Residential</option>
                    <option>Commercial</option>
                    <option>Industrial</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-surface-200">System Size (e.g. 6.6 kW)</label>
                  <input name="size" value={formData.size} onChange={handleChange} className="w-full bg-navy-950 border border-white/10 rounded-lg px-4 py-2 text-white" />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm text-surface-200">Est. Savings (e.g. ₹85,000/yr)</label>
                  <input name="savings" value={formData.savings} onChange={handleChange} className="w-full bg-navy-950 border border-white/10 rounded-lg px-4 py-2 text-white" />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm text-surface-200">Customer Quote / Testimonial</label>
                  <textarea name="quote" value={formData.quote} onChange={handleChange} rows={3} className="w-full bg-navy-950 border border-white/10 rounded-lg px-4 py-2 text-white" />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm text-surface-200">Author / Customer Name</label>
                  <input name="author" value={formData.author} onChange={handleChange} className="w-full bg-navy-950 border border-white/10 rounded-lg px-4 py-2 text-white" />
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <input type="checkbox" name="isActive" checked={formData.isActive} onChange={handleChange} id="isActive" className="h-4 w-4" />
                  <label htmlFor="isActive" className="text-sm text-surface-200 cursor-pointer">Show on Homepage</label>
                </div>
              </div>
            </div>
            
            <div className="p-6 border-t border-white/10 bg-white/5 flex justify-end gap-3">
              <Button onClick={() => setIsModalOpen(false)} variant="secondary" className="bg-transparent border-white/20 text-white">Cancel</Button>
              <Button onClick={handleSave} variant="primary">Save Project</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
