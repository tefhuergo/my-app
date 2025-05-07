"use client"

import { useState } from "react"
import { PlusCircle, Trash2, Save } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

type Note = {
  id: string
  title: string
  content: string
  category: string
  lastEdited: Date
}

// Datos de ejemplo
const initialNotes: Note[] = [
  {
    id: "1",
    title: "La Taberna del Dragón Borracho",
    content:
      "Ubicada en el centro de Villaocaso, esta taberna es regentada por Gorm, un enano barbudo. Tiene habitaciones en el piso superior y un sótano con un ring de lucha clandestino.",
    category: "locations",
    lastEdited: new Date(2023, 5, 15),
  },
  {
    id: "2",
    title: "Barón Vargo",
    content:
      "Gobernante de Villaocaso. Sospechoso de tener tratos con el culto de la Serpiente Negra. Tiene una cicatriz en la mejilla izquierda y siempre lleva un anillo con un rubí.",
    category: "npcs",
    lastEdited: new Date(2023, 5, 16),
  },
  {
    id: "3",
    title: "La Espada de Azuroth",
    content:
      "Reliquia legendaria que se dice puede sellar portales demoníacos. Última vez vista en las ruinas del templo de la montaña.",
    category: "items",
    lastEdited: new Date(2023, 5, 17),
  },
  {
    id: "4",
    title: "Próxima sesión",
    content:
      "Los jugadores llegarán a Villaocaso. Encuentro con el Barón Vargo. Posible emboscada en el camino al templo.",
    category: "quests",
    lastEdited: new Date(2023, 5, 18),
  },
]

