import { Injectable } from '@angular/core';
import { Appointment } from '../../../shared/Appointment';
import {
  AngularFireDatabase,
  AngularFireList,
  AngularFireObject,
} from '@angular/fire/compat/database';

@Injectable({
  providedIn: 'root',
})
export class AppointmentService {
  bookingListRef: AngularFireList<any>;
  bookingRef: AngularFireObject<any>;

  constructor(private db: AngularFireDatabase) {
    this.bookingListRef = this.db.list('/canciones');
  }

  // Create
  createBooking(apt: Appointment) {

    return this.bookingListRef.push({
      title: apt.title,
      artist: apt.artist,
      album: apt.album,
      duration: apt.duration,
    });
  }

  // Get Single
  getBooking(id: string) {
    this.bookingRef = this.db.object('/canciones/' + id);
    return this.bookingRef;
  }

  // Get List
  getBookingList() {
    this.bookingListRef = this.db.list('/canciones');
    return this.bookingListRef;
  }

  // Update
  updateBooking(id: string, apt: Appointment) {
    return this.bookingRef.update({
      title: apt.title,
      artist: apt.artist,
      album: apt.album,
      duration: apt.duration,
    });
  }

  // Delete
  deleteBooking(id: string) {
    this.bookingRef = this.db.object('/canciones/' + id);
    this.bookingRef.remove();
  }
}
