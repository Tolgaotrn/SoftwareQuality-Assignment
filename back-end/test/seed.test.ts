import database from '../util/database';

describe('Seed Admin User', () => {
    it('should fetch the admin user from the database', async () => {
        const adminUser = await database.user.findFirst({
            where: { username: 'admin' },
        });
        expect(adminUser).toBeTruthy();
        expect(adminUser?.username).toBe('admin');
        expect(adminUser?.role).toBe('admin');
    });

    afterAll(async () => {
        await database.$disconnect();
    });
});
