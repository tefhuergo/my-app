import Link from "next/link"
import { Dice1Icon as DiceIcon, Users, Scroll, Swords, BookOpen, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import CharacterTracker from "@/components/character-tracker"
import InitiativeTracker from "@/components/initiative-tracker"
import DiceRoller from "@/components/dice-roller"
import CampaignNotes from "@/components/campaign-notes"
import NpcGenerator from "@/components/npc-generator"

export default function DungeonMasterDashboard() {
  return (
    <div className="min-h-screen bg-[#1e1e2e] text-slate-100">
      {/* Header */}
      <header className="border-b border-slate-700 bg-[#181825] py-4">
        <div className="container flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BookOpen className="h-6 w-6 text-red-400" />
            <h1 className="text-xl font-bold text-white">D&D Master Portal</h1>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="#" className="text-sm text-white hover:text-red-400">
              Campañas
            </Link>
            <Link href="#" className="text-sm text-white hover:text-red-400">
              Personajes
            </Link>
            <Link href="#" className="text-sm text-white hover:text-red-400">
              Bestiario
            </Link>
            <Link href="#" className="text-sm text-white hover:text-red-400">
              Reglas
            </Link>
          </nav>
          <Button variant="outline" className="border-red-700 text-red-400 hover:bg-red-900/20 hover:text-red-300">
            Nueva Campaña
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container py-6">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold mb-2 text-white">Panel del Dungeon Master</h2>
          <p className="text-slate-300 max-w-2xl mx-auto">
            Gestiona tus campañas, personajes, combates y más con estas herramientas diseñadas para hacer tu vida como
            DM más fácil.
          </p>
        </div>

        <Tabs defaultValue="characters" className="w-full">
          <TabsList className="grid grid-cols-5 mb-8">
            <TabsTrigger
              value="characters"
              className="data-[state=active]:bg-red-900/30 data-[state=active]:text-red-400 text-white"
            >
              <Users className="mr-2 h-4 w-4" />
              <span className="hidden sm:inline">Personajes</span>
            </TabsTrigger>
            <TabsTrigger
              value="initiative"
              className="data-[state=active]:bg-red-900/30 data-[state=active]:text-red-400 text-white"
            >
              <Swords className="mr-2 h-4 w-4" />
              <span className="hidden sm:inline">Iniciativa</span>
            </TabsTrigger>
            <TabsTrigger
              value="dice"
              className="data-[state=active]:bg-red-900/30 data-[state=active]:text-red-400 text-white"
            >
              <DiceIcon className="mr-2 h-4 w-4" />
              <span className="hidden sm:inline">Dados</span>
            </TabsTrigger>
            <TabsTrigger
              value="notes"
              className="data-[state=active]:bg-red-900/30 data-[state=active]:text-red-400 text-white"
            >
              <Scroll className="mr-2 h-4 w-4" />
              <span className="hidden sm:inline">Notas</span>
            </TabsTrigger>
            <TabsTrigger
              value="npcs"
              className="data-[state=active]:bg-red-900/30 data-[state=active]:text-red-400 text-white"
            >
              <MapPin className="mr-2 h-4 w-4" />
              <span className="hidden sm:inline">NPCs</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="characters" className="mt-0">
            <CharacterTracker />
          </TabsContent>

          <TabsContent value="initiative" className="mt-0">
            <InitiativeTracker />
          </TabsContent>

          <TabsContent value="dice" className="mt-0">
            <DiceRoller />
          </TabsContent>

          <TabsContent value="notes" className="mt-0">
            <CampaignNotes />
          </TabsContent>

          <TabsContent value="npcs" className="mt-0">
            <NpcGenerator />
          </TabsContent>
        </Tabs>

        {/* Quick Access Tools */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          <Card className="bg-[#181825] border-slate-700">
            <CardHeader>
              <CardTitle className="text-red-400">Encuentros Rápidos</CardTitle>
              <CardDescription className="text-slate-300">
                Genera encuentros aleatorios basados en el nivel del grupo
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between text-sm text-white">
                  <span>Nivel del grupo:</span>
                  <span className="font-bold">1-4</span>
                </div>
                <div className="flex justify-between text-sm text-white">
                  <span>Dificultad:</span>
                  <span className="font-bold">Media</span>
                </div>
                <div className="flex justify-between text-sm text-white">
                  <span>Entorno:</span>
                  <span className="font-bold">Bosque</span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full bg-red-900 hover:bg-red-800 text-white">Generar Encuentro</Button>
            </CardFooter>
          </Card>

          <Card className="bg-[#181825] border-slate-700">
            <CardHeader>
              <CardTitle className="text-red-400">Tesoro Aleatorio</CardTitle>
              <CardDescription className="text-slate-300">
                Genera tesoros y recompensas para tus jugadores
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between text-sm text-white">
                  <span>Nivel de tesoro:</span>
                  <span className="font-bold">Bajo</span>
                </div>
                <div className="flex justify-between text-sm text-white">
                  <span>Tipo:</span>
                  <span className="font-bold">Mixto</span>
                </div>
                <div className="flex justify-between text-sm text-white">
                  <span>Incluir objetos mágicos:</span>
                  <span className="font-bold">Sí</span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full bg-red-900 hover:bg-red-800 text-white">Generar Tesoro</Button>
            </CardFooter>
          </Card>

          <Card className="bg-[#181825] border-slate-700">
            <CardHeader>
              <CardTitle className="text-red-400">Tablas Aleatorias</CardTitle>
              <CardDescription className="text-slate-300">
                Accede a tablas de eventos, nombres, clima y más
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between text-sm text-white">
                  <span>Tabla popular:</span>
                  <span className="font-bold">Eventos de viaje</span>
                </div>
                <div className="flex justify-between text-sm text-white">
                  <span>Última usada:</span>
                  <span className="font-bold">Nombres élficos</span>
                </div>
                <div className="flex justify-between text-sm text-white">
                  <span>Tablas guardadas:</span>
                  <span className="font-bold">12</span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full bg-red-900 hover:bg-red-800 text-white">Ver Tablas</Button>
            </CardFooter>
          </Card>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-700 bg-[#181825] py-6 mt-12">
        <div className="container text-center text-sm text-slate-300">
          <p>D&D Master Portal © {new Date().getFullYear()} - Herramienta no oficial para Dungeons & Dragons</p>
          <p className="mt-2">Dungeons & Dragons es una marca registrada de Wizards of the Coast LLC.</p>
        </div>
      </footer>
    </div>
  )
}
