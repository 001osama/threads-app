import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { UserService } from './service/user.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterLinkActive,RouterOutlet, RouterLink],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  userService = inject(UserService);

  constructor(){
    const user = this.userService.getUserFromStorage();
    if(!user){
      const randomNumber = Math.ceil(Math.random() * 4000 + 1000);
      const randomName = `user_${randomNumber}`; 
      this.userService.createUser(randomName)
      .subscribe(user => {
        console.log('user created', user);
        this.userService.saveUserToStorage(user);
      });
    }
  }

  title = 'threads-app';
}
