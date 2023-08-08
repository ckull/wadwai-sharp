import { Injectable } from '@nestjs/common';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Address } from '@prisma/client';
@Injectable()
export class AddressService {
  constructor(private prisma: PrismaService) {}

  create(createAddressDto: CreateAddressDto): Promise<Address> {
    const { street, city, state, zip, userId, firstName, lastName, telephone } =
      createAddressDto;
    return this.prisma.address.create({
      data: {
        firstName,
        lastName,
        telephone,
        street,
        city,
        state,
        zip,
        User: {
          connect: { uid: userId }, // Connect to the User based on the userId (Firebase Auth UID)
        },
      },
    });
  }

  findAll(): Promise<Address[]> {
    return this.prisma.address.findMany();
  }

  findOne(uid: string): Promise<Address[] | null> {
    return this.prisma.address.findMany({
      where: {
        userId: {
          equals: uid,
        },
      },
    });
  }

  update(id: string, updateAddressDto: UpdateAddressDto) {
    return this.prisma.address.update({
      where: { id },
      data: updateAddressDto,
    });
  }

  remove(id: string) {
    return this.prisma.address.delete({
      where: { id },
    });
  }
}
