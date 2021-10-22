import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiBaseUrl = 'http://localhost:3000/api';
  constructor(private http: HttpClient) { }

  public registerUser(user: any) {
    // console.log(user);
    const url: string = this.apiBaseUrl + "/user/add";
    return this.http.post(url, user).toPromise()
      .then(response => response)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.log("Something went wrong ", error);
    return Promise.reject(error.message || error);
  }

}
