import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

const newPages : number[] = [5,4,3,2,1]

const menuItems : string[] = ['Каталог', 'Стройматериалы', 'Инструменты', 'Электрика', 'Интерьер и одежда']
const upperCasemenuItems : string[] = menuItems.map(
  (item : string) => {
    return item.toUpperCase()
  }
)

@Component({
    selector: 'app-header',
    imports: [NgFor, NgIf, RouterLink],
    templateUrl: './header.component.html',
    styleUrl: './header.component.scss'
})
export class HeaderComponent {
isShowCatalog : boolean = true;
  isShowAboutCompany : boolean = true;

  readonly navItem1 : "Главная" = 'Главная';
  readonly aboutCompany : "О компании" = 'О компании';
  readonly navItem3 : "Каталог" = 'Каталог';

  isShowImg : boolean = true;

  readonly newPages : number[] = newPages;

  menuItems : string[] = upperCasemenuItems;

  isUpperCase : boolean = true;

  changeMenuText(): void {
    this.menuItems = upperCasemenuItems.map(
      (item: string): string => this.isUpperCase 
      ? item.toLowerCase() 
      : item.toUpperCase()
    );

    this.isUpperCase = !this.isUpperCase;
  }
}
