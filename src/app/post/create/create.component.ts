import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostService } from '../post.service';
import { Router } from '@angular/router';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';

import { Post } from '../post';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create.component.html',
  styleUrl: './create.component.css'
})
export class CreateComponent {

  
  urlRegEx =
    '[-a-zA-Z0-9@:%_+.~#?&//=]{2,256}(.[a-z]{2,4})?\b(/[-a-zA-Z0-9@:%_+.~#?&//=]*)?';

  post!: Post;
  form!: FormGroup;
  errorMessage!: string;

  /*------------------------------------------
  --------------------------------------------
  Created constructor
  --------------------------------------------
  --------------------------------------------*/
  constructor(
    public postService: PostService,
    private router: Router
  ) {
    // this.form = new FormGroup({
    //   url: new FormControl('', {
    //     validators: [Validators.required, Validators.pattern(this.urlRegEx)],
    //     updateOn: 'blur',
    //   }),
    // });
  }

  /**
   * Init Method
   *
   * @return response()
   */
  ngOnInit(): void {
    this.form = new FormGroup({
      actualLink: new FormControl('', 
        { validators: [Validators.required] })

    });
  }

  /**
   * Write code on Method
   *
   * @return response()
   */
  get f() {
    return this.form.controls;
  }

  /**
   * Method to to submit the data to the rest API to create the mapping and 
   * redirect to view page to display the generated minilink URL.
   *
   * @return response()
   */
  submit() {
    console.log(this.form.value);
    this.postService.create(this.form.value).subscribe((res: any) => {
      console.log('Post created successfully!');
      console.log(res);
      this.post = res;
      //navagate to view component
      this.router.navigate(['post', this.post.miniLink, 'view']);
    },(error) => {
      this.errorMessage = error;
    })
  }

}