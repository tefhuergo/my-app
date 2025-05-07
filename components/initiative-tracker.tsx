"use client"

import { useState } from "react"
import { PlusCircle, Trash2, ArrowDown, ArrowUp, Play, Pause, RotateCcw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Switch } from "@/components/ui/switch"

// Tipos para los combatientes
type Combatant = {
  id: string
  name: string
  initiative: number
  hp: number
  maxHp: number
  ac: number
  isPlayer: boolean
  status: string
}

// Datos de ejemplo
const initialCombatants: Combatant[] = [
  {
    id: "1",
    name: "Thorian",
    initiative: 18,
    hp: 27,
    maxHp: 30,
    ac: 16,
    isPlayer: true,
    status: "",
  },
  {
    id: "2",
    name: "Elindra",
    initiative: 15,
    hp: 15,
    maxHp: 18,
    ac: 12,
    isPlayer: true,
    status: "",
  },
  {
    id: "3",
    name: "Goblin Arquero",
    initiative: 12,
    hp: 7,
    maxHp: 7,
    ac: 13,
    isPlayer: false,
    status: "",
  },
  {
    id: "4",
    name: "Goblin Guerrero",
    initiative: 8,
    hp: 10,
    maxHp: 10,
    ac: 15,
    isPlayer: false,
    status: "Envenenado",
  },
]