export default function CampaignNotes() {
  const [notes, setNotes] = useState<Note[]>(initialNotes)
  const [activeNote, setActiveNote] = useState<Note | null>(null)
  const [newNote, setNewNote] = useState<Partial<Note>>({
    title: "",
    content: "",
    category: "quests",
  })
  const [filter, setFilter] = useState<string>("all")
  const [searchTerm, setSearchTerm] = useState<string>("")

  const handleCreateNote = () => {
    if (newNote.title && newNote.content) {
      const note: Note = {
        id: Date.now().toString(),
        title: newNote.title,
        content: newNote.content,
        category: newNote.category || "quests",
        lastEdited: new Date(),
      }
      setNotes([...notes, note])
      setNewNote({
        title: "",
        content: "",
        category: "quests",
      })
    }
  }

  const handleUpdateNote = () => {
    if (activeNote) {
      setNotes(notes.map((note) => (note.id === activeNote.id ? { ...activeNote, lastEdited: new Date() } : note)))
      setActiveNote(null)
    }
  }

  const handleDeleteNote = (id: string) => {
    setNotes(notes.filter((note) => note.id !== id))
    if (activeNote && activeNote.id === id) {
      setActiveNote(null)
    }
  }

  const filteredNotes = notes.filter((note) => {
    const matchesFilter = filter === "all" || note.category === filter
    const matchesSearch =
      searchTerm === "" ||
      note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.content.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesFilter && matchesSearch
  })

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card className="bg-[#181825] border-slate-700 md:col-span-1">
        <CardHeader className="pb-3">
          <div className="flex justify-between items-center">
            <CardTitle>Notas</CardTitle>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-slate-400 hover:text-red-400"
              onClick={() => setActiveNote(null)}
            >
              <PlusCircle className="h-4 w-4" />
            </Button>
          </div>
          <div className="mt-2">
            <Input
              placeholder="Buscar notas..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-[#1e1e2e] border-slate-700"
            />
          </div>
          <div className="mt-2">
            <Tabs defaultValue="all" value={filter} onValueChange={setFilter}>
              <TabsList className="grid grid-cols-5">
                <TabsTrigger value="all" className="text-xs">
                  Todas
                </TabsTrigger>
                <TabsTrigger value="quests" className="text-xs">
                  Misiones
                </TabsTrigger>
                <TabsTrigger value="npcs" className="text-xs">
                  NPCs
                </TabsTrigger>
                <TabsTrigger value="locations" className="text-xs">
                  Lugares
                </TabsTrigger>
                <TabsTrigger value="items" className="text-xs">
                  Objetos
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[400px] pr-4">
            {filteredNotes.length === 0 ? (
              <div className="text-center py-8 text-slate-500">
                <p>No hay notas que coincidan</p>
              </div>
            ) : (
              <div className="space-y-2">
                {filteredNotes.map((note) => (
                  <div
                    key={note.id}
                    className={`p-3 rounded-md cursor-pointer hover:bg-slate-800 ${
                      activeNote?.id === note.id ? "bg-slate-800 border border-slate-600" : "bg-[#11111b]"
                    }`}
                    onClick={() => setActiveNote(note)}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium truncate">{note.title}</h3>
                        <p className="text-xs text-slate-400 truncate">{note.content.substring(0, 60)}...</p>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 text-slate-400 hover:text-red-400"
                        onClick={(e) => {
                          e.stopPropagation()
                          handleDeleteNote(note.id)
                        }}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                    <div className="flex justify-between items-center mt-2">
                      <span
                        className={`text-xs px-2 py-0.5 rounded-full ${
                          note.category === "quests"
                            ? "bg-blue-900/30 text-blue-400"
                            : note.category === "npcs"
                              ? "bg-green-900/30 text-green-400"
                              : note.category === "locations"
                                ? "bg-purple-900/30 text-purple-400"
                                : "bg-amber-900/30 text-amber-400"
                        }`}
                      >
                        {note.category === "quests"
                          ? "Misión"
                          : note.category === "npcs"
                            ? "NPC"
                            : note.category === "locations"
                              ? "Lugar"
                              : "Objeto"}
                      </span>
                      <span className="text-xs text-slate-500">{note.lastEdited.toLocaleDateString()}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </ScrollArea>
        </CardContent>
      </Card>

      <Card className="bg-[#181825] border-slate-700 md:col-span-2">
        <CardHeader className="pb-3">
          <div className="flex justify-between items-center">
            <CardTitle>{activeNote ? "Editar Nota" : "Nueva Nota"}</CardTitle>
            {activeNote && (
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="h-8 text-xs border-green-900/50 text-green-400 hover:bg-green-900/20"
                  onClick={handleUpdateNote}
                >
                  <Save className="h-3 w-3 mr-1" />
                  Guardar
                </Button>
              </div>
            )}
          </div>
        </CardHeader>
        <CardContent>
          {activeNote ? (
            <div className="space-y-4">
              <div className="space-y-2">
                <Input
                  placeholder="Título de la nota"
                  value={activeNote.title}
                  onChange={(e) => setActiveNote({ ...activeNote, title: e.target.value })}
                  className="bg-[#1e1e2e] border-slate-700 text-lg font-bold"
                />
                <div className="flex gap-2">
                  <Button
                    variant={activeNote.category === "quests" ? "default" : "outline"}
                    size="sm"
                    className={`text-xs ${activeNote.category === "quests" ? "bg-blue-900 hover:bg-blue-800" : "border-blue-900/50 text-blue-400 hover:bg-blue-900/20"}`}
                    onClick={() => setActiveNote({ ...activeNote, category: "quests" })}
                  >
                    Misión
                  </Button>
                  <Button
                    variant={activeNote.category === "npcs" ? "default" : "outline"}
                    size="sm"
                    className={`text-xs ${activeNote.category === "npcs" ? "bg-green-900 hover:bg-green-800" : "border-green-900/50 text-green-400 hover:bg-green-900/20"}`}
                    onClick={() => setActiveNote({ ...activeNote, category: "npcs" })}
                  >
                    NPC
                  </Button>
                  <Button
                    variant={activeNote.category === "locations" ? "default" : "outline"}
                    size="sm"
                    className={`text-xs ${activeNote.category === "locations" ? "bg-purple-900 hover:bg-purple-800" : "border-purple-900/50 text-purple-400 hover:bg-purple-900/20"}`}
                    onClick={() => setActiveNote({ ...activeNote, category: "locations" })}
                  >
                    Lugar
                  </Button>
                  <Button
                    variant={activeNote.category === "items" ? "default" : "outline"}
                    size="sm"
                    className={`text-xs ${activeNote.category === "items" ? "bg-amber-900 hover:bg-amber-800" : "border-amber-900/50 text-amber-400 hover:bg-amber-900/20"}`}
                    onClick={() => setActiveNote({ ...activeNote, category: "items" })}
                  >
                    Objeto
                  </Button>
                </div>
              </div>
              <Textarea
                placeholder="Contenido de la nota..."
                value={activeNote.content}
                onChange={(e) => setActiveNote({ ...activeNote, content: e.target.value })}
                className="bg-[#1e1e2e] border-slate-700 min-h-[300px]"
              />
            </div>
          ) : (
            <div className="space-y-4">
              <div className="space-y-2">
                <Input
                  placeholder="Título de la nota"
                  value={newNote.title}
                  onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
                  className="bg-[#1e1e2e] border-slate-700 text-lg font-bold"
                />
                <div className="flex gap-2">
                  <Button
                    variant={newNote.category === "quests" ? "default" : "outline"}
                    size="sm"
                    className={`text-xs ${newNote.category === "quests" ? "bg-blue-900 hover:bg-blue-800" : "border-blue-900/50 text-blue-400 hover:bg-blue-900/20"}`}
                    onClick={() => setNewNote({ ...newNote, category: "quests" })}
                  >
                    Misión
                  </Button>
                  <Button
                    variant={newNote.category === "npcs" ? "default" : "outline"}
                    size="sm"
                    className={`text-xs ${newNote.category === "npcs" ? "bg-green-900 hover:bg-green-800" : "border-green-900/50 text-green-400 hover:bg-green-900/20"}`}
                    onClick={() => setNewNote({ ...newNote, category: "npcs" })}
                  >
                    NPC
                  </Button>
                  <Button
                    variant={newNote.category === "locations" ? "default" : "outline"}
                    size="sm"
                    className={`text-xs ${newNote.category === "locations" ? "bg-purple-900 hover:bg-purple-800" : "border-purple-900/50 text-purple-400 hover:bg-purple-900/20"}`}
                    onClick={() => setNewNote({ ...newNote, category: "locations" })}
                  >
                    Lugar
                  </Button>
                  <Button
                    variant={newNote.category === "items" ? "default" : "outline"}
                    size="sm"
                    className={`text-xs ${newNote.category === "items" ? "bg-amber-900 hover:bg-amber-800" : "border-amber-900/50 text-amber-400 hover:bg-amber-900/20"}`}
                    onClick={() => setNewNote({ ...newNote, category: "items" })}
                  >
                    Objeto
                  </Button>
                </div>
              </div>
              <Textarea
                placeholder="Contenido de la nota..."
                value={newNote.content}
                onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
                className="bg-[#1e1e2e] border-slate-700 min-h-[300px]"
              />
              <Button
                className="w-full bg-red-900 hover:bg-red-800"
                onClick={handleCreateNote}
                disabled={!newNote.title || !newNote.content}
              >
                Crear Nota
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
