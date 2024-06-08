import {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue, 
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import usePokemonList from "../contexts/pokemonList";

export default function PokemonList() {
  const [pokemons, setPokemons] = usePokemonList();

  const [name, setName] = useState("");
  const [attack, setAttack] = useState(0);
  const [defense, setDefense] = useState(0);
  const [type, setType] = useState("Fire");

  const navigate = useNavigate();

  const _onSubmit = (e) => {
    e.preventDefault();

    setPokemons([
      ...pokemons,
      {
        id: Math.ceil(Math.random() * 10000000),
        name,
        attack,
        defense,
        type,
      }
    ])

    setName("");
    setAttack(0);
    setDefense(0);
    setType("Fire");
  }

  return (
    <div className="flex flex-col justify-center px-6 py-4 gap-8">
      <form onSubmit={_onSubmit} className="min-w-96 flex flex-col gap-3 mt-4 border p-3 rounded-xl">
        <h2 className="text-xl text-center font-bold underline">Add a pokemon</h2>
        <Input 
          value={name} 
          onChange={e => setName(e.target.value)}
          placeholder="Name..."
        />
        <Input 
          value={attack} 
          onChange={e => setAttack(e.target.value)}
          type="number" 
          placeholder="Attack..." 
        />
        <Input 
          value={defense} 
          onChange={e => setDefense(e.target.value)}
          type="number" 
          placeholder="Defense..." 
        />
        <Select value={type} onValueChange={setType}>
          <SelectTrigger>
            <SelectValue>{type}</SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Fire">Fire</SelectItem>
            <SelectItem value="Water">Water</SelectItem>
            <SelectItem value="Grass">Grass</SelectItem>
          </SelectContent>
        </Select>
        <div className="flex justify-end">
          <Button variant="ghost" onClick={() => navigate("/")}>Cancel</Button>
          <Button type="submit">Submit</Button>
        </div>
      </form>

      <Table>
        <TableCaption>A list of your pokemons.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Name</TableHead>
            <TableHead>Attack</TableHead>
            <TableHead>Defense</TableHead>
            <TableHead className="text-right">Type</TableHead>
            <TableHead className="text-right">Type</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {pokemons.map((p) => (
            <TableRow key={p.p}>
              <TableCell className="font-medium">{p.name}</TableCell>
              <TableCell>{p.attack}</TableCell>
              <TableCell>{p.defense}</TableCell>
              <TableCell className="text-right">{p.type}</TableCell>
              <TableCell className="text-right">
                <Button onClick={() => navigate(`/pokemons/${p.id}`)} variant="ghost">View</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
