import { Component, OnInit } from '@angular/core';
import { HeroModel } from 'src/app/models/hero.model';
import { HeroesService } from 'src/app/services/heroes.service';
import Swal from 'sweetalert2';

@Component({
	selector: 'app-heroes',
	templateUrl: './heroes.component.html',
	styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

	heroes: HeroModel[] = [];
	loading: boolean = false;

	constructor(private _service: HeroesService) {
	}

	ngOnInit() {

		this.loading = true;
		this._service.getHeroes().subscribe(response => {
			this.heroes = response;
			this.loading = false;
		});
	}

	delete(hero: HeroModel, idx: number) {

		Swal.fire({
			title: 'Are you sure?',
			text: `Do you want to delete ${hero.name}?`,
			icon: 'question',
			showConfirmButton: true,
			showCancelButton: true
		}).then(response => {

			if (response.value) {
				this._service.deleteHero(hero.id).subscribe();
				this.heroes.splice(idx, 1);
			}
		});
	}

	getExpiration() {

		let today = new Date();
		today.setFullYear(today.getFullYear() + 2);
		console.log(today);
		console.log(today.getTime());
		console.log(today.toLocaleString('en-US'));
		console.log(today.toLocaleString('es-MX'));

		return today;
	}
}
