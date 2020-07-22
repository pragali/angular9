import {Subject} from 'rxjs/Subject'
import { Excercise } from './excercise.model';


export class TrainingService{
    excerciseChanged = new Subject<Excercise>();
    availableExcercises: Excercise[] = [
        {id: 'crunches', name: 'Crunches', duration:30, calories:8},
        {id: 'touch-toes', name: 'Touch Toes', duration:180, calories:100},
        {id: 'side-lunges', name: 'Slide Lunges', duration:30, calories:8},
        {id: 'burpees', name: 'Burpees', duration:30, calories:8}
    ];

    private runningExercise: Excercise;
    private exercises: Excercise[] = [];

    getAvailExcercises(){
        return this.availableExcercises.slice();
    }

    startExcercise(selectedId: string){
        const selectedExcercise = this.availableExcercises.find(ex => ex.id === selectedId);
        this.runningExercise= selectedExcercise;
        this.excerciseChanged.next({ ...this.runningExercise});
    }

    completeExercise() {
        this.exercises.push({
          ...this.runningExercise,
          date: new Date(),
          state: 'completed'
        });
        this.runningExercise = null;
        this.excerciseChanged.next(null);
      }
    
      cancelExercise(progress: number) {
        this.exercises.push({
          ...this.runningExercise,
          duration: this.runningExercise.duration * (progress / 100),
          calories: this.runningExercise.calories * (progress / 100),
          date: new Date(),
          state: 'cancelled'
        });
        this.runningExercise = null;
        this.excerciseChanged.next(null);
      }

    getRunningExcercise(){
        return { ...this.runningExercise};
    }

    getCompletedorCancelledExcercises(){
        return this.exercises.slice();
    }
}