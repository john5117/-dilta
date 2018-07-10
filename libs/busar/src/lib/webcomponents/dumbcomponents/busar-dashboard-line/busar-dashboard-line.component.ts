import { Component } from '@angular/core';

@Component({
  selector: 'busar-dashboard-line',
  templateUrl: './busar-dashboard-line.component.html',
  styleUrls: ['./busar-dashboard-line.component.scss']
})
export class BusarDashboardLineComponent {

  single: any[];
  multi: any[];

  view: any[] = [450, 300];

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Country';
  showYAxisLabel = true;
  yAxisLabel = 'Population';

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  // line, area
  autoScale = true;

  constructor() {
    Object.assign(this, {single, multi});
  }

  onSelect(event) {
    console.log(event);
  }

}

const single = [
  {
    'name': 'Germany',
    'value': 8940000
  },
  {
    'name': 'USA',
    'value': 5000000
  },
  {
    'name': 'France',
    'value': 7200000
  }
];

const multi = [
  {
    'name': 'Germany',
    'series': [
      {
        'name': '2010',
        'value': 7300000
      },
      {
        'name': '2011',
        'value': 8940000
      }
    ]
  }
];
