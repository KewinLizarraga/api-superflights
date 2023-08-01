import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { FlightService } from './flight.service';
import { FlightDTO } from './dto/flight.dto';
import { PassengerService } from '../passenger/passenger.service';

@ApiTags('flights')
@Controller('api/v1/flight')
export class FlightController {
  constructor(
    private readonly flightService: FlightService,
    private readonly passengerService: PassengerService,
  ) {}

  @Post()
  create(@Body() flightDto: FlightDTO) {
    return this.flightService.create(flightDto);
  }

  @Get()
  findAll() {
    return this.flightService.getAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.flightService.getOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() flightDto: FlightDTO) {
    return this.flightService.update(id, flightDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.flightService.remove(id);
  }

  @Post(':flightId/passenger/:passengerId')
  async addPassenger(
    @Param('flightId') flightId: string,
    @Param('passengerId') passengerId: string,
  ) {
    await this.passengerService.getOne(passengerId);
    return this.flightService.addPassenger(flightId, passengerId);
  }
}
