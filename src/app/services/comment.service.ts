import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Comment } from '../interfaces/comment.interface';
import { environment } from '../environment';

type CreateCommentDto = {
  parentId?:string,
  userId:string,
  text:string,
}


@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor() { }
  http = inject(HttpClient);

  getComments(parentId: string = ''){
    let url = `${environment.apiBaseUrl}/comments`;
    if(parentId){
      url += `?parentId=${parentId}`;
    }
    return this.http.get<Comment[]>(url);
  }

  createComment(comment:CreateCommentDto){
    return this.http.post<Comment>(`${environment.apiBaseUrl}/comments`,comment);
  }
}
