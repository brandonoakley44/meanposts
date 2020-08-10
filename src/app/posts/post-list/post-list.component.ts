import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Post } from '../post.model';
import { PostsService } from '../posts.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css'],
})
export class PostListComponent implements OnInit, OnDestroy {
  // posts = [
  //   { title: 'First Post', content: 'This is the first posts content' },
  //   { title: 'Second Post', content: 'This is the second posts content' },
  //   { title: 'Third Post', content: 'This is the third posts content' },
  // ];

  posts: Post[] = [];
  private postsSub: Subscription;
  // postsService: PostsService;

  //Using dependency injection to add the
  // constructor(postsService: PostsService) {
  //   this.postsService = postsService;
  // }

  //or a less cumbersome constructor:
  constructor(public postsService: PostsService) {}

  ngOnInit() {
    this.postsService.getPosts();
    this.postsSub = this.postsService
      .getPostUpdateListener()
      .subscribe((posts: Post[]) => {
        this.posts = posts;
      });
  }

  onDelete(postId: string) {
    this.postsService.deletePost(postId);
  }

  ngOnDestroy() {
    this.postsSub.unsubscribe();
  }
}
