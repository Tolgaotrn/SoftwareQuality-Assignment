import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()

const main = async () => {

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
