import { Component, OnInit } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router'; // To retrieve a passed path variable (e.g., an 'id' in a URL like '/cars/1')
import { CarService } from '../car.service';
import { Car } from '../car.model';
import { CommonModule } from '@angular/common'; // For *ngFor and *ngIf

@Component({
  selector: 'app-car-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './car-detail.component.html',
  styleUrl: './car-detail.component.css'
})
export class CarDetailComponent implements OnInit {

  car: Car | null = null;
  carId: number = -1;

  constructor(private route: ActivatedRoute, private router: Router, private carService: CarService) {}

  ngOnInit(): void {

    // Retrieve the 'id' path variable from the route
    this.route.paramMap.subscribe(params => {
      
      this.carId = Number(params.get('id'));

      // Fetch car details using the 'id'
      if (this.carId) {
        this.carService.getCarById(this.carId).subscribe((car) => {
          this.car = car;
        });
      }
    });
  }

  onCarDelete() {
    this.carService.deleteCar(this.carId).subscribe((response) => {
      console.log('Deleted car successfully', response);
      this.router.navigate(['/cars']);
    });
  }
}
