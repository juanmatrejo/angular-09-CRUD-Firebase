import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { HeroModel } from 'src/app/models/hero.model';
import { HeroesService } from 'src/app/services/heroes.service';
import Swal from 'sweetalert2';

@Component({
	selector: 'app-hero',
	templateUrl: './hero.component.html',
	styleUrls: ['./hero.component.css']
})
export class HeroComponent implements OnInit {

	hero = new HeroModel();

	constructor(private _service: HeroesService, private _router: ActivatedRoute) { }

	ngOnInit(): void {

		const id = this._router.snapshot.paramMap.get('id');

		if (id !== 'nuevo') {

			this._service.get(id).subscribe((response: any) => {
				this.hero = response;
				this.hero.id = id;
			});
		}
	}

	save(webForm: NgForm) {

		if (webForm.invalid) {
			console.log('Form invalid');
			return;
		}

		Swal.fire({
			title: 'Wait please...',
			text: 'Saving data...',
			icon: 'info',
			allowOutsideClick: false
		});
		Swal.showLoading();

		let request: Observable<any>;

		if (this.hero.id) {

			request = this._service.updateHero(this.hero);
		}
		else {

			request = this._service.createHero(this.hero);
		}

		request.subscribe(response => {

			Swal.fire({
				title: this.hero.name,
				text: 'Saved successfully!',
				icon: 'success'
			});
		});
	}
}
