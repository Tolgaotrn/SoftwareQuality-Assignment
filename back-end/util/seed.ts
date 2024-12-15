import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()

const main = async () => {
    // Delete all existing users (optional, for testing purposes)
    await prisma.user.deleteMany()

    // Create the admin user
    const admin = await prisma.user.create({
        data: {
            username: 'admin',
            password: await bcrypt.hash('admin123', 12),
            firstName: 'Admin',
            lastName: 'Istrator',
            email: 'admin.istrator@brax.be',
            role: 'admin',
        },
    })

    // Create the coordinator user
    const coordinator = await prisma.user.create({
        data: {
            username: 'user',
            password: await bcrypt.hash('user123', 12),
            firstName: 'Coord',
            lastName: 'Inator',
            email: 'coordinator.inator@brax.be',
            role: 'coordinator',
        },
    })

    console.log('Admin and Coordinator users created:', { admin, coordinator })
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
