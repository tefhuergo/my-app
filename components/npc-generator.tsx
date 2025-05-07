"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import { Dice1, Dice5, Save, Copy, Trash2, RefreshCw } from "lucide-react"

type NPC = {
  id: string
  name: string
  race: string
  gender: string
  occupation: string
  personality: string
  appearance: string
  hook: string
  notes: string
}

// Datos para generación aleatoria
const races = ["Humano", "Elfo", "Enano", "Mediano", "Gnomo", "Medio Orco", "Tiefling", "Dracónido"]
const genders = ["Masculino", "Femenino", "No binario"]
const occupations = [
  "Tabernero",
  "Herrero",
  "Mercader",
  "Guardia",
  "Granjero",
  "Noble",
  "Clérigo",
  "Mago",
  "Ladrón",
  "Cazarrecompensas",
  "Artesano",
  "Marinero",
  "Soldado",
  "Mendigo",
]
const personalityTraits = [
  "Amigable",
  "Desconfiado",
  "Codicioso",
  "Generoso",
  "Valiente",
  "Cobarde",
  "Astuto",
  "Ingenuo",
  "Orgulloso",
  "Humilde",
  "Impulsivo",
  "Calculador",
]
const appearanceTraits = [
  "Cicatriz facial",
  "Tatuajes",
  "Ropa elegante",
  "Ropa andrajosa",
  "Joyas llamativas",
  "Cabello inusual",
  "Muy alto",
  "Muy bajo",
  "Robusto",
  "Delgado",
  "Mirada penetrante",
  "Sonrisa constante",
]
const hooks = [
  "Busca venganza",
  "Esconde un secreto",
  "Posee información valiosa",
  "Necesita ayuda desesperadamente",
  "Tiene conexiones con la nobleza",
  "Es un espía",
  "Está maldito",
  "Busca un objeto perdido",
  "Tiene una deuda con alguien peligroso",
  "Es más de lo que aparenta",
]

// Datos de ejemplo
const initialNPCs: NPC[] = [
  {
    id: "1",
    name: "Gorm Martillofuerte",
    race: "Enano",
    gender: "Masculino",
    occupation: "Tabernero",
    personality: "Amigable pero desconfiado con los extraños",
    appearance: "Barba trenzada con adornos de metal, cicatriz en la mejilla",
    hook: "Conoce la ubicación de una antigua mina enana abandonada",
    notes: "Sirve la mejor cerveza de la región. Tiene tres hijos que le ayudan en la taberna.",
  },
  {
    id: "2",
    name: "Lyra Sombraoscura",
    race: "Tiefling",
    gender: "Femenino",
    occupation: "Mercader",
    personality: "Astuta y calculadora, siempre buscando un buen trato",
    appearance: "Cuernos decorados con joyas, viste ropas exóticas de colores vivos",
    hook: "Comercia con objetos mágicos de dudosa procedencia",
    notes: "Tiene contactos en el bajo mundo. Viaja con una caravana que visita la ciudad cada mes.",
  },
]

// Función para generar un NPC aleatorio
const generateRandomNPC = (): Partial<NPC> => {
  return {
    name: "",
    race: races[Math.floor(Math.random() * races.length)],
    gender: genders[Math.floor(Math.random() * genders.length)],
    occupation: occupations[Math.floor(Math.random() * occupations.length)],
    personality: personalityTraits[Math.floor(Math.random() * personalityTraits.length)],
    appearance: appearanceTraits[Math.floor(Math.random() * appearanceTraits.length)],
    hook: hooks[Math.floor(Math.random() * hooks.length)],
    notes: "",
  }
}

