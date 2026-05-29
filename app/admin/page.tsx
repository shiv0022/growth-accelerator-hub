"use client";

import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { db, Blog, HeroConfig, ServiceItem, CaseStudy, Project } from "@/app/lib/db";
import { Layers, Settings, FileText, Globe, Check, Trash2, Edit3, Plus, RotateCcw, FolderKanban, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

export default function AdminPage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  // Tab 1: Hero Settings
  const [heroConfig, setHeroConfig] = useState<HeroConfig>({
    type: "3d",
    videoUrl: "",
    imageUrl: "",
  });

  // Tab 2: Blogs
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [editingBlog, setEditingBlog] = useState<Blog | null>(null);
  const [blogForm, setBlogForm] = useState({
    title: "",
    category: "",
    author: "",
    coverImage: "",
    summary: "",
    content: "",
  });
  const [isBlogFormOpen, setIsBlogFormOpen] = useState(false);

  // Tab 3: Services & Stats
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [editingService, setEditingService] = useState<ServiceItem | null>(null);
  const [editingCase, setEditingCase] = useState<CaseStudy | null>(null);
  const [cases, setCases] = useState<CaseStudy[]>([]);

  // Tab 4: Projects
  const [projects, setProjects] = useState<Project[]>([]);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [projectForm, setProjectForm] = useState({
    title: "",
    category: "",
    projectImage: "",
    projectUrl: "",
    description: "",
    detailedContent: "",
    tags: "",
  });
  const [isProjectFormOpen, setIsProjectFormOpen] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const initialize = async () => {
      try {
        const response = await fetch("/api/admin/me", { cache: "no-store" });
        if (!response.ok) {
          router.replace("/admin/login?next=/admin");
          return;
        }
        setIsAuthorized(true);
        setMounted(true);
        loadData();
      } catch (_) {
        router.replace("/admin/login?next=/admin");
      }
    };

    initialize();
  }, []);

  const loadData = () => {
    setHeroConfig(db.getHeroConfig());
    setBlogs(db.getBlogs());
    setServices(db.getServices());
    setCases(db.getCaseStudies());
    setProjects(db.getProjects());
  };

  // Hero save
  const handleSaveHero = (e: React.FormEvent) => {
    e.preventDefault();
    db.saveHeroConfig(heroConfig);
    toast.success("Hero section media configuration updated successfully!");
  };

  // Blog create/edit save
  const handleSaveBlog = (e: React.FormEvent) => {
    e.preventDefault();
    if (!blogForm.title || !blogForm.category || !blogForm.content) {
      toast.error("Please fill in all required fields (*).");
      return;
    }

    const payload = {
      ...blogForm,
      id: editingBlog?.id || undefined,
    };

    db.saveBlog(payload);
    toast.success(editingBlog ? "Blog article updated!" : "New blog article published!");
    setIsBlogFormOpen(false);
    setEditingBlog(null);
    setBlogForm({
      title: "",
      category: "",
      author: "RecallX Growth Team",
      coverImage: "",
      summary: "",
      content: "",
    });
    setBlogs(db.getBlogs());
  };

  const handleEditBlog = (blog: Blog) => {
    setEditingBlog(blog);
    setBlogForm({
      title: blog.title,
      category: blog.category,
      author: blog.author,
      coverImage: blog.coverImage,
      summary: blog.summary,
      content: blog.content,
    });
    setIsBlogFormOpen(true);
  };

  const handleDeleteBlog = (id: string) => {
    if (confirm("Are you sure you want to delete this blog?")) {
      db.deleteBlog(id);
      toast.success("Blog article deleted successfully.");
      setBlogs(db.getBlogs());
    }
  };

  // Services & case study saves
  const handleSaveService = (service: ServiceItem) => {
    db.saveService(service);
    toast.success(`Service "${service.title}" updated.`);
    setEditingService(null);
    setServices(db.getServices());
  };

  const handleSaveCase = (caseItem: CaseStudy) => {
    db.saveCaseStudy(caseItem);
    toast.success(`Case study for "${caseItem.client}" updated.`);
    setEditingCase(null);
    setCases(db.getCaseStudies());
  };

  // Project create/edit save
  const handleSaveProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!projectForm.title || !projectForm.description || !projectForm.detailedContent) {
      toast.error("Please fill in all required fields (*).");
      return;
    }

    const payload = {
      ...projectForm,
      id: editingProject?.id || undefined,
      tags: projectForm.tags.split(",").map((t) => t.trim()).filter(Boolean),
    };

    db.saveProject(payload);
    toast.success(editingProject ? "Project updated!" : "New project published!");
    setIsProjectFormOpen(false);
    setEditingProject(null);
    setProjectForm({
      title: "",
      category: "",
      projectImage: "",
      projectUrl: "",
      description: "",
      detailedContent: "",
      tags: "",
    });
    setProjects(db.getProjects());
  };

  const handleEditProject = (project: Project) => {
    setEditingProject(project);
    setProjectForm({
      title: project.title,
      category: project.category,
      projectImage: project.projectImage,
      projectUrl: project.projectUrl,
      description: project.description,
      detailedContent: project.detailedContent,
      tags: project.tags.join(", "),
    });
    setIsProjectFormOpen(true);
  };

  const handleDeleteProject = (id: string) => {
    if (confirm("Are you sure you want to delete this project?")) {
      db.deleteProject(id);
      toast.success("Project deleted successfully.");
      setProjects(db.getProjects());
    }
  };

  const handleResetDb = () => {
    if (confirm("This will delete all custom edits and reset the website data back to defaults. Proceed?")) {
      db.resetAll();
      toast.success("Website data database reset to initial parameters.");
      loadData();
    }
  };

  const handleLogout = async () => {
    try {
      await fetch("/api/admin/logout", { method: "POST" });
    } finally {
      router.push("/admin/login");
      router.refresh();
    }
  };

  if (!mounted || !isAuthorized) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Initializing Admin Console...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-10">
      <div className="container-main max-w-5xl">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-border/40 pb-6 mb-8">
          <div>
            <h1 className="text-3xl font-black text-foreground flex items-center gap-2">
              <Settings className="text-primary animate-spin-slow" /> RecallX Administration Console
            </h1>
            <p className="text-xs text-muted-foreground mt-1 font-semibold">
              Edit the media switcher, manage campaign blogs, customize services cards, manage projects, and calibrate statistics.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" className="font-bold text-xs rounded-full" onClick={() => router.push("/")}>
              Go to Live Site
            </Button>
            <Button variant="destructive" className="font-bold text-xs rounded-full gap-1.5" onClick={handleLogout}>
              <LogOut size={13} /> Logout
            </Button>
          </div>
        </div>

        {/* Console layout */}
        <Tabs defaultValue="hero" className="w-full">
          <TabsList className="grid grid-cols-2 sm:grid-cols-5 w-full sm:max-w-xl bg-secondary/80 border border-border/60 rounded-2xl sm:rounded-full p-1 mb-8 h-auto gap-1">
            <TabsTrigger value="hero" className="rounded-full text-xs font-bold py-1.5">Hero Media</TabsTrigger>
            <TabsTrigger value="blogs" className="rounded-full text-xs font-bold py-1.5">Blogs</TabsTrigger>
            <TabsTrigger value="projects" className="rounded-full text-xs font-bold py-1.5">Projects</TabsTrigger>
            <TabsTrigger value="services" className="rounded-full text-xs font-bold py-1.5">Services/Stats</TabsTrigger>
            <TabsTrigger value="settings" className="rounded-full text-xs font-bold py-1.5">Settings</TabsTrigger>
          </TabsList>

          {/* Hero Settings Tab */}
          <TabsContent value="hero">
            <Card className="bg-card/50 backdrop-blur border-border/80 rounded-2xl shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg font-extrabold">Hero Section Media Switcher</CardTitle>
                <CardDescription className="text-xs font-semibold">
                  Change what interactive showcase element is displayed next to the hero headline.
                </CardDescription>
              </CardHeader>
              <form onSubmit={handleSaveHero}>
                <CardContent className="space-y-6">
                  {/* Select type */}
                  <div className="space-y-2">
                    <Label className="text-xs font-bold text-foreground">Select Showcase Type</Label>
                    <div className="grid grid-cols-3 gap-3">
                      {[
                        { type: "3d", label: "Interactive 3D Scene", desc: " connected node grid" },
                        { type: "video", label: "Background Video", desc: "Custom URL clip player" },
                        { type: "image", label: "Mockup Image", desc: "Static dashboard preview" },
                      ].map((item) => (
                        <label
                          key={item.type}
                          className={`flex flex-col p-4 rounded-xl border cursor-pointer select-none transition-all ${
                            heroConfig.type === item.type
                              ? "border-primary bg-primary/5 text-primary shadow-sm shadow-primary/5"
                              : "border-border/80 bg-background/40 hover:bg-card text-muted-foreground hover:text-foreground"
                          }`}
                        >
                          <input
                            type="radio"
                            name="heroType"
                            value={item.type}
                            className="hidden"
                            checked={heroConfig.type === item.type}
                            onChange={() => setHeroConfig((prev) => ({ ...prev, type: item.type as any }))}
                          />
                          <span className="text-xs font-extrabold block">{item.label}</span>
                          <span className="text-[10px] opacity-75 mt-0.5 font-medium">{item.desc}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Image URL input */}
                  {heroConfig.type === "image" && (
                    <div className="space-y-1.5 animate-fade-in">
                      <Label htmlFor="imageUrl" className="text-xs font-bold">Showcase Image URL</Label>
                      <Input
                        id="imageUrl"
                        type="url"
                        placeholder="https://images.unsplash.com/..."
                        value={heroConfig.imageUrl}
                        onChange={(e) => setHeroConfig((prev) => ({ ...prev, imageUrl: e.target.value }))}
                        className="bg-background/50 border-border/60"
                      />
                      <p className="text-[10px] text-muted-foreground">Unsplash high resolution URLs are recommended.</p>
                    </div>
                  )}

                  {/* Video URL input */}
                  {heroConfig.type === "video" && (
                    <div className="space-y-1.5 animate-fade-in">
                      <Label htmlFor="videoUrl" className="text-xs font-bold">Showcase Video URL (.mp4)</Label>
                      <Input
                        id="videoUrl"
                        type="url"
                        placeholder="https://assets.mixkit.co/..."
                        value={heroConfig.videoUrl}
                        onChange={(e) => setHeroConfig((prev) => ({ ...prev, videoUrl: e.target.value }))}
                        className="bg-background/50 border-border/60"
                      />
                      <p className="text-[10px] text-muted-foreground">Direct link to an .mp4 file that autoplays silently.</p>
                    </div>
                  )}
                </CardContent>
                <CardFooter className="border-t border-border/20 pt-5">
                  <Button type="submit" className="font-bold rounded-full text-xs">
                    Save Media Configuration
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </TabsContent>

          {/* Blogs Tab */}
          <TabsContent value="blogs">
            {isBlogFormOpen ? (
              <Card className="bg-card/50 border-border/80 rounded-2xl shadow-lg animate-fade-in">
                <CardHeader className="flex flex-row justify-between items-center">
                  <div>
                    <CardTitle className="text-lg font-extrabold">
                      {editingBlog ? "Edit Blog Article" : "Create New Blog Article"}
                    </CardTitle>
                    <CardDescription className="text-xs font-semibold">Write and publish data insights.</CardDescription>
                  </div>
                  <Button
                    variant="ghost"
                    onClick={() => {
                      setIsBlogFormOpen(false);
                      setEditingBlog(null);
                    }}
                    className="text-xs font-bold hover:text-red-500"
                  >
                    Cancel
                  </Button>
                </CardHeader>
                <form onSubmit={handleSaveBlog}>
                  <CardContent className="space-y-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <Label htmlFor="blogTitle" className="text-xs font-bold">Article Title *</Label>
                        <Input
                          id="blogTitle"
                          placeholder="Meta Ads Optimization in 2026"
                          required
                          value={blogForm.title}
                          onChange={(e) => setBlogForm((prev) => ({ ...prev, title: e.target.value }))}
                          className="bg-background/50 border-border/60"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <Label htmlFor="blogCategory" className="text-xs font-bold">Category *</Label>
                        <Input
                          id="blogCategory"
                          placeholder="Paid Ads / Tech / CRO"
                          required
                          value={blogForm.category}
                          onChange={(e) => setBlogForm((prev) => ({ ...prev, category: e.target.value }))}
                          className="bg-background/50 border-border/60"
                        />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <Label htmlFor="blogAuthor" className="text-xs font-bold">Author Name</Label>
                        <Input
                          id="blogAuthor"
                          placeholder="RecallX Growth Team"
                          value={blogForm.author}
                          onChange={(e) => setBlogForm((prev) => ({ ...prev, author: e.target.value }))}
                          className="bg-background/50 border-border/60"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <Label htmlFor="blogCover" className="text-xs font-bold">Cover Image URL</Label>
                        <Input
                          id="blogCover"
                          placeholder="https://images.unsplash.com/..."
                          value={blogForm.coverImage}
                          onChange={(e) => setBlogForm((prev) => ({ ...prev, coverImage: e.target.value }))}
                          className="bg-background/50 border-border/60"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <Label htmlFor="blogSummary" className="text-xs font-bold">Short Summary *</Label>
                      <Input
                        id="blogSummary"
                        placeholder="A quick summary card detailing the ROAS metrics..."
                        required
                        value={blogForm.summary}
                        onChange={(e) => setBlogForm((prev) => ({ ...prev, summary: e.target.value }))}
                        className="bg-background/50 border-border/60"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <Label htmlFor="blogContent" className="text-xs font-bold">Article Content *</Label>
                      <Textarea
                        id="blogContent"
                        placeholder="Write blog paragraphs here. Use ### Subheadings for sections."
                        rows={10}
                        required
                        value={blogForm.content}
                        onChange={(e) => setBlogForm((prev) => ({ ...prev, content: e.target.value }))}
                        className="bg-background/50 border-border/60 font-mono text-xs"
                      />
                    </div>
                  </CardContent>
                  <CardFooter className="border-t border-border/20 pt-5">
                    <Button type="submit" className="font-bold text-xs rounded-full">
                      {editingBlog ? "Update Article" : "Publish Article"}
                    </Button>
                  </CardFooter>
                </form>
              </Card>
            ) : (
              <div className="space-y-4 animate-fade-in">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-extrabold text-foreground">Blog Articles</h3>
                  <Button
                    size="sm"
                    className="font-bold text-xs rounded-full gap-1"
                    onClick={() => {
                      setEditingBlog(null);
                      setBlogForm({
                        title: "",
                        category: "",
                        author: "RecallX Growth Team",
                        coverImage: "",
                        summary: "",
                        content: "",
                      });
                      setIsBlogFormOpen(true);
                    }}
                  >
                    <Plus size={14} /> Add New Article
                  </Button>
                </div>

                <div className="grid gap-3">
                  {blogs.map((b) => (
                    <div
                      key={b.id}
                      className="bg-card/40 border border-border p-4 rounded-xl flex items-center justify-between gap-4"
                    >
                      <div className="min-w-0">
                        <span className="text-[9px] font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full uppercase">
                          {b.category}
                        </span>
                        <h4 className="font-heading font-extrabold text-sm text-foreground mt-1 truncate max-w-md sm:max-w-lg">
                          {b.title}
                        </h4>
                        <p className="text-[10px] text-muted-foreground font-semibold mt-0.5">
                          By {b.author} • Published on {new Date(b.createdAt).toLocaleDateString()}
                        </p>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => handleEditBlog(b)}
                          className="h-8 w-8 hover:text-primary"
                        >
                          <Edit3 size={15} />
                        </Button>
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => handleDeleteBlog(b.id)}
                          className="h-8 w-8 hover:text-red-500"
                        >
                          <Trash2 size={15} />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </TabsContent>

          {/* ===== PROJECTS TAB ===== */}
          <TabsContent value="projects">
            {isProjectFormOpen ? (
              <Card className="bg-card/50 border-border/80 rounded-2xl shadow-lg animate-fade-in">
                <CardHeader className="flex flex-row justify-between items-center">
                  <div>
                    <CardTitle className="text-lg font-extrabold">
                      {editingProject ? "Edit Project" : "Add New Project"}
                    </CardTitle>
                    <CardDescription className="text-xs font-semibold">
                      Showcase your completed work with detailed case studies.
                    </CardDescription>
                  </div>
                  <Button
                    variant="ghost"
                    onClick={() => {
                      setIsProjectFormOpen(false);
                      setEditingProject(null);
                    }}
                    className="text-xs font-bold hover:text-red-500"
                  >
                    Cancel
                  </Button>
                </CardHeader>
                <form onSubmit={handleSaveProject}>
                  <CardContent className="space-y-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <Label htmlFor="projTitle" className="text-xs font-bold">Project Title *</Label>
                        <Input
                          id="projTitle"
                          placeholder="ShopEase — E-Commerce Platform"
                          required
                          value={projectForm.title}
                          onChange={(e) => setProjectForm((prev) => ({ ...prev, title: e.target.value }))}
                          className="bg-background/50 border-border/60"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <Label htmlFor="projCategory" className="text-xs font-bold">Category *</Label>
                        <Input
                          id="projCategory"
                          placeholder="E-Commerce / SaaS / Mobile App"
                          required
                          value={projectForm.category}
                          onChange={(e) => setProjectForm((prev) => ({ ...prev, category: e.target.value }))}
                          className="bg-background/50 border-border/60"
                        />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <Label htmlFor="projImage" className="text-xs font-bold">Project Image URL *</Label>
                        <Input
                          id="projImage"
                          placeholder="https://images.unsplash.com/..."
                          required
                          value={projectForm.projectImage}
                          onChange={(e) => setProjectForm((prev) => ({ ...prev, projectImage: e.target.value }))}
                          className="bg-background/50 border-border/60"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <Label htmlFor="projUrl" className="text-xs font-bold">App / Website URL</Label>
                        <Input
                          id="projUrl"
                          placeholder="https://your-project.com"
                          value={projectForm.projectUrl}
                          onChange={(e) => setProjectForm((prev) => ({ ...prev, projectUrl: e.target.value }))}
                          className="bg-background/50 border-border/60"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <Label htmlFor="projTags" className="text-xs font-bold">Tags (comma-separated)</Label>
                      <Input
                        id="projTags"
                        placeholder="Next.js, React, PostgreSQL, Meta Ads"
                        value={projectForm.tags}
                        onChange={(e) => setProjectForm((prev) => ({ ...prev, tags: e.target.value }))}
                        className="bg-background/50 border-border/60"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <Label htmlFor="projDesc" className="text-xs font-bold">Short Description * (1-2 lines)</Label>
                      <Input
                        id="projDesc"
                        placeholder="A high-converting e-commerce platform with AI recommendations..."
                        required
                        value={projectForm.description}
                        onChange={(e) => setProjectForm((prev) => ({ ...prev, description: e.target.value }))}
                        className="bg-background/50 border-border/60"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <Label htmlFor="projContent" className="text-xs font-bold">Detailed Content * (500-600 words)</Label>
                      <Textarea
                        id="projContent"
                        placeholder="## Project Overview\n\nDescribe the project in detail. Use ## for section headings, - for bullet points, and **bold** for emphasis."
                        rows={14}
                        required
                        value={projectForm.detailedContent}
                        onChange={(e) => setProjectForm((prev) => ({ ...prev, detailedContent: e.target.value }))}
                        className="bg-background/50 border-border/60 font-mono text-xs"
                      />
                      <p className="text-[10px] text-muted-foreground">
                        Use markdown: ## Headings, - bullet points, **bold**, 1. numbered lists
                      </p>
                    </div>
                  </CardContent>
                  <CardFooter className="border-t border-border/20 pt-5">
                    <Button type="submit" className="font-bold text-xs rounded-full">
                      {editingProject ? "Update Project" : "Publish Project"}
                    </Button>
                  </CardFooter>
                </form>
              </Card>
            ) : (
              <div className="space-y-4 animate-fade-in">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-extrabold text-foreground">Portfolio Projects</h3>
                  <Button
                    size="sm"
                    className="font-bold text-xs rounded-full gap-1"
                    onClick={() => {
                      setEditingProject(null);
                      setProjectForm({
                        title: "",
                        category: "",
                        projectImage: "",
                        projectUrl: "",
                        description: "",
                        detailedContent: "",
                        tags: "",
                      });
                      setIsProjectFormOpen(true);
                    }}
                  >
                    <Plus size={14} /> Add New Project
                  </Button>
                </div>

                <div className="grid gap-3">
                  {projects.map((p) => (
                    <div
                      key={p.id}
                      className="bg-card/40 border border-border p-4 rounded-xl flex items-center justify-between gap-4"
                    >
                      <div className="flex items-center gap-4 min-w-0">
                        {p.projectImage && (
                          <img
                            src={p.projectImage}
                            alt={p.title}
                            className="w-16 h-12 object-cover rounded-lg border border-border/40 flex-shrink-0"
                          />
                        )}
                        <div className="min-w-0">
                          <span className="text-[9px] font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full uppercase">
                            {p.category}
                          </span>
                          <h4 className="font-heading font-extrabold text-sm text-foreground mt-1 truncate max-w-md sm:max-w-lg">
                            {p.title}
                          </h4>
                          <p className="text-[10px] text-muted-foreground font-semibold mt-0.5 truncate max-w-sm">
                            {p.description}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => handleEditProject(p)}
                          className="h-8 w-8 hover:text-primary"
                        >
                          <Edit3 size={15} />
                        </Button>
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => handleDeleteProject(p.id)}
                          className="h-8 w-8 hover:text-red-500"
                        >
                          <Trash2 size={15} />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </TabsContent>

          {/* Services & Stats Tab */}
          <TabsContent value="services">
            <div className="space-y-8 animate-fade-in">
              {/* Edit Services */}
              <div className="space-y-4">
                <h3 className="text-lg font-extrabold text-foreground">Services Card Editor</h3>
                {editingService ? (
                  <Card className="bg-card/50 border border-border/80 p-5 rounded-2xl animate-fade-in">
                    <h4 className="font-heading font-extrabold text-sm mb-3">Edit Service: {editingService.title}</h4>
                    <div className="space-y-3">
                      <div className="space-y-1">
                        <Label className="text-xs font-semibold">Title</Label>
                        <Input
                          value={editingService.title}
                          onChange={(e) => setEditingService({ ...editingService, title: e.target.value })}
                          className="bg-background/50 border-border/60"
                        />
                      </div>
                      <div className="space-y-1">
                        <Label className="text-xs font-semibold">Tagline</Label>
                        <Input
                          value={editingService.tagline}
                          onChange={(e) => setEditingService({ ...editingService, tagline: e.target.value })}
                          className="bg-background/50 border-border/60"
                        />
                      </div>
                      <div className="space-y-1">
                        <Label className="text-xs font-semibold">Description</Label>
                        <Textarea
                          value={editingService.desc}
                          onChange={(e) => setEditingService({ ...editingService, desc: e.target.value })}
                          rows={3}
                          className="bg-background/50 border-border/60 text-xs"
                        />
                      </div>
                      <div className="space-y-1">
                        <Label className="text-xs font-semibold">Metrics Output Label</Label>
                        <Input
                          value={editingService.results}
                          onChange={(e) => setEditingService({ ...editingService, results: e.target.value })}
                          className="bg-background/50 border-border/60"
                        />
                      </div>
                    </div>
                    <div className="flex gap-2 mt-4 pt-4 border-t border-border/20">
                      <Button size="sm" onClick={() => handleSaveService(editingService)} className="font-bold text-xs rounded-full">
                        Save Service
                      </Button>
                      <Button size="sm" variant="ghost" onClick={() => setEditingService(null)} className="font-bold text-xs rounded-full">
                        Cancel
                      </Button>
                    </div>
                  </Card>
                ) : (
                  <div className="grid sm:grid-cols-2 gap-3">
                    {services.map((s) => (
                      <div key={s.id} className="bg-card/40 border border-border p-4 rounded-xl flex items-center justify-between">
                        <div>
                          <span className="text-[9px] font-bold text-muted-foreground block uppercase">{s.tagline}</span>
                          <h4 className="font-heading font-extrabold text-sm text-foreground mt-0.5">{s.title}</h4>
                        </div>
                        <Button size="sm" variant="outline" className="font-bold text-xs rounded-full" onClick={() => setEditingService(s)}>
                          Edit Card
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Edit Case Study metrics */}
              <div className="space-y-4 border-t border-border/40 pt-6">
                <h3 className="text-lg font-extrabold text-foreground">Case Studies Metrics Editor</h3>
                {editingCase ? (
                  <Card className="bg-card/50 border border-border/80 p-5 rounded-2xl animate-fade-in">
                    <h4 className="font-heading font-extrabold text-sm mb-3">Edit Case Study: {editingCase.client}</h4>
                    <div className="space-y-3">
                      <div className="space-y-1">
                        <Label className="text-xs font-semibold">Client Name</Label>
                        <Input
                          value={editingCase.client}
                          onChange={(e) => setEditingCase({ ...editingCase, client: e.target.value })}
                          className="bg-background/50 border-border/60"
                        />
                      </div>
                      <div className="space-y-1">
                        <Label className="text-xs font-semibold">Challenge</Label>
                        <Textarea
                          value={editingCase.challenge}
                          onChange={(e) => setEditingCase({ ...editingCase, challenge: e.target.value })}
                          rows={2}
                          className="bg-background/50 border-border/60 text-xs"
                        />
                      </div>
                      <div className="space-y-1">
                        <Label className="text-xs font-semibold">Our Solution</Label>
                        <Textarea
                          value={editingCase.solution}
                          onChange={(e) => setEditingCase({ ...editingCase, solution: e.target.value })}
                          rows={2}
                          className="bg-background/50 border-border/60 text-xs"
                        />
                      </div>
                      {/* Metric editor (ROAS, Spend, Conversions) */}
                      <div className="space-y-2 pt-2">
                        <Label className="text-xs font-bold block">Results Metrics</Label>
                        <div className="grid gap-2">
                          {editingCase.results.map((r, rIdx) => (
                            <div key={rIdx} className="grid grid-cols-3 gap-2">
                              <Input
                                placeholder="Metric Label"
                                value={r.metric}
                                onChange={(e) => {
                                  const updated = [...editingCase.results];
                                  updated[rIdx].metric = e.target.value;
                                  setEditingCase({ ...editingCase, results: updated });
                                }}
                                className="bg-background/50 border-border/60 text-xs h-8"
                              />
                              <Input
                                placeholder="Before Value"
                                value={r.before}
                                onChange={(e) => {
                                  const updated = [...editingCase.results];
                                  updated[rIdx].before = e.target.value;
                                  setEditingCase({ ...editingCase, results: updated });
                                }}
                                className="bg-background/50 border-border/60 text-xs h-8"
                              />
                              <Input
                                placeholder="After Value"
                                value={r.after}
                                onChange={(e) => {
                                  const updated = [...editingCase.results];
                                  updated[rIdx].after = e.target.value;
                                  setEditingCase({ ...editingCase, results: updated });
                                }}
                                className="bg-background/50 border-border/60 text-xs h-8"
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2 mt-4 pt-4 border-t border-border/20">
                      <Button size="sm" onClick={() => handleSaveCase(editingCase)} className="font-bold text-xs rounded-full">
                        Save Case Study
                      </Button>
                      <Button size="sm" variant="ghost" onClick={() => setEditingCase(null)} className="font-bold text-xs rounded-full">
                        Cancel
                      </Button>
                    </div>
                  </Card>
                ) : (
                  <div className="grid gap-3">
                    {cases.map((c) => (
                      <div key={c.id} className="bg-card/40 border border-border p-4 rounded-xl flex items-center justify-between">
                        <div>
                          <span className="text-[9px] font-bold text-muted-foreground uppercase">{c.category}</span>
                          <h4 className="font-heading font-extrabold text-sm text-foreground">{c.client}</h4>
                        </div>
                        <Button size="sm" variant="outline" className="font-bold text-xs rounded-full" onClick={() => setEditingCase(c)}>
                          Edit Metrics
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </TabsContent>

          {/* General settings Tab */}
          <TabsContent value="settings">
            <Card className="bg-card/50 backdrop-blur border-border/80 rounded-2xl shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg font-extrabold">Data Utilities</CardTitle>
                <CardDescription className="text-xs font-semibold">
                  Restore default seeded data settings or flush caches.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-red-500/10 border border-red-500/20 p-4 rounded-xl text-red-500">
                  <p className="text-xs font-bold">Warning: Database Reset</p>
                  <p className="text-[11px] opacity-80 leading-relaxed mt-1">
                    This utility deletes all localStorage entries created for RecallX, seeding the default three mock blogs, services, projects, and three-dimensional hero attributes. This will delete any modifications you have made to custom items.
                  </p>
                </div>
              </CardContent>
              <CardFooter className="border-t border-border/20 pt-5">
                <Button variant="destructive" className="font-bold rounded-full text-xs gap-1.5" onClick={handleResetDb}>
                  <RotateCcw size={14} /> Reset Database to Seed Parameters
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
