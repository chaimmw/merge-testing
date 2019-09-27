import { Component, OnInit } from "@angular/core";
import { BehaviorSubject, Observable, merge, Subject, interval } from "rxjs";
import { debounceTime, map } from "rxjs/operators";

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  name = "Angular";
  isDisplayed = false;
  newNum: number;
  newNum2: number;
  newNum3: number;
  pipedBehaviorSubjectNumber: Observable<number>;
  mergedObs$: Observable<number>;
  mergedObs2$: Observable<number>;
  mergedObs3$: Observable<number>;
  mergedObs4$: Observable<number>;

  mySubject = new Subject<number>();
  myBehaviorSubject = interval(3000);
  myBehaviorSubject2 = new BehaviorSubject<number>(0);

  ngOnInit() {
    this.pipedBehaviorSubjectNumber = this.myBehaviorSubject;

    this.mergedObs$ = merge(this.myBehaviorSubject, this.myBehaviorSubject2);

    this.mergedObs2$ = this.mergedObs$.pipe(
      map((nm) => nm * 2)
    );

    this.mergedObs3$ =  this.mergedObs$.pipe(
      map((nm3) => nm3 * 3)
    );

    this.mergedObs4$ = this.mergedObs$.pipe(
      map((nm4) => nm4 * 4)
    );
  }

  setNewNumber(num: number) {
    this.myBehaviorSubject.next(num);
  }

  setNewNumber2(num: number) {
    this.myBehaviorSubject2.next(num);
  }

  setNewNumber3(num: number) {
    this.mySubject.next(num);
  }

  toggleDisplay() {
    this.isDisplayed = !this.isDisplayed;
  }
}
