import { Component, OnInit } from '@angular/core';
import { CarService } from '../car.service';
import { Car } from '../car.model';
import { CommonModule } from '@angular/common'; // For *ngFor and *ngIf
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-car-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './car-list.component.html',
  styleUrl: './car-list.component.css'
})
export class CarListComponent implements OnInit {

  cars: Car[] = [];

  constructor(private carService: CarService) {}

  ngOnInit(): void {
    this.carService.getAllCars().subscribe((data) => {
      this.cars = data;
    });
  }
}
