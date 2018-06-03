import {ModuleWithProviders, NgModule} from '@angular/core';
import {SharedModule} from '../shared/shared.module';
import {MAT_SNACK_BAR_DEFAULT_OPTIONS, MatPaginatorIntl, MatSidenavModule} from '@angular/material';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {HandleErrorInterceptor} from './security/handle-error-interceptor';
import {CommonModule} from '@angular/common';

const matPaginatorIntl = new MatPaginatorIntl();
Object.assign(matPaginatorIntl, {
  itemsPerPageLabel: '每页记录数',
  getRangeLabel: (page: number, pageSize: number, length: number) => {
    if (length === 0 || pageSize === 0) {
      return '无记录';
    }
    length = Math.max(length, 0);
    const startIndex = page * pageSize;
    const endIndex = startIndex < length ? Math.min(startIndex + pageSize, length) : startIndex + pageSize;
    return `第 ${startIndex + 1} - ${endIndex} 条 / 共 ${length} 条记录`;
  },
  firstPageLabel: '首页',
  lastPageLabel: '尾页',
  nextPageLabel: '下一页',
  previousPageLabel: '上一页'
});

export function MatPaginatorIntlFactory() {
  return matPaginatorIntl;
}

@NgModule({
  imports: [CommonModule, HttpClientModule],
  exports: [SharedModule, MatSidenavModule]
})
export class CoreModule {

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: CoreModule,
      providers: [
        {
          provide: MAT_SNACK_BAR_DEFAULT_OPTIONS,
          useValue: {duration: 1500, verticalPosition: 'top'}
        },
        {
          provide: HTTP_INTERCEPTORS,
          useClass: HandleErrorInterceptor,
          multi: true
        },
        {
          provide: MatPaginatorIntl,
          useFactory: MatPaginatorIntlFactory
        }
      ]
    };
  }

}
