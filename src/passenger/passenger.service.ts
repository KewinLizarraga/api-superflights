import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { IPassenger } from '../common/interfaces/passenger.interface';
import { PASSENGER } from '../common/models/models';
import { PassengerDTO } from './dto/passenger.dto';

@Injectable()
export class PassengerService {
  constructor(
    @InjectModel(PASSENGER.name)
    private readonly model: Model<IPassenger>,
  ) {}

  async create(passengerDto: PassengerDTO): Promise<IPassenger> {
    const newPassenger = await this.model.create(passengerDto);
    return newPassenger;
  }

  async getAll(): Promise<IPassenger[]> {
    return await this.model.find();
  }

  async getOne(id: string): Promise<IPassenger> {
    const passenger = await this.model.findOne({ _id: id });
    if (!passenger) {
      throw new NotFoundException('Passenger not found');
    }
    return passenger;
  }

  async update(id: string, passengerDto: PassengerDTO): Promise<IPassenger> {
    await this.getOne(id);
    return await this.model.findByIdAndUpdate(id, passengerDto, { new: true });
  }

  async remove(id: string): Promise<any> {
    await this.getOne(id);
    await this.model.deleteOne({ _id: id });
  }
}
