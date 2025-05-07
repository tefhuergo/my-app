"use client"

import { useState } from "react"
import { PlusCircle, Trash2, Edit } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

// Actualizar el tipo Character para incluir las características
type Character = {
  id: string
  name: string
  player: string
  race: string
  class: string
  level: number
  hp: number
  maxHp: number
  ac: number
  notes: string
  // Añadir las características básicas de D&D
  strength: number
  dexterity: number
  constitution: number
  intelligence: number
  wisdom: number
  charisma: number
}

// Actualizar los datos de ejemplo para incluir las características
const initialCharacters: Character[] = [
  {
    id: "1",
    name: "Thorian",
    player: "Carlos",
    race: "Enano",
    class: "Guerrero",
    level: 3,
    hp: 27,
    maxHp: 30,
    ac: 16,
    notes: "Porta el martillo ancestral de su clan",
    strength: 16,
    dexterity: 12,
    constitution: 16,
    intelligence: 10,
    wisdom: 12,
    charisma: 8,
  },
  {
    id: "2",
    name: "Elindra",
    player: "Ana",
    race: "Elfa",
    class: "Maga",
    level: 3,
    hp: 15,
    maxHp: 18,
    ac: 12,
    notes: "Especialista en magia de fuego",
    strength: 8,
    dexterity: 16,
    constitution: 12,
    intelligence: 18,
    wisdom: 14,
    charisma: 12,
  },
  {
    id: "3",
    name: "Grok",
    player: "Miguel",
    race: "Medio Orco",
    class: "Bárbaro",
    level: 3,
    hp: 32,
    maxHp: 32,
    ac: 14,
    notes: "Tiene un problema con la autoridad",
    strength: 18,
    dexterity: 14,
    constitution: 16,
    intelligence: 8,
    wisdom: 10,
    charisma: 8,
  },
]

