import { PropertiesDB } from 'src/common';

class CommonCharts {
  location: string;
  count: number;
}

class UnitCharts {
  status: string;
  count: number;
}

export class ResDashboardHomeDTO {
  charts: {
    hasBeenUpdated: CommonCharts[];
    pieCharts: {
      statisctisUpdated: {
        olderOneMonth: number;
        lastUpdate: number;
      };
      units: UnitCharts[];
      luasan: {
        a: CommonCharts[];
        b: CommonCharts[];
        c: CommonCharts[];
        d: CommonCharts[];
        e: CommonCharts[];
      };
    };
    jumlahProperty: CommonCharts[];
  };
  tabels: Partial<PropertiesDB>[];
}

// nge, <100, 100-200, 200-500, 500-1000, >1000

// - [x] list property dari yang terakhir di update (bentuk tabel)
// - [x] pie chart perbandingan data sudah di update dan belum di update dalam waktu 1 bulan
// - [x] chart count data yang sudah di update dalam 1,5 bulan
// - [ ] pie chart jumlah unit dengan status furnished, bare and partisi
// - [ ] pie chart isinya 5 jumlah luasan
// - [ ]  ⁠tambahan chart / tab : untuk luasan under 100,100- 200, (area dan luas)
