import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { ToastService } from '../toast/toast.service';

export interface ITest {
  id?: number;
  testName: string;
  pointsPossible: number;
  pointsReceived: number;
  percentage: number;
  grade: string;
}
@Component({
  selector: 'app-test-score',
  templateUrl: './test-score.component.html',
  styleUrls: ['./test-score.component.css']
})
export class TestScoreComponent implements OnInit {

  tests: Array<ITest> = [];
  testParams: '';
  constructor(
    private http: Http,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private toastService: ToastService
  ) { }

  async ngOnInit() {
    this.tests = await this.loadTests();
  }

  async loadTests() {
    const tests = await this.http.get('assets/tests.json').toPromise();
    this.tests = tests.json();
    return tests.json();
  }
  addTest() {
    const test: ITest = {
      id: null,
      testName: null,
      pointsPossible: null,
      pointsReceived: null,
      percentage: null,
      grade: null
    };
    this.tests.unshift(test);
  }
  deleteTest(index: number) {
    this.tests.splice(index, 1);
  }

  compute(name: string) {

    const namelist = {
      id: 1,
      name: name,
    };
    
    if (name === '') {
      this.toastService.showToast('danger', 2000, 'Name must not be null');
    }

    const data = this.calculate();
    this.router.navigate(['my-tests'], data);

  }

  calculate() {
    const total = 0;
    for (const t of this.tests) {
      total += [t.pointsPossible];
    }
    const totalPoints = 0;
    for (const t of this.tests) {
      totalPoints += [t.pointsReceived];
    }
    return {
      totalPointsPossible: total,
      totalPointsReceived: totalPoints,
      totalPercentage: total / totalPoints,
    };
  }

  getItemsFromLocalStorage(key: string) {
    const savedTests = JSON.parse(localStorage.getItem(key));
    return savedTests;
  }
  saveToLocalStorage() {
    localStorage.setItem('tests', JSON.stringify(this.tests));
    this.toastService.showToast('success', 3000, 'Success! Items are saved!');
  }



}
