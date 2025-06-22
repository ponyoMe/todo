import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('todos')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getAll(){
    return this.appService.findAll()
  }

  @Get(':id')
  getById(@Param('id') id:number){
      return this.appService.findById(id)
  }

  @Post()
  create(@Body('description') description:string){
      return this.appService.create(description)
  }

  @Patch(':id/toggle')
  toggle(@Param('id')id:number){
    return this.appService.toggleComplete(+id)
  }

  @Patch(':id')
  update(@Param('id') id:number, @Body('description') description : string){
    return this.appService.update(id, description)
  }

  @Delete(':id')
  delete(@Param('id') id: number){
     return this.appService.delete(id)
  }
}
