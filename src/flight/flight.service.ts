import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { IFlight } from '../common/interfaces/flight.interface';
import { FLIGHT } from '../common/models/models';
import { FlightDTO } from './dto/flight.dto';

@Injectable()
export class FlightService {
  constructor(
    @InjectModel(FLIGHT.name)
    private readonly model: Model<IFlight>,
  ) {}

  async create(flightDto: FlightDTO): Promise<IFlight> {
    const newFlight = new this.model(flightDto);
    return await newFlight.save();
  }

  async getAll(): Promise<IFlight[]> {
    return await this.model.find().populate('passengers');
  }

  async getOne(id: string): Promise<IFlight> {
    const flight = await this.model.findOne({ _id: id }).populate('passengers');
    if (!flight) {
      throw new NotFoundException('Flight not found');
    }
    return flight;
  }

  async update(id: string, flightDto: FlightDTO): Promise<IFlight> {
    await this.getOne(id);
    return await this.model.findByIdAndUpdate(id, flightDto, { new: true });
  }

  async remove(id: string): Promise<void> {
    await this.getOne(id);
    await this.model.deleteOne({ _id: id });
  }

  async addPassenger(flightId: string, passengerId: string): Promise<IFlight> {
    return await this.model
      .findByIdAndUpdate(
        flightId,
        { $addToSet: { passengers: passengerId } },
        { new: true },
      )
      .populate('passengers');
  }
}
