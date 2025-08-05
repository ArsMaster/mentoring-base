import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AsyncPipe, DatePipe, NgIf } from '@angular/common';
import { ChangeColor } from '../../directives/change-color.directive';
import { MatDialog } from '@angular/material/dialog';
import { AuthComponent } from '../../auth/auth.component';
import { UserService } from '../../user.service';


const newPages : number[] = [5,4,3,2,1]

const menuItems : string[] = ['Каталог', 'Стройматериалы', 'Инструменты', 'Электрика', 'Интерьер и одежда']
const upperCasemenuItems : string[] = menuItems.map(
  (item : string) => {
    return item.toUpperCase()
  }
)

@Component({
    selector: 'app-header',
    imports: [RouterLink, DatePipe, ChangeColor, AsyncPipe, NgIf],
    templateUrl: './header.component.html',
    styleUrl: './header.component.scss',
    standalone: true
})
export class HeaderComponent {
isShowCatalog : boolean = true;
  isShowAboutCompany : boolean = true;

  readonly navItem1 : "Главная" = 'Главная';
  readonly aboutCompany : "О компании" = 'О компании';
  readonly navItem3 : "Каталог" = 'Каталог';

  readonly dialog = inject(MatDialog);

  public readonly userService = inject (UserService)

  isShowImg : boolean = true;

  readonly newPages : number[] = newPages;

  menuItems : string[] = upperCasemenuItems;

  isUpperCase : boolean = true;

  currentDate: Date = new Date();

  changeMenuText(): void {
    this.menuItems = upperCasemenuItems.map(
      (item: string): string => this.isUpperCase 
      ? item.toLowerCase() 
      : item.toUpperCase()
    );

    this.isUpperCase = !this.isUpperCase;
  }

  public openDialog(): void {
    const dialogRef = this.dialog.open(AuthComponent, {
      width: '400px',
      height: '200px',
  });

  dialogRef.afterClosed().subscribe((result: string) => {
    if (result === 'admin') {
      this.userService.loginAsAdmin()
    } else if (result === 'user') {
      this.userService.loginAsUser()
    } else return undefined;
      }
    );
  }

  public logout() {
    if (confirm('Вы точно хотите выйти?')){
      return this.userService.logout();
    }
    else return false;
  }
}