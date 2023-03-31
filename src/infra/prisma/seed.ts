import { PrismaClient } from '@prisma/client';
import { EmployeeSeed } from './seedEmployee';
const prisma = new PrismaClient();
async function main() {
  await EmployeeSeed(prisma);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
