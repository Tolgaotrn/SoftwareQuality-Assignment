import TeamService from "@services/TeamService";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react"

const TeamsOverview: React.FC = () => {
    const [teams, setTeams] = useState<any>([]);
    const router = useRouter()

    useEffect(() => {
        const fetchTeams = async() => {
            const response = await TeamService.getAllTeams();
            const data = await response.json();
            setTeams(data);
        };
        fetchTeams()
    }, []);

    const handleTeamClick = (teamId: number) => {
        router.push(`/players/${teamId}`)
    }

    return (
        <>
                <table className="mt-6">
                    <thead>
                        <tr>
                            <th scope="col">Name</th>
                            <th scope="col">Coach</th>
                            <th scope="col">Number of players</th>
                        </tr>
                    </thead>
                    <tbody>
                        {teams.map((team) => (
                            <tr key={team.id} onClick={() => handleTeamClick(team.id)}>
                                <td >{team.name}</td>
                                <td>{(team.coach?.user?.lastName +  ' '  + team.coach?.user?.firstName)}</td>
                                <td>{team.players?.length}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
        </>
    )
}

export default TeamsOverview
