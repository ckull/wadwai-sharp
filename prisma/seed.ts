// import { PrismaClient } from '@prisma/client';
// import { faker } from '@faker-js/faker';

// const prisma = new PrismaClient();

// async function seed() {
//   // Create users
//   for (let i = 0; i < 5; i++) {
//     await prisma.user.create({
//       data: {
//         email: faker.internet.email(),
//         firstName: faker.person.firstName(),
//         lastName: faker.person.lastName(),
//         Address: {
//           create: [
//             {
//               street: faker.location.streetAddress(),
//               city: faker.location.city(),
//               state: faker.location.state(),
//               zip: faker.location.zipCode(),
//             },
//           ],
//         },
//       },
//     });
//   }

//   // Create products with inventory
//   for (let i = 0; i < 5; i++) {
//     const product = await prisma.product.create({
//       data: {
//         name: faker.commerce.productName(),
//         price: parseFloat(faker.commerce.price()),
//       },
//     });

//     await prisma.inventoy.create({
//       data: {
//         quantity: faker.number.int({ min: 1, max: 10 }),
//         productId: product.id,
//       },
//     });
//   }
// }

// seed()
//   .catch((error) => console.error(error))
//   .finally(async () => {
//     await prisma.$disconnect();
//   });
