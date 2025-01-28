//import { Component } from '@angular/core';
  
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PostService } from '../post.service';
import { Post } from '../post';
import { Clipboard } from '@angular/cdk/clipboard';
import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
  
@Component({
  selector: 'app-index',
  standalone: true,
  imports: [CommonModule, RouterModule,MatFormFieldModule, MatInputModule, MatTableModule, MatSortModule, MatPaginatorModule],
  templateUrl: './index.component.html',
  styleUrl: './index.component.css'
})
export class IndexComponent implements AfterViewInit {
  
  displayedColumns: string[] = ['actualLink', 'miniLink'];
  dataSource!: MatTableDataSource<Post>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  posts: Post[] = [];
  btn1text = "Copy";
      
  /*------------------------------------------
  --------------------------------------------
  Created constructor
  --------------------------------------------
  --------------------------------------------*/
  constructor(public postService: PostService, private clipboard: Clipboard) { }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  
  /**
   * This method is invoked whenever users are trying to filter the data in the table
   * @param event 
   */
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  /**
   * Init Method
   *
   * @return response()
   */
  ngOnInit(): void {
    //Get all the actual and minilink mappings data from the repository 
    this.postService.getAll().subscribe((data: Post[])=>{
      this.posts = data;
      //set the data to Material Data Source Table
      this.dataSource = new MatTableDataSource(this.posts);
      console.log(this.posts);
      //Set the paginator and sort objects to the datasource
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
    
  }  
  
  /**
   * This method is used for copying the data to clipboard feature.
   * @param code 
   */
  copyToClipboard(code: string) {
    this.clipboard.copy(code);
    this.btn1text = "Copied";
    setTimeout(() => {
      this.btn1text = "Copy";
    }, 1000);
  }
}