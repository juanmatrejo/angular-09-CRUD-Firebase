import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HeroModel } from '../models/hero.model';
import { delay, map } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class HeroesService {

	private url = 'https://crud-heroes-3b414-default-rtdb.firebaseio.com/Heroes';

	constructor(private _http: HttpClient) { }

	getHeroes() {

		return this._http.get(`${this.url}.json`)
			.pipe(
				map(this.getArray),
				delay(1000)
			);
	}

	get(id: string | null) {

		return this._http.get(`${this.url}/${id}.json`);
	}

	private getArray(heroesResponse: object) {

		if (heroesResponse === null) { return []; }

		let heroesArray: HeroModel[] = [];
		let hero: HeroModel;

		Object.entries(heroesResponse).forEach(entry => {

			const [key, value] = entry;
			console.log(key, value);

			hero = value;
			hero.id = key;

			heroesArray.push(hero);
		});

		return heroesArray;
	}

	createHero(hero: HeroModel) {

		return this._http.post(`${this.url}.json`, hero).pipe(
			map((response: any) => {

				hero.id = response.name;
				return hero;
			})
		);
	}

	updateHero(hero: HeroModel) {

		const id = hero.id;
		hero.id = null;

		return this._http.put(`${this.url}/${id}.json`, hero).pipe(
			map((response: any) => {

				console.log(response);
				hero.id = id;
				return hero;
			})
		);
	}

	deleteHero(id: string | null) {

		return this._http.delete(`${this.url}/${id}.json`);
	}
}
