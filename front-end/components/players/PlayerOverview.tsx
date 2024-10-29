import PlayerService from "@services/PlayerService";
import TeamService from "@services/TeamService";
import { Player, Team, User } from "@types"
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const PlayerOverview: React.FC = () => {
    const { teamId } = useParams<{ teamId: string }>();  // Extract teamId from the URL
    const team = TeamService.getTeamById(teamId)



    
    const addPlayerToTeam = async (player: Player) => {
        try {
            const response = await TeamService.getTeamById(teamId);
            const team = await response.json()
            await TeamService.addPlayerToTeam(team, player)
            window.location.reload()
        }  catch (error) {
            console.error("Failed to add player to team:", error);
        }
    };

    const removePlayerFromTeam = async (player: Player) => {
        try {
            const response = await TeamService.getTeamById(teamId);
            const team = await response.json()
            await TeamService.removePlayerFromTeam(team,player)
        } catch (error) {
            console.error("Failed to add player to team:", error);
        }
    }

    const [players, setPlayers] = useState<any>([]);
    const [TeamPlayers, setTeamPlayers] = useState<any>([]);

    

    useEffect(() => {
      const fetchPlayers = async() => {
        const response = await PlayerService.getAllPlayers()
        const data = await response.json()
        setPlayers(data);
      };
      fetchPlayers();
    }, []);
    
    useEffect(() => {
        const fetchTeam = async() => {
            const response = await TeamService.getTeamById(teamId)
            const data = await response.json()
            setTeamPlayers(data);
        };
        fetchTeam();
    }, []);

    const existPlayer = (playerId: number) => {     //async olmadigi icin yok var oldu
        if (!TeamPlayers || TeamPlayers.length === 0) {
            return false;
        }
        for(const player of TeamPlayers.players) {
            if(player.id === playerId) {
                return true
            }

        }
        return false
    }

    
    return (
        <>

            <section className="mt-5">
                <table>
                    <thead>
                        <tr>
                            <th scope="col">Name</th>
                            <th scope="col">Position</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {players.map((player) => (
                        <tr>
                            <td>{player.user?.lastName + ' ' + player.user?.firstName}</td>
                            <td>{player.position}</td>
                            <td>
                                {existPlayer(player.id) ? (
                                    <button  onClick={() => removePlayerFromTeam(player)}>Rem</button>

                                ) : (
                                    <button className="bg-red-500"onClick={() => addPlayerToTeam(player)}>Add</button>
                                )}
                            </td>
                            
                        </tr>
                        ))}
                    </tbody>
                </table>
            </section>
        </>
    )
}

export default PlayerOverview
