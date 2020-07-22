import { Component, OnInit, Output } from '@angular/core';
import { TrainingService } from '../training.service';
import { Excercise } from '../excercise.model';
import { NgForm } from '@angular/forms';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit {
  @Output() trainingStart = new EventEmitter();
  excercises: Excercise[] =[];

  constructor(private trainingService: TrainingService) { }

  ngOnInit(): void {
    this.excercises = this.trainingService.getAvailExcercises();
  }

  onStartTraining(form: NgForm){
    this.trainingService.startExcercise(form.value.excercise);
  }
}
