import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model, PipelineStage, QueryOptions } from 'mongoose';
import { Stores, StoreDocument } from 'src/stores/stores.schema';
import { pipeline } from 'stream';

@Injectable()
export class StoresRepository {
  constructor(
    @InjectModel(Stores.name) private storeModel: Model<StoreDocument>,
  ) {}

  async findOne(storeFilterQuery: FilterQuery<Stores>): Promise<Stores> {
    try {
      return this.storeModel.findOne(storeFilterQuery);
    } catch (err) {
      console.error('Failed to fine one : ', err);
    }
  }

  async findById(storeFilterQuery: string): Promise<Stores> {
    try {
      return this.storeModel.findById(storeFilterQuery);
    } catch (err) {
      console.log(err);
    }
  }

  async find(storeFilterQuery: FilterQuery<Stores>): Promise<Stores[]> {
    try {
      return this.storeModel.find(storeFilterQuery);
    } catch (err) {
      console.error('Failed to fine : ', err);
    }
  }


  async findOptions(storeFilterQuery: FilterQuery<Stores>, QueryOptions): Promise<Stores[]> {
    try {
      return this.storeModel.find(storeFilterQuery).skip(QueryOptions["skip"]).limit(QueryOptions["limit"]);
    } catch (err) {
      console.error('Failed to fine : ', err);
    }
  }

  async aggregate( pipeline: PipelineStage[]): Promise<Stores[]> {
    try{
      return this.storeModel.aggregate(pipeline);
    } catch(err) {
      console.error("fail to aggregate", err)
    }
  }

  async findPrice(storeFilterQuery: FilterQuery<Stores>,minPrice,maxPrice): Promise<Stores[]> {
    try {
      return this.storeModel.find(storeFilterQuery, {
        name: 1,
        state: 1,
        city: 1,
        category: 1,
        address: 1,
        'menu.$': 1  
    });
    } catch (err) {
      console.error('Failed to fine : ', err);
    }
  }

  async update(storeId: string, updateData: Partial<Stores>): Promise<Stores> {
    try {
      const updatedStore = await this.storeModel.findByIdAndUpdate(
        storeId,
        { $set: updateData },
        { new: true },
      );
      return updatedStore;
    } catch (err) {
      console.error('Failed to update store: ', err);
      throw err;
    }
  }

}
