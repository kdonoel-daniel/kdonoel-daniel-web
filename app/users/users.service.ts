import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { ApiHttpClient } from '../components/http/api-http-client.service';
import { Kdo } from '../components/models/users/kdos.models';
import { User } from '../components/models/users/users.models';
import { StatusRequest } from './users.models';

@Injectable()
export class UsersService {

	private usersCache: { [id: string]: User };

	constructor(
		private http: ApiHttpClient) {
		this.usersCache = {};
	}

	getUser(userId: string): Observable<User> {
		if (this.usersCache[userId]) {
			return Observable.of(this.usersCache[userId]);
		}

		return this.http.get(`/users/${userId}`)
			.map((res) => res.json())
			.map((res: User) => {
				this.usersCache[res._id] = res;
				return res;
			})
			.catch((error) => Observable.throw(error.json().message || 'unknown-error'));
	}

	getUsers(): Observable<User[]> {
		return this.http.get(`/users`)
			.map((res) => res.json())
			.catch((error) => Observable.throw(error.json().message || 'unknown-error'));
	}

	addKdo(userId: string, kdo: Kdo): Observable<User> {
		return this.http.post('/users/' + userId + '/kdo', kdo)
			.map((res) => res.json())
			.map((res: User) => {
				this.usersCache[res._id] = res;
				return res;
			})
			.catch((error) => Observable.throw(error.json().message || 'unknown-error'));
	}

	editKdo(userId: string, index: number, kdo: Kdo): Observable<User> {
		return this.http.put('/users/' + userId + '/kdo/' + index, kdo)
			.map((res) => res.json())
			.map((res: User) => {
				this.usersCache[res._id] = res;
				return res;
			})
			.catch((error) => Observable.throw(error.json().message || 'unknown-error'));
	}

	setStatus(userId: string, index: number, status: StatusRequest) {
		return this.http.put('/users/' + userId + '/kdo/' + index + '/status', status)
			.map((res) => res.json())
			.map((res: User) => {
				this.usersCache[res._id] = res;
				return res;
			})
			.catch((error) => Observable.throw(error.json().message || 'unknown-error'));
	}
}
