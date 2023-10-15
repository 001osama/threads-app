import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommentComponent } from "../components/comment/comment.component";
import { CommentService } from '../services/comment.service';
import { Comment } from '../interfaces/comment.interface';
import { CommentFormComponent } from "../components/comment-form/comment-form.component";
import { UserService } from '../service/user.service';

@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    imports: [CommonModule, CommentComponent, CommentFormComponent]
})
export class HomeComponent implements OnInit{
    commentService = inject(CommentService);
    userService = inject(UserService);
    comments = signal<Comment[]>([]);
    ngOnInit(): void{
        this.getComments();
    }

    createComment(formValue:{text:string}){
        const {text} = formValue;
        const user = this.userService.getUserFromStorage();
        if(!user)
        return;
        this.commentService.createComment({
            text:text,
            userId: user._id,
        })
        .subscribe((createdComment)=>{
            this.comments.set([createdComment,...this.comments()]);
        });
    }

    getComments(){
        this.commentService.getComments()
        .subscribe((comments) => this.comments.set(comments));
    }

    commentTrackBy(index:number, comment: Comment){
        return comment._id;
    }

}