export default function CharacterTracker() {
  const [characters, setCharacters] = useState<Character[]>(initialCharacters)
  const [newCharacter, setNewCharacter] = useState<Partial<Character>>({})
  const [editingCharacter, setEditingCharacter] = useState<Character | null>(null)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)

  // Modificar la función handleAddCharacter para incluir las características
  const handleAddCharacter = () => {
    if (newCharacter.name && newCharacter.player) {
      const character: Character = {
        id: Date.now().toString(),
        name: newCharacter.name || "",
        player: newCharacter.player || "",
        race: newCharacter.race || "Humano",
        class: newCharacter.class || "Guerrero",
        level: newCharacter.level || 1,
        hp: newCharacter.hp || 10,
        maxHp: newCharacter.maxHp || 10,
        ac: newCharacter.ac || 10,
        notes: newCharacter.notes || "",
        strength: newCharacter.strength || 10,
        dexterity: newCharacter.dexterity || 10,
        constitution: newCharacter.constitution || 10,
        intelligence: newCharacter.intelligence || 10,
        wisdom: newCharacter.wisdom || 10,
        charisma: newCharacter.charisma || 10,
      }
      setCharacters([...characters, character])
      setNewCharacter({})
      setIsAddDialogOpen(false)
    }
  }

  const handleEditCharacter = () => {
    if (editingCharacter) {
      setCharacters(characters.map((c) => (c.id === editingCharacter.id ? editingCharacter : c)))
      setEditingCharacter(null)
      setIsEditDialogOpen(false)
    }
  }

  const handleDeleteCharacter = (id: string) => {
    setCharacters(characters.filter((c) => c.id !== id))
  }

  const updateHp = (id: string, amount: number) => {
    setCharacters(
      characters.map((c) => {
        if (c.id === id) {
          const newHp = Math.min(Math.max(c.hp + amount, 0), c.maxHp)
          return { ...c, hp: newHp }
        }
        return c
      }),
    )
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Personajes del Grupo</h2>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-red-900 hover:bg-red-800">
              <PlusCircle className="mr-2 h-4 w-4" />
              Añadir Personaje
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-[#181825] border-slate-700 text-slate-100">
            <DialogHeader>
              <DialogTitle>Añadir Nuevo Personaje</DialogTitle>
              <DialogDescription className="text-slate-400">
                Introduce los detalles del personaje del jugador
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nombre del Personaje</Label>
                  <Input
                    id="name"
                    value={newCharacter.name || ""}
                    onChange={(e) => setNewCharacter({ ...newCharacter, name: e.target.value })}
                    className="bg-[#1e1e2e] border-slate-700 text-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="player">Nombre del Jugador</Label>
                  <Input
                    id="player"
                    value={newCharacter.player || ""}
                    onChange={(e) => setNewCharacter({ ...newCharacter, player: e.target.value })}
                    className="bg-[#1e1e2e] border-slate-700 text-white"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="race">Raza</Label>
                  <Select
                    onValueChange={(value) => setNewCharacter({ ...newCharacter, race: value })}
                    defaultValue="Humano"
                  >
                    <SelectTrigger className="bg-[#1e1e2e] border-slate-700 text-white">
                      <SelectValue placeholder="Selecciona una raza" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#1e1e2e] border-slate-700 text-white">
                      <SelectItem value="Humano">Humano</SelectItem>
                      <SelectItem value="Elfo">Elfo</SelectItem>
                      <SelectItem value="Enano">Enano</SelectItem>
                      <SelectItem value="Mediano">Mediano</SelectItem>
                      <SelectItem value="Medio Orco">Medio Orco</SelectItem>
                      <SelectItem value="Gnomo">Gnomo</SelectItem>
                      <SelectItem value="Tiefling">Tiefling</SelectItem>
                      <SelectItem value="Dracónido">Dracónido</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="class">Clase</Label>
                  <Select
                    onValueChange={(value) => setNewCharacter({ ...newCharacter, class: value })}
                    defaultValue="Guerrero"
                  >
                    <SelectTrigger className="bg-[#1e1e2e] border-slate-700 text-white">
                      <SelectValue placeholder="Selecciona una clase" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#1e1e2e] border-slate-700 text-white">
                      <SelectItem value="Guerrero">Guerrero</SelectItem>
                      <SelectItem value="Mago">Mago</SelectItem>
                      <SelectItem value="Clérigo">Clérigo</SelectItem>
                      <SelectItem value="Pícaro">Pícaro</SelectItem>
                      <SelectItem value="Bárbaro">Bárbaro</SelectItem>
                      <SelectItem value="Bardo">Bardo</SelectItem>
                      <SelectItem value="Druida">Druida</SelectItem>
                      <SelectItem value="Monje">Monje</SelectItem>
                      <SelectItem value="Paladín">Paladín</SelectItem>
                      <SelectItem value="Explorador">Explorador</SelectItem>
                      <SelectItem value="Hechicero">Hechicero</SelectItem>
                      <SelectItem value="Brujo">Brujo</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="level">Nivel</Label>
                  <Input
                    id="level"
                    type="number"
                    min="1"
                    max="20"
                    value={newCharacter.level || 1}
                    onChange={(e) => setNewCharacter({ ...newCharacter, level: Number.parseInt(e.target.value) })}
                    className="bg-[#1e1e2e] border-slate-700 text-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="hp">Puntos de Vida</Label>
                  <Input
                    id="hp"
                    type="number"
                    min="1"
                    value={newCharacter.hp || 10}
                    onChange={(e) => {
                      const hp = Number.parseInt(e.target.value)
                      setNewCharacter({
                        ...newCharacter,
                        hp,
                        maxHp: newCharacter.maxHp ? Math.max(newCharacter.maxHp, hp) : hp,
                      })
                    }}
                    className="bg-[#1e1e2e] border-slate-700 text-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="ac">Clase de Armadura</Label>
                  <Input
                    id="ac"
                    type="number"
                    min="1"
                    value={newCharacter.ac || 10}
                    onChange={(e) => setNewCharacter({ ...newCharacter, ac: Number.parseInt(e.target.value) })}
                    className="bg-[#1e1e2e] border-slate-700 text-white"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-lg font-semibold">Características</Label>
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="strength">Fuerza (STR)</Label>
                    <Input
                      id="strength"
                      type="number"
                      min="1"
                      max="20"
                      value={newCharacter.strength || 10}
                      onChange={(e) => setNewCharacter({ ...newCharacter, strength: Number.parseInt(e.target.value) })}
                      className="bg-[#1e1e2e] border-slate-700 text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="dexterity">Destreza (DEX)</Label>
                    <Input
                      id="dexterity"
                      type="number"
                      min="1"
                      max="20"
                      value={newCharacter.dexterity || 10}
                      onChange={(e) => setNewCharacter({ ...newCharacter, dexterity: Number.parseInt(e.target.value) })}
                      className="bg-[#1e1e2e] border-slate-700 text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="constitution">Constitución (CON)</Label>
                    <Input
                      id="constitution"
                      type="number"
                      min="1"
                      max="20"
                      value={newCharacter.constitution || 10}
                      onChange={(e) =>
                        setNewCharacter({ ...newCharacter, constitution: Number.parseInt(e.target.value) })
                      }
                      className="bg-[#1e1e2e] border-slate-700 text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="intelligence">Inteligencia (INT)</Label>
                    <Input
                      id="intelligence"
                      type="number"
                      min="1"
                      max="20"
                      value={newCharacter.intelligence || 10}
                      onChange={(e) =>
                        setNewCharacter({ ...newCharacter, intelligence: Number.parseInt(e.target.value) })
                      }
                      className="bg-[#1e1e2e] border-slate-700 text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="wisdom">Sabiduría (WIS)</Label>
                    <Input
                      id="wisdom"
                      type="number"
                      min="1"
                      max="20"
                      value={newCharacter.wisdom || 10}
                      onChange={(e) => setNewCharacter({ ...newCharacter, wisdom: Number.parseInt(e.target.value) })}
                      className="bg-[#1e1e2e] border-slate-700 text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="charisma">Carisma (CHA)</Label>
                    <Input
                      id="charisma"
                      type="number"
                      min="1"
                      max="20"
                      value={newCharacter.charisma || 10}
                      onChange={(e) => setNewCharacter({ ...newCharacter, charisma: Number.parseInt(e.target.value) })}
                      className="bg-[#1e1e2e] border-slate-700 text-white"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Notas</Label>
                <Textarea
                  id="notes"
                  value={newCharacter.notes || ""}
                  onChange={(e) => setNewCharacter({ ...newCharacter, notes: e.target.value })}
                  className="bg-[#1e1e2e] border-slate-700 text-white"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancelar
              </Button>
              <Button className="bg-red-900 hover:bg-red-800" onClick={handleAddCharacter}>
                Añadir
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {characters.map((character) => (
          <Card key={character.id} className="bg-[#181825] border-slate-700 overflow-hidden">
            <CardHeader className="bg-[#11111b] pb-2">
              <div className="flex justify-between items-start">
                <CardTitle className="text-xl text-red-400">{character.name}</CardTitle>
                <div className="flex space-x-1">
                  <Dialog
                    open={isEditDialogOpen && editingCharacter?.id === character.id}
                    onOpenChange={(open) => {
                      setIsEditDialogOpen(open)
                      if (open) setEditingCharacter(character)
                      else setEditingCharacter(null)
                    }}
                  >
                    <DialogTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-slate-100">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="bg-[#181825] border-slate-700 text-slate-100">
                      <DialogHeader>
                        <DialogTitle>Editar Personaje</DialogTitle>
                      </DialogHeader>
                      {editingCharacter && (
                        <div className="grid gap-4 py-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="edit-name">Nombre del Personaje</Label>
                              <Input
                                id="edit-name"
                                value={editingCharacter.name}
                                onChange={(e) => setEditingCharacter({ ...editingCharacter, name: e.target.value })}
                                className="bg-[#1e1e2e] border-slate-700 text-white"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="edit-player">Nombre del Jugador</Label>
                              <Input
                                id="edit-player"
                                value={editingCharacter.player}
                                onChange={(e) => setEditingCharacter({ ...editingCharacter, player: e.target.value })}
                                className="bg-[#1e1e2e] border-slate-700 text-white"
                              />
                            </div>
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="edit-race">Raza</Label>
                              <Select
                                value={editingCharacter.race}
                                onValueChange={(value) => setEditingCharacter({ ...editingCharacter, race: value })}
                              >
                                <SelectTrigger className="bg-[#1e1e2e] border-slate-700 text-white">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent className="bg-[#1e1e2e] border-slate-700 text-white">
                                  <SelectItem value="Humano">Humano</SelectItem>
                                  <SelectItem value="Elfo">Elfo</SelectItem>
                                  <SelectItem value="Enano">Enano</SelectItem>
                                  <SelectItem value="Mediano">Mediano</SelectItem>
                                  <SelectItem value="Medio Orco">Medio Orco</SelectItem>
                                  <SelectItem value="Gnomo">Gnomo</SelectItem>
                                  <SelectItem value="Tiefling">Tiefling</SelectItem>
                                  <SelectItem value="Dracónido">Dracónido</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="edit-class">Clase</Label>
                              <Select
                                value={editingCharacter.class}
                                onValueChange={(value) => setEditingCharacter({ ...editingCharacter, class: value })}
                              >
                                <SelectTrigger className="bg-[#1e1e2e] border-slate-700 text-white">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent className="bg-[#1e1e2e] border-slate-700 text-white">
                                  <SelectItem value="Guerrero">Guerrero</SelectItem>
                                  <SelectItem value="Mago">Mago</SelectItem>
                                  <SelectItem value="Clérigo">Clérigo</SelectItem>
                                  <SelectItem value="Pícaro">Pícaro</SelectItem>
                                  <SelectItem value="Bárbaro">Bárbaro</SelectItem>
                                  <SelectItem value="Bardo">Bardo</SelectItem>
                                  <SelectItem value="Druida">Druida</SelectItem>
                                  <SelectItem value="Monje">Monje</SelectItem>
                                  <SelectItem value="Paladín">Paladín</SelectItem>
                                  <SelectItem value="Explorador">Explorador</SelectItem>
                                  <SelectItem value="Hechicero">Hechicero</SelectItem>
                                  <SelectItem value="Brujo">Brujo</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                          <div className="grid grid-cols-3 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="edit-level">Nivel</Label>
                              <Input
                                id="edit-level"
                                type="number"
                                min="1"
                                max="20"
                                value={editingCharacter.level}
                                onChange={(e) =>
                                  setEditingCharacter({ ...editingCharacter, level: Number.parseInt(e.target.value) })
                                }
                                className="bg-[#1e1e2e] border-slate-700 text-white"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="edit-maxhp">PV Máximos</Label>
                              <Input
                                id="edit-maxhp"
                                type="number"
                                min="1"
                                value={editingCharacter.maxHp}
                                onChange={(e) => {
                                  const maxHp = Number.parseInt(e.target.value)
                                  setEditingCharacter({
                                    ...editingCharacter,
                                    maxHp,
                                    hp: Math.min(editingCharacter.hp, maxHp),
                                  })
                                }}
                                className="bg-[#1e1e2e] border-slate-700 text-white"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="edit-ac">CA</Label>
                              <Input
                                id="edit-ac"
                                type="number"
                                min="1"
                                value={editingCharacter.ac}
                                onChange={(e) =>
                                  setEditingCharacter({ ...editingCharacter, ac: Number.parseInt(e.target.value) })
                                }
                                className="bg-[#1e1e2e] border-slate-700 text-white"
                              />
                            </div>
                          </div>

                          <div className="space-y-2">
                            <Label className="text-lg font-semibold">Características</Label>
                            <div className="grid grid-cols-3 gap-4">
                              <div className="space-y-2">
                                <Label htmlFor="edit-strength">Fuerza (STR)</Label>
                                <Input
                                  id="edit-strength"
                                  type="number"
                                  min="1"
                                  max="20"
                                  value={editingCharacter.strength}
                                  onChange={(e) =>
                                    setEditingCharacter({
                                      ...editingCharacter,
                                      strength: Number.parseInt(e.target.value),
                                    })
                                  }
                                  className="bg-[#1e1e2e] border-slate-700 text-white"
                                />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="edit-dexterity">Destreza (DEX)</Label>
                                <Input
                                  id="edit-dexterity"
                                  type="number"
                                  min="1"
                                  max="20"
                                  value={editingCharacter.dexterity}
                                  onChange={(e) =>
                                    setEditingCharacter({
                                      ...editingCharacter,
                                      dexterity: Number.parseInt(e.target.value),
                                    })
                                  }
                                  className="bg-[#1e1e2e] border-slate-700 text-white"
                                />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="edit-constitution">Constitución (CON)</Label>
                                <Input
                                  id="edit-constitution"
                                  type="number"
                                  min="1"
                                  max="20"
                                  value={editingCharacter.constitution}
                                  onChange={(e) =>
                                    setEditingCharacter({
                                      ...editingCharacter,
                                      constitution: Number.parseInt(e.target.value),
                                    })
                                  }
                                  className="bg-[#1e1e2e] border-slate-700 text-white"
                                />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="edit-intelligence">Inteligencia (INT)</Label>
                                <Input
                                  id="edit-intelligence"
                                  type="number"
                                  min="1"
                                  max="20"
                                  value={editingCharacter.intelligence}
                                  onChange={(e) =>
                                    setEditingCharacter({
                                      ...editingCharacter,
                                      intelligence: Number.parseInt(e.target.value),
                                    })
                                  }
                                  className="bg-[#1e1e2e] border-slate-700 text-white"
                                />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="edit-wisdom">Sabiduría (WIS)</Label>
                                <Input
                                  id="edit-wisdom"
                                  type="number"
                                  min="1"
                                  max="20"
                                  value={editingCharacter.wisdom}
                                  onChange={(e) =>
                                    setEditingCharacter({
                                      ...editingCharacter,
                                      wisdom: Number.parseInt(e.target.value),
                                    })
                                  }
                                  className="bg-[#1e1e2e] border-slate-700 text-white"
                                />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="edit-charisma">Carisma (CHA)</Label>
                                <Input
                                  id="edit-charisma"
                                  type="number"
                                  min="1"
                                  max="20"
                                  value={editingCharacter.charisma}
                                  onChange={(e) =>
                                    setEditingCharacter({
                                      ...editingCharacter,
                                      charisma: Number.parseInt(e.target.value),
                                    })
                                  }
                                  className="bg-[#1e1e2e] border-slate-700 text-white"
                                />
                              </div>
                            </div>
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="edit-notes">Notas</Label>
                            <Textarea
                              id="edit-notes"
                              value={editingCharacter.notes}
                              onChange={(e) => setEditingCharacter({ ...editingCharacter, notes: e.target.value })}
                              className="bg-[#1e1e2e] border-slate-700 text-white"
                            />
                          </div>
                        </div>
                      )}
                      <DialogFooter>
                        <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                          Cancelar
                        </Button>
                        <Button className="bg-red-900 hover:bg-red-800" onClick={handleEditCharacter}>
                          Guardar
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-slate-400 hover:text-red-500"
                    onClick={() => handleDeleteCharacter(character.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="flex items-center text-sm text-slate-400">
                <span>
                  {character.race} {character.class} Nivel {character.level}
                </span>
                <span className="ml-auto">Jugador: {character.player}</span>
              </div>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <div className="text-sm text-slate-300 mb-1">Puntos de Vida</div>
                  <div className="flex items-center">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-7 w-7 rounded-full bg-red-900/20 border-red-900/50 text-red-400"
                      onClick={() => updateHp(character.id, -1)}
                    >
                      -
                    </Button>
                    <div className="mx-2 text-center flex-1">
                      <span className="text-xl font-bold text-white">{character.hp}</span>
                      <span className="text-slate-300 text-sm">/{character.maxHp}</span>
                    </div>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-7 w-7 rounded-full bg-green-900/20 border-green-900/50 text-green-400"
                      onClick={() => updateHp(character.id, 1)}
                    >
                      +
                    </Button>
                  </div>
                </div>
                <div>
                  <div className="text-sm text-slate-300 mb-1">Clase de Armadura</div>
                  <div className="flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full border-2 border-slate-600 flex items-center justify-center bg-slate-800">
                      <span className="text-xl font-bold text-white">{character.ac}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <div className="text-sm text-slate-300 mb-2 font-semibold">Características</div>
                <div className="grid grid-cols-6 gap-2">
                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 rounded-md border border-slate-600 flex items-center justify-center bg-slate-800 mb-1">
                      <span className="text-lg font-bold text-white">{character.strength}</span>
                    </div>
                    <span className="text-xs text-slate-300">FUE</span>
                    <span className="text-xs text-slate-400">
                      {Math.floor((character.strength - 10) / 2) >= 0 ? "+" : ""}
                      {Math.floor((character.strength - 10) / 2)}
                    </span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 rounded-md border border-slate-600 flex items-center justify-center bg-slate-800 mb-1">
                      <span className="text-lg font-bold text-white">{character.dexterity}</span>
                    </div>
                    <span className="text-xs text-slate-300">DES</span>
                    <span className="text-xs text-slate-400">
                      {Math.floor((character.dexterity - 10) / 2) >= 0 ? "+" : ""}
                      {Math.floor((character.dexterity - 10) / 2)}
                    </span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 rounded-md border border-slate-600 flex items-center justify-center bg-slate-800 mb-1">
                      <span className="text-lg font-bold text-white">{character.constitution}</span>
                    </div>
                    <span className="text-xs text-slate-300">CON</span>
                    <span className="text-xs text-slate-400">
                      {Math.floor((character.constitution - 10) / 2) >= 0 ? "+" : ""}
                      {Math.floor((character.constitution - 10) / 2)}
                    </span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 rounded-md border border-slate-600 flex items-center justify-center bg-slate-800 mb-1">
                      <span className="text-lg font-bold text-white">{character.intelligence}</span>
                    </div>
                    <span className="text-xs text-slate-300">INT</span>
                    <span className="text-xs text-slate-400">
                      {Math.floor((character.intelligence - 10) / 2) >= 0 ? "+" : ""}
                      {Math.floor((character.intelligence - 10) / 2)}
                    </span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 rounded-md border border-slate-600 flex items-center justify-center bg-slate-800 mb-1">
                      <span className="text-lg font-bold text-white">{character.wisdom}</span>
                    </div>
                    <span className="text-xs text-slate-300">SAB</span>
                    <span className="text-xs text-slate-400">
                      {Math.floor((character.wisdom - 10) / 2) >= 0 ? "+" : ""}
                      {Math.floor((character.wisdom - 10) / 2)}
                    </span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 rounded-md border border-slate-600 flex items-center justify-center bg-slate-800 mb-1">
                      <span className="text-lg font-bold text-white">{character.charisma}</span>
                    </div>
                    <span className="text-xs text-slate-300">CAR</span>
                    <span className="text-xs text-slate-400">
                      {Math.floor((character.charisma - 10) / 2) >= 0 ? "+" : ""}
                      {Math.floor((character.charisma - 10) / 2)}
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <div className="text-sm text-slate-300 mb-1">Notas</div>
                <p className="text-sm text-white">{character.notes}</p>
              </div>
            </CardContent>
            <CardFooter className="border-t border-slate-700 bg-[#11111b]">
              <div className="w-full flex justify-between text-xs text-slate-400">
                <span>Iniciativa: +2</span>
                <span>Percepción: 14</span>
                <span>Velocidad: 30 pies</span>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
