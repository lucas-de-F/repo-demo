import { PrismaClient } from '@prisma/client';

export const EmployeeSeed = async (prisma: PrismaClient) => {
  await prisma.pre_Register.deleteMany();
  await prisma.role.deleteMany();
  await prisma.user.deleteMany();

  const setup = async () => {
    await prisma.role.createMany({
      data: [
        {
          name: 'User',
          id: 'ca21241b-a37d-4e6f-bbb6-26643d3cdd99',
        },
        {
          name: 'Admin',
          id: '6a203390-8389-49ca-aa0e-6a14ba7815bc',
        },
      ],
    });
  };
  await setup().then(async () => {
    await prisma.pre_Register.createMany({
      data: [
        {
          id: '32f2e6e3-a095-4d14-a5a1-273c27a41001',
          email: 'lucas.franca@activebi.com.br',
          name: 'Lucas França',
          identification: 'Dev',
          role_id: '6a203390-8389-49ca-aa0e-6a14ba7815bc',
        },
        {
          id: '32f2e6e3-a095-4d14-a5a1-273c27a41002',
          email: 'luiz@activebi.com.br',
          identification: 'Master',
          name: 'Luiz',
          role_id: '6a203390-8389-49ca-aa0e-6a14ba7815bc',
        },
      ],
    });
  });
};
