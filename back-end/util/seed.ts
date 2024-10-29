import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()

const main = async () => {
    await prisma.team.deleteMany()
    await prisma.coach.deleteMany()
    await prisma.player.deleteMany()
    await prisma.user.deleteMany()

    const admin = await prisma.user.create({
        data: {
                username: 'admin',
                password: await bcrypt.hash('admin123', 12),
                    firstName: 'Admin',
                    lastName: 'Istrator',
                    email: 'admin.istrator@brax.be',
                    role: 'admin',
                }
            },
    )

    const elkes = await prisma.player.create({
        data: {
            user: {
                create: {
                    username: 'elkes',
                    password: await bcrypt.hash('elkes123', 12),
                    firstName: 'Elke',
                    lastName: 'Steegmans',
                    email: 'elke.steegmans@ucll.be',
                    role: 'player',
                }
            },
            position: 'defender'
        }
    })

    const greetjej = await prisma.player.create({
        data: {
            user: {
                create: {
                    username: 'greetjej',
                    password: await bcrypt.hash('greetjej123', 12),
                    firstName: 'Greetje',
                    lastName: 'Jongen',
                    email: 'greetje.jongen@ucll.be',
                    role: 'player',
                }
            },
            position: 'midfielder'
        }
    })

    const johanp = await prisma.coach.create({
        data: {
            user: {
                create: {
                    username: 'johanp',
                    password: await bcrypt.hash('johanp123', 12),
                    firstName: 'Johan',
                    lastName: 'Pieck',
                    email: 'johan.pieck@ucll.be',
                    role: 'coach',
                }
            },
            level: 1
        }
    })

    const rudis = await prisma.player.create({
        data: {
            user: {
                create: {
                    username: 'rudis',
                    password: await bcrypt.hash('rudis123', 12),
                    firstName: 'Rudi',
                    lastName: 'Swennen',
                    email: 'rudi.swennen@ucll.be',
                    role: 'player',
                }
            },
            position: 'goalkeeper'
        }
    })

    const pieterg = await prisma.player.create({
        data: {
            user: {
                create: {
                    username: 'pieterg',
                    password: await bcrypt.hash('pieterg123', 12),
                    firstName: 'Pieter',
                    lastName: 'Geens',
                    email: 'pieter.geens@ucll.be',
                    role: 'player',
                }
            },
            position: 'midfielder'
        }
    })

    const tiebev = await prisma.coach.create({
        data: {
            user: {
                create: {
                    username: 'tiebev',
                    password: await bcrypt.hash('tiebev123', 12),
                    firstName: 'Tiebe',
                    lastName: 'Van Nieuwenhove',
                    email: 'tiebe.vannieuwenhove@ucll.be',
                    role: 'coach',
                }
            },
            level: 2
        }
    })

    const teamUCLL = await prisma.team.create({
        data: {
            name: 'UCLL',
            coach: {
                connect: { id: johanp.id },  // Coach'u ilişkilendirme
            },
            players: {
                connect: [{ id: elkes.id }],
            },
        },
    })
    
    const KUL = await prisma.team.create({
        data: {
            name: 'KUL',
            coach: { connect: { id: tiebev.id } },
            players: { connect: { id: rudis.id } },
        },
    });

}

(async () => {
    try {
        await main()
        await prisma.$disconnect()
    } catch (error) {
        console.error(error)
        await prisma.$disconnect()
        process.exit(1)
    }
})()
