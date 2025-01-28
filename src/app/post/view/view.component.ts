import { Component } from '@angular/core';
  
import { PostService } from '../post.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from '../post';

import { Clipboard } from '@angular/cdk/clipboard';
  
@Component({
  selector: 'app-view',
  standalone: true,
  imports: [],
  templateUrl: './view.component.html',
  styleUrl: './view.component.css'
})
export class ViewComponent {
  
  id!: number;
  minilink!: string;
  post!: Post;
  btn1text = "Copy";
      
  /*------------------------------------------
  --------------------------------------------
  Created constructor
  --------------------------------------------
  --------------------------------------------*/
  constructor(
    public postService: PostService,
    private route: ActivatedRoute,
    private router: Router,
    private clipboard: Clipboard
   ) { }
      
  /**
   * Init method
   *
   * @return response()
   */
  ngOnInit(): void {
   
    //Creating the request object for the API to call
    this.post = {id:0 ,actualLink:"", miniLink: this.route.snapshot.params['postId']};
    
  }

  /**
   * This method is used for copying the data to clipboard feature.
   */
  copyToClipboard() {
    this.clipboard.copy(this.post.miniLink);
    this.btn1text = "Copied";
    setTimeout(() => {
      this.btn1text = "Copy";
    }, 1000);
  }
  
}