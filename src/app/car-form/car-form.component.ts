import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'; // To retrieve a passed path variable (e.g., an 'id' in a URL like '/cars/1')
import { CarService } from '../car.service';
import { Car } from '../car.model';
import { CommonModule } from '@angular/common'; // For *ngFor and *ngIf
import { RouterModule, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-car-form',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './car-form.component.html',
  styleUrl: './car-form.component.css'
})
export class CarFormComponent {

  car: Car | null = null;
  carId: number = -1;

  editing = false;

  carForm: FormGroup;

  constructor(
    private route: ActivatedRoute, 
    private router: Router, 
    private carService: CarService, 
    private fb: FormBuilder 
  ) {
      this.carForm = this.fb.group({
        id: [''],
        model: ['', Validators.required],
        carClass: ['', Validators.required],
        modelCode: ['', Validators.required],
        year: ['', [Validators.min(1886), Validators.max(new Date().getFullYear())]]
      });
  }

  ngOnInit(): void {

    // Retrieve the 'id' path variable from the route
    this.route.paramMap.subscribe(params => {
      
      this.carId = Number(params.get('id'));

      // Fetch car details using the 'id'
      if (this.carId) {
        this.editing = true;
        this.carService.getCarById(this.carId).subscribe((car) => {
          this.car = car;
          this.carForm.setValue(car);
        });
      }
    });
  }

  onCreate(): void {

    if (!this.carForm.valid) {
      return;
    }

    const carData: Car = this.carForm.value;
    
    this.carService.createCar(carData).subscribe((response) => {
      console.log('Created car successfully', response);
      this.router.navigate(['/cars']);
    });
  }

  onUpdate(): void {

    if (!this.carForm.valid) {
      return;
    }

    const carData: Car = this.carForm.value;
    
    this.carService.updateCar(this.carId, carData).subscribe((response) => {
      console.log('Updated car successfully', response);
      this.router.navigate(['/cars', this.carId]);
    });
  }
}