export default function NPCGenerator() {
  const [npcs, setNPCs] = useState<NPC[]>(initialNPCs)
  const [newNPC, setNewNPC] = useState<Partial<NPC>>(generateRandomNPC())
  const [activeNPC, setActiveNPC] = useState<NPC | null>(null)
  const [randomness, setRandomness] = useState<number>(50)
  const [searchTerm, setSearchTerm] = useState<string>("")

  const handleCreateNPC = () => {
    if (newNPC.name) {
      const npc: NPC = {
        id: Date.now().toString(),
        name: newNPC.name || "",
        race: newNPC.race || "Humano",
        gender: newNPC.gender || "Masculino",
        occupation: newNPC.occupation || "Mercader",
        personality: newNPC.personality || "",
        appearance: newNPC.appearance || "",
        hook: newNPC.hook || "",
        notes: newNPC.notes || "",
      }
      setNPCs([...npcs, npc])
      setNewNPC(generateRandomNPC())
    }
  }

  const handleUpdateNPC = () => {
    if (activeNPC) {
      setNPCs(npcs.map((npc) => (npc.id === activeNPC.id ? activeNPC : npc)))
      setActiveNPC(null)
    }
  }

  const handleDeleteNPC = (id: string) => {
    setNPCs(npcs.filter((npc) => npc.id !== id))
    if (activeNPC && activeNPC.id === id) {
      setActiveNPC(null)
    }
  }

  const handleDuplicateNPC = (npc: NPC) => {
    const newNpc: NPC = {
      ...npc,
      id: Date.now().toString(),
      name: `${npc.name} (Copia)`,
    }
    setNPCs([...npcs, newNpc])
  }

  const regenerateRandomFields = () => {
    // Determinar qué campos regenerar basado en el nivel de aleatoriedad
    const shouldRegenerate = () => Math.random() * 100 < randomness

    setNewNPC({
      ...newNPC,
      race: shouldRegenerate() ? races[Math.floor(Math.random() * races.length)] : newNPC.race,
      gender: shouldRegenerate() ? genders[Math.floor(Math.random() * genders.length)] : newNPC.gender,
      occupation: shouldRegenerate() ? occupations[Math.floor(Math.random() * occupations.length)] : newNPC.occupation,
      personality: shouldRegenerate()
        ? personalityTraits[Math.floor(Math.random() * personalityTraits.length)]
        : newNPC.personality,
      appearance: shouldRegenerate()
        ? appearanceTraits[Math.floor(Math.random() * appearanceTraits.length)]
        : newNPC.appearance,
      hook: shouldRegenerate() ? hooks[Math.floor(Math.random() * hooks.length)] : newNPC.hook,
    })
  }

  const filteredNPCs = npcs.filter((npc) => {
    return (
      searchTerm === "" ||
      npc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      npc.occupation.toLowerCase().includes(searchTerm.toLowerCase()) ||
      npc.race.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card className="bg-[#181825] border-slate-700 md:col-span-1">
        <CardHeader className="pb-3">
          <div className="flex justify-between items-center">
            <CardTitle>NPCs</CardTitle>
          </div>
          <div className="mt-2">
            <Input
              placeholder="Buscar NPCs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-[#1e1e2e] border-slate-700"
            />
          </div>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[400px] pr-4">
            {filteredNPCs.length === 0 ? (
              <div className="text-center py-8 text-slate-500">
                <p>No hay NPCs que coincidan</p>
              </div>
            ) : (
              <div className="space-y-2">
                {filteredNPCs.map((npc) => (
                  <div
                    key={npc.id}
                    className={`p-3 rounded-md cursor-pointer hover:bg-slate-800 ${
                      activeNPC?.id === npc.id ? "bg-slate-800 border border-slate-600" : "bg-[#11111b]"
                    }`}
                    onClick={() => setActiveNPC(npc)}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">{npc.name}</h3>
                        <p className="text-xs text-slate-400">
                          {npc.race} {npc.occupation}
                        </p>
                      </div>
                      <div className="flex space-x-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6 text-slate-400 hover:text-green-400"
                          onClick={(e) => {
                            e.stopPropagation()
                            handleDuplicateNPC(npc)
                          }}
                        >
                          <Copy className="h-3 w-3" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6 text-slate-400 hover:text-red-400"
                          onClick={(e) => {
                            e.stopPropagation()
                            handleDeleteNPC(npc.id)
                          }}
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                    <div className="mt-2 text-xs text-slate-400 line-clamp-2">{npc.hook}</div>
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
            <CardTitle>{activeNPC ? "Editar NPC" : "Generar NPC"}</CardTitle>
            {activeNPC ? (
              <Button
                variant="outline"
                size="sm"
                className="h-8 text-xs border-green-900/50 text-green-400 hover:bg-green-900/20"
                onClick={handleUpdateNPC}
              >
                <Save className="h-3 w-3 mr-1" />
                Guardar
              </Button>
            ) : (
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-2">
                  <Dice1 className="h-4 w-4 text-slate-400" />
                  <Slider
                    value={[randomness]}
                    min={0}
                    max={100}
                    step={10}
                    className="w-24"
                    onValueChange={(value) => setRandomness(value[0])}
                  />
                  <Dice5 className="h-4 w-4 text-slate-400" />
                </div>
                <Button variant="outline" size="sm" className="h-8 text-xs" onClick={regenerateRandomFields}>
                  <RefreshCw className="h-3 w-3 mr-1" />
                  Regenerar
                </Button>
              </div>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="basic">
            <TabsList className="grid grid-cols-2 mb-6">
              <TabsTrigger value="basic">Información Básica</TabsTrigger>
              <TabsTrigger value="details">Detalles</TabsTrigger>
            </TabsList>

            {activeNPC ? (
              <>
                <TabsContent value="basic" className="mt-0 space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="edit-name">Nombre</Label>
                      <Input
                        id="edit-name"
                        value={activeNPC.name}
                        onChange={(e) => setActiveNPC({ ...activeNPC, name: e.target.value })}
                        className="bg-[#1e1e2e] border-slate-700"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="edit-occupation">Ocupación</Label>
                      <Input
                        id="edit-occupation"
                        value={activeNPC.occupation}
                        onChange={(e) => setActiveNPC({ ...activeNPC, occupation: e.target.value })}
                        className="bg-[#1e1e2e] border-slate-700"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="edit-race">Raza</Label>
                      <Select
                        value={activeNPC.race}
                        onValueChange={(value) => setActiveNPC({ ...activeNPC, race: value })}
                      >
                        <SelectTrigger className="bg-[#1e1e2e] border-slate-700">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-[#1e1e2e] border-slate-700">
                          {races.map((race) => (
                            <SelectItem key={race} value={race}>
                              {race}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="edit-gender">Género</Label>
                      <Select
                        value={activeNPC.gender}
                        onValueChange={(value) => setActiveNPC({ ...activeNPC, gender: value })}
                      >
                        <SelectTrigger className="bg-[#1e1e2e] border-slate-700">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-[#1e1e2e] border-slate-700">
                          {genders.map((gender) => (
                            <SelectItem key={gender} value={gender}>
                              {gender}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="edit-hook">Gancho para la historia</Label>
                    <Textarea
                      id="edit-hook"
                      value={activeNPC.hook}
                      onChange={(e) => setActiveNPC({ ...activeNPC, hook: e.target.value })}
                      className="bg-[#1e1e2e] border-slate-700"
                    />
                  </div>
                </TabsContent>
                <TabsContent value="details" className="mt-0 space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="edit-personality">Personalidad</Label>
                    <Textarea
                      id="edit-personality"
                      value={activeNPC.personality}
                      onChange={(e) => setActiveNPC({ ...activeNPC, personality: e.target.value })}
                      className="bg-[#1e1e2e] border-slate-700"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="edit-appearance">Apariencia</Label>
                    <Textarea
                      id="edit-appearance"
                      value={activeNPC.appearance}
                      onChange={(e) => setActiveNPC({ ...activeNPC, appearance: e.target.value })}
                      className="bg-[#1e1e2e] border-slate-700"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="edit-notes">Notas</Label>
                    <Textarea
                      id="edit-notes"
                      value={activeNPC.notes}
                      onChange={(e) => setActiveNPC({ ...activeNPC, notes: e.target.value })}
                      className="bg-[#1e1e2e] border-slate-700 min-h-[150px]"
                    />
                  </div>
                </TabsContent>
              </>
            ) : (
              <>
                <TabsContent value="basic" className="mt-0 space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Nombre</Label>
                      <Input
                        id="name"
                        value={newNPC.name}
                        onChange={(e) => setNewNPC({ ...newNPC, name: e.target.value })}
                        className="bg-[#1e1e2e] border-slate-700"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="occupation">Ocupación</Label>
                      <Select
                        value={newNPC.occupation}
                        onValueChange={(value) => setNewNPC({ ...newNPC, occupation: value })}
                      >
                        <SelectTrigger className="bg-[#1e1e2e] border-slate-700">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-[#1e1e2e] border-slate-700">
                          {occupations.map((occupation) => (
                            <SelectItem key={occupation} value={occupation}>
                              {occupation}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="race">Raza</Label>
                      <Select value={newNPC.race} onValueChange={(value) => setNewNPC({ ...newNPC, race: value })}>
                        <SelectTrigger className="bg-[#1e1e2e] border-slate-700">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-[#1e1e2e] border-slate-700">
                          {races.map((race) => (
                            <SelectItem key={race} value={race}>
                              {race}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="gender">Género</Label>
                      <Select value={newNPC.gender} onValueChange={(value) => setNewNPC({ ...newNPC, gender: value })}>
                        <SelectTrigger className="bg-[#1e1e2e] border-slate-700">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-[#1e1e2e] border-slate-700">
                          {genders.map((gender) => (
                            <SelectItem key={gender} value={gender}>
                              {gender}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="hook">Gancho para la historia</Label>
                    <Select value={newNPC.hook} onValueChange={(value) => setNewNPC({ ...newNPC, hook: value })}>
                      <SelectTrigger className="bg-[#1e1e2e] border-slate-700">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-[#1e1e2e] border-slate-700">
                        {hooks.map((hook) => (
                          <SelectItem key={hook} value={hook}>
                            {hook}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </TabsContent>
                <TabsContent value="details" className="mt-0 space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="personality">Personalidad</Label>
                    <Select
                      value={newNPC.personality}
                      onValueChange={(value) => setNewNPC({ ...newNPC, personality: value })}
                    >
                      <SelectTrigger className="bg-[#1e1e2e] border-slate-700">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-[#1e1e2e] border-slate-700">
                        {personalityTraits.map((trait) => (
                          <SelectItem key={trait} value={trait}>
                            {trait}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="appearance">Apariencia</Label>
                    <Select
                      value={newNPC.appearance}
                      onValueChange={(value) => setNewNPC({ ...newNPC, appearance: value })}
                    >
                      <SelectTrigger className="bg-[#1e1e2e] border-slate-700">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-[#1e1e2e] border-slate-700">
                        {appearanceTraits.map((trait) => (
                          <SelectItem key={trait} value={trait}>
                            {trait}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="notes">Notas</Label>
                    <Textarea
                      id="notes"
                      value={newNPC.notes}
                      onChange={(e) => setNewNPC({ ...newNPC, notes: e.target.value })}
                      placeholder="Notas adicionales sobre este NPC..."
                      className="bg-[#1e1e2e] border-slate-700 min-h-[150px]"
                    />
                  </div>
                </TabsContent>
              </>
            )}
          </Tabs>
        </CardContent>
        {!activeNPC && (
          <CardFooter>
            <Button className="w-full bg-red-900 hover:bg-red-800" onClick={handleCreateNPC} disabled={!newNPC.name}>
              Crear NPC
            </Button>
          </CardFooter>
        )}
      </Card>
    </div>
  )
}
