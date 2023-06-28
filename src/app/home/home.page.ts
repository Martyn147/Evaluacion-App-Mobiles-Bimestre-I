import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppointmentService } from '../shared/appointment.service';
import { Appointment } from '../../../shared/Appointment';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  songId: string;
  song: Appointment;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private aptService: AppointmentService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.songId = params.get('id');
      this.aptService.getBooking(this.songId).valueChanges().subscribe(song => {
        this.song = song;
      });
    });
  }

  updateSong() {
    this.aptService.updateBooking(this.songId, this.song).then(() => {
      this.router.navigate(['/show-appointment']);
    });
  }
}
