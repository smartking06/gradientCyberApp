import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PostsComponent } from './components/posts/posts.component';
import { UserDetailsComponent } from './components/user-details/user-details.component';
import { MaterialModule } from './material.module';
import { HttpClientModule } from '@angular/common/http';
import { RequestService } from './services/request.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FilterPipe } from './directives/filter.pipe';

@NgModule({
  declarations: [
    AppComponent,
    PostsComponent,
    UserDetailsComponent,
    FilterPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [RequestService],
  bootstrap: [AppComponent],
})
export class AppModule {}
