"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"

type DiceRoll = {
  id: number
  type: string
  dice: number[]
  total: number
  modifier: number
  timestamp: Date
}

export default function DiceRoller() {
  const [rolls, setRolls] = useState<DiceRoll[]>([])
  const [customDice, setCustomDice] = useState(20)
  const [customCount, setCustomCount] = useState(1)
  const [customModifier, setCustomModifier] = useState(0)
  const [advantage, setAdvantage] = useState<"none" | "advantage" | "disadvantage">("none")

  const rollDice = (
    sides: number,
    count = 1,
    modifier = 0,
    rollType: "none" | "advantage" | "disadvantage" = "none",
  ) => {
    let dice: number[] = []

    if (rollType === "advantage" || rollType === "disadvantage") {
      // Para ventaja/desventaja, siempre tiramos 2d20
      const roll1 = Math.floor(Math.random() * sides) + 1
      const roll2 = Math.floor(Math.random() * sides) + 1

      if (rollType === "advantage") {
        dice = [roll1, roll2]
        const total = Math.max(roll1, roll2) + modifier
        addRoll(`2d${sides} (Ventaja)`, dice, total, modifier)
      } else {
        dice = [roll1, roll2]
        const total = Math.min(roll1, roll2) + modifier
        addRoll(`2d${sides} (Desventaja)`, dice, total, modifier)
      }
    } else {
      // Tirada normal
      for (let i = 0; i < count; i++) {
        dice.push(Math.floor(Math.random() * sides) + 1)
      }
      const total = dice.reduce((sum, val) => sum + val, 0) + modifier
      addRoll(`${count}d${sides}`, dice, total, modifier)
    }
  }

  const addRoll = (type: string, dice: number[], total: number, modifier: number) => {
    const newRoll: DiceRoll = {
      id: Date.now(),
      type,
      dice,
      total,
      modifier,
      timestamp: new Date(),
    }
    setRolls([newRoll, ...rolls])
  }

  const handleCustomRoll = () => {
    if (advantage !== "none" && customDice === 20) {
      rollDice(customDice, 1, customModifier, advantage)
    } else {
      rollDice(customDice, customCount, customModifier)
    }
  }

  const clearHistory = () => {
    setRolls([])
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card className="bg-[#181825] border-slate-700 md:col-span-2">
        <CardHeader>
          <CardTitle>Lanzador de Dados</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="common">
            <TabsList className="grid grid-cols-2 mb-6">
              <TabsTrigger value="common">Dados Comunes</TabsTrigger>
              <TabsTrigger value="custom">Dados Personalizados</TabsTrigger>
            </TabsList>

            <TabsContent value="common" className="mt-0">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
                <Button className="h-20 bg-red-900/50 hover:bg-red-800 flex flex-col" onClick={() => rollDice(4)}>
                  <span className="text-2xl font-bold">d4</span>
                </Button>
                <Button className="h-20 bg-orange-900/50 hover:bg-orange-800 flex flex-col" onClick={() => rollDice(6)}>
                  <span className="text-2xl font-bold">d6</span>
                </Button>
                <Button className="h-20 bg-amber-900/50 hover:bg-amber-800 flex flex-col" onClick={() => rollDice(8)}>
                  <span className="text-2xl font-bold">d8</span>
                </Button>
                <Button
                  className="h-20 bg-yellow-900/50 hover:bg-yellow-800 flex flex-col"
                  onClick={() => rollDice(10)}
                >
                  <span className="text-2xl font-bold">d10</span>
                </Button>
                <Button className="h-20 bg-green-900/50 hover:bg-green-800 flex flex-col" onClick={() => rollDice(12)}>
                  <span className="text-2xl font-bold">d12</span>
                </Button>
                <Button className="h-20 bg-blue-900/50 hover:bg-blue-800 flex flex-col" onClick={() => rollDice(20)}>
                  <span className="text-2xl font-bold">d20</span>
                </Button>
              </div>

              <div className="mt-6">
                <h3 className="text-lg font-bold mb-3">Tiradas Comunes</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  <Button
                    variant="outline"
                    className="border-red-900/50 hover:bg-red-900/20"
                    onClick={() => rollDice(20, 1, 0, "advantage")}
                  >
                    d20 con Ventaja
                  </Button>
                  <Button
                    variant="outline"
                    className="border-red-900/50 hover:bg-red-900/20"
                    onClick={() => rollDice(20, 1, 0, "disadvantage")}
                  >
                    d20 con Desventaja
                  </Button>
                  <Button
                    variant="outline"
                    className="border-red-900/50 hover:bg-red-900/20"
                    onClick={() => rollDice(6, 4)}
                  >
                    4d6 (Estadísticas)
                  </Button>
                  <Button
                    variant="outline"
                    className="border-red-900/50 hover:bg-red-900/20"
                    onClick={() => rollDice(6, 2)}
                  >
                    2d6
                  </Button>
                  <Button
                    variant="outline"
                    className="border-red-900/50 hover:bg-red-900/20"
                    onClick={() => rollDice(8, 2)}
                  >
                    2d8
                  </Button>
                  <Button
                    variant="outline"
                    className="border-red-900/50 hover:bg-red-900/20"
                    onClick={() => rollDice(10, 2)}
                  >
                    2d10
                  </Button>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="custom" className="mt-0">
              <div className="grid gap-6">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="diceCount">Número de Dados</Label>
                    <Input
                      id="diceCount"
                      type="number"
                      min="1"
                      max="20"
                      value={customCount}
                      onChange={(e) => setCustomCount(Number.parseInt(e.target.value) || 1)}
                      className="bg-[#1e1e2e] border-slate-700"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="diceSides">Caras del Dado</Label>
                    <Input
                      id="diceSides"
                      type="number"
                      min="2"
                      max="100"
                      value={customDice}
                      onChange={(e) => setCustomDice(Number.parseInt(e.target.value) || 20)}
                      className="bg-[#1e1e2e] border-slate-700"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="modifier">Modificador</Label>
                    <Input
                      id="modifier"
                      type="number"
                      value={customModifier}
                      onChange={(e) => setCustomModifier(Number.parseInt(e.target.value) || 0)}
                      className="bg-[#1e1e2e] border-slate-700"
                    />
                  </div>
                </div>

                {customDice === 20 && customCount === 1 && (
                  <div className="space-y-2">
                    <Label>Tipo de Tirada</Label>
                    <div className="flex gap-2">
                      <Button
                        variant={advantage === "none" ? "default" : "outline"}
                        onClick={() => setAdvantage("none")}
                        className={
                          advantage === "none" ? "bg-red-900 hover:bg-red-800" : "border-red-900/50 hover:bg-red-900/20"
                        }
                      >
                        Normal
                      </Button>
                      <Button
                        variant={advantage === "advantage" ? "default" : "outline"}
                        onClick={() => setAdvantage("advantage")}
                        className={
                          advantage === "advantage"
                            ? "bg-red-900 hover:bg-red-800"
                            : "border-red-900/50 hover:bg-red-900/20"
                        }
                      >
                        Ventaja
                      </Button>
                      <Button
                        variant={advantage === "disadvantage" ? "default" : "outline"}
                        onClick={() => setAdvantage("disadvantage")}
                        className={
                          advantage === "disadvantage"
                            ? "bg-red-900 hover:bg-red-800"
                            : "border-red-900/50 hover:bg-red-900/20"
                        }
                      >
                        Desventaja
                      </Button>
                    </div>
                  </div>
                )}

                <Button className="bg-red-900 hover:bg-red-800 w-full" onClick={handleCustomRoll}>
                  Lanzar {customCount}d{customDice}{" "}
                  {customModifier !== 0 ? (customModifier > 0 ? `+${customModifier}` : customModifier) : ""}
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <Card className="bg-[#181825] border-slate-700">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle>Historial de Tiradas</CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={clearHistory}
            className="h-8 text-xs text-slate-400 hover:text-red-400"
          >
            Limpiar
          </Button>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[400px] pr-4">
            {rolls.length === 0 ? (
              <div className="text-center py-8 text-slate-500">
                <p>No hay tiradas aún</p>
              </div>
            ) : (
              <div className="space-y-3">
                {rolls.map((roll) => (
                  <div key={roll.id} className="p-3 rounded-md bg-[#11111b] border border-slate-700">
                    <div className="flex justify-between items-start mb-1">
                      <span className="font-bold text-red-400">{roll.type}</span>
                      <span className="text-xs text-slate-500">
                        {roll.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex-1">
                        <div className="flex flex-wrap gap-1">
                          {roll.dice.map((die, index) => (
                            <div
                              key={index}
                              className={`w-7 h-7 rounded flex items-center justify-center text-xs font-bold ${
                                roll.type.includes("Ventaja") || roll.type.includes("Desventaja")
                                  ? (die === Math.max(...roll.dice) && roll.type.includes("Ventaja")) ||
                                    (die === Math.min(...roll.dice) && roll.type.includes("Desventaja"))
                                    ? "bg-green-900/50 text-green-300"
                                    : "bg-slate-800 text-slate-400"
                                  : die === 1
                                    ? "bg-red-900/50 text-red-300"
                                    : die === roll.dice[0] && roll.dice[0] === roll.dice.length
                                      ? "bg-green-900/50 text-green-300"
                                      : "bg-slate-800"
                              }`}
                            >
                              {die}
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold">{roll.total}</div>
                        {roll.modifier !== 0 && (
                          <div className="text-xs text-slate-400">
                            {roll.dice.reduce((sum, val) => sum + val, 0)}{" "}
                            {roll.modifier > 0 ? `+${roll.modifier}` : roll.modifier}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  )
}
