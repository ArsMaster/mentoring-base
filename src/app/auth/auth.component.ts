import { Component } from '@angular/core';
import { MatButtonModule, MatIconAnchor } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-auth',
  imports: [MatButtonModule, MatDialogModule],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss'
})
export class AuthComponent {

}
