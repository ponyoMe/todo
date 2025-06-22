import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Todo } from './entities/todo.entity';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Todo)
    private todosRepository : Repository<Todo>
  ){}

  async findAll() : Promise<Todo[]>{
    return this.todosRepository.find()
  }

  async findById(id:number){
    return this.todosRepository.findOneBy({id})
  }

  async create(description: string) : Promise<Todo>{
    const newTodo = this.todosRepository.create({description})
    return this.todosRepository.save(newTodo)
  }

  async toggleComplete(id:number) : Promise<Todo>{
    const todo = await this.todosRepository.findOneBy({id})
    if (!todo) throw new Error("Todo not found!")
    todo.completed = !todo.completed
   return this.todosRepository.save(todo)
    
  }

  async update(id:number, description:string){
    const todo = await this.todosRepository.findOneBy({id})
    if (!todo) throw new Error("Todo not found!")
      todo.description = description
    return this.todosRepository.save(todo)
  }

  async delete(id: number) : Promise<void>{
    await this.todosRepository.delete(id)
  }
}