export default function InitiativeTracker() {
  const [combatants, setCombatants] = useState<Combatant[]>(
    [...initialCombatants].sort((a, b) => b.initiative - a.initiative),
  )
  const [newCombatant, setNewCombatant] = useState<Partial<Combatant>>({
    isPlayer: false,
  })
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [currentTurn, setCurrentTurn] = useState(0)
  const [isActive, setIsActive] = useState(false)
  const [round, setRound] = useState(1)

  const handleAddCombatant = () => {
    if (newCombatant.name && newCombatant.initiative !== undefined) {
      const combatant: Combatant = {
        id: Date.now().toString(),
        name: newCombatant.name,
        initiative: newCombatant.initiative,
        hp: newCombatant.hp || 10,
        maxHp: newCombatant.maxHp || 10,
        ac: newCombatant.ac || 10,
        isPlayer: newCombatant.isPlayer || false,
        status: newCombatant.status || "",
      }

      // Insertar en el orden correcto
      const newCombatants = [...combatants, combatant].sort((a, b) => b.initiative - a.initiative)
      setCombatants(newCombatants)

      // Ajustar el turno actual si es necesario
      if (isActive && newCombatants.findIndex((c) => c.id === combatant.id) <= currentTurn) {
        setCurrentTurn(currentTurn + 1)
      }

      setNewCombatant({ isPlayer: false })
      setIsAddDialogOpen(false)
    }
  }

  const handleDeleteCombatant = (id: string) => {
    const index = combatants.findIndex((c) => c.id === id)
    if (index !== -1) {
      const newCombatants = combatants.filter((c) => c.id !== id)
      setCombatants(newCombatants)

      // Ajustar el turno actual si es necesario
      if (isActive) {
        if (index < currentTurn) {
          setCurrentTurn(currentTurn - 1)
        } else if (index === currentTurn && currentTurn >= newCombatants.length) {
          setCurrentTurn(0)
          setRound(round + 1)
        }
      }
    }
  }

  const updateHp = (id: string, amount: number) => {
    setCombatants(
      combatants.map((c) => {
        if (c.id === id) {
          const newHp = Math.min(Math.max(c.hp + amount, 0), c.maxHp)
          return { ...c, hp: newHp }
        }
        return c
      }),
    )
  }

  const nextTurn = () => {
    let next = currentTurn + 1
    if (next >= combatants.length) {
      next = 0
      setRound(round + 1)
    }
    setCurrentTurn(next)
  }

  const prevTurn = () => {
    let prev = currentTurn - 1
    if (prev < 0) {
      prev = combatants.length - 1
      setRound(Math.max(1, round - 1))
    }
    setCurrentTurn(prev)
  }

  const resetCombat = () => {
    setCurrentTurn(0)
    setRound(1)
    setIsActive(false)
  }

  const toggleCombat = () => {
    setIsActive(!isActive)
  }

  const updateStatus = (id: string, status: string) => {
    setCombatants(
      combatants.map((c) => {
        if (c.id === id) {
          return { ...c, status }
        }
        return c
      }),
    )
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Rastreador de Iniciativa</h2>
        <div className="flex gap-2">
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-red-900 hover:bg-red-800">
                <PlusCircle className="mr-2 h-4 w-4" />
                Añadir Combatiente
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-[#181825] border-slate-700 text-slate-100">
              <DialogHeader>
                <DialogTitle>Añadir Combatiente</DialogTitle>
                <DialogDescription className="text-slate-400">
                  Añade un personaje o enemigo al orden de iniciativa
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="isPlayer" className="flex items-center gap-2">
                    <span>¿Es un jugador?</span>
                  </Label>
                  <Switch
                    id="isPlayer"
                    checked={newCombatant.isPlayer || false}
                    onCheckedChange={(checked) => setNewCombatant({ ...newCombatant, isPlayer: checked })}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nombre</Label>
                    <Input
                      id="name"
                      value={newCombatant.name || ""}
                      onChange={(e) => setNewCombatant({ ...newCombatant, name: e.target.value })}
                      className="bg-[#1e1e2e] border-slate-700"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="initiative">Iniciativa</Label>
                    <Input
                      id="initiative"
                      type="number"
                      value={newCombatant.initiative || ""}
                      onChange={(e) =>
                        setNewCombatant({ ...newCombatant, initiative: Number.parseInt(e.target.value) })
                      }
                      className="bg-[#1e1e2e] border-slate-700"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="hp">PV</Label>
                    <Input
                      id="hp"
                      type="number"
                      min="1"
                      value={newCombatant.hp || 10}
                      onChange={(e) => {
                        const hp = Number.parseInt(e.target.value)
                        setNewCombatant({
                          ...newCombatant,
                          hp,
                          maxHp: newCombatant.maxHp ? Math.max(newCombatant.maxHp, hp) : hp,
                        })
                      }}
                      className="bg-[#1e1e2e] border-slate-700"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="maxHp">PV Máx</Label>
                    <Input
                      id="maxHp"
                      type="number"
                      min="1"
                      value={newCombatant.maxHp || 10}
                      onChange={(e) => setNewCombatant({ ...newCombatant, maxHp: Number.parseInt(e.target.value) })}
                      className="bg-[#1e1e2e] border-slate-700"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="ac">CA</Label>
                    <Input
                      id="ac"
                      type="number"
                      min="1"
                      value={newCombatant.ac || 10}
                      onChange={(e) => setNewCombatant({ ...newCombatant, ac: Number.parseInt(e.target.value) })}
                      className="bg-[#1e1e2e] border-slate-700"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="status">Estado</Label>
                  <Input
                    id="status"
                    value={newCombatant.status || ""}
                    onChange={(e) => setNewCombatant({ ...newCombatant, status: e.target.value })}
                    placeholder="Envenenado, Aturdido, etc."
                    className="bg-[#1e1e2e] border-slate-700"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancelar
                </Button>
                <Button className="bg-red-900 hover:bg-red-800" onClick={handleAddCombatant}>
                  Añadir
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Card className="bg-[#181825] border-slate-700 mb-6">
        <CardHeader className="pb-3">
          <div className="flex justify-between items-center">
            <CardTitle>Ronda {round}</CardTitle>
            <div className="flex gap-2">
              <Button variant="outline" size="icon" className="h-8 w-8" onClick={prevTurn} disabled={!isActive}>
                <ArrowUp className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" className="h-8 w-8" onClick={nextTurn} disabled={!isActive}>
                <ArrowDown className="h-4 w-4" />
              </Button>
              <Button
                variant={isActive ? "destructive" : "default"}
                size="icon"
                className="h-8 w-8"
                onClick={toggleCombat}
              >
                {isActive ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              </Button>
              <Button variant="outline" size="icon" className="h-8 w-8" onClick={resetCombat}>
                <RotateCcw className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      <div className="space-y-3">
        {combatants.map((combatant, index) => (
          <Card
            key={combatant.id}
            className={`bg-[#181825] border-slate-700 ${index === currentTurn && isActive ? "ring-2 ring-red-500" : ""}`}
          >
            <CardContent className="p-4">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center mr-4">
                  <span className="font-bold">{combatant.initiative}</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className={`font-bold ${combatant.isPlayer ? "text-green-400" : "text-red-400"}`}>
                      {combatant.name}
                    </h3>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1 text-sm">
                        <span className="text-slate-400">CA:</span>
                        <span>{combatant.ac}</span>
                      </div>
                      <div className="flex items-center">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7 text-red-400"
                          onClick={() => updateHp(combatant.id, -1)}
                        >
                          -
                        </Button>
                        <div className="mx-1 text-center min-w-[60px]">
                          <span className="text-sm font-bold">{combatant.hp}</span>
                          <span className="text-slate-400 text-xs">/{combatant.maxHp}</span>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7 text-green-400"
                          onClick={() => updateHp(combatant.id, 1)}
                        >
                          +
                        </Button>
                      </div>
                      <Input
                        className="h-7 w-32 bg-[#1e1e2e] border-slate-700 text-xs"
                        placeholder="Estado"
                        value={combatant.status}
                        onChange={(e) => updateStatus(combatant.id, e.target.value)}
                      />
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 text-slate-400 hover:text-red-500"
                        onClick={() => handleDeleteCombatant(combatant.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
