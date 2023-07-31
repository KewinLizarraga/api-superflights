import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

import { PassengerDTO } from './dto/passenger.dto';
import { PassengerService } from './passenger.service';

@Controller('api/v1/passenger')
export class PassengerController {
  constructor(private readonly passengerService: PassengerService) {}

  @Post()
  create(@Body() passengerDto: PassengerDTO) {
    return this.passengerService.create(passengerDto);
  }

  @Get()
  findAll() {
    return this.passengerService.getAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.passengerService.getOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() passengetDto: PassengerDTO) {
    return this.passengerService.update(id, passengetDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.passengerService.remove(id);
  }
}
