import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { StoresService } from './stores.service';
import { Stores } from './stores.schema';
import { StoreReturnDTO, StoresReturnDTO } from './stores.DTO';
import { ObjectId } from 'typeorm';

@Controller('stores')
export class StoresController {
  constructor(private readonly storeService: StoresService) {}

  @Get(':storeId')
  async getStoreName(
    @Param('storeId') storeId: string,
  ): Promise<StoreReturnDTO> {
    return await this.storeService.getStoreById(storeId);
  }

  @Get()
  @HttpCode(200)
  async getStores(
    @Query('category') category?: string,
    @Query('location') location?: string,
    @Query('search') search?: string,
    @Query('page') page?: number,
    @Query('limit') limit?: number,
    @Query('minPrice') minPrice?: number | "null",
    @Query('maxPrice') maxPrice?: number| "null",
  ): Promise<StoresReturnDTO[] | void> {
    if (page && limit){
      console.log("here")
      return await this.storeService.pagination(page,limit);
    } else {
      return await this.storeService.getStoresBy(
        category,
        location,
        search,
        minPrice,
        maxPrice,
      );
    }

    }
  
}
