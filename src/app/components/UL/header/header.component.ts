import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { USERS } from 'src/app/moduls/users';
import { FormService } from 'src/app/services/form.service';
import { UsersService } from 'src/app/services/users.service';
import { ImportantComponent } from '../../important/important.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(public dialog: MatDialog,  public usersServ:UsersService ) {}
  flag! :boolean
  ngOnInit(): void { 
   }


  openDialog(): void {
    const dialogRef = this.dialog.open(ImportantComponent, {
      data: {},
      width: '70%',
      height: '70%',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe();
  }
  



}
