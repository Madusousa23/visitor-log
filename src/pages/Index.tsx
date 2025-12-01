import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { Search, UserPlus, Users, Trash2, Clock } from "lucide-react";

interface Visitante {
  nome: string;
  documento: string;
  horario: string;
}

const Index = () => {
  const [visitantes, setVisitantes] = useState<Visitante[]>([]);
  const [nome, setNome] = useState("");
  const [documento, setDocumento] = useState("");
  const [horario, setHorario] = useState("");
  const [busca, setBusca] = useState("");

  const cadastrarVisitante = () => {
    if (!nome.trim() || !documento.trim() || !horario.trim()) {
      toast.error("Preencha todos os campos");
      return;
    }

    const visitante: Visitante = {
      nome: nome.trim(),
      documento: documento.trim(),
      horario: horario.trim(),
    };

    setVisitantes([...visitantes, visitante]);
    setNome("");
    setDocumento("");
    setHorario("");
    toast.success("Visitante cadastrado com sucesso!");
  };

  const buscarVisitante = () => {
    if (!busca.trim()) {
      toast.error("Digite um nome para buscar");
      return;
    }

    const encontrado = visitantes.find(
      (v) => v.nome.toLowerCase() === busca.toLowerCase().trim()
    );

    if (encontrado) {
      toast.success(
        `Encontrado: ${encontrado.nome} | Doc: ${encontrado.documento} | Horário: ${encontrado.horario}`,
        { duration: 6000 }
      );
    } else {
      toast.error("Visitante não encontrado");
    }
  };

  const excluirVisitante = (nomeExcluir: string) => {
    const novaLista = visitantes.filter(
      (v) => v.nome.toLowerCase() !== nomeExcluir.toLowerCase()
    );
    
    if (novaLista.length < visitantes.length) {
      setVisitantes(novaLista);
      toast.success("Visitante removido com sucesso!");
    } else {
      toast.error("Visitante não encontrado");
    }
  };

  return (
    <div className="min-h-screen bg-background py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">
            Sistema de Visitantes
          </h1>
          <p className="text-muted-foreground">
            Gerencie o cadastro de visitantes de forma simples e eficiente
          </p>
        </div>

        {/* Main Card */}
        <Card className="border-border shadow-sm">
          <Tabs defaultValue="cadastrar" className="w-full">
            <TabsList className="w-full grid grid-cols-4 gap-2 p-2 bg-muted/30">
              <TabsTrigger value="cadastrar" className="gap-2">
                <UserPlus className="h-4 w-4" />
                <span className="hidden sm:inline">Cadastrar</span>
              </TabsTrigger>
              <TabsTrigger value="listar" className="gap-2">
                <Users className="h-4 w-4" />
                <span className="hidden sm:inline">Listar</span>
              </TabsTrigger>
              <TabsTrigger value="buscar" className="gap-2">
                <Search className="h-4 w-4" />
                <span className="hidden sm:inline">Buscar</span>
              </TabsTrigger>
              <TabsTrigger value="excluir" className="gap-2">
                <Trash2 className="h-4 w-4" />
                <span className="hidden sm:inline">Excluir</span>
              </TabsTrigger>
            </TabsList>

            {/* Cadastrar Tab */}
            <TabsContent value="cadastrar" className="p-6 space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="nome" className="text-sm font-medium">
                    Nome do Visitante
                  </Label>
                  <Input
                    id="nome"
                    placeholder="Digite o nome completo"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    className="h-11"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="documento" className="text-sm font-medium">
                    Documento
                  </Label>
                  <Input
                    id="documento"
                    placeholder="CPF, RG ou outro documento"
                    value={documento}
                    onChange={(e) => setDocumento(e.target.value)}
                    className="h-11"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="horario" className="text-sm font-medium">
                    Horário
                  </Label>
                  <Input
                    id="horario"
                    type="time"
                    value={horario}
                    onChange={(e) => setHorario(e.target.value)}
                    className="h-11"
                  />
                </div>

                <Button
                  onClick={cadastrarVisitante}
                  className="w-full h-11 mt-6"
                  size="lg"
                >
                  <UserPlus className="mr-2 h-4 w-4" />
                  Cadastrar Visitante
                </Button>
              </div>
            </TabsContent>

            {/* Listar Tab */}
            <TabsContent value="listar" className="p-6">
              {visitantes.length === 0 ? (
                <div className="text-center py-12">
                  <Users className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                  <p className="text-muted-foreground text-lg">
                    Nenhum visitante cadastrado
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {visitantes.map((visitante, index) => (
                    <Card
                      key={index}
                      className="p-4 border-border hover:border-primary/50 transition-colors"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div className="space-y-1">
                          <h3 className="font-semibold text-foreground">
                            {visitante.nome}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            Documento: {visitante.documento}
                          </p>
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Clock className="h-4 w-4" />
                          <span className="text-sm">{visitante.horario}</span>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>

            {/* Buscar Tab */}
            <TabsContent value="buscar" className="p-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="busca" className="text-sm font-medium">
                    Nome do Visitante
                  </Label>
                  <Input
                    id="busca"
                    placeholder="Digite o nome para buscar"
                    value={busca}
                    onChange={(e) => setBusca(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && buscarVisitante()}
                    className="h-11"
                  />
                </div>

                <Button
                  onClick={buscarVisitante}
                  className="w-full h-11"
                  size="lg"
                >
                  <Search className="mr-2 h-4 w-4" />
                  Buscar Visitante
                </Button>
              </div>
            </TabsContent>

            {/* Excluir Tab */}
            <TabsContent value="excluir" className="p-6">
              {visitantes.length === 0 ? (
                <div className="text-center py-12">
                  <Users className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                  <p className="text-muted-foreground text-lg">
                    Nenhum visitante para excluir
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {visitantes.map((visitante, index) => (
                    <Card
                      key={index}
                      className="p-4 border-border hover:border-destructive/50 transition-colors"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div className="space-y-1">
                          <h3 className="font-semibold text-foreground">
                            {visitante.nome}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            Documento: {visitante.documento} | Horário:{" "}
                            {visitante.horario}
                          </p>
                        </div>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => excluirVisitante(visitante.nome)}
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Excluir
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </div>
  );
};

export default Index;
